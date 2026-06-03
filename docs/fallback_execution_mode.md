# Fallback Execution Mode

The assignment can run without provider API keys.

## Behavior

- Weather returns fallback sample context.
- Restaurant search uses `app/data/restaurants.json`.
- Place detail uses the fallback restaurant dataset.
- Observations indicate fallback usage.

This makes the submission reproducible in a grading environment.
