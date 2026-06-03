# Final Verification Commands

Run these commands before submitting.

```bash
python -m pytest -q
python scripts/run_submission_scenario.py
cd frontend
npx -p node@22 -p npm npm run build
cd ..
python scripts/package_submission.py --name ??? --student-id 202112026
```

The generated zip should be `???_202112026_??4.zip`.
