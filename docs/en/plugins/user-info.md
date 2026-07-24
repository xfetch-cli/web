# user-info

Displays user account information.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-user-info`
- **Dependencies:** `id`, `getent`, `groups`, `whoami`

## Configuration

```jsonc
{
    "info_plugins": [{
        "plugin": "user-info",
        "args": { "show_groups": true }
    }],
    "modules": ["plugin:user-info"]
}
```

## Arguments

| Field | Required | Default | Description |
|-------|----------|---------|-------------|
| `show_groups` | No | `false` | Show group memberships (max 10) |

## Output

| # | Line |
|---|------|
| 1 | ` Full Name (username)` |
| 2 | `   uid: N  gid: N` |
| 3 | `   /home/user` |
| 4 | `   shell` |
| 5 (if groups) | `   groups: wheel, users, docker` |
