# langs

Muestra los lenguajes de un repositorio de GitHub (o los agrega por usuario/org) con un glifo Nerd Font por lenguaje y, opcionalmente, su color de marca.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-langs`
- **Dependencias:** acceso a la API de GitHub; se recomienda un token

## Instalación

```bash
xfetch plugin install langs
```

## Configuración

Un repositorio:

```jsonc
{
    "info_plugins": [
        { "plugin": "langs", "args": { "repo": "xfetch-cli/xfetch" } }
    ],
    "modules": ["plugin:langs"]
}
```

O agrega el lenguaje primario de todos los repositorios de un usuario/org:

```jsonc
{
    "info_plugins": [
        { "plugin": "langs", "args": { "owner": "xfetch-cli", "limit": 4 } }
    ],
    "modules": ["plugin:langs"]
}
```

## Argumentos

| Campo | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `repo` | string | ninguno | Repositorio como `owner/name` o URL completa de GitHub; muestra el desglose exacto en bytes |
| `owner` | string | ninguno | Usuario u org; agrega el lenguaje primario de sus repositorios |
| `limit` | number | `5` | Cuántos lenguajes mostrar |
| `color` | boolean | `true` | Tiñe cada lenguaje con su color de marca (ANSI truecolor) |
| `include_forks` | boolean | `false` | Incluye forks al agregar un `owner` |
| `info` | boolean | `true` | Muestra metadatos del repositorio/owner |
| `token` | string | ninguno | Token de GitHub; también se lee de `GITHUB_TOKEN` o `GH_TOKEN` |

## Salida

```
 Rust 96.4%
 Python 2.1%
 Shell 1.1%

 Rust ×12 (60%)
 Python ×3 (15%)
 Shell ×2 (10%)
```

El modo repositorio también imprime metadatos primero: descripción, stars, forks, issues abiertas, licencia, tamaño, rama, actualización, topics y homepage, más `Archived`/`Private` cuando corresponde.

Sin token, GitHub permite 60 requests/hora y cada ejecución hace 2 llamadas; define `GITHUB_TOKEN`/`GH_TOKEN` para uso regular. Si un layout mide anchos y el tinte desalinea, usa `"color": false`.
