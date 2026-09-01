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
| Clima obtenido | `☀ +15°C Clear` / `   Humidity: 60%` / `   Wind: ↑15 km/h` / `   Precipitation: 0%` |
| Error de red | ` Weather: could not fetch` |
| Sin datos | ` Weather: no data` |

Los iconos se seleccionan automáticamente según la condición: Clear/Sunny (`☀`), Cloudy (`☁`), Rain (`🌧`), Snow (`❄️`), Thunder (`⛈`), Fog (`🌫`), Partly (`⛅`).
