import json

from app.agent.react_agent import FoodReActAgent


def test_agent_result_can_be_serialized_to_json():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1 3\uacf3")

    payload = json.loads(result.model_dump_json())

    assert payload["user_query"]
    assert payload["parsed_conditions"]["region"] == "\uc804\uc8fc"
    assert isinstance(payload["react_trace"], list)
