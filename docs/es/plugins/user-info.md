# user-info

Muestra información de la cuenta de usuario.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-user-info`
- **Dependencias:** `id`, `getent`, `groups`, `whoami`

## Configuración

```jsonc
{
    "info_plugins": [{
        "plugin": "user-info",
        "args": { "show_groups": true }
    }],
    "modules": ["plugin:user-info"]
}
```

## Argumentos

| Campo | Requerido | Por Defecto | Descripción |
|-------|-----------|-------------|-------------|
| `show_groups` | No | `false` | Mostrar membresías de grupos (máx. 10) |

## Salida

| # | Línea |
|---|-------|
| 1 | ` Nombre Completo (usuario)` |
| 2 | `   uid: N  gid: N` |
| 3 | `   /home/usuario` |
| 4 | `   shell` |
| 5 (si hay grupos) | `   grupos: wheel, users, docker` |
