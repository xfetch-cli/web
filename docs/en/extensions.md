# Extensions

Extensions are standalone binaries that hook into the xfetch lifecycle at the config level. Unlike plugins (which provide info lines or animate logos), extensions receive the fully resolved configuration via stdin, modify it, and return a modified version via stdout.

## Architecture

```
xfetch core
  │
  ├─ Load config.jsonc
  ├─ Merge theme (if set)
  │
  ├─ extension-1 (stdin/stdout JSON)  ← modifies config
  ├─ extension-2 (stdin/stdout JSON)  ← modifies config
  ├─ ...
  │
  └─ Render final config
```

Extensions run **after theme merge, in declaration order**. Each extension receives the config produced by the previous step, so they can chain together.

## Installation

Extensions are installed to `~/.config/xfetch/extensions/`:

```bash
cp xfetch-extension-<name> ~/.config/xfetch/extensions/
```

Or use the CLI:

```bash
xfetch extension install ./path/to/extension-binary
xfetch extension list
xfetch extension remove <name>
```

Extension binaries follow the naming convention `xfetch-extension-<name>` (`.exe` on Windows).

## Configuration

Add extensions to your config via the `config_providers` field:

```jsonc
{
    "config_providers": [
        {
            "extension": "layout-override",
            "args": {
                "layout": "tree"
            }
        },
        {
            "extension": "config-roulette",
            "args": {
                "routes": "~/.config/xfetch/routes.json",
                "strategy": "daily"
            }
        }
    ]
}
```

| Field | Type | Description |
|-------|------|-------------|
| `extension` | `string` | Extension name (binary: `xfetch-extension-<name>`) |
| `args` | `object` or `null` | Arbitrary JSON arguments passed to the extension |

## Protocol

Extensions communicate via stdin/stdout using the JSON wire protocol defined in `xfetch-extension-api`.

### Request (stdin)

```json
{
    "version": 1,
    "kind": "config_provider",
    "config": {
        "layout": "section",
        "modules": ["os", "kernel", "uptime"],
        "colors": { "os": "Cyan" }
    },
    "args": {
        "layout": "tree"
    }
}
```

The `config` field contains the fully resolved xfetch configuration after merging defaults, the config file, and any theme.

### Response (stdout)

```json
{
    "config": {
        "layout": "tree",
        "modules": ["os", "kernel", "uptime"],
        "colors": { "os": "Cyan" }
    }
}
```

The extension returns the entire modified config. Unchanged fields should be preserved as-is.

### Error Handling

Errors should be printed to stderr. The process should exit with a non-zero status code. xfetch will skip the extension and continue with the current config if an error occurs.

## Available Extensions

| Extension | Description |
|-----------|-------------|
| [config-roulette](extensions/config-roulette) | Picks a random (or daily) config from a list of paths |
| [layout-override](extensions/layout-override) | Overrides the layout and/or modules at config load time |

## Directories

| Platform | Extensions Path |
|----------|----------------|
| Linux | `~/.config/xfetch/extensions/` |
| macOS | `~/Library/Application Support/xfetch/extensions/` |
| Windows | `%APPDATA%\xfetch\extensions\` |

## Writing Custom Extensions

Extensions must:

1. Read a `ConfigProviderRequest` JSON object from stdin
2. Modify the `config` field as needed
3. Write a `ConfigProviderResponse` JSON object to stdout
4. Exit with status 0 on success, non-zero on error

Use the `xfetch-extension-api` crate from `github.com/xfetch-cli/api` for type-safe request/response handling in Rust.

The shared API crate is available at: [github.com/xfetch-cli/api](https://github.com/xfetch-cli/api)
