# Tool Failure Examples

Tool failures are visible as observations.

## Example

```json
{
  "error": "tool_call_failed",
  "server": "restaurant",
  "tool": "search_restaurants",
  "message": "forced failure",
  "fallback_strategy": "none",
  "user_message": "tool failed"
}
```

The agent includes this observation in the ReAct trace instead of hiding the failure.
