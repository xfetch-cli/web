# Modules

xfetch provides 18 built-in modules and supports unlimited custom modules through its plugin system. Modules are the individual pieces of information displayed in the output.

## Core System Modules

| Key | Description | Source |
|-----|-------------|--------|
| `os` | Operating system name, version, and architecture | sysinfo crate |
| `kernel` | Kernel version string | sysinfo crate |
| `hostname` or `host` | Machine hostname | sysinfo crate |
| `uptime` | System uptime (e.g., "2 hours, 15 mins") | sysinfo crate |

### Module: `os`

Displays the OS distribution name, version, and architecture.

```
OS: Arch Linux x86_64
OS: Ubuntu 24.04 LTS aarch64
OS: Windows 11 Pro 23H2 x86_64
OS: macOS 15.1 Sequoia arm64
```

### Module: `kernel`

Displays the kernel version string.

```
Kernel: 6.6.87.2-arch1-1
Kernel: 10.0.22631
Kernel: 24.1.0
```

### Module: `hostname`

Displays the system hostname.

```
Hostname: thinkpad-x1
Hostname: DESKTOP-ABC123
```

### Module: `uptime`

Displays the system uptime in human-readable format.

```
Uptime: 2 hours, 15 mins
Uptime: 14 days, 6 hours, 42 mins
```

## Hardware Modules

| Key | Description | Source |
|-----|-------------|--------|
| `cpu` | CPU model, core count, and frequency | sysinfo crate |
| `gpu` | GPU model(s) | Platform-specific command |
| `memory` | RAM usage: used / total | sysinfo crate |
| `swap` | Swap usage: used / total | sysinfo crate |
| `disk` | First disk: used / total / filesystem | sysinfo crate |
| `battery` | Battery percentage and status | Platform-specific file/command |

### Module: `cpu`

Displays CPU brand name, physical core count, and operating frequency.

```
CPU: Intel(R) Core(TM) i7-10750H @ 2.60GHz (12)
CPU: Apple M3 Pro (11)
CPU: AMD Ryzen 9 7950X (16) @ 4.50 GHz
```

### Module: `gpu`

Displays GPU model(s). Multiple GPUs are joined with " / ".

```
GPU: NVIDIA GeForce RTX 3060 / Intel UHD Graphics 630
GPU: Apple M3 Pro
GPU: Basic Render Driver
```

Detection methods by platform:

| Platform | Command / Source |
|----------|-----------------|
| Linux | `lspci -mm` (parses VGA/3D/Display controllers) |
| Windows | `wmic path win32_videocontroller get name` or PowerShell |
| macOS | `system_profiler SPDisplaysDataType` (parses "Chipset Model") |

### Module: `memory`

Displays RAM usage in GiB with percentage.

```
Memory: 3.10 GiB / 7.74 GiB (40%)
Memory: 16.0 GiB / 32.0 GiB (50%)
```

### Module: `swap`

Displays swap usage in GiB with percentage.

```
Swap: 1.20 GiB / 4.00 GiB (30%)
Swap: 0 B / 0 B (0%)
```

### Module: `disk`

Displays the first detected disk's usage, total capacity, and filesystem type.

```
Disk: 120.5 GiB / 256 GiB (47%) - ext4
Disk: 0.00 GiB / 3.87 GiB (0%) - overlay
```

### Module: `battery`

Displays battery percentage and charging status.

```
Battery: 85% [Charging]
Battery: 42% [Discharging]
Battery: 100% [Charged]
Battery: N/A
```

Detection methods by platform:

| Platform | Source |
|----------|--------|
| Linux | `/sys/class/power_supply/BAT*/capacity` and `status` |
| macOS | `pmset -g batt` |
| Windows | `wmic path Win32_Battery` or PowerShell |

## Software Modules

| Key | Description | Source |
|-----|-------------|--------|
| `packages` | Total package count across all detected managers | Platform-specific commands |
| `packages:<name>` | Per-manager package count (e.g., `packages:pacman`) | Individual manager commands |
| `shell` | Current shell name | `$SHELL` environment variable |
| `terminal` | Terminal emulator name | `$TERM_PROGRAM`, `$TERM` |
| `wm` | Window manager or desktop environment | `$XDG_CURRENT_DESKTOP` |

### Module: `packages`

Displays the total number of installed packages. When multiple package managers are detected, counts are joined with " + ".

```
Packages: 657 (pacman) + 45 (flatpak) + 12 (snap)
Packages: 128 (brew)
Packages: 24 (scoop)
```

**Supported package managers by platform:**

| Platform | Managers |
|----------|----------|
| Linux | pacman, dpkg, rpm, flatpak, snap, apk, nix-env |
| macOS | brew |
| Windows | scoop, choco |

### Module: `packages:<name>`

Displays a specific package manager's count individually:

```
packages:pacman  ->  657
packages:brew    ->  128
packages:scoop   ->  24
```

### Module: `shell`

Displays the current shell name (basename of `$SHELL`).

```
Shell: zsh
Shell: bash
Shell: powershell
Shell: fish
```

### Module: `terminal`

Displays the terminal emulator name.

```
Terminal: WezTerm
Terminal: Windows Terminal
Terminal: iTerm2
Terminal: Alacritty
Terminal: xterm-256color
```

Detection priority: `$TERM_PROGRAM` > `$WT_SESSION` (Windows Terminal) > `$TERM`

### Module: `wm`

Displays the window manager or desktop environment.

```
WM: Hyprland
WM: GNOME
WM: i3
WM: KDE
WM: Explorer
WM: Aqua
```

Detection: reads `$XDG_CURRENT_DESKTOP` and `$DESKTOP_SESSION`. Falls back to "Explorer" on Windows, "Aqua" on macOS.

## Network Modules

| Key | Description | Source |
|-----|-------------|--------|
| `local_ip` | First non-loopback IPv4 address | Network interface enumeration |
| `local_ip:v6` | First non-loopback IPv6 address | Network interface enumeration |
| `public_ip` | Public IP address (requires network) | HTTP request to public API |
| `interfaces` | Network interface list with MAC addresses and IPs | Network interface enumeration |

### Module: `local_ip`

Displays the first non-loopback IPv4 address.

```
Local IP: 192.168.1.42
```

### Module: `local_ip:v6`

Displays the first non-loopback IPv6 address.

```
Local IPv6: 2a01:db8::1234:5678
```

### Module: `public_ip`

Fetches the public IP address from an external service. **Privacy notice:** This makes an HTTP request to a third-party service. Disable with `disable_ip_fetching: true` in your config.

```
Public IP: 203.0.113.42
```

Fallback order: `ifconfig.me` > `api.ipify.org` > `icanhazip.com`

Cached for 5 minutes by default.

### Module: `interfaces`

Displays all detected network interfaces with their MAC addresses and IP addresses.

```
Interfaces: eth0 00:11:22:33:44:55 (192.168.1.42, fe80::211:22ff:fe33:4455)
Interfaces: wlan0 AA:BB:CC:DD:EE:FF (10.0.0.5)
```

## User and Session Modules

| Key | Description | Source |
|-----|-------------|--------|
| `user` | Current username | `$USER` or `$USERNAME` environment variable |
| `datetime` | Current date and time | `date` command (Unix) or PowerShell (Windows) |

### Module: `user`

Displays the current username.

```
User: xscriptor
User: john
```

### Module: `datetime`

Displays the current date and time in ISO-like format.

```
Datetime: 2026-07-23 14:30:00
```

## Special Modules

| Key | Description |
|-----|-------------|
| `palette` | ANSI color palette display |
| `header` | User@hostname line (used in Pac-Man layout) |
| `sep` | Separator line (rendered as `---`) |

### Module: `palette`

Renders the 8 standard ANSI colors in the configured palette style (squares, circles, triangles, lines, or dots).

### Module: `header`

Displays a `user@hostname` string. Primarily used in the Pac-Man layout as a title.

### Module: `sep`

Inserts a visual separator line (`---`) between module groups.

## Plugin Modules

Plugins provide additional modules using the `plugin:<name>` key prefix:

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

Each plugin can return one or more lines of text that are displayed under its module key. See the [Plugins documentation](plugins.md) for details on all available plugin modules.
