# Weather Policy

Weather is used as supporting context only.

When no external weather API is configured, the weather tool returns fallback sample data and records `api_fallback_used` in the observation. Weather should not override explicit user constraints such as region, area, price, or review quality.
