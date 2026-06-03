from app.mcp_clients.mcp_client_manager import MCPClientManager


def test_unknown_tool_returns_standard_failure_observation():
    response = MCPClientManager().call_tool("missing", "missing_tool")
    observation = response["observation"]

    assert response["results"] == []
    assert observation["error"] == "tool_call_failed"
    assert observation["server"] == "missing"
    assert observation["tool"] == "missing_tool"
    assert observation["fallback_strategy"]
    assert observation["user_message"]
