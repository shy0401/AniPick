from __future__ import annotations

import json
from pathlib import Path

from app.agent.react_agent import FoodReActAgent
from app.services.submission_trace import to_trace_json


ASSIGNMENT_QUERY = "전주 객사 근처에서 친구랑 저녁 먹기 좋은 맛집을 찾아줘. 너무 비싸지 않고, 리뷰가 좋은 곳 위주로 3곳 추천해줘."
OUTPUT_DIR = Path("submission_outputs")


def main() -> None:
    OUTPUT_DIR.mkdir(exist_ok=True)
    result = FoodReActAgent().run(ASSIGNMENT_QUERY)

    text_path = OUTPUT_DIR / "실행로그_trace.txt"
    json_path = OUTPUT_DIR / "실행로그_trace.json"
    summary_path = OUTPUT_DIR / "과제_실행_요약.md"

    text_path.write_text(result.submission_trace_text, encoding="utf-8")
    json_path.write_text(json.dumps(to_trace_json(result), ensure_ascii=False, indent=2), encoding="utf-8")
    summary_path.write_text(_summary(result, text_path, json_path), encoding="utf-8")

    print(f"Trace text: {text_path}")
    print(f"Trace json: {json_path}")
    print(f"Summary: {summary_path}")


def _summary(result, text_path: Path, json_path: Path) -> str:
    names = [item.name for item in result.recommendations[:3]]
    return "\n".join(
        [
            "# 과제 실행 요약",
            "",
            "## 사용한 Agentic Design Pattern",
            "",
            "- ReAct Pattern: Thought, Action, Action Input, Observation, Final Answer 형식으로 추론과 도구 호출을 기록합니다.",
            "- Plan-and-Solve Pattern: `agent.plan_steps` 단계에서 도구 호출 순서를 계획합니다.",
            "- Reflection Pattern: `reflection.check` 단계에서 가격, 리뷰, 지역, 동행, 목적 조건을 검토합니다.",
            "- Tool Use Pattern: weather, memory, restaurant, place 도구를 호출합니다.",
            "- Memory Pattern: `memory.save_meal_history`로 요청 이력을 저장합니다.",
            "",
            "## 실행한 프롬프트",
            "",
            ASSIGNMENT_QUERY,
            "",
            "## 최종 추천 3곳 요약",
            "",
            *(f"- {name}" for name in names),
            "",
            "## Trace 파일 위치",
            "",
            f"- {text_path}",
            f"- {json_path}",
            "",
            "## API Key 없이 fallback 데이터로 실행 가능 여부",
            "",
            "가능합니다. 외부 API Key가 없어도 샘플 맛집 데이터와 fallback 날씨를 사용합니다.",
        ]
    )


if __name__ == "__main__":
    main()
