# Registro de Cambios
# Registro de Cambios

## v0.9.0 · Invitados WebAssembly, llamadas al host y ejemplos utiles · 2026-09-12

- **Runtime WebAssembly con sandbox:** plugins, efectos y extensiones pueden ser artefactos `.wasm` (módulos core y componentes) ejecutados por wasmtime con capacidades declaradas en el manifiesto y denegadas por defecto (HTTP, ejecución, sistema de archivos, entorno) y limites de tiempo, memoria y salida
- **Mismo protocolo:** los módulos core mantienen el contrato JSON por stdin/stdout; los componentes exportan `run` desde el mundo WIT `xfetch:runtime` con imports tipados
- **Herramientas:** `xfetch wasm inspect`, `xfetch wasm run` y `xfetch wasm wit`; los instaladores aceptan artefactos precompilados, comandos `build`, `artifact_url` o URLs directas
- **Nuevo crate `xfetch-guest-api`** para invitados Rust de modulo core y `with_timeout` compatible con wasm en todos los crates de API
- **Ejemplos utiles en cuatro lenguajes:** precios de cripto, geolocalización de IP, conteo de paquetes pacman y estadisticas de `/proc`, además de las extensiones de modo nocturno, footer de actualizaciones y etiquetas localizadas
- Corregido el glifo `swap` de las configs generadas y eliminados los emojis restantes de presets y docs del clima
- Los logs de los invitados se filtran por defecto (solo se muestran `warn`/`error`); `XFETCH_WASM_LOG_LEVEL` (`off`..`debug`) controla el umbral
- 195 tests mas pruebas e2e del CLI para wasm, clippy limpio

## v0.8.0 · Instalación con crates.io, Dependencias más Ligeras e IP Pública por HTTPS · 2026-08-21

- **crates.io:** ahora se admite `cargo install xfetch-cli`
- **Adelgazamiento del árbol de dependencias:** eliminada la cadena del codificador AVIF (`ravif`/`rav1e`/`rayon`) — de 196 a 133 crates, cero vulnerabilidades; códecs de `image` limitados a los que usa el renderizador de logos; crates de API fijadas a un commit concreto
- **IP pública por HTTPS:** las sondas de IP pública ahora usan TLS (raíces de Mozilla) con validación estricta de `IpAddr`, tope de 64 bytes y sin redirecciones
- **Endurecimiento del catálogo de logos:** el arte descargado rechaza secuencias de escape ANSI y caracteres de control, cayendo al logo por defecto
- 147 tests, clippy limpio

## v0.7.0 · Etiquetas y Formatos de Valor Configurables · 2026-08-20

- **Mapa de config `labels`:** renombra la clave mostrada por módulo en todos los layouts; una cadena vacía oculta la clave (fila solo-icono); los colores siguen usando la clave original del módulo
- **Mapa de config `formats`:** plantillas de valor con placeholders `{campo}` por módulo — CPU `{brand}`/`{model}`/`{cores}`/`{freq}`, GPU `{name}`/`{vendor}`/`{model}`/`{vram}`, memoria/swap `{used}`/`{total}`/`{percent}`, disco `{fs}`, os `{distro}`/`{version}`/`{arch}`/`{wsl}`, packages un campo por gestor más `{count}`/`{manager}`/`{managers}`, batería `{percent}`/`{state}`, uptime `{days}`/`{hours}`/`{mins}`, datetime `{date}`/`{time}`; los campos desconocidos se muestran vacíos y `{{`/`}}` escapan llaves literales
- **Corrección de batería (Linux):** las baterías de periféricos (p. ej. Logitech HID++) ya no se cuentan como baterías del sistema
- 141 tests, clippy limpio

## v0.6.0 · Temas, Daemon de Estadísticas en Vivo y Modularización por Plataforma · 2026-08-19

- **Formato de temas simplificado:** `theme set` edita solo la clave `theme`, conservando comentarios y formato; los temas ya no incluyen `icons` (elección de fuente del usuario, se rellenan desde los defaults); nuevos campos `logo_color` y `logo_colors` (por fila)
- **Daemon de estadísticas en vivo (`daemon_live`):** fija la salida arriba de la terminal y vuelve a sondear un subconjunto ligero de módulos cada `daemon_live_refresh` segúndos; hot reload mediante `daemon_live_reload` (observa config y tema); flags `--no-daemon-live`, `--daemon-live-stop`, `--daemon-live-reload`
- **Windows:** `winget` cuenta solo paquetes instalados vía winget; Chocolatey salió de las sondas del núcleo (vuelve como plugin); la detección de shell recorre la cadena de procesos padre (cmd.exe ya no se reporta como PowerShell); el mapeo versión→logo usa números de build
- **Timeouts de plugins y extensiones:** nuevo `subprocess.rs` con drenaje acotado de pipes — los procesos hijos que retienen el pipe ya no pueden colgar xfetch; `timeout_secs` opcional por plugin/extensión en la config; helper `with_timeout` en los crates de la API
- **Modularización por plataforma:** macOS y Linux replican la estructura de Windows (`platform/<os>/version.rs`, `software.rs`, `network.rs`, ...); Arch separa `pacman` (oficial) de la nueva entrada `aur` (`pacman -Qm`); se muestra el conteo de portage en Gentoo; presentación consciente de WSL
- **Efectos:** animaciones de introducción mediante la clave `effects` y los comandos `xfetch effects install/list/remove`

## v0.5.0 · Rendimiento, Gestores de Paquetes y Logos por Distribución · 2026-08-18

- **Rondas de rendimiento:** los conteos de paquetes se leen directamente de las bases de datos de las distros (dpkg/pacman/apk/flatpak, microsegúndos en lugar de subprocesos); pre-chequeo de PATH antes de lanzar sondas; battery/datetime movidos a la sección paralela; hosts de IP pública consultados en paralelo; sondas lanzadas todas y luego unidas (fetch en frío 8.7 s → 0.05 s en WSL)
- **Logos por distribución en `--gen-config`:** obtiene el logo ASCII del OS/distro detectado del nuevo catálogo `xfetch-cli/logos`, con override `--logo <id>` y `XFETCH_LOGOS_URL` para forks
- **Nuevo flag `--layout <name>`** para `--gen-config`; se eliminó la carpeta `configs/` — la plantilla ahora va embebida en el binario y los instaladores generan el primer config con `xfetch --gen-config`
- **Presentación WSL:** nueva clave `os_wsl_style` (`off` / `minimal` / `full`)
- **Más gestores de paquetes:** soporte de Void (base de datos xbps) y Gentoo (portage); las claves de config desconocidas se ignoran
- **Windows:** soporte de `winget` añadido; `choco list --local-only` ya no cuenta de más; `scoop list` cuenta filas correctamente
- **Plugins en paralelo:** los plugins corren en hilos paralelos — API intacta, ningún plugin necesita cambios

## v0.4.0 · Modo Daemon, Nuevos Layouts y Corrección de Cuelgues · 2026-08-17

- **Modo daemon (`--daemon`):** fija el logo animado en una región de scroll fija y sale de inmediato; deténgalo con `--daemon-stop`
- **Timeouts de comandos externos:** `run_cmd_with_timeout()` mata comandos colgados — snap sin el daemon snapd ya no bloquea el fetch; timeouts por comando para gestores de paquetes y sondas de hardware
- **Separación por plataforma:** nueva estructura `src/info/platform/{linux,macos,windows}/` con contrato compartido y maquinaria en `shared/`
- **Nuevos layouts:** `section-box` (cajas con borde por grupo de módulos) y `custom-x` (plantillas de borde totalmente configurables con `{fill}`/`{title}`, ancho auto/full/fijo)
- **Nuevas opciones:** `show_keys`, `key_width`, `logo_color` (nombres, índices 256 y hex RGB), `logo_padding`, `logo_type` (auto/ascii/image)
- **Soporte de XDG_CONFIG_HOME** (corrección para macOS) y scripts de CI local (`scripts/ci.sh`, `scripts/ci.ps1`)

## v0.3.0 · Renderizado de Imágenes y Extensiones · 2026-07-25

- **Renderizado de imágenes en Kitty:** Añadido toggle `logo_kitty` (protocolo nativo vs half-block), `logo_gap` para espaciado configurable entre imagen y texto, `logo_width`/`logo_height` para tamaño explícito, y ancho auto-responsive (28% de la terminal, clamp 12–42 cols)
- **Corrección de posicionamiento del cursor:** Reemplazado `MoveUp`/`MoveToColumn` con `SavePosition`/`RestorePosition` para comportamiento correcto en todos los protocolos de imagen
- **Corrección de layout stacked:** Arreglado `print_stacked_output()` para manejar logos de imagen sin ASCII
- **API de extensiones:** Creado `api/crates/extension-api/` — protocolo `ConfigProviderRequest`/`ConfigProviderResponse`, campo `config_providers[]`, comunicación stdin/stdout JSON
- **Extensión config-roulette:** Elige una configuración aleatoria o diaria de una lista JSON de rutas, soporta más de 100 rutas
- **Extensión layout-override:** Fuerza layout y/o módulos al cargar la configuración
- **CLI de extensiones:** Añadidos comandos `xfetch extension install/list/remove`
- **100 configuraciones basadas en imágenes** para config-roulette con `logo_gap: 3` y `logo_kitty: true`

## Fase 0 · Base y Núcleo

- Inicializar proyecto Rust con dependencias
- Detección multiplataforma de SO (Linux, Windows, macOS)
- Módulo de recopilación de información del sistema
- Sistema de configuración con soporte JSONC
- Motor de renderizado UI con crossterm

## Fase 1 · Módulos de Información del Sistema

- Mostrar nombre del SO y arquitectura
- Detección de versión del kernel
- Resolución de hostname
- Detección y visualización de shell
- Detección de emulador de terminal
- Información del modelo y frecuencia de CPU
- Detección de GPU (discreta e integrada)
- Visualización de uso de memoria y RAM
- Estadísticas de uso de disco
- Estado y porcentaje de batería
- Cálculo de tiempo de actividad del sistema
- Conteo de paquetes para múltiples gestores (pacman, dpkg, scoop)
- Detección de entorno de escritorio / gestor de ventanas

## Fase 2 · Personalización Visual y Diseños

- Soporte de arte ASCII personalizado desde archivos
- Soporte de logotipos SVG/Imagen via viuer
- Códigos de color ANSI en logotipos ASCII
- Personalización de iconos por módulo (Nerd Fonts)
- Personalización de colores por módulo
- Diseño predeterminado (lado a lado)
- Diseño Pac-Man con cabecera/pie personalizado
- Diseño de bloque lateral
- Diseño de árbol para visualización jerárquica
- Diseño de sección para información agrupada
- Paleta de colores con opciones de estilo

## Fase 3 · Documentación y Ejemplos

- Guía de instalación
- Guía de configuración
- Script de instalación rápida para Linux/macOS
- Script de instalación PowerShell para Windows
- 20+ configuraciones de ejemplo
- Logotipos de muestra (texto y SVG)
- Scripts de desinstalación
- Documentación de diseños

## Fase 4 · Expansión de Gestores de Paquetes

- Soporte para gestor RPM (Fedora, RHEL)
- Soporte para gestor APK (Alpine)
- Soporte para gestor Nix
- Soporte para gestor Homebrew (macOS/Linux)
- Soporte para gestor Chocolatey (Windows)
- Detección de múltiples gestores instalados
- Optimización de rendimiento del conteo de paquetes

## Fase 5 · Red y Conectividad

- Detección de dirección IP local
- Obtención de IP pública (con opción de privacidad)
- Soporte IPv6
- Información de interfaces de red
- Opción para deshabilitar obtención de IP por privacidad

## Fase 6 · Módulos Mejorados

- Integración con reproductor de música (soporte MPD)
- Visualización de pista actual de Spotify
- Módulo meteorológico con API de ubicación
- Visualización de zona horaria y reloj mundial
- Información de usuario y estado de inicio de sesión
- Resolución de pantalla y tasa de refresco
- Detección de tema y esquema de colores

## Fase 7 · Diseños Adicionales

- Diseño compacto para salida mínima
- Diseño horizontal
- Diseño inferior con logo debajo de la info
- Diseño minimalista (solo texto)
- Documentación de vista previa de diseños

## Fase 8 · Optimización de Rendimiento

- Sondas lentas de hardware paralelizadas
- Caché de datos de módulos
- Optimización de detección GPU para sistemas multi-GPU
- Carga diferida para módulos opcionales
- Evaluación comparativa y perfilado de rendimiento
- Estructura de archivos modularizada

## Fase 9 · CI/CD y Distribución

- GitHub Actions para compilaciones automatizadas
- Lanzamientos binarios para Linux x86_64, macOS (Intel & ARM) y Windows
- Paquete AUR para Arch Linux
- Homebrew tap para macOS
- Scripts de instalación para todas las plataformas
- Instalación automatizada de Rust en install.ps1 para Windows

## Fase 10 · Comunidad y Ecosistema

- Repositorio y registro de temas
- Gestor de descarga de temas (plugin)
- Herramienta de vista previa de temas en línea
- Proceso de contribución de temas comunitarios
- Sistema de plugins para módulos personalizados
- Plantillas de issues para xfetch, plugins, configs y api
- Guías de contribución

## Fase 11 · Pruebas y Aseguramiento de Calidad

- Pruebas unitarias para el módulo de información
- Pruebas unitarias para el módulo de configuración
- Pruebas de integración para diseños
- 41 pruebas en total, todas exitosas

## Fase 12 · Funciones Avanzadas

> Por respeto a la privacidad de nuestros usuarios: hemos decidido eliminar incluso la posibilidad, mantenemos esto como un registro de lo que no debe hacerse bajo ninguna circunstancia en el futuro.

## Fase 13 · Documentación y Marketing

- Manual de usuario completo
- Sitio web del proyecto con showcase
- Documentación para desarrolladores
