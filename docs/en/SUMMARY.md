# xfetch Documentation

A cross-platform system information fetching tool written in Rust.

- **Version:** 0.9.0
- **License:** MIT
- **Author:** xscriptor
- **Repository:** github.com/xfetch-cli/xfetch

---

## Table of Contents

1. [Getting Started](getting-started.md)
   - Installation methods (quick install, manual, package managers)
   - First run
   - Command-line interface overview
   - Updating xfetch
   - Environment variables

2. [Config Generation](gen-config.md)
   - Basic `--gen-config` usage
   - Distro logo (`--logo`) and layout (`--layout`)
   - Offline fallbacks
3. [Configuration](configuration.md)
   - JSONC config file format
   - All configuration fields
   - Module groups
   - Icons and colors
   - Plugin integration
   - Animation configuration

4. [Modules](modules.md)
   - Core system modules (OS, kernel, hostname, uptime)
   - Hardware modules (CPU, GPU, memory, swap, disk, battery)
   - Software modules (packages, shell, terminal, WM/DE)
   - Network modules (local IP, public IP, interfaces)
   - User/Session modules (user, datetime)
   - Special modules (palette, header, separator)
   - Plugin module references

5. [Layouts](layouts.md)
   - Classic side-by-side layout
   - Section layout with groups
   - Pac-Man layout
   - Side-block layout
   - Tree layout
   - Box, Line, Dots, Bottom Line variants
   - Compact layout
   - Minimal layout
   - Horizontal and Bottom layouts
   - Section-box and Custom-X layouts
     - [Section-Box](layouts.md#section-box-layout)
     - [Custom-X](custom-x.md)

6. [Plugins](plugins.md)
   - Plugin architecture overview
   - JSON wire protocol
   - Plugin kinds (info provider, logo animation)
   - Plugin discovery and installation
   - Official plugins reference
     - animate-logo
     - docker
     - github-stats
     - music-player
     - weather
     - timezone
     - user-info
     - display-resolution
     - theme-detection
     - chocolatey
     - temperature
     - theme-manager
     - wasm-crypto
     - wasm-ip-geo
     - wasm-pacman
     - wasm-proc
   - WebAssembly plugins (manifest capabilities and host calls)
   - Writing custom plugins
   - Plugin API crate
   - WebAssembly guests ([wasm.md](wasm.md))

7. [Extensions](extensions.md)
   - Extension architecture overview
   - Configuration via config_providers
   - JSON wire protocol
   - Installation and CLI commands
   - Official extensions
     - config-roulette
     - layout-override
     - wasm-night-mode
     - wasm-updates-footer
     - wasm-lang-labels
   - Writing custom extensions

8. [Effects](effects.md)
   - Architecture overview
   - Installation and CLI commands
   - Configuration and fields
   - JSON wire protocol
   - Official effects
   - WebAssembly effects (wasm-matrix, wasm-python-pulse)
   - Writing custom effects

9. [Customization](customization.md)
   - ASCII and image logos
   - Image sizing and positioning
   - Kitty terminal image rendering
   - Logo animation styles
   - Nerd Font icons
   - ANSI color customization
   - Palette display styles
   - Preset configurations

10. [Advanced Usage](advanced-usage.md)
   - Benchmark mode
   - Cache system
   - Privacy controls
   - Cross-platform behavior
   - Performance optimization

11. [Presets Reference](presets.md)
   - Layout presets
   - Showcase presets
   - Plugin presets
   - Full-stack preset

12. [Themes](themes.md)
   - Architecture and merge order
   - Theme file format
   - Theme resolution and CLI commands
   - Built-in themes

13. [Theme Manager Plugin](theme-manager.md)
    - Overview and installation
    - Actions (list, search, info, install)
    - Registry and custom registries

14. [Contributing](contributing.md)
    - Building from source
    - Project structure
    - Plugin development guide
    - Testing
    - Pull request process

15. [Roadmap](roadmap.md)
    - Past phases (foundation, modules, layouts, docs)
    - Current phase (testing, advanced features)
    - Future plans

16. [Security](security.md)
    - Reporting vulnerabilities
    - Security best practices
    - Supported versions

17. [Support](support.md)
    - Getting help
    - Before opening an issue
    - Response expectations

18. [Changelog](changelog.md)
    - Version history
    - Phase-by-phase changelog

19. [Code of Conduct](code-of-conduct.md)
    - Our standards
    - Unacceptable behavior
    - Reporting

20. [License](license.md)
    - MIT License terms
