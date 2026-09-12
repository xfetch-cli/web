# Plugin-Index

xfetch bietet eine Reihe offizieller Plugins für zusätzliche Funktionalität.

## Info-Provider-Plugins

- [docker](docker) — Docker-Container-Statistiken
- [github-stats](github-stats) — GitHub-Benutzerstatistiken
- [music-player](music-player) — Aktuelle Musikwiedergabe (MPD / Spotify)
- [weather](weather) — Aktuelle Wetterbedingungen via wttr.in
- [timezone](timezone) — Zeitzone, Datum und UTC-Offset
- [user-info](user-info) — Benutzerkontoinformationen
- [display-resolution](display-resolution) — Monitorauflösung und Bildwiederholrate
- [theme-detection](theme-detection) — Desktop-Theme-Erkennung (GTK / KDE)
- [theme-manager](theme-manager) — Theme-Registry-Browser und -Installierer
- [chocolatey](chocolatey) — Chocolatey-Paketzahl (Windows)
- [temperature](temperature) — CPU/SoC-Temperatur aus den thermischen Zonen des Kernels

## Logo-Animation-Plugins

- [animate-logo](animate-logo) — Animierte ASCII-Logos mit Farbeffekten

## WebAssembly-Plugins

Sandboxed Gaeste, nach WebAssembly kompiliert, jeweils mit Manifest fuer Faehigkeiten und Limits; siehe [WebAssembly-Gaeste](../wasm.md).

- [wasm-crypto](wasm-crypto) — Krypto-Spotpreise ueber die erlaubte Coinbase-API (Rust)
- [wasm-ip-geo](wasm-ip-geo) — Oeffentliche IP, Standort, Netzwerk und Zeitzone (Python-Komponente)
- [wasm-pacman](wasm-pacman) — Repository- und AUR-Paketzahlen (Go)
- [wasm-proc](wasm-proc) — Load Average, Speicher und Uptime aus /proc (C)

## Ein Plugin installieren

Aus dem Standard-Repository:

```bash
xfetch plugin install animate-logo
```

Standardmäßig bezieht `xfetch plugin install <name>` Plugins von `https://github.com/xfetch-cli/plugins.git`.

Installierte Binärdateien liegen in `~/.config/xfetch/plugins/` (Linux/macOS) bzw. `%APPDATA%/xfetch/plugins/` (Windows).

Siehe [Plattform-Kompatibilität](https://github.com/xfetch-cli/plugins/blob/main/docs/compatibility.md), welche Plugins unter Linux, macOS und Windows funktionieren.

