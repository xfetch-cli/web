# Advanced Usage

## Benchmark Mode

The `--benchmark` flag displays timing information for the parallel probe phase and total execution:

```bash
xfetch --benchmark
```

Example output:

```
Parallel probes:   127ms
Total time:        189ms
```

Benchmark timing covers:

- **Parallel probes:** GPU detection, package counting, and public IP fetching (run concurrently via `thread::scope`)
- **Total time:** Entire execution including config loading, module gathering, rendering, and output

## Cache System

xfetch caches certain data to improve performance on repeated runs.

### Cache Storage

The cache is stored as a JSON file at:

| Platform | Path |
|----------|------|
| Linux | `~/.cache/xfetch/cache.json` |
| macOS | `~/Library/Caches/xfetch/cache.json` |
| Windows | `%LOCALAPPDATA%/xfetch/cache.json` |

### Cached Data

| Data | TTL | Purpose |
|------|-----|---------|
| Package counts | 5 minutes | Avoid running multiple package manager commands |
| Public IP | 5 minutes | Avoid repeated HTTP requests |

### Managing the Cache

```bash
# Clear all cached data
xfetch --clean-cache
```

### Disabling the Cache

Set `disable_cache: true` in your configuration to disable caching entirely:

```jsonc
{
    "disable_cache": true
}
```

This is useful for environments where system state changes frequently or when you want the most current data on every run.

## Privacy Controls

xfetch provides options to control network access and data collection.

### Disabling Public IP Fetching

The `public_ip` module makes an HTTP request to an external service. To disable this for privacy:

```jsonc
{
    "disable_ip_fetching": true
}
```

When enabled, the `public_ip` module will return "Disabled" instead of attempting to fetch the IP address.

The plugin-based weather module also makes external API calls. To disable it, simply remove the plugin from your configuration.

### Network Dependencies by Module

| Module | Network Access | External Service |
|--------|---------------|------------------|
| `public_ip` | Yes | ifconfig.me, api.ipify.org, icanhazip.com |
| `plugin:weather` | Yes (if installed) | wttr.in |
| `plugin:github-stats` | Yes (if installed) | api.github.com |
| All other modules | No | N/A |

## Cross-Platform Behavior

xfetch automatically adapts to the operating system.

### Platform-Specific Module Behavior

| Module | Linux | macOS | Windows |
|--------|-------|-------|---------|
| GPU | `lspci -mm` | `system_profiler SPDisplaysDataType` | `wmic` or PowerShell |
| Battery | `/sys/class/power_supply/BAT*` | `pmset -g batt` | `wmic path Win32_Battery` |
| Shell | `$SHELL` | `$SHELL` | Parent process chain walk |
| Datetime | `date` command | `date` command | PowerShell |
| Packages | pacman, dpkg, rpm, flatpak, snap, apk, nix-env | brew | scoop, winget |
| Config path | `~/.config/xfetch/` | `~/Library/Application Support/xfetch/` | `%APPDATA%/xfetch/` |
| Cache path | `~/.cache/xfetch/` | `~/Library/Caches/xfetch/` | `%LOCALAPPDATA%/xfetch/` |
| Binary name | `xfetch-plugin-<name>` | `xfetch-plugin-<name>` | `xfetch-plugin-<name>.exe` |

### Fallback Chains

xfetch uses graceful fallback chains for platform-specific features:

1. **GPU detection:** Primary command > fallback command > "Unknown"
2. **Battery detection:** Primary path > fallback command > "N/A"
3. **Display resolution (plugin):** xrandr > wlr-randr > xdpyinfo (Linux); system_profiler (macOS); PowerShell (Windows)
4. **Timezone (plugin):** `/etc/timezone` > `/etc/localtime` symlink > `timedatectl`

### Terminal Support

- **Color output:** All ANSI-capable terminals
- **Image logos:** iTerm2, Kitty, or Sixel-compatible terminals
- **ASCII logos:** All terminals
- **Animation:** Requires TTY. Falls back to static display in pipes or non-TTY contexts.

## Daemon Mode

Daemon mode pins an animated fetch at the top of the terminal and keeps looping it in the background, so the shell prompt stays usable below it.

```bash
xfetch --daemon      # start the daemon
xfetch --daemon-stop # stop it
```

The animation only runs in TTY terminals; on pipes or redirects the static logo is shown. Daemon mode requires a `logo_animation` block with a plugin (e.g. `animate-logo`). In daemon mode the animation loops indefinitely — `duration_ms` and `loop` are ignored. To play a finite animation that stops on its own, keep daemon mode off.

> **Note:** Both the animated daemon and the live stats daemon are **Unix-only** (Linux/macOS). On Windows they are not supported and print an error message.

### Live Stats Daemon

The live stats daemon (`daemon_live`) pins a fetch block at the top of the terminal and re-probes a lightweight module subset every `daemon_live_refresh` seconds. It is a sibling of the animated daemon above — the existing animated daemon is untouched. Config keys: `daemon_live`, `daemon_live_refresh`, `daemon_live_modules`, `daemon_live_reload` (hot-reload the config and the active theme).

```bash
xfetch --no-daemon-live     # disable the live daemon even if enabled in config
xfetch --daemon-live-stop   # stop the running live daemon
xfetch --daemon-live-reload # force hot reload
```

## WSL Presentation

On Windows Subsystem for Linux, the OS line can be decorated with WSL details via `os_wsl_style` (Linux only):

| Value | Behavior |
|-------|----------|
| `off` | Plain OS name, no decoration |
| `minimal` | Appends `(WSL)` (default) |
| `full` | Appends the WSL version and WSLg if present |

## Intro Effects

`xfetch effects` installs, lists, and removes intro effects that animate the content lines when the fetch starts. The `effects` config key (a single effect or a list) selects which effects play and in what order:

```bash
xfetch effects install <name>   # install an effect
xfetch effects list             # list installed effects
xfetch effects remove <name>    # remove an effect
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

See the [Effects](effects.md) page for the full protocol, configuration fields, and how to write custom effects.

## Performance Optimization

xfetch employs several performance optimizations:

### Parallel Probing

The following probes run concurrently using Rust's `thread::scope`:

- GPU detection
- Package counting
- Public IP fetching

This reduces total execution time by running I/O-bound operations in parallel.

### Lazy Initialization

System resources are initialized only when the corresponding module is requested:

- `sysinfo::System` (CPU, memory, disks, networks) -- initialized lazily
- `sysinfo::Disks` -- initialized only if a disk module is configured
- `sysinfo::Networks` -- initialized only if a network module is configured
- `sysinfo::Components` -- initialized only if temperature modules were configured

### Caching

Package counts and public IP lookups are cached with TTLs to avoid redundant system calls and network requests.

## Environment Variables Reference

| Variable | Description | Used By |
|----------|-------------|---------|
| `USER` / `LOGNAME` | Current username | Core modules (`user`) |
| `SHELL` | Current shell path | Core modules (`shell`) |
| `HOME` | Home directory path | Core modules, plugin discovery |
| `TERM_PROGRAM` | Terminal emulator name | Core modules (`terminal`) |
| `TERM` | Terminal type | Core modules (`terminal`) |
| `WT_SESSION` | Windows Terminal session | Core modules (`terminal`) |
| `XDG_CURRENT_DESKTOP` | Desktop environment | Core modules (`wm`) |
| `DESKTOP_SESSION` | Desktop session name | Core modules (`wm`) |
| `XFETCH_PLUGIN_REPO` | Plugin repository URL | Plugin installation |
| `XFETCH_PLUGIN_DEV_DIR` | Plugin development directory | Plugin discovery |
| `GITHUB_USER` | GitHub username | github-stats plugin |
| `CARGO_NET_GIT_FETCH_WITH_CLI` | Force git CLI fetch | Plugin builds |
