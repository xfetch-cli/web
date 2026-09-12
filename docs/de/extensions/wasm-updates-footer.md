# wasm-updates-footer

Haengt die Anzahl ausstehender Updates an die Fusszeile (WebAssembly-Konfigurationsanbieter).

- **Art:** `config_provider`
- **Artefakt:** `wasm-updates-footer.wasm` (core module)
- **Faehigkeiten:** `exec: checkupdates, pacman`
- **Sprache:** Go (wasip1)

## Installation

```bash
xfetch extension install ./extensions/wasm-updates-footer
```

## Konfiguration

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

## Argumente

| Feld | Typ | Standard | Beschreibung |
|-------|------|---------|-------------|
| `program` | string | `checkupdates` | Erlaubtes Programm; faellt auf `pacman -Qu` zurueck. |
| `args` | string[] | `[]` | Argumente, unveraendert uebergeben. |
| `prefix` | string | ` · ` | Trennzeichen vor der Anzahl. |
| `up_to_date` | string | `up to date` | Label, wenn keine Updates ausstehen. |

## Verhalten

Schreibt `12 updates` oder `up to date` hinter die Fusszeile; Fehler bleiben still und die Anzahl wird nie doppelt angehaengt.
