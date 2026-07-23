# Presets Reference

xfetch ships with a comprehensive library of preset configurations demonstrating various layouts, visual styles, and plugin integrations. These presets are located in the `configs/` repository.

## Layout Presets

Located in `configs/xfetch/presets/layouts/`, these demonstrate every available layout style with full module sets.

### box

Renders all modules inside a rounded-corner box with separator lines between groups.

```jsonc
{
    "layout": "box",
    "modules": ["user", "hostname", "sep", "os", "kernel", "uptime", "packages",
                 "shell", "terminal", "wm", "cpu", "gpu", "memory", "disk",
                 "battery", "local_ip", "sep", "palette"],
    "show_colors": true
}
```

### dots

Classic layout with `...` separators every 3 items. Different color themes per module group.

### pacman

Boxed layout with Pac-Man themed header icons and footer text.

```jsonc
{
    "layout": "pacman",
    "header_icons": ["\u15a7", "\u25cf", "\u25cf", "\u25cf", "\u25cf"],
    "footer_text": "GAME OVER",
    "modules": ["header", "os", "kernel", "uptime", "packages", "shell",
                 "terminal", "wm", "cpu", "gpu", "memory", "disk",
                 "battery", "local_ip", "palette"]
}
```

### section

Grouped layout with titled sections.

```jsonc
{
    "layout": "section",
    "modules": [
        {
            "type": "group", "title": "Hardware",
            "modules": ["hostname", "cpu", "gpu", "memory", "disk"]
        },
        {
            "type": "group", "title": "Software",
            "modules": ["os", "kernel", "packages", "terminal", "shell"]
        },
        {
            "type": "group", "title": "Uptime/Age/DT",
            "modules": ["uptime", "wm", "local_ip", "battery"]
        },
        "palette"
    ]
}
```

### side-block

Two-column layout with text labels as icons and values aligned side by side.

### tree

Hierarchical tree with nested groups displaying OS, DE, and PC categories.

## Showcase Presets

Located in `configs/xfetch/presets/showcase/`, these 23 presets demonstrate creative visual combinations.

### Classic Layout Presets

| File | Logo | Icons | Colors | Modules |
|------|------|-------|--------|---------|
| `arch_compact_cyan.jsonc` | `arch.txt` | default | All Cyan | 4 (os, kernel, uptime, packages) |
| `arch_full_blue.jsonc` | `arch.txt` | default | All Blue | 13 (full system) |
| `green_chevrons_core.jsonc` | none | `>>` | All Green | 5 (core) |
| `minimal_plus_monochrome.jsonc` | `minimal.txt` | `+` | DarkGrey | 6 |
| `minimal_red_compact.jsonc` | `minimal.txt` | `OS:`, `K:`, etc. | All Red | 4 |
| `monochrome_no_icons.jsonc` | none | `""` (empty) | All White | 4 |
| `neon_hardware_compact.jsonc` | none | Nerd Fonts | Cyan + Magenta | 4 |
| `rainbow_letters.jsonc` | none | R-O-Y-G-B-I-V | Rainbow | 7 |
| `x_logo_full_system.jsonc` | `x_logo.txt` | default | Rainbow-like | 10 |
| `x_logo_red_hardware.jsonc` | `x_logo.txt` | `\u25cf` (dot) | All Red | 4 |

### Pac-Man Layout Presets

| File | Header | Footer | Modules | Palette Style |
|------|--------|--------|---------|---------------|
| `pacman_full_white.jsonc` | Default | Default | Full | Default |
| `pacman_system_compact.jsonc` | Default | Default | os, kernel, memory | Default |
| `pacman_abc_shell.jsonc` | A, B, C | ABC | os, shell | Default |
| `pacman_minus_uptime.jsonc` | -, -, - | MINUS | uptime | Default |
| `pacman_numeric_hardware.jsonc` | 1, 2, 3 | NUM | cpu, memory | Default |
| `pacman_plus_os.jsonc` | +, +, + | PLUS | os | Default |
| `pacman_question_packages.jsonc` | ?, ? | QUEST | packages | Default |
| `pacman_star_uptime.jsonc` | star, star, star | STAR | os, uptime | Default |
| `pacman_symbols_portable.jsonc` | !, @, # | SYM | disk, battery | Default |
| `pacman_xox_kernel.jsonc` | x, o, x | XOX | os, kernel | Default |
| `pacman_palette_dots.jsonc` | Default | Default | Full | `dots` |
| `pacman_palette_lines.jsonc` | Default | Default | Full | `lines` |
| `pacman_palette_triangles.jsonc` | Default | Default | Full | `triangles` |

## Plugin Presets

Located in `configs/plugins/`, these presets demonstrate plugin integrations.

### Animate-Logo Preset

File: `configs/plugins/animate-logo/presets/xfetch_pacman_animate.jsonc`

Demonstrates animated ASCII logos with the Pac-Man layout:

```jsonc
{
    "layout": "pacman",
    "ascii": "~/.config/xfetch/logos/xfetch_logo.txt",
    "logo_animation": {
        "plugin": "animate-logo",
        "fps": 12,
        "duration_ms": 1200,
        "loop": false
    }
}
```

### Full-Stack Preset

File: `configs/plugins/full-stack/presets/full_stack.jsonc`

Demonstrates all features together: animation, multiple info plugins, grouped section layout.

```jsonc
{
    "layout": "section",
    "logo_animation": {
        "plugin": "animate-logo",
        "style": "frame",
        "fps": 60,
        "duration_ms": 7500,
        "loop": true,
        "frames_path": "~/.config/xfetch/logos/decryptfull.txt"
    },
    "info_plugins": [
        { "plugin": "github-stats", "args": { "username": "xscriptor", "max-lines": 4 } },
        { "plugin": "docker" }
    ],
    "modules": [
        { "type": "group", "title": "Hardware", "modules": ["hostname", "cpu", "gpu", "memory", "swap", "disk", "battery"] },
        { "type": "group", "title": "Software", "modules": ["os", "kernel", "packages", "shell", "wm", "terminal", "local_ip", "plugin:docker"] },
        { "type": "group", "title": "Session", "modules": ["user", "uptime", "datetime", "plugin:github-stats"] },
        "palette"
    ],
    "icons": {
        "plugin:docker": "\ue7b0",
        "plugin:github-stats": "\uf09b"
    },
    "colors": {
        "plugin:github-stats": "Cyan",
        "plugin:docker": "Cyan"
    }
}
```

**Required plugins:** `animate-logo`, `docker`, `github-stats`

### Enhanced Modules Preset (Phase 6)

File: `configs/plugins/new-modules/presets/enhanced_modules.jsonc`

Demonstrates all six Phase 6 enhanced modules in a grouped layout:

```jsonc
{
    "layout": "section",
    "info_plugins": [
        { "plugin": "music-player" },
        { "plugin": "weather", "args": { "location": "auto" } },
        { "plugin": "timezone" },
        { "plugin": "user-info" },
        { "plugin": "display-resolution" },
        { "plugin": "theme-detection" }
    ],
    "modules": [
        { "type": "group", "title": "System", "modules": ["os", "kernel", "hostname", "uptime"] },
        { "type": "group", "title": "User", "modules": ["plugin:user-info", "plugin:timezone", "plugin:theme-detection"] },
        { "type": "group", "title": "Hardware", "modules": ["cpu", "gpu", "memory", "disk", "plugin:display-resolution"] },
        { "type": "group", "title": "Media", "modules": ["plugin:music-player", "plugin:weather"] },
        "palette"
    ],
    "icons": {
        "plugin:user-info": "\uf007",
        "plugin:timezone": "\uf43a",
        "plugin:theme-detection": "\uf07c",
        "plugin:display-resolution": "\uf26c",
        "plugin:music-player": "\uf001",
        "plugin:weather": "\uf185"
    },
    "colors": {
        "plugin:user-info": "Magenta",
        "plugin:timezone": "Cyan",
        "plugin:theme-detection": "Blue",
        "plugin:display-resolution": "Green",
        "plugin:music-player": "Yellow",
        "plugin:weather": "Cyan"
    }
}
```

**Required plugins:** `music-player`, `weather`, `timezone`, `user-info`, `display-resolution`, `theme-detection`

## Using Presets

```bash
# Run with any preset
xfetch --config /path/to/preset.jsonc

# Use a preset as your default
cp configs/xfetch/presets/showcase/neon_hardware_compact.jsonc ~/.config/xfetch/config.jsonc

# Generate a default config as a starting point
xfetch --gen-config
```

The generated default configuration uses the section layout with grouped modules and full icon/color customization.
