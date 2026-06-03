# Clarification Policy

Unknown regions trigger a clarification flow.

The parser sets:

- `needs_clarification = true`
- `error_code = "unknown_region"`
- `suggested_queries` with useful alternatives

The final answer asks the user to clarify the region instead of returning unrelated restaurant recommendations.
