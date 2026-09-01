# theme-detection

Detecta el tema de escritorio y esquema de colores actual.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-theme-detection`
- **Dependencias:** `gsettings` (GTK), lee `plasmarc`/`kdeglobals` (KDE)

## Configuración

```jsonc
{
    "info_plugins": [{ "plugin": "theme-detection" }],
    "modules": ["plugin:theme-detection"]
}
```

## Argumentos

Ninguno.

## Salida

| Entorno | Salida |
|---------|--------|
| GNOME/GTK | ` GTK Theme: Adwaita-dark (dark)` / `   Icons: Adwaita` / `   Cursor: Adwaita` / `   Font: Cantarell 11` |
| KDE Plasma | ` GTK: Breeze (light)` / `   Plasma: breeze-dark` / `   Colors: BreezeDark` |
| Windows | `  Windows Theme: Dark` / `  Accent: #00B9FF` |
| No detectado | ` Theme: not detected` |

## Fuentes de Detección

| Entorno | Fuente |
|---------|--------|
| GTK (GNOME, Budgie, Cinnamon) | `gsettings get org.gnome.desktop.interface` |
| KDE Plasma | `~/.config/plasmarc` y `~/.config/kdeglobals` |
| Windows | Registro `AppsUseLightTheme` + `DWM\ColorizationColor` |
