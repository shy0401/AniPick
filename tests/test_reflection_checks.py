from app.agent.reflection import check_recommendations
from app.agent.schemas import ParsedRecommendationConditions, RecommendationItem


def _item(**overrides):
    data = {
        "id": "id",
        "name": "name",
        "region": "\uc804\uc8fc",
        "area": "\uac1d\uc0ac",
        "district": "\uac1d\uc0ac",
        "category": "\ud55c\uc2dd",
        "rating": 4.5,
        "review_count": 100,
        "price_range": 12000,
        "distance": 100,
        "tags": ["\uce5c\uad6c", "\uc800\ub141"],
        "reason": "reason",
    }
    data.update(overrides)
    return RecommendationItem(**data)


def test_reflection_passes_valid_recommendations():
    conditions = ParsedRecommendationConditions(region="\uc804\uc8fc", top_k=1, max_price=15000, min_review_count=50)
    result = check_recommendations(conditions, [_item()])

    assert result.passed is True
    assert result.issues == []
    assert result.checks


def test_reflection_flags_region_mismatch():
    conditions = ParsedRecommendationConditions(region="\uc804\uc8fc", top_k=1)
    result = check_recommendations(conditions, [_item(region="\uc11c\uc6b8")])

    assert result.passed is False
    assert result.issues


def test_reflection_flags_missing_count():
    conditions = ParsedRecommendationConditions(region="\uc804\uc8fc", top_k=3)
    result = check_recommendations(conditions, [_item()])

    assert result.passed is False
    assert result.issues
