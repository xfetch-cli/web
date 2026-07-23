# Plugins

xfetch has a plugin system that allows extending functionality through standalone executables. Plugins communicate with the core via a JSON protocol over stdin/stdout.

## Architecture Overview

Plugins are standalone executables named `xfetch-plugin-<name>` (or `xfetch-plugin-<name>.exe` on Windows). They are spawned as child processes by the xfetch core.

```
xfetch core  --->  stdin (JSON request)     --->  plugin process
xfetch core  <---  stdout (JSON response)   <---  plugin process
xfetch core  <---  stderr (error messages)  <---  plugin process
```

### Plugin Kinds

There are two types of plugins:

| Kind | Identifier | Purpose |
|------|------------|---------|
| Logo Animation | `logo_animation` | Animates ASCII logos with color effects |
| Info Provider | `info_provider` | Returns system or external information lines |

## JSON Wire Protocol

**Protocol Version:** 1

### Info Provider Protocol

Request:

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

The `args` field contains plugin-specific arguments from the configuration. If no arguments are configured, `args` is `null`.

Response:

```json
{
    "lines": [
        "\uf09b X (@xscriptor)",
        "\uf005 114 stars",
        "\uf441 33 repos"
    ]
}
```

### Logo Animation Protocol

Request:

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

The `lines` field contains the current ASCII logo. The `frames` field contains optional pre-loaded frame sets. The `args` field contains animation parameters.

Response:

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

Each frame has a `delay_ms` (how long to display the frame) and `lines` (the frame content, potentially with ANSI escape codes for colors).

### Error Handling

Plugins must write error messages to stderr and exit with a non-zero status code on failure.

## Plugin Discovery

When executing a plugin, xfetch searches for the binary in this order:

1. **Explicit path:** If the plugin name contains a path separator, use it as a direct file path
2. **PATH:** Search `$PATH` for `xfetch-plugin-<name>`
3. **User plugin directory:** `~/.config/xfetch/plugins/` (Linux/macOS) or `%APPDATA%/xfetch/plugins/` (Windows)
4. **Workspace target directories:** Various paths relative to the current working directory, including `./plugins/<name>/target/release/`
5. **Development directories:** Ancestor directory searches for development setups

## Plugin Installation

```bash
# Install from a local directory
xfetch plugin install ./my-plugin

# Install from the official plugin repository
xfetch plugin install animate-logo

# Install from a custom git repository
xfetch plugin install my-plugin --repo https://github.com/user/plugins.git
```

### Install Process

1. If the plugin name is a local path, use it directly
2. Otherwise, search locally in `./<name>/`, `./plugins/<name>/`, or `./plugins/plugins/<name>/`
3. If not found locally, clone the plugin repository (`https://github.com/xfetch-cli/plugins.git` by default)
4. Run `cargo build --release` in the plugin directory
5. Copy the built binary to `~/.config/xfetch/plugins/xfetch-plugin-<name>`

### Plugin Management

```bash
# List installed plugins
xfetch plugin list

# Remove a plugin
xfetch plugin remove animate-logo
```

## Official Plugins

### animate-logo

Animates ASCII logos with various color effects.

- **Kind:** `logo_animation`
- **Binary:** `xfetch-plugin-animate-logo`

**Configuration:**

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

**Animation styles:**

| Style | Description |
|-------|-------------|
| `sweep` | Colors sweep left-to-right across characters (6-color ANSI palette) |
| `wave` | Sine-wave color pattern across the logo |
| `rainbow` | Full RGB gradient shifting over time (24-bit color) |
| `sparkle` | Random characters light up in bright colors |
| `breathing` | All characters fade in and out in warm amber tones |
| `frame` | Cycles through pre-loaded ASCII frame sets |
| `none` | No coloring, displays logo as-is |

### docker

Displays Docker container statistics.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-docker`
- **Dependencies:** Docker CLI (`docker` command in PATH)

**Configuration:**

```jsonc
{
    "info_plugins": [{ "plugin": "docker" }],
    "modules": ["plugin:docker"]
}
```

**Output:**

| State | Example |
|-------|---------|
| Daemon running | `Containers: 15 total`, `3 running`, `1 paused`, `11 stopped` |
| Daemon not running | `Docker: daemon not running` |
| CLI not found | `Docker: not found` |

### github-stats

Fetches GitHub user statistics.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-github-stats`
- **Dependencies:** `curl` CLI in PATH
- **API calls:** 4 requests to api.github.com

**Configuration:**

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

**Arguments:**

| Field | Required | Description |
|-------|----------|-------------|
| `username` | Yes (or `GITHUB_USER` env) | GitHub username |
| `token` | No | Personal access token (5,000 req/hr vs 60 req/hr unauthenticated) |
| `max_lines` | No | Truncate output to first N lines (1-7) |

**Output lines:** Name + username, Stars, Repos, PRs, Issues, Followers, Following

### music-player

Displays currently playing music from MPD and/or Spotify.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-music-player`
- **Dependencies:** `mpc` (MPD), `playerctl` (Spotify)

**Configuration:**

```jsonc
{
    "info_plugins": [{ "plugin": "music-player" }],
    "modules": ["plugin:music-player"]
}
```

**Detection:** Checks both MPD (via `mpc status`) and Spotify (via `playerctl -p spotify metadata`). If both are active, information from both is shown.

### weather

Displays current weather conditions.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-weather`
- **Dependencies:** `curl` CLI in PATH
- **API:** wttr.in (free, no API key required)

**Configuration:**

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

**Arguments:**

| Field | Required | Description |
|-------|----------|-------------|
| `location` | No | City name, coordinates, or airport code. Auto-detects by IP if omitted. |
| `format` | No | wttr.in format string. Default: `%C|%t|%w|%h|%p` |

**Output:** Condition (text), temperature, humidity, wind, precipitation. Uses weather condition icons based on the Nerd Font weather icon set.

### timezone

Displays current time, date, and timezone information.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-timezone`

**Configuration:**

```jsonc
{
    "info_plugins": [{ "plugin": "timezone" }],
    "modules": ["plugin:timezone"]
}
```

**Arguments:**

| Field | Required | Description |
|-------|----------|-------------|
| `format` | No | `date` format string. Default: `%Z %z` (timezone name + UTC offset). |

**Timezone detection:** `/etc/timezone` > `/etc/localtime` symlink > `timedatectl`

**Output:** Current datetime (e.g., "Thursday, 23 July 2026 14:30"), timezone name, and UTC offset.

### user-info

Displays user account information.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-user-info`
- **Dependencies:** `id`, `getent`, `groups` CLI tools

**Configuration:**

```jsonc
{
    "info_plugins": [{
        "plugin": "user-info",
        "args": { "show_groups": true }
    }],
    "modules": ["plugin:user-info"]
}
```

**Arguments:**

| Field | Required | Description |
|-------|----------|-------------|
| `show_groups` | No | Show group memberships (max 10). Default: `false`. |

**Output:** Username, full name (from GECOS), UID, GID, home directory, shell, and optionally groups.

### display-resolution

Detects monitor resolution and refresh rate.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-display-resolution`

**Configuration:**

```jsonc
{
    "info_plugins": [{ "plugin": "display-resolution" }],
    "modules": ["plugin:display-resolution"]
}
```

**Platform detection:**

| Platform | Method |
|----------|--------|
| Linux (X11) | `xrandr --current` (fallback: `xdpyinfo`) |
| Linux (Wayland) | `wlr-randr` |
| macOS | `system_profiler SPDisplaysDataType` |
| Windows | PowerShell `GetDeviceCaps` |

**Output:** Monitor name, resolution, and refresh rate. Multiple monitors are supported.

### theme-detection

Detects current desktop theme settings.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-theme-detection`
- **Dependencies:** `gsettings` (GTK)

**Configuration:**

```jsonc
{
    "info_plugins": [{ "plugin": "theme-detection" }],
    "modules": ["plugin:theme-detection"]
}
```

**Detection:**

| Environment | Source |
|-------------|--------|
| GTK (GNOME, Budgie, Cinnamon) | `gsettings get org.gnome.desktop.interface` |
| KDE Plasma | `~/.config/plasmarc` and `~/.config/kdeglobals` |

**Output:** GTK theme, icon theme, cursor theme, font, color scheme (dark/light), and KDE Plasma theme if applicable.

## Writing Custom Plugins

### Binary Naming Convention

```
xfetch-plugin-<name>          (Linux/macOS)
xfetch-plugin-<name>.exe     (Windows)
```

### Minimal Plugin Skeleton (Rust)

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

### Testing Plugins

```bash
# Test an info plugin
echo '{"version":1,"kind":"info_provider","args":null}' \
  | ./target/release/xfetch-plugin-my-plugin

# Test a logo animation plugin
echo '{"version":1,"kind":"logo_animation","lines":["hello"],"args":{"fps":12}}' \
  | ./target/release/xfetch-plugin-my-plugin
```

### Plugin API Crate

The `xfetch-plugin-api` crate (source at `github.com/xfetch-cli/api`) provides all the types and helpers needed for plugin development:

- **Protocol types:** `AnimationFrame`, `EmptyArgs`, `InfoPluginRequest`, `InfoPluginResponse`, `LogoAnimationArgs`, `LogoAnimationRequest`, `LogoAnimationResponse`, `PluginKind`
- **Entrypoint helpers:** `read_logo_animation_request()`, `read_info_plugin_request()`, `read_info_plugin_args_or_default()`, `write_logo_animation_frames()`, `write_info_lines()`
- **IO helpers:** `read_json_from_stdin()`, `write_json_to_stdout()`
- **Error types:** `PluginApiError` enum with variants for Io, Serialize, Deserialize, InvalidProtocolVersion, InvalidPluginKind, InvalidArgs, EmptyAnimationFrames

### Guidelines

- Keep plugins focused on a single responsibility
- Write errors to stderr and exit with non-zero status
- Do not use display or terminal libraries (the core handles rendering)
- Minimize dependencies
- Use the shared `xfetch-plugin-api` crate for protocol types
- Handle network or I/O failures gracefully
