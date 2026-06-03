import json
from pathlib import Path


DATA_PATH = Path("app/data/restaurants.json")


def test_each_restaurant_has_menu_examples():
    for item in json.loads(DATA_PATH.read_text(encoding="utf-8")):
        assert isinstance(item.get("menus"), list)
        assert item["menus"]


def test_each_restaurant_has_reason_text():
    for item in json.loads(DATA_PATH.read_text(encoding="utf-8")):
        assert isinstance(item.get("reason"), str)
        assert item["reason"].strip()
