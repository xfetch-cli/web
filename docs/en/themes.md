# Themes

The theme system separates visual appearance (colors, icons, layout) from module configuration, allowing you to switch looks without touching your module setup.

## Architecture

Themes operate at the config loading layer, before any rendering or plugin execution occurs.

```
config.jsonc (theme: "berlin", modules: [...])
       |
       v
   Load default Config
       |
       v
   Load user config.jsonc
       |
       v
   Load theme/<name>.jsonc
       |
       v
   Merge: defaults <- config.jsonc <- theme
       |
       v
   Final Config (used by renderer)
```

## Merge Order (last wins)

Each layer can override any visual field. Starting from **v0.2.0**, the theme has the highest priority:

| Layer | Source | Contains |
|-------|--------|----------|
| 1. Core defaults | Hardcoded in `config.rs` | Default icons, colors, layout |
| 2. User config | `config.jsonc` | `modules`, `info_plugins`, plus overrides for any visual field |
| 3. Theme file | `themes/<name>.jsonc` | `colors`, `layout`, `palette_style`, `logo_path`, `logo_color`, `logo_colors`, `header_icons`, `footer_text`, `show_colors` |

A field in the **theme file** always wins over the same field in `config.jsonc` or defaults.

### Merge details

The merge uses `deep_merge()` which works key-by-key:

- **Objects:** merged recursively — each key is resolved independently
- **Strings, numbers, booleans:** overlay replaces base
- **Empty strings:** an empty string does *not* override a non-empty string (prevents themes from accidentally clearing icons)
- **Empty objects `{}`:** no-op — existing keys are preserved

> **Upgrade note (v0.1.x → v0.2.0):** In v0.1.x, `config.jsonc` won over the theme. If you upgrade,
> your existing config may override the theme. Export your current look with
> `xfetch theme export my-look`, set `"theme": "my-look"`, and remove visual fields from `config.jsonc`.

## Theme File Format

A theme file is a JSONC document containing only visual fields. It should NOT contain `modules` or `info_plugins`.

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
    }
}
```

### Supported Fields

| Field | Type | Description |
|-------|------|-------------|
| `layout` | `string` or `null` | Layout style name |
| `colors` | `object` | Per-module color mapping |
| `palette_style` | `string` or `null` | Palette display: `squares`, `circles`, `triangles`, `lines` |
| `show_colors` | `boolean` | Enable or disable inline ANSI color swatches |
| `logo_path` | `string` or `null` | Path to a logo file |
| `logo_color` | `string` or `null` | Color for ASCII logos (name, hex, or RGB) |
| `logo_colors` | `array` or `null` | Per-row colors for ASCII logos (`row i` uses `logo_colors[i % len]`) |
| `header_icons` | `array` or `null` | Pac-Man layout header icons |
| `footer_text` | `string` or `null` | Pac-Man layout footer text |

Themes do not carry `icons` — icon choice is up to the user's font; the core fills in icons from the built-in defaults.

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
        dracula.jsonc       # Theme files: colors, layout
        nord.jsonc
        catppuccin-mocha.jsonc
        retro-pacman.jsonc
        berlin.jsonc
        tree-compact.jsonc
```

## Built-in Themes

The official themes repository is located at `github.com/xfetch-cli/themes`, registered via `index.json` with theme files under `colors/`:

| Theme | Layout | Style |
|-------|--------|-------|
| `dracula` | section | Dark magenta, red, and cyan palette |
| `nord` | section | Cool blue and arctic cyan palette |
| `catppuccin-mocha` | section | Warm mocha pastel palette |
| `retro-pacman` | pacman | Classic Pac-Man arcade style with header icons and footer text |
| `berlin` | default | No colors and no icons: clean text-only output |
| `tree-compact` | tree | Hierarchical tree layout with a cool blue-green scheme |
| `bogota` | bottom | Bottom layout with a warm red, magenta and white palette |
| `helsinki` | line | Single-line layout with a green, blue and magenta accent mix |
| `lahabana` | section | Section layout with a red, magenta and white palette |
| `london` | minimal | Minimal greyscale palette (white and grey) |
| `madrid` | default | Default layout with a red, green and blue tricolor palette |
| `miami` | section | Section layout with a magenta, cyan and white vaporwave palette |
| `oslo` | compact | Compact layout with a cool blue, cyan and white palette |
| `paris` | box | Box layout with a red, magenta and white palette |
| `praha` | section | Section layout with a red and magenta palette, triangle swatches |
| `tokio` | horizontal | Horizontal layout with a red, white and magenta palette |
| `x` | section | Section layout with a cyan, magenta and white accent set |

## Implementation Details

### Config Loading (`config.rs`)

The merge uses `serde_json::Value` deep-merge before deserialization:

1. Parse `config.jsonc` as `serde_json::Value`
2. Deserialize to `Config` to extract the `theme` field
3. If `theme` is set, load the theme file as `serde_json::Value`
4. Create an empty `Value` and merge in order: defaults → config.jsonc → theme
5. Deserialize the merged result to `Config`

### Theme Management (`themes/mod.rs`)

- `list_themes()` — Scans `~/.config/xfetch/themes/` for `*.jsonc` files
- `set_active_theme()` — Reads `config.jsonc`, sets the `theme` field, writes back
- `remove_theme()` — Deletes a theme file from the themes directory
- `export_current_theme()` — Builds a JSONC file from the current Config's visual fields
