# Presets-Referenz

xfetch wird mit einer umfassenden Bibliothek von Preset-Konfigurationen ausgeliefert, die verschiedene Layouts, visuelle Stile und Plugin-Integrationen demonstrieren. Diese Presets befinden sich im `configs/`-Repository.

## Layout-Presets

Befindlich in `configs/xfetch/presets/layouts/`, demonstrieren diese jeden verfugbaren Layout-Stil mit vollstandigen Modulsets.

### box

Rendert alle Module innerhalb einer Box mit abgerundeten Ecken und Trennlinien zwischen Gruppen.

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

Klassisches Layout mit `...`-Trennern alle 3 Elemente. Verschiedene Farbthemen pro Modulgruppe.

### pacman

Gerahmtes Layout mit Pac-Man-thematischen Kopf-Icons und FuRtext.

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

Gruppiertes Layout mit titelierten Abschnitten.

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

Zweispaltiges Layout mit Textlabels als Icons und Werten nebeneinander.

### tree

Hierarchischer Baum mit verschachtelten Gruppen, die OS-, DE- und PC-Kategorien anzeigen.

## Showcase-Presets

Befindlich in `configs/xfetch/presets/showcase/`, diese 23 Presets demonstrieren kreative visuelle Kombinationen.

### Klassische Layout-Presets

| Datei | Logo | Icons | Farben | Module |
|------|------|-------|--------|---------|
| `arch_compact_cyan.jsonc` | `arch.txt` | Standard | Ganz Cyan | 4 (os, kernel, uptime, packages) |
| `arch_full_blue.jsonc` | `arch.txt` | Standard | Ganz Blau | 13 (vollstandiges System) |
| `green_chevrons_core.jsonc` | Keins | `>>` | Ganz Grun | 5 (Kern) |
| `minimal_plus_monochrome.jsonc` | `minimal.txt` | `+` | Dunkelgrau | 6 |
| `minimal_red_compact.jsonc` | `minimal.txt` | `OS:`, `K:`, etc. | Ganz Rot | 4 |
| `monochrome_no_icons.jsonc` | Keins | `""` (leer) | Ganz Wei | 4 |
| `neon_hardware_compact.jsonc` | Keins | Nerd Fonts | Cyan + Magenta | 4 |
| `rainbow_letters.jsonc` | Keins | R-O-Y-G-B-I-V | Regenbogen | 7 |
| `x_logo_full_system.jsonc` | `x_logo.txt` | Standard | Regenbogenahnlich | 10 |
| `x_logo_red_hardware.jsonc` | `x_logo.txt` | `\u25cf` (Punkt) | Ganz Rot | 4 |

### Pac-Man-Layout-Presets

| Datei | Kopf | Fuer | Module | Palettenstil |
|------|--------|--------|---------|---------------|
| `pacman_full_white.jsonc` | Standard | Standard | Vollstandig | Standard |
| `pacman_system_compact.jsonc` | Standard | Standard | os, kernel, memory | Standard |
| `pacman_abc_shell.jsonc` | A, B, C | ABC | os, shell | Standard |
| `pacman_minus_uptime.jsonc` | -, -, - | MINUS | uptime | Standard |
| `pacman_numeric_hardware.jsonc` | 1, 2, 3 | NUM | cpu, memory | Standard |
| `pacman_plus_os.jsonc` | +, +, + | PLUS | os | Standard |
| `pacman_question_packages.jsonc` | ?, ? | QUEST | packages | Standard |
| `pacman_star_uptime.jsonc` | star, star, star | STAR | os, uptime | Standard |
| `pacman_symbols_portable.jsonc` | !, @, # | SYM | disk, battery | Standard |
| `pacman_xox_kernel.jsonc` | x, o, x | XOX | os, kernel | Standard |
| `pacman_palette_dots.jsonc` | Standard | Standard | Vollstandig | `dots` |
| `pacman_palette_lines.jsonc` | Standard | Standard | Vollstandig | `lines` |
| `pacman_palette_triangles.jsonc` | Standard | Standard | Vollstandig | `triangles` |

## Plugin-Presets

Befindlich in `configs/plugins/`, demonstrieren diese Presets Plugin-Integrationen.

### Animate-Logo-Preset

Datei: `configs/plugins/animate-logo/presets/xfetch_pacman_animate.jsonc`

Demonstriert animierte ASCII-Logos mit dem Pac-Man-Layout:

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

### Full-Stack-Preset

Datei: `configs/plugins/full-stack/presets/full_stack.jsonc`

Demonstriert alle Funktionen zusammen: Animation, mehrere Info-Plugins, gruppiertes Abschnittslayout.

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

**Erforderliche Plugins:** `animate-logo`, `docker`, `github-stats`

### Enhanced Modules Preset (Phase 6)

Datei: `configs/plugins/new-modules/presets/enhanced_modules.jsonc`

Demonstriert alle sechs Phase-6-erweiterten Module in einem gruppierten Layout:

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

**Erforderliche Plugins:** `music-player`, `weather`, `timezone`, `user-info`, `display-resolution`, `theme-detection`

## Presets verwenden

```bash
# Mit einem beliebigen Preset ausfuhren
xfetch --config /pfad/zu/preset.jsonc

# Ein Preset als Standard verwenden
cp configs/xfetch/presets/showcase/neon_hardware_compact.jsonc ~/.config/xfetch/config.jsonc

# Eine Standardkonfiguration als Ausgangspunkt generieren
xfetch --gen-config
```

Die generierte Standardkonfiguration verwendet das Abschnittslayout mit gruppierten Modulen und vollstandiger Icon-/Farbanpassung.
