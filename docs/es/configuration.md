# Configuración

xfetch utiliza un archivo de configuración JSONC (JSON con comentarios). La ubicación predeterminada es `~/.config/xfetch/config.jsonc`. Puede generar una configuración predeterminada con `xfetch --gen-config` o usar una ruta personalizada con `xfetch --config <ruta>`.

## Formato del Archivo de Configuración

JSONC extiende JSON estándar permitiendo comentarios de estilo C (`//`) y C++ (`/* */`) y comas finales en objetos y arrays.

## Referencia Completa de Configuración

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

## Referencia de Campos

### Campos de Primer Nivel

| Campo | Tipo | Predeterminado | Descripción |
|-------|------|----------------|-------------|
| `layout` | `string` o `null` | `null` (clásico) | Nombre del estilo de diseño |
| `modules` | `array` | (ver abajo) | Lista ordenada de módulos o grupos de módulos |
| `show_colors` | `boolean` | `true` | Habilitar salida de color ANSI |
| `icons` | `object` | (valores internos predeterminados) | Asignaciones de iconos por módulo |
| `colors` | `object` | (valores internos predeterminados) | Asignaciones de colores por módulo |
| `palette_style` | `string` | `"squares"` | Estilo de visualización de la paleta |
| `logo_path` | `string` o `null` | `null` | Ruta a un archivo de logo personalizado |
| `ascii` | `string` o `null` | `null` | Ruta a un archivo de arte ASCII (alternativa a logo_path) |
| `header_icons` | `array` o `null` | `null` | Iconos para el borde superior (diseño Pac-Man) |
| `footer_text` | `string` o `null` | `null` | Texto para el borde inferior (diseño Pac-Man) |
| `disable_ip_fetching` | `boolean` | `false` | Deshabilitar la obtención de IP pública por privacidad |
| `disable_cache` | `boolean` | `false` | Deshabilitar el almacenamiento en caché de datos |
| `logo_animation` | `object` o `null` | `null` | Configuración de animación del logo |
| `info_plugins` | `array` | `[]` | Lista de plugins de información a ejecutar |

### Módulos Predeterminados

Cuando no se especifican módulos, xfetch utiliza:

```
["os", "kernel", "uptime", "packages", "wm", "shell", "disk", "cpu", "gpu", "memory", "battery"]
```

### Grupos de Módulos

Los módulos se pueden organizar en grupos con título para los diseños `section`, `tree` y `side-block`:

```jsonc
{
    "type": "group",
    "title": "Hardware",
    "modules": ["cpu", "gpu", "memory"]
}
```

Los grupos se pueden anidar:

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

### Iconos

Los iconos asignan nombres de módulos a cadenas de visualización. Los glifos Nerd Font se usan comúnmente, pero cualquier cadena Unicode o de texto funciona.

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
        "plugin:<nombre>": "\uf271"
    }
}
```

Las claves de módulo con el prefijo `plugin:` (ej., `plugin:docker`) se usan para información proporcionada por plugins.

### Colores

Los colores asignan nombres de módulos a nombres de colores ANSI:

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

**Nombres de colores disponibles:**

| Nombre | Código ANSI |
|--------|-------------|
| `Black` | 30 |
| `Red` | 31 |
| `Green` | 32 |
| `Yellow` | 33 |
| `Blue` | 34 |
| `Magenta` | 35 |
| `Cyan` | 36 |
| `White` | 37 |
| `Grey` o `Gray` | 90 |

### Estilos de Paleta

El módulo `palette` muestra una muestra de color. Estilos disponibles:

| Estilo | Descripción |
|--------|-------------|
| `"squares"` | Bloques de color de fondo (predeterminado) |
| `"circles"` | Círculos de color de primer plano |
| `"triangles"` | Triángulos de color de primer plano |
| `"lines"` | Barras de color horizontales gruesas |
| `"dots"` | Puntos pequeños de color de primer plano |

### Configuración de Animación

El campo `logo_animation` habilita la animación del logo ASCII mediante un plugin:

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

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `plugin` | `string` | Nombre del plugin (ej., `"animate-logo"`) |
| `fps` | `number` | Fotogramas por segundo (1-60) |
| `duration_ms` | `number` | Duración total de la animación en milisegundos |
| `loop` | `boolean` | Si se debe repetir la animación en bucle |
| `style` | `string` | Estilo de animación: `"sweep"`, `"wave"`, `"rainbow"`, `"sparkle"`, `"breathing"`, `"frame"`, `"none"` |
| `frames_path` | `string` | Ruta a conjuntos de fotogramas preconstruidos (para estilo `"frame"`). Varios conjuntos separados por `\n===\n` |

### Integración de Plugins

Los plugins de información se configuran en el array `info_plugins`:

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

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `plugin` | `string` | Nombre del plugin (instalado como `xfetch-plugin-<nombre>`) |
| `args` | `object` o `null` | Argumentos JSON arbitrarios pasados al plugin |

Los datos de plugins se acceden mediante claves de módulo con el prefijo `plugin:`:

```jsonc
{
    "modules": ["os", "kernel", "plugin:github-stats", "plugin:docker"]
}
```

## Ubicaciones del Archivo de Configuración por Plataforma

| Plataforma | Ruta de Configuración Predeterminada |
|------------|--------------------------------------|
| Linux | `~/.config/xfetch/config.jsonc` |
| macOS | `~/Library/Application Support/xfetch/config.jsonc` |
| Windows | `%APPDATA%\xfetch\config.jsonc` |
