# Parser Rules

The parser converts a natural-language restaurant request into structured `ParsedRecommendationConditions`.

## Supported extraction

- Region and area through `location_resolver`
- Companion such as friend
- Purpose such as dinner
- Price sensitivity mapped to `max_price`
- Review quality mapped to `min_rating` and `min_review_count`
- Requested result count mapped to `top_k`

## Clarification behavior

Unknown regions set `needs_clarification` and `error_code` instead of silently replacing the location with Jeonju.
