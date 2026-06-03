import json
from pathlib import Path


DATA_PATH = Path("app/data/korea_location_aliases.json")


def _aliases():
    return json.loads(DATA_PATH.read_text(encoding="utf-8"))


def test_alias_dataset_contains_assignment_region():
    aliases = _aliases()
    assert "\uc804\uc8fc" in aliases
    assert aliases["\uc804\uc8fc"].get("aliases")


def test_alias_dataset_contains_assignment_area():
    areas = _aliases()["\uc804\uc8fc"].get("areas", {})
    assert "\uac1d\uc0ac" in areas
    assert areas["\uac1d\uc0ac"]
