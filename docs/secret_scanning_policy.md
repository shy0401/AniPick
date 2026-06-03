# Secret Scanning Policy

The package script performs a local secret-like value scan before creating the zip.

## Policy

- Empty `.env.example` values are allowed.
- Real `.env` files are excluded.
- Non-empty API key assignments for configured providers abort packaging.
- The generated zip is not committed to Git.
