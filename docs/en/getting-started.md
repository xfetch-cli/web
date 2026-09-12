# Getting Started with xfetch

xfetch is a cross-platform system information fetching tool written in Rust. It displays details about your operating system, hardware, software, and network in a customizable terminal output with ASCII art or images.

## Quick Install

### Linux and macOS

```bash
curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.sh | bash
```

This installs xfetch to `~/.local/bin/`, generates a first configuration at `~/.config/xfetch/config.jsonc` with `xfetch --gen-config`, and optionally adds the binary directory to your PATH.

To customize the installation path:

```bash
curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.sh | bash -s -- --prefix ~/myapps
```

Flags:

| Flag | Description |
|------|-------------|
| `--local` | Use the local repository instead of cloning |
| `--prefix <dir>` | Installation prefix (default: `~/.local`) |
| `--bin-dir <dir>` | Binary directory (default: `~/.local/bin`) |
| `--config-dir <dir>` | Configuration directory (default: `~/.config/xfetch`) |
| `--no-modify-path` | Do not add bin directory to PATH in shell rc |
| `--yes` | Automatic yes to all prompts |
| `--skip-config` | Skip copying default configuration |
| `--no-cargo-install` | Use a pre-built binary instead of building with Cargo |
| `--install-deps` | Install missing system dependencies automatically |

### Windows (PowerShell)

```powershell
irm https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.ps1 | iex
```

### Manual Build from Source

```bash
git clone https://github.com/xfetch-cli/xfetch.git
cd xfetch
cargo build --release
cp target/release/xfetch ~/.local/bin/
```

### Arch Linux (AUR)

xfetch is available in the AUR as `xfetch-git`. Build and install with makepkg or your preferred AUR helper:

```bash
git clone https://aur.archlinux.org/xfetch-git.git
cd xfetch-git
makepkg -si
```
### Package Managers

xfetch is available through Homebrew:

```bash
brew tap xfetch-cli/tap
brew install xfetch
```

From crates.io:

```bash
cargo install xfetch-cli
```

From the repository PKGBUILD:

```bash
git clone https://github.com/xfetch-cli/xfetch.git
cd xfetch
makepkg -si
```



## First Run

After installation, simply run:

```bash
xfetch
```

You should see system information displayed alongside an ASCII logo, resembling this structure:

```
__  __                               OS: Arch Linux x86_64
  \ \/ /                             Kernel: 6.6.87.2-arch1-1
   \  /                              Uptime: 2 hours, 15 mins
   /  \                              Packages: 657 (pacman)
  /_/\_\                             WM: Hyprland
 /____/linux                         Shell: zsh
---------BEGIN PUBLIC KEY----------   CPU: Intel(R) Core(TM) i5-7400 @ 3.00GHz (4)
...                                  GPU: NVIDIA GeForce RTX 3060
----------END PUBLIC KEY-----------   Memory: 3.10 GiB / 7.74 GiB (40%)
                                     Disk: 120.5 GiB / 256 GiB (47%) - ext4
                                     Battery: 85% [Charging]
```

## Command-Line Interface

### Global Flags

| Flag | Description |
|------|-------------|
| `-c, --config <PATH>` | Path to a custom configuration file (JSONC format) |
| `--gen-config` | Generate a default configuration file at the standard config path |
| `--layout <name>` | Layout to use with `--gen-config` (default: `section`) |
| `--logo <id>` | Logo id (e.g. `arch`, `windows-11`) to use with `--gen-config` (requires network access to the logos catalog) |
| `--clean-cache` | Clear the cache database |
| `--benchmark` | Print timing information for parallel probes |
| `--daemon` | Start the animated daemon |
| `--daemon-stop` | Stop the daemon |
| `--no-daemon-live` | Disable the live stats daemon even if enabled in config |
| `--daemon-live-stop` | Stop the running live stats daemon |
| `--daemon-live-reload` | Force hot reload in the live stats daemon |

### Plugin Subcommands

```
xfetch plugin install <name>      Install a plugin (local path or from repository)
xfetch plugin list                List all installed plugins
xfetch plugin remove <name>       Remove an installed plugin
```

### Extension Subcommands

```
xfetch extension install <name>   Install an extension (local path or from repository)
xfetch extension list             List all installed extensions
xfetch extension remove <name>    Remove an installed extension
```

### Theme Subcommands

```
xfetch theme list                 List installed themes
xfetch theme set <name>           Activate a theme (sets the "theme" field in config.jsonc)
xfetch theme remove <name>        Remove a theme file
xfetch theme export <name>        Export the current visual config as a theme file
```

### Effects Subcommands

```
xfetch effects install <name>     Install an intro effect
xfetch effects list               List installed effects
xfetch effects remove <name>      Remove an effect
```

### Update Subcommand

```
xfetch update                     Check for and install a newer release
xfetch update --check             Only report; exit 1 when an update exists
xfetch update --prebuilt          Force the in-place prebuilt update (Unix)
xfetch update --bin-dir <dir>     Directory holding the binary with --prebuilt
xfetch update --yes               Skip the confirmation prompt
```

### Usage Examples

```bash
# Run with default configuration
xfetch

# Run with a custom configuration
xfetch --config ~/.config/xfetch/my-config.jsonc

# Generate a default configuration
xfetch --gen-config

# Run in benchmark mode
xfetch --benchmark

# Clear cached data
xfetch --clean-cache

# Install a plugin
xfetch plugin install animate-logo

# List installed plugins
xfetch plugin list

# Remove a plugin
xfetch plugin remove docker

# Check for a newer release
xfetch update --check

# Update to the latest release
xfetch update
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `XFETCH_PLUGIN_REPO` | Override the default plugin git repository URL |
| `XFETCH_PLUGIN_DEV_DIR` | Override the plugin development directory search path |
| `XFETCH_LOGOS_URL` | Override the logos catalog URL (used by `--logo` with `--gen-config`) |
| `XFETCH_EFFECT_REPO` | Override the effects git repository URL |
| `XFETCH_WASM_LOG_LEVEL` | WebAssembly guest log threshold: `off`, `error`, `warn` (default), `info`, `debug` |
| `XFETCH_UPDATE_API` | Override the GitHub API endpoint used by `xfetch update` (mirrors) |
| `CARGO_NET_GIT_FETCH_WITH_CLI` | Use git CLI for fetching (set automatically during plugin install) |

## Updating

xfetch can check for and install newer releases itself:

```bash
xfetch update --check   # only report; exits 1 when a newer release exists
xfetch update           # install the newest release
xfetch update --yes     # skip the confirmation prompt
```

The command detects how the binary was installed first:

- Prebuilt installs (`install-prebuilt.sh`, usually `~/.local/bin`): the release asset is downloaded, verified against `SHA256SUMS`, extracted and moved over the current executable atomically. A single `xfetch.bak` keeps the previous binary.
- `cargo install` binaries: updated with `cargo install xfetch-cli --force --locked`.
- Package-manager installs and local builds: never replaced; the command prints the right command instead.

`xfetch update --prebuilt --bin-dir <dir>` forces the in-place update of `<dir>/xfetch` (Unix only). On Windows the prebuilt path is not available yet; use `cargo install xfetch-cli --force`.

## Uninstallation

### Quick Uninstall

```bash
curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/uninstall.sh | bash
```

### Manual Uninstall

```bash
rm ~/.local/bin/xfetch
rm -rf ~/.config/xfetch
```

Then remove any PATH modifications from your shell rc file if the installer added them.
