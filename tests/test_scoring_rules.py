from app.agent.schemas import ParsedRecommendationConditions
from app.services.scoring import is_strict_match, score_restaurant


def test_score_prefers_area_price_rating_and_reviews():
    conditions = ParsedRecommendationConditions(
        region="\uc804\uc8fc",
        area="\uac1d\uc0ac",
        companion="\uce5c\uad6c",
        purpose="\uc800\ub141",
        max_price=15000,
        min_rating=4.0,
        min_review_count=50,
    )
    strong = {
        "region": "\uc804\uc8fc",
        "area": "\uac1d\uc0ac",
        "district": "\uac1d\uc0ac",
        "price_range": 12000,
        "rating": 4.6,
        "review_count": 120,
        "tags": ["\uce5c\uad6c", "\uc800\ub141"],
        "distance": 120,
    }
    weak = {**strong, "area": "other", "district": "other", "price_range": 25000, "rating": 3.5, "review_count": 3}

    strong_score, strong_reasons = score_restaurant(strong, conditions)
    weak_score, _ = score_restaurant(weak, conditions)

    assert strong_score > weak_score
    assert strong_reasons


def test_strict_match_rejects_other_regions():
    conditions = ParsedRecommendationConditions(region="\uc804\uc8fc")
    restaurant = {"region": "\uc11c\uc6b8"}

    assert is_strict_match(restaurant, conditions) is False
