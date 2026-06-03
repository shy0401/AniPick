from app.agent.react_agent import FoodReActAgent


def test_assignment_top_results_fit_price_policy():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \uce5c\uad6c \uc800\ub141 \ub108\ubb34 \ube44\uc2f8\uc9c0 \uc54a\uace0 \ub9ac\ubdf0 \uc88b\uc740 \ub9db\uc9d1 3\uacf3")

    assert all(item.price_range <= 15000 for item in result.recommendations[:3])


def test_assignment_top_results_fit_review_policy():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \uce5c\uad6c \uc800\ub141 \ub9ac\ubdf0 \uc88b\uc740 \ub9db\uc9d1 3\uacf3")

    assert all(item.rating >= 4.0 for item in result.recommendations[:3])
    assert all(item.review_count >= 50 for item in result.recommendations[:3])
