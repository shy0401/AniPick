from __future__ import annotations

_MEMORY: list[dict] = []


def save_meal_history(query: str, parsed_conditions: dict) -> dict:
    record = {"query": query, "parsed_conditions": parsed_conditions}
    _MEMORY.append(record)
    return {
        "saved": True,
        "history_count": len(_MEMORY),
        "observation": {
            "message": "최근 식사 요청을 메모리에 저장했습니다.",
            "memory_scope": "in_memory_session",
        },
    }


def list_meal_history() -> dict:
    return {"history": list(_MEMORY)}
