# wasm-updates-footer

Anade el numero de actualizaciones pendientes al footer (proveedor de config WebAssembly).

- **Tipo:** `config_provider`
- **Artefacto:** `wasm-updates-footer.wasm` (core module)
- **Capacidades:** `exec: checkupdates, pacman`
- **Lenguaje:** Go (wasip1)

## Instalacion

```bash
xfetch extension install ./extensions/wasm-updates-footer
```

## Configuracion

```jsonc
{
    "config_providers": [
        {
            "extension": "wasm-updates-footer",
            "args": {}
        }
    ]
}
```

## Argumentos

| Campo | Tipo | Por defecto | Descripcion |
|-------|------|---------|-------------|
| `program` | string | `checkupdates` | Programa permitido; usa `pacman -Qu` si no existe. |
| `args` | string[] | `[]` | Argumentos pasados tal cual al programa. |
| `prefix` | string | ` · ` | Separador anadido antes del conteo. |
| `up_to_date` | string | `up to date` | Etiqueta cuando no hay actualizaciones. |

## Comportamiento

Escribe `12 updates` o `up to date` tras el footer configurado; los fallos son silenciosos y el conteo nunca se duplica.
