# theme-manager

Browses, searches, and installs themes from a remote or local registry.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-theme-manager`
- **Dependencies:** `curl` in PATH (for remote registries)
- **Default registry:** `https://raw.githubusercontent.com/xfetch-cli/configs/main/themes/index.json`

## Configuration

```jsonc
{
    "info_plugins": [{
        "plugin": "theme-manager",
        "args": {
            "action": "list",
            "name": "dracula",
            "query": "dark",
            "registry": "https://example.com/themes.json"
        }
    }]
}
```

## Arguments

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `action` | No | `"list"` | `list`, `search`, `info`, or `install` |
| `name` | For `info`/`install` | — | Theme name |
| `query` | For `search` | — | Search term (matches name, description, author, tags) |
| `registry` | No | xfetch-cli/configs | Registry URL (HTTP or local path with `/` or `~`) |

## Actions

| Action | Description |
|--------|-------------|
| `list` | Lists all available themes from the registry |
| `search` | Filters themes matching the query |
| `info` | Shows detailed info about a specific theme |
| `install` | Downloads a theme to `~/.config/xfetch/themes/<name>.jsonc` |

After installing a theme, activate it with `xfetch theme set <name>` or add `"theme": "<name>"` to your `config.jsonc`.
