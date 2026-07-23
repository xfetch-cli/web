# Plugins

xfetch tiene un sistema de plugins que permite extender la funcionalidad a través de ejecutables independientes. Los plugins se comunican con el núcleo mediante un protocolo JSON sobre stdin/stdout.

## Resumen de la Arquitectura

Los plugins son ejecutables independientes llamados `xfetch-plugin-<nombre>` (o `xfetch-plugin-<nombre>.exe` en Windows). Son iniciados como procesos hijo por el núcleo de xfetch.

```
núcleo xfetch  --->  stdin (petición JSON)     --->  proceso plugin
núcleo xfetch  <---  stdout (respuesta JSON)   <---  proceso plugin
núcleo xfetch  <---  stderr (mensajes error)   <---  proceso plugin
```

### Tipos de Plugins

Hay dos tipos de plugins:

| Tipo | Identificador | Propósito |
|------|---------------|-----------|
| Animación de Logo | `logo_animation` | Anima logos ASCII con efectos de color |
| Proveedor de Información | `info_provider` | Devuelve líneas de información del sistema o externas |

## Protocolo JSON Wire

**Versión del Protocolo:** 1

### Protocolo de Proveedor de Información

Petición:

```json
{
    "version": 1,
    "kind": "info_provider",
    "args": {
        "username": "xscriptor",
        "max_lines": 3
    }
}
```

El campo `args` contiene argumentos específicos del plugin provenientes de la configuración. Si no se configuran argumentos, `args` es `null`.

Respuesta:

```json
{
    "lines": [
        "\uf09b X (@xscriptor)",
        "\uf005 114 stars",
        "\uf441 33 repos"
    ]
}
```

### Protocolo de Animación de Logo

Petición:

```json
{
    "version": 1,
    "kind": "logo_animation",
    "lines": [
        "  __  __",
        "  \\ \\/ /",
        "   \\  /"
    ],
    "frames": [
        ["frame 1 line 1", "frame 1 line 2"],
        ["frame 2 line 1", "frame 2 line 2"]
    ],
    "args": {
        "fps": 12,
        "duration_ms": 1200,
        "loop": false,
        "style": "sweep"
    }
}
```

El campo `lines` contiene el logo ASCII actual. El campo `frames` contiene conjuntos de fotogramas precargados opcionales. El campo `args` contiene parámetros de animación.

Respuesta:

```json
{
    "frames": [
        {
            "delay_ms": 83,
            "lines": ["\u001b[31mcolored line\u001b[0m", "\u001b[32mnext line\u001b[0m"]
        }
    ]
}
```

Cada fotograma tiene un `delay_ms` (cuánto tiempo mostrar el fotograma) y `lines` (el contenido del fotograma, potencialmente con códigos de escape ANSI para colores).

### Manejo de Errores

Los plugins deben escribir mensajes de error a stderr y salir con un código de estado distinto de cero en caso de fallo.

## Descubrimiento de Plugins

Al ejecutar un plugin, xfetch busca el binario en este orden:

1. **Ruta explícita:** Si el nombre del plugin contiene un separador de ruta, se usa como ruta de archivo directa
2. **PATH:** Busca `xfetch-plugin-<nombre>` en `$PATH`
3. **Directorio de plugins del usuario:** `~/.config/xfetch/plugins/` (Linux/macOS) o `%APPDATA%/xfetch/plugins/` (Windows)
4. **Directorios target del espacio de trabajo:** Varias rutas relativas al directorio de trabajo actual, incluyendo `./plugins/<nombre>/target/release/`
5. **Directorios de desarrollo:** Búsqueda en directorios ancestros para configuraciones de desarrollo

## Instalación de Plugins

```bash
# Instalar desde un directorio local
xfetch plugin install ./my-plugin

# Instalar desde el repositorio oficial de plugins
xfetch plugin install animate-logo

# Instalar desde un repositorio git personalizado
xfetch plugin install my-plugin --repo https://github.com/user/plugins.git
```

### Proceso de Instalación

1. Si el nombre del plugin es una ruta local, se usa directamente
2. En caso contrario, busca localmente en `./<nombre>/`, `./plugins/<nombre>/` o `./plugins/plugins/<nombre>/`
3. Si no se encuentra localmente, clona el repositorio de plugins (`https://github.com/xfetch-cli/plugins.git` por defecto)
4. Ejecuta `cargo build --release` en el directorio del plugin
5. Copia el binario compilado a `~/.config/xfetch/plugins/xfetch-plugin-<nombre>`

### Gestión de Plugins

```bash
# Listar plugins instalados
xfetch plugin list

# Eliminar un plugin
xfetch plugin remove animate-logo
```

## Plugins Oficiales

### animate-logo

Anima logos ASCII con varios efectos de color.

- **Tipo:** `logo_animation`
- **Binario:** `xfetch-plugin-animate-logo`

**Configuración:**

```jsonc
{
    "logo_animation": {
        "plugin": "animate-logo",
        "fps": 12,
        "duration_ms": 1200,
        "loop": false,
        "style": "sweep"
    }
}
```

**Estilos de animación:**

| Estilo | Descripción |
|--------|-------------|
| `sweep` | Los colores barren de izquierda a derecha a través de los caracteres (paleta ANSI de 6 colores) |
| `wave` | Patrón de color de onda sinusoidal a través del logo |
| `rainbow` | Gradiente RGB completo que cambia con el tiempo (color de 24 bits) |
| `sparkle` | Caracteres aleatorios se iluminan en colores brillantes |
| `breathing` | Todos los caracteres se desvanecen en tonos ámbar cálidos |
| `frame` | Cicla a través de conjuntos de fotogramas ASCII precargados |
| `none` | Sin color, muestra el logo tal cual |

### docker

Muestra estadísticas de contenedores Docker.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-docker`
- **Dependencias:** CLI de Docker (comando `docker` en PATH)

**Configuración:**

```jsonc
{
    "info_plugins": [{ "plugin": "docker" }],
    "modules": ["plugin:docker"]
}
```

**Salida:**

| Estado | Ejemplo |
|--------|---------|
| Demonio en ejecución | `Containers: 15 total`, `3 running`, `1 paused`, `11 stopped` |
| Demonio no en ejecución | `Docker: daemon not running` |
| CLI no encontrado | `Docker: not found` |

### github-stats

Obtiene estadísticas de usuario de GitHub.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-github-stats`
- **Dependencias:** CLI `curl` en PATH
- **Llamadas a API:** 4 peticiones a api.github.com

**Configuración:**

```jsonc
{
    "info_plugins": [{
        "plugin": "github-stats",
        "args": {
            "username": "xscriptor",
            "token": "ghp_your_token_here",
            "max_lines": 3
        }
    }],
    "modules": ["plugin:github-stats"]
}
```

**Argumentos:**

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| `username` | Sí (o env `GITHUB_USER`) | Nombre de usuario de GitHub |
| `token` | No | Token de acceso personal (5,000 req/h vs 60 req/h sin autenticar) |
| `max_lines` | No | Truncar salida a las primeras N líneas (1-7) |

**Líneas de salida:** Nombre + usuario, Estrellas, Repos, PRs, Issues, Seguidores, Siguiendo

### music-player

Muestra la música reproduciéndose actualmente desde MPD y/o Spotify.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-music-player`
- **Dependencias:** `mpc` (MPD), `playerctl` (Spotify)

**Configuración:**

```jsonc
{
    "info_plugins": [{ "plugin": "music-player" }],
    "modules": ["plugin:music-player"]
}
```

**Detección:** Verifica tanto MPD (mediante `mpc status`) como Spotify (mediante `playerctl -p spotify metadata`). Si ambos están activos, se muestra información de ambos.

### weather

Muestra las condiciones climáticas actuales.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-weather`
- **Dependencias:** CLI `curl` en PATH
- **API:** wttr.in (gratuita, no requiere clave API)

**Configuración:**

```jsonc
{
    "info_plugins": [{
        "plugin": "weather",
        "args": {
            "location": "London",
            "format": "%C|%t|%w|%h|%p"
        }
    }],
    "modules": ["plugin:weather"]
}
```

**Argumentos:**

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| `location` | No | Nombre de ciudad, coordenadas o código de aeropuerto. Auto-detecta por IP si se omite. |
| `format` | No | Cadena de formato de wttr.in. Predeterminado: `%C|%t|%w|%h|%p` |

**Salida:** Condición (texto), temperatura, humedad, viento, precipitación. Usa iconos de condiciones climáticas basados en el conjunto de iconos meteorológicos de Nerd Font.

### timezone

Muestra la hora, fecha y zona horaria actuales.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-timezone`

**Configuración:**

```jsonc
{
    "info_plugins": [{ "plugin": "timezone" }],
    "modules": ["plugin:timezone"]
}
```

**Argumentos:**

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| `format` | No | Cadena de formato de `date`. Predeterminado: `%Z %z` (nombre de zona horaria + offset UTC). |

**Detección de zona horaria:** `/etc/timezone` > enlace simbólico `/etc/localtime` > `timedatectl`

**Salida:** Fecha y hora actual (ej., "Thursday, 23 July 2026 14:30"), nombre de zona horaria y offset UTC.

### user-info

Muestra información de la cuenta de usuario.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-user-info`
- **Dependencias:** Herramientas CLI `id`, `getent`, `groups`

**Configuración:**

```jsonc
{
    "info_plugins": [{
        "plugin": "user-info",
        "args": { "show_groups": true }
    }],
    "modules": ["plugin:user-info"]
}
```

**Argumentos:**

| Campo | Requerido | Descripción |
|-------|-----------|-------------|
| `show_groups` | No | Mostrar pertenencias a grupos (máx. 10). Predeterminado: `false`. |

**Salida:** Nombre de usuario, nombre completo (de GECOS), UID, GID, directorio home, shell y opcionalmente grupos.

### display-resolution

Detecta la resolución del monitor y la tasa de refresco.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-display-resolution`

**Configuración:**

```jsonc
{
    "info_plugins": [{ "plugin": "display-resolution" }],
    "modules": ["plugin:display-resolution"]
}
```

**Detección por plataforma:**

| Plataforma | Método |
|------------|--------|
| Linux (X11) | `xrandr --current` (fallback: `xdpyinfo`) |
| Linux (Wayland) | `wlr-randr` |
| macOS | `system_profiler SPDisplaysDataType` |
| Windows | PowerShell `GetDeviceCaps` |

**Salida:** Nombre del monitor, resolución y tasa de refresco. Soporta múltiples monitores.

### theme-detection

Detecta la configuración actual del tema del escritorio.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-theme-detection`
- **Dependencias:** `gsettings` (GTK)

**Configuración:**

```jsonc
{
    "info_plugins": [{ "plugin": "theme-detection" }],
    "modules": ["plugin:theme-detection"]
}
```

**Detección:**

| Entorno | Fuente |
|---------|--------|
| GTK (GNOME, Budgie, Cinnamon) | `gsettings get org.gnome.desktop.interface` |
| KDE Plasma | `~/.config/plasmarc` y `~/.config/kdeglobals` |

**Salida:** Tema GTK, tema de iconos, tema de cursor, fuente, esquema de color (oscuro/claro) y tema de KDE Plasma si corresponde.

## Escritura de Plugins Personalizados

### Convención de Nomenclatura de Binarios

```
xfetch-plugin-<nombre>          (Linux/macOS)
xfetch-plugin-<nombre>.exe     (Windows)
```

### Esqueleto Mínimo de Plugin (Rust)

```toml
[package]
name = "xfetch-plugin-my-plugin"
version = "0.1.0"
edition = "2024"

[dependencies]
serde = { version = "1", features = ["derive"] }
serde_json = "1"
xfetch-plugin-api = { git = "https://github.com/xfetch-cli/api", package = "xfetch-plugin-api" }
```

```rust
use xfetch_plugin_api::{
    read_info_plugin_args_or_default,
    write_info_lines,
};

#[derive(Debug, Default, serde::Deserialize)]
struct PluginArgs {}

fn main() {
    let _args = match read_info_plugin_args_or_default::<PluginArgs>() {
        Ok(value) => value,
        Err(err) => {
            eprintln!("{}", err);
            std::process::exit(1);
        }
    };

    if let Err(err) = write_info_lines(vec!["Hello from plugin".to_string()]) {
        eprintln!("{}", err);
        std::process::exit(1);
    }
}
```

### Pruebas de Plugins

```bash
# Probar un plugin de información
echo '{"version":1,"kind":"info_provider","args":null}' \
  | ./target/release/xfetch-plugin-my-plugin

# Probar un plugin de animación de logo
echo '{"version":1,"kind":"logo_animation","lines":["hello"],"args":{"fps":12}}' \
  | ./target/release/xfetch-plugin-my-plugin
```

### Crate de API para Plugins

El crate `xfetch-plugin-api` (fuente en `github.com/xfetch-cli/api`) proporciona todos los tipos y ayudantes necesarios para el desarrollo de plugins:

- **Tipos de protocolo:** `AnimationFrame`, `EmptyArgs`, `InfoPluginRequest`, `InfoPluginResponse`, `LogoAnimationArgs`, `LogoAnimationRequest`, `LogoAnimationResponse`, `PluginKind`
- **Ayudantes de punto de entrada:** `read_logo_animation_request()`, `read_info_plugin_request()`, `read_info_plugin_args_or_default()`, `write_logo_animation_frames()`, `write_info_lines()`
- **Ayudantes de E/S:** `read_json_from_stdin()`, `write_json_to_stdout()`
- **Tipos de error:** Enum `PluginApiError` con variantes Io, Serialize, Deserialize, InvalidProtocolVersion, InvalidPluginKind, InvalidArgs, EmptyAnimationFrames

### Directrices

- Mantenga los plugins enfocados en una única responsabilidad
- Escriba errores a stderr y salga con estado distinto de cero
- No use librerías de visualización o terminal (el núcleo maneja el renderizado)
- Minimice las dependencias
- Use el crate compartido `xfetch-plugin-api` para los tipos de protocolo
- Maneje fallos de red o E/S de forma graceful
