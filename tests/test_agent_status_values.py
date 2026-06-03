from app.agent.react_agent import FoodReActAgent


def test_success_status_is_ok():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1")
    assert result.status == "ok"


def test_unknown_region_status_is_needs_clarification():
    result = FoodReActAgent().run("unknown-place dinner")
    assert result.status == "needs_clarification"
