from __future__ import annotations

import json
from pathlib import Path


DATA_PATH = Path(__file__).resolve().parents[1] / "data" / "korea_location_aliases.json"


def load_location_aliases() -> dict:
    with DATA_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


def resolve_location(text: str) -> dict:
    aliases = load_location_aliases()
    normalized = text.lower()

    for region, data in aliases.items():
        if any(alias.lower() in normalized for alias in data.get("aliases", [])):
            area = None
            for canonical_area, area_aliases in data.get("areas", {}).items():
                if any(alias.lower() in normalized for alias in area_aliases):
                    area = canonical_area
                    break
            return {
                "region": region,
                "area": area,
                "latitude": data.get("latitude"),
                "longitude": data.get("longitude"),
                "known": True,
            }

    return {
        "region": "미확인",
        "area": None,
        "latitude": None,
        "longitude": None,
        "known": False,
    }


def suggested_location_queries() -> list[str]:
    return [
        "전주 객사 근처에서 가성비 좋은 맛집 3곳 추천해줘",
        "서울 홍대 근처 초밥 리뷰 좋은 곳 추천해줘",
        "대전 구암역 근처 파스타 맛집 추천해줘",
    ]
