# docker

Muestra estadísticas de contenedores Docker.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-docker`
- **Dependencias:** CLI de Docker (`docker` en PATH)

## Configuración

```jsonc
{
    "info_plugins": [{ "plugin": "docker" }],
    "modules": ["plugin:docker"]
}
```

## Argumentos

Ninguno.

## Salida

| Estado | Salida |
|--------|--------|
| Demonio ejecutándose | ` Containers: 15 total`, `  ▶ 3 running`, `  ⏸ 1 paused`, `  ⏹ 11 stopped` |
| Demonio no ejecutándose | ` Docker: daemon not running` |
| CLI no encontrado | ` Docker: not found` |
