from app.agent.react_agent import FoodReActAgent


def test_agent_trace_steps_are_numbered_in_order():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \uce5c\uad6c \uc800\ub141 \ub9db\uc9d1 3\uacf3")

    assert [step.step for step in result.react_trace] == list(range(1, len(result.react_trace) + 1))


def test_agent_trace_starts_with_parse_action():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1")

    assert result.react_trace[0].action == "agent.parse_user_query"
