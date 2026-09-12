# wasm-crypto

Precios de criptomonedas (BTC, ETH, ...) obtenidos en un invitado WebAssembly con sandbox.

- **Tipo:** `info_provider`
- **Artefacto:** `xfetch-plugin-wasm-crypto.wasm` (core module)
- **Capacidades:** `https://api.coinbase.com/*`
- **Lenguaje:** Rust

## Instalacion

```bash
xfetch plugin install ./plugins/wasm-crypto
```

El instalador compila el invitado con su manifiesto cuando hace falta.

## Configuracion

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-crypto", "args": { "assets": ["BTC", "ETH"], "currency": "EUR" } }],
    "modules": ["plugin:wasm-crypto"]
}
```

## Argumentos

| Campo | Tipo | Por defecto | Descripcion |
|-------|------|---------|-------------|
| `assets` | string[] | `["BTC","ETH","SOL"]` | Simbolos a cotizar (hasta cinco). |
| `currency` | string | `USD` | Moneda de cotizacion; simbolos para USD, EUR y GBP. |

## Salida

```
BTC: 77,331.71
ETH: 2,536.05
```

## Notas

El manifiesto solo permite el origen de Coinbase; cualquier otra URL se deniega. Si falla un activo, se muestra una linea `unavailable`.
