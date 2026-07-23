# Contribuir

## Compilación desde el Código Fuente

xfetch está escrito en Rust (edición 2024). Para compilar desde el código fuente, necesita Rust instalado (instálelo mediante `rustup` en rust-lang.org).

### Prerrequisitos

- Toolchain de Rust (edición 2024)
- Cargo (incluido con Rust)

### Clonar y Compilar

```bash
git clone https://github.com/xfetch-cli/xfetch.git
cd xfetch
cargo build --release
```

El binario se ubicará en `target/release/xfetch`.

### Instalar desde el Código Fuente

```bash
cargo install --path .
```

Esto instala el binario en `~/.cargo/bin/xfetch`.

## Estructura del Proyecto

El ecosistema de xfetch está organizado como una arquitectura multi-repositorio bajo la organización de GitHub `xfetch-cli`:

```
xfetch/
  api/              # SDK de API para plugins (crate de Rust)
  assets/           # Archivos de logo y banner
  configs/          # Configuraciones predefinidas públicas
  plugins/          # Implementaciones de plugins oficiales (espacio de trabajo)
  web/              # Página de aterrizaje (Next.js)
  xfetch/           # Aplicación CLI principal (Rust)
```

### CLI Principal (`xfetch/`)

```
xfetch/
  src/
    main.rs           # Punto de entrada
    cli.rs            # Análisis de argumentos CLI (clap)
    config.rs         # Carga de configuración JSONC
    cache.rs          # Almacenamiento en caché de datos con TTL
    ui.rs             # Orquestador de renderizado
    ui/
      nodes.rs        # Preparación del árbol de renderizado
      layout.rs       # Despacho de diseños
      logo.rs         # Carga de logos (ASCII, imagen)
      print.rs        # Renderizado de salida a terminal
      renders.rs      # Implementaciones de renderizado de diseños
      x.rs            # Utilidades de expansión de rutas
    info/
      mod.rs          # Estructura Info y orquestación
      system.rs       # Información de SO, kernel, red
      software.rs     # Información de shell, terminal, paquetes, usuario
      hardware.rs     # Información de CPU, GPU, memoria, disco, batería
    plugins/
      mod.rs          # Descubrimiento y nomenclatura de plugins
      install.rs      # Instalación de plugins
      manage.rs       # Listado y eliminación de plugins
      run.rs          # Ejecución de plugins
```

### API de Plugins (`api/`)

```
api/
  crates/
    plugin-api/
      src/
        lib.rs        # Reexportaciones públicas
        protocol.rs   # Tipos del protocolo wire
        entrypoints.rs # Ayudantes de punto de entrada para plugins
        io.rs         # Ayudantes JSON stdin/stdout
        error.rs      # Tipos de error
```

### Plugins Oficiales (`plugins/`)

```
plugins/
  plugins/
    animate-logo/       # Plugin de animación de logo
    display-resolution/ # Plugin de resolución de monitor
    docker/             # Plugin de estadísticas Docker
    github-stats/       # Plugin de perfil de GitHub
    music-player/       # Plugin de MPD y Spotify
    theme-detection/    # Plugin de temas GTK/KDE
    timezone/           # Plugin de zona horaria
    user-info/          # Plugin de información de cuenta de usuario
    weather/            # Plugin meteorológico
```

## Flujo de Trabajo de Desarrollo

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
cd xfetch
cargo test

# Ejecutar pruebas con salida
cargo test -- --nocapture

# Ejecutar una prueba específica
cargo test nombre_prueba
```

### Calidad del Código

```bash
# Lint
cargo clippy

# Formateo
cargo fmt

# Verificación (compilación rápida, sin binario)
cargo check
```

### Pruebas de Plugins

```bash
# Probar un plugin de información mediante el protocolo JSON
echo '{"version":1,"kind":"info_provider","args":null}' \
  | ./target/release/xfetch-plugin-my-plugin

# Probar un plugin de animación de logo
echo '{"version":1,"kind":"logo_animation","lines":["hello"],"args":{"fps":12}}' \
  | ./target/release/xfetch-plugin-my-plugin
```

## Escritura de Plugins

### Convención de Nomenclatura

Los binarios de plugins deben seguir la convención de nomenclatura `xfetch-plugin-<nombre>` para que el núcleo pueda descubrirlos.

### Protocolo de Plugins

Los plugins se comunican con el núcleo de xfetch mediante un protocolo JSON sobre stdin/stdout:

1. El núcleo escribe una petición JSON al stdin del plugin
2. El plugin procesa la petición
3. El plugin escribe una respuesta JSON a stdout
4. En caso de error, el plugin escribe a stderr y sale con estado distinto de cero

### Esqueleto Mínimo de Plugin de Información

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

    let lines = vec!["Hello from plugin".to_string()];

    if let Err(err) = write_info_lines(lines) {
        eprintln!("{}", err);
        std::process::exit(1);
    }
}
```

### Cargo.toml para Plugins

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

### Estándares para Plugins

- Escriba todo el código y la documentación en inglés
- Use el crate compartido `xfetch-plugin-api` para los tipos de protocolo
- Maneje los errores explícitamente -- escriba a stderr y salga con código distinto de cero
- No use librerías de visualización o terminal (el núcleo maneja el renderizado)
- Mantenga los plugins enfocados en una única responsabilidad
- Minimice las dependencias
- Maneje fallos de red o E/S de forma graceful con mensajes informativos

## Proceso de Pull Request

1. Haga un fork del repositorio y cree una rama de funcionalidad
2. Implemente sus cambios siguiendo los estándares de codificación
3. Asegúrese de que `cargo build --release` se ejecute correctamente
4. Añada pruebas para la nueva funcionalidad
5. Ejecute `cargo test` para verificar que todas las pruebas pasen
6. Envíe un pull request con una descripción clara de sus cambios

## Pruebas

### Categorías de Pruebas

| Categoría | Ubicación | Descripción |
|-----------|-----------|-------------|
| Pruebas unitarias | En cada archivo fuente | Pruebas para funciones individuales |
| Pruebas de integración | Submódulos de `src/` | Pruebas para interacciones entre módulos |
| Pruebas de protocolo de plugins | `api/crates/plugin-api/src/protocol.rs` | Pruebas de serialización y validación |

### Cobertura de Pruebas Existente

- Sistema de caché: set/get, expiración, claves faltantes, limpieza
- Análisis de configuración: árbol de módulos, prevención de inyección
- Renderizado de diseños: clásico, side-block, árbol, casos vacíos
- Carga de logos: logo predeterminado, expansión de ruta
- Módulos de información: hostname, batería, GPU, paquetes, SO, kernel, uptime, datetime, usuario, escritorio
- Sistema de plugins: nomenclatura, descubrimiento de binarios, directorios candidatos

## Seguridad

- Reporte vulnerabilidades de seguridad a `x@xscriptor.com`
- Tiempo de respuesta objetivo: dentro de 7 días
- No exponga secretos o tokens en argumentos de plugins en el control de versiones
- Use variables de entorno o configuración segura para datos sensibles

## Licencia

xfetch está licenciado bajo la Licencia MIT. Al contribuir, acepta que sus contribuciones se licenciarán bajo la misma licencia.
