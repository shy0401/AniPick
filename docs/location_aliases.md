# Location Aliases

`app/data/korea_location_aliases.json` maps natural language place names to canonical regions and areas.

## Purpose

The resolver prevents silent fallback to Jeonju when a user gives an unknown region. Known aliases are mapped to canonical values, while unknown locations produce a clarification flow.
