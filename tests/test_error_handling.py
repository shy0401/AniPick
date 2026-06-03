from app.agent.react_agent import FoodReActAgent


def test_unknown_region_requests_clarification():
    result = FoodReActAgent().run("없는동네에서 파스타 맛집 추천해줘")

    assert result.parsed_conditions.needs_clarification is True
    assert result.parsed_conditions.error_code == "unknown_region"
    assert not result.recommendations
    assert "지역을 확인" in result.final_answer
    assert "없는동네" not in [item.region for item in result.recommendations]


def test_unknown_city_appears_in_trace_and_answer():
    result = FoodReActAgent().run("블라블라시에서 맛집 찾아줘")

    assert result.status == "needs_clarification"
    assert "지역을 확인" in result.final_answer
    assert "unknown_region" in result.submission_trace_text


def test_vague_food_warning_still_recommends():
    result = FoodReActAgent().run("전주 객사 근처에서 아무거나 추천해줘")

    assert result.recommendations
    assert result.parsed_conditions.warnings
    assert "음식 종류가 모호" in result.submission_trace_text


def test_missing_conditions_warning_still_recommends():
    result = FoodReActAgent().run("전주 맛집 추천해줘")

    assert result.recommendations
    assert result.parsed_conditions.warnings
    assert "조건이 부족" in result.submission_trace_text
