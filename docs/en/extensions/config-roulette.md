# Config Roulette

Picks a random (or daily) configuration from a list of paths and loads it. Every xfetch invocation can show a completely different look — different layout, logo, theme, colors, modules, and icons.

## Installation

```bash
cp xfetch-extension-config-roulette ~/.config/xfetch/extensions/
```

Or via CLI:

```bash
xfetch extension install ./path/to/xfetch-extension-config-roulette
```

## Configuration

### 1. Create a routes file

```json
[
    { "_name": "default-full",   "path": "~/.config/xfetch/fetchs/001-layout-default/config.jsonc" },
    { "_name": "tree-view",      "path": "~/.config/xfetch/fetchs/004-layout-tree/config.jsonc" },
    { "_name": "pacman-classic",  "path": "~/.config/xfetch/fetchs/008-layout-pacman/config.jsonc" }
]
```

Each route points to a complete xfetch config file. The `_name` field is optional and only used for readability.

### 2. Add to your xfetch config

```jsonc
{
    "config_providers": [
        {
            "extension": "config-roulette",
            "args": {
                "routes": "~/.config/xfetch/routes.json",
                "strategy": "random"
            }
        }
    ]
}
```

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `routes` | `string` | `~/.config/xfetch/routes.json` | Path to the JSON routes file |
| `strategy` | `"random"` or `"daily"` | `"daily"` | Selection strategy |

## Strategies

- **`random`** — picks a different config on every execution (uses sub-second timer as seed)
- **`daily`** — picks the same config all day, changes the next day (uses Unix date as seed)

## Use Cases

- See a different visual style every time you open a terminal
- Test all your configs automatically without running them manually
- Daily themes — same look all day, new look tomorrow
- Rotate through hundreds of configs from a collection
