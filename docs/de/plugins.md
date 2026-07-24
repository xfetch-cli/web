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

Jedes Plugin hat eine eigene Referenzseite mit vollstandigen Konfigurationsdetails, Argumenten und Ausgabebeispielen.

| Plugin | Art | Beschreibung |
|--------|------|-------------|
| [animate-logo](plugins/animate-logo.md) | `logo_animation` | Animierte ASCII-Logos mit Farbeffekten (sweep, wave, rainbow, sparkle, breathing, frame) |
| [docker](plugins/docker.md) | `info_provider` | Docker-Container-Statistiken (total, running, paused, stopped) |
| [github-stats](plugins/github-stats.md) | `info_provider` | GitHub-Profilstatistiken (stars, repos, PRs, issues, followers) |
| [music-player](plugins/music-player.md) | `info_provider` | Aktuelle Musikwiedergabe von MPD und/oder Spotify |
| [weather](plugins/weather.md) | `info_provider` | Aktuelles Wetter uber wttr.in (Zustand, Temp, Wind, Luftfeuchtigkeit) |
| [timezone](plugins/timezone.md) | `info_provider` | Ortszeit, Datum, Zeitzonenname und UTC-Offset |
| [user-info](plugins/user-info.md) | `info_provider` | Benutzerkontoinformationen (UID, GID, Home, Shell, Gruppen) |
| [display-resolution](plugins/display-resolution.md) | `info_provider` | Monitorauflosung und Bildwiederholfrequenz (plattformubergreifend) |
| [theme-detection](plugins/theme-detection.md) | `info_provider` | Desktop-Theme-Erkennung (GTK, KDE Plasma) |
| [theme-manager](plugins/theme-manager.md) | `info_provider` | Theme-Registry-Browser und Installer |

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
