# theme-manager

Durchsucht und installiert Themes aus einer entfernten oder lokalen Registry.

- **Art:** `info_provider`
- **Binär:** `xfetch-plugin-theme-manager`
- **Abhängigkeiten:** `curl` im PATH (für entfernte Registries)
- **Standard-Registry:** `https://raw.githubusercontent.com/xfetch-cli/configs/main/themes/index.json`

## Konfiguration

```jsonc
{
    "info_plugins": [{
        "plugin": "theme-manager",
        "args": {
            "action": "list",
            "name": "dracula",
            "query": "dark",
            "registry": "https://example.com/themes.json"
        }
    }]
}
```

## Argumente

| Feld | Erforderlich | Standard | Beschreibung |
|------|-------------|----------|-------------|
| `action` | Nein | `"list"` | `list`, `search`, `info` oder `install` |
| `name` | Für `info`/`install` | — | Themenname |
| `query` | Für `search` | — | Suchbegriff (passt auf Name, Beschreibung, Autor, Schlagwörter) |
| `registry` | Nein | xfetch-cli/configs | Registry-URL (HTTP oder lokaler Pfad mit `/` oder `~`) |

## Aktionen

| Aktion | Beschreibung |
|--------|-------------|
| `list` | Listet alle verfügbaren Themes aus der Registry auf |
| `search` | Filtert Themes, die dem Suchbegriff entsprechen |
| `info` | Zeigt detaillierte Informationen zu einem bestimmten Theme an |
| `install` | Lädt ein Theme nach `~/.config/xfetch/themes/<name>.jsonc` herunter |

Nach der Installation eines Themes aktivieren Sie es mit `xfetch theme set <name>` oder fügen Sie `"theme": "<name>"` zu Ihrer `config.jsonc` hinzu.
