# temperature

Meldet die CPU/SoC-Temperatur aus den thermischen Zonen des Kernels.

- **Art:** `info_provider`
- **Binär:** `xfetch-plugin-temperature`
- **Abhängigkeiten:** keine auf Linux (weltweit lesbare Dateien), `wmic`/`powershell` auf Windows

## Installation

```bash
xfetch plugin install temperature
```

## Konfiguration

```jsonc
{
    "info_plugins": [{ "plugin": "temperature", "args": { "unit": "celsius" } }],
    "modules": ["plugin:temperature"]
}
```

## Argumente

| Feld | Erforderlich | Standard | Beschreibung |
|------|-------------|----------|-------------|
| `unit` | Nein | `"celsius"` | `"celsius"` oder `"fahrenheit"` |

## Ausgabe

| Zustand | Ausgabe |
|---------|---------|
| Zone gelesen | ` 45°C (x86_pkg_temp)` |
| Nicht unterstützte Plattform | ` Unsupported platform` |

## Plattform

| Plattform | Quelle | Hinweise |
|-----------|--------|----------|
| Linux | `/sys/class/thermal/thermal_zone*/` | Weltweit lesbare `type`- und `temp`-Dateien, ohne Subprozess |
| Windows | WMI `MSAcpi_ThermalZoneTemperature` | Über `wmic`, mit `powershell`-Fallback; auf den meisten Rechnern ohne Admin nötig |
| macOS | — | Nicht unterstützt: Die echten Quellen (`powermetrics`, SMC) erfordern Root oder Drittanbieter-Tools |

## Einschränkungen

- Das Plugin läuft mit einem `with_timeout`-Budget von 2 s aus der Plugin-API und antwortet mit `Temperature: timed out`, statt xfetch hängen zu lassen.
