# wasm-pacman

Repository and AUR package counts from the local pacman database, written in Go.

- **Kind:** `info_provider`
- **Artifact:** `wasm-pacman.wasm` (core module)
- **Capabilities:** `exec: pacman`
- **Language:** Go (wasip1)

## Installation

```bash
xfetch plugin install ./plugins/wasm-pacman
```

The installer builds the guest through its manifest when needed.

## Configuration

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-pacman", "args": { "samples": 3 } }],
    "modules": ["plugin:wasm-pacman"]
}
```

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `samples` | number | `3` | Foreign package names appended as a sample line. |

## Output

```
packages: 1084 installed (1066 repo, 18 AUR/foreign)
foreign: android-sdk-cmdline-tools-latest, ...
```

## Notes

The manifest only allows the `pacman` program; no shell is involved. Arch-family distributions only.
