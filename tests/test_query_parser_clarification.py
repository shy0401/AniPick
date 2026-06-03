from app.services.query_parser import parse_user_query


def test_unknown_region_sets_clarification_fields():
    conditions = parse_user_query("not-a-real-region pasta please")

    assert conditions.needs_clarification is True
    assert conditions.error_code == "unknown_region"
    assert conditions.clarification_reason
    assert conditions.suggested_queries


def test_vague_food_request_records_warning_but_continues():
    conditions = parse_user_query("\uc804\uc8fc \uac1d\uc0ac \uadfc\ucc98 \uc544\ubb34\uac70\ub098 \ucd94\ucc9c\ud574\uc918")

    assert conditions.needs_clarification is False
    assert conditions.warnings
