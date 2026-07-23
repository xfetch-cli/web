# Configuration

xfetch uses a JSONC (JSON with Comments) configuration file. The default location is `~/.config/xfetch/config.jsonc`. You can generate a default configuration with `xfetch --gen-config` or use a custom path with `xfetch --config <path>`.

## Config File Format

JSONC extends standard JSON by allowing C-style (`//`) and C++-style (`/* */`) comments and trailing commas in objects and arrays.

## Complete Configuration Reference

```jsonc
{
    "layout": "section",
    "modules": [
        {
            "type": "group",
            "title": "Hardware",
            "modules": [
                "hostname",
                "cpu",
                "gpu",
                "memory",
                "swap",
                "disk",
                "battery"
            ]
        },
        {
            "type": "group",
            "title": "Software",
            "modules": [
                "os",
                "kernel",
                "packages",
                "shell",
                "wm",
                "terminal",
                "local_ip"
            ]
        },
        "palette"
    ],
    "show_colors": true,
    "icons": {
        "hostname": "\uf109",
        "cpu": "\uf2db",
        "gpu": "\uf0b9"
    },
    "colors": {
        "hostname": "Green",
        "cpu": "Green",
        "os": "Yellow"
    },
    "palette_style": "squares",
    "logo_path": null,
    "ascii": null,
    "header_icons": null,
    "footer_text": null,
    "disable_ip_fetching": false,
    "disable_cache": false,
    "logo_animation": null,
    "info_plugins": []
}
```

## Field Reference

### Top-Level Fields

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `layout` | `string` or `null` | `null` (classic) | Layout style name |
| `modules` | `array` | (see below) | Ordered list of modules or module groups |
| `show_colors` | `boolean` | `true` | Enable ANSI color output |
| `icons` | `object` | (built-in defaults) | Per-module icon mappings |
| `colors` | `object` | (built-in defaults) | Per-module color mappings |
| `palette_style` | `string` | `"squares"` | Palette display style |
| `logo_path` | `string` or `null` | `null` | Path to a custom logo file |
| `ascii` | `string` or `null` | `null` | Path to an ASCII art file (alternative to logo_path) |
| `header_icons` | `array` or `null` | `null` | Icons for the top border (Pac-Man layout) |
| `footer_text` | `string` or `null` | `null` | Text for the bottom border (Pac-Man layout) |
| `disable_ip_fetching` | `boolean` | `false` | Disable fetching public IP for privacy |
| `disable_cache` | `boolean` | `false` | Disable data caching |
| `logo_animation` | `object` or `null` | `null` | Logo animation configuration |
| `info_plugins` | `array` | `[]` | List of info plugins to execute |

### Default Modules

When no modules are specified, xfetch uses:

```
["os", "kernel", "uptime", "packages", "wm", "shell", "disk", "cpu", "gpu", "memory", "battery"]
```

### Module Groups

Modules can be organized into titled groups for the `section`, `tree`, and `side-block` layouts:

```jsonc
{
    "type": "group",
    "title": "Hardware",
    "modules": ["cpu", "gpu", "memory"]
}
```

Groups can be nested:

```jsonc
{
    "type": "group",
    "title": "System",
    "modules": [
        {
            "type": "group",
            "title": "Hardware",
            "modules": ["cpu", "gpu"]
        },
        {
            "type": "group",
            "title": "Software",
            "modules": ["os", "kernel"]
        }
    ]
}
```

### Icons

Icons map module names to display strings. Nerd Font glyphs are commonly used, but any Unicode or text string works.

```jsonc
{
    "icons": {
        "os": "\uf17c",
        "kernel": "\uf17c",
        "hostname": "\uf109",
        "cpu": "\uf2db",
        "gpu": "\uf0b9",
        "memory": "\ue266",
        "swap": "\uf0c5",
        "disk": "\uf0a0",
        "battery": "\uf240",
        "uptime": "\uf253",
        "packages": "\uf187",
        "shell": "\uf0e7",
        "terminal": "\uf0e7",
        "wm": "\uf08e",
        "user": "\uf007",
        "datetime": "\uf017",
        "local_ip": "\uf0ac",
        "palette": "\uf0eb",
        "plugin:<name>": "\uf271"
    }
}
```

Module keys prefixed with `plugin:` (e.g., `plugin:docker`) are used for plugin-provided information.

### Colors

Colors map module names to ANSI color names:

```jsonc
{
    "colors": {
        "os": "Cyan",
        "kernel": "White",
        "wm": "Blue",
        "shell": "Green",
        "cpu": "Green",
        "gpu": "Green",
        "memory": "Green",
        "disk": "Green",
        "battery": "Green",
        "packages": "Yellow",
        "hostname": "Green",
        "uptime": "Yellow",
        "terminal": "Green",
        "user": "Magenta"
    }
}
```

**Available color names:**

| Name | ANSI Code |
|------|-----------|
| `Black` | 30 |
| `Red` | 31 |
| `Green` | 32 |
| `Yellow` | 33 |
| `Blue` | 34 |
| `Magenta` | 35 |
| `Cyan` | 36 |
| `White` | 37 |
| `Grey` or `Gray` | 90 |

### Palette Styles

The `palette` module displays a color swatch. Available styles:

| Style | Description |
|-------|-------------|
| `"squares"` | Background color blocks (default) |
| `"circles"` | Foreground color circles |
| `"triangles"` | Foreground color triangles |
| `"lines"` | Thick horizontal color bars |
| `"dots"` | Small foreground color dots |

### Animation Configuration

The `logo_animation` field enables ASCII logo animation via a plugin:

```jsonc
{
    "logo_animation": {
        "plugin": "animate-logo",
        "fps": 12,
        "duration_ms": 1200,
        "loop": false,
        "style": "sweep",
        "frames_path": "~/.config/xfetch/logos/frames.txt"
    }
}
```

| Field | Type | Description |
|-------|------|-------------|
| `plugin` | `string` | Plugin name (e.g., `"animate-logo"`) |
| `fps` | `number` | Frames per second (1-60) |
| `duration_ms` | `number` | Total animation duration in milliseconds |
| `loop` | `boolean` | Whether to loop the animation |
| `style` | `string` | Animation style: `"sweep"`, `"wave"`, `"rainbow"`, `"sparkle"`, `"breathing"`, `"frame"`, `"none"` |
| `frames_path` | `string` | Path to pre-built frame sets (for `"frame"` style). Multiple frame sets separated by `\n===\n` |

### Plugin Integration

Info plugins are configured in the `info_plugins` array:

```jsonc
{
    "info_plugins": [
        {
            "plugin": "github-stats",
            "args": {
                "username": "myuser",
                "max_lines": 3
            }
        },
        {
            "plugin": "docker"
        }
    ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `plugin` | `string` | Plugin name (installed as `xfetch-plugin-<name>`) |
| `args` | `object` or `null` | Arbitrary JSON arguments passed to the plugin |

Plugin data is accessed via module keys prefixed with `plugin:`:

```jsonc
{
    "modules": ["os", "kernel", "plugin:github-stats", "plugin:docker"]
}
```

## Config File Locations by Platform

| Platform | Default Config Path |
|----------|-------------------|
| Linux | `~/.config/xfetch/config.jsonc` |
| macOS | `~/Library/Application Support/xfetch/config.jsonc` |
| Windows | `%APPDATA%\xfetch\config.jsonc` |
