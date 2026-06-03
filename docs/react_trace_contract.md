# ReAct Trace Contract

Submission traces must show the agent loop in a repeatable format so the grader can see how the final answer was produced.

## Required fields

Each step should include:

- `Step N`
- `Thought`
- `Action`
- `Action Input`
- `Observation`

The full trace must also include:

- `User Query`
- `Parsed Conditions`
- `Reflection`
- `Final Answer`

## Required action names

- `agent.parse_user_query`
- `agent.plan_steps`
- `weather.get_weather`
- `memory.save_meal_history`
- `restaurant.search_restaurants`
- `agent.score_and_draft`
- `place.get_place_detail`
- `reflection.check`
- `agent.finalize`
