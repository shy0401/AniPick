# Packaging Security Notes

`scripts/package_submission.py` creates the final assignment zip and performs a basic secret scan before writing the archive.

## Excluded paths

- `.git/`
- `.env`
- `.venv/`
- `venv/`
- `__pycache__/`
- `.pytest_cache/`
- `node_modules/`
- `dist/`
- `build/`
- `.idea/`
- `*.iml`

## Secret patterns

The script rejects common non-empty API key assignments such as `OPENAI_API_KEY`, `KAKAO_REST_API_KEY`, `NAVER_CLIENT_SECRET`, and `GOOGLE_PLACES_API_KEY`.
