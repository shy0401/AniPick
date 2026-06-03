from app.agent.react_agent import FoodReActAgent


def test_recommendation_items_include_display_quality_fields():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \uce5c\uad6c \uc800\ub141 \ub9ac\ubdf0 \uc88b\uc740 \ub9db\uc9d1 3\uacf3")

    assert result.recommendations
    for item in result.recommendations:
        assert item.name
        assert item.reason
        assert item.menus
        assert item.opening_hours
        assert item.rating > 0
        assert item.review_count > 0
