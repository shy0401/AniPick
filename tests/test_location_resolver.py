from app.services.location_resolver import resolve_location, suggested_location_queries


def test_resolve_known_region_and_area():
    query = "\uc804\uc8fc \uac1d\uc0ac \uadfc\ucc98"
    location = resolve_location(query)

    assert location["known"] is True
    assert location["region"] == "\uc804\uc8fc"
    assert location["area"] == "\uac1d\uc0ac"
    assert location["latitude"] is not None
    assert location["longitude"] is not None


def test_unknown_region_returns_unconfirmed_location():
    location = resolve_location("unknown-place pasta")

    assert location["known"] is False
    assert location["area"] is None
    assert location["latitude"] is None
    assert location["longitude"] is None


def test_suggested_location_queries_are_available():
    suggestions = suggested_location_queries()

    assert len(suggestions) >= 3
    assert any("\uc804\uc8fc" in query for query in suggestions)
