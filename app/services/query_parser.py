from __future__ import annotations

import re

from app.agent.schemas import ParsedRecommendationConditions
from app.services.location_resolver import resolve_location, suggested_location_queries


VAGUE_FOOD_TERMS = ["아무거나", "맛있는 거", "맛있는거", "밥집", "맛집", "추천해줘"]
FOOD_TYPES = {
    "파스타": "양식",
    "양식": "양식",
    "초밥": "일식",
    "스시": "일식",
    "일식": "일식",
    "한식": "한식",
    "국밥": "한식",
    "분식": "분식",
    "떡볶이": "분식",
}


def parse_user_query(query: str) -> ParsedRecommendationConditions:
    location = resolve_location(query)
    conditions = ParsedRecommendationConditions(
        region=location["region"],
        area=location["area"],
        top_k=_extract_top_k(query),
    )

    if not location["known"]:
        conditions.needs_clarification = True
        conditions.error_code = "unknown_region"
        conditions.clarification_reason = "요청에서 지원하는 지역을 찾지 못했습니다."
        conditions.suggested_queries = suggested_location_queries()
        return conditions

    for keyword, food_type in FOOD_TYPES.items():
        if keyword in query:
            conditions.food_type = food_type
            break

    if "친구" in query:
        conditions.companion = "친구"

    if "저녁" in query or "저녁식사" in query:
        conditions.purpose = "저녁"

    if "비싸지" in query or "가성비" in query or "저렴" in query:
        conditions.max_price = 15000

    if "리뷰" in query or "후기" in query:
        conditions.min_rating = 4.0
        conditions.min_review_count = 50

    if conditions.food_type is None and any(term in query for term in VAGUE_FOOD_TERMS):
        conditions.warnings.append("음식 종류가 모호해 평점, 거리, 가격 중심으로 추천합니다.")

    if conditions.food_type is None and conditions.max_price is None and conditions.companion is None and conditions.purpose is None:
        conditions.warnings.append("음식 종류, 가격, 동행, 목적 조건이 부족해 기본 품질 기준으로 추천합니다.")

    return conditions


def _extract_top_k(query: str) -> int:
    match = re.search(r"(\d+)\s*곳", query)
    if not match:
        return 3
    return max(1, min(10, int(match.group(1))))
