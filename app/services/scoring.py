from __future__ import annotations

from app.agent.schemas import ParsedRecommendationConditions


def score_restaurant(restaurant: dict, conditions: ParsedRecommendationConditions) -> tuple[float, list[str]]:
    score = 0.0
    reasons: list[str] = []

    if conditions.region and restaurant.get("region") == conditions.region:
        score += 40
        reasons.append("지역 일치")

    if conditions.area and conditions.area in {restaurant.get("area"), restaurant.get("district")}:
        score += 30
        reasons.append("세부 위치 일치")

    if conditions.max_price and restaurant.get("price_range", 999999) <= conditions.max_price:
        score += 20
        reasons.append("가격 조건 충족")

    if conditions.min_rating and restaurant.get("rating", 0) >= conditions.min_rating:
        score += 15
        reasons.append("평점 조건 충족")

    if conditions.min_review_count and restaurant.get("review_count", 0) >= conditions.min_review_count:
        score += 15
        reasons.append("리뷰 수 조건 충족")

    tags = set(restaurant.get("tags", []))
    if conditions.companion and conditions.companion in tags:
        score += 8
        reasons.append("동행 목적 적합")

    if conditions.purpose and conditions.purpose in tags:
        score += 8
        reasons.append("식사 목적 적합")

    if conditions.food_type and restaurant.get("category") == conditions.food_type:
        score += 12
        reasons.append("음식 종류 일치")

    distance = restaurant.get("distance") or 9999
    score += max(0, 10 - distance / 150)

    return round(score, 2), reasons


def is_strict_match(restaurant: dict, conditions: ParsedRecommendationConditions) -> bool:
    if conditions.region and restaurant.get("region") != conditions.region:
        return False
    if conditions.max_price and restaurant.get("price_range", 999999) > conditions.max_price:
        return False
    if conditions.min_rating and restaurant.get("rating", 0) < conditions.min_rating:
        return False
    if conditions.min_review_count and restaurant.get("review_count", 0) < conditions.min_review_count:
        return False
    if conditions.food_type and restaurant.get("category") != conditions.food_type:
        return False
    return True
