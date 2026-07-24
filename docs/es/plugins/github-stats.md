# github-stats

Obtiene estadísticas del perfil de usuario de GitHub.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-github-stats`
- **Dependencias:** `curl` en PATH
- **Llamadas API:** 4 solicitudes a api.github.com

## Configuración

```jsonc
{
    "info_plugins": [{
        "plugin": "github-stats",
        "args": {
            "username": "xscriptor",
            "token": "ghp_your_token_here",
            "max_lines": 3
        }
    }],
    "modules": ["plugin:github-stats"]
}
```

## Argumentos

| Campo | Requerido | Por Defecto | Descripción |
|-------|-----------|-------------|-------------|
| `username` | Sí (o variable `GITHUB_USER`) | — | Nombre de usuario de GitHub |
| `token` | No | — | Token de acceso personal (5000 req/h vs 60 req/h sin autenticar) |
| `max_lines` | No | las 7 | Limita la salida a las primeras N líneas (1–7) |

## Salida

| # | Línea |
|---|-------|
| 1 | ` Nombre (@usuario)` |
| 2 | ` N estrellas` |
| 3 | ` N repos` |
| 4 | ` N PRs` |
| 5 | ` N issues` |
| 6 | ` N seguidores` |
| 7 | ` N siguiendo` |
