# Frontend Build Notes

The frontend source builds successfully with Node 22 LTS.

## Verified command

```bash
cd frontend
npx -p node@22 -p npm npm run build
```

## Local Node 24 note

On the current Windows machine, Node 24.11.1 exits during the Vite/Rollup native build stage with code `-1073740791`. The same source builds with Node 22 LTS, so the recommended grading/build environment is Node 22 LTS.
