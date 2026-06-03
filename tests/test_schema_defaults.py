from app.agent.schemas import AgentRunResult, ParsedRecommendationConditions, ReActTraceStep


def test_parsed_conditions_default_collections_are_independent():
    first = ParsedRecommendationConditions()
    second = ParsedRecommendationConditions()

    first.warnings.append("warning")
    first.suggested_queries.append("query")

    assert second.warnings == []
    assert second.suggested_queries == []


def test_trace_step_defaults_are_empty_dicts():
    step = ReActTraceStep(step=1, thought="think", action="act")

    assert step.action_input == {}
    assert step.observation == {}


def test_agent_result_default_status_is_ok():
    result = AgentRunResult(
        user_query="query",
        parsed_conditions=ParsedRecommendationConditions(),
        final_answer="answer",
    )

    assert result.status == "ok"
    assert result.recommendations == []
    assert result.react_trace == []
