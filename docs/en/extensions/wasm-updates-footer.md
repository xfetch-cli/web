# wasm-updates-footer

Appends the pending package-update count to the footer (WebAssembly config provider).

- **Kind:** `config_provider`
- **Artifact:** `wasm-updates-footer.wasm` (core module)
- **Capabilities:** `exec: checkupdates, pacman`
- **Language:** Go (wasip1)

## Installation

```bash
xfetch extension install ./extensions/wasm-updates-footer
```

## Configuration

```jsonc
{
    "config_providers": [
        {
            "extension": "wasm-updates-footer",
            "args": {}
        }
    ]
}
```

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `program` | string | `checkupdates` | Allowlisted program; falls back to `pacman -Qu` when missing. |
| `args` | string[] | `[]` | Arguments passed verbatim to the program. |
| `prefix` | string | ` · ` | Separator appended before the count. |
| `up_to_date` | string | `up to date` | Label used when there are no pending updates. |

## Behavior

Prints `12 updates` or `up to date` after the configured footer; failures stay silent and the count is never appended twice.
