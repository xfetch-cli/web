# wasm-lang-labels

Traduce las etiquetas de los modulos segun el idioma del sistema (componente Python).

- **Tipo:** `config_provider`
- **Artefacto:** `wasm-lang-labels.wasm` (component)
- **Capacidades:** `env: LANG, LC_ALL, LC_MESSAGES`
- **Lenguaje:** Python (componentize-py)

## Instalacion

```bash
xfetch extension install ./extensions/wasm-lang-labels
```

## Configuracion

```jsonc
{
    "config_providers": [
        {
            "extension": "wasm-lang-labels",
            "args": {}
        }
    ]
}
```

## Argumentos

| Campo | Tipo | Por defecto | Descripcion |
|-------|------|---------|-------------|
| `language` | string | from `LANG` | Sobrescribe la deteccion por entorno; incluye `es`, `en` y `de`. |

## Comportamiento

Rellena el mapa `labels` de los modulos conocidos sin pisar las etiquetas que ya personalizaste, incluidas las ocultas a proposito.
