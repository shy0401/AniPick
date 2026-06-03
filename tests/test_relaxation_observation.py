from app.agent.schemas import ParsedRecommendationConditions
from mcp_servers.restaurant_server import search_restaurants


def test_candidate_relaxation_records_relaxed_fields():
    conditions = ParsedRecommendationConditions(
        region="\uc804\uc8fc",
        max_price=1,
        min_review_count=999999,
        top_k=3,
    )
    response = search_restaurants(conditions)

    assert response["results"]
    assert response["observation"]["relaxed_fields"] == ["price", "review_count"]
    assert response["observation"]["not_done"]
