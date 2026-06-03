from __future__ import annotations

import argparse
import re
import sys
import zipfile
from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))


DEFAULT_NAME = "신하윤"
DEFAULT_STUDENT_ID = "202112026"
INCLUDE_PATHS = [
    "app",
    "mcp_servers",
    "frontend/src",
    "frontend/public",
    "frontend/index.html",
    "frontend/package.json",
    "frontend/package-lock.json",
    "frontend/scripts",
    "frontend/.env.example",
    "ui",
    "scripts/run_submission_scenario.py",
    "scripts/package_submission.py",
    "tests",
    "README.md",
    "requirements.txt",
    ".env.example",
    "docs",
    "submission_outputs/실행로그_trace.txt",
    "submission_outputs/실행로그_trace.json",
    "submission_outputs/과제_실행_요약.md",
]
EXCLUDED_PARTS = {
    ".git",
    ".venv",
    "venv",
    "__pycache__",
    ".pytest_cache",
    "node_modules",
    "dist",
    "build",
}
SECRET_PATTERNS = [
    re.compile(r"OPENAI_API_KEY[ \t]*=[ \t]*sk-", re.IGNORECASE),
    re.compile(r"KAKAO_REST_API_KEY[ \t]*=[ \t]*[^\s\"']+", re.IGNORECASE),
    re.compile(r"NAVER_CLIENT_SECRET[ \t]*=[ \t]*[^\s\"']+", re.IGNORECASE),
    re.compile(r"GOOGLE_PLACES_API_KEY[ \t]*=[ \t]*[^\s\"']+", re.IGNORECASE),
]


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--name", default=DEFAULT_NAME)
    parser.add_argument("--student-id", default=DEFAULT_STUDENT_ID)
    args = parser.parse_args()

    output_name = f"{args.name}_{args.student_id}_실습4.zip"
    files = list(_iter_included_files())
    _scan_secrets(files)

    with zipfile.ZipFile(output_name, "w", compression=zipfile.ZIP_DEFLATED) as archive:
        for file_path in files:
            archive.write(file_path, file_path.as_posix())

    print(f"Created {output_name}")
    print("Included files:")
    with zipfile.ZipFile(output_name) as archive:
        for name in archive.namelist():
            print(name)


def _iter_included_files():
    for raw_path in INCLUDE_PATHS:
        path = Path(raw_path)
        if not path.exists():
            continue
        if path.is_file():
            if _is_allowed(path):
                yield path
            continue
        for file_path in path.rglob("*"):
            if file_path.is_file() and _is_allowed(file_path):
                yield file_path


def _is_allowed(path: Path) -> bool:
    parts = set(path.parts)
    if parts & EXCLUDED_PARTS:
        return False
    if path.name == ".env":
        return False
    if path.as_posix() == "app/data/place_cache.json":
        return False
    return True


def _scan_secrets(files: list[Path]) -> None:
    for file_path in files:
        try:
            text = file_path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            continue
        for pattern in SECRET_PATTERNS:
            if pattern.search(text):
                raise SystemExit(f"Secret-like value detected in {file_path}; aborting package.")


if __name__ == "__main__":
    main()
