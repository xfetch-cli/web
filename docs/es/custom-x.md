# Diseño Custom-X

`custom-x` es el diseño más flexible de xfetch: cada línea de borde es una **plantilla literal** que escribís en el objeto `custom_x` de la config. Vos decidís los caracteres, el tamaño, los separadores internos, y podés agregar líneas extra — nada está hardcodeado.

## Activación

```jsonc
{
    "layout": "custom-x",
    "custom_x": {
        // ... tus plantillas ...
    }
}
```

## Plantillas y Placeholders

Todas las líneas de borde son strings (plantillas) que soportan dos placeholders:

- `{fill}` — repite el carácter de `fill` hasta que la línea alcanza el ancho de la caja. Las plantillas *sin* `{fill}` se extienden con el carácter `fill` al final; las plantillas *más largas* que el contenido definen el ancho de la caja.
- `{title}` — se reemplaza con el título del grupo actual (en las plantillas `group_title` y `top`).

## Opciones

| Opción | Default | Descripción |
|--------|---------|-------------|
| `top` | `╭─ {title}{fill}╮` | Plantilla del borde superior. String vacío lo desactiva. |
| `bottom` | `╰{fill}╯` | Plantilla del borde inferior. String vacío lo desactiva. |
| `left` | `│` | Prefijo de cada fila de contenido (puede ser de varios caracteres). |
| `right` | `│` | Sufijo de cada fila de contenido. |
| `fill` | `─` | Carácter usado por `{fill}` y para extender plantillas cortas. |
| `padding` | `1` | Espacios entre los bordes laterales y el contenido. |
| `width` | `"auto"` | `"auto"` ajusta la caja al contenido; `"full"` la estira hasta el final de la línea de la terminal (descontando la columna del logo, menos `full_margin`); un número fija un ancho en columnas. |
| `full_margin` | `2` | Celdas libres al borde derecho con `width: "full"` (evita la columna de wrap de la terminal). |
| `group_title` | `── {title} ──` | Plantilla renderizada cuando arranca un grupo de módulos. String vacío oculta los títulos. |
| `divider` | (off) | Plantilla renderizada como separador interno. String vacío lo desactiva. |
| `divider_between` | `"groups"` | Dónde aparecen los divisores: `"groups"` (entre grupos), `"modules"` (también entre cada módulo dentro de los grupos) o `"none"`. |
| `module_top` | (off) | Plantilla renderizada encima de cada fila de módulo — envuelve cada módulo en su propia caja. |
| `module_bottom` | (off) | Plantilla renderizada debajo de cada fila de módulo. |
| `header_lines` | `[]` | Líneas extra literales renderizadas después del borde superior (se permiten plantillas con placeholders). |
| `footer_lines` | `[]` | Líneas extra literales renderizadas antes del borde inferior. |

## Ejemplo

Todo dentro de un marco grande, cada título de grupo encuadrado y cada módulo envuelto en su propia caja:

```jsonc
{
    "layout": "custom-x",
    "custom_x": {
        "top": "╔═══════ XFETCH ═══════{fill}╗",
        "bottom": "╚══════════════════════{fill}╝",
        "left": "║",
        "right": "║",
        "fill": "═",
        "padding": 1,
        "width": "full",
        "full_margin": 2,
        "group_title": "╭─── {title} ───{fill}╮",
        "module_top": "╠{fill}╣",
        "module_bottom": "╠{fill}╣",
        "divider_between": "none"
    },
    "modules": [
        { "type": "group", "title": "Hardware", "modules": ["cpu", "gpu"] },
        { "type": "group", "title": "Software", "modules": ["os", "kernel"] }
    ]
}
```

**Resultado:**

```
╔═══════ XFETCH ═════════════════════════╗
╭─── Hardware ───════════════════════════╮
╠════════════════════════════════════════╣
║  cpu Apple M4 (10) @ 4.46 GHz         ║
╠════════════════════════════════════════╣
║  gpu Apple M4                          ║
╠════════════════════════════════════════╣
╭─── Software ───════════════════════════╮
╠════════════════════════════════════════╣
║  os Darwin 26.5.2 aarch64              ║
╚════════════════════════════════════════╝
```

## Ejemplo Estilo Sección (sin cajas)

Encabezados de grupo tipo `hardware──────` con separadores `────` entre grupos, sin marco exterior:

```jsonc
{
    "layout": "custom-x",
    "custom_x": {
        "top": "",
        "bottom": "",
        "left": "",
        "right": "",
        "fill": "─",
        "padding": 0,
        "group_title": "{title}{fill}",
        "divider": "{fill}",
        "divider_between": "groups"
    }
}
```

## Notas

- Las plantillas vacías (`""`) se omiten por completo — no se generan líneas en blanco.
- Con `width: "full"`, se aplica el fallback de terminales pequeñas de forma consistente con los diseños clásicos.
- Los grupos anidados se renderizan recursivamente (líneas de título y filas de módulo dentro del padre).
- El ancho de la caja es siempre al menos la línea de plantilla/contenido más ancha; las filas más cortas se rellenan dentro del borde derecho.

Ver también: [Diseños](layouts.md).
