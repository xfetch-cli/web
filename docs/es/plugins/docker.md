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
| Demonio ejecutándose | ` Contenedores: 15 total`, `  ▶ 3 ejecutándose`, `  ⏸ 1 pausado`, `  ⏹ 11 detenidos` |
| Demonio no ejecutándose | ` Docker: demonio no ejecutándose` |
| CLI no encontrado | ` Docker: no encontrado` |
