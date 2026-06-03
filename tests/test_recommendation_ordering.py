from app.services.query_parser import parse_user_query
from mcp_servers.restaurant_server import search_restaurants


def test_restaurant_results_are_sorted_by_score_descending():
    conditions = parse_user_query("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1 3\uacf3")
    response = search_restaurants(conditions)
    scores = [item["score"] for item in response["results"]]

    assert scores == sorted(scores, reverse=True)
