# Getting Started with xfetch

xfetch is a cross-platform system information fetching tool written in Rust. It displays details about your operating system, hardware, software, and network in a customizable terminal output with ASCII art or images.

## Quick Install

### Linux and macOS

```bash
curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.sh | bash
```

This installs xfetch to `~/.local/bin/`, copies default configurations to `~/.config/xfetch/`, and optionally adds the binary directory to your PATH.

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
| `--clean-cache` | Clear the cache database |
| `--benchmark` | Print timing information for parallel probes |

### Plugin Subcommands

```
xfetch plugin install <name>      Install a plugin (local path or from repository)
xfetch plugin list                List all installed plugins
xfetch plugin remove <name>       Remove an installed plugin
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
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `XFETCH_PLUGIN_REPO` | Override the default plugin git repository URL |
| `XFETCH_PLUGIN_DEV_DIR` | Override the plugin development directory search path |
| `CARGO_NET_GIT_FETCH_WITH_CLI` | Use git CLI for fetching (set automatically during plugin install) |

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
