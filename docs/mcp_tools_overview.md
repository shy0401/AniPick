# MCP Tools Overview

The project uses MCP-style local tool servers to demonstrate tool-use behavior.

## Tools

- `weather.get_weather`: returns weather context with fallback observation.
- `memory.save_meal_history`: records query context in session memory.
- `restaurant.search_restaurants`: searches fallback restaurant data.
- `place.get_place_detail`: returns detail for selected restaurants.

Each tool produces an observation that can be included in the ReAct trace.
