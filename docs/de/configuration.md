# Konfiguration

xfetch verwendet eine JSONC (JSON mit Kommentaren) Konfigurationsdatei. Der Standardspeicherort ist `~/.config/xfetch/config.jsonc`. Sie konnen eine Standardkonfiguration mit `xfetch --gen-config` generieren oder einen benutzerdefinierten Pfad mit `xfetch --config <pfad>` verwenden.

## Konfigurationsdatei-Format

JSONC erweitert standard JSON um C-Style (`//`) und C++-Style (`/* */`) Kommentare sowie nachgestellte Kommas in Objekten und Arrays.

## Vollstandige Konfigurationsreferenz

```jsonc
{
    "layout": "section",
    "modules": [
        {
            "type": "group",
            "title": "Hardware",
            "modules": [
                "hostname",
                "cpu",
                "gpu",
                "memory",
                "swap",
                "disk",
                "battery"
            ]
        },
        {
            "type": "group",
            "title": "Software",
            "modules": [
                "os",
                "kernel",
                "packages",
                "shell",
                "wm",
                "terminal",
                "local_ip"
            ]
        },
        "palette"
    ],
    "show_colors": true,
    "icons": {
        "hostname": "\uf109",
        "cpu": "\uf2db",
        "gpu": "\uf0b9"
    },
    "colors": {
        "hostname": "Green",
        "cpu": "Green",
        "os": "Yellow"
    },
    "palette_style": "squares",
    "logo_path": null,
    "ascii": null,
    "header_icons": null,
    "footer_text": null,
    "disable_ip_fetching": false,
    "disable_cache": false,
    "logo_animation": null,
    "info_plugins": []
}
```

## Feldreferenz

### Felder der obersten Ebene

| Feld | Typ | Standard | Beschreibung |
|-------|------|---------|-------------|
| `layout` | `string` oder `null` | `null` (classic) | Layout-Stil-Name |
| `modules` | `array` | (siehe unten) | Geordnete Liste von Modulen oder Modulgruppen |
| `show_colors` | `boolean` | `true` | ANSI-Farbausgabe aktivieren |
| `icons` | `object` | (eingebaute Standards) | Modulspezifische Icon-Zuordnungen |
| `colors` | `object` | (eingebaute Standards) | Modulspezifische Farbzuordnungen |
| `palette_style` | `string` | `"squares"` | Paletten-Anzeigestil |
| `logo_path` | `string` oder `null` | `null` | Pfad zu einer benutzerdefinierten Logodatei |
| `ascii` | `string` oder `null` | `null` | Pfad zu einer ASCII-Kunst-Datei (Alternative zu logo_path) |
| `logo_width` | `number` oder `null` | `auto` (28% der Terminalbreite, begrenzt 12-42) | Breitenbeschränkung fur Bildlogos (in Terminal-Spalten, automatisch berechnet wenn nicht gesetzt) |
| `logo_height` | `number` oder `null` | `null` | Hohenbeschränkung fur Bildlogos (in Terminal-Zeilen) |
| `logo_gap` | `number` oder `null` | `12` | Abstand zwischen dem Logo/Bild und dem Infotext (in Spalten) |
| `logo_kitty` | `boolean` oder `null` | `true` (in Kitty) | Kitty natives Bildprotokoll verwenden (`true`) oder Half-Block-Rendering (`false`). Half-Block hat geringere Auflosung, vermeidet aber Layout-Probleme |
| `logo_color` | `string` oder `null` | `null` | Farbe fur das ASCII-Logo: Name (`"Cyan"`), 256-Farben-Index (`"196"`) oder Hex-RGB (`"#FF0000"`) |
| `logo_padding` | `number` oder `null` | `0` | Fuhrende Leerzeichen vor dem Logo |
| `logo_type` | `string` oder `null` | `"auto"` | `"auto"` (nach Endung), `"ascii"` (Text erzwingen), `"image"` (Bild erzwingen) |
| `show_keys` | `boolean` | `false` | Rendert `Schlussel: Wert` in den Icon-Layouts |
| `key_width` | `number` oder `null` | auto | Fullt den Schlussel auf diese Spaltenbreite, um Werte auszurichten |
| `labels` | `object` oder `null` | `{}` | Benennt den Schlussel einer Zeile pro Modul um; ein leerer String blendet den Schlussel aus |
| `formats` | `object` oder `null` | `{}` | Wertvorlagen mit `{feld}`-Platzhaltern pro Modul |
| `header_icons` | `array` oder `null` | `null` | Icons fur den oberen Rand (Pac-Man-Layout) |
| `footer_text` | `string` oder `null` | `null` | Text fur den unteren Rand (Pac-Man-Layout) |
| `disable_ip_fetching` | `boolean` | `false` | Abrufen der offentlichen IP aus Datenschutzgrunden deaktivieren |
| `disable_cache` | `boolean` | `false` | Daten-Caching deaktivieren |
| `os_wsl_style` | `string` | `"minimal"` | WSL-OS-Darstellung (nur Linux): `off` (einfacher Name), `minimal` (fugt `(WSL)` hinzu), `full` (fugt WSL-Version und WSLg hinzu) |
| `logo_animation` | `object` oder `null` | `null` | Logo-Animationskonfiguration |
| `info_plugins` | `array` | `[]` | Liste der auszufuhrenden Info-Plugins |
| `config_providers` | `array` | `[]` | Liste der Konfigurations-Provider-Erweiterungen, die nach der Themenzusammenfuhrung ausgefuhrt werden |
| `theme` | `string` oder `null` | `null` | Theme-Name zum Anwenden (nur visuelle Felder) |
| `daemon` | `boolean` | `false` | Im animierten Daemon-Modus ausfuhren (fixiert den Fetch am oberen Terminalrand) |
| `daemon_min_rows` | `number` | `6` | Mindestterminalzeilen fur den animierten Daemon |
| `daemon_live` | `boolean` | `false` | Live-Statistikblock am oberen Terminalrand fixieren und Module periodisch neu abfragen |
| `daemon_live_refresh` | `number` oder `null` | (plattformabhangig) | Aktualisierungsintervall des Live-Daemons in Sekunden |
| `daemon_live_modules` | `array` oder `null` | (plattformabhangig) | Vom Live-Daemon angezeigte Module |
| `daemon_live_reload` | `boolean` | `false` | Hot-Reload der Konfiguration im Live-Daemon-Modus |
| `custom_x` | `object` oder `null` | `null` | Rahmenvorlagen fur das `custom-x`-Layout |
| `effects` | `object`, `array` oder `null` | `null` | Intro-Effekte, die auf die Inhaltszeilen angewendet werden |

### Standardmodule

Wenn keine Module angegeben sind, verwendet xfetch:

```
["os", "kernel", "uptime", "packages", "wm", "shell", "disk", "cpu", "gpu", "memory", "battery"]
```

### Modulgruppen

Module konnen fur die Layouts `section`, `tree` und `side-block` in benannte Gruppen organisiert werden:

```jsonc
{
    "type": "group",
    "title": "Hardware",
    "modules": ["cpu", "gpu", "memory"]
}
```

Gruppen konnen verschachtelt werden:

```jsonc
{
    "type": "group",
    "title": "System",
    "modules": [
        {
            "type": "group",
            "title": "Hardware",
            "modules": ["cpu", "gpu"]
        },
        {
            "type": "group",
            "title": "Software",
            "modules": ["os", "kernel"]
        }
    ]
}
```

### Icons

Icons bilden Modulnamen auf Anzeigezeichenketten ab. Nerd Font Glyphen werden haufig verwendet, aber jede Unicode- oder Textzeichenkette funktioniert.

```jsonc
{
    "icons": {
        "os": "\uf17c",
        "kernel": "\uf17c",
        "hostname": "\uf109",
        "cpu": "\uf2db",
        "gpu": "\uf0b9",
        "memory": "\ue266",
        "swap": "\uf0c5",
        "disk": "\uf0a0",
        "battery": "\uf240",
        "uptime": "\uf253",
        "packages": "\uf187",
        "shell": "\uf0e7",
        "terminal": "\uf0e7",
        "wm": "\uf08e",
        "user": "\uf007",
        "datetime": "\uf017",
        "local_ip": "\uf0ac",
        "palette": "\uf0eb",
        "plugin:<name>": "\uf271"
    }
}
```

Modulschussel mit dem Prefix `plugin:` (z. B. `plugin:docker`) werden fur pluginbereitgestellte Informationen verwendet.

### Farben

Farben bilden Modulnamen auf ANSI-Farbnamen ab:

```jsonc
{
    "colors": {
        "os": "Cyan",
        "kernel": "White",
        "wm": "Blue",
        "shell": "Green",
        "cpu": "Green",
        "gpu": "Green",
        "memory": "Green",
        "disk": "Green",
        "battery": "Green",
        "packages": "Yellow",
        "hostname": "Green",
        "uptime": "Yellow",
        "terminal": "Green",
        "user": "Magenta"
    }
}
```

**Verfugbare Farbnamen:**

| Name | ANSI-Code |
|------|-----------|
| `Black` | 30 |
| `Red` | 31 |
| `Green` | 32 |
| `Yellow` | 33 |
| `Blue` | 34 |
| `Magenta` | 35 |
| `Cyan` | 36 |
| `White` | 37 |
| `Grey` oder `Gray` | 90 |

Farbnamen sind unabhängig von der Groß-/Kleinschreibung. Auch 256-Farben-Indizes (`"196"`) und Hex-RGB (`"#FF0000"`) werden akzeptiert.

### Palettenstile

Das Modul `palette` zeigt ein Farbmuster an. Verfugbare Stile:

| Stil | Beschreibung |
|-------|-------------|
| `"squares"` | Hintergrundfarbblocke (Standard) |
| `"circles"` | Vordergrundfarbkreise |
| `"triangles"` | Vordergrundfarbdreiecke |
| `"lines"` | Dicke horizontale Farbbalken |

### Animationskonfiguration

Das Feld `logo_animation` aktiviert ASCII-Logo-Animation uber ein Plugin:

```jsonc
{
    "logo_animation": {
        "plugin": "animate-logo",
        "fps": 12,
        "duration_ms": 1200,
        "loop": false,
        "style": "sweep",
        "frames_path": "~/.config/xfetch/logos/frames.txt"
    }
}
```

| Feld | Typ | Beschreibung |
|-------|------|-------------|
| `plugin` | `string` | Plugin-Name (z. B. `"animate-logo"`) |
| `fps` | `number` | Bilder pro Sekunde (1-60) |
| `duration_ms` | `number` | Gesamte Animationsdauer in Millisekunden (wird im Daemon-Modus ignoriert) |
| `loop` | `boolean` | Ob die Animation wiederholt werden soll (wird im Daemon-Modus ignoriert) |
| `style` | `string` | Animationsstil: `"sweep"`, `"wave"`, `"rainbow"`, `"sparkle"`, `"breathing"`, `"frame"`, `"none"` |
| `frames_path` | `string` | Pfad zu vorgebauten Frame-Sets (fur Stil `"frame"`). Mehrere Frame-Sets getrennt durch `\n===\n` |
| `timeout_secs` | `number` | Optionale Zeituberschreitung fur das Animations-Plugin in Sekunden |

### Plugin-Integration

Info-Plugins werden im Array `info_plugins` konfiguriert:

```jsonc
{
    "info_plugins": [
        {
            "plugin": "github-stats",
            "args": {
                "username": "myuser",
                "max_lines": 3
            }
        },
        {
            "plugin": "docker"
        }
    ]
}
```

| Feld | Typ | Beschreibung |
|-------|------|-------------|
| `plugin` | `string` | Plugin-Name (installiert als `xfetch-plugin-<name>`) |
| `args` | `object` oder `null` | Beliebige JSON-Argumente, die an das Plugin ubergeben werden |
| `timeout_secs` | `number` oder `null` | Optionale Zeituberschreitung pro Plugin in Sekunden |

Plugin-Daten werden uber Modulschussel mit dem Prefix `plugin:` abgerufen:

```jsonc
{
    "modules": ["os", "kernel", "plugin:github-stats", "plugin:docker"]
}
```

### Konfigurationsanbieter

Das Feld `config_providers` ermoglicht Erweiterungen auf Konfigurationsebene, die Konfiguration vor dem Rendering zu andern. Erweiterungen werden nach der Themenzusammenfuhrung in Deklarationsreihenfolge ausgefuhrt:

```jsonc
{
    "config_providers": [
        {
            "extension": "config-roulette",
            "args": {
                "routes": "~/.config/xfetch/routes.json",
                "strategy": "random"
            }
        },
        {
            "extension": "layout-override",
            "args": {
                "layout": "tree"
            }
        }
    ]
}
```

| Feld | Typ | Beschreibung |
|-------|------|-------------|
| `extension` | `string` | Erweiterungsname (Binardatei: `xfetch-extension-<name>`) |
| `args` | `object` oder `null` | Beliebige JSON-Argumente, die an die Erweiterung ubergeben werden |
| `timeout_secs` | `number` oder `null` | Optionale Zeituberschreitung pro Erweiterung in Sekunden |

Erweiterungen kommunizieren uber stdin/stdout JSON, empfangen die vollstandig aufgeloste Konfiguration und geben eine modifizierte Version zuruck. Siehe [Erweiterungen](extensions) fur Details.

## Konfigurationsdatei-Speicherorte nach Plattform

| Plattform | Standard-Konfigurationspfad |
|----------|-------------------|
| Linux | `~/.config/xfetch/config.jsonc` |
| macOS | `~/Library/Application Support/xfetch/config.jsonc` |
| Windows | `%APPDATA%\xfetch\config.jsonc` |
