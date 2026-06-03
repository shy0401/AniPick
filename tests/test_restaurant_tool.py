from app.services.query_parser import parse_user_query
from mcp_servers.restaurant_server import get_restaurant_detail, search_restaurants


def test_restaurant_tool_returns_ranked_assignment_candidates():
    conditions = parse_user_query("\uc804\uc8fc \uac1d\uc0ac \uadfc\ucc98\uc5d0\uc11c \uce5c\uad6c\ub791 \uc800\ub141 \ub9ac\ubdf0 \uc88b\uc740 \ub9db\uc9d1 3\uacf3")
    response = search_restaurants(conditions)

    assert len(response["results"]) >= 3
    assert response["observation"]["candidate_count"] >= 3
    assert all(item["region"] == "\uc804\uc8fc" for item in response["results"])


def test_restaurant_detail_missing_result_has_observation():
    response = get_restaurant_detail("missing-place-id")

    assert response["detail"] is None
    assert response["observation"]["warning"] == "no_search_results"
