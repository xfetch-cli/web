# Contributing

## Building from Source

xfetch is written in Rust (edition 2024). To build from source, you need Rust installed (install via `rustup` at rust-lang.org).

### Prerequisites

- Rust toolchain (edition 2024)
- Cargo (included with Rust)

### Clone and Build

```bash
git clone https://github.com/xfetch-cli/xfetch.git
cd xfetch
cargo build --release
```

The binary will be placed at `target/release/xfetch`.

### Install from Source

```bash
cargo install --path .
```

This installs the binary to `~/.cargo/bin/xfetch`.

## Project Structure

The xfetch ecosystem is organized as a multi-repository architecture under the `xfetch-cli` GitHub organization:

```
xfetch/
  api/              # Plugin API SDK (Rust crate)
  assets/           # Logo and banner assets
  configs/          # Public preset configurations
  plugins/          # Official plugin implementations (workspace)
  web/              # Landing page (Next.js)
  xfetch/           # Main CLI application (Rust)
```

### Main CLI (`xfetch/`)

```
xfetch/
  src/
    main.rs           # Entry point
    cli.rs            # CLI argument parsing (clap)
    config.rs         # JSONC configuration loading
    cache.rs          # Data caching with TTL
    ui.rs             # Render orchestrator
    ui/
      nodes.rs        # Render tree preparation
      layout.rs       # Layout dispatching
      logo.rs         # Logo loading (ASCII, image)
      print.rs        # Terminal output rendering
      renders.rs      # Layout render implementations
      x.rs            # Path expansion utilities
    info/
      mod.rs          # Info struct and orchestration
      system.rs       # OS, kernel, network info
      software.rs     # Shell, terminal, packages, user info
      hardware.rs     # CPU, GPU, memory, disk, battery info
    plugins/
      mod.rs          # Plugin discovery and naming
      install.rs      # Plugin installation
      manage.rs       # Plugin listing and removal
      run.rs          # Plugin execution
```

### Plugin API (`api/`)

```
api/
  crates/
    plugin-api/
      src/
        lib.rs        # Public re-exports
        protocol.rs   # Wire protocol types
        entrypoints.rs # Plugin entrypoint helpers
        io.rs         # JSON stdin/stdout helpers
        error.rs      # Error types
```

### Official Plugins (`plugins/`)

```
plugins/
  plugins/
    animate-logo/       # Logo animation plugin
    display-resolution/ # Monitor resolution plugin
    docker/             # Docker stats plugin
    github-stats/       # GitHub profile plugin
    music-player/       # MPD and Spotify plugin
    theme-detection/    # GTK/KDE theme plugin
    timezone/           # Timezone plugin
    user-info/          # User account info plugin
    weather/            # Weather plugin
```

## Development Workflow

### Running Tests

```bash
# Run all tests
cd xfetch
cargo test

# Run tests with output
cargo test -- --nocapture

# Run a specific test
cargo test test_name
```

### Code Quality

```bash
# Lint
cargo clippy

# Format
cargo fmt

# Check (fast compilation, no binary)
cargo check
```

### Testing Plugins

```bash
# Test an info plugin via the JSON protocol
echo '{"version":1,"kind":"info_provider","args":null}' \
  | ./target/release/xfetch-plugin-my-plugin

# Test a logo animation plugin
echo '{"version":1,"kind":"logo_animation","lines":["hello"],"args":{"fps":12}}' \
  | ./target/release/xfetch-plugin-my-plugin
```

## Writing Plugins

### Naming Convention

Plugin binaries must follow the naming convention `xfetch-plugin-<name>` so the core can discover them.

### Plugin Protocol

Plugins communicate with the xfetch core via a JSON protocol over stdin/stdout:

1. The core writes a JSON request to the plugin's stdin
2. The plugin processes the request
3. The plugin writes a JSON response to stdout
4. On error, the plugin writes to stderr and exits with non-zero status

### Minimal Info Plugin Skeleton

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

    let lines = vec!["Hello from plugin".to_string()];

    if let Err(err) = write_info_lines(lines) {
        eprintln!("{}", err);
        std::process::exit(1);
    }
}
```

### Cargo.toml for Plugins

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

### Plugin Standards

- Write all code and documentation in English
- Use the shared `xfetch-plugin-api` crate for protocol types
- Handle errors explicitly -- write to stderr and exit with non-zero
- Do not use display or terminal libraries (the core handles rendering)
- Keep plugins focused on a single responsibility
- Minimize dependencies
- Handle network or I/O failures gracefully with informative messages

## Pull Request Process

1. Fork the repository and create a feature branch
2. Implement your changes following the coding standards
3. Ensure `cargo build --release` succeeds
4. Add tests for new functionality
5. Run `cargo test` to verify all tests pass
6. Submit a pull request with a clear description of your changes

## Testing

### Test Categories

| Category | Location | Description |
|----------|----------|-------------|
| Unit tests | In each source file | Tests for individual functions |
| Integration tests | `src/` submodules | Tests for module interactions |
| Plugin protocol tests | `api/crates/plugin-api/src/protocol.rs` | Serialization and validation tests |

### Existing Test Coverage

- Cache system: set/get, expiry, missing keys, clean
- Config parsing: module tree, injection prevention
- Layout rendering: classic, side-block, tree, empty cases
- Logo loading: default logo, path expansion
- Info modules: hostname, battery, GPU, packages, OS, kernel, uptime, datetime, user, desktop
- Plugin system: naming, binary discovery, candidate directories

## Security

- Report security vulnerabilities to `x@xscriptor.com`
- Response target: within 7 days
- Do not expose secrets or tokens in plugin arguments in version control
- Use environment variables or secure configuration for sensitive data

## License

xfetch is licensed under the MIT License. By contributing, you agree that your contributions will be licensed under the same license.
