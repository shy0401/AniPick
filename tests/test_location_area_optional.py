from app.services.location_resolver import resolve_location


def test_known_region_can_have_no_specific_area():
    location = resolve_location("\uc804\uc8fc \ub9db\uc9d1 \ucd94\ucc9c")

    assert location["known"] is True
    assert location["region"] == "\uc804\uc8fc"
    assert location["area"] is None
