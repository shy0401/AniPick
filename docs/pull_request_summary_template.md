# Pull Request Summary Template

## Summary

- Adds restaurant recommendation AI Agent structure.
- Adds ReAct trace output and reflection checks.
- Adds fallback MCP-style tools and sample data.
- Adds submission scripts and packaging checks.
- Adds tests and documentation for assignment grading.

## Validation

- `python -m pytest -q`
- `python scripts/run_submission_scenario.py`
- `cd frontend && npx -p node@22 -p npm npm run build`
- `python scripts/package_submission.py --name ??? --student-id 202112026`
