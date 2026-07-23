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
| `header_icons` | `array` oder `null` | `null` | Icons fur den oberen Rand (Pac-Man-Layout) |
| `footer_text` | `string` oder `null` | `null` | Text fur den unteren Rand (Pac-Man-Layout) |
| `disable_ip_fetching` | `boolean` | `false` | Abrufen der offentlichen IP aus Datenschutzgrunden deaktivieren |
| `disable_cache` | `boolean` | `false` | Daten-Caching deaktivieren |
| `logo_animation` | `object` oder `null` | `null` | Logo-Animationskonfiguration |
| `info_plugins` | `array` | `[]` | Liste der auszufuhrenden Info-Plugins |

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

### Palettenstile

Das Modul `palette` zeigt ein Farbmuster an. Verfugbare Stile:

| Stil | Beschreibung |
|-------|-------------|
| `"squares"` | Hintergrundfarbblocke (Standard) |
| `"circles"` | Vordergrundfarbkreise |
| `"triangles"` | Vordergrundfarbdreiecke |
| `"lines"` | Dicke horizontale Farbbalken |
| `"dots"` | Kleine Vordergrundfarbpunkte |

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
| `duration_ms` | `number` | Gesamte Animationsdauer in Millisekunden |
| `loop` | `boolean` | Ob die Animation wiederholt werden soll |
| `style` | `string` | Animationsstil: `"sweep"`, `"wave"`, `"rainbow"`, `"sparkle"`, `"breathing"`, `"frame"`, `"none"` |
| `frames_path` | `string` | Pfad zu vorgebauten Frame-Sets (fur Stil `"frame"`). Mehrere Frame-Sets getrennt durch `\n===\n` |

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

Plugin-Daten werden uber Modulschussel mit dem Prefix `plugin:` abgerufen:

```jsonc
{
    "modules": ["os", "kernel", "plugin:github-stats", "plugin:docker"]
}
```

## Konfigurationsdatei-Speicherorte nach Plattform

| Plattform | Standard-Konfigurationspfad |
|----------|-------------------|
| Linux | `~/.config/xfetch/config.jsonc` |
| macOS | `~/Library/Application Support/xfetch/config.jsonc` |
| Windows | `%APPDATA%\xfetch\config.jsonc` |
