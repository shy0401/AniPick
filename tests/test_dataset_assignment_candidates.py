import json
from pathlib import Path


DATA_PATH = Path("app/data/restaurants.json")


def _restaurants():
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def test_dataset_has_three_jeonju_candidates():
    matches = [item for item in _restaurants() if item["region"] == "\uc804\uc8fc"]
    assert len(matches) >= 3


def test_dataset_has_three_gaeksa_area_candidates():
    matches = [
        item for item in _restaurants()
        if item["region"] == "\uc804\uc8fc" and item.get("area") in {"\uac1d\uc0ac", "\uac1d\ub9ac\ub2e8\uae38"}
    ]
    assert len(matches) >= 3


def test_assignment_candidates_have_price_and_review_signals():
    matches = [item for item in _restaurants() if item["region"] == "\uc804\uc8fc"]
    strong = [item for item in matches if item["price_range"] <= 15000 and item["rating"] >= 4.0 and item["review_count"] >= 50]
    assert len(strong) >= 3
