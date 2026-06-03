from __future__ import annotations

import json
from typing import Any

from app.agent.schemas import AgentRunResult, ReActTraceStep


def format_step(step: ReActTraceStep) -> str:
    return "\n".join(
        [
            f"Step {step.step}",
            f"Thought: {step.thought}",
            f"Action: {step.action}",
            f"Action Input: {json.dumps(step.action_input, ensure_ascii=False, indent=2)}",
            f"Observation: {json.dumps(step.observation, ensure_ascii=False, indent=2)}",
        ]
    )


def build_submission_trace_text(result: AgentRunResult) -> str:
    sections: list[str] = [
        f"User Query: {result.user_query}",
        "Parsed Conditions:",
        json.dumps(result.parsed_conditions.model_dump(), ensure_ascii=False, indent=2),
    ]
    sections.extend(format_step(step) for step in result.react_trace)
    if result.reflection:
        sections.append("Reflection:")
        sections.append(json.dumps(result.reflection.model_dump(), ensure_ascii=False, indent=2))
    sections.append(f"Final Answer: {result.final_answer}")
    if result.parsed_conditions.suggested_queries:
        sections.append("Suggested Queries:")
        sections.extend(f"- {query}" for query in result.parsed_conditions.suggested_queries)
    return "\n\n".join(sections)


def to_trace_json(result: AgentRunResult) -> dict[str, Any]:
    return result.model_dump()
