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
| `logo_width` | `number` o `null` | `auto` (28% del ancho de la terminal, limitado 12-42) | Ancho máximo para logos de imagen (en columnas de terminal, auto-calculado si no se establece) |
| `logo_height` | `number` o `null` | `null` | Altura máxima para logos de imagen (en filas de terminal) |
| `logo_gap` | `number` o `null` | `12` | Espacio entre el logo/imagen y el texto de información (en columnas) |
| `logo_kitty` | `boolean` o `null` | `true` (en Kitty) | Usar protocolo nativo de Kitty (`true`) o renderizado half-block (`false`). Half-block da menor resolución pero evita problemas de layout |
| `header_icons` | `array` o `null` | `null` | Iconos para el borde superior (diseño Pac-Man) |
| `footer_text` | `string` o `null` | `null` | Texto para el borde inferior (diseño Pac-Man) |
| `disable_ip_fetching` | `boolean` | `false` | Deshabilitar la obtención de IP pública por privacidad |
| `disable_cache` | `boolean` | `false` | Deshabilitar el almacenamiento en caché de datos |
| `logo_animation` | `object` o `null` | `null` | Configuración de animación del logo |
| `info_plugins` | `array` | `[]` | Lista de plugins de información a ejecutar |
| `config_providers` | `array` | `[]` | Lista de extensiones proveedoras de configuración a ejecutar después de la fusión del tema |
| `theme` | `string` o `null` | `null` | Nombre del tema a aplicar (solo campos visuales) |
| `daemon` | `boolean` | `false` | Ejecutar en modo daemon animado (fija el fetch en la parte superior de la terminal) |
| `daemon_min_rows` | `number` | `6` | Filas mínimas de terminal requeridas para el daemon animado |
| `daemon_live` | `boolean` | `false` | Fijar un bloque de estadísticas en vivo en la parte superior de la terminal, re-consultando módulos periódicamente |
| `daemon_live_refresh` | `number` o `null` | (por plataforma) | Intervalo de actualización del daemon en vivo en segundos |
| `daemon_live_modules` | `array` o `null` | (por plataforma) | Módulos mostrados por el daemon en vivo |
| `daemon_live_reload` | `boolean` | `false` | Recarga en caliente de la configuración en modo daemon en vivo |
| `os_wsl_style` | `string` | `"minimal"` | Estilo de detección WSL: `off`, `minimal` o `full` |
| `logo_color` | `string` o `null` | `null` | Color para logos ASCII (nombre, hex o RGB) |
| `logo_colors` | `array` o `null` | `null` | Colores por fila para logos ASCII (`la fila i` usa `logo_colors[i % len]`) |
| `logo_padding` | `number` | `0` | Relleno alrededor del logo |
| `logo_type` | `string` | `"auto"` | Tipo de logo: `auto`, `ascii` o `image` |
| `show_keys` | `boolean` | `false` | Mostrar las etiquetas de módulo (`clave: valor`) |
| `key_width` | `number` | `auto` | Ancho fijo para las etiquetas de clave, alineando los valores |
| `custom_x` | `object` o `null` | `null` | Plantillas de borde para el diseño `custom-x` |
| `effects` | `object`, `array` o `null` | `null` | Efectos de introducción aplicados a las líneas de contenido |

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
| `DarkGrey` o `DarkGray` | 90 |
| `DarkRed` | 31 |
| `DarkGreen` | 32 |
| `DarkYellow` | 33 |
| `DarkBlue` | 34 |
| `DarkMagenta` | 35 |
| `DarkCyan` | 36 |

### Estilos de Paleta

El módulo `palette` muestra una muestra de color. Estilos disponibles:

| Estilo | Descripción |
|--------|-------------|
| `"squares"` | Bloques de color de fondo (predeterminado) |
| `"circles"` | Círculos de color de primer plano |
| `"triangles"` | Triángulos de color de primer plano |
| `"lines"` | Barras de color horizontales gruesas |
| `"dots"` | Símbolos de puntos pequeños |
| `"dots"` | Símbolos de puntos pequeños |

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
| `duration_ms` | `number` | Duración total de la animación en milisegundos (ignorado en modo daemon) |
| `loop` | `boolean` | Si se debe repetir la animación en bucle (ignorado en modo daemon) |
| `style` | `string` | Estilo de animación: `"sweep"`, `"wave"`, `"rainbow"`, `"sparkle"`, `"breathing"`, `"frame"`, `"none"` |
| `frames_path` | `string` | Ruta a conjuntos de fotogramas preconstruidos (para estilo `"frame"`). Varios conjuntos separados por `\n===\n` |
| `timeout_secs` | `number` | Tiempo de espera opcional para el plugin de animación en segundos |

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
| `timeout_secs` | `number` o `null` | Tiempo de espera opcional por plugin en segundos |

Los datos de plugins se acceden mediante claves de módulo con el prefijo `plugin:`:

```jsonc
{
    "modules": ["os", "kernel", "plugin:github-stats", "plugin:docker"]
}
```

### Proveedores de Configuración

El campo `config_providers` permite que extensiones a nivel de configuración modifiquen la configuración antes del renderizado. Las extensiones se ejecutan después de la fusión del tema, en orden de declaración:

```jsonc
{
    "config_providers": [
        {
            "extension": "config-roulette",
            "args": {
                "routes": "~/.config/xfetch/routes.json",
                "strategy": "random"
            }
        },
        {
            "extension": "layout-override",
            "args": {
                "layout": "tree"
            }
        }
    ]
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `extension` | `string` | Nombre de la extensión (binario: `xfetch-extension-<nombre>`) |
| `args` | `object` o `null` | Argumentos JSON arbitrarios pasados a la extensión |
| `timeout_secs` | `number` o `null` | Tiempo de espera opcional por extensión en segundos |

Las extensiones se comunican mediante stdin/stdout JSON, recibiendo la configuración completamente resuelta y devolviendo una versión modificada. Consulte [Extensiones](extensions) para más detalles.

## Ubicaciones del Archivo de Configuración por Plataforma

| Plataforma | Ruta de Configuración Predeterminada |
|------------|--------------------------------------|
| Linux | `~/.config/xfetch/config.jsonc` |
| macOS | `~/Library/Application Support/xfetch/config.jsonc` |
| Windows | `%APPDATA%\xfetch\config.jsonc` |
