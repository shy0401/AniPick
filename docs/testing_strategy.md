# Testing Strategy

This project keeps the assignment scenario stable with focused tests around the parser, tool layer, ReAct trace, reflection, API endpoint, and packaging script.

## Test groups

- `tests/test_assignment_scenario.py`: locks the required Jeonju Gaeksa prompt.
- `tests/test_error_handling.py`: checks clarification and failure observations.
- `tests/test_location_resolver.py`: verifies supported and unsupported locations.
- `tests/test_query_parser_conditions.py`: checks extracted structured conditions.
- `tests/test_scoring_rules.py`: validates ranking rules.
- `tests/test_restaurant_tool.py`: checks fallback restaurant search.
- `tests/test_supporting_tools.py`: checks weather, place, and memory tools.
- `tests/test_trace.py`: checks submission trace sections.

## Required command

```bash
python -m pytest -q
```
