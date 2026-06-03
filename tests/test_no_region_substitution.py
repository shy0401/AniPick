from app.agent.react_agent import FoodReActAgent
from app.agent.schemas import ParsedRecommendationConditions
from mcp_servers.restaurant_server import search_restaurants


def test_agent_does_not_substitute_unknown_region():
    result = FoodReActAgent().run("unknown-region dinner restaurants")

    assert result.status == "needs_clarification"
    assert result.recommendations == []


def test_restaurant_tool_does_not_fill_from_other_region():
    conditions = ParsedRecommendationConditions(region="missing-region", top_k=3)
    response = search_restaurants(conditions)

    assert response["results"] == []
    assert response["observation"].get("warning") == "no_search_results"
