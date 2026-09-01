# timezone

Muestra la hora actual, fecha e información de zona horaria.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-timezone`
- **Dependencias:** `date` (requerido), `timedatectl` (opcional)

## Configuración

```jsonc
{
    "info_plugins": [{ "plugin": "timezone" }],
    "modules": ["plugin:timezone"]
}
```

## Argumentos

| Campo | Requerido | Por Defecto | Descripción |
|-------|-----------|-------------|-------------|
| `format` | No | `%Z %z` | Cadena de formato de `date` para mostrar la zona horaria |

El argumento `format` se ignora en Windows (no hay GNU `date`); solo Linux y macOS.

## Salida

| Estado | Salida |
|--------|--------|
| Normal | ` Wednesday, 23 July 2026  14:30` / `   America/New York (EST -05:00)` |
| No detectada | ` Timezone: unknown` |

La zona horaria se detecta desde `/etc/timezone` > enlace simbólico `/etc/localtime` > `timedatectl`.
