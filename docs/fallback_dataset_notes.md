# Fallback Dataset Notes

The assignment can run without external API keys. In that mode the agent uses `app/data/restaurants.json` and records fallback observations in the trace.

## Dataset requirements

Each restaurant candidate should include:

- region and area
- rating and review count
- price range
- distance
- tags for companion and purpose
- reason text
- menus and opening hours
- latitude and longitude

## Assignment scenario coverage

The dataset includes at least three Jeonju Gaeksa or Gaekridan-gil candidates so the required prompt can return three relevant results without fabricating another region.
