# Mitwirken

## Aus dem Quellcode bauen

xfetch ist in Rust (Edition 2024) geschrieben. Um aus dem Quellcode zu bauen, benotigen Sie Rust (installieren Sie es uber `rustup` auf rust-lang.org).

### Voraussetzungen

- Rust-Toolchain (Edition 2024)
- Cargo (im Rust-Umfang enthalten)

### Klonen und Bauen

```bash
git clone https://github.com/xfetch-cli/xfetch.git
cd xfetch
cargo build --release
```

Das Binary wird unter `target/release/xfetch` abgelegt.

### Aus dem Quellcode installieren

```bash
cargo install --path .
```

Dies installiert das Binary nach `~/.cargo/bin/xfetch`.

## Projektstruktur

Das xfetch-Okosystem ist als Multi-Repository-Architektur unter der GitHub-Organisation `xfetch-cli` organisiert:

```
xfetch/
  api/              # Plugin API SDK (Rust Crate)
  assets/           # Logo- und Banner-Assets
  configs/          # Offentliche Preset-Konfigurationen
  plugins/          # Offizielle Plugin-Implementierungen (Workspace)
  web/              # Landingpage (Next.js)
  xfetch/           # Haupt-CLI-Anwendung (Rust)
```

### Haupt-CLI (`xfetch/`)

```
xfetch/
  src/
    main.rs           # Einstiegspunkt
    cli.rs            # CLI-Argument-Parsing (clap)
    config.rs         # JSONC-Konfigurationsladen
    cache.rs          # Daten-Caching mit TTL
    ui.rs             # Render-Orchestrator
    ui/
      nodes.rs        # Render-Baum-Vorbereitung
      layout.rs       # Layout-Verteilung
      logo.rs         # Logo-Laden (ASCII, Bild)
      print.rs        # Terminal-Ausgabe-Rendering
      renders.rs      # Layout-Render-Implementierungen
      x.rs            # Pfaderweiterungs-Hilfsfunktionen
    info/
      mod.rs          # Info-Struktur und Orchestrierung
      system.rs       # OS-, Kernel-, Netzwerkinfo
      software.rs     # Shell-, Terminal-, Paket-, Benutzerinfo
      hardware.rs     # CPU-, GPU-, Speicher-, Festplatten-, Akkuinfo
    plugins/
      mod.rs          # Plugin-Erkennung und -Benennung
      install.rs      # Plugin-Installation
      manage.rs       # Plugin-Auflistung und -Entfernung
      run.rs          # Plugin-Ausfuhrung
```

### Plugin-API (`api/`)

```
api/
  crates/
    plugin-api/
      src/
        lib.rs        # Offentliche Re-Exports
        protocol.rs   # Drahtprotokoll-Typen
        entrypoints.rs # Plugin-Einstiegspunkt-Helfer
        io.rs         # JSON-stdin/stdout-Helfer
        error.rs      # Fehlertypen
```

### Offizielle Plugins (`plugins/`)

```
plugins/
  plugins/
    animate-logo/       # Logo-Animation-Plugin
    display-resolution/ # Monitorauflosungs-Plugin
    docker/             # Docker-Statistik-Plugin
    github-stats/       # GitHub-Profil-Plugin
    music-player/       # MPD- und Spotify-Plugin
    theme-detection/    # GTK-/KDE-Theme-Plugin
    timezone/           # Zeitzonen-Plugin
    user-info/          # Benutzerkonto-Plugin
    weather/            # Wetter-Plugin
```

## Entwicklungsworkflow

### Tests ausfuhren

```bash
# Alle Tests ausfuhren
cd xfetch
cargo test

# Tests mit Ausgabe ausfuhren
cargo test -- --nocapture

# Einen bestimmten Test ausfuhren
cargo test test_name
```

### Code-Qualitat

```bash
# Lint
cargo clippy

# Formatieren
cargo fmt

# Prufen (schnelle Kompilierung, kein Binary)
cargo check
```

### Plugins testen

```bash
# Ein Info-Plugin uber das JSON-Protokoll testen
echo '{"version":1,"kind":"info_provider","args":null}' \
  | ./target/release/xfetch-plugin-my-plugin

# Ein Logo-Animation-Plugin testen
echo '{"version":1,"kind":"logo_animation","lines":["hello"],"args":{"fps":12}}' \
  | ./target/release/xfetch-plugin-my-plugin
```

## Plugins schreiben

### Namenskonvention

Plugin-Binaries mussen der Namenskonvention `xfetch-plugin-<name>` folgen, damit der Kern sie finden kann.

### Plugin-Protokoll

Plugins kommunizieren mit dem xfetch-Kern uber ein JSON-Protokoll uber stdin/stdout:

1. Der Kern schreibt eine JSON-Anfrage in das stdin des Plugins
2. Das Plugin verarbeitet die Anfrage
3. Das Plugin schreibt eine JSON-Antwort auf stdout
4. Bei einem Fehler schreibt das Plugin auf stderr und beendet sich mit einem Status ungleich Null

### Minimales Info-Plugin-Skelett

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

    let lines = vec!["Hello from plugin".to_string()];

    if let Err(err) = write_info_lines(lines) {
        eprintln!("{}", err);
        std::process::exit(1);
    }
}
```

### Cargo.toml fur Plugins

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

### Plugin-Standards

- Den gesamten Code und die Dokumentation in Englisch verfassen
- Das gemeinsame `xfetch-plugin-api`-Crate fur Protokolltypen verwenden
- Fehler explizit behandeln -- auf stderr schreiben und mit Status ungleich Null beenden
- Keine Anzeige- oder Terminalbibliotheken verwenden (der Kern ubernimmt das Rendering)
- Plugins auf eine einzige Verantwortung konzentrieren
- Abhangigkeiten minimieren
- Netzwerk- oder E/A-Fehler elegant mit informativen Meldungen behandeln

## Pull-Request-Prozess

1. Forken Sie das Repository und erstellen Sie einen Feature-Branch
2. Implementieren Sie Ihre Anderungen gemaa den Codierungsstandards
3. Stellen Sie sicher, dass `cargo build --release` erfolgreich ist
4. Fugen Sie Tests fur neue Funktionen hinzu
5. Fuhren Sie `cargo test` aus, um zu uberprufen, dass alle Tests bestanden werden
6. Reichen Sie einen Pull-Request mit einer klaren Beschreibung Ihrer Anderungen ein

## Tests

### Testkategorien

| Kategorie | Ort | Beschreibung |
|----------|----------|-------------|
| Unit-Tests | In jeder Quelldatei | Tests fur einzelne Funktionen |
| Integrationstests | `src/`-Submodule | Tests fur Modulinteraktionen |
| Plugin-Protokoll-Tests | `api/crates/plugin-api/src/protocol.rs` | Serialisierungs- und Validierungstests |

### Vorhandene Testabdeckung

- Cache-System: set/get, Ablauf, fehlende Schlussel, Bereinigung
- Konfigurations-Parsing: Modulbaum, Injektionspravention
- Layout-Rendering: klassisch, side-block, Baum, leere Falle
- Logo-Laden: Standard-Logo, Pfaderweiterung
- Info-Module: Hostname, Akku, GPU, Pakete, OS, Kernel, Uptime, Datum/Uhrzeit, Benutzer, Desktop
- Plugin-System: Benennung, Binary-Erkennung, Kandidatenverzeichnisse

## Sicherheit

- Melden Sie Sicherheitslucken an `x@xscriptor.com`
- Antwortziel: innerhalb von 7 Tagen
- Legen Sie keine Geheimnisse oder Token in Plugin-Argumenten in der Versionskontrolle offen
- Verwenden Sie Umgebungsvariablen oder sichere Konfiguration fur sensible Daten

## Lizenz

xfetch ist unter der MIT-Lizenz lizenziert. Durch Ihren Beitrag stimmen Sie zu, dass Ihre Beitrage unter derselben Lizenz lizenziert werden.
