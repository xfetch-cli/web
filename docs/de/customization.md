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

xfetch kann PNG-, JPG- und SVG-Bilder als Logos mit der Bibliothek `viuer` rendern. Dies erfordert Terminalunterstützung für Bildanzeige (iTerm2, Kitty oder Sixel-kompatible Terminals):

```jsonc
{
    "logo_path": "~/.config/xfetch/logos/my-logo.png"
}
```

Das Bild-Rendering verwendet das native Bildprotokoll des Terminals:

- **iTerm2:** Inline-Bildprotokoll
- **Kitty:** Kittys natives Bildprotokoll
- **Sixel:** Sixel-Grafiken (kompatible Terminals wie xterm, mlterm)

Wenn das Terminal keine Bildanzeige unterstützt, fallt xfetch auf ASCII zurück.

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
| `dots` | Kleine farbige Punkte |

Die Palette zeigt 8 Farben entsprechend der ANSI-Standardpalette: Schwarz, Rot, Grun, Gelb, Blau, Magenta, Cyan, Wei.

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
xfetch --config /pfad/zu/presets/showcase/arch_compact_cyan.jsonc
```

Oder kopieren Sie ein Preset, um es als Standard zu verwenden:

```bash
cp configs/xfetch/presets/showcase/neon_hardware_compact.jsonc ~/.config/xfetch/config.jsonc
```
