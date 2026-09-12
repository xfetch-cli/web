# wasm-ip-geo

IP publica, ubicacion, red y zona horaria via ipapi.co, como componente Python.

- **Tipo:** `info_provider`
- **Artefacto:** `wasm-ip-geo.wasm` (component)
- **Capacidades:** `https://ipapi.co/*`
- **Lenguaje:** Python (componentize-py)

## Instalacion

```bash
xfetch plugin install ./plugins/wasm-ip-geo
```

El instalador compila el invitado con su manifiesto cuando hace falta.

## Configuracion

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-ip-geo", "args": { "fields": ["ip", "location", "org", "timezone"] } }],
    "modules": ["plugin:wasm-ip-geo"]
}
```

## Argumentos

| Campo | Tipo | Por defecto | Descripcion |
|-------|------|---------|-------------|
| `fields` | string[] | all four | Cualquiera de `ip`, `location`, `org`, `timezone`. |

## Salida

```
ip: 203.0.113.42 (IPv4)
location: Madrid, MD - Spain
network: Example Telecom S.A.
timezone: Europe/Madrid (UTC+0200)
```

## Notas

Solo esta permitido ipapi.co. El componente necesita unos 256 MiB de memoria porque incluye CPython.
