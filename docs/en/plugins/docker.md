# docker

Displays Docker container statistics.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-docker`
- **Dependencies:** Docker CLI (`docker` in PATH)

## Configuration

```jsonc
{
    "info_plugins": [{ "plugin": "docker" }],
    "modules": ["plugin:docker"]
}
```

## Arguments

None.

## Output

| State | Output |
|-------|--------|
| Daemon running | ` Containers: 15 total`, `  ▶ 3 running`, `  ⏸ 1 paused`, `  ⏹ 11 stopped` |
| Daemon not running | ` Docker: daemon not running` |
| CLI not found | ` Docker: not found` |
