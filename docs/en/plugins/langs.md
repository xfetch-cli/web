# langs

Shows the languages of a GitHub repository (or aggregates them across a user/org) with a Nerd Font glyph per language and, optionally, its brand color.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-langs`
- **Dependencies:** GitHub API access; a token is recommended

## Installation

```bash
xfetch plugin install langs
```

## Configuration

A single repository:

```jsonc
{
    "info_plugins": [
        { "plugin": "langs", "args": { "repo": "xfetch-cli/xfetch" } }
    ],
    "modules": ["plugin:langs"]
}
```

Or aggregate the primary language of every repository of a user/org:

```jsonc
{
    "info_plugins": [
        { "plugin": "langs", "args": { "owner": "xfetch-cli", "limit": 4 } }
    ],
    "modules": ["plugin:langs"]
}
```

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `repo` | string | none | Repository as `owner/name` or a full GitHub URL; shows the exact byte breakdown |
| `owner` | string | none | User or org; aggregates the primary language of its repositories |
| `limit` | number | `5` | How many languages to show |
| `color` | boolean | `true` | Tint each language with its brand color (truecolor ANSI) |
| `include_forks` | boolean | `false` | Include forks when aggregating an `owner` |
| `info` | boolean | `true` | Print repository/owner metadata |
| `token` | string | none | GitHub token; also read from `GITHUB_TOKEN` or `GH_TOKEN` |

## Output

```
 Rust 96.4%
 Python 2.1%
 Shell 1.1%

 Rust ×12 (60%)
 Python ×3 (15%)
 Shell ×2 (10%)
```

Repository mode also prints metadata first: description, stars, forks, open issues, license, size, branch, updated, topics and homepage, plus `Archived`/`Private` when set.

Without a token GitHub allows 60 requests/hour and each run does 2 calls; set `GITHUB_TOKEN`/`GH_TOKEN` for regular use. If a layout measures widths and the tint shifts alignment, set `"color": false`.
