# theme-detection

Detects current desktop theme and color scheme.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-theme-detection`
- **Dependencies:** `gsettings` (GTK), reads `plasmarc`/`kdeglobals` (KDE)

## Configuration

```jsonc
{
    "info_plugins": [{ "plugin": "theme-detection" }],
    "modules": ["plugin:theme-detection"]
}
```

## Arguments

None.

## Output

| Environment | Output |
|-------------|--------|
| GNOME/GTK | ` GTK Theme: Adwaita-dark (dark)` / `   Icons: Adwaita` / `   Cursor: Adwaita` / `   Font: Cantarell 11` |
| KDE Plasma | ` GTK: Breeze (light)` / `   Plasma: breeze-dark` / `   Colors: BreezeDark` |
| Not detected | ` Theme: not detected` |

## Detection Sources

| Environment | Source |
|-------------|--------|
| GTK (GNOME, Budgie, Cinnamon) | `gsettings get org.gnome.desktop.interface` |
| KDE Plasma | `~/.config/plasmarc` and `~/.config/kdeglobals` |
