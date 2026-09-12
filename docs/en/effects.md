# Effects

Intro effects animate the content lines when the fetch starts. Instead of printing the result instantly, an effect transforms each line from a scrambled state into its final text over a short duration.

## Architecture Overview

Effects are standalone executables named `xfetch-effect-<name>` (or `xfetch-effect-<name>.exe` on Windows). They receive the rendered content lines from the xfetch core and return a sequence of frames.

```
xfetch core  --->  stdin (JSON request)     --->  effect process
xfetch core  <---  stdout (JSON response)   <---  effect process
```

Effects are **opt-in**: if the configured effect binary is missing or fails, xfetch renders the output normally — nothing is broken.

## Installation

```bash
# Install from the official effects repository
xfetch effects install decrypt

# Install from a local directory
xfetch effects install ./my-effect

# Install from a custom git repository
xfetch effects install my-effect --repo https://github.com/user/effects.git

# List installed effects
xfetch effects list

# Remove an effect
xfetch effects remove glitch
```

Effects are built with `cargo build --release` and installed to `~/.config/xfetch/effects/xfetch-effect-<name>` (or `%APPDATA%\xfetch\effects\` on Windows). The default repository is `https://github.com/xfetch-cli/effects.git`, overridable with the `XFETCH_EFFECT_REPO` environment variable.

## Configuration

The `effects` config key accepts a single effect or a list of effects played in sequence:

```jsonc
{
    "effects": {
        "plugin": "decrypt",
        "duration_ms": 1500,
        "fps": 30
    }
}
```

Multiple effects play one after another:

```jsonc
{
    "effects": [
        {
            "plugin": "glitch",
            "duration_ms": 800,
            "fps": 30
        },
        {
            "plugin": "decrypt",
            "duration_ms": 1500,
            "fps": 30
        }
    ]
}
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `plugin` | `string` | Effect name (installed as `xfetch-effect-<name>`) |
| `style` | `string` or `null` | Effect-specific style hint |
| `duration_ms` | `number` or `null` | Total animation duration in milliseconds |
| `fps` | `number` or `null` | Frames per second |
| `args` | `object` or `null` | Free-form effect-specific arguments |
| `timeout_secs` | `number` or `null` | Safety net in seconds: the core kills the effect process if it runs longer |

## JSON Wire Protocol

**Protocol Version:** 1

### Request (stdin)

```json
{
    "version": 1,
    "kind": "effect",
    "lines": [
        "os: Arch Linux x86_64",
        "kernel: 6.6.87.2-arch1-1"
    ],
    "args": {
        "style": null,
        "duration_ms": 1500,
        "fps": 30,
        "args": null
    }
}
```

The `lines` field contains the rendered content lines (icon + value per line) that the effect transforms. The `args` field carries the effect's parameters.

### Response (stdout)

```json
{
    "frames": [
        {
            "delay_ms": 33,
            "lines": ["scrambled line 1", "scrambled line 2"]
        },
        {
            "delay_ms": 33,
            "lines": ["os: Arch Linux x86_64", "kernel: 6.6.87.2-arch1-1"]
        }
    ]
}
```

Each frame has a `delay_ms` (how long to display it) and `lines` (the frame content). The response must be non-empty, and the last frame should reach the original final content — the core re-settles on the exact final content when playback ends.

### Error Handling

Effects must write errors to stderr and exit with a non-zero status code. xfetch skips the effect and renders the normal output if an error occurs.

## Official Effects

| Effect | Description |
|--------|-------------|
| `decrypt` | Reveals each line from scrambled glyphs to its real text (smooth decode). Defaults: `duration_ms` 1500, `fps` 30. |
| `glitch` | Stuttery scrambled flicker with corruption bursts, horizontal slices and dropped rows. Defaults: `duration_ms` 800, `fps` 30. Keeps ANSI escape sequences intact. |

### WebAssembly Effects

`wasm-matrix` (Rust) and `wasm-python-pulse` (Python component) are
WebAssembly effects that produce frames exactly like the native ones; their
manifests declare the runtime limits. See the WebAssembly guests reference in
the xfetch repository (`docs/WASM.md`).

## Writing Custom Effects

### Binary Naming Convention

```
xfetch-effect-<name>          (Linux/macOS)
xfetch-effect-<name>.exe     (Windows)
```

### Minimal Effect Skeleton (Rust)

```toml
[package]
name = "xfetch-effect-my-effect"
version = "0.1.0"
edition = "2024"

[dependencies]
serde_json = "1"
xfetch-effect-api = { git = "https://github.com/xfetch-cli/api", package = "xfetch-effect-api" }
```

```rust
use xfetch_effect_api::{read_effect_request, write_effect_frames, EffectFrame};

fn main() {
    let request = match read_effect_request() {
        Ok(value) => value,
        Err(err) => {
            eprintln!("{}", err);
            std::process::exit(1);
        }
    };

    let duration_ms = request.args.duration_ms.unwrap_or(1000).max(1);
    let fps = request.args.fps.unwrap_or(30).max(1);
    let frame_count = ((duration_ms * fps) / 1000).max(1);
    let frame_delay = (1000.0 / fps as f64) as u64;

    let mut frames = Vec::with_capacity(frame_count as usize + 1);
    for i in 0..=frame_count {
        let progress = i as f64 / frame_count as f64;
        let lines: Vec<String> = request.lines.iter()
            .map(|line| reveal(line, progress, i))
            .collect();
        frames.push(EffectFrame::new(frame_delay, lines));
    }

    if let Err(err) = write_effect_frames(&frames) {
        eprintln!("{}", err);
        std::process::exit(1);
    }
}
```

### Effect API Crate

The `xfetch-effect-api` crate (source at `github.com/xfetch-cli/api`) provides the protocol types and helpers:

- **Protocol types:** `EffectArgs`, `EffectFrame`, `EffectRequest`, `EffectResponse`, `KIND_EFFECT`
- **Entrypoint helpers:** `read_effect_request()`, `write_effect_frames()`
- **Argument parsing:** `EffectArgs::parse_args()` and `EffectArgs::parse_args_or_default()`
- **Timeout helpers:** `with_timeout()` and the `TimedOut` error

The shared `xfetch-effects-lib` crate offers ANSI-safe helpers (`SCRAMBLE_GLYPHS`, `tokenize`, `reveal`, ...) so effects can scramble and reveal text without breaking terminal escape sequences.

### Guidelines

- Keep effects focused on a single visual style
- Write errors to stderr and exit with non-zero status
- Return a non-empty `frames` array whose last frame matches the final content
- Preserve ANSI escape sequences across frames
- Handle timeouts gracefully with `with_timeout()`
