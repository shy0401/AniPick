from __future__ import annotations

import json
from pathlib import Path

from app.agent.schemas import ParsedRecommendationConditions
from app.services.scoring import is_strict_match, score_restaurant


DATA_PATH = Path(__file__).resolve().parents[1] / "app" / "data" / "restaurants.json"


def load_restaurants() -> list[dict]:
    with DATA_PATH.open("r", encoding="utf-8") as file:
        return json.load(file)


def search_restaurants(conditions: ParsedRecommendationConditions) -> dict:
    restaurants = load_restaurants()
    strict_candidates: list[dict] = []
    relaxed_fields: list[str] = []

    for restaurant in restaurants:
        if is_strict_match(restaurant, conditions):
            strict_candidates.append(_with_score(restaurant, conditions))

    candidates = strict_candidates
    if len(candidates) < conditions.top_k:
        relaxed_fields = ["price", "review_count"]
        candidates = []
        for restaurant in restaurants:
            if conditions.region and restaurant.get("region") != conditions.region:
                continue
            if conditions.food_type and restaurant.get("category") != conditions.food_type:
                continue
            candidates.append(_with_score(restaurant, conditions))

    candidates.sort(key=lambda item: item["score"], reverse=True)
    selected = candidates[: conditions.top_k]

    if not selected:
        return {
            "results": [],
            "observation": {
                "warning": "no_search_results",
                "message": "요청 조건에 맞는 후보가 없습니다.",
                "relaxation_options": ["가격 조건 완화", "리뷰 수 조건 완화", "세부 위치 확장"],
                "not_done": "다른 지역 후보로 임의 대체하지 않음",
            },
        }

    observation = {
        "candidate_count": len(selected),
        "strict_candidate_count": len(strict_candidates),
        "relaxed_fields": relaxed_fields,
        "not_done": "다른 지역 후보로 임의 대체하지 않음",
    }
    if len(selected) < conditions.top_k:
        observation["warning"] = "not_enough_strict_candidates"
        observation["message"] = "현재 조건으로는 요청한 개수를 모두 채우지 못했습니다."

    return {"results": selected, "observation": observation}


def get_restaurant_detail(restaurant_id: str) -> dict:
    for restaurant in load_restaurants():
        if restaurant["id"] == restaurant_id:
            return {"detail": restaurant, "observation": {"source": "fallback_sample"}}
    return {
        "detail": None,
        "observation": {
            "warning": "no_search_results",
            "message": "식당 상세 정보를 찾지 못했습니다.",
            "not_done": "다른 식당으로 임의 대체하지 않음",
        },
    }


def _with_score(restaurant: dict, conditions: ParsedRecommendationConditions) -> dict:
    score, reasons = score_restaurant(restaurant, conditions)
    return {**restaurant, "score": score, "score_reasons": reasons}
