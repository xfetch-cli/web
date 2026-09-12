# wasm-crypto

Crypto spot prices (BTC, ETH, ...) fetched in a sandboxed WebAssembly guest.

- **Kind:** `info_provider`
- **Artifact:** `xfetch-plugin-wasm-crypto.wasm` (core module)
- **Capabilities:** `https://api.coinbase.com/*`
- **Language:** Rust

## Installation

```bash
xfetch plugin install ./plugins/wasm-crypto
```

The installer builds the guest through its manifest when needed.

## Configuration

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-crypto", "args": { "assets": ["BTC", "ETH"], "currency": "EUR" } }],
    "modules": ["plugin:wasm-crypto"]
}
```

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `assets` | string[] | `["BTC","ETH","SOL"]` | Symbols to quote (up to five). |
| `currency` | string | `USD` | Quote currency; symbols for USD, EUR and GBP. |

## Output

```
BTC: 77,331.71
ETH: 2,536.05
```

## Notes

The manifest only allows the Coinbase origin; any other URL is denied. Per-asset failures degrade to an `unavailable` line.
