# Anpassung

xfetch bietet umfangreiche visuelle Anpassungsmöglichkeiten durch Logos, Icons, Farben und Animationseffekte. Die gesamte Anpassung wird in der JSONC-Konfigurationsdatei konfiguriert.

## Logos

xfetch unterstützt drei Arten von Logos: ASCII-Kunst, Bilddateien und das eingebaute Standard-Logo.

### Standard-ASCII-Logo

Wenn kein benutzerdefiniertes Logo angegeben ist, zeigt xfetch seine eingebaute ASCII-Kunst an:

```
__  __
  \ \/ /
   \  /
   /  \
  /_/\_\
 /____/linux
---------BEGIN PUBLIC KEY----------
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMII
...
----------END PUBLIC KEY-----------
```

### Benutzerdefiniertes ASCII-Logo

Um ein benutzerdefiniertes ASCII-Logo zu verwenden, setzen Sie das Feld `logo_path` oder `ascii`:

```jsonc
{
    "logo_path": "~/.config/xfetch/logos/arch.txt"
}
```

ASCII-Logo-Dateien sind reine Textdateien. ANSI-Escape-Codes können zur Farbgebung verwendet werden:

```
\x1b[34m    /\            /\
\x1b[34m   /  \          /  \
\x1b[34m  /\   \        /   /\
\x1b[34m /  \   \      /   /  \
\x1b[34m/   /\   \    /   /\   \
\x1b[34m   /  \   \  /   /  \
\x1b[34m  /    \   \/   /    \
\x1b[34m /______\      /______\
\x1b[0m
```

Beispiel-Logos sind in der xfetch-Installation unter `~/.config/xfetch/logos/` enthalten:

| Datei | Beschreibung |
|------|-------------|
| `arch.txt` | Blaues ASCII-Arch-Linux-Logo (7 Zeilen) |
| `x_logo.txt` | Cyan-zu-Grun-Verlauf "X"-Form (9 Zeilen) |
| `minimal.txt` | Ein einfaches `[ xfetch ]`-Label (1 Zeile) |

### Bildlogos


#### Optionen für ASCII-Logos

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `logo_color` | `string` | keine | Farbe für das ASCII-Logo. Akzeptiert Namen (`"Cyan"`), 256-Farben-Indizes (`"196"`) und Hex-RGB (`"#FF0000"`). Gilt auch für animierte Logos; Zeilen, die bereits ANSI-Codes enthalten, werden nicht verändert. |
| `logo_padding` | `number` | `0` | Führende Leerzeichen vor dem Logo (und seinen Frames bei Animation). |
| `logo_type` | `string` | `"auto"` | `"auto"` erkennt anhand der Dateiendung, `"ascii"` erzwingt Text-Rendering, `"image"` erzwingt Bild-Rendering. |

```jsonc
{
    "ascii": "~/.config/xfetch/logos/arch.txt",
    "logo_color": "#00FF87",
    "logo_padding": 2
}
```


xfetch kann PNG-, JPG- und SVG-Bilder als Logos mit der Bibliothek `viuer` rendern. Dies erfordert Terminalunterstützung für Bildanzeige (iTerm2, Kitty oder Sixel-kompatible Terminals):

```jsonc
{
    "logo_path": "~/.config/xfetch/logos/my-logo.png"
}
```

Das Bild-Rendering verwendet das native Bildprotokoll des Terminals:

- **iTerm2:** Inline-Bildprotokoll
- **Kitty:** Kittys natives Bildprotokoll (hohe Auflosung)
- **Sixel:** Sixel-Grafiken (kompatible Terminals wie xterm, mlterm)

Wenn das Terminal keine Bildanzeige unterstützt, fallt xfetch auf ASCII zuruck.

#### Bildgrosse und Positionierung

Steuern Sie Bildabmessungen und Abstande mit diesen Feldern:

```jsonc
{
    "logo_path": "~/.config/xfetch/images/my-image.png",
    "logo_width": 30,
    "logo_height": null,
    "logo_gap": 5
}
```

| Feld | Standard | Beschreibung |
|-------|---------|-------------|
| `logo_width` | Auto (28% der Terminalbreite, clamp 12–42 Spalten) | Bildbreite in Terminal-Spalten |
| `logo_height` | Auto (Seitenverhaltnis erhalten) | Bildhohe in Terminal-Zeilen |
| `logo_gap` | 12 | Abstand in Spalten zwischen Bild und Infotext |

Die automatische Breitenberechnung skaliert mit Ihrem Terminal: breitere Terminals erhalten proportional grosere Bilder.

#### ASCII-Logo-Felder

| Feld | Standard | Beschreibung |
|-------|---------|-------------|
| `logo_color` | none | Farbe fur ASCII-Logos (Name, Hex oder RGB) |
| `logo_colors` | Auto | Farben pro Zeile fur ASCII-Logos (Array; `Zeile i` verwendet `logo_colors[i % len]`) |
| `logo_padding` | 0 | Abstand um das Logo |
| `logo_type` | Auto | Logo-Typ: `auto`, `ascii` oder `image` |

#### Kitty Terminal Bild-Rendering

In Kitty-Terminals unterstutzt xfetch zwei Rendering-Modi, gesteuert durch `logo_kitty`:

```jsonc
{
    "logo_kitty": true
}
```

| Wert | Modus | Beschreibung |
|-------|------|-------------|
| `true` (Standard) | Natives Protokoll | Vollauflosende Bilder mit Kittys `\x1b_G` Grafikprotokoll. Beste Qualitat. |
| `false` | Half-Block | Bilder gerendert mit Unicode Half-Block-Zeichen (`▄`). Geringere vertikale Auflosung, aber voll kompatibel mit allen Terminalfunktionen. |

Setzen Sie `logo_kitty: false`, wenn Sie Layout-Probleme mit nativem Kitty-Rendering haben (z.B. Textuberlappung oder Fehlausrichtung). Der Half-Block-Fallback garantiert korrektes Side-by-Side-Layout auf Kosten etwas geringerer Bildtreue.

## Logo-Animation

ASCII-Logos können mit dem Plugin `animate-logo` animiert werden. Animationsstile transformieren das Logo im Laufe der Zeit mit Farbeffekten.

### Konfiguration

```jsonc
{
    "logo_animation": {
        "plugin": "animate-logo",
        "fps": 12,
        "duration_ms": 1200,
        "loop": false,
        "style": "sweep"
    }
}
```

### Animationsstile

| Stil | Beschreibung |
|-------|-------------|
| `sweep` | Farben streichen von links nach rechts mit einer 6-Farben-ANSI-Palette (rot, grun, gelb, blau, magenta, cyan) |
| `wave` | Sinuswellen-Farbmuster bewegt sich uber das Logo |
| `rainbow` | Voller RGB-Verlauf verschiebt sich uber das Logo mit interpolierten 24-Bit-Farben |
| `sparkle` | Zufallige Zeichen leuchten kurz in hellen Farben auf |
| `breathing` | Alle Zeichen pulsieren in warmen Amber-Tonen (sinusbasierte Helligkeit) |
| `frame` | Durchlauft vorab geladene ASCII-Frame-Sets aus einer Frame-Datei |
| `none` | Statische Anzeige, keine Farbtransformation |

### Frame-basierte Animation

Der Stil `frame` durchlauft vordefinierte ASCII-Frame-Sets. Frame-Sets werden aus einer in `frames_path` angegebenen Datei geladen:

```jsonc
{
    "logo_animation": {
        "plugin": "animate-logo",
        "style": "frame",
        "fps": 60,
        "duration_ms": 7500,
        "loop": true,
        "frames_path": "~/.config/xfetch/logos/frames.txt"
    }
}
```

Das Frame-Datei-Format verwendet `===` als Trennzeichen zwischen Frame-Sets:

```
frame 1 line 1
frame 1 line 2

===

frame 2 line 1
frame 2 line 2

===

frame 3 line 1
frame 3 line 2
```

## Icons

Jedes Modul kann ein benutzerdefiniertes Icon haben. Icons werden im Objekt `icons` der Konfigurationsdatei konfiguriert:

```jsonc
{
    "icons": {
        "os": "\u2302",
        "kernel": "\u2699",
        "hostname": "\u2394",
        "cpu": "\u269b",
        "gpu": "\u26a1",
        "memory": "\u2261",
        "disk": "\u2b23",
        "battery": "\u26a1",
        "uptime": "\u23f1",
        "packages": "\u2b1a",
        "shell": "\u276f",
        "terminal": "\u2b21",
        "wm": "\u25c6",
        "user": "\u263a",
        "datetime": "\u23f0",
        "local_ip": "\u25c9",
        "palette": "\u2588",
        "plugin:<name>": "\u25c8"
    }
}
```

Icons konnen sein:

- **Nerd Font Glyphen:** Unicode-Zeichen aus dem Nerd Fonts gepatchten Schriftsatz
- **Unicode-Symbole:** Standard-Unicode-Zeichen
- **Textzeichenketten:** Beliebiger kurzer Text (z. B. `">>"`, `"+"`, `"OS:"`)
- **Leere Zeichenkette:** Um das Icon vollstandig auszublenden

### Standard-Icons

Wenn nicht in der Konfiguration angegeben, verwendet xfetch eingebaute Standard-Icon-Zuordnungen fur alle Standardmodule.

## Farben

Modulfarben werden im Objekt `colors` konfiguriert:

```jsonc
{
    "colors": {
        "os": "Cyan",
        "kernel": "White",
        "hostname": "Green",
        "cpu": "Green",
        "gpu": "Green",
        "memory": "Green",
        "disk": "Green",
        "battery": "Green",
        "uptime": "Yellow",
        "packages": "Yellow",
        "shell": "Green",
        "terminal": "Green",
        "wm": "Blue",
        "user": "Magenta",
        "datetime": "Magenta",
        "local_ip": "Yellow",
        "palette": "Magenta"
    }
}
```

### Verfugbare Farben

| Name | ANSI-Code | Beschreibung |
|------|-----------|-------------|
| `Black` | 30 | Standard Schwarz |
| `Red` | 31 | Standard Rot |
| `Green` | 32 | Standard Grun |
| `Yellow` | 33 | Standard Gelb |
| `Blue` | 34 | Standard Blau |
| `Magenta` | 35 | Standard Magenta |
| `Cyan` | 36 | Standard Cyan |
| `White` | 37 | Standard Wei |
| `Grey` / `Gray` | 90 | Helles Schwarz |

### Farbmodi

Die Farbausgabe kann vollstandig deaktiviert werden:

```jsonc
{
    "show_colors": false


### Schlussel (Labels)

StandardmaBig rendert xfetch jedes Modul als `Icon Wert`. Um auch das Modul-Label anzuzeigen, aktiviere `show_keys`; mit `key_width` werden die Labels auf eine feste Spaltenbreite aufgefullt, sodass die Werte vertikal ausgerichtet sind.

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `show_keys` | `boolean` | `false` | Rendert `Schlussel: Wert` in den Icon-Layouts (classic, section, compact, custom-x, Box-Varianten). |
| `key_width` | `number` | auto | Fullt den Schlussel auf diese Spaltenbreite vor dem `:`-Trennzeichen. Gilt uberall, wo Schlussel angezeigt werden, einschlieBlich `section` und `minimal`. |

```jsonc
{
    "show_keys": true,
    "key_width": 12
}
```

Beispiel mit `show_keys` und `key_width: 12`:

```
cpu       : Apple M4 (10) @ 4.46 GHz
memory    : 10.88 GiB / 16.00 GiB (68%)
disk      : 152.80 GiB / 931.32 GiB (16%) - apfs
```
}
```

## Palettenanzeige

Das Modul `palette` rendert ein ANSI-Farbmuster. Der Stil wird durch das Feld `palette_style` gesteuert:

```jsonc
{
    "palette_style": "squares"
}
```

### Palettenstile

| Stil | Vorschau |
|-------|---------|
| `squares` | Ausgefllte Hintergrundfarbblocke |
| `circles` | Farbige Kreissymbole |
| `triangles` | Farbige Dreiecksymbole |
| `lines` | Dicke horizontale Farbbalken |
| `dots` | Kleine Punktsymbole |

Die Palette zeigt 8 Farben entsprechend der ANSI-Standardpalette: Schwarz, Rot, Grun, Gelb, Blau, Magenta, Cyan, Wei.

## Schlussel (Beschriftungen)

Standardmaig rendert xfetch jedes Modul als `Icon Wert`. Um zusatzlich die Modulbeschriftung anzuzeigen, aktivieren Sie `show_keys`; verwenden Sie `key_width`, um die Beschriftungen auf eine feste Spaltenbreite aufzufullen, sodass Werte vertikal ausgerichtet werden.

```jsonc
{
    "show_keys": true,
    "key_width": 12
}
```

## Schlüssel umbenennen: `labels`

Die `labels`-Map benennt die Beschriftung um, die für ein Modul angezeigt wird — in jedem Layout (classic und Varianten, compact, minimal, section, section-box, tree, custom-x). Ein leerer String blendet die Beschriftung aus (nur `Symbol Wert`). Module ohne Eintrag behalten ihren Namen.

```jsonc
{
    "labels": {
        "cpu": "prozessor",
        "gpu": ""
    }
}
```

## Wert-Vorlagen: `formats`

Die `formats`-Map ersetzt den Wert eines Moduls durch eine Vorlage. Platzhalter `{feld}` werden durch die Felder des Moduls ersetzt; unbekannte Platzhalter werden leer gerendert, und `{{` / `}}` erzeugen literale geschweifte Klammern. Module ohne Eintrag behalten ihre Standardausgabe.

| Modul | Felder | Beispiel |
|-------|--------|----------|
| jedes Modul | `{value}` (aktuelle Ausgabe), `{key}` (Modulname) | `"os": "System: {value}"` |
| `cpu` | `{brand}` (roh), `{model}` (bereinigt), `{cores}`, `{freq}` | `"cpu": "{model} · {cores} Kerne · {freq}"` |
| `gpu` | `{name}`, `{vendor}`, `{model}`, `{vram}` | `"gpu": "{vendor} {model}"` |
| `memory`, `swap` | `{used}`, `{total}` (mit Einheit), `{percent}` | `"memory": "{used} / {total} ({percent}%)"` |
| `disk` | Felder von memory plus `{fs}` | `"disk": "{used} auf {fs}"` |
| `os` | `{distro}`, `{version}`, `{arch}`, `{wsl}` | `"os": "{distro} {version} ({arch})"` |
| `packages` | ein Feld pro Paketmanager (`{pacman}`, `{aur}`, ...), plus `{count}`, `{manager}`, `{managers}` | `"packages": "pkg: {pacman} · aur: {aur}"` |
| `battery` | `{percent}`, `{state}` | `"battery": "{percent}% [{state}]"` |
| `uptime` | `{days}`, `{hours}`, `{mins}` | `"uptime": "{days}d {hours}h {mins}m"` |
| `datetime` | `{date}`, `{time}` | `"datetime": "{date} | {time}"` |

So wird zum Beispiel `Intel(R) Core(TM) i5-7400 CPU @ 3.00GHz (4) @ 3.00 GHz` mit `{model}` zu `Intel Core i5-7400` und `NVIDIA GeForce GTX 1060 6GB` mit `{vendor} {model}` zu `NVIDIA GTX 1060`.

```jsonc
{
    "formats": {
        "cpu": "{model} ({cores}) @ {freq}",
        "gpu": "{vendor} {model}"
    }
}
```

## Preset-Konfigurationen

xfetch wird mit zahlreichen Preset-Konfigurationen ausgeliefert, die verschiedene visuelle Stile demonstrieren.

### Showcase-Presets (23 Beispiele)

Befindlich in `configs/xfetch/presets/showcase/`, demonstrieren diese Presets verschiedene Icon-, Farb- und Logo-Kombinationen:

| Preset | Layout | Hauptmerkmale |
|--------|--------|-------------|
| `arch_compact_cyan.jsonc` | classic | Arch-Logo, ganz Cyan |
| `arch_full_blue.jsonc` | classic | Arch-Logo, ganz Blau |
| `green_chevrons_core.jsonc` | classic | `>>`-Icons, ganz Grun |
| `minimal_plus_monochrome.jsonc` | classic | Minimal-Logo, `+`-Icons, Dunkelgrau |
| `minimal_red_compact.jsonc` | classic | Text-Icons wie "OS:", ganz Rot |
| `monochrome_no_icons.jsonc` | classic | Keine Icons, ganz Wei |
| `neon_hardware_compact.jsonc` | classic | Cyan+Magenta-Neon-Theme |
| `rainbow_letters.jsonc` | classic | R-O-Y-G-B-I-V-Icons, Regenbogenfarben |
| `x_logo_full_system.jsonc` | classic | X-Logo, Regenbogenfarbgebung |
| `x_logo_red_hardware.jsonc` | classic | X-Logo, Punkt-Icons, ganz Rot |
| `pacman_full_white.jsonc` | pacman | X-Logo, meist Wei |
| `pacman_system_compact.jsonc` | pacman | 3 Module, Cyan |
| `pacman_abc_shell.jsonc` | pacman | A-B-C-Kopf |
| `pacman_minus_uptime.jsonc` | pacman | Minuszeichen-Kopf |
| `pacman_numeric_hardware.jsonc` | pacman | 1-2-3-Kopf |
| `pacman_plus_os.jsonc` | pacman | Pluszeichen-Kopf |
| `pacman_question_packages.jsonc` | pacman | Fragezeichen-Kopf |
| `pacman_star_uptime.jsonc` | pacman | Stern-Kopf |
| `pacman_symbols_portable.jsonc` | pacman | !-@-#-Kopf |
| `pacman_xox_kernel.jsonc` | pacman | X-O-X-Kopf |
| `pacman_palette_dots.jsonc` | pacman | Punkte-Palettenstil |
| `pacman_palette_lines.jsonc` | pacman | Linien-Palettenstil |
| `pacman_palette_triangles.jsonc` | pacman | Dreiecke-Palettenstil |

### Layout-Presets (6 Beispiele)

Befindlich in `configs/xfetch/presets/layouts/`:

| Preset | Layout | Hinweise |
|--------|--------|-------|
| `layout_box_full.jsonc` | box | Vollstandiges Modulset mit sep-Trennern |
| `layout_dots_full.jsonc` | dots | Farbige Modulgruppen |
| `layout_pacman_full.jsonc` | pacman | Pac-Man-Icons und "GAME OVER"-Fußzeile |
| `layout_section.jsonc` | section | Drei Gruppen: Hardware, Software, Sitzung |
| `layout_side_block.jsonc` | side-block | Textlabels als Icons |
| `layout_tree.jsonc` | tree | Verschachtelte OS/DE/PC-Gruppen |

### Presets verwenden

```bash
# Mit einem bestimmten Preset ausfuhren
xfetch --config /path/to/presets/showcase/arch_compact_cyan.jsonc
```

Oder kopieren Sie ein Preset, um es als Standard zu verwenden:

```bash
cp configs/xfetch/presets/showcase/neon_hardware_compact.jsonc ~/.config/xfetch/config.jsonc
```
