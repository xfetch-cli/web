# banner

Prints a short Chinese/Japanese proverb banner under or above the ASCII logo, without modifying the logo file.

- **Kind:** `logo_animation`
- **Binary:** `xfetch-plugin-banner`
- **Dependencies:** none
- **Terminal:** requires a CJK-capable font and a TTY

## Installation

```bash
xfetch plugin install banner
```

## Configuration

```jsonc
{
    "logo_animation": {
        "plugin": "banner",
        "style": "banner",
        "timeout_secs": 3
    }
}
```

## Styles

| `style` | Behaviour |
|---------|-----------|
| `banner` | Random proverb, below the logo |
| `banner-above` | Random proverb, above the logo |
| `banner-static` | Always the first proverb, below |
| `banner-N` | The N-th proverb (1-based), below |

Set `frames_path` to a text file to use its first `===`-separated frame as the banner text instead of the built-in list.

## Alignment

The banner is centred to the logo width using terminal display width, so ANSI color codes are ignored. Longer banners wrap to the logo width instead of widening the logo block, which keeps box layouts aligned.

## Proverb list

A mix of Chinese and Japanese sayings such as `千里之行，始于足下`, `七転び八起き` and `一期一会`. The plugin picks one per run.

## Platform

Native plugin for Linux, macOS and Windows. The banner is skipped when xfetch renders an image logo; use `banner-text` for captions that should also appear with image logos.
