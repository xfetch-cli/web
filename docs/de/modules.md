# Module

xfetch bietet 18 eingebaute Module und unterstutzt unbegrenzt viele benutzerdefinierte Module durch sein Plugin-System. Module sind die einzelnen Informationsstucke, die in der Ausgabe angezeigt werden.

## Kernsystemmodule

| Schlussel | Beschreibung | Quelle |
|-----|-------------|--------|
| `os` | Betriebssystemname, -version und -architektur | sysinfo Crate |
| `kernel` | Kernel-Versionszeichenkette | sysinfo Crate |
| `hostname` oder `host` | Maschinen-Hostname | sysinfo Crate |
| `uptime` | Systembetriebszeit (z. B. "2 hours, 15 mins") | sysinfo Crate |

### Modul: `os`

Zeigt den OS-Distributionsnamen, die Version und die Architektur an.

```
OS: Arch Linux x86_64
OS: Ubuntu 24.04 LTS aarch64
OS: Windows 11 Pro 23H2 x86_64
OS: macOS 15.1 Sequoia arm64
```

### Modul: `kernel`

Zeigt die Kernel-Versionszeichenkette an.

```
Kernel: 6.6.87.2-arch1-1
Kernel: 10.0.22631
Kernel: 24.1.0
```

### Modul: `hostname`

Zeigt den System-Hostnamen an.

```
Hostname: thinkpad-x1
Hostname: DESKTOP-ABC123
```

### Modul: `uptime`

Zeigt die Systembetriebszeit in fur Menschen lesbarem Format an.

```
Uptime: 2 hours, 15 mins
Uptime: 14 days, 6 hours, 42 mins
```

## Hardwaremodule

| Schlussel | Beschreibung | Quelle |
|-----|-------------|--------|
| `cpu` | CPU-Modell, Kernanzahl und Taktfrequenz | sysinfo Crate |
| `gpu` | GPU-Modell(e) | Plattformspezifischer Befehl |
| `memory` | RAM-Nutzung: verwendet / gesamt | sysinfo Crate |
| `swap` | Swap-Nutzung: verwendet / gesamt | sysinfo Crate |
| `disk` | Erste Festplatte: verwendet / gesamt / Dateisystem | sysinfo Crate |
| `battery` | Akkuprozentsatz und -status | Plattformspezifische Datei/Befehl |

### Modul: `cpu`

Zeigt CPU-Markenname, Anzahl physischer Kerne und Betriebsfrequenz an.

```
CPU: Intel(R) Core(TM) i7-10750H @ 2.60GHz (12)
CPU: Apple M3 Pro (11)
CPU: AMD Ryzen 9 7950X (16) @ 4.50 GHz
```

### Modul: `gpu`

Zeigt GPU-Modell(e) an. Mehrere GPUs werden mit " / " verbunden.

```
GPU: NVIDIA GeForce RTX 3060 / Intel UHD Graphics 630
GPU: Apple M3 Pro
GPU: Basic Render Driver
```

Erkennungsmethoden nach Plattform:

| Plattform | Befehl / Quelle |
|----------|-----------------|
| Linux | `lspci -mm` (parst VGA/3D/Display-Controller) |
| Windows | `wmic path win32_videocontroller get name` oder PowerShell |
| macOS | `system_profiler SPDisplaysDataType` (parst "Chipset Model") |

### Modul: `memory`

Zeigt die RAM-Nutzung in GiB mit Prozentsatz an.

```
Memory: 3.10 GiB / 7.74 GiB (40%)
Memory: 16.0 GiB / 32.0 GiB (50%)
```

### Modul: `swap`

Zeigt die Swap-Nutzung in GiB mit Prozentsatz an.

```
Swap: 1.20 GiB / 4.00 GiB (30%)
Swap: 0 B / 0 B (0%)
```

### Modul: `disk`

Zeigt die Nutzung, Gesamtkapazitat und den Dateisystemtyp der ersten erkannten Festplatte an.

```
Disk: 120.5 GiB / 256 GiB (47%) - ext4
Disk: 0.00 GiB / 3.87 GiB (0%) - overlay
```

### Modul: `battery`

Zeigt Akkuprozentsatz und Ladestatus an.

```
Battery: 85% [Charging]
Battery: 42% [Discharging]
Battery: 100% [Charged]
Battery: N/A
```

Erkennungsmethoden nach Plattform:

| Plattform | Quelle |
|----------|--------|
| Linux | `/sys/class/power_supply/BAT*/capacity` und `status` |
| macOS | `pmset -g batt` |
| Windows | `wmic path Win32_Battery` oder PowerShell |

## Softwaremodule

| Schlussel | Beschreibung | Quelle |
|-----|-------------|--------|
| `packages` | Gesamtpaketanzahl uber alle erkannten Manager | Plattformspezifische Befehle |
| `packages:<name>` | Paketanzahl pro Manager (z. B. `packages:pacman`) | Einzelne Manager-Befehle |
| `shell` | Aktueller Shell-Name | `$SHELL`-Umgebungsvariable |
| `terminal` | Terminalemulator-Name | `$TERM_PROGRAM`, `$TERM` |
| `wm` | Fenstermanager oder Desktop-Umgebung | `$XDG_CURRENT_DESKTOP` |

### Modul: `packages`

Zeigt die Gesamtzahl der installierten Pakete an. Wenn mehrere Paketmanager erkannt werden, werden die Anzahl mit " + " verbunden.

```
Packages: 657 (pacman) + 45 (flatpak) + 12 (snap)
Packages: 128 (brew)
Packages: 24 (scoop)
```

**Unterstutzte Paketmanager nach Plattform:**

| Plattform | Manager |
|----------|----------|
| Linux | pacman, dpkg, rpm, flatpak, snap, apk, nix-env |
| macOS | brew |
| Windows | scoop, choco |

### Modul: `packages:<name>`

Zeigt die Anzahl eines bestimmten Paketmanagers einzeln an:

```
packages:pacman  ->  657
packages:brew    ->  128
packages:scoop   ->  24
```

### Modul: `shell`

Zeigt den aktuellen Shell-Namen (Basisname von `$SHELL`) an.

```
Shell: zsh
Shell: bash
Shell: powershell
Shell: fish
```

### Modul: `terminal`

Zeigt den Namen des Terminalemulators an.

```
Terminal: WezTerm
Terminal: Windows Terminal
Terminal: iTerm2
Terminal: Alacritty
Terminal: xterm-256color
```

Erkennungsprioritat: `$TERM_PROGRAM` > `$WT_SESSION` (Windows Terminal) > `$TERM`

### Modul: `wm`

Zeigt den Fenstermanager oder die Desktop-Umgebung an.

```
WM: Hyprland
WM: GNOME
WM: i3
WM: KDE
WM: Explorer
WM: Aqua
```

Erkennung: Liest `$XDG_CURRENT_DESKTOP` und `$DESKTOP_SESSION`. Fallback auf "Explorer" unter Windows, "Aqua" unter macOS.

## Netzwerkmodule

| Schlussel | Beschreibung | Quelle |
|-----|-------------|--------|
| `local_ip` | Erste Nicht-Loopback-IPv4-Adresse | Netzwerkschnittstellen-Aufzahlung |
| `local_ip:v6` | Erste Nicht-Loopback-IPv6-Adresse | Netzwerkschnittstellen-Aufzahlung |
| `public_ip` | Offentliche IP-Adresse (erfordert Netzwerk) | HTTP-Anfrage an offentliche API |
| `interfaces` | Netzwerkschnittstellenliste mit MAC-Adressen und IPs | Netzwerkschnittstellen-Aufzahlung |

### Modul: `local_ip`

Zeigt die erste Nicht-Loopback-IPv4-Adresse an.

```
Local IP: 192.168.1.42
```

### Modul: `local_ip:v6`

Zeigt die erste Nicht-Loopback-IPv6-Adresse an.

```
Local IPv6: 2a01:db8::1234:5678
```

### Modul: `public_ip`

Ruft die offentliche IP-Adresse von einem externen Dienst ab. **Datenschutzhinweis:** Dies fuhrt eine HTTP-Anfrage an einen Drittanbieterdienst durch. Deaktivieren Sie dies mit `disable_ip_fetching: true` in Ihrer Konfiguration.

```
Public IP: 203.0.113.42
```

Fallback-Reihenfolge: `ifconfig.me` > `api.ipify.org` > `icanhazip.com`

Wird standardmaig 5 Minuten lang zwischengespeichert.

### Modul: `interfaces`

Zeigt alle erkannten Netzwerkschnittstellen mit ihren MAC-Adressen und IP-Adressen an.

```
Interfaces: eth0 00:11:22:33:44:55 (192.168.1.42, fe80::211:22ff:fe33:4455)
Interfaces: wlan0 AA:BB:CC:DD:EE:FF (10.0.0.5)
```

## Benutzer- und Sitzungsmodule

| Schlussel | Beschreibung | Quelle |
|-----|-------------|--------|
| `user` | Aktueller Benutzername | `$USER`- oder `$USERNAME`-Umgebungsvariable |
| `datetime` | Aktuelles Datum und Uhrzeit | `date`-Befehl (Unix) oder PowerShell (Windows) |

### Modul: `user`

Zeigt den aktuellen Benutzernamen an.

```
User: xscriptor
User: john
```

### Modul: `datetime`

Zeigt das aktuelle Datum und die Uhrzeit im ISO-ahnlichen Format an.

```
Datetime: 2026-07-23 14:30:00
```

## Spezialmodule

| Schlussel | Beschreibung |
|-----|-------------|
| `palette` | ANSI-Farbpalettenanzeige |
| `header` | Benutzer@Hostname-Zeile (im Pac-Man-Layout verwendet) |
| `sep` | Trennlinie (dargestellt als `---`) |

### Modul: `palette`

Zeigt die 8 Standard-ANSI-Farben im konfigurierten Palettenstil (Quadrate, Kreise, Dreiecke, Linien oder Punkte) an.

### Modul: `header`

Zeigt eine `user@hostname`-Zeichenkette an. Wird hauptsachlich im Pac-Man-Layout als Titel verwendet.

### Modul: `sep`

Fugt eine visuelle Trennlinie (`---`) zwischen Modulgruppen ein.

## Plugin-Module

Plugins stellen zusatzliche Module mit dem Schussel-Prafix `plugin:<name>` bereit:

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

Jedes Plugin kann eine oder mehrere Textzeilen zuruckgeben, die unter seinem Modulschlussel angezeigt werden. Siehe die [Plugins-Dokumentation](plugins.md) fur Details zu allen verfugbaren Plugin-Modulen.
