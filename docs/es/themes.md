# Temas

El sistema de temas separa la apariencia visual (colores, iconos, diseño) de la configuración de módulos, permitiendo cambiar el aspecto sin tocar la configuración de los módulos.

## Arquitectura

Los temas operan en la capa de carga de configuración, antes de que ocurra cualquier renderizado o ejecución de plugins.

```
config.jsonc (theme: "berlin", modules: [...])
       |
       v
   Cargar Config por defecto
       |
       v
   Cargar config.jsonc del usuario
       |
       v
   Cargar theme/<name>.jsonc
       |
       v
   Fusión: defaults <- config.jsonc <- theme
       |
       v
   Config final (usada por el renderizador)
```

## Orden de fusión (el último prevalece)

Cada capa puede sobrescribir cualquier campo visual. Desde **v0.2.0**, el tema tiene la prioridad más alta:

| Capa | Fuente | Contiene |
|-------|--------|----------|
| 1. Valores por defecto | Hardcodeados en `config.rs` | Iconos, colores y diseño por defecto |
| 2. Config del usuario | `config.jsonc` | `modules`, `info_plugins`, más sobrescrituras para cualquier campo visual |
| 3. Archivo de tema | `themes/<name>.jsonc` | `colors`, `icons`, `layout`, `palette_style`, `logo_path`, `header_icons`, `footer_text`, `show_colors` |

Un campo en el **archivo de tema** siempre prevalece sobre el mismo campo en `config.jsonc` o los valores por defecto.

### Detalles de la fusión

La fusión usa `deep_merge()` que trabaja clave por clave:

- **Objetos:** se fusionan recursivamente — cada clave se resuelve independientemente
- **Strings, números, booleanos:** el overlay reemplaza la base
- **Strings vacíos:** un string vacío *no* sobrescribe un string no vacío (evita que los temas borren iconos accidentalmente)
- **Objetos vacíos `{}`:** no operan — las claves existentes se conservan

> **Nota de actualización (v0.1.x → v0.2.0):** En v0.1.x, `config.jsonc` ganaba sobre el tema.
> Si actualizas, tu config existente puede sobrescribir el tema. Exporta tu aspecto actual con
> `xfetch theme export my-look`, establece `"theme": "my-look"`, y elimina los campos visuales de `config.jsonc`.

## Formato del archivo de tema

Un archivo de tema es un documento JSONC que contiene únicamente campos visuales. No debe contener `modules` ni `info_plugins`.

```jsonc
{
    "layout": "section",
    "show_colors": true,
    "palette_style": "circles",
    "colors": {
        "os": "Magenta",
        "cpu": "Red",
        "memory": "Yellow",
        "disk": "Cyan",
        "shell": "Green",
        "wm": "Blue"
    },
    "icons": {
        "os": "\uf17c",
        "cpu": "\uf2db",
        "memory": "\ue266",
        "disk": "\uf0a0",
        "shell": "\uf0e7",
        "wm": "\uf08e"
    }
}
```

### Campos admitidos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `layout` | `string` o `null` | Nombre del estilo de diseño |
| `colors` | `object` | Mapeo de colores por módulo |
| `icons` | `object` | Mapeo de iconos por módulo |
| `palette_style` | `string` o `null` | Visualización de paleta: `squares`, `circles`, `triangles`, `lines`, `dots` |
| `show_colors` | `boolean` | Activar o desactivar indicadores de color ANSI en línea |
| `logo_path` | `string` o `null` | Ruta a un archivo de logo |
| `header_icons` | `array` o `null` | Iconos de cabecera del diseño Pac-Man |
| `footer_text` | `string` o `null` | Texto de pie del diseño Pac-Man |

## Resolución de temas

Cuando xfetch carga una configuración con `theme: "dracula"`, el resolvedor busca en el siguiente orden:

1. **Ruta directa** — Si el valor es una ruta de archivo (contiene `/` o empieza con `~`), se carga directamente
2. **Directorio de temas** — Busca `<name>.jsonc` en `~/.config/xfetch/themes/`

Si el tema no se encuentra, la configuración se carga tal cual sin el tema.

## Comandos CLI

```bash
# Listar temas instalados
xfetch theme list

# Activar un tema (establece el campo "theme" en config.jsonc)
xfetch theme set nord

# Eliminar un archivo de tema
xfetch theme remove nord

# Exportar la configuración visual actual como archivo de tema
xfetch theme export my-theme
```

### Comportamiento de exportación

`xfetch theme export <name>` captura el estado visual actual en tiempo de ejecución (después de la fusión) y lo escribe en `~/.config/xfetch/themes/<name>.jsonc`. Esto permite compartir tu aspecto sin exponer tu lista de módulos.

El archivo exportado contiene únicamente:
- `layout`
- `colors`
- `icons`
- `palette_style`
- `header_icons`
- `footer_text`
- `logo_path`
- `show_colors`

## Compatibilidad hacia atrás

El sistema de temas es completamente compatible hacia atrás:

- **Sin el campo `theme`:** Todo funciona exactamente como antes. El archivo de configuración contiene todos los campos visuales directamente.
- **Configs existentes:** Se pueden migrar exportando: `xfetch theme export current`, luego estableciendo `"theme": "current"` y eliminando los campos visuales de la configuración principal.
- **Configs de plugins:** Las referencias a plugins (`info_plugins`) permanecen exclusivamente en `config.jsonc`, nunca en archivos de tema.

## Estructura de directorios

```
~/.config/xfetch/
    config.jsonc            # Módulos, plugins y referencia opcional a tema
    themes/
        dracula.jsonc       # Archivos de tema: colores, iconos, diseño
        nord.jsonc
        catppuccin-mocha.jsonc
        retro-pacman.jsonc
        berlin.jsonc
        tree-compact.jsonc
```

## Temas incorporados

El repositorio oficial de temas se encuentra en `github.com/xfetch-cli/configs` bajo `themes/`:

| Tema | Diseño | Estilo |
|-------|--------|-------|
| `dracula` | section | Paleta magenta oscuro, rojo y cian |
| `nord` | section | Paleta azul frío y cian ártico |
| `catppuccin-mocha` | section | Paleta pastel cálida mocha |
| `retro-pacman` | pacman | Estilo arcade clásico de Pac-Man con iconos de cabecera y texto de pie |
| `berlin` | default | Monocromático: todo blanco, aspecto limpio y minimalista |
| `tree-compact` | tree | Diseño jerárquico en árbol |

## Detalles de implementación

### Carga de configuración (`config.rs`)

La fusión usa `serde_json::Value` con fusión profunda antes de la deserialización:

1. Analizar `config.jsonc` como `serde_json::Value`
2. Deserializar a `Config` para extraer el campo `theme`
3. Si `theme` está establecido, cargar el archivo de tema como `serde_json::Value`
4. Crear un `Value` vacío y fusionar en orden: defaults → config.jsonc → theme
5. Deserializar el resultado fusionado a `Config`

### Gestión de temas (`themes/mod.rs`)

- `list_themes()` — Escanea `~/.config/xfetch/themes/` en busca de archivos `*.jsonc`
- `set_active_theme()` — Lee `config.jsonc`, establece el campo `theme`, escribe de vuelta
- `remove_theme()` — Elimina un archivo de tema del directorio de temas
- `export_current_theme()` — Construye un archivo JSONC a partir de los campos visuales del Config actual
