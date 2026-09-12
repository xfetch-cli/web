# wasm-crypto

Krypto-Spotpreise (BTC, ETH, ...) aus einem sandboxed WebAssembly-Gast.

- **Art:** `info_provider`
- **Artefakt:** `xfetch-plugin-wasm-crypto.wasm` (core module)
- **Faehigkeiten:** `https://api.coinbase.com/*`
- **Sprache:** Rust

## Installation

```bash
xfetch plugin install ./plugins/wasm-crypto
```

Der Installer baut den Gast bei Bedarf ueber sein Manifest.

## Konfiguration

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-crypto", "args": { "assets": ["BTC", "ETH"], "currency": "EUR" } }],
    "modules": ["plugin:wasm-crypto"]
}
```

## Argumente

| Feld | Typ | Standard | Beschreibung |
|-------|------|---------|-------------|
| `assets` | string[] | `["BTC","ETH","SOL"]` | Symbole (maximal fuenf). |
| `currency` | string | `USD` | Quotierungswaehrung; Symbole fuer USD, EUR und GBP. |

## Ausgabe

```
BTC: 77,331.71
ETH: 2,536.05
```

## Hinweise

Das Manifest erlaubt nur den Coinbase-Ursprung; jede andere URL wird verweigert. Fehler pro Asset werden als `unavailable`-Zeile angezeigt.
