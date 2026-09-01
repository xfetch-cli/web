# theme-detection

Erkennt aktuelles Desktop-Theme und Farbschema.

- **Art:** `info_provider`
- **Binär:** `xfetch-plugin-theme-detection`
- **Abhängigkeiten:** `gsettings` (GTK), liest `plasmarc`/`kdeglobals` (KDE)

## Konfiguration

```jsonc
{
    "info_plugins": [{ "plugin": "theme-detection" }],
    "modules": ["plugin:theme-detection"]
}
```

## Argumente

Keine.

## Ausgabe

| Umgebung | Ausgabe |
|----------|---------|
| GNOME/GTK | ` GTK Theme: Adwaita-dark (dark)` / `   Icons: Adwaita` / `   Cursor: Adwaita` / `   Font: Cantarell 11` |
| KDE Plasma | ` GTK: Breeze (light)` / `   Plasma: breeze-dark` / `   Colors: BreezeDark` |
| Windows | `  Windows Theme: Dark` / `  Accent: #00B9FF` |
| Nicht erkannt | ` Theme: not detected` |

## Erkennungsquellen

| Umgebung | Quelle |
|----------|--------|
| GTK (GNOME, Budgie, Cinnamon) | `gsettings get org.gnome.desktop.interface` |
| KDE Plasma | `~/.config/plasmarc` und `~/.config/kdeglobals` |
| Windows | Registry `AppsUseLightTheme` + `DWM\ColorizationColor` |
