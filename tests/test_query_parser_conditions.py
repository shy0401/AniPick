from app.services.query_parser import parse_user_query


ASSIGNMENT_QUERY = "\uc804\uc8fc \uac1d\uc0ac \uadfc\ucc98\uc5d0\uc11c \uce5c\uad6c\ub791 \uc800\ub141 \uba39\uae30 \uc88b\uc740 \ub9db\uc9d1\uc744 \ucc3e\uc544\uc918. \ub108\ubb34 \ube44\uc2f8\uc9c0 \uc54a\uace0, \ub9ac\ubdf0\uac00 \uc88b\uc740 \uacf3 \uc704\uc8fc\ub85c 3\uacf3 \ucd94\ucc9c\ud574\uc918."


def test_assignment_query_extracts_core_conditions():
    conditions = parse_user_query(ASSIGNMENT_QUERY)

    assert conditions.region == "\uc804\uc8fc"
    assert conditions.area == "\uac1d\uc0ac"
    assert conditions.companion == "\uce5c\uad6c"
    assert conditions.purpose == "\uc800\ub141"
    assert conditions.max_price == 15000
    assert conditions.min_rating == 4.0
    assert conditions.min_review_count == 50
    assert conditions.top_k == 3


def test_top_k_is_clamped_to_safe_range():
    conditions = parse_user_query("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1 99\uacf3 \ucd94\ucc9c\ud574\uc918")

    assert conditions.top_k == 10
