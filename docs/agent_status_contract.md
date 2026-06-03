# Agent Status Contract

The agent returns one of three statuses.

- `ok`: recommendations were produced.
- `needs_clarification`: the user must clarify the location or request.
- `no_results`: no candidate could be returned under the current flow.

Tests cover successful and unknown-region status behavior.
