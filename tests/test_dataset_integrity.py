import json
from pathlib import Path


DATA_PATH = Path("app/data/restaurants.json")
REQUIRED_FIELDS = {
    "id",
    "name",
    "region",
    "area",
    "category",
    "rating",
    "review_count",
    "price_range",
    "distance",
    "tags",
    "reason",
    "menus",
    "opening_hours",
    "latitude",
    "longitude",
}


def _restaurants():
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def test_restaurant_dataset_is_not_empty():
    assert _restaurants()


def test_restaurant_dataset_ids_are_unique():
    ids = [item["id"] for item in _restaurants()]
    assert len(ids) == len(set(ids))


def test_restaurant_dataset_has_required_fields():
    for item in _restaurants():
        missing = REQUIRED_FIELDS - set(item)
        assert not missing, f"{item.get('id')} missing {missing}"
