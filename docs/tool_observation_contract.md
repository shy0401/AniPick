# Tool Observation Contract

Tool failures and empty results are represented as observations instead of hidden exceptions.

## Tool call failure

```json
{
  "error": "tool_call_failed",
  "server": "restaurant",
  "tool": "search_restaurants",
  "message": "...",
  "fallback_strategy": "...",
  "user_message": "..."
}
```

## No search results

```json
{
  "warning": "no_search_results",
  "message": "Requested conditions returned no candidates.",
  "relaxation_options": ["relax price", "relax review count", "expand area"],
  "not_done": "The agent did not substitute another region."
}
```
