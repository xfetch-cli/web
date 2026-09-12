# Plugins Index

xfetch provides a set of official plugins for additional functionality.

## Info Provider Plugins

- [docker](docker) — Docker container statistics
- [github-stats](github-stats) — GitHub user statistics
- [music-player](music-player) — Currently playing music (MPD / Spotify)
- [weather](weather) — Current weather conditions via wttr.in
- [timezone](timezone) — Timezone, date, and UTC offset
- [user-info](user-info) — User account information
- [display-resolution](display-resolution) — Monitor resolution and refresh rate
- [theme-detection](theme-detection) — Desktop theme detection (GTK / KDE)
- [theme-manager](theme-manager) — Theme registry browser and installer
- [chocolatey](chocolatey) — Chocolatey package count (Windows)
- [temperature](temperature) — CPU/SoC temperature from kernel thermal zones

## Logo Animation Plugins

- [animate-logo](animate-logo) — Animated ASCII logos with color effects

## WebAssembly Plugins

Sandboxed guests compiled to WebAssembly, each with a manifest that declares its capabilities and limits; see [WebAssembly Guests](../wasm.md).

- [wasm-crypto](wasm-crypto) — Crypto spot prices via the allowlisted Coinbase API (Rust)
- [wasm-ip-geo](wasm-ip-geo) — Public IP, location, network and timezone (Python component)
- [wasm-pacman](wasm-pacman) — Repository and AUR package counts (Go)
- [wasm-proc](wasm-proc) — Load average, memory and uptime from /proc (C)

## Install a Plugin

From the default remote repository:

```bash
xfetch plugin install animate-logo
```

By default, `xfetch plugin install <name>` fetches plugins from `https://github.com/xfetch-cli/plugins.git`.

Installed binaries live in `~/.config/xfetch/plugins/` (Linux/macOS) or `%APPDATA%/xfetch/plugins/` (Windows).

See [Platform Compatibility](https://github.com/xfetch-cli/plugins/blob/main/docs/compatibility.md) for which plugins work on Linux, macOS and Windows.

