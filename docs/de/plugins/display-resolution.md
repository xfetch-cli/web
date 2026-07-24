# display-resolution

Erkennt Monitorauflösung und Bildwiederholrate.

- **Art:** `info_provider`
- **Binär:** `xfetch-plugin-display-resolution`
- **Abhängigkeiten:** plattformabhängig (siehe Tabelle)

## Konfiguration

```jsonc
{
    "info_plugins": [{ "plugin": "display-resolution" }],
    "modules": ["plugin:display-resolution"]
}
```

## Argumente

Keine.

## Plattformerkennung

| Plattform | Methode |
|-----------|---------|
| Linux (X11) | `xrandr --current` (Fallback: `xdpyinfo`) |
| Linux (Wayland) | `wlr-randr` |
| macOS | `system_profiler SPDisplaysDataType` |
| Windows | PowerShell `GetDeviceCaps` |

## Ausgabe

| Zustand | Ausgabe |
|---------|---------|
| Ein Monitor | ` DP-1: 1920x1080 @ 144.00 Hz (primär)` |
| Mehrere Monitore | ` eDP-1: ... (primär)` / `   HDMI-1: ...` |
| Nicht erkannt | ` Anzeige: unbekannt` |
