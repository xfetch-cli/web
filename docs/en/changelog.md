# Changelog
# Changelog

## v0.8.0 · Crates.io Install, Slimmer Dependencies & HTTPS Public IP · 2026-08-21

- **crates.io:** `cargo install xfetch-cli` is now supported
- **Dependency tree slimming:** removed the AVIF encoder chain (`ravif`/`rav1e`/`rayon`) — 196 → 133 crates, zero vulnerabilities; `image` codecs limited to what the logo renderer uses; API crates pinned to a fixed commit
- **Public IP over HTTPS:** public IP probes now use TLS (Mozilla roots) with strict `IpAddr` validation, a 64-byte body cap and no redirects
- **Logo catalog hardening:** fetched logo art rejects ANSI escape sequences and control characters, falling back to the default logo
- 147 tests, clippy clean

## v0.7.0 · Configurable Labels and Value Formats · 2026-08-20

- **`labels` config map:** renames the key shown per module in every layout; an empty string hides the key (icon-only row); colors keep using the raw module key
- **`formats` config map:** value templates with `{field}` placeholders per module — CPU `{brand}`/`{model}`/`{cores}`/`{freq}`, GPU `{name}`/`{vendor}`/`{model}`/`{vram}`, memory/swap `{used}`/`{total}`/`{percent}`, disk `{fs}`, os `{distro}`/`{version}`/`{arch}`/`{wsl}`, packages one field per manager plus `{count}`/`{manager}`/`{managers}`, battery `{percent}`/`{state}`, uptime `{days}`/`{hours}`/`{mins}`, datetime `{date}`/`{time}`; unknown fields render empty, `{{`/`}}` escape literal braces
- **Battery fix (Linux):** peripheral batteries (e.g. Logitech HID++) are no longer counted as system batteries
- 141 tests, clippy clean


## v0.7.0 · Configurable Labels & Value Formats · 2026-08-20

- **`labels` map:** rename the row key per module (`"cpu": "processor"`) or hide it with an empty string (icon-only row) — works in every layout (classic and variants, compact, minimal, section, section-box, tree, custom-x)
- **`formats` map:** replace a module's value with a template of `{field}` placeholders — CPU (`{brand}`/`{model}`/`{cores}`/`{freq}`), GPU (`{name}`/`{vendor}`/`{model}`/`{vram}`), memory/swap/disk (`{used}`/`{total}`/`{percent}`/`{fs}`), os (`{distro}`/`{version}`/`{arch}`/`{wsl}`), packages (one field per manager), battery (`{percent}`/`{state}`), uptime (`{days}`/`{hours}`/`{mins}`), datetime (`{date}`/`{time}`); unknown fields render empty, `{{`/`}}` escape literal braces
- **Backwards compatible:** the default template is `{value}`, so existing configs and output are unchanged; formatting applies once at render-tree build time, shared by all layouts and both daemons
- **GPU fields per platform:** Linux parses the `lspci` bracket description, Windows the `Name`/CIM value, macOS the `system_profiler` chipset model; shared vendor/VRAM/model rules in `platform/shared/gpu.rs`
- See [`submodules_configuration.md`](https://github.com/xfetch-cli/xfetch/blob/main/docs/submodules_configuration.md) for the full field reference

## v0.6.0 · Themes, Live Stats Daemon & Per-Platform Modularization · 2026-08-19

- **Theme format simplified:** `theme set` edits only the `theme` key, preserving comments and formatting; themes no longer carry `icons` (a per-user font choice, filled from defaults); new `logo_color` and `logo_colors` (per-row) fields
- **Live stats daemon (`daemon_live`):** pins the fetch at the top of the terminal and re-probes a lightweight module subset every `daemon_live_refresh` seconds; hot reload via `daemon_live_reload` (config and theme watched); flags `--no-daemon-live`, `--daemon-live-stop`, `--daemon-live-reload`
- **Windows:** `winget` counts only packages installed via winget; Chocolatey left the core probes (returns as a plugin); shell detection walks the parent process chain (cmd.exe is no longer reported as PowerShell); version-to-logo mapping uses build numbers
- **Plugin and extension timeouts:** new `subprocess.rs` with bounded pipe drains — grandchildren holding the pipe can no longer hang xfetch; optional per-plugin/per-extension `timeout_secs` in the config; `with_timeout` helper in the API crates
- **Per-platform modularization:** macOS and Linux mirror the Windows layout (`platform/<os>/version.rs`, `software.rs`, `network.rs`, ...); Arch splits `pacman` (official) from a new `aur` entry (`pacman -Qm`); Gentoo portage count surfaced; WSL-aware presentation
- **Effects:** intro animations via the new `effects` config key and `xfetch effects install/list/remove` commands

## v0.5.0 · Performance, Package Managers & Distro Logos · 2026-08-18

- **Performance rounds:** package counts read directly from distro databases (dpkg/pacman/apk/flatpak, microseconds instead of subprocesses); PATH pre-check before spawning probes; battery/datetime moved into the parallel section; public IP hosts queried in parallel; probes spawned all-then-join (cold fetch 8.7 s → 0.05 s on WSL)
- **Distro logos in `--gen-config`:** fetches the ASCII logo of the detected OS/distro from the new `xfetch-cli/logos` catalog, with `--logo <id>` override and `XFETCH_LOGOS_URL` for forks
- **New `--layout <name>` flag** for `--gen-config`; the `configs/` folder was removed — the template is now embedded in the binary and installers generate the first config with `xfetch --gen-config`
- **WSL presentation:** new `os_wsl_style` key (`off` / `minimal` / `full`)
- **More package managers:** Void (xbps database) and Gentoo (portage) support; unknown config keys are ignored
- **Windows:** `winget` support added; `choco list --local-only` no longer miscounts; `scoop list` counts rows properly
- **Parallel plugins:** plugins run in parallel threads — API untouched, no plugin changes needed

## v0.4.0 · Daemon Mode, New Layouts & Hang Fixes · 2026-08-17

- **Daemon mode (`--daemon`):** pins the animated logo in a fixed scroll region and exits immediately; stop it with `--daemon-stop`
- **External command timeouts:** `run_cmd_with_timeout()` kills hanging commands — snap without the snapd daemon no longer blocks the fetch; per-command timeouts for package managers and hardware probes
- **Platform separation:** new `src/info/platform/{linux,macos,windows}/` structure with a shared contract and `shared/` machinery
- **New layouts:** `section-box` (bordered boxes per module group) and `custom-x` (fully customizable border templates with `{fill}`/`{title}`, width auto/full/fixed)
- **New options:** `show_keys`, `key_width`, `logo_color` (names, 256-color indexes and hex RGB), `logo_padding`, `logo_type` (auto/ascii/image)
- **XDG_CONFIG_HOME support** (macOS fix) and local CI scripts (`scripts/ci.sh`, `scripts/ci.ps1`)

## v0.3.0 · Image Rendering & Extensions · 2026-07-25

- **Kitty image rendering overhaul:** Added `logo_kitty` toggle (native protocol vs half-block), `logo_gap` for configurable image-text spacing, `logo_width`/`logo_height` for explicit sizing, and auto-responsive width (28% of terminal, clamped 12–42 cols)
- **Cursor positioning fix:** Replaced `MoveUp`/`MoveToColumn` with `SavePosition`/`RestorePosition` for correct cursor behavior across all image protocols
- **Stacked layout fix:** Fixed `print_stacked_output()` to handle image-only logos (was ignoring images without ASCII text)
- **Extension API:** Created `api/crates/extension-api/` — `ConfigProviderRequest` / `ConfigProviderResponse` protocol, `config_providers[]` config field, stdin/stdout JSON communication
- **config-roulette extension:** Picks a random or daily config from a JSON routes list, supports 100+ routes
- **layout-override extension:** Forces layout and/or module set at config load time
- **Extension CLI:** Added `xfetch extension install/list/remove` commands
- **100 image-based configs** for config-roulette with `logo_gap: 3` and `logo_kitty: true`

## Phase 0 · Foundation & Core

- Initialize Rust project with dependencies
- Cross-platform OS detection (Linux, Windows, macOS)
- System information gathering module
- Configuration system with JSONC support
- UI rendering engine with crossterm

## Phase 1 · System Information Modules

- OS name & architecture display
- Kernel version detection
- Hostname resolution
- Shell detection and display
- Terminal emulator detection
- CPU model & frequency information
- GPU detection (discrete & integrated)
- Memory and RAM usage display
- Disk usage statistics
- Battery status and percentage
- System uptime calculation
- Package count for multiple managers (pacman, dpkg, scoop)
- Desktop environment / window manager detection

## Phase 2 · Visual Customization & Layouts

- Custom ASCII art support from text files
- Image/SVG logo support via viuer
- ANSI color codes in ASCII logos
- Icon customization per module (Nerd Fonts)
- Color customization per module
- Default layout (side-by-side)
- Pac-Man layout with custom header/footer
- Side-block layout
- Tree layout for hierarchical display
- Section layout for grouped information
- Color palette display with style options

## Phase 3 · Documentation & Examples

- Installation guide
- Configuration guide
- Quick install script for Linux/macOS
- PowerShell install script for Windows
- 20+ example configurations
- Sample logos (text and SVG)
- Uninstallation scripts
- Layout documentation

## Phase 4 · Package Manager Expansion

- RPM package manager support (Fedora, RHEL)
- APK package manager support (Alpine)
- Nix package manager support
- Homebrew package manager support (macOS/Linux)
- Chocolatey package manager support (Windows)
- Multiple installed package manager detection
- Package count detection performance optimization

## Phase 5 · Network & Connectivity

- Local IP address detection
- Public IP address fetching (with privacy option)
- IPv6 support
- Network interface information display
- Option to disable IP fetching for privacy

## Phase 6 · Enhanced Modules

- Music player integration (MPD support)
- Spotify current track display
- Weather module with location API
- Timezone and world clock display
- User info and login status
- Display resolution and refresh rate
- Theme and color scheme detection

## Phase 7 · Additional Layouts

- Compact layout for minimal output
- Horizontal layout variant
- Bottom layout with logo below info
- Minimal layout (text-only)
- Layout preview documentation

## Phase 8 · Performance Optimization

- Parallelized slow hardware probes
- Module data caching
- GPU detection optimization for multi-GPU systems
- Lazy loading for optional modules
- Benchmarked and profiled performance
- Modularized file structure

## Phase 9 · CI/CD & Distribution

- GitHub Actions for automated builds
- Binary releases for Linux x86_64, macOS (Intel & ARM), and Windows
- AUR package for Arch Linux
- Homebrew tap for macOS
- Install scripts covering all platforms (Linux, macOS, Windows)
- Automated Rust installation in install.ps1 for Windows

## Phase 10 · Community & Ecosystem

- Themes repository and registry
- Theme download manager (plugin)
- Online theme preview tool
- Community theme contributions process
- Plugin system for custom modules
- Community issue templates for xfetch, plugins, configs, and api
- Contribution guidelines

## Phase 11 · Testing & Quality Assurance

- Unit tests for info module
- Unit tests for config module
- Integration tests for layouts
- 41 tests total, all passing

## Phase 12 · Advanced Features

> Out of respect for the privacy of our users: we have decided to eliminate even the possibility, we maintain this as a record of what should not be done under any circumstances in the future.

## Phase 13 · Documentation & Marketing

- Comprehensive user manual
- Project website with showcase
- Developer documentation
