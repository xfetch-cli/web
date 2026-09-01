# Custom-X Layout

`custom-x` is the most flexible layout in xfetch: every border line is a **literal template** you write in the `custom_x` config object. You decide the characters, the size, the internal separators, and can add extra lines — nothing is hardcoded.

## Enabling

```jsonc
{
    "layout": "custom-x",
    "custom_x": {
        // ... your templates ...
    }
}
```

## Templates and Placeholders

All border lines are strings (templates) that support two placeholders:

- `{fill}` — repeats the `fill` character until the line reaches the box width. Templates *without* `{fill}` are extended with the `fill` character at the end; templates *longer* than the content define the box width.
- `{title}` — replaced with the current group title (in `group_title` and `top` templates).

## Options

| Option | Default | Description |
|--------|---------|-------------|
| `top` | `╭─ {title}{fill}╮` | Top border template. Empty string disables it. |
| `bottom` | `╰{fill}╯` | Bottom border template. Empty string disables it. |
| `left` | `│` | Prefix for every content row (can be multiple characters). |
| `right` | `│` | Suffix for every content row. |
| `fill` | `─` | Character used by `{fill}` and to extend short templates. |
| `padding` | `1` | Spaces between the side borders and the content. |
| `width` | `"auto"` | `"auto"` sizes the box to the content; `"full"` stretches it to the end of the terminal line (accounting for the logo column, minus `full_margin`); a number sets a fixed width in columns. |
| `full_margin` | `2` | Cells left free at the right edge when `width: "full"` (avoids the terminal wrap column). |
| `group_title` | `── {title} ──` | Template rendered when a module group starts. Empty string hides group titles. |
| `divider` | (off) | Template rendered as an internal separator. Empty string disables it. |
| `divider_between` | `"groups"` | Where dividers appear: `"groups"` (between groups), `"modules"` (also between every module inside groups), or `"none"`. |
| `module_top` | (off) | Template rendered above every module row — wraps each module in its own box. |
| `module_bottom` | (off) | Template rendered below every module row. |
| `header_lines` | `[]` | Extra literal lines rendered after the top border (templates with placeholders allowed). |
| `footer_lines` | `[]` | Extra literal lines rendered before the bottom border. |

## Example

Everything inside one big frame, each group title boxed, and every module wrapped in its own box:

```jsonc
{
    "layout": "custom-x",
    "custom_x": {
        "top": "╔═══════ XFETCH ═══════{fill}╗",
        "bottom": "╚══════════════════════{fill}╝",
        "left": "║",
        "right": "║",
        "fill": "═",
        "padding": 1,
        "width": "full",
        "full_margin": 2,
        "group_title": "╭─── {title} ───{fill}╮",
        "module_top": "╠{fill}╣",
        "module_bottom": "╠{fill}╣",
        "divider_between": "none"
    },
    "modules": [
        { "type": "group", "title": "Hardware", "modules": ["cpu", "gpu"] },
        { "type": "group", "title": "Software", "modules": ["os", "kernel"] }
    ]
}
```

**Result:**

```
╔═══════ XFETCH ═════════════════════════╗
╭─── Hardware ───════════════════════════╮
╠════════════════════════════════════════╣
║  cpu Apple M4 (10) @ 4.46 GHz         ║
╠════════════════════════════════════════╣
║  gpu Apple M4                          ║
╠════════════════════════════════════════╣
╭─── Software ───════════════════════════╮
╠════════════════════════════════════════╣
║  os Darwin 26.5.2 aarch64              ║
╚════════════════════════════════════════╝
```

## Section-Style Example (no boxes)

Group headers like `hardware──────` with `────` separators between groups, no outer frame:

```jsonc
{
    "layout": "custom-x",
    "custom_x": {
        "top": "",
        "bottom": "",
        "left": "",
        "right": "",
        "fill": "─",
        "padding": 0,
        "group_title": "{title}{fill}",
        "divider": "{fill}",
        "divider_between": "groups"
    }
}
```

## Notes

- Empty templates (`""`) are skipped entirely — no blank lines are produced.
- With `width: "full"`, the small-terminal content fallback is applied consistently with the classic layouts.
- Nested groups render recursively (title lines and module rows inside the parent).
- The box width is always at least the widest template/content line; shorter rows are padded inside the right border.

See also: [Layouts](layouts.md).
