# wasm-night-mode

Deaktiviert Farben ausserhalb des Tagesfensters (WebAssembly-Konfigurationsanbieter).

- **Art:** `config_provider`
- **Artefakt:** `xfetch-extension-wasm-night-mode.wasm` (core module)
- **Faehigkeiten:** none (reads the WASI clock)
- **Sprache:** Rust

## Installation

```bash
xfetch extension install ./extensions/wasm-night-mode
```

## Konfiguration

```jsonc
{
    "config_providers": [
        {
            "extension": "wasm-night-mode",
            "args": {}
        }
    ]
}
```

## Argumente

| Feld | Typ | Standard | Beschreibung |
|-------|------|---------|-------------|
| `night_start` | number | `22` | Erste Stunde (inklusive) des Nachtfensters. |
| `night_end` | number | `7` | Erste Stunde des Tagesfensters; darf Mitternacht ueberschreiten. |
| `utc_offset` | number | `0` | Stunden von UTC statt einer Zeitzonendatenbank. |
| `dim_colors` | bool | `true` | Setzt `show_colors: false` nachts. |
| `night_palette` | string | unchanged | Optionales Palette-Style nachts. |

## Verhalten

Tagsueber bleibt die Konfiguration unveraendert; nachts werden Farben gedimmt (und optional der Palette-Style gewechselt).
