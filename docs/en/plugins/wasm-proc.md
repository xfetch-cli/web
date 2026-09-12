# wasm-proc

Load average, memory usage and uptime read from /proc in freestanding C.

- **Kind:** `info_provider`
- **Artifact:** `wasm-proc.wasm` (core module, about 4 KiB)
- **Capabilities:** `fs: /proc` (read-only)
- **Language:** C

## Installation

```bash
xfetch plugin install ./plugins/wasm-proc
```

The installer builds the guest through its manifest when needed.

## Configuration

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-proc", "args": {} }],
    "modules": ["plugin:wasm-proc"]
}
```

## Arguments

None.

## Output

```
load: 2.39 2.33 1.63
uptime: 6h 40m
memory: 8% used (7.9 GiB / 93.8 GiB)
```

## Notes

The manifest preopens /proc read-only. Linux and WSL only, since it depends on procfs.
