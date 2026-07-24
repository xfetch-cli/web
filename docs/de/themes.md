# Themes

Das Theme-System trennt das visuelle Erscheinungsbild (Farben, Icons, Layout) von der Modulkonfiguration, sodass du das Aussehen wechseln kannst, ohne deine Moduleinrichtung anzutasten.

## Architektur

Themes arbeiten auf der Konfigurationsebene, bevor eine Darstellung oder Plugin-Ausfuhrung erfolgt.

```
config.jsonc (theme: "berlin", modules: [...])
       |
       v
   Lade Standardkonfiguration
       |
       v
   Lade config.jsonc des Benutzers
       |
       v
   Lade theme/<name>.jsonc
       |
       v
   Zusammenfuhrung: defaults <- config.jsonc <- theme
       |
       v
   Endgultige Konfiguration (vom Renderer verwendet)
```

## Merge-Reihenfolge (letzter gewinnt)

Jede Ebene kann jedes visuelle Feld uberschreiben. Seit **v0.2.0** hat das Theme die hochste Prioritat:

| Ebene | Quelle | Inhalt |
|-------|--------|--------|
| 1. Standardwerte | Fest codiert in `config.rs` | Standard-Icons, Farben, Layout |
| 2. Benutzerkonfiguration | `config.jsonc` | `modules`, `info_plugins`, sowie Uberschreibungen fur jedes visuelle Feld |
| 3. Theme-Datei | `themes/<name>.jsonc` | `colors`, `icons`, `layout`, `palette_style`, `logo_path`, `header_icons`, `footer_text`, `show_colors` |

Ein Feld in der **Theme-Datei** gewinnt immer gegenuber demselben Feld in `config.jsonc` oder den Standardwerten.

### Details der Zusammenfuhrung

Die Zusammenfuhrung verwendet `deep_merge()`, das Schlussel fur Schlussel arbeitet:

- **Objekte:** werden rekursiv zusammengefuhrt — jeder Schlussel wird unabhangig aufgelost
- **Strings, Zahlen, Booleans:** der Overlay ersetzt die Basis
- **Leere Strings:** ein leerer String uberschreibt *nicht* einen nicht-leeren String (verhindert, dass Themes versehentlich Icons loschen)
- **Leere Objekte `{}`:** keine Operation — vorhandene Schlussel bleiben erhalten

> **Hinweis zur Aktualisierung (v0.1.x → v0.2.0):** In v0.1.x gewann `config.jsonc` gegenuber dem Theme.
> Wenn du aktualisierst, kann deine vorhandene Konfiguration das Theme uberschreiben. Exportiere dein aktuelles Aussehen mit
> `xfetch theme export my-look`, setze `"theme": "my-look"` und entferne die visuellen Felder aus `config.jsonc`.

## Theme-Dateiformat

Eine Theme-Datei ist ein JSONC-Dokument, das nur visuelle Felder enthalt. Sie darf `modules` oder `info_plugins` nicht enthalten.

```jsonc
{
    "layout": "section",
    "show_colors": true,
    "palette_style": "circles",
    "colors": {
        "os": "Magenta",
        "cpu": "Red",
        "memory": "Yellow",
        "disk": "Cyan",
        "shell": "Green",
        "wm": "Blue"
    },
    "icons": {
        "os": "\uf17c",
        "cpu": "\uf2db",
        "memory": "\ue266",
        "disk": "\uf0a0",
        "shell": "\uf0e7",
        "wm": "\uf08e"
    }
}
```

### Unterstutzte Felder

| Feld | Typ | Beschreibung |
|------|-----|-------------|
| `layout` | `string` oder `null` | Name des Layout-Stils |
| `colors` | `object` | Modulspezifische Farbzuordnung |
| `icons` | `object` | Modulspezifische Icon-Zuordnung |
| `palette_style` | `string` oder `null` | Palettenanzeige: `squares`, `circles`, `triangles`, `lines`, `dots` |
| `show_colors` | `boolean` | Inline-ANSI-Farbindikatoren ein-/ausschalten |
| `logo_path` | `string` oder `null` | Pfad zu einer Logo-Datei |
| `header_icons` | `array` oder `null` | Header-Icons fur Pac-Man-Layout |
| `footer_text` | `string` oder `null` | Footer-Text fur Pac-Man-Layout |

## Theme-Auflosung

Wenn xfetch eine Konfiguration mit `theme: "dracula"` ladet, durchsucht der Resolver in dieser Reihenfolge:

1. **Direkter Pfad** -- Wenn der Wert ein Dateipfad ist (enthalt `/` oder beginnt mit `~`), wird er direkt geladen
2. **Themes-Verzeichnis** -- Suche nach `<name>.jsonc` in `~/.config/xfetch/themes/`

Wenn das Theme nicht gefunden wird, wird die Konfiguration unverandert ohne das Theme geladen.

## CLI-Befehle

```bash
# Installierte Themes auflisten
xfetch theme list

# Ein Theme aktivieren (setzt das Feld "theme" in config.jsonc)
xfetch theme set nord

# Eine Theme-Datei entfernen
xfetch theme remove nord

# Aktuelle visuelle Konfiguration als Theme-Datei exportieren
xfetch theme export my-theme
```

### Exportverhalten

`xfetch theme export <name>` erfasst den aktuellen Laufzeit-Status (nach der Zusammenfuhrung) und schreibt ihn nach `~/.config/xfetch/themes/<name>.jsonc`. Dies ermoglicht es, dein Aussehen zu teilen, ohne deine Modulliste offenzulegen.

Die exportierte Datei enthalt nur:
- `layout`
- `colors`
- `icons`
- `palette_style`
- `header_icons`
- `footer_text`
- `logo_path`
- `show_colors`

## Abwartskompatibilitat

Das Theme-System ist vollstandig abwartskompatibel:

- **Ohne `theme`-Feld:** Alles funktioniert genau wie zuvor. Die Konfigurationsdatei enthalt alle visuellen Felder direkt.
- **Vorhandene Konfigurationen:** Konnen durch Exportieren migriert werden: `xfetch theme export current`, danach setze `"theme": "current"` und entferne die visuellen Felder aus der Hauptkonfiguration.
- **Plugin-Konfigurationen:** Plugin-Referenzen (`info_plugins`) bleiben ausschlieblich in `config.jsonc`, niemals in Theme-Dateien.

## Verzeichnisstruktur

```
~/.config/xfetch/
    config.jsonc            # Module, Plugins und optionale Theme-Referenz
    themes/
        dracula.jsonc       # Theme-Dateien: Farben, Icons, Layout
        nord.jsonc
        catppuccin-mocha.jsonc
        retro-pacman.jsonc
        berlin.jsonc
        tree-compact.jsonc
```

## Integrierte Themes

Das offizielle Theme-Repository befindet sich unter `github.com/xfetch-cli/configs` im Verzeichnis `themes/`:

| Theme | Layout | Stil |
|-------|--------|------|
| `dracula` | section | Dunkle Magenta-, Rot- und Cyan-Palette |
| `nord` | section | Kuhle Blau- und Arktis-Cyan-Palette |
| `catppuccin-mocha` | section | Warme Mokka-Pastell-Palette |
| `retro-pacman` | pacman | Klassischer Pac-Man-Arcade-Stil mit Header-Icons und Footer-Text |
| `berlin` | default | Monochrom: alles wei, sauberes, minimalistisches Aussehen |
| `tree-compact` | tree | Hierarchisches Baum-Layout |

## Implementierungsdetails

### Konfigurationsladung (`config.rs`)

Die Zusammenfuhrung verwendet `serde_json::Value` Deep-Merge vor der Deserialisierung:

1. Parse `config.jsonc` als `serde_json::Value`
2. Deserialisiere zu `Config`, um das `theme`-Feld zu extrahieren
3. Wenn `theme` gesetzt ist, lade die Theme-Datei als `serde_json::Value`
4. Erstelle ein leeres `Value` und fuhre in der Reihenfolge zusammen: defaults → config.jsonc → theme
5. Deserialisiere das zusammengefuhrte Ergebnis zu `Config`

### Theme-Verwaltung (`themes/mod.rs`)

- `list_themes()` -- Durchsucht `~/.config/xfetch/themes/` nach `*.jsonc`-Dateien
- `set_active_theme()` -- Liest `config.jsonc`, setzt das `theme`-Feld, schreibt zuruck
- `remove_theme()` -- Loscht eine Theme-Datei aus dem Themes-Verzeichnis
- `export_current_theme()` -- Erstellt eine JSONC-Datei aus den visuellen Feldern der aktuellen Config
