# banner-text

Emite una o más líneas de texto desde un archivo o un argumento literal como proveedor de información. Está pensado para leyendas y banners debajo de la columna de estadísticas y funciona tanto con logos ASCII como de imagen.

A diferencia del plugin `banner` (logo-animation), que se omite cuando xfetch renderiza un logo de imagen, `banner-text` se ejecuta como info provider y se renderiza donde aparezca su clave de módulo en `modules`.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-banner-text`
- **Dependencias:** ninguna

## Instalación

```bash
xfetch plugin install banner-text
```

## Configuración

```jsonc
{
    "info_plugins": [
        {
            "plugin": "banner-text",
            "args": {
                "path": "~/.config/xfetch/banners/cyberpunk.txt",
                "blank_line": true
            }
        }
    ],
    "modules": ["os", "kernel", "shell", "plugin:banner-text"],
    "icons": { "plugin:banner-text": "" },
    "labels": { "plugin:banner-text": "" }
}
```

Coloca `plugin:banner-text` al final de `modules` para renderizar el texto debajo de las estadísticas. Las entradas vacías en `icons` y `labels` ocultan la clave de módulo sintética; son opcionales pero recomendadas.

## Argumentos

| Campo | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `path` | string | ninguno | Ruta a un archivo de texto UTF-8. `~` y `~/` se expanden al directorio home |
| `text` | string | ninguno | Texto literal usado cuando `path` falta, no se puede leer o está vacío |
| `blank_line` | boolean | `true` | Antepone una línea vacía al texto |

Si `path` y `text` están vacíos, el plugin no devuelve líneas. Cada línea se emite por separado; se eliminan espacios finales y líneas vacías al inicio/final, mientras que los espacios iniciales de líneas no vacías se conservan.

## Salida

Dado un archivo con `永遠は朽ち、儚さが記憶を刻む`, el plugin devuelve:

```json
{
  "lines": ["", "永遠は朽ち、儚さが記憶を刻む"]
}
```

Para colorear el texto, define `colors` en la configuración o en un tema:

```jsonc
{
    "colors": {
        "plugin:banner-text": "#bd00ff"
    }
}
```

## Plataforma

Linux, macOS y Windows. El plugin usa solo la biblioteca estándar de Rust para acceder a archivos y expandir el home.
