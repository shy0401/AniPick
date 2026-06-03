# Top-K Policy

The parser extracts requested result counts from natural language.

## Rules

- Default is 3 results.
- Minimum is 1.
- Maximum is 10.
- The restaurant tool returns at most `top_k` selected candidates.

This keeps assignment outputs predictable and prevents excessive output.
