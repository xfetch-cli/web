# Layout Override

Forces a specific layout and/or module set at config load time, regardless of what the config or theme file specifies. Runs after theme merge but before rendering.

## Installation

```bash
cp xfetch-extension-layout-override ~/.config/xfetch/extensions/
```

Or via CLI:

```bash
xfetch extension install ./path/to/xfetch-extension-layout-override
```

## Configuration

```jsonc
{
    "layout": "pacman",
    "modules": ["os", "kernel", "uptime"],
    "config_providers": [
        {
            "extension": "layout-override",
            "args": {
                "layout": "tree",
                "modules": ["os", "kernel", "uptime", "packages", "shell", "cpu", "memory", "palette"]
            }
        }
    ]
}
```

In this example, the config sets `layout: "pacman"`, but the extension overrides it to `"tree"` before rendering.

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `layout` | `string` | — | Layout to force (`default`, `tree`, `pacman`, `compact`, `box`, `section`, etc.) |
| `modules` | `string[]` | — | Module list to replace |

If a field is omitted, the original value from the config is preserved.

## Use Cases

- Force a specific layout when using a theme that doesn't specify one
- Temporarily override modules without editing the config file
- Chain with config-roulette — let one extension randomize, another normalize the layout
