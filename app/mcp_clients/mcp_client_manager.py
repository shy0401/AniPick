from __future__ import annotations

from collections.abc import Callable
from typing import Any

from mcp_servers.memory_server import save_meal_history
from mcp_servers.place_server import get_place_detail
from mcp_servers.restaurant_server import search_restaurants
from mcp_servers.weather_server import get_weather


class MCPClientManager:
    def __init__(self) -> None:
        self.tools: dict[tuple[str, str], Callable[..., dict]] = {
            ("weather", "get_weather"): get_weather,
            ("memory", "save_meal_history"): save_meal_history,
            ("restaurant", "search_restaurants"): search_restaurants,
            ("place", "get_place_detail"): get_place_detail,
        }

    def call_tool(self, server: str, tool: str, **kwargs: Any) -> dict:
        handler = self.tools.get((server, tool))
        if handler is None:
            return self._tool_failure(server, tool, "등록되지 않은 도구입니다.")
        try:
            return handler(**kwargs)
        except Exception as exc:  # pragma: no cover - defensive boundary
            return self._tool_failure(server, tool, str(exc))

    @staticmethod
    def _tool_failure(server: str, tool: str, message: str) -> dict:
        return {
            "observation": {
                "error": "tool_call_failed",
                "server": server,
                "tool": tool,
                "message": message,
                "fallback_strategy": "가능하면 fallback_sample 데이터셋을 사용하고, 없으면 검색 결과 없음으로 처리합니다.",
                "user_message": "도구 호출에 실패했지만 다른 지역 후보로 임의 대체하지 않습니다.",
            },
            "results": [],
        }
