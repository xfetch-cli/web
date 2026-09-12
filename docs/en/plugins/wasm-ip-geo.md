# wasm-ip-geo

Public IP, location, network and timezone via ipapi.co, built as a Python component.

- **Kind:** `info_provider`
- **Artifact:** `wasm-ip-geo.wasm` (component)
- **Capabilities:** `https://ipapi.co/*`
- **Language:** Python (componentize-py)

## Installation

```bash
xfetch plugin install ./plugins/wasm-ip-geo
```

The installer builds the guest through its manifest when needed.

## Configuration

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-ip-geo", "args": { "fields": ["ip", "location", "org", "timezone"] } }],
    "modules": ["plugin:wasm-ip-geo"]
}
```

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `fields` | string[] | all four | Any of `ip`, `location`, `org`, `timezone`. |

## Output

```
ip: 203.0.113.42 (IPv4)
location: Madrid, MD - Spain
network: Example Telecom S.A.
timezone: Europe/Madrid (UTC+0200)
```

## Notes

Only ipapi.co is allowlisted. The component needs about 256 MiB of memory because it embeds CPython.
