# banner-text

Gibt eine oder mehrere Textzeilen aus einer Datei oder einem Literal-Argument als Info-Provider aus. Gedacht für Bildunterschriften und Banner unter der Statistikspalte; funktioniert mit ASCII- und Bildlogos.

Anders als das `banner`-Logo-Animationsplugin, das bei einem Bildlogo übersprungen wird, läuft `banner-text` als Info-Provider und wird dort gerendert, wo sein Modulschlüssel in `modules` steht.

- **Art:** `info_provider`
- **Binary:** `xfetch-plugin-banner-text`
- **Abhängigkeiten:** keine

## Installation

```bash
xfetch plugin install banner-text
```

## Konfiguration

```jsonc
{
    "info_plugins": [
        {
            "plugin": "banner-text",
            "args": {
                "path": "~/.config/xfetch/banners/cyberpunk.txt",
                "blank_line": true
            }
        }
    ],
    "modules": ["os", "kernel", "shell", "plugin:banner-text"],
    "icons": { "plugin:banner-text": "" },
    "labels": { "plugin:banner-text": "" }
}
```

Platziere `plugin:banner-text` am Ende von `modules`, um den Text unter den Statistiken zu rendern. Die leeren `icons`- und `labels`-Einträge verbergen den synthetischen Modulschlüssel; sie sind optional, aber empfohlen.

## Argumente

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `path` | string | keins | Pfad zu einer UTF-8-Textdatei. `~` und `~/` werden zum Home-Verzeichnis expandiert |
| `text` | string | keins | Literaltext, wenn `path` fehlt, nicht lesbar oder leer ist |
| `blank_line` | boolean | `true` | Fügt eine leere Zeile vor dem Text ein |

Sind `path` und `text` leer, gibt das Plugin keine Zeilen zurück. Jede Zeile wird separat ausgegeben; abschließende Leerzeichen sowie führende/abschließende Leerzeilen werden entfernt, führende Leerzeichen nicht-leerer Zeilen bleiben erhalten.

## Ausgabe

Bei einer Datei mit `永遠は朽ち、儚さが記憶を刻む` gibt das Plugin zurück:

```json
{
  "lines": ["", "永遠は朽ち、儚さが記憶を刻む"]
}
```

Zum Einfärben des Textes `colors` in der Konfiguration oder im Theme setzen:

```jsonc
{
    "colors": {
        "plugin:banner-text": "#bd00ff"
    }
}
```

## Plattform

Linux, macOS und Windows. Das Plugin nutzt nur die Rust-Standardbibliothek für Dateizugriff und Home-Expansion.
