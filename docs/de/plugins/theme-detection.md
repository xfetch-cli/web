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
| GNOME/GTK | ` GTK-Theme: Adwaita-dark (dunkel)` / `   Symbole: Adwaita` / `   Mauszeiger: Adwaita` / `   Schriftart: Cantarell 11` |
| KDE Plasma | ` GTK: Breeze (hell)` / `   Plasma: breeze-dark` / `   Farben: BreezeDark` |
| Nicht erkannt | ` Theme: nicht erkannt` |

## Erkennungsquellen

| Umgebung | Quelle |
|----------|--------|
| GTK (GNOME, Budgie, Cinnamon) | `gsettings get org.gnome.desktop.interface` |
| KDE Plasma | `~/.config/plasmarc` und `~/.config/kdeglobals` |
