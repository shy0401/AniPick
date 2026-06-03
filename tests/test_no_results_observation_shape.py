from app.agent.schemas import ParsedRecommendationConditions
from mcp_servers.restaurant_server import search_restaurants


def test_no_results_observation_has_relaxation_options():
    response = search_restaurants(ParsedRecommendationConditions(region="missing-region"))
    observation = response["observation"]

    assert observation["warning"] == "no_search_results"
    assert observation["relaxation_options"]
    assert observation["not_done"]
