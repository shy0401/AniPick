from app.agent.react_agent import FoodReActAgent


def test_final_answer_lists_numbered_recommendations():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \uce5c\uad6c \uc800\ub141 \ub9ac\ubdf0 \uc88b\uc740 \ub9db\uc9d1 3\uacf3")

    assert "1." in result.final_answer
    assert "2." in result.final_answer
    assert "3." in result.final_answer


def test_clarification_answer_includes_suggested_examples():
    result = FoodReActAgent().run("unknown-town dinner")

    assert result.status == "needs_clarification"
    assert result.parsed_conditions.suggested_queries
    for query in result.parsed_conditions.suggested_queries[:1]:
        assert query in result.final_answer
