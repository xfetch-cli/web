# user-info

Zeigt Benutzerkontoinformationen an.

- **Art:** `info_provider`
- **Binär:** `xfetch-plugin-user-info`
- **Abhängigkeiten:** `id`, `getent`, `groups`, `whoami`

## Konfiguration

```jsonc
{
    "info_plugins": [{
        "plugin": "user-info",
        "args": { "show_groups": true }
    }],
    "modules": ["plugin:user-info"]
}
```

## Argumente

| Feld | Erforderlich | Standard | Beschreibung |
|------|-------------|----------|-------------|
| `show_groups` | Nein | `false` | Gruppenmitgliedschaften anzeigen (max. 10) |

## Ausgabe

| # | Zeile |
|---|-------|
| 1 | ` Vollständiger Name (benutzername)` |
| 2 | `   uid: N  gid: N` |
| 3 | `   /home/benutzer` |
| 4 | `   shell` |
| 5 (falls Gruppen) | `   Gruppen: wheel, users, docker` |
