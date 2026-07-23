# Theme Manager Plugin

The theme-manager plugin allows browsing, searching, inspecting, and installing xfetch themes from the remote theme registry.

## Overview

Unlike other info plugins that display system data, the theme-manager interacts with the theme registry at `github.com/xfetch-cli/configs` to discover and download theme files.

| Property | Value |
|----------|-------|
| Kind | `info_provider` |
| Binary | `xfetch-plugin-theme-manager` |
| Dependencies | `curl` CLI (for remote registry) |

## Installation

```bash
xfetch plugin install theme-manager
```

## Actions

The plugin behavior is controlled by the `action` field in the plugin arguments.

### list (default)

Displays all available themes from the registry:

```jsonc
{
    "info_plugins": [
        { "plugin": "theme-manager" }
    ],
    "modules": ["plugin:theme-manager"]
}
```

### search

Filters themes by name, description, author, or tags:

```jsonc
{
    "info_plugins": [
        {
            "plugin": "theme-manager",
            "args": {
                "action": "search",
                "query": "dark"
            }
        }
    ],
    "modules": ["plugin:theme-manager"]
}
```

### info

Shows detailed information about a specific theme:

```jsonc
{
    "info_plugins": [
        {
            "plugin": "theme-manager",
            "args": {
                "action": "info",
                "name": "dracula"
            }
        }
    ],
    "modules": ["plugin:theme-manager"]
}
```

### install

Downloads a theme file from the registry and saves it to `~/.config/xfetch/themes/<name>.jsonc`:

```jsonc
{
    "info_plugins": [
        {
            "plugin": "theme-manager",
            "args": {
                "action": "install",
                "name": "dracula"
            }
        }
    ],
    "modules": ["plugin:theme-manager"]
}
```

After installation, activate the theme with `xfetch theme set <name>` or by adding `"theme": "<name>"` to your `config.jsonc`.

## Arguments

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `action` | `string` | No | One of `list` (default), `search`, `info`, `install` |
| `name` | `string` | For `info` and `install` | Theme identifier (e.g., `dracula`, `nord`) |
| `query` | `string` | For `search` | Search term matching name, description, author, or tags |
| `registry` | `string` | No | Custom registry URL or local file path |

## Output Examples

### list output

```
Theme Manager -- 6 themes available

  dracula  xscriptor  section  (#dark #dracula #popular)
       Dark magenta, red, and cyan palette inspired by the Dracula color scheme.

  nord  xscriptor  section  (#light #nord #arctic #minimal)
       Cool blue and arctic cyan palette based on the Nord color scheme.

  catppuccin-mocha  xscriptor  section  (#dark #catppuccin #mocha #pastel)
       Warm mocha pastel palette from the Catppuccin Mocha color scheme.

  retro-pacman  xscriptor  pacman  (#retro #pacman #arcade #game)
       Classic Pac-Man arcade style with game-inspired header icons.

  berlin  xscriptor  default  (#monochrome #minimal #no-icons #no-colors)
       Monochrome theme with no colors and no icons.

  tree-compact  xscriptor  tree  (#tree #hierarchical #compact #nested)
       Hierarchical tree layout with a cool blue-green color scheme.
```

### install output

```
Theme 'dracula' installed successfully.
  Path: /home/user/.config/xfetch/themes/dracula.jsonc
  Author: xscriptor
  Layout: section

Activate with: xfetch theme set dracula
Or add to config.jsonc: "theme": "dracula"
```

## Registry

The default registry URL is:

```
https://raw.githubusercontent.com/xfetch-cli/configs/main/themes/index.json
```

The registry is a JSON file containing metadata for all available themes. Each theme entry includes:

| Field | Description |
|-------|-------------|
| `name` | Theme identifier used in `"theme": "<name>"` |
| `author` | Theme creator |
| `version` | Semantic version |
| `description` | Short description of the theme |
| `layout` | Default layout for the theme |
| `palette_style` | Default palette display style |
| `tags` | Searchable keywords |
| `source` | URL to download the theme JSONC file |

## Custom Registry

You can use a self-hosted or local registry:

```jsonc
{
    "plugin": "theme-manager",
    "args": {
        "registry": "/home/user/my-themes/index.json"
    }
}
```

Local paths (starting with `/` or `~`) are read directly from the filesystem. Remote URLs are fetched via `curl`.

## How It Works

1. xfetch sends a JSON request with `kind: "info_provider"` and the configured args.
2. The plugin reads the registry file (local path or remote URL via `curl`).
3. Based on the `action` field, the plugin filters or displays theme information.
4. For `install`, the theme JSONC file is downloaded and saved to the themes directory.
5. The plugin returns the formatted lines as a JSON response.
6. xfetch displays them under the `plugin:theme-manager` module key.

## Notes

- Requires `curl` for remote registry access. Local file paths work without curl.
- Network connectivity is required for remote registry operations.
- The `registry` argument allows pointing to a custom or mirrored registry.
- After installing a theme, activate it using the core `xfetch theme set` command or by editing `config.jsonc` directly.
