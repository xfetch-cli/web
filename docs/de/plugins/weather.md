# weather

Zeigt aktuelle Wetterbedingungen via wttr.in an.

- **Art:** `info_provider`
- **Binär:** `xfetch-plugin-weather`
- **Abhängigkeiten:** `curl` im PATH
- **API:** [wttr.in](https://wttr.in) (kostenlos, kein API-Schlüssel)

## Konfiguration

```jsonc
{
    "info_plugins": [{
        "plugin": "weather",
        "args": {
            "location": "London",
            "format": "%C|%t|%w|%h|%p"
        }
    }],
    "modules": ["plugin:weather"]
}
```

## Argumente

| Feld | Erforderlich | Standard | Beschreibung |
|------|-------------|----------|-------------|
| `location` | Nein | Automatisch per IP | Stadtname, Koordinaten oder Flughafencode |
| `format` | Nein | `%C\|%t\|%w\|%h\|%p` | wttr.in-Formatzeichenkette (senkrechtstrich-getrennt) |

## Ausgabe

| Zustand | Ausgabe |
|---------|---------|
| Wetter abgerufen | ` +15°C Clear` / `   Humidity: 60%` / `   Wind: ↑15 km/h` / `   Precipitation: 0%` |
| Netzwerkfehler | ` Weather: could not fetch` |
| Keine Daten | ` Weather: no data` |

Icons werden automatisch basierend auf der Bedingung ausgewählt: Clear/Sunny (``), Cloudy (``), Rain (``), Snow (``), Thunder (``), Fog (``), Partly (``).
