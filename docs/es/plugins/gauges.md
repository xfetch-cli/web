# gauges

Renderiza el uso de memoria, swap, disco y batería como barras de progreso de texto. Cada línea conserva la medición nativa y agrega una barra al lado, por ejemplo `[####......] 476.00 GiB / 952.87 GiB (50%)`.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-gauges`
- **Dependencias:** `sysinfo` para memoria, swap y discos; `/sys/class/power_supply` para la batería en Linux

## Instalación

```bash
xfetch plugin install gauges
```

## Configuración

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

## Argumentos

| Campo | Tipo | Por defecto | Descripción |
|-------|------|-------------|-------------|
| `style` | string | `"auto"` | `auto` (barras inclinadas bajo 50%, numerales desde 50%), `slashes`, `hash` o `blocks` |
| `width` | number | `10` | Ancho de la barra en caracteres (limitado a 3-40) |
| `metrics` | array | todas | Subconjunto de `memory`, `swap`, `disk`, `battery` |
| `include_tmpfs` | boolean | `false` | Incluye montajes tmpfs/ramdisk en la sección de disco |
| `glyphs` | string | `"nerd"` | Set de iconos: `nerd`, `cjk` o `jp` |

## Salida de ejemplo

```
Mem  [////______] 10.96 GiB / 93.89 GiB (12%)
Swap [__________] 0.00 GiB / 4.00 GiB (0%)
Disk [###.......] 35.09 GiB / 952.87 GiB (4%) btrfs /
Disk [//////____] 7.20 GiB / 16.00 GiB (45%) ext4 /home
Batt [##########] 100% [Full] BAT0
```

## Plataforma

| Plataforma | Fuente |
|------------|--------|
| Linux | `sysinfo` para memoria/swap/discos; `/sys/class/power_supply` para batería |
| macOS / Windows | Memoria, swap y discos vía `sysinfo`; las líneas de batería se omiten |
