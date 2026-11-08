# banner-text

Emits one or more text lines from a file or a literal argument as an info provider. It is intended for captions and banners below the stats column and works with both ASCII and image logos.

Unlike the `banner` logo-animation plugin, which is skipped when xfetch renders an image logo, `banner-text` runs as an info provider and is rendered wherever its module key appears in the `modules` list.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-banner-text`
- **Dependencies:** none

## Installation

```bash
xfetch plugin install banner-text
```

## Configuration

```jsonc
{
    "info_plugins": [
        {
            "plugin": "banner-text",
            "args": {
                "path": "~/.config/xfetch/banners/cyberpunk.txt",
                "blank_line": true
            }
        }
    ],
    "modules": ["os", "kernel", "shell", "plugin:banner-text"],
    "icons": { "plugin:banner-text": "" },
    "labels": { "plugin:banner-text": "" }
}
```

Place `plugin:banner-text` at the end of `modules` to render the text below the stats. The empty `icons` and `labels` entries hide the synthetic module key; they are optional but recommended.

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `path` | string | none | Path to a UTF-8 text file. `~` and `~/` expand to the home directory |
| `text` | string | none | Literal text used when `path` is missing, unreadable or empty |
| `blank_line` | boolean | `true` | Prepend an empty line before the text |

If both `path` and `text` are empty, the plugin returns no lines. Each line is emitted separately; trailing whitespace and leading/trailing empty lines are removed, while leading spaces on non-empty lines are preserved.

## Output

Given a file containing `永遠は朽ち、儚さが記憶を刻む`, the plugin returns:

```json
{
  "lines": ["", "永遠は朽ち、儚さが記憶を刻む"]
}
```

To color the text, set `colors` in the config or theme:

```jsonc
{
    "colors": {
        "plugin:banner-text": "#bd00ff"
    }
}
```

## Platform

Linux, macOS and Windows. The plugin uses only the Rust standard library for file access and home-directory expansion.
