# Primeros Pasos con xfetch

xfetch es una herramienta de obtención de información del sistema multiplataforma escrita en Rust. Muestra detalles sobre su sistema operativo, hardware, software y red en una salida de terminal personalizable con arte ASCII o imágenes.

## Instalación Rápida

### Linux y macOS

```bash
curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.sh | bash
```

Esto instala xfetch en `~/.local/bin/`, copia las configuraciones predeterminadas a `~/.config/xfetch/` y opcionalmente añade el directorio binario a su PATH.

Para personalizar la ruta de instalación:

```bash
curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.sh | bash -s -- --prefix ~/myapps
```

Banderas:

| Bandera | Descripción |
|---------|-------------|
| `--local` | Usar el repositorio local en lugar de clonar |
| `--prefix <dir>` | Prefijo de instalación (predeterminado: `~/.local`) |
| `--bin-dir <dir>` | Directorio de binarios (predeterminado: `~/.local/bin`) |
| `--config-dir <dir>` | Directorio de configuración (predeterminado: `~/.config/xfetch`) |
| `--no-modify-path` | No añadir el directorio bin al PATH en el rc del shell |
| `--yes` | Sí automático a todas las indicaciones |
| `--skip-config` | Omitir la copia de la configuración predeterminada |
| `--no-cargo-install` | Usar un binario precompilado en lugar de compilar con Cargo |

### Windows (PowerShell)

```powershell
irm https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.ps1 | iex
```

### Compilación Manual desde el Código Fuente

```bash
git clone https://github.com/xfetch-cli/xfetch.git
cd xfetch
cargo build --release
cp target/release/xfetch ~/.local/bin/
```

### Arch Linux (AUR)

xfetch está disponible en AUR como `xfetch-git`. Compile e instale con makepkg o su ayudante AUR preferido:

```bash
git clone https://aur.archlinux.org/xfetch-git.git
cd xfetch-git
makepkg -si
```

## Primera Ejecución

Después de la instalación, simplemente ejecute:

```bash
xfetch
```

Debería ver la información del sistema mostrada junto a un logo ASCII, con una estructura similar a esta:

```
__  __                               OS: Arch Linux x86_64
  \ \/ /                             Kernel: 6.6.87.2-arch1-1
   \  /                              Uptime: 2 hours, 15 mins
   /  \                              Packages: 657 (pacman)
  /_/\_\                             WM: Hyprland
 /____/linux                         Shell: zsh
---------BEGIN PUBLIC KEY----------   CPU: Intel(R) Core(TM) i5-7400 @ 3.00GHz (4)
...                                  GPU: NVIDIA GeForce RTX 3060
----------END PUBLIC KEY-----------   Memory: 3.10 GiB / 7.74 GiB (40%)
                                     Disk: 120.5 GiB / 256 GiB (47%) - ext4
                                     Battery: 85% [Charging]
```

## Interfaz de Línea de Comandos

### Banderas Globales

| Bandera | Descripción |
|---------|-------------|
| `-c, --config <RUTA>` | Ruta a un archivo de configuración personalizado (formato JSONC) |
| `--gen-config` | Generar un archivo de configuración predeterminado en la ruta de configuración estándar |
| `--clean-cache` | Limpiar la base de datos de caché |
| `--benchmark` | Mostrar información de tiempo para sondeos paralelos |

### Subcomandos de Plugins

```
xfetch plugin install <nombre>     Instalar un plugin (ruta local o desde repositorio)
xfetch plugin list                 Listar todos los plugins instalados
xfetch plugin remove <nombre>      Eliminar un plugin instalado
```

### Ejemplos de Uso

```bash
# Ejecutar con configuración predeterminada
xfetch

# Ejecutar con una configuración personalizada
xfetch --config ~/.config/xfetch/my-config.jsonc

# Generar una configuración predeterminada
xfetch --gen-config

# Ejecutar en modo de evaluación comparativa
xfetch --benchmark

# Limpiar datos en caché
xfetch --clean-cache

# Instalar un plugin
xfetch plugin install animate-logo

# Listar plugins instalados
xfetch plugin list

# Eliminar un plugin
xfetch plugin remove docker
```

## Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `XFETCH_PLUGIN_REPO` | Sobrescribir la URL del repositorio git de plugins predeterminada |
| `XFETCH_PLUGIN_DEV_DIR` | Sobrescribir la ruta de búsqueda del directorio de desarrollo de plugins |
| `CARGO_NET_GIT_FETCH_WITH_CLI` | Usar git CLI para la obtención (se establece automáticamente durante la instalación de plugins) |

## Desinstalación

### Desinstalación Rápida

```bash
curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/uninstall.sh | bash
```

### Desinstalación Manual

```bash
rm ~/.local/bin/xfetch
rm -rf ~/.config/xfetch
```

Luego elimine cualquier modificación del PATH de su archivo rc del shell si el instalador las añadió.
