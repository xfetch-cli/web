# Erweiterungen

Erweiterungen sind eigenständige Binardateien, die in den xfetch-Lebenszyklus auf Konfigurationsebene eingreifen. Anders als Plugins (die Infozeilen bereitstellen oder Logos animieren), empfangen Erweiterungen die vollständig aufgelöste Konfiguration uber stdin, modifizieren sie und geben eine modifizierte Version uber stdout zuruck.

## Architektur

```
xfetch core
  │
  ├─ Ladt config.jsonc
  ├─ Fugt Thema zusammen (falls gesetzt)
  │
  ├─ extension-1 (stdin/stdout JSON)  ← modifiziert Konfiguration
  ├─ extension-2 (stdin/stdout JSON)  ← modifiziert Konfiguration
  ├─ ...
  │
  └─ Rendert finale Konfiguration
```

Erweiterungen werden **nach der Themenzusammenfuhrung, in Deklarationsreihenfolge** ausgefuhrt. Jede Erweiterung erhalt die vom vorherigen Schritt produzierte Konfiguration, sodass sie verkettet werden konnen.

## Installation

Erweiterungen werden in `~/.config/xfetch/extensions/` installiert:

```bash
cp xfetch-extension-<name> ~/.config/xfetch/extensions/
```

Oder per CLI:

```bash
xfetch extension install ./pfad/zum/binar
xfetch extension list
xfetch extension remove <name>
```

Erweiterungsbinardateien folgen der Namenskonvention `xfetch-extension-<name>` (`.exe` unter Windows).

## Konfiguration

Fugen Sie Erweiterungen uber das Feld `config_providers` zu Ihrer Konfiguration hinzu:

```jsonc
{
    "config_providers": [
        {
            "extension": "layout-override",
            "args": {
                "layout": "tree"
            }
        },
        {
            "extension": "config-roulette",
            "args": {
                "routes": "~/.config/xfetch/routes.json",
                "strategy": "daily"
            }
        }
    ]
}
```

| Feld | Typ | Beschreibung |
|-------|------|-------------|
| `extension` | `string` | Erweiterungsname (Binardatei: `xfetch-extension-<name>`) |
| `args` | `object` oder `null` | Beliebige JSON-Argumente, die an die Erweiterung ubergeben werden |
| `timeout_secs` | `number` oder `null` | Optionale Zeituberschreitung in Sekunden fur die Erweiterung |

## Protokoll

Erweiterungen kommunizieren uber stdin/stdout mit dem JSON-Protokoll, das in `xfetch-extension-api` definiert ist.

### Anfrage (stdin)

```json
{
    "version": 1,
    "kind": "config_provider",
    "config": {
        "layout": "section",
        "modules": ["os", "kernel", "uptime"],
        "colors": { "os": "Cyan" }
    },
    "args": {
        "layout": "tree"
    }
}
```

Das Feld `config` enthalt die vollstandig aufgeloste xfetch-Konfiguration nach Zusammenfuhrung von Standardwerten, Konfigurationsdatei und ggf. Thema.

### Antwort (stdout)

```json
{
    "config": {
        "layout": "tree",
        "modules": ["os", "kernel", "uptime"],
        "colors": { "os": "Cyan" }
    }
}
```

Die Erweiterung gibt die gesamte modifizierte Konfiguration zuruck. Unveranderte Felder sollten unverandert erhalten bleiben.

### Fehlerbehandlung

Fehler sollten auf stderr ausgegeben werden. Der Prozess sollte mit einem Status ungleich null beendet werden. xfetch uberspringt die Erweiterung und fahrt mit der aktuellen Konfiguration fort, wenn ein Fehler auftritt.

## Verfugbare Erweiterungen

| Erweiterung | Beschreibung |
|-----------|-------------|
| [config-roulette](extensions/config-roulette) | Wahlt eine zufallige (oder tagliche) Konfiguration aus einer Liste von Pfaden |
| [layout-override](extensions/layout-override) | Uberschreibt das Layout und/oder die Module beim Laden der Konfiguration |

## Verzeichnisse

| Plattform | Erweiterungspfad |
|----------|----------------|
| Linux | `~/.config/xfetch/extensions/` |
| macOS | `~/Library/Application Support/xfetch/extensions/` |
| Windows | `%APPDATA%\xfetch\extensions\` |

## Eigene Erweiterungen schreiben

Erweiterungen mussen:

1. Ein `ConfigProviderRequest` JSON-Objekt von stdin lesen
2. Das `config`-Feld nach Bedarf modifizieren
3. Ein `ConfigProviderResponse` JSON-Objekt auf stdout schreiben
4. Mit Status 0 bei Erfolg, ungleich null bei Fehler beenden

Verwenden Sie das `xfetch-extension-api` Crate von `github.com/xfetch-cli/api` fur typsichere Anfrage-/Antwortbehandlung in Rust.

Das gemeinsame API-Crate ist verfugbar unter: [github.com/xfetch-cli/api](https://github.com/xfetch-cli/api)
