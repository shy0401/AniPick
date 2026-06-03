from app.mcp_clients.mcp_client_manager import MCPClientManager
from app.services.query_parser import parse_user_query


def test_manager_calls_known_weather_tool():
    response = MCPClientManager().call_tool("weather", "get_weather", region="\uc804\uc8fc", area="\uac1d\uc0ac")
    assert response["observation"]["warning"] == "api_fallback_used"


def test_manager_calls_known_restaurant_tool():
    conditions = parse_user_query("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1")
    response = MCPClientManager().call_tool("restaurant", "search_restaurants", conditions=conditions)
    assert response["results"]
