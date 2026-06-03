from mcp_servers.memory_server import save_meal_history
from mcp_servers.place_server import get_place_detail
from mcp_servers.weather_server import get_weather


def test_weather_tool_uses_fallback_observation():
    response = get_weather("\uc804\uc8fc", "\uac1d\uc0ac")

    assert response["weather"]["source"] == "fallback_sample"
    assert response["observation"]["warning"] == "api_fallback_used"


def test_place_tool_returns_fallback_detail_for_known_place():
    response = get_place_detail("jj-gaeksa-001")

    assert response["detail"]["place_id"] == "jj-gaeksa-001"
    assert response["observation"]["source"] == "fallback_sample"


def test_memory_tool_records_in_memory_history():
    response = save_meal_history("query", {"region": "\uc804\uc8fc"})

    assert response["saved"] is True
    assert response["history_count"] >= 1
    assert response["observation"]["memory_scope"] == "in_memory_session"

