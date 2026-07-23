# Plugins

xfetch hat ein Plugin-System, das die Erweiterung der Funktionalitat durch eigenstandige ausfuhrbare Programme ermoglicht. Plugins kommunizieren mit dem Kern uber ein JSON-Protokoll uber stdin/stdout.

## Architektur-Ubersicht

Plugins sind eigenstandige ausfuhrbare Programme namens `xfetch-plugin-<name>` (oder `xfetch-plugin-<name>.exe` unter Windows). Sie werden als untergeordnete Prozesse vom xfetch-Kern gestartet.

```
xfetch core  --->  stdin (JSON request)     --->  plugin process
xfetch core  <---  stdout (JSON response)   <---  plugin process
xfetch core  <---  stderr (error messages)  <---  plugin process
```

### Plugin-Arten

Es gibt zwei Arten von Plugins:

| Art | Identifikator | Zweck |
|------|------------|---------|
| Logo-Animation | `logo_animation` | Animiert ASCII-Logos mit Farbeffekten |
| Info-Anbieter | `info_provider` | Gibt System- oder externe Informationszeilen zuruck |

## JSON-Drahtprotokoll

**Protokollversion:** 1

### Info-Anbieter-Protokoll

Anfrage:

```json
{
    "version": 1,
    "kind": "info_provider",
    "args": {
        "username": "xscriptor",
        "max_lines": 3
    }
}
```

Das Feld `args` enthalt pluginspezifische Argumente aus der Konfiguration. Wenn keine Argumente konfiguriert sind, ist `args` `null`.

Antwort:

```json
{
    "lines": [
        "\uf09b X (@xscriptor)",
        "\uf005 114 stars",
        "\uf441 33 repos"
    ]
}
```

### Logo-Animation-Protokoll

Anfrage:

```json
{
    "version": 1,
    "kind": "logo_animation",
    "lines": [
        "  __  __",
        "  \\ \\/ /",
        "   \\  /"
    ],
    "frames": [
        ["frame 1 line 1", "frame 1 line 2"],
        ["frame 2 line 1", "frame 2 line 2"]
    ],
    "args": {
        "fps": 12,
        "duration_ms": 1200,
        "loop": false,
        "style": "sweep"
    }
}
```

Das Feld `lines` enthalt das aktuelle ASCII-Logo. Das Feld `frames` enthalt optionale vorab geladene Frame-Sets. Das Feld `args` enthalt Animationsparameter.

Antwort:

```json
{
    "frames": [
        {
            "delay_ms": 83,
            "lines": ["\u001b[31mcolored line\u001b[0m", "\u001b[32mnext line\u001b[0m"]
        }
    ]
}
```

Jeder Frame hat einen `delay_ms` (wie lange der Frame angezeigt wird) und `lines` (den Frame-Inhalt, moglicherweise mit ANSI-Escape-Codes fur Farben).

### Fehlerbehandlung

Plugins mussen Fehlermeldungen auf stderr schreiben und bei Fehlern mit einem Statuscode ungleich Null beenden.

## Plugin-Erkennung

Bei der Ausfuhrung eines Plugins durchsucht xfetch das Binary in dieser Reihenfolge:

1. **Expliziter Pfad:** Wenn der Plugin-Name einen Pfadtrenner enthalt, wird er als direkter Dateipfad verwendet
2. **PATH:** Durchsucht `$PATH` nach `xfetch-plugin-<name>`
3. **Benutzer-Plugin-Verzeichnis:** `~/.config/xfetch/plugins/` (Linux/macOS) oder `%APPDATA%/xfetch/plugins/` (Windows)
4. **Workspace-Zielverzeichnisse:** Verschiedene Pfade relativ zum aktuellen Arbeitsverzeichnis, einschlieelich `./plugins/<name>/target/release/`
5. **Entwicklungsverzeichnisse:** Durchsucht ubergeordnete Verzeichnisse fur Entwicklungssetups

## Plugin-Installation

```bash
# Aus einem lokalen Verzeichnis installieren
xfetch plugin install ./my-plugin

# Aus dem offiziellen Plugin-Repository installieren
xfetch plugin install animate-logo

# Aus einem benutzerdefinierten Git-Repository installieren
xfetch plugin install my-plugin --repo https://github.com/user/plugins.git
```

### Installationsprozess

1. Wenn der Plugin-Name ein lokaler Pfad ist, direkt verwenden
2. Andernfalls lokal in `./<name>/`, `./plugins/<name>/` oder `./plugins/plugins/<name>/` suchen
3. Wenn nicht lokal gefunden, das Plugin-Repository klonen (`https://github.com/xfetch-cli/plugins.git` standardmaig)
4. `cargo build --release` im Plugin-Verzeichnis ausfuhren
5. Das erstellte Binary nach `~/.config/xfetch/plugins/xfetch-plugin-<name>` kopieren

### Plugin-Verwaltung

```bash
# Installierte Plugins auflisten
xfetch plugin list

# Ein Plugin entfernen
xfetch plugin remove animate-logo
```

## Offizielle Plugins

### animate-logo

Animiert ASCII-Logos mit verschiedenen Farbeffekten.

- **Art:** `logo_animation`
- **Binary:** `xfetch-plugin-animate-logo`

**Konfiguration:**

```jsonc
{
    "logo_animation": {
        "plugin": "animate-logo",
        "fps": 12,
        "duration_ms": 1200,
        "loop": false,
        "style": "sweep"
    }
}
```

**Animationsstile:**

| Stil | Beschreibung |
|-------|-------------|
| `sweep` | Farben streichen von links nach rechts uber Zeichen (6-Farben-ANSI-Palette) |
| `wave` | Sinuswellen-Farbmuster bewegt sich uber das Logo |
| `rainbow` | Voller RGB-Verlauf verschiebt sich uber die Zeit (24-Bit-Farbe) |
| `sparkle` | Zufallige Zeichen leuchten in hellen Farben auf |
| `breathing` | Alle Zeichen blenden in warmen Amber-Tonen ein und aus |
| `frame` | Durchlauft vorab geladene ASCII-Frame-Sets |
| `none` | Keine Farbgebung, zeigt das Logo wie es ist an |

### docker

Zeigt Docker-Container-Statistiken an.

- **Art:** `info_provider`
- **Binary:** `xfetch-plugin-docker`
- **Abhangigkeiten:** Docker CLI (`docker`-Befehl im PATH)

**Konfiguration:**

```jsonc
{
    "info_plugins": [{ "plugin": "docker" }],
    "modules": ["plugin:docker"]
}
```

**Ausgabe:**

| Zustand | Beispiel |
|-------|---------|
| Daemon lauft | `Containers: 15 total`, `3 running`, `1 paused`, `11 stopped` |
| Daemon lauft nicht | `Docker: daemon not running` |
| CLI nicht gefunden | `Docker: not found` |

### github-stats

Ruft GitHub-Benutzerstatistiken ab.

- **Art:** `info_provider`
- **Binary:** `xfetch-plugin-github-stats`
- **Abhangigkeiten:** `curl`-CLI im PATH
- **API-Aufrufe:** 4 Anfragen an api.github.com

**Konfiguration:**

```jsonc
{
    "info_plugins": [{
        "plugin": "github-stats",
        "args": {
            "username": "xscriptor",
            "token": "ghp_your_token_here",
            "max_lines": 3
        }
    }],
    "modules": ["plugin:github-stats"]
}
```

**Argumente:**

| Feld | Erforderlich | Beschreibung |
|-------|----------|-------------|
| `username` | Ja (oder `GITHUB_USER`-Umgebungsvariable) | GitHub-Benutzername |
| `token` | Nein | Persönlicher Zugriffstoken (5.000 Anfragen/Stunde vs. 60 Anfragen/Stunde ohne Authentifizierung) |
| `max_lines` | Nein | Ausgabe auf die ersten N Zeilen begrenzen (1-7) |

**Ausgabezeilen:** Name + Benutzername, Sterne, Repos, PRs, Issues, Follower, Gefolgt

### music-player

Zeigt aktuell wiedergegebene Musik von MPD und/oder Spotify an.

- **Art:** `info_provider`
- **Binary:** `xfetch-plugin-music-player`
- **Abhangigkeiten:** `mpc` (MPD), `playerctl` (Spotify)

**Konfiguration:**

```jsonc
{
    "info_plugins": [{ "plugin": "music-player" }],
    "modules": ["plugin:music-player"]
}
```

**Erkennung:** Pruft sowohl MPD (uber `mpc status`) als auch Spotify (uber `playerctl -p spotify metadata`). Wenn beide aktiv sind, werden Informationen von beiden angezeigt.

### weather

Zeigt aktuelle Wetterbedingungen an.

- **Art:** `info_provider`
- **Binary:** `xfetch-plugin-weather`
- **Abhangigkeiten:** `curl`-CLI im PATH
- **API:** wttr.in (kostenlos, kein API-Schlussel erforderlich)

**Konfiguration:**

```jsonc
{
    "info_plugins": [{
        "plugin": "weather",
        "args": {
            "location": "London",
            "format": "%C|%t|%w|%h|%p"
        }
    }],
    "modules": ["plugin:weather"]
}
```

**Argumente:**

| Feld | Erforderlich | Beschreibung |
|-------|----------|-------------|
| `location` | Nein | Stadtname, Koordinaten oder Flughafencode. Automatische Erkennung per IP, wenn nicht angegeben. |
| `format` | Nein | wttr.in-Formatzeichenkette. Standard: `%C|%t|%w|%h|%p` |

**Ausgabe:** Zustand (Text), Temperatur, Luftfeuchtigkeit, Wind, Niederschlag. Verwendet Wetterzustands-Icons basierend auf dem Nerd Font Wettericon-Set.

### timezone

Zeigt aktuelle Zeit, Datum und Zeitzoneninformationen an.

- **Art:** `info_provider`
- **Binary:** `xfetch-plugin-timezone`

**Konfiguration:**

```jsonc
{
    "info_plugins": [{ "plugin": "timezone" }],
    "modules": ["plugin:timezone"]
}
```

**Argumente:**

| Feld | Erforderlich | Beschreibung |
|-------|----------|-------------|
| `format` | Nein | `date`-Formatzeichenkette. Standard: `%Z %z` (Zeitzonenname + UTC-Offset). |

**Zeitzonenerkennung:** `/etc/timezone` > `/etc/localtime`-Symlink > `timedatectl`

**Ausgabe:** Aktuelle Datums-/Uhrzeitangabe (z. B. "Thursday, 23 July 2026 14:30"), Zeitzonenname und UTC-Offset.

### user-info

Zeigt Benutzerkontoinformationen an.

- **Art:** `info_provider`
- **Binary:** `xfetch-plugin-user-info`
- **Abhangigkeiten:** `id`, `getent`, `groups`-CLI-Tools

**Konfiguration:**

```jsonc
{
    "info_plugins": [{
        "plugin": "user-info",
        "args": { "show_groups": true }
    }],
    "modules": ["plugin:user-info"]
}
```

**Argumente:**

| Feld | Erforderlich | Beschreibung |
|-------|----------|-------------|
| `show_groups` | Nein | Gruppenmitgliedschaften anzeigen (max. 10). Standard: `false`. |

**Ausgabe:** Benutzername, vollständiger Name (aus GECOS), UID, GID, Home-Verzeichnis, Shell und optional Gruppen.

### display-resolution

Erkennt Monitorauflösung und Bildwiederholfrequenz.

- **Art:** `info_provider`
- **Binary:** `xfetch-plugin-display-resolution`

**Konfiguration:**

```jsonc
{
    "info_plugins": [{ "plugin": "display-resolution" }],
    "modules": ["plugin:display-resolution"]
}
```

**Plattformerfassung:**

| Plattform | Methode |
|----------|--------|
| Linux (X11) | `xrandr --current` (Fallback: `xdpyinfo`) |
| Linux (Wayland) | `wlr-randr` |
| macOS | `system_profiler SPDisplaysDataType` |
| Windows | PowerShell `GetDeviceCaps` |

**Ausgabe:** Monitorname, Auflösung und Bildwiederholfrequenz. Mehrere Monitore werden unterstützt.

### theme-detection

Erkennt aktuelle Desktop-Theme-Einstellungen.

- **Art:** `info_provider`
- **Binary:** `xfetch-plugin-theme-detection`
- **Abhangigkeiten:** `gsettings` (GTK)

**Konfiguration:**

```jsonc
{
    "info_plugins": [{ "plugin": "theme-detection" }],
    "modules": ["plugin:theme-detection"]
}
```

**Erkennung:**

| Umgebung | Quelle |
|-------------|--------|
| GTK (GNOME, Budgie, Cinnamon) | `gsettings get org.gnome.desktop.interface` |
| KDE Plasma | `~/.config/plasmarc` und `~/.config/kdeglobals` |

**Ausgabe:** GTK-Theme, Icon-Theme, Cursor-Theme, Schriftart, Farbschema (dunkel/hell) und KDE-Plasma-Theme, falls zutreffend.

## Eigene Plugins schreiben

### Binary-Namenskonvention

```
xfetch-plugin-<name>          (Linux/macOS)
xfetch-plugin-<name>.exe     (Windows)
```

### Minimales Plugin-Skelett (Rust)

```toml
[package]
name = "xfetch-plugin-my-plugin"
version = "0.1.0"
edition = "2024"

[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
xfetch-plugin-api = { git = "https://github.com/xfetch-cli/api", package = "xfetch-plugin-api" }
```

```rust
use xfetch_plugin_api::{
    read_info_plugin_args_or_default,
    write_info_lines,
};

#[derive(Debug, Default, serde::Deserialize)]
struct PluginArgs {}

fn main() {
    let _args = match read_info_plugin_args_or_default::<PluginArgs>() {
        Ok(value) => value,
        Err(err) => {
            eprintln!("{}", err);
            std::process::exit(1);
        }
    };

    if let Err(err) = write_info_lines(vec!["Hello from plugin".to_string()]) {
        eprintln!("{}", err);
        std::process::exit(1);
    }
}
```

### Plugins testen

```bash
# Ein Info-Plugin testen
echo '{"version":1,"kind":"info_provider","args":null}' \
  | ./target/release/xfetch-plugin-my-plugin

# Ein Logo-Animation-Plugin testen
echo '{"version":1,"kind":"logo_animation","lines":["hello"],"args":{"fps":12}}' \
  | ./target/release/xfetch-plugin-my-plugin
```

### Plugin-API-Crate

Das `xfetch-plugin-api`-Crate (Quelle unter `github.com/xfetch-cli/api`) bietet alle Typen und Helfer, die für die Plugin-Entwicklung benötigt werden:

- **Protokolltypen:** `AnimationFrame`, `EmptyArgs`, `InfoPluginRequest`, `InfoPluginResponse`, `LogoAnimationArgs`, `LogoAnimationRequest`, `LogoAnimationResponse`, `PluginKind`
- **Einstiegspunkt-Helfer:** `read_logo_animation_request()`, `read_info_plugin_request()`, `read_info_plugin_args_or_default()`, `write_logo_animation_frames()`, `write_info_lines()`
- **IO-Helfer:** `read_json_from_stdin()`, `write_json_to_stdout()`
- **Fehlertypen:** `PluginApiError`-Enum mit Varianten für Io, Serialize, Deserialize, InvalidProtocolVersion, InvalidPluginKind, InvalidArgs, EmptyAnimationFrames

### Richtlinien

- Plugins auf eine einzige Verantwortung konzentrieren
- Fehler auf stderr schreiben und mit Status ungleich Null beenden
- Keine Anzeige- oder Terminalbibliotheken verwenden (der Kern übernimmt das Rendering)
- Abhängigkeiten minimieren
- Das gemeinsame `xfetch-plugin-api`-Crate für Protokolltypen verwenden
- Netzwerk- oder E/A-Fehler elegant behandeln
