from app.agent.react_agent import FoodReActAgent


ASSIGNMENT_QUERY = "전주 객사 근처에서 친구랑 저녁 먹기 좋은 맛집을 찾아줘. 너무 비싸지 않고, 리뷰가 좋은 곳 위주로 3곳 추천해줘."


def test_assignment_scenario_quality():
    result = FoodReActAgent().run(ASSIGNMENT_QUERY)
    conditions = result.parsed_conditions

    assert conditions.region == "전주"
    assert conditions.area == "객사"
    assert conditions.companion == "친구"
    assert conditions.purpose == "저녁"
    assert conditions.max_price == 15000
    assert conditions.min_rating >= 4.0
    assert conditions.min_review_count >= 50
    assert len(result.recommendations) >= 3
    assert all(item.region == "전주" for item in result.recommendations[:3])
    assert sum(item.area in {"객사", "객리단길"} or item.district in {"객사", "객리단길"} for item in result.recommendations[:3]) >= 2

    final_answer = result.final_answer
    matched = sum(keyword in final_answer for keyword in ["친구", "저녁", "가격", "가성비", "리뷰", "평점"])
    assert matched >= 3


def test_assignment_trace_contains_required_actions():
    result = FoodReActAgent().run(ASSIGNMENT_QUERY)
    actions = [step.action for step in result.react_trace]

    assert "agent.parse_user_query" in actions
    assert "agent.plan_steps" in actions
    assert "weather.get_weather" in actions
    assert "memory.save_meal_history" in actions
    assert "restaurant.search_restaurants" in actions
    assert "agent.score_and_draft" in actions
    assert "place.get_place_detail" in actions
    assert "reflection.check" in actions
    assert "agent.finalize" in actions
