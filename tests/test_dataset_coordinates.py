import json
from pathlib import Path


DATA_PATH = Path("app/data/restaurants.json")


def test_coordinates_are_present_for_map_context():
    for item in json.loads(DATA_PATH.read_text(encoding="utf-8")):
        assert isinstance(item.get("latitude"), (int, float))
        assert isinstance(item.get("longitude"), (int, float))


def test_distance_values_are_non_negative():
    for item in json.loads(DATA_PATH.read_text(encoding="utf-8")):
        assert item["distance"] >= 0
