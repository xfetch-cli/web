# Generación de Configuración (`--gen-config`)

`xfetch --gen-config` genera un archivo de configuración inicial listo para usar. Cuando hay conexión a internet, además adjunta el logo ASCII de tu SO/distribución.

## Uso Básico

Genera el config en la ubicación predeterminada:

```bash
xfetch --gen-config
```

Genera en otra ubicación:

```bash
xfetch --gen-config --config ~/mi-setup/xfetch-config.jsonc
```

## Logo de la Distribución (`--logo`)

Por defecto el config generado incluye el logo ASCII del SO/distro detectado, descargado del catálogo [xfetch-cli/logos](https://github.com/xfetch-cli/logos).

### Detección Automática

Linux lee `/etc/os-release` (`ID` + `ID_LIKE`); macOS y Windows mapean su versión (`macos-ventura`, `windows-11`, ...). Orden de resolución: `ID` exacto → cada token de `ID_LIKE` → logo genérico de la categoría.

El arte se guarda en `<config_dir>/xfetch/logos/<id>.txt` y el config lo referencia con la clave `ascii`:

```jsonc
{
    "ascii": "/home/user/.config/xfetch/logos/ubuntu.txt",
    "layout": "pacman"
}
```

### Forzar un Logo

Cualquier id o alias del catálogo funciona, incluso de otros SO:

```bash
# Máquina Ubuntu, logo de Arch
xfetch --gen-config --logo arch

# Forzar un logo específico de otro SO/versión
xfetch --gen-config --logo windows-11
xfetch --gen-config --logo macos-ventura
```

### Fallbacks

- **Id desconocido:** avisa y usa el logo genérico de la categoría (`default.txt`)
- **Sin internet / error del catálogo:** el template se escribe sin logo; la detección automática falla en silencio, un `--logo` explícito muestra una advertencia
- **Caché offline:** una vez descargado, el logo queda en disco y se reutiliza sin conexión

La URL base del catálogo se puede sobreescribir para probar forks:

```bash
XFETCH_LOGOS_URL=https://raw.githubusercontent.com/<usuario>/logos/main xfetch --gen-config
```

## Layout (`--layout`)

El template trae el layout `section` (grupos Hardware/Software/Session). Usa `--layout` para generarlo con otro de los layouts integrados:

```bash
xfetch --gen-config --layout pacman
xfetch --gen-config --layout tree
xfetch --gen-config --layout compact
```

Nombres disponibles: `default`, `side-block`, `tree`, `section`, `section-box`, `custom-x`, `compact`, `minimal`, `pacman`, `box`, `line`, `dots`, `bottom_line`, `horizontal`, `bottom`. Un nombre desconocido avisa y mantiene `section`.

## Ejemplo Combinado

```bash
xfetch --gen-config --layout tree --logo arch --config ~/configs/arch-tree.jsonc
```

Las flags `--logo` y `--layout` solo aplican a `--gen-config`; el comportamiento en tiempo de ejecución no cambia.
