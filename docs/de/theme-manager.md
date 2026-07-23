# Theme Manager Plugin

Das theme-manager Plugin ermoglicht das Durchsuchen, Suchen, Inspizieren und Installieren von xfetch Themes aus der entfernten Theme-Registry.

## Ubersicht

Im Gegensatz zu anderen info-Plugins, die Systemdaten anzeigen, interagiert theme-manager mit der Theme-Registry unter `github.com/xfetch-cli/configs`, um Theme-Dateien zu finden und herunterzuladen.

| Eigenschaft | Wert |
|-------------|------|
| Art | `info_provider` |
| Binar | `xfetch-plugin-theme-manager` |
| Abhangigkeiten | `curl` CLI (fur entfernte Registry) |

## Installation

```bash
xfetch plugin install theme-manager
```

## Aktionen

Das Verhalten des Plugins wird durch das Feld `action` in den Plugin-Argumenten gesteuert.

### list (Standard)

Zeigt alle verfugbaren Themes aus der Registry an:

```jsonc
{
    "info_plugins": [
        { "plugin": "theme-manager" }
    ],
    "modules": ["plugin:theme-manager"]
}
```

### search

Filtert Themes nach Name, Beschreibung, Autor oder Tags:

```jsonc
{
    "info_plugins": [
        {
            "plugin": "theme-manager",
            "args": {
                "action": "search",
                "query": "dark"
            }
        }
    ],
    "modules": ["plugin:theme-manager"]
}
```

### info

Zeigt detaillierte Informationen zu einem bestimmten Theme an:

```jsonc
{
    "info_plugins": [
        {
            "plugin": "theme-manager",
            "args": {
                "action": "info",
                "name": "dracula"
            }
        }
    ],
    "modules": ["plugin:theme-manager"]
}
```

### install

Ladt eine Theme-Datei aus der Registry herunter und speichert sie unter `~/.config/xfetch/themes/<name>.jsonc`:

```jsonc
{
    "info_plugins": [
        {
            "plugin": "theme-manager",
            "args": {
                "action": "install",
                "name": "dracula"
            }
        }
    ],
    "modules": ["plugin:theme-manager"]
}
```

Nach der Installation aktivieren Sie das Theme mit `xfetch theme set <name>` oder indem Sie `"theme": "<name>"` zu Ihrer `config.jsonc` hinzufugen.

## Argumente

| Feld | Typ | Erforderlich | Beschreibung |
|------|-----|--------------|--------------|
| `action` | `string` | Nein | Einer von `list` (Standard), `search`, `info`, `install` |
| `name` | `string` | Fur `info` und `install` | Theme-Kennung (z. B. `dracula`, `nord`) |
| `query` | `string` | Fur `search` | Suchbegriff, der mit Name, Beschreibung, Autor oder Tags ubereinstimmt |
| `registry` | `string` | Nein | Benutzerdefinierte Registry-URL oder lokaler Dateipfad |

## Ausgabebeispiele

### Ausgabe von list

```
Theme Manager -- 6 themes available

  dracula  xscriptor  section  (#dark #dracula #popular)
       Dark magenta, red, and cyan palette inspired by the Dracula color scheme.

  nord  xscriptor  section  (#light #nord #arctic #minimal)
       Cool blue and arctic cyan palette based on the Nord color scheme.

  catppuccin-mocha  xscriptor  section  (#dark #catppuccin #mocha #pastel)
       Warm mocha pastel palette from the Catppuccin Mocha color scheme.

  retro-pacman  xscriptor  pacman  (#retro #pacman #arcade #game)
       Classic Pac-Man arcade style with game-inspired header icons.

  berlin  xscriptor  default  (#monochrome #minimal #no-icons #no-colors)
       Monochrome theme with no colors and no icons.

  tree-compact  xscriptor  tree  (#tree #hierarchical #compact #nested)
       Hierarchical tree layout with a cool blue-green color scheme.
```

### Ausgabe von install

```
Theme 'dracula' installed successfully.
  Path: /home/user/.config/xfetch/themes/dracula.jsonc
  Author: xscriptor
  Layout: section

Activate with: xfetch theme set dracula
Or add to config.jsonc: "theme": "dracula"
```

## Registry

Die Standard-Registry-URL lautet:

```
https://raw.githubusercontent.com/xfetch-cli/configs/main/themes/index.json
```

Die Registry ist eine JSON-Datei, die Metadaten zu allen verfugbaren Themes enthalt. Jeder Theme-Eintrag umfasst:

| Feld | Beschreibung |
|------|--------------|
| `name` | Theme-Kennung verwendet in `"theme": "<name>"` |
| `author` | Theme-Ersteller |
| `version` | Semantische Version |
| `description` | Kurzbeschreibung des Themes |
| `layout` | Standard-Layout des Themes |
| `palette_style` | Standard-Paletten-Anzeigestil |
| `tags` | Durchsuchbare Schlagworter |
| `source` | URL zum Herunterladen der Theme-JSONC-Datei |

## Benutzerdefinierte Registry

Sie konnen eine selbst gehostete oder lokale Registry verwenden:

```jsonc
{
    "plugin": "theme-manager",
    "args": {
        "registry": "/home/user/my-themes/index.json"
    }
}
```

Lokale Pfade (beginnend mit `/` oder `~`) werden direkt vom Dateisystem gelesen. Entfernte URLs werden uber `curl` abgerufen.

## Funktionsweise

1. xfetch sendet eine JSON-Anfrage mit `kind: "info_provider"` und den konfigurierten Argumenten.
2. Das Plugin liest die Registry-Datei (lokaler Pfad oder entfernte URL uber `curl`).
3. Basierend auf dem Feld `action` filtert oder zeigt das Plugin Theme-Informationen an.
4. Bei `install` wird die Theme-JSONC-Datei heruntergeladen und im Themes-Verzeichnis gespeichert.
5. Das Plugin gibt die formatierten Zeilen als JSON-Antwort zuruck.
6. xfetch zeigt sie unter dem Modul-Schlussel `plugin:theme-manager` an.

## Hinweise

- Erfordert `curl` fur den Zugriff auf die entfernte Registry. Lokale Dateipfade funktionieren ohne curl.
- Fur Operationen mit der entfernten Registry wird eine Netzwerkverbindung benotigt.
- Das Argument `registry` ermoglicht die Verwendung einer benutzerdefinierten oder gespiegelten Registry.
- Nach der Installation eines Themes aktivieren Sie es mit dem Kernbefehl `xfetch theme set` oder durch direktes Bearbeiten der `config.jsonc`.
