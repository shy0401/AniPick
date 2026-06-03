from app.services.recommendation_service import RecommendationService


def test_recommendation_service_returns_agent_result():
    result = RecommendationService().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1 3\uacf3")

    assert result.user_query
    assert result.parsed_conditions.region == "\uc804\uc8fc"
    assert result.react_trace
    assert result.final_answer
