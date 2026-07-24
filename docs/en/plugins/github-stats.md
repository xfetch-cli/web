# github-stats

Fetches GitHub user profile statistics.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-github-stats`
- **Dependencies:** `curl` in PATH
- **API calls:** 4 requests to api.github.com

## Configuration

```jsonc
{
    "info_plugins": [{
        "plugin": "github-stats",
        "args": {
            "username": "xscriptor",
            "token": "ghp_your_token_here",
            "max_lines": 3
        }
    }],
    "modules": ["plugin:github-stats"]
}
```

## Arguments

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `username` | Yes (or `GITHUB_USER` env) | — | GitHub username |
| `token` | No | — | Personal access token (5000 req/h vs 60 req/h unauthenticated) |
| `max_lines` | No | all 7 | Limit output to first N lines (1–7) |

## Output

| # | Line |
|---|------|
| 1 | ` Name (@username)` |
| 2 | ` N stars` |
| 3 | ` N repos` |
| 4 | ` N PRs` |
| 5 | ` N issues` |
| 6 | ` N followers` |
| 7 | ` N following` |
