# Primeros Pasos con xfetch

xfetch es una herramienta de obtención de información del sistema multiplataforma escrita en Rust. Muestra detalles sobre su sistema operativo, hardware, software y red en una salida de terminal personalizable con arte ASCII o imágenes.

## Instalación Rápida

### Linux y macOS

```bash
curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.sh | bash
```

Esto instala xfetch en `~/.local/bin/`, genera una primera configuración en `~/.config/xfetch/config.jsonc` con `xfetch --gen-config` y opcionalmente añade el directorio binario a su PATH.

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
| `--install-deps` | Instalar dependencias del sistema faltantes automáticamente |

### Windows (PowerShell)

Prebuilt binary (no Rust needed):

```powershell
irm https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install-prebuilt.ps1 | iex
```

From source:

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
### Gestores de Paquetes

xfetch está disponible mediante Homebrew:

```bash
brew tap xfetch-cli/tap
brew install xfetch
```

Desde crates.io:

```bash
cargo install xfetch-cli
```

Desde el PKGBUILD del repositorio:

```bash
git clone https://github.com/xfetch-cli/xfetch.git
cd xfetch
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
| `--layout <nombre>` | Diseño a usar con `--gen-config` (predeterminado: `section`) |
| `--logo <id>` | Id del logo (ej., `arch`, `windows-11`) a usar con `--gen-config` (requiere acceso de red al catálogo de logos) |
| `--clean-cache` | Limpiar la base de datos de caché |
| `--benchmark` | Mostrar información de tiempo para sondeos paralelos |
| `--daemon` | Iniciar el daemon animado |
| `--daemon-stop` | Detener el daemon |
| `--no-daemon-live` | Deshabilitar el daemon de estadísticas en vivo aunque esté en la configuración |
| `--daemon-live-stop` | Detener el daemon en vivo en ejecución |
| `--daemon-live-reload` | Forzar recarga en caliente en el daemon en vivo |

### Subcomandos de Plugins

```
xfetch plugin install <nombre>     Instalar un plugin (ruta local o desde repositorio)
xfetch plugin list                 Listar todos los plugins instalados
xfetch plugin remove <nombre>      Eliminar un plugin instalado
```

### Subcomandos de Extensiones

```
xfetch extension install <nombre>  Instalar una extensión (ruta local o desde repositorio)
xfetch extension list              Listar todas las extensiones instaladas
xfetch extension remove <nombre>   Eliminar una extensión instalada
```

### Subcomandos de Temas

```
xfetch theme list                  Listar temas instalados
xfetch theme set <nombre>          Activar un tema (establece el campo "theme" en config.jsonc)
xfetch theme remove <nombre>       Eliminar un archivo de tema
xfetch theme export <nombre>       Exportar la configuración visual actual como archivo de tema
```

### Subcomandos de Efectos

```
xfetch effects install <nombre>    Instalar un efecto de introducción
xfetch effects list                Listar efectos instalados
xfetch effects remove <nombre>     Eliminar un efecto
```

### Subcomando de Actualización

```
xfetch update                     Comprueba e instala una versión nueva
xfetch update --check             Solo informa; sale 1 si hay versión nueva
xfetch update --prebuilt          Fuerza la actualización prebuilt in-place (Unix)
xfetch update --bin-dir <dir>     Directorio del binario junto a --prebuilt
xfetch update --yes               Omite la confirmación
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

# Comprobar si hay una versión nueva
xfetch update --check

# Actualizar a la última versión
xfetch update
```

## Variables de Entorno

| Variable | Descripción |
|----------|-------------|
| `XFETCH_PLUGIN_REPO` | Sobrescribir la URL del repositorio git de plugins predeterminada |
| `XFETCH_PLUGIN_DEV_DIR` | Sobrescribir la ruta de búsqueda del directorio de desarrollo de plugins |
| `XFETCH_LOGOS_URL` | Sobrescribir la URL del catálogo de logos (usada por `--logo` con `--gen-config`) |
| `XFETCH_EFFECT_REPO` | Sobrescribir la URL del repositorio git de efectos |
| `XFETCH_WASM_LOG_LEVEL` | Umbral de logs de invitados WebAssembly: `off`, `error`, `warn` (por defecto), `info`, `debug` |
| `XFETCH_UPDATE_API` | Sobrescribe el endpoint de la API de GitHub usado por `xfetch update` (mirrors) |
| `CARGO_NET_GIT_FETCH_WITH_CLI` | Usar git CLI para la obtención (se establece automáticamente durante la instalación de plugins) |

## Actualización

xfetch puede comprobar e instalar nuevas versiones por si mismo:

```bash
xfetch update --check   # solo informa; sale con 1 si hay versión nueva
xfetch update           # instala la última versión
xfetch update --yes     # omite la confirmación
```

El comando detecta primero como se instalo el binario:

- Instalaciones prebuilt (`install-prebuilt.sh`, normalmente `~/.local/bin`): descarga el asset del release, lo verifica con `SHA256SUMS`, lo extrae y lo mueve sobre el ejecutable actual de forma atomica. Un unico `xfetch.bak` guarda el binario anterior.
- Binarios de `cargo install`: se actualizan con `cargo install xfetch-cli --force --locked`.
- Instalaciones por gestor de paquetes y builds locales: nunca se sustituyen; el comando imprime el comando adecuado.

`xfetch update --prebuilt --bin-dir <dir>` fuerza la actualizacion in-place de `<dir>/xfetch` (solo Unix). En Windows la ruta prebuilt aun no esta disponible; usa `cargo install xfetch-cli --force`.

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
