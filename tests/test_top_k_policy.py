from app.agent.react_agent import FoodReActAgent
from app.services.query_parser import parse_user_query


def test_agent_honors_single_result_request():
    result = FoodReActAgent().run("\uc804\uc8fc \uac1d\uc0ac \ub9db\uc9d1 1\uacf3")

    assert result.parsed_conditions.top_k == 1
    assert len(result.recommendations) == 1


def test_parser_uses_three_as_default_result_count():
    assert parse_user_query("\uc804\uc8fc \ub9db\uc9d1 \ucd94\ucc9c").top_k == 3
