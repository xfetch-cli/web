# Personalización

xfetch ofrece una amplia personalización visual a través de logos, iconos, colores y efectos de animación. Toda la personalización se configura en el archivo de configuración JSONC.

## Logos

xfetch admite tres tipos de logos: arte ASCII, archivos de imagen y el logo interno predeterminado.

### Logo ASCII Predeterminado

Cuando no se especifica un logo personalizado, xfetch muestra su arte ASCII integrado:

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

### Logo ASCII Personalizado

Para usar un logo ASCII personalizado, establezca el campo `logo_path` o `ascii`:

```jsonc
{
    "logo_path": "~/.config/xfetch/logos/arch.txt"
}
```

Los archivos de logo ASCII son archivos de texto plano. Se pueden usar códigos de escape ANSI para colorear:

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

Se incluyen logos de muestra en la instalación de xfetch en `~/.config/xfetch/logos/`:

| Archivo | Descripción |
|---------|-------------|
| `arch.txt` | Logo ASCII azul de Arch Linux (7 líneas) |
| `x_logo.txt` | Forma de "X" con gradiente cian a verde (9 líneas) |
| `minimal.txt` | Una etiqueta simple `[ xfetch ]` (1 línea) |

### Logos de Imagen


#### Opciones del Logo ASCII

| Campo | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `logo_color` | `string` | ninguno | Color aplicado al logo ASCII. Acepta nombres (`"Cyan"`), índices 256-colores (`"196"`) y hex RGB (`"#FF0000"`). También aplica a logos animados; las líneas que ya contienen códigos ANSI no se modifican. |
| `logo_padding` | `number` | `0` | Espacios a la izquierda agregados antes del logo (y sus fotogramas si está animado). |
| `logo_type` | `string` | `"auto"` | `"auto"` detecta por extensión de archivo, `"ascii"` fuerza renderizado de texto, `"image"` fuerza renderizado de imagen. |

```jsonc
{
    "ascii": "~/.config/xfetch/logos/arch.txt",
    "logo_color": "#00FF87",
    "logo_padding": 2
}
```


xfetch puede renderizar imágenes PNG, JPG y SVG como logos usando la librería `viuer`. Esto requiere soporte de terminal para visualización de imágenes (iTerm2, Kitty o terminales compatibles con Sixel):

```jsonc
{
    "logo_path": "~/.config/xfetch/logos/my-logo.png"
}
```

El renderizado de imágenes usa el protocolo nativo de imagen de la terminal:

- **iTerm2:** protocolo de imagen inline
- **Kitty:** protocolo nativo de imagen de Kitty (alta resolución)
- **Sixel:** gráficos Sixel (terminales compatibles como xterm, mlterm)

Si la terminal no soporta visualización de imágenes, xfetch usa ASCII como fallback.

#### Tamaño y Posicionamiento de Imágenes

Controle las dimensiones de la imagen y el espaciado con estos campos:

```jsonc
{
    "logo_path": "~/.config/xfetch/images/mi-imagen.png",
    "logo_width": 30,
    "logo_height": null,
    "logo_gap": 5
}
```

| Campo | Predeterminado | Descripción |
|-------|----------------|-------------|
| `logo_width` | Auto (28% del ancho de terminal, clamp 12–42 cols) | Ancho de imagen en columnas de terminal |
| `logo_height` | Auto (relación de aspecto preservada) | Altura de imagen en filas de terminal |
| `logo_gap` | 12 | Espacio en columnas entre la imagen y el texto de información |

El cálculo automático del ancho escala con su terminal: terminales más anchos obtienen imágenes proporcionalmente más grandes.

#### Campos del Logo ASCII

| Campo | Predeterminado | Descripción |
|-------|----------------|-------------|
| `logo_color` | none | Color para logos ASCII (nombre, hex o RGB) |
| `logo_colors` | Auto | Colores por fila para logos ASCII (array; `la fila i` usa `logo_colors[i % len]`) |
| `logo_padding` | 0 | Relleno alrededor del logo |
| `logo_type` | Auto | Tipo de logo: `auto`, `ascii` o `image` |

#### Renderizado de Imágenes en Kitty

En terminales Kitty, xfetch soporta dos modos de renderizado controlados por `logo_kitty`:

```jsonc
{
    "logo_kitty": true
}
```

| Valor | Modo | Descripción |
|-------|------|-------------|
| `true` (predeterminado) | Protocolo nativo | Imágenes de resolución completa usando el protocolo gráfico `\x1b_G` de Kitty. Mejor calidad. |
| `false` | Half-block | Imágenes renderizadas con caracteres Unicode half-block (`▄`). Menor resolución vertical pero totalmente compatible con todas las funciones de la terminal. |

Establezca `logo_kitty: false` si experimenta problemas de layout con el renderizado nativo de Kitty (como superposición de texto o desalineación). El fallback half-block garantiza un layout lado a lado correcto a costa de algo de fidelidad de imagen.

## Animación de Logo

Los logos ASCII se pueden animar usando el plugin `animate-logo`. Los estilos de animación transforman el logo con efectos de color a lo largo del tiempo.

### Configuración

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

### Estilos de Animación

| Estilo | Descripción |
|--------|-------------|
| `sweep` | Los colores barren de izquierda a derecha usando una paleta ANSI de 6 colores (rojo, verde, amarillo, azul, magenta, cian) |
| `wave` | Un patrón de color de onda sinusoidal se mueve a través del logo |
| `rainbow` | Gradiente RGB completo que cambia sobre el logo usando color interpolado de 24 bits |
| `sparkle` | Caracteres aleatorios se iluminan brevemente en colores brillantes |
| `breathing` | Todos los caracteres pulsan en tonos ámbar cálidos (brillo basado en seno) |
| `frame` | Cicla a través de conjuntos de fotogramas ASCII precargados desde un archivo |
| `none` | Visualización estática, sin transformación de color |

### Animación Basada en Fotogramas

El estilo `frame` cicla a través de conjuntos de fotogramas ASCII predefinidos. Los conjuntos de fotogramas se cargan desde un archivo especificado en `frames_path`:

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

El formato del archivo de fotogramas usa `===` como separador entre conjuntos de fotogramas:

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

## Iconos

Cada módulo puede tener un icono personalizado. Los iconos se configuran en el objeto `icons` del archivo de configuración:

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
        "plugin:<nombre>": "\u25c8"
    }
}
```

Los iconos pueden ser:

- **Glifos Nerd Font:** Caracteres Unicode del conjunto de fuentes Nerd Fonts
- **Símbolos Unicode:** Caracteres Unicode estándar
- **Cadenas de texto:** Cualquier texto corto (ej., `">>"`, `"+"`, `"OS:"`)
- **Cadena vacía:** Para ocultar el icono por completo

### Iconos Predeterminados

Si no se especifican en la configuración, xfetch usa asignaciones de iconos internas predeterminadas para todos los módulos estándar.

## Colores

Los colores de los módulos se configuran en el objeto `colors`:

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

### Colores Disponibles

| Nombre | Código ANSI | Descripción |
|--------|-------------|-------------|
| `Black` | 30 | Negro estándar |
| `Red` | 31 | Rojo estándar |
| `Green` | 32 | Verde estándar |
| `Yellow` | 33 | Amarillo estándar |
| `Blue` | 34 | Azul estándar |
| `Magenta` | 35 | Magenta estándar |
| `Cyan` | 36 | Cian estándar |
| `White` | 37 | Blanco estándar |
| `Grey` / `Gray` | 90 | Negro brillante |

### Modos de Color

La salida de color se puede deshabilitar por completo:

```jsonc
{
    "show_colors": false
}
```


### Claves (Etiquetas)

Por defecto xfetch renderiza cada módulo como `icono valor`. Para mostrar también la etiqueta del módulo, active `show_keys`; use `key_width` para rellenar las etiquetas a una cantidad fija de columnas y que los valores queden alineados verticalmente.

| Campo | Tipo | Default | Descripción |
|-------|------|---------|-------------|
| `show_keys` | `boolean` | `false` | Renderiza `clave: valor` en los diseños con iconos (clásico, section, compact, custom-x, variantes box). |
| `key_width` | `number` | auto | Rellena la clave hasta esta cantidad de columnas antes del separador `:`. Aplica donde se muestren claves, incluyendo `section` y `minimal`. |

```jsonc
{
    "show_keys": true,
    "key_width": 12
}
```

Ejemplo con `show_keys` y `key_width: 12`:

```
cpu       : Apple M4 (10) @ 4.46 GHz
memory    : 10.88 GiB / 16.00 GiB (68%)
disk      : 152.80 GiB / 931.32 GiB (16%) - apfs
```

## Visualización de Paleta

El módulo `palette` renderiza una muestra de color ANSI. El estilo se controla mediante el campo `palette_style`:

```jsonc
{
    "palette_style": "squares"
}
```

### Estilos de Paleta

| Estilo | Vista Previa |
|--------|--------------|
| `squares` | Bloques de color de fondo rellenos |
| `circles` | Símbolos de círculo coloreados |
| `triangles` | Símbolos de triángulo coloreados |
| `lines` | Barras de color horizontales gruesas |
| `dots` | Símbolos de puntos pequeños |

La paleta muestra 8 colores que coinciden con la paleta ANSI estándar: Black, Red, Green, Yellow, Blue, Magenta, Cyan, White.

## Claves (Etiquetas)

Por defecto xfetch renderiza cada módulo como `icono valor`. Para mostrar también la etiqueta del módulo, habilite `show_keys`; use `key_width` para rellenar las etiquetas a un ancho fijo de columnas y alinear los valores verticalmente.

```jsonc
{
    "show_keys": true,
    "key_width": 12
}
```

## Renombrar Claves: `labels`

El mapa `labels` renombra la clave que se muestra para cualquier módulo, en todos los layouts (classic y variantes, compact, minimal, section, section-box, tree, custom-x). Un string vacío oculta la clave — la fila muestra solo `icono valor`. Los módulos sin entrada conservan su nombre.

```jsonc
{
    "labels": {
        "cpu": "procesador",
        "gpu": ""
    }
}
```

## Plantillas de Valor: `formats`

El mapa `formats` reemplaza el valor de un módulo con una plantilla. Los placeholders `{campo}` se sustituyen con los campos del módulo; los placeholders desconocidos se renderizan vacíos y `{{` / `}}` escapan llaves literales. Los módulos sin entrada conservan su salida predeterminada.

| Módulo | Campos | Ejemplo |
|--------|--------|---------|
| todos los módulos | `{value}` (salida actual), `{key}` (nombre del módulo) | `"os": "Sistema: {value}"` |
| `cpu` | `{brand}` (crudo), `{model}` (limpio), `{cores}`, `{freq}` | `"cpu": "{model} · {cores} núcleos · {freq}"` |
| `gpu` | `{name}`, `{vendor}`, `{model}`, `{vram}` | `"gpu": "{vendor} {model}"` |
| `memory`, `swap` | `{used}`, `{total}` (con unidad), `{percent}` | `"memory": "{used} / {total} ({percent}%)"` |
| `disk` | campos de memory más `{fs}` | `"disk": "{used} en {fs}"` |
| `os` | `{distro}`, `{version}`, `{arch}`, `{wsl}` | `"os": "{distro} {version} ({arch})"` |
| `packages` | un campo por gestor (`{pacman}`, `{aur}`, ...), más `{count}`, `{manager}`, `{managers}` | `"packages": "pkg: {pacman} · aur: {aur}"` |
| `battery` | `{percent}`, `{state}` | `"battery": "{percent}% [{state}]"` |
| `uptime` | `{days}`, `{hours}`, `{mins}` | `"uptime": "{days}d {hours}h {mins}m"` |
| `datetime` | `{date}`, `{time}` | `"datetime": "{date} | {time}"` |

Por ejemplo, `Intel(R) Core(TM) i5-7400 CPU @ 3.00GHz (4) @ 3.00 GHz` se convierte en `Intel Core i5-7400` con `{model}`, y `NVIDIA GeForce GTX 1060 6GB` en `NVIDIA GTX 1060` con `{vendor} {model}`.

```jsonc
{
    "formats": {
        "cpu": "{model} ({cores}) @ {freq}",
        "gpu": "{vendor} {model}"
    }
}
```

## Configuraciones Predefinidas

xfetch incluye numerosas configuraciones predefinidas que demuestran diferentes estilos visuales.

### Predefinidos de Muestra (23 ejemplos)

Ubicados en `configs/xfetch/presets/showcase/`, estos predefinidos demuestran varias combinaciones de iconos, colores y logos:

| Predefinido | Diseño | Características Clave |
|-------------|--------|-----------------------|
| `arch_compact_cyan.jsonc` | classic | Logo Arch, todo Cyan |
| `arch_full_blue.jsonc` | classic | Logo Arch, todo Blue |
| `green_chevrons_core.jsonc` | classic | Iconos `>>`, todo Green |
| `minimal_plus_monochrome.jsonc` | classic | Logo minimalista, iconos `+`, DarkGrey |
| `minimal_red_compact.jsonc` | classic | Iconos de texto como "OS:", todo Red |
| `monochrome_no_icons.jsonc` | classic | Sin iconos, todo White |
| `neon_hardware_compact.jsonc` | classic | Tema neón Cyan+Magenta |
| `rainbow_letters.jsonc` | classic | Iconos R-O-Y-G-B-I-V, colores arcoíris |
| `x_logo_full_system.jsonc` | classic | Logo X, coloreado arcoíris |
| `x_logo_red_hardware.jsonc` | classic | Logo X, iconos de punto, todo Red |
| `pacman_full_white.jsonc` | pacman | Logo X, mayormente White |
| `pacman_system_compact.jsonc` | pacman | 3 módulos, Cyan |
| `pacman_abc_shell.jsonc` | pacman | Cabecera A-B-C |
| `pacman_minus_uptime.jsonc` | pacman | Cabecera de signo menos |
| `pacman_numeric_hardware.jsonc` | pacman | Cabecera 1-2-3 |
| `pacman_plus_os.jsonc` | pacman | Cabecera de signo más |
| `pacman_question_packages.jsonc` | pacman | Cabecera de signo de interrogación |
| `pacman_star_uptime.jsonc` | pacman | Cabecera de estrella |
| `pacman_symbols_portable.jsonc` | pacman | Cabecera !-@-# |
| `pacman_xox_kernel.jsonc` | pacman | Cabecera X-O-X |
| `pacman_palette_dots.jsonc` | pacman | Estilo de paleta dots |
| `pacman_palette_lines.jsonc` | pacman | Estilo de paleta lines |
| `pacman_palette_triangles.jsonc` | pacman | Estilo de paleta triangles |

### Predefinidos de Diseño (6 ejemplos)

Ubicados en `configs/xfetch/presets/layouts/`:

| Predefinido | Diseño | Notas |
|-------------|--------|-------|
| `layout_box_full.jsonc` | box | Conjunto completo de módulos con separadores sep |
| `layout_dots_full.jsonc` | dots | Grupos de módulos coloreados |
| `layout_pacman_full.jsonc` | pacman | Iconos Pac-Man y pie "GAME OVER" |
| `layout_section.jsonc` | section | Tres grupos: Hardware, Software, Session |
| `layout_side_block.jsonc` | side-block | Etiquetas de texto como iconos |
| `layout_tree.jsonc` | tree | Grupos anidados OS/DE/PC |

### Uso de Predefinidos

```bash
# Ejecutar con un predefinido específico
xfetch --config /path/to/presets/showcase/arch_compact_cyan.jsonc
```

O copie un predefinido para usarlo como predeterminado:

```bash
cp configs/xfetch/presets/showcase/neon_hardware_compact.jsonc ~/.config/xfetch/config.jsonc
```
