# Plugin Theme Manager

El plugin theme-manager permite navegar, buscar, inspeccionar e instalar temas de xfetch desde el registro remoto de temas.

## Descripcion general

A diferencia de otros plugins info que muestran datos del sistema, theme-manager interactua con el registro de temas en `github.com/xfetch-cli/configs` para descubrir y descargar archivos de tema.

| Propiedad | Valor |
|-----------|-------|
| Tipo | `info_provider` |
| Binario | `xfetch-plugin-theme-manager` |
| Dependencias | CLI `curl` (para el registro remoto) |

## Instalacion

```bash
xfetch plugin install theme-manager
```

## Acciones

El comportamiento del plugin se controla mediante el campo `action` en los argumentos del plugin.

### list (predeterminado)

Muestra todos los temas disponibles del registro:

```jsonc
{
    "info_plugins": [
        { "plugin": "theme-manager" }
    ],
    "modules": ["plugin:theme-manager"]
}
```

### search

Filtra temas por nombre, descripcion, autor o etiquetas:

```jsonc
{
    "info_plugins": [
        {
            "plugin": "theme-manager",
            "args": {
                "action": "search",
                "query": "dark"
            }
        }
    ],
    "modules": ["plugin:theme-manager"]
}
```

### info

Muestra informacion detallada sobre un tema especifico:

```jsonc
{
    "info_plugins": [
        {
            "plugin": "theme-manager",
            "args": {
                "action": "info",
                "name": "dracula"
            }
        }
    ],
    "modules": ["plugin:theme-manager"]
}
```

### install

Descarga un archivo de tema desde el registro y lo guarda en `~/.config/xfetch/themes/<nombre>.jsonc`:

```jsonc
{
    "info_plugins": [
        {
            "plugin": "theme-manager",
            "args": {
                "action": "install",
                "name": "dracula"
            }
        }
    ],
    "modules": ["plugin:theme-manager"]
}
```

Despues de la instalacion, active el tema con `xfetch theme set <nombre>` o anadiendo `"theme": "<nombre>"` a su `config.jsonc`.

## Argumentos

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `action` | `string` | No | Uno de `list` (predeterminado), `search`, `info`, `install` |
| `name` | `string` | Para `info` y `install` | Identificador del tema (ej., `dracula`, `nord`) |
| `query` | `string` | Para `search` | Termino de busqueda que coincide con nombre, descripcion, autor o etiquetas |
| `registry` | `string` | No | URL de registro personalizada o ruta de archivo local |

## Ejemplos de salida

### Salida de list

```
Theme Manager -- 6 themes available

  dracula  xscriptor  section  (#dark #dracula #popular)
       Dark magenta, red, and cyan palette inspired by the Dracula color scheme.

  nord  xscriptor  section  (#light #nord #arctic #minimal)
       Cool blue and arctic cyan palette based on the Nord color scheme.

  catppuccin-mocha  xscriptor  section  (#dark #catppuccin #mocha #pastel)
       Warm mocha pastel palette from the Catppuccin Mocha color scheme.

  retro-pacman  xscriptor  pacman  (#retro #pacman #arcade #game)
       Classic Pac-Man arcade style with game-inspired header icons.

  berlin  xscriptor  default  (#monochrome #minimal #no-icons #no-colors)
       Monochrome theme with no colors and no icons.

  tree-compact  xscriptor  tree  (#tree #hierarchical #compact #nested)
       Hierarchical tree layout with a cool blue-green color scheme.
```

### Salida de install

```
Theme 'dracula' installed successfully.
  Path: /home/user/.config/xfetch/themes/dracula.jsonc
  Author: xscriptor
  Layout: section

Activate with: xfetch theme set dracula
Or add to config.jsonc: "theme": "dracula"
```

## Registro

La URL del registro predeterminado es:

```
https://raw.githubusercontent.com/xfetch-cli/configs/main/themes/index.json
```

El registro es un archivo JSON que contiene metadatos de todos los temas disponibles. Cada entrada de tema incluye:

| Campo | Descripcion |
|-------|-------------|
| `name` | Identificador del tema usado en `"theme": "<nombre>"` |
| `author` | Creador del tema |
| `version` | Version semantica |
| `description` | Descripcion breve del tema |
| `layout` | Diseno predeterminado del tema |
| `palette_style` | Estilo de visualizacion de paleta predeterminado |
| `tags` | Palabras clave para busqueda |
| `source` | URL para descargar el archivo JSONC del tema |

## Registro personalizado

Puede usar un registro autogestionado o local:

```jsonc
{
    "plugin": "theme-manager",
    "args": {
        "registry": "/home/user/my-themes/index.json"
    }
}
```

Las rutas locales (que comienzan con `/` o `~`) se leen directamente del sistema de archivos. Las URL remotas se obtienen mediante `curl`.

## Como funciona

1. xfetch envia una solicitud JSON con `kind: "info_provider"` y los argumentos configurados.
2. El plugin lee el archivo de registro (ruta local o URL remota mediante `curl`).
3. Segun el campo `action`, el plugin filtra o muestra informacion del tema.
4. Para `install`, el archivo JSONC del tema se descarga y guarda en el directorio de temas.
5. El plugin devuelve las lineas formateadas como una respuesta JSON.
6. xfetch las muestra bajo la clave de modulo `plugin:theme-manager`.

## Notas

- Requiere `curl` para acceder al registro remoto. Las rutas de archivo locales funcionan sin curl.
- Se necesita conectividad de red para operaciones con el registro remoto.
- El argumento `registry` permite apuntar a un registro personalizado o reflejado.
- Despues de instalar un tema, activelo usando el comando principal `xfetch theme set` o editando `config.jsonc` directamente.
