# animate-logo

Animates ASCII logos with various color effects.

- **Kind:** `logo_animation`
- **Binary:** `xfetch-plugin-animate-logo`
- **Dependencies:** None (pure Rust)

## Configuration

```jsonc
{
    "logo_animation": {
        "plugin": "animate-logo",
        "fps": 12,
        "duration_ms": 1200,
        "loop": false,
        "style": "sweep"
    }
}
```

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fps` | number | `12` | Frames per second (clamped 1–60) |
| `duration_ms` | number | `1200` | Total animation duration in ms |
| `loop` | bool | `false` | Loop animation (currently unused) |
| `style` | string | `"sweep"` | Animation style (see below) |
| `frames_path` | string or string[] | — | Path(s) to frame files (required for `frame` style) |

## Styles

| Style | Description |
|-------|-------------|
| `sweep` | Colors sweep left-to-right across characters (6-color ANSI palette) |
| `wave` | Sine-wave color pattern across the logo |
| `rainbow` | Full RGB gradient shifting over time (24-bit color) |
| `sparkle` | Random characters light up in bright colors |
| `breathing` | All characters fade in and out in warm amber tones |
| `frame` | Cycles through pre-loaded ASCII frame sets |
| `none` | No coloring, displays logo as-is |
