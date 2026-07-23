# Módulos

xfetch proporciona 18 módulos integrados y admite módulos personalizados ilimitados a través de su sistema de plugins. Los módulos son las piezas individuales de información que se muestran en la salida.

## Módulos Principales del Sistema

| Clave | Descripción | Fuente |
|-------|-------------|--------|
| `os` | Nombre, versión y arquitectura del sistema operativo | crate sysinfo |
| `kernel` | Cadena de versión del kernel | crate sysinfo |
| `hostname` o `host` | Nombre de host de la máquina | crate sysinfo |
| `uptime` | Tiempo de actividad del sistema (ej., "2 hours, 15 mins") | crate sysinfo |

### Módulo: `os`

Muestra el nombre de la distribución del SO, la versión y la arquitectura.

```
OS: Arch Linux x86_64
OS: Ubuntu 24.04 LTS aarch64
OS: Windows 11 Pro 23H2 x86_64
OS: macOS 15.1 Sequoia arm64
```

### Módulo: `kernel`

Muestra la cadena de versión del kernel.

```
Kernel: 6.6.87.2-arch1-1
Kernel: 10.0.22631
Kernel: 24.1.0
```

### Módulo: `hostname`

Muestra el nombre de host del sistema.

```
Hostname: thinkpad-x1
Hostname: DESKTOP-ABC123
```

### Módulo: `uptime`

Muestra el tiempo de actividad del sistema en formato legible.

```
Uptime: 2 hours, 15 mins
Uptime: 14 days, 6 hours, 42 mins
```

## Módulos de Hardware

| Clave | Descripción | Fuente |
|-------|-------------|--------|
| `cpu` | Modelo de CPU, número de núcleos y frecuencia | crate sysinfo |
| `gpu` | Modelo(s) de GPU | Comando específico de plataforma |
| `memory` | Uso de RAM: usado / total | crate sysinfo |
| `swap` | Uso de swap: usado / total | crate sysinfo |
| `disk` | Primer disco: usado / total / sistema de archivos | crate sysinfo |
| `battery` | Porcentaje y estado de la batería | Archivo/comando específico de plataforma |

### Módulo: `cpu`

Muestra el nombre de la marca de la CPU, el número de núcleos físicos y la frecuencia de operación.

```
CPU: Intel(R) Core(TM) i7-10750H @ 2.60GHz (12)
CPU: Apple M3 Pro (11)
CPU: AMD Ryzen 9 7950X (16) @ 4.50 GHz
```

### Módulo: `gpu`

Muestra el modelo(s) de GPU. Múltiples GPUs se unen con " / ".

```
GPU: NVIDIA GeForce RTX 3060 / Intel UHD Graphics 630
GPU: Apple M3 Pro
GPU: Basic Render Driver
```

Métodos de detección por plataforma:

| Plataforma | Comando / Fuente |
|------------|------------------|
| Linux | `lspci -mm` (analiza controladores VGA/3D/Display) |
| Windows | `wmic path win32_videocontroller get name` o PowerShell |
| macOS | `system_profiler SPDisplaysDataType` (analiza "Chipset Model") |

### Módulo: `memory`

Muestra el uso de RAM en GiB con porcentaje.

```
Memory: 3.10 GiB / 7.74 GiB (40%)
Memory: 16.0 GiB / 32.0 GiB (50%)
```

### Módulo: `swap`

Muestra el uso de swap en GiB con porcentaje.

```
Swap: 1.20 GiB / 4.00 GiB (30%)
Swap: 0 B / 0 B (0%)
```

### Módulo: `disk`

Muestra el uso del primer disco detectado, la capacidad total y el tipo de sistema de archivos.

```
Disk: 120.5 GiB / 256 GiB (47%) - ext4
Disk: 0.00 GiB / 3.87 GiB (0%) - overlay
```

### Módulo: `battery`

Muestra el porcentaje de batería y el estado de carga.

```
Battery: 85% [Charging]
Battery: 42% [Discharging]
Battery: 100% [Charged]
Battery: N/A
```

Métodos de detección por plataforma:

| Plataforma | Fuente |
|------------|--------|
| Linux | `/sys/class/power_supply/BAT*/capacity` y `status` |
| macOS | `pmset -g batt` |
| Windows | `wmic path Win32_Battery` o PowerShell |

## Módulos de Software

| Clave | Descripción | Fuente |
|-------|-------------|--------|
| `packages` | Conteo total de paquetes en todos los gestores detectados | Comandos específicos de plataforma |
| `packages:<nombre>` | Conteo de paquetes por gestor (ej., `packages:pacman`) | Comandos de gestor individual |
| `shell` | Nombre del shell actual | Variable de entorno `$SHELL` |
| `terminal` | Nombre del emulador de terminal | `$TERM_PROGRAM`, `$TERM` |
| `wm` | Gestor de ventanas o entorno de escritorio | `$XDG_CURRENT_DESKTOP` |

### Módulo: `packages`

Muestra el número total de paquetes instalados. Cuando se detectan múltiples gestores de paquetes, los conteos se unen con " + ".

```
Packages: 657 (pacman) + 45 (flatpak) + 12 (snap)
Packages: 128 (brew)
Packages: 24 (scoop)
```

**Gestores de paquetes compatibles por plataforma:**

| Plataforma | Gestores |
|------------|----------|
| Linux | pacman, dpkg, rpm, flatpak, snap, apk, nix-env |
| macOS | brew |
| Windows | scoop, choco |

### Módulo: `packages:<nombre>`

Muestra el conteo de un gestor de paquetes específico individualmente:

```
packages:pacman  ->  657
packages:brew    ->  128
packages:scoop   ->  24
```

### Módulo: `shell`

Muestra el nombre del shell actual (nombre base de `$SHELL`).

```
Shell: zsh
Shell: bash
Shell: powershell
Shell: fish
```

### Módulo: `terminal`

Muestra el nombre del emulador de terminal.

```
Terminal: WezTerm
Terminal: Windows Terminal
Terminal: iTerm2
Terminal: Alacritty
Terminal: xterm-256color
```

Prioridad de detección: `$TERM_PROGRAM` > `$WT_SESSION` (Windows Terminal) > `$TERM`

### Módulo: `wm`

Muestra el gestor de ventanas o entorno de escritorio.

```
WM: Hyprland
WM: GNOME
WM: i3
WM: KDE
WM: Explorer
WM: Aqua
```

Detección: lee `$XDG_CURRENT_DESKTOP` y `$DESKTOP_SESSION`. Usa "Explorer" como fallback en Windows, "Aqua" en macOS.

## Módulos de Red

| Clave | Descripción | Fuente |
|-------|-------------|--------|
| `local_ip` | Primera dirección IPv4 no loopback | Enumeración de interfaces de red |
| `local_ip:v6` | Primera dirección IPv6 no loopback | Enumeración de interfaces de red |
| `public_ip` | Dirección IP pública (requiere red) | Petición HTTP a una API pública |
| `interfaces` | Lista de interfaces de red con direcciones MAC e IPs | Enumeración de interfaces de red |

### Módulo: `local_ip`

Muestra la primera dirección IPv4 no loopback.

```
Local IP: 192.168.1.42
```

### Módulo: `local_ip:v6`

Muestra la primera dirección IPv6 no loopback.

```
Local IPv6: 2a01:db8::1234:5678
```

### Módulo: `public_ip`

Obtiene la dirección IP pública desde un servicio externo. **Aviso de privacidad:** Esto realiza una petición HTTP a un servicio de terceros. Deshabilítelo con `disable_ip_fetching: true` en su configuración.

```
Public IP: 203.0.113.42
```

Orden de fallback: `ifconfig.me` > `api.ipify.org` > `icanhazip.com`

Se almacena en caché durante 5 minutos por defecto.

### Módulo: `interfaces`

Muestra todas las interfaces de red detectadas con sus direcciones MAC y direcciones IP.

```
Interfaces: eth0 00:11:22:33:44:55 (192.168.1.42, fe80::211:22ff:fe33:4455)
Interfaces: wlan0 AA:BB:CC:DD:EE:FF (10.0.0.5)
```

## Módulos de Usuario y Sesión

| Clave | Descripción | Fuente |
|-------|-------------|--------|
| `user` | Nombre de usuario actual | Variable de entorno `$USER` o `$USERNAME` |
| `datetime` | Fecha y hora actuales | Comando `date` (Unix) o PowerShell (Windows) |

### Módulo: `user`

Muestra el nombre de usuario actual.

```
User: xscriptor
User: john
```

### Módulo: `datetime`

Muestra la fecha y hora actuales en formato ISO.

```
Datetime: 2026-07-23 14:30:00
```

## Módulos Especiales

| Clave | Descripción |
|-------|-------------|
| `palette` | Visualización de la paleta de colores ANSI |
| `header` | Línea usuario@hostname (usada en el diseño Pac-Man) |
| `sep` | Línea separadora (se renderiza como `---`) |

### Módulo: `palette`

Renderiza los 8 colores ANSI estándar en el estilo de paleta configurado (squares, circles, triangles, lines o dots).

### Módulo: `header`

Muestra una cadena `usuario@hostname`. Se usa principalmente en el diseño Pac-Man como título.

### Módulo: `sep`

Inserta una línea separadora visual (`---`) entre grupos de módulos.

## Módulos de Plugins

Los plugins proporcionan módulos adicionales usando el prefijo `plugin:<nombre>`:

```jsonc
{
    "modules": [
        "os",
        "kernel",
        "plugin:docker",
        "plugin:github-stats"
    ]
}
```

Cada plugin puede devolver una o más líneas de texto que se muestran bajo su clave de módulo. Consulte la [documentación de Plugins](plugins.md) para obtener detalles sobre todos los módulos de plugins disponibles.
