# Layouts

xfetch supports multiple visual layouts for displaying system information. Each layout arranges modules, groups, and the logo differently. Layouts are selected via the `layout` field in the configuration file.

## Layout Overview

| Config Value | Description |
|--------------|-------------|
| `null` or `"default"` | Classic side-by-side: logo left, info right |
| `"section"` | Grouped information with section headers |
| `"pacman"` | Boxed layout with decorative header and footer |
| `"side-block"` | Two-column: icons on left, values on right |
| `"tree"` | Hierarchical tree with branch connectors |
| `"box"` | Rounded box around all content |
| `"line"` | Classic with `---` separators every 3 items |
| `"dots"` | Classic with `...` separators every 3 items |
| `"bottom_line"` | Classic with a `---` line at the bottom |
| `"compact"` | Minimal output without borders or separators |
| `"minimal"` | Plain `key: value` format, no icons or colors |
| `"horizontal"` | Content above logo (stacked vertically) |
| `"bottom"` | Logo below content (stacked vertically) |

## Default / Classic Layout

The default layout places the logo (ASCII art or image) on the left side and information lines on the right side, separated by a two-space gap.

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

This is the default when no `layout` field is specified or when set to `null`.

## Section Layout

Groups modules under titled sections. Uses `------ Title ------` headers and indents content with a vertical bar.

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

Configuration:

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

## Pac-Man Layout

A boxed layout with a decorative top border resembling Pac-Man, configurable header icons, a bottom border with footer text, and content in between.

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

Configuration:

```jsonc
{
    "layout": "pacman",
    "header_icons": ["\u15a7", "\u25cf", "\u25cf", "\u25cf", "\u25cf"],
    "footer_text": "GAME OVER",
    "modules": ["header", "os", "kernel", "uptime", "packages", "shell", "cpu", "memory"]
}
```

The `header` module displays `user@hostname`. The `header_icons` array populates the top border. The `footer_text` appears in the bottom border.

## Side-Block Layout

Two aligned boxes: the left box contains icons, the right box contains values. Group titles appear as section headers within the blocks.

```
┌ Icons ───────────────────┐ ┌ Values ──────────────────────┐
│ \uf17c                   │ │ OS                           │
│ \ue266                   │ │ Memory                       │
│ \uf2db                   │ │ CPU                          │
│ \uf0b9                   │ │ GPU                          │
│ \uf240                   │ │ Battery                      │
└──────────────────────────┘ └──────────────────────────────┘
```

## Tree Layout

Hierarchical layout with tree connectors (`---`, `+-`, `\-`) showing module nesting.

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

Groups are rendered with their titles as parent nodes and modules as children:

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

## Box Layout

All content enclosed in a rounded-corner box:

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

## Line, Dots, Bottom Line Layouts

Variants of the classic layout with decorative separators:

### Line Layout (separator every 3 items)

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

### Dots Layout (separator every 3 items)

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

### Bottom Line Layout (line at the bottom)

```
OS:   Arch Linux x86_64
Kernel: 6.6.87.2-arch1-1
Uptime: 2 hours, 15 mins
─────────────────────────────────────────
```

## Compact Layout

Minimal output without any borders, headers, or separators. Just icon and value per line.

```
\uf17c Arch Linux x86_64
\uf17c 6.6.87.2-arch1-1
\uf109 thinkpad-x1
\uf2db Intel i5-7400 @ 3.00GHz (4)
\uf0b9 NVIDIA GeForce RTX 3060
\ue266 3.10 GiB / 7.74 GiB (40%)
\uf0a0 120.5 GiB / 256 GiB (47%) - ext4
```

## Minimal Layout

Plain text format without icons or colors. Uses vertical stacking (logo not displayed).

```
os: Arch Linux x86_64
kernel: 6.6.87.2-arch1-1
hostname: thinkpad-x1
cpu: Intel i5-7400 @ 3.00GHz (4)
memory: 3.10 GiB / 7.74 GiB (40%)
disk: 120.5 GiB / 256 GiB (47%) - ext4
```

## Horizontal and Bottom Layouts

Variants that change the logo position relative to content:

- **Horizontal:** Content displayed on top, logo below (useful for wide terminals)
- **Bottom:** Logo displayed on top, content below (same as default but stacked vertically)

These layouts do not display the logo side-by-side. Instead, they stack the logo and content vertically.
