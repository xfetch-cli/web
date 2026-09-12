# WebAssembly Guests

Plugins, effects and extensions can be WebAssembly artifacts instead of native executables. The core detects them by their binary header, runs them in a sandboxed wasmtime runtime and keeps the same JSON protocol, so configuration, listing, timeouts and install commands behave the same as with native guests.

## Guest Shapes

| Shape | Target | Contract | Languages |
|-------|--------|----------|-----------|
| Core module | `wasm32-wasip1` | JSON request on stdin, JSON response on stdout, host calls through `xfetch.host_call` | Rust, C, C++, Zig, Go, AssemblyScript, ... |
| Component | Component model | Export `run` from the `xfetch:runtime` WIT world with typed host imports | Python (`componentize-py`), JavaScript (`componentize-js`), Rust/C/Go (`wit-bindgen`), .NET, ... |

Detection is content-based: the first eight bytes distinguish core modules from components. The file extension does not matter.

## Installation

```bash
# From a local checkout (builds through the manifest when needed)
xfetch plugin install ./plugins/wasm-pacman
xfetch effects install ./effects/wasm-matrix
xfetch extension install ./extensions/wasm-night-mode

# Prebuilt artifact from a URL
xfetch plugin install https://example.com/releases/plugin.wasm
```

The installer places the artifact as `xfetch-<kind>-<name>.wasm` plus a sidecar manifest in `~/.config/xfetch/`.

## Manifest

Capabilities and limits are declared in a JSON manifest: a sidecar (`<name>.json` next to the artifact), an embedded `xfetch:manifest` section, or conservative defaults when absent.

```json
{
  "manifest_version": 1,
  "name": "wasm-hello",
  "kind": "info_provider",
  "runtime": "core",
  "capabilities": {
    "http": { "allow": ["https://api.example.com/*"] },
    "exec": { "allow": ["pacman"], "env": ["PATH"] },
    "fs": [{ "host": "/proc", "guest": "/proc", "mode": "ro" }],
    "env": ["LANG"]
  },
  "limits": {
    "timeout_ms": 15000,
    "memory_mb": 64,
    "output_kb": 64,
    "host_call_kb": 256
  }
}
```

Source repositories use `xfetch-plugin.json`, `xfetch-effect.json` or `xfetch-extension.json` with the same schema; the installer copies it next to the artifact.

## Capabilities

Capabilities are deny-by-default; empty or missing fields deny the operation.

| Capability | Field | Semantics |
|------------|-------|-----------|
| HTTP | `http.allow` | Glob patterns matched against the full URL. Redirects are re-checked on every hop. |
| Processes | `exec.allow` | Program file-name patterns. No shell is involved and the environment is cleared except for allowlisted names. |
| Filesystem | `fs` | WASI preopens. Strings mount read-only at the expanded path; objects choose `host`, `guest` and `mode` (`ro`/`rw`). |
| Environment | `env` | Variable names exposed to the guest. |
| Arguments | `args` | When true, the guest receives its name as `argv[0]`. |

`log` and `version` host operations are always available.

## Limits

| Field | Default | Meaning |
|-------|---------|---------|
| `timeout_ms` | 30000 | Wall-clock deadline; the config `timeout_secs` value overrides it. |
| `memory_mb` | 256 | Linear memory cap. Python and Go guests need headroom. |
| `output_kb` | 4096 | Cap for the JSON response. |
| `host_call_kb` | 4096 | Cap for a single host-call response. |

## Host Calls

Core modules call `xfetch.host_call` with a JSON operation; components use the typed `fetch`, `exec`, `log` and `protocol-version` imports. Rust core modules can use the `xfetch-guest-api` crate. See the full reference in the xfetch repository (`docs/WASM.md`).

## Tooling

```bash
xfetch wasm inspect ./plugin.wasm                  # header, manifest, capabilities
xfetch wasm run ./plugin.wasm --request '{"version":1,"kind":"info_provider"}'
xfetch wasm wit                                    # component contract
```

## Logging

Guest log lines go to stderr; by default only `warn` and `error` are shown. Set `XFETCH_WASM_LOG_LEVEL` to `off`, `error`, `warn`, `info` or `debug` to change the threshold.

## Security

Wasm guests start with no ambient authority: no filesystem, network, environment or process access unless the manifest grants it, and limits bound time, memory and output. Native plugins keep their full process privileges; choosing wasm is choosing the sandbox.

## Examples

| Guest | Language | Shape | Repository |
|-------|----------|-------|------------|
| `wasm-crypto` | Rust | Core module, HTTP | xfetch-cli/plugins |
| `wasm-ip-geo` | Python | Component, HTTP | xfetch-cli/plugins |
| `wasm-pacman` | Go | Core module, exec | xfetch-cli/plugins |
| `wasm-proc` | C | Core module, filesystem | xfetch-cli/plugins |
| `wasm-matrix` | Rust | Core module effect | xfetch-cli/effects |
| `wasm-python-pulse` | Python | Component effect | xfetch-cli/effects |
| `wasm-night-mode` | Rust | Core module extension | xfetch-cli/extensions |
| `wasm-updates-footer` | Go | Core module extension | xfetch-cli/extensions |
| `wasm-lang-labels` | Python | Component extension | xfetch-cli/extensions |

See `docs/WASM.md` in the xfetch repository and `docs/wasm-guests.md` in the api repository for the complete reference.
