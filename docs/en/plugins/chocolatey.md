# chocolatey

Counts packages installed via Chocolatey (Windows package manager).

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-chocolatey`
- **Dependencies:** `choco` CLI (Windows only)

## Installation

```bash
xfetch plugin install chocolatey
```

## Configuration

```jsonc
{
    "info_plugins": [{ "plugin": "chocolatey" }],
    "modules": ["plugin:chocolatey"]
}
```

## Arguments

None.

## Platform

Windows only. Chocolatey is a Windows package manager; on Linux and macOS the plugin responds with `Chocolatey: not installed`.

## Output

| State | Output |
|-------|--------|
| Packages installed | ` 20 (chocolatey)` |
| Choco not installed | `Chocolatey: not installed` |
| No packages | `Chocolatey: no packages installed` |

## Limitations

- Chocolatey 2.4+ removed `--local-only`; `-r` (`--limit-output`) works on all versions.
- The plugin runs within a 10 s `with_timeout` budget from the plugin API — a slow first run responds with `Chocolatey: timed out` instead of hanging xfetch.
