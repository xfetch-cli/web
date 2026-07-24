# weather

Displays current weather conditions via wttr.in.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-weather`
- **Dependencies:** `curl` in PATH
- **API:** [wttr.in](https://wttr.in) (free, no API key)

## Configuration

```jsonc
{
    "info_plugins": [{
        "plugin": "weather",
        "args": {
            "location": "London",
            "format": "%C|%t|%w|%h|%p"
        }
    }],
    "modules": ["plugin:weather"]
}
```

## Arguments

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `location` | No | Auto-detect by IP | City name, coordinates, or airport code |
| `format` | No | `%C\|%t\|%w\|%h\|%p` | wttr.in format string (pipe-separated) |

## Output

| State | Output |
|-------|--------|
| Weather fetched | `☀ +15°C Clear` / `   Humidity: 60%` / `   Wind: ↑15 km/h` / `   Precipitation: 0%` |
| Network error | ` Weather: could not fetch` |
| No data | ` Weather: no data` |

Icons auto-select based on condition: Clear/Sunny (`☀`), Cloudy (`☁`), Rain (`🌧`), Snow (`❄️`), Thunder (`⛈`), Fog (`🌫`), Partly (`⛅`).
