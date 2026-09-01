# display-resolution

Detecta la resolución del monitor y la tasa de refresco.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-display-resolution`
- **Dependencias:** específicas de plataforma (ver tabla)

## Configuración

```jsonc
{
    "info_plugins": [{ "plugin": "display-resolution" }],
    "modules": ["plugin:display-resolution"]
}
```

## Argumentos

Ninguno.

## Detección por Plataforma

| Plataforma | Método |
|------------|--------|
| Linux (X11) | `xrandr --current` (alternativa: `xdpyinfo`) |
| Linux (Wayland) | `wlr-randr` |
| macOS | `system_profiler SPDisplaysDataType` |
| Windows | PowerShell `GetDeviceCaps` |

## Salida

| Estado | Salida |
|--------|--------|
| Monitor único | ` DP-1: 1920x1080 @ 144.00 Hz (primary)` |
| Múltiples monitores | ` eDP-1: ... (primary)` / `   HDMI-1: ...` |
| No detectado | ` Display: unknown` |
