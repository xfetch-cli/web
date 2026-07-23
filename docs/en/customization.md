# Customization

xfetch offers extensive visual customization through logos, icons, colors, and animation effects. All customization is configured in the JSONC configuration file.

## Logos

xfetch supports three types of logos: ASCII art, image files, and the built-in default.

### Default ASCII Logo

When no custom logo is specified, xfetch displays its built-in ASCII art:

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

### Custom ASCII Logo

To use a custom ASCII logo, set the `logo_path` or `ascii` field:

```jsonc
{
    "logo_path": "~/.config/xfetch/logos/arch.txt"
}
```

ASCII logo files are plain text files. ANSI escape codes can be used for coloring:

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

Sample logos are included in the xfetch installation at `~/.config/xfetch/logos/`:

| File | Description |
|------|-------------|
| `arch.txt` | Blue ASCII Arch Linux logo (7 lines) |
| `x_logo.txt` | Cyan-to-green gradient "X" shape (9 lines) |
| `minimal.txt` | A simple `[ xfetch ]` label (1 line) |

### Image Logos

xfetch can render PNG, JPG, and SVG images as logos using the `viuer` library. This requires terminal support for image display (iTerm2, Kitty, or Sixel-compatible terminals):

```jsonc
{
    "logo_path": "~/.config/xfetch/logos/my-logo.png"
}
```

Image rendering uses the terminal's native image protocol:

- **iTerm2:** inline image protocol
- **Kitty:** Kitty's native image protocol
- **Sixel:** Sixel graphics (compatible terminals like xterm, mlterm)

If the terminal does not support image display, xfetch falls back to ASCII.

## Logo Animation

ASCII logos can be animated using the `animate-logo` plugin. Animation styles transform the logo with color effects over time.

### Configuration

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

### Animation Styles

| Style | Description |
|-------|-------------|
| `sweep` | Colors sweep left-to-right using a 6-color ANSI palette (red, green, yellow, blue, magenta, cyan) |
| `wave` | Sine-wave color pattern moves across the logo |
| `rainbow` | Full RGB gradient shifts over the logo using interpolated 24-bit color |
| `sparkle` | Random characters briefly light up in bright colors |
| `breathing` | All characters pulse in warm amber tones (sine-based brightness) |
| `frame` | Cycles through pre-loaded ASCII frame sets from a frames file |
| `none` | Static display, no color transformation |

### Frame-Based Animation

The `frame` style cycles through pre-defined ASCII frame sets. Frame sets are loaded from a file specified in `frames_path`:

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

The frames file format uses `===` as a separator between frame sets:

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

Every module can have a custom icon. Icons are configured in the `icons` object of the configuration file:

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

Icons can be:

- **Nerd Font glyphs:** Unicode characters from the Nerd Fonts patched font set
- **Unicode symbols:** Standard Unicode characters
- **Text strings:** Any short text (e.g., `">>"`, `"+"`, `"OS:"`)
- **Empty string:** To hide the icon entirely

### Default Icons

If not specified in the configuration, xfetch uses built-in default icon mappings for all standard modules.

## Colors

Module colors are configured in the `colors` object:

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

### Available Colors

| Name | ANSI Code | Description |
|------|-----------|-------------|
| `Black` | 30 | Standard black |
| `Red` | 31 | Standard red |
| `Green` | 32 | Standard green |
| `Yellow` | 33 | Standard yellow |
| `Blue` | 34 | Standard blue |
| `Magenta` | 35 | Standard magenta |
| `Cyan` | 36 | Standard cyan |
| `White` | 37 | Standard white |
| `Grey` / `Gray` | 90 | Bright black |

### Color Modes

Color output can be disabled entirely:

```jsonc
{
    "show_colors": false
}
```

## Palette Display

The `palette` module renders an ANSI color swatch. The style is controlled by the `palette_style` field:

```jsonc
{
    "palette_style": "squares"
}
```

### Palette Styles

| Style | Preview |
|-------|---------|
| `squares` | Filled background color blocks |
| `circles` | Colored circle symbols |
| `triangles` | Colored triangle symbols |
| `lines` | Thick horizontal color bars |
| `dots` | Small colored dots |

The palette displays 8 colors matching the ANSI standard palette: Black, Red, Green, Yellow, Blue, Magenta, Cyan, White.

## Preset Configurations

xfetch ships with numerous preset configurations demonstrating different visual styles.

### Showcase Presets (23 examples)

Located in `configs/xfetch/presets/showcase/`, these presets demonstrate various icon, color, and logo combinations:

| Preset | Layout | Key Features |
|--------|--------|-------------|
| `arch_compact_cyan.jsonc` | classic | Arch logo, all Cyan |
| `arch_full_blue.jsonc` | classic | Arch logo, all Blue |
| `green_chevrons_core.jsonc` | classic | `>>` icons, all Green |
| `minimal_plus_monochrome.jsonc` | classic | Minimal logo, `+` icons, DarkGrey |
| `minimal_red_compact.jsonc` | classic | Text icons like "OS:", all Red |
| `monochrome_no_icons.jsonc` | classic | No icons, all White |
| `neon_hardware_compact.jsonc` | classic | Cyan+Magenta neon theme |
| `rainbow_letters.jsonc` | classic | R-O-Y-G-B-I-V icons, rainbow colors |
| `x_logo_full_system.jsonc` | classic | X logo, rainbow coloring |
| `x_logo_red_hardware.jsonc` | classic | X logo, dot icons, all Red |
| `pacman_full_white.jsonc` | pacman | X logo, mostly White |
| `pacman_system_compact.jsonc` | pacman | 3 modules, Cyan |
| `pacman_abc_shell.jsonc` | pacman | A-B-C header |
| `pacman_minus_uptime.jsonc` | pacman | Minus sign header |
| `pacman_numeric_hardware.jsonc` | pacman | 1-2-3 header |
| `pacman_plus_os.jsonc` | pacman | Plus sign header |
| `pacman_question_packages.jsonc` | pacman | Question mark header |
| `pacman_star_uptime.jsonc` | pacman | Star header |
| `pacman_symbols_portable.jsonc` | pacman | !-@-# header |
| `pacman_xox_kernel.jsonc` | pacman | X-O-X header |
| `pacman_palette_dots.jsonc` | pacman | Dots palette style |
| `pacman_palette_lines.jsonc` | pacman | Lines palette style |
| `pacman_palette_triangles.jsonc` | pacman | Triangles palette style |

### Layout Presets (6 examples)

Located in `configs/xfetch/presets/layouts/`:

| Preset | Layout | Notes |
|--------|--------|-------|
| `layout_box_full.jsonc` | box | Full module set with sep separators |
| `layout_dots_full.jsonc` | dots | Colored module groups |
| `layout_pacman_full.jsonc` | pacman | Pac-Man icons and "GAME OVER" footer |
| `layout_section.jsonc` | section | Three groups: Hardware, Software, Session |
| `layout_side_block.jsonc` | side-block | Text labels as icons |
| `layout_tree.jsonc` | tree | Nested OS/DE/PC groups |

### Using Presets

```bash
# Run with a specific preset
xfetch --config /path/to/presets/showcase/arch_compact_cyan.jsonc
```

Or copy a preset to use as your default:

```bash
cp configs/xfetch/presets/showcase/neon_hardware_compact.jsonc ~/.config/xfetch/config.jsonc
```
