# chocolatey

Cuenta los paquetes instalados vía Chocolatey (gestor de paquetes de Windows).

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-chocolatey`
- **Dependencias:** CLI `choco` (solo Windows)

## Instalación

```bash
xfetch plugin install chocolatey
```

## Configuración

```jsonc
{
    "info_plugins": [{ "plugin": "chocolatey" }],
    "modules": ["plugin:chocolatey"]
}
```

## Argumentos

Ninguno.

## Plataforma

Solo Windows. Chocolatey es un gestor de paquetes de Windows; en Linux y macOS el plugin responde con `Chocolatey: not installed`.

## Salida

| Estado | Salida |
|--------|--------|
| Paquetes instalados | ` 20 (chocolatey)` |
| Choco no instalado | `Chocolatey: not installed` |
| Sin paquetes | `Chocolatey: no packages installed` |

## Limitaciones

- Chocolatey 2.4+ eliminó `--local-only`; `-r` (`--limit-output`) funciona en todas las versiones.
- El plugin se ejecuta con un presupuesto `with_timeout` de 10 s de la API de plugins — una primera ejecución lenta responde con `Chocolatey: timed out` en lugar de colgar xfetch.
