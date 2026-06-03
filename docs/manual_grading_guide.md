# Manual Grading Guide

Use this quick flow to inspect the submission manually.

## 1. Run tests

```bash
python -m pytest -q
```

## 2. Generate trace

```bash
python scripts/run_submission_scenario.py
```

## 3. Inspect trace files

- `submission_outputs/????_trace.txt`
- `submission_outputs/????_trace.json`
- `submission_outputs/??_??_??.md`

## 4. Create zip

```bash
python scripts/package_submission.py --name ??? --student-id 202112026
```

## 5. Check expected behavior

The final answer should recommend three Jeonju restaurants and the trace should show parser, weather, memory, restaurant, place, reflection, and finalize actions.
