# theme-manager

Navega, busca e instala temas desde un registro remoto o local.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-theme-manager`
- **Dependencias:** `curl` en PATH (para registros remotos)
- **Registro predeterminado:** `https://raw.githubusercontent.com/xfetch-cli/configs/main/themes/index.json`

## Configuración

```jsonc
{
    "info_plugins": [{
        "plugin": "theme-manager",
        "args": {
            "action": "list",
            "name": "dracula",
            "query": "dark",
            "registry": "https://example.com/themes.json"
        }
    }]
}
```

## Argumentos

| Campo | Requerido | Por Defecto | Descripción |
|-------|-----------|-------------|-------------|
| `action` | No | `"list"` | `list`, `search`, `info` o `install` |
| `name` | Para `info`/`install` | — | Nombre del tema |
| `query` | Para `search` | — | Término de búsqueda (coincide con nombre, descripción, autor, etiquetas) |
| `registry` | No | xfetch-cli/configs | URL del registro (HTTP o ruta local con `/` o `~`) |

## Acciones

| Acción | Descripción |
|--------|-------------|
| `list` | Lista todos los temas disponibles del registro |
| `search` | Filtra los temas que coinciden con la consulta |
| `info` | Muestra información detallada sobre un tema específico |
| `install` | Descarga un tema a `~/.config/xfetch/themes/<nombre>.jsonc` |

Después de instalar un tema, actívalo con `xfetch theme set <nombre>` o añade `"theme": "<nombre>"` a tu `config.jsonc`.
