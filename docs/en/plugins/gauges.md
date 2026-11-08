# gauges

Renders memory, swap, disk and battery usage as text progress bars. Every line keeps the native measurement and adds a bar next to it, for example `[####......] 476.00 GiB / 952.87 GiB (50%)`.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-gauges`
- **Dependencies:** `sysinfo` for memory, swap and disks; `/sys/class/power_supply` for battery on Linux

## Installation

```bash
xfetch plugin install gauges
```

## Configuration

```jsonc
{
    "info_plugins": [
        {
            "plugin": "gauges",
            "args": {
                "style": "auto",
                "width": 10,
                "metrics": ["memory", "swap", "disk", "battery"]
            }
        }
    ],
    "modules": ["plugin:gauges"],
    "icons": { "plugin:gauges": "" }
}
```

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `style` | string | `"auto"` | `auto` (slashes under 50%, hashes from 50%), `slashes`, `hash` or `blocks` |
| `width` | number | `10` | Bar width in characters (clamped to 3-40) |
| `metrics` | array | all | Subset of `memory`, `swap`, `disk`, `battery` |
| `include_tmpfs` | boolean | `false` | Also list tmpfs/ramdisk mounts in the disk section |
| `glyphs` | string | `"nerd"` | Icon set: `nerd`, `cjk` or `jp` |

## Example output

```
Mem  [////______] 10.96 GiB / 93.89 GiB (12%)
Swap [__________] 0.00 GiB / 4.00 GiB (0%)
Disk [###.......] 35.09 GiB / 952.87 GiB (4%) btrfs /
Disk [//////____] 7.20 GiB / 16.00 GiB (45%) ext4 /home
Batt [##########] 100% [Full] BAT0
```

## Platform

| Platform | Source |
|----------|--------|
| Linux | `sysinfo` for memory/swap/disks; `/sys/class/power_supply` for battery |
| macOS / Windows | Memory, swap and disks via `sysinfo`; battery lines are omitted |
