# Referencia de Predefinidos

xfetch incluye una biblioteca completa de configuraciones predefinidas que demuestran varios diseños, estilos visuales e integraciones de plugins. Estos predefinidos se encuentran en el repositorio `configs/`.

## Predefinidos de Diseño

Ubicados en `configs/xfetch/presets/layouts/`, estos demuestran todos los estilos de diseño disponibles con conjuntos de módulos completos.

### box

Renderiza todos los módulos dentro de un recuadro de esquinas redondeadas con líneas separadoras entre grupos.

```jsonc
{
    "layout": "box",
    "modules": ["user", "hostname", "sep", "os", "kernel", "uptime", "packages",
                 "shell", "terminal", "wm", "cpu", "gpu", "memory", "disk",
                 "battery", "local_ip", "sep", "palette"],
    "show_colors": true
}
```

### dots

Diseño clásico con separadores `...` cada 3 elementos. Diferentes temas de color por grupo de módulos.

### pacman

Diseño encuadrado con iconos de cabecera y texto de pie con temática Pac-Man.

```jsonc
{
    "layout": "pacman",
    "header_icons": ["\u15a7", "\u25cf", "\u25cf", "\u25cf", "\u25cf"],
    "footer_text": "GAME OVER",
    "modules": ["header", "os", "kernel", "uptime", "packages", "shell",
                 "terminal", "wm", "cpu", "gpu", "memory", "disk",
                 "battery", "local_ip", "palette"]
}
```

### section

Diseño agrupado con secciones tituladas.

```jsonc
{
    "layout": "section",
    "modules": [
        {
            "type": "group", "title": "Hardware",
            "modules": ["hostname", "cpu", "gpu", "memory", "disk"]
        },
        {
            "type": "group", "title": "Software",
            "modules": ["os", "kernel", "packages", "terminal", "shell"]
        },
        {
            "type": "group", "title": "Uptime/Age/DT",
            "modules": ["uptime", "wm", "local_ip", "battery"]
        },
        "palette"
    ]
}
```

### side-block

Diseño de dos columnas con etiquetas de texto como iconos y valores alineados lado a lado.

### tree

Árbol jerárquico con grupos anidados que muestran categorías de SO, DE y PC.

## Predefinidos de Muestra

Ubicados en `configs/xfetch/presets/showcase/`, estos 23 predefinidos demuestran combinaciones visuales creativas.

### Predefinidos de Diseño Clásico

| Archivo | Logo | Iconos | Colores | Módulos |
|---------|------|--------|---------|---------|
| `arch_compact_cyan.jsonc` | `arch.txt` | predeterminados | Todo Cyan | 4 (os, kernel, uptime, packages) |
| `arch_full_blue.jsonc` | `arch.txt` | predeterminados | Todo Blue | 13 (sistema completo) |
| `green_chevrons_core.jsonc` | ninguno | `>>` | Todo Green | 5 (núcleo) |
| `minimal_plus_monochrome.jsonc` | `minimal.txt` | `+` | DarkGrey | 6 |
| `minimal_red_compact.jsonc` | `minimal.txt` | `OS:`, `K:`, etc. | Todo Red | 4 |
| `monochrome_no_icons.jsonc` | ninguno | `""` (vacío) | Todo White | 4 |
| `neon_hardware_compact.jsonc` | ninguno | Nerd Fonts | Cyan + Magenta | 4 |
| `rainbow_letters.jsonc` | ninguno | R-O-Y-G-B-I-V | Arcoíris | 7 |
| `x_logo_full_system.jsonc` | `x_logo.txt` | predeterminados | Similar a arcoíris | 10 |
| `x_logo_red_hardware.jsonc` | `x_logo.txt` | `\u25cf` (punto) | Todo Red | 4 |

### Predefinidos de Diseño Pac-Man

| Archivo | Cabecera | Pie | Módulos | Estilo Paleta |
|---------|----------|-----|---------|---------------|
| `pacman_full_white.jsonc` | Predeterminada | Predeterminado | Completo | Predeterminado |
| `pacman_system_compact.jsonc` | Predeterminada | Predeterminado | os, kernel, memory | Predeterminado |
| `pacman_abc_shell.jsonc` | A, B, C | ABC | os, shell | Predeterminado |
| `pacman_minus_uptime.jsonc` | -, -, - | MINUS | uptime | Predeterminado |
| `pacman_numeric_hardware.jsonc` | 1, 2, 3 | NUM | cpu, memory | Predeterminado |
| `pacman_plus_os.jsonc` | +, +, + | PLUS | os | Predeterminado |
| `pacman_question_packages.jsonc` | ?, ? | QUEST | packages | Predeterminado |
| `pacman_star_uptime.jsonc` | estrella, estrella, estrella | STAR | os, uptime | Predeterminado |
| `pacman_symbols_portable.jsonc` | !, @, # | SYM | disk, battery | Predeterminado |
| `pacman_xox_kernel.jsonc` | x, o, x | XOX | os, kernel | Predeterminado |
| `pacman_palette_dots.jsonc` | Predeterminada | Predeterminado | Completo | `dots` |
| `pacman_palette_lines.jsonc` | Predeterminada | Predeterminado | Completo | `lines` |
| `pacman_palette_triangles.jsonc` | Predeterminada | Predeterminado | Completo | `triangles` |

## Predefinidos de Plugins

Ubicados en `configs/plugins/`, estos predefinidos demuestran integraciones de plugins.

### Predefinido de Animate-Logo

Archivo: `configs/plugins/animate-logo/presets/xfetch_pacman_animate.jsonc`

Demuestra logos ASCII animados con el diseño Pac-Man:

```jsonc
{
    "layout": "pacman",
    "ascii": "~/.config/xfetch/logos/xfetch_logo.txt",
    "logo_animation": {
        "plugin": "animate-logo",
        "fps": 12,
        "duration_ms": 1200,
        "loop": false
    }
}
```

### Predefinido Completo

Archivo: `configs/plugins/full-stack/presets/full_stack.jsonc`

Demuestra todas las funcionalidades juntas: animación, múltiples plugins de información, diseño de sección agrupada.

```jsonc
{
    "layout": "section",
    "logo_animation": {
        "plugin": "animate-logo",
        "style": "frame",
        "fps": 60,
        "duration_ms": 7500,
        "loop": true,
        "frames_path": "~/.config/xfetch/logos/decryptfull.txt"
    },
    "info_plugins": [
        { "plugin": "github-stats", "args": { "username": "xscriptor", "max-lines": 4 } },
        { "plugin": "docker" }
    ],
    "modules": [
        { "type": "group", "title": "Hardware", "modules": ["hostname", "cpu", "gpu", "memory", "swap", "disk", "battery"] },
        { "type": "group", "title": "Software", "modules": ["os", "kernel", "packages", "shell", "wm", "terminal", "local_ip", "plugin:docker"] },
        { "type": "group", "title": "Session", "modules": ["user", "uptime", "datetime", "plugin:github-stats"] },
        "palette"
    ],
    "icons": {
        "plugin:docker": "\ue7b0",
        "plugin:github-stats": "\uf09b"
    },
    "colors": {
        "plugin:github-stats": "Cyan",
        "plugin:docker": "Cyan"
    }
}
```

**Plugins requeridos:** `animate-logo`, `docker`, `github-stats`

### Predefinido de Módulos Mejorados (Fase 6)

Archivo: `configs/plugins/new-modules/presets/enhanced_modules.jsonc`

Demuestra los seis módulos mejorados de la Fase 6 en un diseño agrupado:

```jsonc
{
    "layout": "section",
    "info_plugins": [
        { "plugin": "music-player" },
        { "plugin": "weather", "args": { "location": "auto" } },
        { "plugin": "timezone" },
        { "plugin": "user-info" },
        { "plugin": "display-resolution" },
        { "plugin": "theme-detection" }
    ],
    "modules": [
        { "type": "group", "title": "System", "modules": ["os", "kernel", "hostname", "uptime"] },
        { "type": "group", "title": "User", "modules": ["plugin:user-info", "plugin:timezone", "plugin:theme-detection"] },
        { "type": "group", "title": "Hardware", "modules": ["cpu", "gpu", "memory", "disk", "plugin:display-resolution"] },
        { "type": "group", "title": "Media", "modules": ["plugin:music-player", "plugin:weather"] },
        "palette"
    ],
    "icons": {
        "plugin:user-info": "\uf007",
        "plugin:timezone": "\uf43a",
        "plugin:theme-detection": "\uf07c",
        "plugin:display-resolution": "\uf26c",
        "plugin:music-player": "\uf001",
        "plugin:weather": "\uf185"
    },
    "colors": {
        "plugin:user-info": "Magenta",
        "plugin:timezone": "Cyan",
        "plugin:theme-detection": "Blue",
        "plugin:display-resolution": "Green",
        "plugin:music-player": "Yellow",
        "plugin:weather": "Cyan"
    }
}
```

**Plugins requeridos:** `music-player`, `weather`, `timezone`, `user-info`, `display-resolution`, `theme-detection`

## Uso de Predefinidos

```bash
# Ejecutar con cualquier predefinido
xfetch --config /path/to/preset.jsonc

# Usar un predefinido como predeterminado
cp configs/xfetch/presets/showcase/neon_hardware_compact.jsonc ~/.config/xfetch/config.jsonc

# Generar una configuración predeterminada como punto de partida
xfetch --gen-config
```

La configuración predeterminada generada usa el diseño de sección con módulos agrupados y personalización completa de iconos/colores.
