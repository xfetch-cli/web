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
| Shell | `$SHELL` | `$SHELL` | Prozess-Elternkette durchlaufen |
| Datum/Uhrzeit | `date`-Befehl | `date`-Befehl | PowerShell |
| Pakete | pacman, dpkg, rpm, flatpak, snap, apk, nix-env | brew | scoop, winget |
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

## Daemon-Modus

Der Daemon-Modus fixiert eine Animation oben im Terminal und loopt sie im Hintergrund, sodass die Shell-Eingabeaufforderung darunter nutzbar bleibt.

```bash
xfetch --daemon      # Daemon starten
xfetch --daemon-stop # Daemon stoppen
```

Die Animation lauft nur in TTY-Terminals; bei Pipes oder Umleitungen wird das statische Logo angezeigt. Der Daemon-Modus erfordert einen `logo_animation`-Block mit einem Plugin (z. B. `animate-logo`). Im Daemon-Modus loopt die Animation unbegrenzt — `duration_ms` und `loop` werden ignoriert. Fur eine endliche Animation, die von selbst stoppt, den Daemon-Modus deaktiviert lassen.

> **Hinweis:** Sowohl der animierte Daemon als auch der Live-Statistik-Daemon sind **nur unter Unix** (Linux/macOS) verfugbar. Auf Windows werden sie nicht unterstutzt und geben eine Fehlermeldung aus.

### Live-Statistik-Daemon

Der Live-Statistik-Daemon (`daemon_live`) fixiert einen Fetch-Block am oberen Terminalrand und fragt alle `daemon_live_refresh` Sekunden eine leichte Modul-Teilmenge neu ab. Er ist ein Geschwister des obigen animierten Daemons — der vorhandene animierte Daemon bleibt unverandert. Konfigurationsschlussel: `daemon_live`, `daemon_live_refresh`, `daemon_live_modules`, `daemon_live_reload` (Hot-Reload der Konfiguration und des aktiven Themes).

```bash
xfetch --no-daemon-live     # Live-Daemon deaktivieren, auch wenn er in der Konfiguration aktiviert ist
xfetch --daemon-live-stop   # laufenden Live-Daemon stoppen
xfetch --daemon-live-reload # Hot-Reload erzwingen
```

## WSL-Darstellung

Unter dem Windows-Subsystem fur Linux kann die OS-Zeile uber `os_wsl_style` (nur Linux) mit WSL-Details dekoriert werden:

| Wert | Verhalten |
|-------|----------|
| `off` | Schlichter OS-Name, keine Dekoration |
| `minimal` | Fügt `(WSL)` an (Standard) |
| `full` | Fügt die WSL-Version und WSLg (falls vorhanden) an |

## Intro-Effekte

`xfetch effects` installiert, listet und entfernt Intro-Effekte, die die Inhaltszeilen beim Start des Fetch animieren. Der Konfigurationsschlussel `effects` (ein einzelner Effekt oder eine Liste) bestimmt, welche Effekte in welcher Reihenfolge abgespielt werden:

```bash
xfetch effects install <name>   # Effekt installieren
xfetch effects list             # installierte Effekte auflisten
xfetch effects remove <name>    # Effekt entfernen
```

```jsonc
{
    "effects": {
        "plugin": "decrypt",
        "duration_ms": 1500,
        "fps": 30
    }
}
```

Siehe die Seite [Effekte](effects.md) für das vollständige Protokoll, die Konfigurationsfelder und das Schreiben eigener Effekte.

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
