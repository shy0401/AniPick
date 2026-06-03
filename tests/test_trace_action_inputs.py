from app.agent.react_agent import FoodReActAgent


def test_each_trace_step_has_action_input_and_observation():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1 3\uacf3")

    for step in result.react_trace:
        assert isinstance(step.action_input, dict)
        assert isinstance(step.observation, dict)


def test_restaurant_search_step_includes_conditions_input():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1 3\uacf3")
    step = next(item for item in result.react_trace if item.action == "restaurant.search_restaurants")

    assert "conditions" in step.action_input
    assert step.action_input["conditions"]["region"] == "\uc804\uc8fc"
