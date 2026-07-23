# Themes

The theme system separates visual appearance (colors, icons, layout) from module configuration, allowing you to switch looks without touching your module setup.

## Architecture

Themes operate at the config loading layer, before any rendering or plugin execution occurs.

```
config.jsonc (theme: "dracula", modules: [...])
       |
       v
   Load default Config
       |
       v
   Load theme/<name>.jsonc
       |
       v
   Merge: defaults <- theme <- config.jsonc
       |
       v
   Final Config (used by renderer)
```

## Merge Order (last wins)

Each layer can override any visual field:

| Layer | Source | Contains |
|-------|--------|----------|
| 1. Core defaults | Hardcoded in `config.rs` | Default icons, colors, layout |
| 2. Theme file | `themes/<name>.jsonc` | `colors`, `icons`, `layout`, `palette_style`, `logo_path`, `header_icons`, `footer_text`, `show_colors` |
| 3. User config | `config.jsonc` | `modules`, `info_plugins`, plus overrides for any visual field |

A field in `config.jsonc` always wins over the same field in the theme file.

## Theme File Format

A theme file is a JSONC document containing only visual fields. It must NOT contain `modules` or `info_plugins`.

```jsonc
{
    "layout": "section",
    "show_colors": true,
    "palette_style": "circles",
    "colors": {
        "os": "Magenta",
        "cpu": "Red",
        "memory": "Yellow",
        "disk": "Cyan",
        "shell": "Green",
        "wm": "Blue"
    },
    "icons": {
        "os": "\uf17c",
        "cpu": "\uf2db",
        "memory": "\ue266",
        "disk": "\uf0a0",
        "shell": "\uf0e7",
        "wm": "\uf08e"
    },
    "logo_path": null,
    "header_icons": null,
    "footer_text": null
}
```

### Supported Fields

| Field | Type | Description |
|-------|------|-------------|
| `layout` | `string` or `null` | Layout style name |
| `colors` | `object` | Per-module color mapping |
| `icons` | `object` | Per-module icon mapping |
| `palette_style` | `string` or `null` | Palette display: `squares`, `circles`, `triangles`, `lines`, `dots` |
| `show_colors` | `boolean` | Enable or disable ANSI color output |
| `logo_path` | `string` or `null` | Path to a logo file |
| `header_icons` | `array` or `null` | Pac-Man layout header icons |
| `footer_text` | `string` or `null` | Pac-Man layout footer text |

## Theme Resolution

When xfetch loads a config with `theme: "dracula"`, the resolver searches in order:

1. **Direct path** — If the value is a file path (contains `/` or starts with `~`), load it directly
2. **Themes directory** — Look for `<name>.jsonc` in `~/.config/xfetch/themes/`

If the theme is not found, the config loads as-is without the theme.

## CLI Commands

```bash
# List installed themes
xfetch theme list

# Activate a theme (sets "theme" field in config.jsonc)
xfetch theme set nord

# Remove a theme file
xfetch theme remove nord

# Export current visual config as a theme file
xfetch theme export my-theme
```

### Export Behavior

`xfetch theme export <name>` captures the current runtime visual state (after merge) and writes it to `~/.config/xfetch/themes/<name>.jsonc`. This allows sharing your look without exposing your module list.

The exported file contains only:
- `layout`
- `colors`
- `icons`
- `palette_style`
- `header_icons`
- `footer_text`
- `logo_path`
- `show_colors`

## Backward Compatibility

The theme system is fully backward compatible:

- **Without `theme` field:** Everything works exactly as before. The config file contains all visual fields directly.
- **Existing configs:** Can be migrated by exporting: `xfetch theme export current`, then setting `"theme": "current"` and removing visual fields from the main config.
- **Plugin configs:** Plugin references (`info_plugins`) remain exclusively in `config.jsonc`, never in theme files.

## Directory Structure

```
~/.config/xfetch/
    config.jsonc            # Modules, plugins, and optional theme reference
    themes/
        dracula.jsonc       # Theme files: colors, icons, layout
        nord.jsonc
        catppuccin-mocha.jsonc
        retro-pacman.jsonc
        berlin.jsonc
        tree-compact.jsonc
```

## Built-in Themes

The official themes repository is located at `github.com/xfetch-cli/configs` under `themes/`:

| Theme | Layout | Style |
|-------|--------|-------|
| `dracula` | section | Dark magenta, red, and cyan palette |
| `nord` | section | Cool blue and arctic cyan palette |
| `catppuccin-mocha` | section | Warm mocha pastel palette |
| `retro-pacman` | pacman | Classic Pac-Man arcade style with header icons and footer text |
| `berlin` | default | Monochrome: no colors, no icons |
| `tree-compact` | tree | Hierarchical tree layout |

## Implementation Details

### Config Loading (`config.rs`)

The merge uses `serde_json::Value` deep-merge before deserialization:

1. Parse `config.jsonc` as `serde_json::Value`
2. Deserialize to `Config` to extract the `theme` field
3. If `theme` is set, load the theme file as `serde_json::Value`
4. Create an empty `Value` and merge in order: defaults -> theme -> config
5. Deserialize the merged result to `Config`

### Theme Management (`themes/mod.rs`)

- `list_themes()` — Scans `~/.config/xfetch/themes/` for `*.jsonc` files
- `set_active_theme()` — Reads `config.jsonc`, sets the `theme` field, writes back
- `remove_theme()` — Deletes a theme file from the themes directory
- `export_current_theme()` — Builds a JSONC file from the current Config's visual fields
