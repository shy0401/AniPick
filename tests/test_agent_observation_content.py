from app.agent.react_agent import FoodReActAgent


def test_restaurant_observation_records_no_region_substitution():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1 3\uacf3")
    step = next(step for step in result.react_trace if step.action == "restaurant.search_restaurants")

    assert "not_done" in step.observation
    assert step.observation["not_done"]


def test_weather_observation_records_fallback_source():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1")
    step = next(step for step in result.react_trace if step.action == "weather.get_weather")

    assert step.observation["warning"] == "api_fallback_used"
