# wasm-night-mode

Turns colors off outside the daytime window (WebAssembly config provider).

- **Kind:** `config_provider`
- **Artifact:** `xfetch-extension-wasm-night-mode.wasm` (core module)
- **Capabilities:** none (reads the WASI clock)
- **Language:** Rust

## Installation

```bash
xfetch extension install ./extensions/wasm-night-mode
```

## Configuration

```jsonc
{
    "config_providers": [
        {
            "extension": "wasm-night-mode",
            "args": {}
        }
    ]
}
```

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `night_start` | number | `22` | First hour (inclusive) of the night window. |
| `night_end` | number | `7` | First hour of the day window; may wrap midnight. |
| `utc_offset` | number | `0` | Hours from UTC, used instead of a timezone database. |
| `dim_colors` | bool | `true` | Sets `show_colors: false` at night. |
| `night_palette` | string | unchanged | Optional palette style applied at night. |

## Behavior

During the day the config is returned untouched; at night colors are dimmed (and the palette style is switched when configured).
