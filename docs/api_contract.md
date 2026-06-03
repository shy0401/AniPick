# API Contract

## `GET /health`

Returns service status.

## `GET /mcp/status`

Returns the available MCP-style tools.

## `POST /agent/run`

Returns the full agent result including parsed conditions, recommendations, trace, reflection, and final answer.

## `POST /recommend`

Returns a smaller compatibility shape with parsed conditions, recommendations, final answer, and status.
