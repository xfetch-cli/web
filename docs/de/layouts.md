# Layouts

xfetch unterstutzt mehrere visuelle Layouts zur Anzeige von Systeminformationen. Jedes Layout ordnet Module, Gruppen und das Logo unterschiedlich an. Layouts werden uber das Feld `layout` in der Konfigurationsdatei ausgewahlt.

## Layout-Ubersicht

| Konfigurationswert | Beschreibung |
|--------------|-------------|
| `null` oder `"default"` | Klassisch nebeneinander: Logo links, Info rechts |
| `"section"` | Gruppierte Informationen mit Abschnittsuberschriften |
| `"pacman"` | Gerahmtes Layout mit dekorativer Kopf- und Fuzeile |
| `"side-block"` | Zwei Spalten: Icons links, Werte rechts |
| `"tree"` | Hierarchischer Baum mit Verzweigungsverbindern |
| `"box"` | Abgerundete Box um den gesamten Inhalt |
| `"line"` | Klassisch mit `---`-Trennern alle 3 Elemente |
| `"dots"` | Klassisch mit `...`-Trennern alle 3 Elemente |
| `"bottom_line"` | Klassisch mit einer `---`-Linie am unteren Rand |
| `"compact"` | Minimale Ausgabe ohne Rander oder Trennzeichen |
| `"minimal"` | Reines `Schlussel: Wert`-Format, keine Icons oder Farben |
| `"horizontal"` | Inhalt oberhalb des Logos (vertikal gestapelt) |
| `"bottom"` | Logo unterhalb des Inhalts (vertikal gestapelt) |

## Standard / Klassisches Layout

Das Standardlayout platziert das Logo (ASCII-Kunst oder Bild) auf der linken Seite und Informationszeilen auf der rechten Seite, getrennt durch einen zweiraumigen Abstand.

```
__  __                               OS: Arch Linux x86_64
  \ \/ /                             Kernel: 6.6.87.2-arch1-1
   \  /                              Uptime: 2 hours, 15 mins
   /  \                              Packages: 657
  /_/\_\                             Shell: zsh
 /____/linux                         Terminal: WezTerm
---------BEGIN PUBLIC KEY----------   WM: Hyprland
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMII CPU: Intel i5-7400 @ 3.00GHz (4)
BCgKCAQEAwtU/XOS/xOf/FakeKeyDataFor GPU: NVIDIA GeForce RTX 3060
ArtPutHere+Of/XOSLINUXDISTRO/gD4t4+ Memory: 3.10 GiB / 7.74 GiB (40%)
...                                  Disk: 120.5 GiB / 256 GiB (47%)
----------END PUBLIC KEY-----------   Battery: 85% [Charging]
```

Dies ist die Standardeinstellung, wenn kein Feld `layout` angegeben ist oder wenn es auf `null` gesetzt ist.

## Abschnitts-Layout

Gruppiert Module unter titelierten Abschnitten. Verwendet `------ Titel ------`-Uberschriften undruckt Inhalte mit einem senkrechten Strich.

```
------ Hardware ------
hostname thinkpad-x1
cpu      Intel i5-7400 @ 3.00GHz (4)
gpu      NVIDIA GeForce RTX 3060
memory   3.10 GiB / 7.74 GiB (40%)
disk     120.5 GiB / 256 GiB (47%) - ext4
battery  85% [Charging]

------ Software ------
os       Arch Linux x86_64
kernel   6.6.87.2-arch1-1
packages 657
shell    zsh
wm       Hyprland
terminal WezTerm

------ Session ------
user     xscriptor
uptime   2 hours, 15 mins
datetime 2026-07-23 14:30:00
```

Konfiguration:

```jsonc
{
    "layout": "section",
    "modules": [
        {
            "type": "group",
            "title": "Hardware",
            "modules": ["hostname", "cpu", "gpu", "memory", "disk", "battery"]
        },
        {
            "type": "group",
            "title": "Software",
            "modules": ["os", "kernel", "packages", "shell", "wm", "terminal"]
        },
        {
            "type": "group",
            "title": "Session",
            "modules": ["user", "uptime", "datetime"]
        }
    ]
}
```

## Pac-Man-Layout

Ein gerahmtes Layout mit einem dekorativen oberen Rand, der Pac-Man ahnelt, konfigurierbaren Kopf-Icons, einem unteren Rand mit Fusstext und Inhalt dazwischen.

```
╭── ᗧ ● ● ● ● ───────────────────────╮
│                                      │
│ xscriptor@thinkpad-x1                │
│ OS:      Arch Linux x86_64           │
│ Kernel:  6.6.87.2-arch1-1           │
│ Uptime:  2 hours, 15 mins            │
│ Packages: 657                        │
│ Shell:   zsh                         │
│ CPU:     Intel i5-7400               │
│ Memory:  3.10 GiB / 7.74 GiB (40%)  │
│                                      │
╰──────────────────── GAME OVER ───────╯
```

Konfiguration:

```jsonc
{
    "layout": "pacman",
    "header_icons": ["\u15a7", "\u25cf", "\u25cf", "\u25cf", "\u25cf"],
    "footer_text": "GAME OVER",
    "modules": ["header", "os", "kernel", "uptime", "packages", "shell", "cpu", "memory"]
}
```

Das Modul `header` zeigt `user@hostname` an. Das Array `header_icons` fullt den oberen Rand. Der `footer_text` erscheint im unteren Rand.

## Seitenblock-Layout

Zwei ausgerichtete Boxen: Die linke Box enthalt Icons, die rechte Box enthalt Werte. Gruppentitel erscheinen als Abschnittsuberschriften innerhalb der Blocke.

```
┌ Icons ───────────────────┐ ┌ Values ──────────────────────┐
│ \uf17c                   │ │ OS                           │
│ \ue266                   │ │ Memory                       │
│ \uf2db                   │ │ CPU                          │
│ \uf0b9                   │ │ GPU                          │
│ \uf240                   │ │ Battery                      │
└──────────────────────────┘ └──────────────────────────────┘
```

## Baum-Layout

Hierarchisches Layout mit Baumverbindern (`---`, `+-`, `\-`), die die Modulverschachtelung zeigen.

```
\uf17c OS
\uf17c Kernel
\uf109 Hostname
  \uf2db CPU
  \uf0b9 GPU
  \ue266 Memory
  \uf0a0 Disk
  \uf240 Battery
```

Gruppen werden mit ihren Titeln als Elternknoten und Modulen als Kindern dargestellt:

```
DE
  \uf08e Hyprland
  \uf0e7 WezTerm
PC
  \uf2db Intel i5-7400 @ 3.00GHz (4)
  \uf0b9 NVIDIA GeForce RTX 3060
  \ue266 3.10 GiB / 7.74 GiB (40%)
  \uf0a0 120.5 GiB / 256 GiB (47%) - ext4
  \uf240 85% [Charging]
```

## Box-Layout

Der gesamte Inhalt in einer Box mit abgerundeten Ecken:

```
╭──────────────────────────────────────╮
│                                      │
│ OS:      Arch Linux x86_64           │
│ Kernel:  6.6.87.2-arch1-1           │
│ Uptime:  2 hours, 15 mins            │
│ Packages: 657                        │
│ Shell:   zsh                         │
│ CPU:     Intel i5-7400 @ 3.00GHz (4) │
│ Memory:  3.10 GiB / 7.74 GiB (40%)  │
│                                      │
╰──────────────────────────────────────╯
```

## Linien-, Punkte-, Untere-Linie-Layouts

Varianten des klassischen Layouts mit dekorativen Trennzeichen:

### Linien-Layout (Trenner alle 3 Elemente)

```
OS:   Arch Linux x86_64
Kernel: 6.6.87.2-arch1-1
Uptime: 2 hours, 15 mins
─────────────────────────────────────────
Packages: 657
Shell: zsh
Terminal: WezTerm
─────────────────────────────────────────
WM: Hyprland
CPU: Intel i5-7400 @ 3.00GHz (4)
Memory: 3.10 GiB / 7.74 GiB (40%)
```

### Punkte-Layout (Trenner alle 3 Elemente)

```
OS:   Arch Linux x86_64
Kernel: 6.6.87.2-arch1-1
Uptime: 2 hours, 15 mins
...
Packages: 657
Shell: zsh
Terminal: WezTerm
...
WM: Hyprland
CPU: Intel i5-7400 @ 3.00GHz (4)
Memory: 3.10 GiB / 7.74 GiB (40%)
```

### Untere-Linie-Layout (Linie am unteren Rand)

```
OS:   Arch Linux x86_64
Kernel: 6.6.87.2-arch1-1
Uptime: 2 hours, 15 mins
─────────────────────────────────────────
```

## Kompaktes Layout

Minimale Ausgabe ohne Rander, Uberschriften oder Trennzeichen. Nur Icon und Wert pro Zeile.

```
\uf17c Arch Linux x86_64
\uf17c 6.6.87.2-arch1-1
\uf109 thinkpad-x1
\uf2db Intel i5-7400 @ 3.00GHz (4)
\uf0b9 NVIDIA GeForce RTX 3060
\ue266 3.10 GiB / 7.74 GiB (40%)
\uf0a0 120.5 GiB / 256 GiB (47%) - ext4
```

## Minimales Layout

Reines Textformat ohne Icons oder Farben. Verwendet vertikale Stapelung (Logo wird nicht angezeigt).

```
os: Arch Linux x86_64
kernel: 6.6.87.2-arch1-1
hostname: thinkpad-x1
cpu: Intel i5-7400 @ 3.00GHz (4)
memory: 3.10 GiB / 7.74 GiB (40%)
disk: 120.5 GiB / 256 GiB (47%) - ext4
```

## Horizontale und Untere Layouts

Varianten, die die Position des Logos relativ zum Inhalt andern:

- **Horizontal:** Inhalt oben, Logo unten (nutzlich fur breite Terminals)
- **Unten:** Logo oben, Inhalt unten (wie Standard, aber vertikal gestapelt)

Diese Layouts zeigen das Logo nicht nebeneinander an. Stattdessen stapeln sie das Logo und den Inhalt vertikal.
