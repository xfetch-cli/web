# timezone

Zeigt aktuelle Uhrzeit, Datum und Zeitzoneninformationen an.

- **Art:** `info_provider`
- **Binär:** `xfetch-plugin-timezone`
- **Abhängigkeiten:** `date` (erforderlich), `timedatectl` (optional)

## Konfiguration

```jsonc
{
    "info_plugins": [{ "plugin": "timezone" }],
    "modules": ["plugin:timezone"]
}
```

## Argumente

| Feld | Erforderlich | Standard | Beschreibung |
|------|-------------|----------|-------------|
| `format` | Nein | `%Z %z` | `date`-Formatzeichenkette für die Zeitzonenanzeige |

## Ausgabe

| Zustand | Ausgabe |
|---------|---------|
| Normal | ` Mittwoch, 23. Juli 2026  14:30` / `   America/New York (EST -05:00)` |
| Nicht erkannt | ` Zeitzone: unbekannt` |

Die Zeitzone wird aus `/etc/timezone` > `/etc/localtime`-Symlink > `timedatectl` ermittelt.
