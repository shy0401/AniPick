import argparse
import csv
import hashlib
import json
import os
import sys
import time
from datetime import datetime
from pathlib import Path
from urllib.parse import urlparse, parse_qsl, urlencode, urlunparse

import psycopg2
import psycopg2.extras
from dotenv import load_dotenv
from openai import OpenAI


# ============================================================
# 기본 경로 / 환경변수
# ============================================================

ROOT_DIR = Path(__file__).resolve().parents[1]  # backend
ENV_PATH = ROOT_DIR / ".env"

CSV_ROOT = ROOT_DIR / "data" / "anime_csv"
ITEM_CSV_DIR = CSV_ROOT / "items"
MASTER_CSV_PATH = CSV_ROOT / "anime_catalog.csv"
RUN_LOG_PATH = CSV_ROOT / "translation_runs.csv"

load_dotenv(ENV_PATH, encoding="utf-8-sig")

DATABASE_URL = os.getenv("DATABASE_URL")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
MODEL = os.getenv("OPENAI_TRANSLATION_MODEL") or "gpt-4.1-mini"

DEFAULT_BATCH_SIZE = 100


if not DATABASE_URL:
    print("[ERROR] DATABASE_URL이 없습니다. backend/.env를 확인하세요.")
    sys.exit(1)


def get_openai_client(required: bool = False):
    if not OPENAI_API_KEY:
        if required:
            print("[ERROR] OPENAI_API_KEY가 없습니다. 번역 모드에서는 필요합니다.")
            sys.exit(1)
        return None
    return OpenAI(api_key=OPENAI_API_KEY)


# ============================================================
# 공통 유틸
# ============================================================

def now_iso():
    return datetime.now().isoformat(timespec="seconds")


def normalize_text(value):
    if value is None:
        return ""
    return str(value).strip()


def truncate_text(value, limit=2800):
    text = normalize_text(value)
    if len(text) <= limit:
        return text
    return text[:limit].rsplit(" ", 1)[0]


def safe_json(value):
    if value is None:
        return ""
    if isinstance(value, (dict, list)):
        return json.dumps(value, ensure_ascii=False)
    return str(value)


def parse_json_maybe(value, fallback=None):
    if fallback is None:
        fallback = []
    if value is None:
        return fallback
    if isinstance(value, (list, dict)):
        return value
    text = str(value).strip()
    if not text:
        return fallback
    try:
        return json.loads(text)
    except Exception:
        return fallback


def make_prompt_hash(payload):
    raw = json.dumps(payload, ensure_ascii=False, sort_keys=True)
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()


def ensure_csv_dirs():
    CSV_ROOT.mkdir(parents=True, exist_ok=True)
    ITEM_CSV_DIR.mkdir(parents=True, exist_ok=True)


def item_csv_path(provider, external_id):
    provider = normalize_text(provider or "JIKAN").upper()
    external_id = normalize_text(external_id)
    return ITEM_CSV_DIR / f"{provider}_{external_id}.csv"


def status_is_pending(row):
    """
    한국어 제목이 없거나, 실패/대기 상태이거나,
    원본 설명이 있는데 한국어 설명이 비어 있으면 PENDING으로 판단한다.

    원본 설명 자체가 없는 작품은 ko_description이 없어도 TITLE_ONLY 상태로 정상 처리한다.
    """
    ko_status = normalize_text(row.get("ko_status"))
    ko_title = normalize_text(row.get("ko_title"))
    ko_description = normalize_text(row.get("ko_description"))
    source_description = build_source_description(row)

    if not row.get("ko_translation_id"):
        return True
    if ko_status in ["PENDING", "FAILED"]:
        return True
    if not ko_title:
        return True
    if source_description and not ko_description:
        return True
    if ko_status == "TITLE_ONLY" and source_description:
        return True
    return False


def build_source_title(row):
    return (
            normalize_text(row.get("en_title"))
            or normalize_text(row.get("english_title"))
            or normalize_text(row.get("romaji_title"))
            or normalize_text(row.get("native_title"))
    )


def build_source_description(row):
    return (
            normalize_text(row.get("en_description"))
            or normalize_text(row.get("source_description"))
    )


# ============================================================
# DB 연결
# ============================================================

def clean_database_url(url: str) -> tuple[str, str]:
    parsed = urlparse(url)
    query = dict(parse_qsl(parsed.query))
    schema = query.pop("schema", "public")
    cleaned_query = urlencode(query)
    cleaned_url = urlunparse(
        (
            parsed.scheme,
            parsed.netloc,
            parsed.path,
            parsed.params,
            cleaned_query,
            parsed.fragment,
        )
    )
    return cleaned_url, schema


def connect_db():
    cleaned_url, schema = clean_database_url(DATABASE_URL)
    conn = psycopg2.connect(cleaned_url)
    conn.autocommit = False

    with conn.cursor() as cur:
        cur.execute(f'SET search_path TO "{schema}", public;')

    return conn


# ============================================================
# DB 조회
# ============================================================

def fetch_all_anime(conn, limit: int | None = None):
    sql = """
          SELECT
              a.id AS anime_id,
              a.provider,
              a."externalId" AS external_id,
              a."romajiTitle" AS romaji_title,
              a."englishTitle" AS english_title,
              a."nativeTitle" AS native_title,
              a.description AS source_description,
              a.genres,
              a."seasonYear" AS season_year,
              a.season,
              a.format,
              a.status AS anime_status,
              a."averageScore" AS average_score,
              a.episodes,
              a."imageUrl" AS image_url,
              a."bannerUrl" AS banner_url,
              a."siteUrl" AS site_url,

              ko.id AS ko_translation_id,
              ko.title AS ko_title,
              ko.description AS ko_description,
              ko.source AS ko_source,
              ko.status AS ko_status,
              ko."failureReason" AS ko_failure_reason,

              en.title AS en_title,
              en.description AS en_description
          FROM "Anime" a
                   LEFT JOIN "AnimeTranslation" ko
                             ON ko."animeId" = a.id
                                 AND ko.lang = 'ko'
                   LEFT JOIN "AnimeTranslation" en
                             ON en."animeId" = a.id
                                 AND en.lang = 'en'
          WHERE
              (
                  NULLIF(TRIM(COALESCE(a."englishTitle", '')), '') IS NOT NULL
                      OR NULLIF(TRIM(COALESCE(a."romajiTitle", '')), '') IS NOT NULL
                      OR NULLIF(TRIM(COALESCE(a."nativeTitle", '')), '') IS NOT NULL
                  )
          ORDER BY
              a."averageScore" DESC NULLS LAST,
              a.id ASC \
          """

    params = []
    if limit and limit > 0:
        sql += " LIMIT %s"
        params.append(limit)

    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(sql, params)
        return cur.fetchall()


def fetch_pending_anime(conn, limit: int):
    sql = """
          SELECT
              a.id AS anime_id,
              a.provider,
              a."externalId" AS external_id,
              a."romajiTitle" AS romaji_title,
              a."englishTitle" AS english_title,
              a."nativeTitle" AS native_title,
              a.description AS source_description,
              a.genres,
              a."seasonYear" AS season_year,
              a.season,
              a.format,
              a.status AS anime_status,
              a."averageScore" AS average_score,
              a.episodes,
              a."imageUrl" AS image_url,
              a."bannerUrl" AS banner_url,
              a."siteUrl" AS site_url,

              ko.id AS ko_translation_id,
              ko.title AS ko_title,
              ko.description AS ko_description,
              ko.source AS ko_source,
              ko.status AS ko_status,
              ko."failureReason" AS ko_failure_reason,

              en.title AS en_title,
              en.description AS en_description
          FROM "Anime" a
                   LEFT JOIN "AnimeTranslation" ko
                             ON ko."animeId" = a.id
                                 AND ko.lang = 'ko'
                   LEFT JOIN "AnimeTranslation" en
                             ON en."animeId" = a.id
                                 AND en.lang = 'en'
          WHERE
              (
                  ko.id IS NULL
                      OR ko.status IN ('PENDING', 'TITLE_ONLY', 'FAILED')
                      OR NULLIF(TRIM(COALESCE(ko.title, '')), '') IS NULL
                      OR NULLIF(TRIM(COALESCE(ko.description, '')), '') IS NULL
                  )
            AND NOT (
              COALESCE(ko.source, '') = 'MANUAL'
                  AND COALESCE(ko.status, '') = 'REVIEWED'
              )
            AND (
              NULLIF(TRIM(COALESCE(a."englishTitle", '')), '') IS NOT NULL
                  OR NULLIF(TRIM(COALESCE(a."romajiTitle", '')), '') IS NOT NULL
                  OR NULLIF(TRIM(COALESCE(a."nativeTitle", '')), '') IS NOT NULL
              )
          ORDER BY
              a."averageScore" DESC NULLS LAST,
              a.id ASC
              LIMIT %s; \
          """

    with conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor) as cur:
        cur.execute(sql, (limit,))
        return cur.fetchall()


# ============================================================
# CSV 저장 / 읽기
# ============================================================

MASTER_FIELDS = [
    "anime_id",
    "provider",
    "external_id",
    "source_title",
    "romaji_title",
    "english_title",
    "native_title",
    "source_description",
    "genres",
    "season_year",
    "season",
    "format",
    "anime_status",
    "average_score",
    "episodes",
    "image_url",
    "site_url",
    "ko_title",
    "ko_description",
    "ko_source",
    "ko_status",
    "ko_failure_reason",
    "pending",
    "item_csv",
    "updated_at",
]

ITEM_FIELDS = [
    "anime_id",
    "provider",
    "external_id",
    "source_title",
    "romaji_title",
    "english_title",
    "native_title",
    "source_description",
    "genres",
    "season_year",
    "season",
    "format",
    "anime_status",
    "average_score",
    "episodes",
    "image_url",
    "banner_url",
    "site_url",
    "ko_title",
    "ko_description",
    "ko_source",
    "ko_status",
    "ko_failure_reason",
    "prompt_hash",
    "csv_status",
    "updated_at",
]


def row_to_csv_record(row, translated=None, csv_status=None, prompt_hash=""):
    translated = translated or {}

    ko_title = translated.get("title")
    if ko_title is None:
        ko_title = row.get("ko_title")

    ko_description = translated.get("description")
    if ko_description is None:
        ko_description = row.get("ko_description")

    ko_status = translated.get("status")
    if ko_status is None:
        ko_status = row.get("ko_status") or ("PENDING" if status_is_pending(row) else "REVIEWED")

    ko_source = translated.get("source")
    if ko_source is None:
        ko_source = row.get("ko_source") or ""

    source_title = build_source_title(row)
    source_description = build_source_description(row)

    return {
        "anime_id": row.get("anime_id"),
        "provider": row.get("provider") or "JIKAN",
        "external_id": row.get("external_id"),
        "source_title": source_title,
        "romaji_title": row.get("romaji_title") or "",
        "english_title": row.get("english_title") or "",
        "native_title": row.get("native_title") or "",
        "source_description": source_description,
        "genres": safe_json(row.get("genres")),
        "season_year": row.get("season_year") or "",
        "season": row.get("season") or "",
        "format": row.get("format") or "",
        "anime_status": row.get("anime_status") or "",
        "average_score": row.get("average_score") or "",
        "episodes": row.get("episodes") or "",
        "image_url": row.get("image_url") or "",
        "banner_url": row.get("banner_url") or "",
        "site_url": row.get("site_url") or "",
        "ko_title": ko_title or "",
        "ko_description": ko_description or "",
        "ko_source": ko_source or "",
        "ko_status": ko_status or "",
        "ko_failure_reason": translated.get("failureReason") or row.get("ko_failure_reason") or "",
        "prompt_hash": prompt_hash or "",
        "csv_status": csv_status or "",
        "updated_at": now_iso(),
    }


def write_master_csv(rows):
    ensure_csv_dirs()

    with MASTER_CSV_PATH.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=MASTER_FIELDS)
        writer.writeheader()

        for row in rows:
            path = item_csv_path(row.get("provider"), row.get("external_id"))
            record = row_to_csv_record(row)
            writer.writerow({
                "anime_id": record["anime_id"],
                "provider": record["provider"],
                "external_id": record["external_id"],
                "source_title": record["source_title"],
                "romaji_title": record["romaji_title"],
                "english_title": record["english_title"],
                "native_title": record["native_title"],
                "source_description": record["source_description"],
                "genres": record["genres"],
                "season_year": record["season_year"],
                "season": record["season"],
                "format": record["format"],
                "anime_status": record["anime_status"],
                "average_score": record["average_score"],
                "episodes": record["episodes"],
                "image_url": record["image_url"],
                "site_url": record["site_url"],
                "ko_title": record["ko_title"],
                "ko_description": record["ko_description"],
                "ko_source": record["ko_source"],
                "ko_status": record["ko_status"],
                "ko_failure_reason": record["ko_failure_reason"],
                "pending": "YES" if status_is_pending(row) else "NO",
                "item_csv": str(path.relative_to(ROOT_DIR)),
                "updated_at": now_iso(),
            })


def write_item_csv(row, translated=None, csv_status=None, prompt_hash="", overwrite=False):
    ensure_csv_dirs()

    path = item_csv_path(row.get("provider"), row.get("external_id"))

    if path.exists() and not overwrite:
        existing = read_item_csv(path)
        # 기존 CSV에 한국어 제목이 있으면 보호한다.
        # 기존 CSV가 비어 있거나 ko_title이 없으면 PENDING CSV로 보고 덮어쓴다.
        if existing and normalize_text(existing.get("ko_title")):
            return False, path

    record = row_to_csv_record(
        row,
        translated=translated,
        csv_status=csv_status,
        prompt_hash=prompt_hash,
    )

    with path.open("w", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=ITEM_FIELDS)
        writer.writeheader()
        writer.writerow(record)

    return True, path


def read_item_csv(path):
    with path.open("r", newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        if not rows:
            return None
        return rows[0]


def read_all_item_csvs():
    ensure_csv_dirs()
    files = sorted(ITEM_CSV_DIR.glob("*.csv"))
    result = []

    for path in files:
        row = read_item_csv(path)
        if row:
            row["_csv_path"] = str(path)
            result.append(row)

    return result



def get_existing_item_csv(provider, external_id):
    path = item_csv_path(provider, external_id)
    if not path.exists():
        return None, path
    return read_item_csv(path), path


def existing_csv_has_ko_title(provider, external_id):
    row, path = get_existing_item_csv(provider, external_id)
    if not row:
        return False, path
    return bool(normalize_text(row.get("ko_title"))), path


def csv_row_to_translation(row):
    ko_title = normalize_text(row.get("ko_title"))
    if not ko_title:
        return None

    ko_description = normalize_text(row.get("ko_description"))
    ko_status = normalize_text(row.get("ko_status")) or ("AUTO" if ko_description else "TITLE_ONLY")
    ko_source = normalize_text(row.get("ko_source")) or "CSV"

    return {
        "title": ko_title,
        "description": ko_description or None,
        "source": ko_source,
        "status": ko_status,
        "failureReason": normalize_text(row.get("ko_failure_reason")),
    }


def list_csv_rows_missing_ko_title():
    missing = []
    for row in read_all_item_csvs():
        if not normalize_text(row.get("ko_title")):
            missing.append(row)
    return missing


def append_run_log(record):
    ensure_csv_dirs()

    exists = RUN_LOG_PATH.exists()
    fields = [
        "run_at",
        "mode",
        "model",
        "limit",
        "batch_size",
        "success",
        "failed",
        "skipped",
        "csv_written",
        "db_written",
        "note",
    ]

    with RUN_LOG_PATH.open("a", newline="", encoding="utf-8-sig") as f:
        writer = csv.DictWriter(f, fieldnames=fields)
        if not exists:
            writer.writeheader()
        writer.writerow(record)


# ============================================================
# 번역 payload / OpenAI batch 번역
# ============================================================

def build_source_payload(row):
    source_title = build_source_title(row)
    source_description = build_source_description(row)

    return {
        "animeId": row.get("anime_id"),
        "provider": row.get("provider"),
        "externalId": row.get("external_id"),
        "title": {
            "english": normalize_text(row.get("english_title")),
            "romaji": normalize_text(row.get("romaji_title")),
            "native": normalize_text(row.get("native_title")),
            "source": source_title,
        },
        "description": truncate_text(source_description),
        "genres": parse_json_maybe(row.get("genres")),
        "seasonYear": row.get("season_year"),
        "season": row.get("season"),
        "format": row.get("format"),
        "status": row.get("anime_status"),
        "averageScore": row.get("average_score"),
        "episodes": row.get("episodes"),
    }


def build_batch_payload(rows):
    items = []

    for row in rows:
        payload = build_source_payload(row)
        if not payload["title"]["source"]:
            continue

        items.append({
            "animeId": payload["animeId"],
            "provider": payload["provider"],
            "externalId": payload["externalId"],
            "sourceTitle": payload["title"]["source"],
            "titles": payload["title"],
            "description": payload["description"],
            "genres": payload["genres"],
            "seasonYear": payload["seasonYear"],
            "season": payload["season"],
            "format": payload["format"],
            "status": payload["status"],
            "averageScore": payload["averageScore"],
            "episodes": payload["episodes"],
        })

    return {
        "targetLang": "ko",
        "items": items,
        "returnShape": {
            "items": [
                {
                    "animeId": "number",
                    "provider": "string",
                    "externalId": "number",
                    "title": "string",
                    "description": "string or null",
                }
            ]
        },
    }


def create_translation_response_with_retries(client, system_prompt, payload, schema_name, schema, max_retries=3):
    last_error = None

    for attempt in range(1, max_retries + 1):
        try:
            return client.responses.create(
                model=MODEL,
                input=[
                    {
                        "role": "system",
                        "content": system_prompt,
                    },
                    {
                        "role": "user",
                        "content": json.dumps(payload, ensure_ascii=False),
                    },
                ],
                text={
                    "format": {
                        "type": "json_schema",
                        "name": schema_name,
                        "strict": True,
                        "schema": schema,
                    }
                },
            )
        except Exception as error:
            last_error = error
            wait_seconds = min(2 ** attempt, 15)
            print(f"  - OpenAI retry {attempt}/{max_retries} after {wait_seconds}s: {error}")
            time.sleep(wait_seconds)

    raise last_error


def translate_batch_to_korean(rows, client):
    payload = build_batch_payload(rows)
    prompt_hash = make_prompt_hash(payload)

    if not payload["items"]:
        return {}, prompt_hash

    system_prompt = """
너는 애니메이션 데이터베이스용 번역가다.
여러 애니메이션의 제목과 설명을 한국어 UI에 자연스럽게 맞게 번역하라.

규칙:
- 반드시 JSON만 출력한다.
- 입력받은 items 배열의 각 항목마다 결과를 하나씩 반환한다.
- animeId, provider, externalId는 입력값 그대로 반환한다.
- title은 한국어 공식/통용 제목이 명확하면 그 제목을 사용한다.
- 공식 한국어 제목을 확신할 수 없으면 원제 뉘앙스를 살려 자연스럽게 번역한다.
- description은 원문 설명이 있을 때만 번역한다.
- 원문 설명이 비어 있으면 description은 null로 둔다.
- 없는 내용을 새로 만들지 않는다.
- 과장된 홍보 문구를 만들지 않는다.
- 스포일러를 추가하지 않는다.
- 일본어 고유명사, 작품명, 인명은 한국어 표기 관례에 맞춘다.
""".strip()

    schema = {
        "type": "object",
        "additionalProperties": False,
        "properties": {
            "items": {
                "type": "array",
                "items": {
                    "type": "object",
                    "additionalProperties": False,
                    "properties": {
                        "animeId": {"type": "integer"},
                        "provider": {"type": "string"},
                        "externalId": {"type": "integer"},
                        "title": {"type": "string", "minLength": 1},
                        "description": {"type": ["string", "null"]},
                    },
                    "required": [
                        "animeId",
                        "provider",
                        "externalId",
                        "title",
                        "description",
                    ],
                },
            }
        },
        "required": ["items"],
    }

    response = create_translation_response_with_retries(
        client=client,
        system_prompt=system_prompt,
        payload=payload,
        schema_name="anime_ko_translation_batch",
        schema=schema,
    )

    data = json.loads(response.output_text)
    translations = {}

    source_has_description = {}
    for row in rows:
        source_has_description[int(row["anime_id"])] = bool(build_source_description(row))

    for item in data.get("items", []):
        anime_id = int(item["animeId"])
        title = normalize_text(item.get("title"))
        description = item.get("description")

        if not title:
            continue

        if description is not None:
            description = normalize_text(description) or None

        if not source_has_description.get(anime_id):
            description = None

        status = "AUTO" if description else "TITLE_ONLY"

        translations[anime_id] = {
            "title": title,
            "description": description,
            "source": "GPT",
            "status": status,
            "failureReason": "",
        }

    return translations, prompt_hash


def translate_rows_resilient(rows, client):
    """
    100개 배치 번역을 우선 시도하고,
    일부 결과 누락 또는 배치 실패 시 작은 배치/개별 번역으로 자동 재시도한다.
    """
    rows = [row for row in rows if build_source_title(row)]
    if not rows:
        return {}, "", {}

    try:
        translations, prompt_hash = translate_batch_to_korean(rows, client)

        missing_rows = [
            row for row in rows
            if int(row["anime_id"]) not in translations
        ]

        if missing_rows:
            print(f"  - batch response missing items: {len(missing_rows)}개, 개별 재시도")
            for row in missing_rows:
                try:
                    single_translations, single_hash = translate_batch_to_korean([row], client)
                    translations.update(single_translations)
                    if not prompt_hash:
                        prompt_hash = single_hash
                except Exception as error:
                    return_translations = translations
                    errors = {
                        int(row["anime_id"]): str(error)
                    }
                    return return_translations, prompt_hash, errors

        return translations, prompt_hash, {}

    except Exception as error:
        if len(rows) == 1:
            return {}, "", {int(rows[0]["anime_id"]): str(error)}

        mid = max(1, len(rows) // 2)
        print(f"  - batch split retry: {len(rows)}개 -> {mid}개 / {len(rows) - mid}개")

        left_translations, left_hash, left_errors = translate_rows_resilient(rows[:mid], client)
        right_translations, right_hash, right_errors = translate_rows_resilient(rows[mid:], client)

        translations = {}
        translations.update(left_translations)
        translations.update(right_translations)

        errors = {}
        errors.update(left_errors)
        errors.update(right_errors)

        return translations, left_hash or right_hash, errors


# ============================================================
# DB 저장
# ============================================================

def save_translation(conn, anime_id: int, translated: dict):
    sql = """
          INSERT INTO "AnimeTranslation"
          ("animeId", lang, title, description, source, status, "failureReason", "createdAt", "updatedAt")
          VALUES
              (%s, 'ko', %s, %s, %s, %s, NULL, NOW(), NOW())
              ON CONFLICT ("animeId", lang)
        DO UPDATE SET
              title = EXCLUDED.title,
                             description = EXCLUDED.description,
                             source = EXCLUDED.source,
                             status = EXCLUDED.status,
                             "failureReason" = NULL,
                             "updatedAt" = NOW()
           WHERE NOT (
                             "AnimeTranslation".source = 'MANUAL'
             AND "AnimeTranslation".status = 'REVIEWED'
                             ); \
          """

    with conn.cursor() as cur:
        cur.execute(
            sql,
            (
                anime_id,
                translated.get("title"),
                translated.get("description"),
                translated.get("source") or "GPT",
                translated.get("status") or "AUTO",
            ),
        )


def mark_failed(conn, anime_id: int, reason: str):
    reason = truncate_text(reason, 500)

    sql = """
          INSERT INTO "AnimeTranslation"
          ("animeId", lang, title, description, source, status, "failureReason", "createdAt", "updatedAt")
          VALUES
              (%s, 'ko', NULL, NULL, 'GPT', 'FAILED', %s, NOW(), NOW())
              ON CONFLICT ("animeId", lang)
        DO UPDATE SET
              status = 'FAILED',
                             "failureReason" = EXCLUDED."failureReason",
                             "updatedAt" = NOW()
           WHERE NOT (
                             "AnimeTranslation".source = 'MANUAL'
             AND "AnimeTranslation".status = 'REVIEWED'
                             ); \
          """

    with conn.cursor() as cur:
        cur.execute(sql, (anime_id, reason))


def sync_csv_to_db(conn, limit: int | None = None, dry_run=False):
    csv_rows = read_all_item_csvs()

    if limit and limit > 0:
        csv_rows = csv_rows[:limit]

    success = 0
    skipped = 0
    failed = 0

    for row in csv_rows:
        anime_id = int(row["anime_id"])
        ko_title = normalize_text(row.get("ko_title"))
        ko_description = normalize_text(row.get("ko_description"))
        ko_status = normalize_text(row.get("ko_status")) or "AUTO"
        ko_source = normalize_text(row.get("ko_source")) or "CSV"

        if not ko_title:
            print(f"[MISSING] CSV ko_title 없음: animeId={anime_id}, file={row.get('_csv_path', '')}")
            skipped += 1
            continue

        translated = {
            "title": ko_title,
            "description": ko_description or None,
            "source": ko_source,
            "status": ko_status,
        }

        if dry_run:
            print(f"[DRY-RUN] CSV -> DB animeId={anime_id}, title={ko_title}")
            skipped += 1
            continue

        try:
            save_translation(conn, anime_id, translated)
            conn.commit()
            success += 1
        except Exception as error:
            conn.rollback()
            print(f"[FAILED] CSV -> DB animeId={anime_id}: {error}")
            failed += 1

    return {
        "success": success,
        "skipped": skipped,
        "failed": failed,
        "total_csv": len(csv_rows),
    }


# ============================================================
# 모드별 실행
# ============================================================

def mode_export_csv(args):
    conn = connect_db()

    try:
        rows = fetch_all_anime(conn, args.limit if args.limit > 0 else None)
        write_master_csv(rows)

        created = 0
        skipped = 0

        for row in rows:
            did_write, path = write_item_csv(
                row,
                csv_status="EXPORTED",
                overwrite=args.force,
            )

            if did_write:
                created += 1
            else:
                skipped += 1

        print("[DONE] CSV export completed")
        print(f"  master_csv : {MASTER_CSV_PATH}")
        print(f"  item_dir   : {ITEM_CSV_DIR}")
        print(f"  total      : {len(rows)}")
        print(f"  created    : {created}")
        print(f"  skipped    : {skipped}  기존 개별 CSV는 기본적으로 유지됩니다.")

    finally:
        conn.close()


def mode_translate_pending(args):
    if args.batch_size <= 0:
        args.batch_size = DEFAULT_BATCH_SIZE

    client = get_openai_client(required=not args.dry_run)
    conn = connect_db()

    try:
        rows = fetch_pending_anime(conn, args.limit)

        if not rows:
            print("[OK] 번역할 PENDING/누락 한국어 번역이 없습니다.")
            return

        write_master_csv(rows)

        print(f"[INFO] 번역 대상: {len(rows)}개")
        print(f"[INFO] model: {MODEL}")
        print(f"[INFO] batch_size: {args.batch_size}")
        print(f"[INFO] CSV 저장 위치: {CSV_ROOT}")

        success = 0
        failed = 0
        skipped = 0
        csv_written = 0
        db_written = 0
        reused_csv = 0

        for start in range(0, len(rows), args.batch_size):
            batch = rows[start:start + args.batch_size]
            batch_no = start // args.batch_size + 1

            print(f"\n[BATCH {batch_no}] {len(batch)}개 처리")

            actual_batch = []

            for row in batch:
                anime_id = int(row["anime_id"])
                source_title = build_source_title(row)

                if not source_title:
                    reason = "원본 제목이 없어 번역할 수 없습니다."
                    print(f"  - FAILED animeId={anime_id}: {reason}")
                    if not args.dry_run:
                        mark_failed(conn, anime_id, reason)
                        conn.commit()
                    failed += 1
                    continue

                existing_csv, path = get_existing_item_csv(row.get("provider"), row.get("external_id"))
                existing_translation = csv_row_to_translation(existing_csv) if existing_csv else None

                # 기존 CSV에 한국어 제목이 있으면 AI를 다시 쓰지 않고 DB에 반영한다.
                if existing_translation and not args.force:
                    if args.dry_run:
                        print(f"  - DRY-RUN reuse CSV: {path.name}, title={existing_translation['title']}")
                    elif not args.csv_only:
                        save_translation(conn, anime_id, existing_translation)
                        conn.commit()
                        db_written += 1
                    reused_csv += 1
                    success += 1
                    continue

                if args.dry_run:
                    print(
                        f"  - DRY-RUN translate target: animeId={anime_id}, "
                        f"externalId={row['external_id']}, title={source_title}"
                    )
                    skipped += 1
                    continue

                # CSV가 없거나, CSV는 있지만 ko_title이 비어 있으면 번역 대상으로 포함한다.
                actual_batch.append(row)

            if args.dry_run or not actual_batch:
                continue

            translations, prompt_hash, errors = translate_rows_resilient(actual_batch, client)

            for row in actual_batch:
                anime_id = int(row["anime_id"])
                translated = translations.get(anime_id)

                if not translated:
                    reason = errors.get(anime_id) or "번역 결과를 받지 못했습니다."
                    print(f"  - FAILED animeId={anime_id}: {reason}")
                    try:
                        mark_failed(conn, anime_id, reason)
                        conn.commit()
                    except Exception:
                        conn.rollback()
                    failed += 1
                    continue

                try:
                    # 기존 CSV가 있더라도 ko_title이 비어 있었던 파일은 덮어쓴다.
                    did_write, path = write_item_csv(
                        row,
                        translated=translated,
                        csv_status="TRANSLATED",
                        prompt_hash=prompt_hash,
                        overwrite=args.force,
                    )

                    if did_write:
                        csv_written += 1

                    if not args.csv_only:
                        save_translation(conn, anime_id, translated)
                        conn.commit()
                        db_written += 1

                    print(f"  - OK animeId={anime_id}, title={translated['title']}")
                    success += 1

                except Exception as error:
                    conn.rollback()
                    print(f"  - FAILED save animeId={anime_id}: {error}")
                    failed += 1

            time.sleep(args.sleep)

        append_run_log({
            "run_at": now_iso(),
            "mode": "translate-pending",
            "model": MODEL,
            "limit": args.limit,
            "batch_size": args.batch_size,
            "success": success,
            "failed": failed,
            "skipped": skipped,
            "csv_written": csv_written,
            "db_written": db_written,
            "note": f"csv_only={args.csv_only}; reused_csv={reused_csv}",
        })

        print("\n[DONE]")
        print(f"  success    : {success}")
        print(f"  failed     : {failed}")
        print(f"  skipped    : {skipped}")
        print(f"  reused_csv : {reused_csv}")
        print(f"  csv_written: {csv_written}")
        print(f"  db_written : {db_written}")

    finally:
        conn.close()


def mode_sync_db(args):
    conn = connect_db()

    try:
        result = sync_csv_to_db(
            conn,
            limit=args.limit if args.limit > 0 else None,
            dry_run=args.dry_run,
        )

        print("[DONE] CSV -> DB sync completed")
        print(f"  total_csv: {result['total_csv']}")
        print(f"  success  : {result['success']}")
        print(f"  skipped  : {result['skipped']}")
        print(f"  failed   : {result['failed']}")

        append_run_log({
            "run_at": now_iso(),
            "mode": "sync-db",
            "model": "",
            "limit": args.limit,
            "batch_size": "",
            "success": result["success"],
            "failed": result["failed"],
            "skipped": result["skipped"],
            "csv_written": 0,
            "db_written": result["success"],
            "note": "dry-run" if args.dry_run else "",
        })

    finally:
        conn.close()


def mode_status(args):
    conn = connect_db()

    try:
        all_rows = fetch_all_anime(conn, args.limit if args.limit > 0 else None)
        pending_rows = [row for row in all_rows if status_is_pending(row)]
        csv_rows = read_all_item_csvs()

        print("[STATUS]")
        print(f"  DB anime total         : {len(all_rows)}")
        print(f"  DB pending ko          : {len(pending_rows)}")
        missing_csv_titles = [row for row in csv_rows if not normalize_text(row.get("ko_title"))]
        print(f"  item CSV count         : {len(csv_rows)}")
        print(f"  item CSV missing title : {len(missing_csv_titles)}")
        print(f"  master CSV             : {MASTER_CSV_PATH}")
        print(f"  item CSV dir           : {ITEM_CSV_DIR}")

    finally:
        conn.close()


# ============================================================
# CLI
# ============================================================

def build_parser():
    parser = argparse.ArgumentParser(
        description="AniPick PENDING 한국어 번역을 CSV와 DB로 관리하는 스크립트"
    )

    sub = parser.add_subparsers(dest="command")

    export_parser = sub.add_parser(
        "export-csv",
        help="DB의 전체 애니 리스트를 master CSV와 개별 anime CSV로 내보냅니다.",
    )
    export_parser.add_argument("--limit", type=int, default=0)
    export_parser.add_argument("--force", action="store_true", help="기존 개별 CSV도 덮어씁니다.")
    export_parser.set_defaults(func=mode_export_csv)

    translate_parser = sub.add_parser(
        "translate-pending",
        help="PENDING/누락 한국어 번역을 100개 단위 배치로 번역하고 CSV/DB에 저장합니다.",
    )
    translate_parser.add_argument("--limit", type=int, default=100)
    translate_parser.add_argument("--batch-size", type=int, default=100)
    translate_parser.add_argument("--sleep", type=float, default=1.0)
    translate_parser.add_argument("--dry-run", action="store_true")
    translate_parser.add_argument("--force", action="store_true", help="기존 개별 CSV가 있어도 재번역/덮어쓰기합니다.")
    translate_parser.add_argument("--csv-only", action="store_true", help="DB 저장 없이 CSV만 저장합니다.")
    translate_parser.set_defaults(func=mode_translate_pending)

    sync_parser = sub.add_parser(
        "sync-db",
        help="개별 anime CSV에 저장된 한국어 번역을 DB에 반영합니다. AI 호출 없음.",
    )
    sync_parser.add_argument("--limit", type=int, default=0)
    sync_parser.add_argument("--dry-run", action="store_true")
    sync_parser.set_defaults(func=mode_sync_db)

    status_parser = sub.add_parser(
        "status",
        help="DB PENDING 개수와 CSV 개수를 확인합니다.",
    )
    status_parser.add_argument("--limit", type=int, default=0)
    status_parser.set_defaults(func=mode_status)

    return parser


def main():
    parser = build_parser()
    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        return

    args.func(args)


if __name__ == "__main__":
    main()
