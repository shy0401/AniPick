from __future__ import annotations


def get_weather(region: str | None, area: str | None = None) -> dict:
    return {
        "weather": {
            "region": region,
            "area": area,
            "condition": "비",
            "temperature": 18,
            "source": "fallback_sample",
        },
        "observation": {
            "warning": "api_fallback_used",
            "message": "Open-Meteo API Key 없이 fallback_sample 날씨를 사용했습니다.",
            "fallback_strategy": "비 오는 날에는 실내 이동이 쉬운 가까운 식당을 보조적으로 선호합니다.",
        },
    }
