# Índice de Plugins

xfetch proporciona un conjunto de plugins oficiales para funcionalidad adicional.

## Plugins de Proveedor de Información

- [banner-text](banner-text) — Líneas de texto desde un archivo o argumento literal
- [docker](docker) — Estadísticas de contenedores Docker
- [gauges](gauges) — Memoria, swap, disco y batería como barras de progreso
- [github-stats](github-stats) — Estadísticas de usuario de GitHub
- [langs](langs) — Lenguajes de un repositorio de GitHub o agregados de un owner/org con colores de marca
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
- [banner](banner) — Banner de proverbio chino/japonés debajo o encima del logo ASCII

## Plugins WebAssembly

Invitados con sandbox compilados a WebAssembly, cada uno con un manifiesto que declara sus capacidades y limites; consulta [Invitados WebAssembly](../wasm.md).

- [wasm-crypto](wasm-crypto) — Precios de criptomonedas via la API permitida de Coinbase (Rust)
- [wasm-ip-geo](wasm-ip-geo) — IP publica, ubicacion, red y zona horaria (componente Python)
- [wasm-pacman](wasm-pacman) — Paquetes de repositorio y AUR (Go)
- [wasm-proc](wasm-proc) — Carga media, memoria y uptime desde /proc (C)

## Instalar un Plugin

Desde el repositorio remoto por defecto:

```bash
xfetch plugin install animate-logo
```

Por defecto, `xfetch plugin install <nombre>` obtiene los plugins de `https://github.com/xfetch-cli/plugins.git`.

Los binarios instalados viven en `~/.config/xfetch/plugins/` (Linux/macOS) o `%APPDATA%/xfetch/plugins/` (Windows).

Consulta la [Compatibilidad de Plataformas](https://github.com/xfetch-cli/plugins/blob/main/docs/compatibility.md) para saber qué plugins funcionan en Linux, macOS y Windows.

