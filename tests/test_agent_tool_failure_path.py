from app.agent.react_agent import FoodReActAgent


class FailingRestaurantManager:
    def call_tool(self, server, tool, **kwargs):
        if server == "restaurant":
            return {
                "results": [],
                "observation": {
                    "error": "tool_call_failed",
                    "server": server,
                    "tool": tool,
                    "message": "forced failure",
                    "fallback_strategy": "none",
                    "user_message": "tool failed",
                },
            }
        return {"observation": {"source": "test"}}


def test_agent_records_tool_failure_observation():
    result = FoodReActAgent(tool_manager=FailingRestaurantManager()).run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1")

    restaurant_step = next(step for step in result.react_trace if step.action == "restaurant.search_restaurants")
    assert restaurant_step.observation["error"] == "tool_call_failed"
    assert result.status == "no_results"
