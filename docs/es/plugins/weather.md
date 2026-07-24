# weather

Muestra las condiciones climáticas actuales vía wttr.in.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-weather`
- **Dependencias:** `curl` en PATH
- **API:** [wttr.in](https://wttr.in) (gratuito, sin clave API)

## Configuración

```jsonc
{
    "info_plugins": [{
        "plugin": "weather",
        "args": {
            "location": "London",
            "format": "%C|%t|%w|%h|%p"
        }
    }],
    "modules": ["plugin:weather"]
}
```

## Argumentos

| Campo | Requerido | Por Defecto | Descripción |
|-------|-----------|-------------|-------------|
| `location` | No | Auto-detectado por IP | Nombre de ciudad, coordenadas o código de aeropuerto |
| `format` | No | `%C\|%t\|%w\|%h\|%p` | Cadena de formato de wttr.in (separada por barras) |

## Salida

| Estado | Salida |
|--------|--------|
| Clima obtenido | `☀ +15°C Despejado` / `   Humedad: 60%` / `   Viento: ↑15 km/h` / `   Precipitación: 0%` |
| Error de red | ` Clima: no se pudo obtener` |
| Sin datos | ` Clima: sin datos` |

Los iconos se seleccionan automáticamente según la condición: Despejado/Soleado (`☀`), Nublado (`☁`), Lluvia (`🌧`), Nieve (`❄️`), Tormenta (`⛈`), Niebla (`🌫`), Parcialmente (`⛅`).
