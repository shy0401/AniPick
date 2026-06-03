from app.agent.react_agent import FoodReActAgent


def test_reflection_step_precedes_finalize_step():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1 3\uacf3")
    actions = [step.action for step in result.react_trace]

    assert actions.index("reflection.check") < actions.index("agent.finalize")


def test_reflection_payload_is_present_on_success():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1 3\uacf3")

    assert result.reflection is not None
    assert result.reflection.checks
