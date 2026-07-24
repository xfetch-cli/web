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
| GNOME/GTK | ` Tema GTK: Adwaita-dark (oscuro)` / `   Iconos: Adwaita` / `   Cursor: Adwaita` / `   Fuente: Cantarell 11` |
| KDE Plasma | ` GTK: Breeze (claro)` / `   Plasma: breeze-dark` / `   Colores: BreezeDark` |
| No detectado | ` Tema: no detectado` |

## Fuentes de Detección

| Entorno | Fuente |
|---------|--------|
| GTK (GNOME, Budgie, Cinnamon) | `gsettings get org.gnome.desktop.interface` |
| KDE Plasma | `~/.config/plasmarc` y `~/.config/kdeglobals` |
