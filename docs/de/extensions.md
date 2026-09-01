# Erweiterungen

Erweiterungen sind eigenständige Binardateien, die in den xfetch-Lebenszyklus auf Konfigurationsebene eingreifen. Anders als Plugins (die Infozeilen bereitstellen oder Logos animieren), empfangen Erweiterungen die vollständig aufgelöste Konfiguration über stdin, modifizieren sie und geben eine modifizierte Version über stdout zurück.

## Architektur

```
xfetch core
  │
  ├─ Lädt config.jsonc
  ├─ Fügt Thema zusammen (falls gesetzt)
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
xfetch extension install ./path/to/extension-binary
xfetch extension list
xfetch extension remove <name>
```

Erweiterungsbinardateien folgen der Namenskonvention `xfetch-extension-<name>` (`.exe` unter Windows).

## Konfiguration

Fügen Sie Erweiterungen über das Feld `config_providers` zu Ihrer Konfiguration hinzu:

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
| `args` | `object` oder `null` | Beliebige JSON-Argumente, die an die Erweiterung übergeben werden |
| `timeout_secs` | `number` oder `null` | Optionale Zeitüberschreitung in Sekunden fur die Erweiterung |

## Protokoll

Erweiterungen kommunizieren über stdin/stdout mit dem JSON-Protokoll, das in `xfetch-extension-api` definiert ist.

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

Das Feld `config` enthält die vollständig aufgelöste xfetch-Konfiguration nach Zusammenführung von Standardwerten, Konfigurationsdatei und ggf. Thema.

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

Die Erweiterung gibt die gesamte modifizierte Konfiguration zurück. Unveränderte Felder sollten unverandert erhalten bleiben.

### Fehlerbehandlung

Fehler sollten auf stderr ausgegeben werden. Der Prozess sollte mit einem Status ungleich null beendet werden. xfetch überspringt die Erweiterung und fahrt mit der aktuellen Konfiguration fort, wenn ein Fehler auftritt.

## Verfugbare Erweiterungen

| Erweiterung | Beschreibung |
|-----------|-------------|
| [config-roulette](extensions/config-roulette) | Wählt eine zufällige (oder tägliche) Konfiguration aus einer Liste von Pfaden |
| [layout-override](extensions/layout-override) | Uberschreibt das Layout und/oder die Module beim Laden der Konfiguration |

## Verzeichnisse

| Plattform | Erweiterungspfad |
|----------|----------------|
| Linux | `~/.config/xfetch/extensions/` |
| macOS | `~/.config/xfetch/extensions/` |
| Windows | `%APPDATA%\xfetch\extensions\` |

## Eigene Erweiterungen schreiben

Erweiterungen mussen:

1. Ein `ConfigProviderRequest` JSON-Objekt von stdin lesen
2. Das `config`-Feld nach Bedarf modifizieren
3. Ein `ConfigProviderResponse` JSON-Objekt auf stdout schreiben
4. Mit Status 0 bei Erfolg, ungleich null bei Fehler beenden

Verwenden Sie das `xfetch-extension-api` Crate von `github.com/xfetch-cli/api` fur typsichere Anfrage-/Antwortbehandlung in Rust.

Das gemeinsame API-Crate ist verfugbar unter: [github.com/xfetch-cli/api](https://github.com/xfetch-cli/api)
