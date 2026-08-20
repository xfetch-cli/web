# temperature

Informa de la temperatura de la CPU/SoC desde las zonas térmicas del kernel.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-temperature`
- **Dependencias:** ninguna en Linux (archivos de lectura pública), `wmic`/`powershell` en Windows

## Instalación

```bash
xfetch plugin install temperature
```

## Configuración

```jsonc
{
    "info_plugins": [{ "plugin": "temperature", "args": { "unit": "celsius" } }],
    "modules": ["plugin:temperature"]
}
```

## Argumentos

| Campo | Requerido | Por Defecto | Descripción |
|-------|-----------|-------------|-------------|
| `unit` | No | `"celsius"` | `"celsius"` o `"fahrenheit"` |

## Salida

| Estado | Salida |
|--------|--------|
| Zona leída | ` 45°C (x86_pkg_temp)` |
| Plataforma no soportada | ` Unsupported platform` |

## Plataforma

| Plataforma | Fuente | Notas |
|------------|--------|-------|
| Linux | `/sys/class/thermal/thermal_zone*/` | Archivos `type` + `temp` de lectura pública, sin subprocesos |
| Windows | WMI `MSAcpi_ThermalZoneTemperature` | Vía `wmic`, con fallback `powershell`; no requiere admin en la mayoría de máquinas |
| macOS | — | No soportado: las fuentes reales (`powermetrics`, SMC) requieren root o herramientas de terceros |

## Limitaciones

- El plugin se ejecuta con un presupuesto `with_timeout` de 2 s de la API de plugins, respondiendo con `Temperature: timed out` en lugar de colgar xfetch.
