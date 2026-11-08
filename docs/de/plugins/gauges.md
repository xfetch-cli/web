# gauges

Rendert Speicher-, Swap-, Disk- und Akku-Nutzung als Text-Fortschrittsbalken. Jede Zeile behält die native Messung und ergänzt einen Balken, zum Beispiel `[####......] 476.00 GiB / 952.87 GiB (50%)`.

- **Art:** `info_provider`
- **Binary:** `xfetch-plugin-gauges`
- **Abhängigkeiten:** `sysinfo` für Speicher, Swap und Disks; `/sys/class/power_supply` für Akku unter Linux

## Installation

```bash
xfetch plugin install gauges
```

## Konfiguration

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

## Argumente

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `style` | string | `"auto"` | `auto` (Schrägstriche unter 50%, Rauten ab 50%), `slashes`, `hash` oder `blocks` |
| `width` | number | `10` | Balkenbreite in Zeichen (begrenzt auf 3-40) |
| `metrics` | array | alle | Teilmenge aus `memory`, `swap`, `disk`, `battery` |
| `include_tmpfs` | boolean | `false` | Listet auch tmpfs/ramdisk-Mounts im Disk-Abschnitt |
| `glyphs` | string | `"nerd"` | Icon-Set: `nerd`, `cjk` oder `jp` |

## Beispielausgabe

```
Mem  [////______] 10.96 GiB / 93.89 GiB (12%)
Swap [__________] 0.00 GiB / 4.00 GiB (0%)
Disk [###.......] 35.09 GiB / 952.87 GiB (4%) btrfs /
Disk [//////____] 7.20 GiB / 16.00 GiB (45%) ext4 /home
Batt [##########] 100% [Full] BAT0
```

## Plattform

| Plattform | Quelle |
|-----------|--------|
| Linux | `sysinfo` für Speicher/Swap/Disks; `/sys/class/power_supply` für Akku |
| macOS / Windows | Speicher, Swap und Disks über `sysinfo`; Akku-Zeilen entfallen |
