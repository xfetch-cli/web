# Uso Avanzado

## Modo de Evaluación Comparativa

La bandera `--benchmark` muestra información de tiempo para la fase de sondeo paralelo y la ejecución total:

```bash
xfetch --benchmark
```

Ejemplo de salida:

```
Parallel probes:   127ms
Total time:        189ms
```

La medición de tiempo cubre:

- **Sondeos paralelos:** Detección de GPU, conteo de paquetes y obtención de IP pública (ejecutados concurrentemente mediante `thread::scope`)
- **Tiempo total:** Ejecución completa incluyendo carga de configuración, recopilación de módulos, renderizado y salida

## Sistema de Caché

xfetch almacena en caché ciertos datos para mejorar el rendimiento en ejecuciones repetidas.

### Almacenamiento de Caché

La caché se almacena como un archivo JSON en:

| Plataforma | Ruta |
|------------|------|
| Linux | `~/.cache/xfetch/cache.json` |
| macOS | `~/Library/Caches/xfetch/cache.json` |
| Windows | `%LOCALAPPDATA%/xfetch/cache.json` |

### Datos en Caché

| Dato | TTL | Propósito |
|------|-----|-----------|
| Conteos de paquetes | 5 minutos | Evitar ejecutar múltiples comandos de gestores de paquetes |
| IP pública | 5 minutos | Evitar peticiones HTTP repetidas |

### Gestión de la Caché

```bash
# Limpiar todos los datos en caché
xfetch --clean-cache
```

### Deshabilitar la Caché

Establezca `disable_cache: true` en su configuración para deshabilitar el almacenamiento en caché por completo:

```jsonc
{
    "disable_cache": true
}
```

Esto es útil en entornos donde el estado del sistema cambia frecuentemente o cuando desea los datos más actualizados en cada ejecución.

## Controles de Privacidad

xfetch proporciona opciones para controlar el acceso a la red y la recopilación de datos.

### Deshabilitar la Obtención de IP Pública

El módulo `public_ip` realiza una petición HTTP a un servicio externo. Para deshabilitarlo por privacidad:

```jsonc
{
    "disable_ip_fetching": true
}
```

Cuando está habilitado, el módulo `public_ip` devolverá "Disabled" en lugar de intentar obtener la dirección IP.

El módulo meteorológico basado en plugins también realiza llamadas a API externas. Para deshabilitarlo, simplemente elimine el plugin de su configuración.

### Dependencias de Red por Módulo

| Módulo | Acceso a Red | Servicio Externo |
|--------|--------------|------------------|
| `public_ip` | Sí | ifconfig.me, api.ipify.org, icanhazip.com |
| `plugin:weather` | Sí (si está instalado) | wttr.in |
| `plugin:github-stats` | Sí (si está instalado) | api.github.com |
| Todos los demás módulos | No | N/A |

## Comportamiento Multiplataforma

xfetch se adapta automáticamente al sistema operativo.

### Comportamiento de Módulos por Plataforma

| Módulo | Linux | macOS | Windows |
|--------|-------|-------|---------|
| GPU | `lspci -mm` | `system_profiler SPDisplaysDataType` | `wmic` o PowerShell |
| Batería | `/sys/class/power_supply/BAT*` | `pmset -g batt` | `wmic path Win32_Battery` |
| Shell | `$SHELL` | `$SHELL` | Verificación de `$PSModulePath` |
| Fecha/Hora | Comando `date` | Comando `date` | PowerShell |
| Paquetes | pacman, dpkg, rpm, flatpak, snap, apk, nix-env | brew | scoop, choco |
| Ruta de configuración | `~/.config/xfetch/` | `~/Library/Application Support/xfetch/` | `%APPDATA%/xfetch/` |
| Ruta de caché | `~/.cache/xfetch/` | `~/Library/Caches/xfetch/` | `%LOCALAPPDATA%/xfetch/` |
| Nombre de binario | `xfetch-plugin-<nombre>` | `xfetch-plugin-<nombre>` | `xfetch-plugin-<nombre>.exe` |

### Cadenas de Fallback

xfetch usa cadenas de fallback graceful para funcionalidades específicas de plataforma:

1. **Detección de GPU:** Comando principal > comando de fallback > "Unknown"
2. **Detección de batería:** Ruta principal > comando de fallback > "N/A"
3. **Resolución de pantalla (plugin):** xrandr > wlr-randr > xdpyinfo (Linux); system_profiler (macOS); PowerShell (Windows)
4. **Zona horaria (plugin):** `/etc/timezone` > enlace simbólico `/etc/localtime` > `timedatectl`

### Soporte de Terminal

- **Salida de color:** Todas las terminales con capacidad ANSI
- **Logos de imagen:** iTerm2, Kitty o terminales compatibles con Sixel
- **Logos ASCII:** Todas las terminales
- **Animación:** Requiere TTY. Usa visualización estática como fallback en pipes o contextos sin TTY.

## Optimización de Rendimiento

xfetch emplea varias optimizaciones de rendimiento:

### Sondeo Paralelo

Los siguientes sondeos se ejecutan concurrentemente usando `thread::scope` de Rust:

- Detección de GPU
- Conteo de paquetes
- Obtención de IP pública

Esto reduce el tiempo total de ejecución al ejecutar operaciones de E/S en paralelo.

### Inicialización Perezosa

Los recursos del sistema se inicializan solo cuando se solicita el módulo correspondiente:

- `sysinfo::System` (CPU, memoria, discos, redes) -- inicializado perezosamente
- `sysinfo::Disks` -- inicializado solo si un módulo de disco está configurado
- `sysinfo::Networks` -- inicializado solo si un módulo de red está configurado
- `sysinfo::Components` -- inicializado solo si se configuraron módulos de temperatura

### Almacenamiento en Caché

Los conteos de paquetes y las consultas de IP pública se almacenan en caché con TTL para evitar llamadas redundantes al sistema y peticiones de red.

## Referencia de Variables de Entorno

| Variable | Descripción | Usado Por |
|----------|-------------|-----------|
| `USER` / `LOGNAME` | Nombre de usuario actual | Módulos del núcleo (`user`) |
| `SHELL` | Ruta del shell actual | Módulos del núcleo (`shell`) |
| `HOME` | Ruta del directorio home | Módulos del núcleo, descubrimiento de plugins |
| `TERM_PROGRAM` | Nombre del emulador de terminal | Módulos del núcleo (`terminal`) |
| `TERM` | Tipo de terminal | Módulos del núcleo (`terminal`) |
| `WT_SESSION` | Sesión de Windows Terminal | Módulos del núcleo (`terminal`) |
| `XDG_CURRENT_DESKTOP` | Entorno de escritorio | Módulos del núcleo (`wm`) |
| `DESKTOP_SESSION` | Nombre de la sesión de escritorio | Módulos del núcleo (`wm`) |
| `XFETCH_PLUGIN_REPO` | URL del repositorio de plugins | Instalación de plugins |
| `XFETCH_PLUGIN_DEV_DIR` | Directorio de desarrollo de plugins | Descubrimiento de plugins |
| `GITHUB_USER` | Nombre de usuario de GitHub | Plugin github-stats |
| `CARGO_NET_GIT_FETCH_WITH_CLI` | Forzar git CLI fetch | Compilaciones de plugins |
