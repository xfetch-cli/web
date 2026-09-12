# wasm-night-mode

Desactiva los colores fuera de la ventana diurna (proveedor de config WebAssembly).

- **Tipo:** `config_provider`
- **Artefacto:** `xfetch-extension-wasm-night-mode.wasm` (core module)
- **Capacidades:** none (reads the WASI clock)
- **Lenguaje:** Rust

## Instalacion

```bash
xfetch extension install ./extensions/wasm-night-mode
```

## Configuracion

```jsonc
{
    "config_providers": [
        {
            "extension": "wasm-night-mode",
            "args": {}
        }
    ]
}
```

## Argumentos

| Campo | Tipo | Por defecto | Descripcion |
|-------|------|---------|-------------|
| `night_start` | number | `22` | Primera hora (incluida) de la ventana nocturna. |
| `night_end` | number | `7` | Primera hora de la ventana diurna; puede cruzar medianoche. |
| `utc_offset` | number | `0` | Horas desde UTC, en lugar de una base de zonas horarias. |
| `dim_colors` | bool | `true` | Pone `show_colors: false` de noche. |
| `night_palette` | string | unchanged | Estilo de paleta opcional aplicado de noche. |

## Comportamiento

De dia la config se devuelve sin cambios; de noche se apagan los colores (y se cambia la paleta si se configura).
