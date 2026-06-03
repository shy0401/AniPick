# Error Handling Matrix

| Situation | Agent behavior |
| --- | --- |
| Unknown region | Stop recommendation and ask for location clarification |
| Vague food type | Continue recommendation and add a warning observation |
| Tool call failure | Return `tool_call_failed` observation |
| No search results | Return `no_search_results` observation and relaxation options |
| External API key missing | Use fallback sample data and record fallback observation |

The agent does not fill missing results with another random region.
