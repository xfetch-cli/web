# Roadmap

## Phase 0 · Foundation & Core

- [x] Initialize Rust project with dependencies
- [x] Implement cross-platform OS detection (Linux, Windows, macOS)
- [x] Create system information gathering module
- [x] Implement configuration system with JSONC support
- [x] Build UI rendering engine with crossterm

## Phase 1 · System Information Modules

- [x] OS Name & Architecture display
- [x] Kernel version detection
- [x] Hostname resolution
- [x] Shell detection and display
- [x] Terminal emulator detection
- [x] CPU model & frequency information
- [x] GPU detection (discrete & integrated)
- [x] Memory and RAM usage display
- [x] Disk usage statistics
- [x] Battery status and percentage
- [x] System uptime calculation
- [x] Package count for multiple managers (pacman, dpkg, scoop)
- [x] Desktop Environment / Window Manager detection

## Phase 2 · Visual Customization & Layouts

- [x] Custom ASCII art support from text files
- [x] Image/SVG logo support via viuer
- [x] ANSI color codes in ASCII logos
- [x] Icon customization per module (Nerd Fonts)
- [x] Color customization per module
- [x] Default layout (side-by-side)
- [x] Pac-Man layout with custom header/footer
- [x] Side-block layout implementation
- [x] Tree layout for hierarchical display
- [x] Section layout for grouped information
- [x] Color palette display with style options

## Phase 3 · Documentation & Examples

- [x] Installation guide
- [x] Configuration guide
- [x] Quick install script for Linux/macOS
- [x] PowerShell install script for Windows
- [x] Create 20+ example configurations
- [x] Create sample logos (text and SVG)
- [x] Setup uninstallation scripts
- [x] Layout documentation

## Phase 4 · Package Manager Expansion

- [x] Add RPM package manager support (Fedora, RHEL)
- [x] Add APK package manager support (Alpine)
- [x] Add Nix package manager support
- [x] Add Homebrew package manager support (macOS/Linux)
- [x] Add Chocolatey package manager support (Windows)
- [x] Detect multiple installed package managers
- [x] Optimize package count detection performance

## Phase 5 · Network & Connectivity

- [x] Implement local IP address detection
- [x] Fetch public IP address (with privacy option)
- [x] Add IPv6 support
- [x] Display network interface information
- [x] Add option to disable IP fetching for privacy

## Phase 6 · Enhanced Modules

- [x] Implement music player integration (MPD support)
- [x] Add Spotify current track display
- [x] Implement weather module with location API
- [x] Add timezone and world clock display
- [x] Implement user info and login status
- [x] Add display resolution and refresh rate
- [x] Add theme and color scheme detection

## Phase 7 · Additional Layouts

- [x] Implement compact layout for minimal output
- [x] Implement horizontal layout variant
- [x] Implement bottom layout with logo below info
- [x] Implement minimal layout (text-only)
- [x] Add layout preview documentation

## Phase 8 · Performance Optimization

- [x] Parallelize slow hardware probes
- [x] Implement caching for module data
- [x] Optimize GPU detection for multi-GPU systems
- [x] Add lazy loading for optional modules
- [x] Benchmark and profile performance
- [x] Modularize files

## Phase 9 · CI/CD & Distribution

- [x] Setup GitHub Actions for automated builds
- [x] Create binary releases for Linux x86_64
- [x] Create binary releases for macOS (Intel & ARM)
- [x] Create binary releases for Windows
- [x] Setup AUR package for Arch Linux
- [x] Setup Homebrew tap for macOS
- [x] Setup cargo registry for distribution
- [x] Setup automated changelog generation

## Phase 10 · Community & Ecosystem

- [x] Create themes repository / registry
- [x] Implement theme download manager
- [x] Create online theme preview tool
- [x] Setup community theme contributions process
- [x] Create plugin system for custom modules
- [/] Implement plugin configuration validation
- [x] Setup community issue templates
- [x] Create contribution guidelines

## Phase 11 · Testing & Quality Assurance

- [x] Implement unit tests for info module
- [x] Implement unit tests for config module
- [x] Implement integration tests for layouts
- [ ] Setup linting with clippy
- [ ] Setup code formatter (rustfmt)
- [ ] Implement platform-specific tests for each OS
- [/] Add cross-platform testing suite
- [ ] Setup code coverage reporting

## Phase 12 · Advanced Features

- [ ] Implement custom module scripting language / support
- [ ] Add conditional module display based on system state
- [ ] Implement theme system with variables
- [ ] Add animation support for transitional elements
- [ ] Implement real-time stats updates / daemon mode
- [ ] Add config hot-reload capability
- [x] Implement telemetry (optional, privacy-respecting)
- [ ] Add accessibility features (high contrast themes)

## Phase 13 · Documentation & Marketing

- [x] Create comprehensive user manual
- [ ] Create video tutorials
- [x] Setup project website with showcase
- [x] Create developer documentation
- [ ] Publish blog posts about features
- [/] Create comparison guide with similar tools
- [ ] Setup Discord/Slack community channel
- [/] Create contribution program
