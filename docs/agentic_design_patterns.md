# Agentic Design Patterns

## ReAct Pattern

- Applied in: `app/agent/react_agent.py`
- Purpose: separates reasoning into `Thought`, `Action`, `Action Input`, and `Observation` steps.
- Trace evidence: `submission_outputs/실행로그_trace.txt` contains each step with fixed labels.

## Plan-and-Solve Pattern

- Applied in: `app/agent/react_agent.py` action `agent.plan_steps`
- Purpose: builds an explicit tool-use plan before calling weather, memory, restaurant, place, and reflection tools.
- Trace evidence: the `agent.plan_steps` step lists planned actions.

## Reflection Pattern

- Applied in: `app/agent/reflection.py`
- Purpose: checks region, price, rating, review count, companion, dinner purpose, and recommendation count before finalizing.
- Trace evidence: `reflection.check` appears as an Action in the ReAct trace.

## Tool Use Pattern

- Applied in: `app/mcp_clients/mcp_client_manager.py` and `mcp_servers/*.py`
- Purpose: isolates weather, memory, restaurant search, and place detail capabilities as tools.
- Trace evidence: `weather.get_weather`, `memory.save_meal_history`, `restaurant.search_restaurants`, and `place.get_place_detail` appear in the trace.

## Memory Pattern

- Applied in: `mcp_servers/memory_server.py`
- Purpose: records meal request history in memory for a session.
- Trace evidence: `memory.save_meal_history` Observation includes `memory_scope`.
