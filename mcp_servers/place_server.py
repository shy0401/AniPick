from __future__ import annotations

from mcp_servers.restaurant_server import get_restaurant_detail


def get_place_detail(place_id: str) -> dict:
    detail = get_restaurant_detail(place_id)
    restaurant = detail.get("detail")
    if not restaurant:
        return detail
    return {
        "detail": {
            "place_id": place_id,
            "name": restaurant["name"],
            "address": restaurant.get("address"),
            "menus": restaurant.get("menus", []),
            "opening_hours": restaurant.get("opening_hours"),
            "latitude": restaurant.get("latitude"),
            "longitude": restaurant.get("longitude"),
            "map_url": f"https://map.kakao.com/link/search/{restaurant['name']}",
            "photo_url": None,
        },
        "observation": {
            "source": "fallback_sample",
            "message": "외부 장소 API 없이 샘플 상세 정보를 사용했습니다.",
        },
    }
