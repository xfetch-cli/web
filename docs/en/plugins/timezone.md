# timezone

Displays current time, date, and timezone information.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-timezone`
- **Dependencies:** `date` (required), `timedatectl` (optional)

## Configuration

```jsonc
{
    "info_plugins": [{ "plugin": "timezone" }],
    "modules": ["plugin:timezone"]
}
```

## Arguments

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `format` | No | `%Z %z` | `date` format string for timezone display |

## Output

| State | Output |
|-------|--------|
| Normal | ` Wednesday, 23 July 2026  14:30` / `   America/New York (EST -05:00)` |
| Not detected | ` Timezone: unknown` |

Timezone is detected from `/etc/timezone` > `/etc/localtime` symlink > `timedatectl`.
