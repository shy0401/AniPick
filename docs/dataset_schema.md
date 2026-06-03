# Dataset Schema

`app/data/restaurants.json` is the fallback restaurant dataset used when external APIs are unavailable.

## Required fields

- `id`
- `name`
- `region`
- `area`
- `category`
- `rating`
- `review_count`
- `price_range`
- `distance`
- `tags`
- `reason`
- `menus`
- `opening_hours`
- `latitude`
- `longitude`

The tests enforce these fields so the agent can generate stable recommendations and trace explanations.
