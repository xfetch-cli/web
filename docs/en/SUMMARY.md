# xfetch Documentation

A cross-platform system information fetching tool written in Rust.

- **Version:** 0.2.0
- **License:** MIT
- **Author:** xscriptor
- **Repository:** github.com/xfetch-cli/xfetch

---

## Table of Contents

1. [Getting Started](getting-started.md)
   - Installation methods (quick install, manual, package managers)
   - First run
   - Command-line interface overview
   - Environment variables

2. [Configuration](configuration.md)
   - JSONC config file format
   - All configuration fields
   - Module groups
   - Icons and colors
   - Plugin integration
   - Animation configuration

3. [Modules](modules.md)
   - Core system modules (OS, kernel, hostname, uptime)
   - Hardware modules (CPU, GPU, memory, swap, disk, battery)
   - Software modules (packages, shell, terminal, WM/DE)
   - Network modules (local IP, public IP, interfaces)
   - User/Session modules (user, datetime)
   - Special modules (palette, header, separator)
   - Plugin module references

4. [Layouts](layouts.md)
   - Classic side-by-side layout
   - Section layout with groups
   - Pac-Man layout
   - Side-block layout
   - Tree layout
   - Box, Line, Dots, Bottom Line variants
   - Compact layout
   - Minimal layout
   - Horizontal and Bottom layouts

5. [Plugins](plugins.md)
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
   - Writing custom plugins
   - Plugin API crate

6. [Customization](customization.md)
   - ASCII and image logos
   - Logo animation styles
   - Nerd Font icons
   - ANSI color customization
   - Palette display styles
   - Preset configurations

7. [Advanced Usage](advanced-usage.md)
   - Benchmark mode
   - Cache system
   - Privacy controls
   - Cross-platform behavior
   - Performance optimization

8. [Presets Reference](presets.md)
   - Layout presets
   - Showcase presets
   - Plugin presets
   - Full-stack preset

9. [Themes](themes.md)
   - Architecture and merge order
   - Theme file format
   - Theme resolution and CLI commands
   - Built-in themes

10. [Theme Manager Plugin](theme-manager.md)
    - Overview and installation
    - Actions (list, search, info, install)
    - Registry and custom registries

11. [Contributing](contributing.md)
    - Building from source
    - Project structure
    - Plugin development guide
    - Testing
    - Pull request process

12. [Roadmap](roadmap.md)
    - Past phases (foundation, modules, layouts, docs)
    - Current phase (testing, advanced features)
    - Future plans

13. [Security](security.md)
    - Reporting vulnerabilities
    - Security best practices
    - Supported versions

14. [Support](support.md)
    - Getting help
    - Before opening an issue
    - Response expectations

15. [Changelog](changelog.md)
    - Version history
    - Phase-by-phase changelog

16. [Code of Conduct](code-of-conduct.md)
    - Our standards
    - Unacceptable behavior
    - Reporting

17. [License](license.md)
    - MIT License terms
