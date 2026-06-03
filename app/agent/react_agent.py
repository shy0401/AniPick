from __future__ import annotations

from app.agent.reflection import check_recommendations
from app.agent.schemas import AgentRunResult, ParsedRecommendationConditions, ReActTraceStep, RecommendationItem
from app.mcp_clients.mcp_client_manager import MCPClientManager
from app.services.query_parser import parse_user_query
from app.services.submission_trace import build_submission_trace_text


class FoodReActAgent:
    def __init__(self, tool_manager: MCPClientManager | None = None) -> None:
        self.tools = tool_manager or MCPClientManager()

    def run(self, query: str) -> AgentRunResult:
        trace: list[ReActTraceStep] = []

        conditions = parse_user_query(query)
        self._add_step(
            trace,
            "사용자 자연어 요청에서 지역, 목적, 가격, 리뷰 조건을 파싱합니다.",
            "agent.parse_user_query",
            {"query": query},
            conditions.model_dump(),
        )

        if conditions.needs_clarification:
            self._add_step(
                trace,
                "지역이 명확하지 않아 실제 맛집 검색을 중단하고 대안 질의를 제시합니다.",
                "agent.plan_steps",
                {"conditions": conditions.model_dump()},
                {
                    "error": conditions.error_code,
                    "message": conditions.clarification_reason,
                    "suggested_queries": conditions.suggested_queries,
                },
            )
            final_answer = self._clarification_answer(conditions)
            result = AgentRunResult(
                user_query=query,
                parsed_conditions=conditions,
                recommendations=[],
                react_trace=trace,
                final_answer=final_answer,
                status="needs_clarification",
            )
            result.submission_trace_text = build_submission_trace_text(result)
            return result

        self._add_step(
            trace,
            "추천에 필요한 도구 호출 순서를 계획합니다.",
            "agent.plan_steps",
            {"conditions": conditions.model_dump()},
            {"planned_actions": ["weather.get_weather", "memory.save_meal_history", "restaurant.search_restaurants", "place.get_place_detail", "reflection.check"]},
        )

        weather = self.tools.call_tool("weather", "get_weather", region=conditions.region, area=conditions.area)
        self._add_step(trace, "날씨를 보조 힌트로 확인합니다.", "weather.get_weather", {"region": conditions.region, "area": conditions.area}, weather.get("observation", weather))

        memory = self.tools.call_tool("memory", "save_meal_history", query=query, parsed_conditions=conditions.model_dump())
        self._add_step(trace, "중복 추천을 줄이기 위해 요청 이력을 저장합니다.", "memory.save_meal_history", {"query": query}, memory.get("observation", memory))

        restaurant_response = self.tools.call_tool("restaurant", "search_restaurants", conditions=conditions)
        self._add_step(
            trace,
            "조건을 유지한 채 후보를 검색하고 부족하면 같은 지역 안에서만 완화합니다.",
            "restaurant.search_restaurants",
            {"conditions": conditions.model_dump()},
            restaurant_response.get("observation", restaurant_response),
        )

        raw_results = restaurant_response.get("results", [])
        recommendations = [RecommendationItem(**item) for item in raw_results]
        self._add_step(
            trace,
            "후보 점수와 조건 부합 이유를 정리합니다.",
            "agent.score_and_draft",
            {"candidate_count": len(raw_results)},
            {"selected_count": len(recommendations), "names": [item.name for item in recommendations]},
        )

        for item in recommendations:
            detail = self.tools.call_tool("place", "get_place_detail", place_id=item.id)
            self._add_step(trace, "최종 후보의 장소 상세 정보를 보강합니다.", "place.get_place_detail", {"place_id": item.id}, detail.get("observation", detail))

        reflection = check_recommendations(conditions, recommendations)
        self._add_step(trace, "추천 결과가 과제 조건을 만족하는지 검토합니다.", "reflection.check", {"conditions": conditions.model_dump()}, reflection.model_dump())

        status = "ok" if recommendations else "no_results"
        final_answer = self._final_answer(conditions, recommendations)
        self._add_step(trace, "최종 답변을 생성합니다.", "agent.finalize", {"recommendation_count": len(recommendations)}, {"status": status})

        result = AgentRunResult(
            user_query=query,
            parsed_conditions=conditions,
            recommendations=recommendations,
            react_trace=trace,
            reflection=reflection,
            final_answer=final_answer,
            status=status,
        )
        result.submission_trace_text = build_submission_trace_text(result)
        return result

    @staticmethod
    def _add_step(trace: list[ReActTraceStep], thought: str, action: str, action_input: dict, observation: dict) -> None:
        trace.append(
            ReActTraceStep(
                step=len(trace) + 1,
                thought=thought,
                action=action,
                action_input=action_input,
                observation=observation,
            )
        )

    @staticmethod
    def _clarification_answer(conditions: ParsedRecommendationConditions) -> str:
        suggestions = "\n".join(f"- {query}" for query in conditions.suggested_queries)
        return f"지역을 확인해 주세요. {conditions.clarification_reason}\n예시:\n{suggestions}"

    @staticmethod
    def _final_answer(conditions: ParsedRecommendationConditions, recommendations: list[RecommendationItem]) -> str:
        if not recommendations:
            return "현재 조건에 맞는 후보가 없습니다. 다른 지역으로 임의 대체하지 않았습니다. 가격 또는 리뷰 조건을 완화하면 더 찾을 수 있습니다."

        lines = [f"{conditions.region} {conditions.area or ''} 기준 추천 {len(recommendations)}곳입니다."]
        if conditions.warnings:
            lines.extend(f"참고: {warning}" for warning in conditions.warnings)
            lines.append("음식 종류를 추가하면 정확도가 올라갑니다.")
        for index, item in enumerate(recommendations, 1):
            lines.append(
                f"{index}. {item.name}: {item.area} 근처, 1인 약 {item.price_range:,}원, 평점 {item.rating}, 리뷰 {item.review_count}개입니다. "
                f"{item.reason} 친구, 저녁, 가격/가성비, 리뷰/평점 조건을 함께 고려했습니다."
            )
        return "\n".join(lines)
