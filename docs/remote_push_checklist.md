# Remote Push Checklist

Before telling the user the work is available remotely, confirm:

```bash
git status --short --branch
git rev-list --count main..HEAD
git rev-list --count origin/main..origin/assignment/food-agent-react-trace
git ls-remote --heads origin assignment/food-agent-react-trace
```

The local branch should track the remote branch with no ahead or behind markers.
