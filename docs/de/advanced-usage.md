# Fortgeschrittene Nutzung

## Benchmark-Modus

Das Flag `--benchmark` zeigt Zeitinformationen fur die parallele Probephase und die Gesamtausfuhrungszeit an:

```bash
xfetch --benchmark
```

Beispielausgabe:

```
Parallel probes:   127ms
Total time:        189ms
```

Benchmark-Zeitmessung umfasst:

- **Parallele Proben:** GPU-Erkennung, Paketzahlung und offentlicher IP-Abruf (gleichzeitig ausgefuhrt uber `thread::scope`)
- **Gesamtzeit:** Gesamte Ausfuhrung einschlieelich Konfigurationsladen, Modulsammlung, Rendering und Ausgabe

## Cache-System

xfetch zwischenspeichert bestimmte Daten, um die Leistung bei wiederholten Ausfuhrungen zu verbessern.

### Cache-Speicher

Der Cache wird als JSON-Datei gespeichert unter:

| Plattform | Pfad |
|----------|------|
| Linux | `~/.cache/xfetch/cache.json` |
| macOS | `~/Library/Caches/xfetch/cache.json` |
| Windows | `%LOCALAPPDATA%/xfetch/cache.json` |

### Zwischengespeicherte Daten

| Daten | TTL | Zweck |
|------|-----|---------|
| Paketanzahlen | 5 Minuten | Vermeidet mehrfache Ausfuhrung von Paketmanager-Befehlen |
| Offentliche IP | 5 Minuten | Vermeidet wiederholte HTTP-Anfragen |

### Cache verwalten

```bash
# Alle zwischengespeicherten Daten loschen
xfetch --clean-cache
```

### Cache deaktivieren

Setzen Sie `disable_cache: true` in Ihrer Konfiguration, um das Caching vollstandig zu deaktivieren:

```jsonc
{
    "disable_cache": true
}
```

Dies ist nutzlich fur Umgebungen, in denen sich der Systemzustand haufig andert, oder wenn Sie bei jeder Ausfuhrung die aktuellsten Daten wunschen.

## Datenschutzeinstellungen

xfetch bietet Optionen zur Steuerung des Netzwerkzugriffs und der Datenerfassung.

### Abruf der offentlichen IP deaktivieren

Das Modul `public_ip` fuhrt eine HTTP-Anfrage an einen externen Dienst durch. Um dies aus Datenschutzgrunden zu deaktivieren:

```jsonc
{
    "disable_ip_fetching": true
}
```

Wenn aktiviert, gibt das Modul `public_ip` "Disabled" zuruck, anstatt zu versuchen, die IP-Adresse abzurufen.

Das pluginbasierte Wettermodul fuhrt ebenfalls externe API-Aufrufe durch. Um es zu deaktivieren, entfernen Sie einfach das Plugin aus Ihrer Konfiguration.

### Netzwerkabhangigkeiten nach Modul

| Modul | Netzwerkzugriff | Externer Dienst |
|--------|---------------|------------------|
| `public_ip` | Ja | ifconfig.me, api.ipify.org, icanhazip.com |
| `plugin:weather` | Ja (falls installiert) | wttr.in |
| `plugin:github-stats` | Ja (falls installiert) | api.github.com |
| Alle anderen Module | Nein | N/A |

## Plattformubergreifendes Verhalten

xfetch passt sich automatisch an das Betriebssystem an.

### Plattformspezifisches Modulverhalten

| Modul | Linux | macOS | Windows |
|--------|-------|-------|---------|
| GPU | `lspci -mm` | `system_profiler SPDisplaysDataType` | `wmic` oder PowerShell |
| Akku | `/sys/class/power_supply/BAT*` | `pmset -g batt` | `wmic path Win32_Battery` |
| Shell | `$SHELL` | `$SHELL` | `$PSModulePath`-Prufung |
| Datum/Uhrzeit | `date`-Befehl | `date`-Befehl | PowerShell |
| Pakete | pacman, dpkg, rpm, flatpak, snap, apk, nix-env | brew | scoop, choco |
| Konfigurationspfad | `~/.config/xfetch/` | `~/Library/Application Support/xfetch/` | `%APPDATA%/xfetch/` |
| Cache-Pfad | `~/.cache/xfetch/` | `~/Library/Caches/xfetch/` | `%LOCALAPPDATA%/xfetch/` |
| Binary-Name | `xfetch-plugin-<name>` | `xfetch-plugin-<name>` | `xfetch-plugin-<name>.exe` |

### Fallback-Ketten

xfetch verwendet abgestufte Fallback-Ketten fur plattformspezifische Funktionen:

1. **GPU-Erkennung:** Primarer Befehl > Fallback-Befehl > "Unknown"
2. **Akku-Erkennung:** Primarer Pfad > Fallback-Befehl > "N/A"
3. **Bildschirmauflosung (Plugin):** xrandr > wlr-randr > xdpyinfo (Linux); system_profiler (macOS); PowerShell (Windows)
4. **Zeitzone (Plugin):** `/etc/timezone` > `/etc/localtime`-Symlink > `timedatectl`

### Terminalunterstutzung

- **Farbausgabe:** Alle ANSI-fahigen Terminals
- **Bildlogos:** iTerm2, Kitty oder Sixel-kompatible Terminals
- **ASCII-Logos:** Alle Terminals
- **Animation:** Erfordert TTY. Fallback auf statische Anzeige in Pipes oder Nicht-TTY-Kontexten.

## Leistungsoptimierung

xfetch verwendet mehrere Leistungsoptimierungen:

### Paralleles Probing

Die folgenden Proben laufen gleichzeitig mit Rusts `thread::scope`:

- GPU-Erkennung
- Paketzahlung
- Offentlicher IP-Abruf

Dies reduziert die Gesamtausfuhrungszeit durch parallele Ausfuhrung von E/A-gebundenen Operationen.

### Lazy Initialization

Systemressourcen werden nur initialisiert, wenn das entsprechende Modul angefordert wird:

- `sysinfo::System` (CPU, Arbeitsspeicher, Festplatten, Netzwerke) -- wird lazy initialisiert
- `sysinfo::Disks` -- wird nur initialisiert, wenn ein Festplattenmodul konfiguriert ist
- `sysinfo::Networks` -- wird nur initialisiert, wenn ein Netzwerkmodul konfiguriert ist
- `sysinfo::Components` -- wird nur initialisiert, wenn Temperaturmodule konfiguriert waren

### Caching

Paketanzahlen und offentliche IP-Abfragen werden mit TTLs zwischengespeichert, um redundante Systemaufrufe und Netzwerkanfragen zu vermeiden.

## Umgebungsvariablen-Referenz

| Variable | Beschreibung | Verwendet von |
|----------|-------------|---------|
| `USER` / `LOGNAME` | Aktueller Benutzername | Kernmodule (`user`) |
| `SHELL` | Aktueller Shell-Pfad | Kernmodule (`shell`) |
| `HOME` | Home-Verzeichnispfad | Kernmodule, Plugin-Erkennung |
| `TERM_PROGRAM` | Terminalemulator-Name | Kernmodule (`terminal`) |
| `TERM` | Terminaltyp | Kernmodule (`terminal`) |
| `WT_SESSION` | Windows-Terminal-Sitzung | Kernmodule (`terminal`) |
| `XDG_CURRENT_DESKTOP` | Desktop-Umgebung | Kernmodule (`wm`) |
| `DESKTOP_SESSION` | Desktop-Sitzungsname | Kernmodule (`wm`) |
| `XFETCH_PLUGIN_REPO` | Plugin-Repository-URL | Plugin-Installation |
| `XFETCH_PLUGIN_DEV_DIR` | Plugin-Entwicklungsverzeichnis | Plugin-Erkennung |
| `GITHUB_USER` | GitHub-Benutzername | github-stats-Plugin |
| `CARGO_NET_GIT_FETCH_WITH_CLI` | Git-CLI-Abruf erzwingen | Plugin-Builds |
