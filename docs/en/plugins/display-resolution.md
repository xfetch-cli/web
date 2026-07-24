# display-resolution

Detects monitor resolution and refresh rate.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-display-resolution`
- **Dependencies:** platform-specific (see table)

## Configuration

```jsonc
{
    "info_plugins": [{ "plugin": "display-resolution" }],
    "modules": ["plugin:display-resolution"]
}
```

## Arguments

None.

## Platform Detection

| Platform | Method |
|----------|--------|
| Linux (X11) | `xrandr --current` (fallback: `xdpyinfo`) |
| Linux (Wayland) | `wlr-randr` |
| macOS | `system_profiler SPDisplaysDataType` |
| Windows | PowerShell `GetDeviceCaps` |

## Output

| State | Output |
|-------|--------|
| Single monitor | ` DP-1: 1920x1080 @ 144.00 Hz (primary)` |
| Multiple monitors | ` eDP-1: ... (primary)` / `   HDMI-1: ...` |
| Not detected | ` Display: unknown` |
