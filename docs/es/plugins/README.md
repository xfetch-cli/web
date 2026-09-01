# Índice de Plugins

xfetch proporciona un conjunto de plugins oficiales para funcionalidad adicional.

## Plugins de Proveedor de Información

- [docker](docker) — Estadísticas de contenedores Docker
- [github-stats](github-stats) — Estadísticas de usuario de GitHub
- [music-player](music-player) — Música reproduciéndose actualmente (MPD / Spotify)
- [weather](weather) — Condiciones climáticas actuales vía wttr.in
- [timezone](timezone) — Zona horaria, fecha y offset UTC
- [user-info](user-info) — Información de cuenta de usuario
- [display-resolution](display-resolution) — Resolución de monitor y tasa de refresco
- [theme-detection](theme-detection) — Detección de tema de escritorio (GTK / KDE)
- [theme-manager](theme-manager) — Navegador e instalador de registros de temas
- [chocolatey](chocolatey) — Conteo de paquetes de Chocolatey (Windows)
- [temperature](temperature) — Temperatura de CPU/SoC desde las zonas térmicas del kernel

## Plugins de Animación de Logo

- [animate-logo](animate-logo) — Logos ASCII animados con efectos de color

## Instalar un Plugin

Desde el repositorio remoto por defecto:

```bash
xfetch plugin install animate-logo
```

Por defecto, `xfetch plugin install <nombre>` obtiene los plugins de `https://github.com/xfetch-cli/plugins.git`.

Los binarios instalados viven en `~/.config/xfetch/plugins/` (Linux/macOS) o `%APPDATA%/xfetch/plugins/` (Windows).

Consulta la [Compatibilidad de Plataformas](https://github.com/xfetch-cli/plugins/blob/main/docs/compatibility.md) para saber qué plugins funcionan en Linux, macOS y Windows.

