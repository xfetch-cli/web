# wasm-ip-geo

Oeffentliche IP, Standort, Netzwerk und Zeitzone ueber ipapi.co, als Python-Komponente.

- **Art:** `info_provider`
- **Artefakt:** `wasm-ip-geo.wasm` (component)
- **Faehigkeiten:** `https://ipapi.co/*`
- **Sprache:** Python (componentize-py)

## Installation

```bash
xfetch plugin install ./plugins/wasm-ip-geo
```

Der Installer baut den Gast bei Bedarf ueber sein Manifest.

## Konfiguration

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-ip-geo", "args": { "fields": ["ip", "location", "org", "timezone"] } }],
    "modules": ["plugin:wasm-ip-geo"]
}
```

## Argumente

| Feld | Typ | Standard | Beschreibung |
|-------|------|---------|-------------|
| `fields` | string[] | all four | Beliebige aus `ip`, `location`, `org`, `timezone`. |

## Ausgabe

```
ip: 203.0.113.42 (IPv4)
location: Madrid, MD - Spain
network: Example Telecom S.A.
timezone: Europe/Madrid (UTC+0200)
```

## Hinweise

Nur ipapi.co ist erlaubt. Die Komponente braucht rund 256 MiB Speicher, da CPython eingebettet ist.
