# wasm-proc

Load Average, Speichernutzung und Uptime aus /proc in freistehendem C.

- **Art:** `info_provider`
- **Artefakt:** `wasm-proc.wasm` (core module, about 4 KiB)
- **Faehigkeiten:** `fs: /proc` (read-only)
- **Sprache:** C

## Installation

```bash
xfetch plugin install ./plugins/wasm-proc
```

Der Installer baut den Gast bei Bedarf ueber sein Manifest.

## Konfiguration

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-proc", "args": {} }],
    "modules": ["plugin:wasm-proc"]
}
```

## Argumente

Keine.

## Ausgabe

```
load: 2.39 2.33 1.63
uptime: 6h 40m
memory: 8% used (7.9 GiB / 93.8 GiB)
```

## Hinweise

Das Manifest oeffnet /proc schreibgeschuetzt. Nur Linux und WSL, da procfs noetig ist.
