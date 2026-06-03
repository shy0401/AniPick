from app.agent.react_agent import FoodReActAgent


def test_submission_trace_text_uses_step_numbering():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1")

    assert "Step 1" in result.submission_trace_text
    assert "Step 2" in result.submission_trace_text
    assert "Final Answer" in result.submission_trace_text
