# temperature

Reports CPU/SoC temperature from the kernel thermal zones.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-temperature`
- **Dependencies:** none on Linux (world-readable files), `wmic`/`powershell` on Windows

## Installation

```bash
xfetch plugin install temperature
```

## Configuration

```jsonc
{
    "info_plugins": [{ "plugin": "temperature", "args": { "unit": "celsius" } }],
    "modules": ["plugin:temperature"]
}
```

## Arguments

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `unit` | No | `"celsius"` | `"celsius"` or `"fahrenheit"` |

## Output

| State | Output |
|-------|--------|
| Zone read | ` 45°C (x86_pkg_temp)` |
| Unsupported platform | ` Unsupported platform` |

## Platform

| Platform | Source | Notes |
|----------|--------|-------|
| Linux | `/sys/class/thermal/thermal_zone*/` | World-readable `type` + `temp` files, no subprocess |
| Windows | WMI `MSAcpi_ThermalZoneTemperature` | Via `wmic`, `powershell` fallback; no admin needed on most machines |
| macOS | — | Unsupported: real sources (`powermetrics`, SMC) require root or third-party tools |

## Limitations

- The plugin runs within a 2 s `with_timeout` budget from the plugin API, responding with `Temperature: timed out` instead of hanging xfetch.
