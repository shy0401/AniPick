# Local Development Notes

## Python

Use the repository root as the working directory when running tests or scripts.

```bash
python -m pytest -q
python scripts/run_submission_scenario.py
```

## Frontend

Use Node 22 LTS for the Vite production build on Windows.

```bash
cd frontend
npx -p node@22 -p npm npm run build
```
