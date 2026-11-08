# Referencia de la CLI

Esta página resume la línea de comandos de xfetch: opciones globales, modos de salida, overrides en tiempo de ejecución, ciclo de vida de addons, gestión de configuración, diagnóstico y códigos de salida. La ayuda completa siempre está disponible con `xfetch --help` y `xfetch <comando> --help`.

## Sinopsis

```bash
xfetch [OPTIONS] [COMMAND]
```

Sin comando, xfetch renderiza el fetch. Las opciones globales pueden ir antes o después del subcomando. Las combinaciones inválidas terminan con código `2`.

## Opciones globales

| Opción | Descripción |
|--------|-------------|
| `-c, --config <PATH>` | Usa un archivo de configuración personalizado |
| `--gen-config` | Genera una configuración inicial |
| `--logo <NAME>` | Logo para la configuración generada (solo con `--gen-config`) |
| `--layout <NAME>` | Sobrescribe el layout en tiempo de ejecución; con `--gen-config`, elige el layout generado |
| `--theme <NAME>` | Sobrescribe el tema en tiempo de ejecución |
| `--list-layouts` | Muestra todos los layouts aceptados |
| `--list-modules` | Muestra todas las claves de módulo aceptadas |
| `--json` | Emite JSON legible por máquina |
| `--get <KEY>` | Muestra solo las claves pedidas; repite la opción o usa comas |
| `--modules <LIST>` / `--only <LIST>` | Sobrescribe la lista de módulos renderizados |
| `--color <MODE>` | `auto`, `always` o `never` |
| `--no-color` | Igual que `--color never` |
| `--offline` | Desactiva la red (IP pública, catálogos, updates e instalaciones remotas) |
| `--no-cache` | Ignora la caché de paquetes e IP pública en esta ejecución |
| `--quiet` | Suprime la salida informativa |
| `--verbose` | Diagnóstico extra en stderr (igual que `--log-level debug`) |
| `--log-level <LEVEL>` | `off`, `error`, `warn`, `info`, `debug` o `trace` |
| `--log-json` | Líneas de log JSON en stderr |
| `--template <FILE>` | Renderiza el fetch con un archivo de plantilla |
| `--format <STRING>` | Renderiza el fetch con una plantilla inline |
| `--backup` / `--restore` | Respalda o restaura la configuración en uso |
| `--benchmark` | Muestra tiempos de recolección |
| `--clean-cache` | Limpia la caché de paquetes e IP pública |
| `--daemon` / `--daemon-stop` | Inicia o detiene el daemon de logo animado |
| `--no-daemon-live` / `--daemon-live-stop` / `--daemon-live-reload` | Controla el daemon de estadísticas en vivo |
| `-h, --help`, `-V, --version` | Ayuda y versión |

## Modos de salida

### Render normal

```bash
xfetch
xfetch --layout right
xfetch --modules os,kernel,cpu,memory
xfetch --config ~/.config/xfetch/config.jsonc
```

### JSON

```bash
xfetch --json
xfetch --json --benchmark
xfetch --json --modules os,kernel,cpu
```

`--json` imprime un objeto con `schema_version: 1` y nunca incluye secuencias ANSI. `--benchmark` agrega un array `benchmark`. También aceptan `--json`: `--list-layouts`, `--list-modules`, `modules`, `theme list`, `addon list`, `doctor` y `update --check`.

### Valores concretos

```bash
xfetch --get os
xfetch --get os,cpu,memory
xfetch --get version,name
xfetch --json --get os,cpu
```

Una clave imprime el valor crudo; varias claves imprimen líneas `clave=valor`. Con `--json` la salida es `{ "schema_version": 1, "values": { ... } }`. Las claves desconocidas terminan con código `7`.

### Plantillas

```bash
xfetch --format 'os={{os}} kernel={{kernel}}'
xfetch --template ~/.config/xfetch/my.tmpl
```

Las plantillas admiten `{{clave}}`, los filtros `upper`, `lower`, `trim`, `count`, `join:" / "` y `default:"..."`, además de bloques `{{#if}}`, `{{#unless}}` y `{{#each}}`. `--get`, `--template` y `--format` solo aplican al fetch por defecto y no se combinan con un subcomando ni con el modo daemon.

### Overrides en tiempo de ejecución

Precedencia, de mayor a menor:

1. Overrides de la CLI (`--layout`, `--modules`, `--no-color`, `--offline`, `--no-cache`)
2. Config providers (extensiones)
3. Tema
4. Archivo de configuración
5. Valores por defecto

## Comandos

| Comando | Propósito |
|---------|-----------|
| `plugin` / `plugins` | Gestiona plugins |
| `effects` / `effect` | Gestiona efectos de introducción |
| `extension` / `extensions` | Gestiona config providers |
| `addon <kind> <action>` | Comando unificado de addons (`plugin`, `effect`, `extension`, `command`) |
| `command` / `commands` | Gestiona addons de comandos CLI |
| `run <name> [--] <args>` | Ejecuta un addon de comando; `--render` usa el layout del core |
| `theme` | Busca, instala, actualiza, lista, activa, elimina o exporta temas |
| `logo` | Lista y previsualiza logos del catálogo ASCII |
| `wasm` | Inspecciona y ejecuta invitados WebAssembly |
| `doctor` | Diagnostica instalación, configuración, terminal y addons (`--fix`, `--bench`, `--image`, `--network`) |
| `modules` | Lista las claves de módulo |
| `config` | Valida, imprime, obtiene, define, elimina, resetea, edita, respalda o restaura |
| `completions <shell>` | Genera autocompletado para bash/zsh/fish/elvish/PowerShell |
| `man` | Renderiza la página de manual |
| `schema` | Imprime los JSON Schema de las salidas legibles por máquina |
| `paths` / `env` / `build-info` | Diagnóstico de rutas, entorno y build |
| `update` | Busca, instala o revierte releases |
| `self-uninstall` | Elimina el binario y opcionalmente configuración, caché y datos |

## Gestión de addons

`plugin`, `effects`, `extension` y `command` comparten las mismas acciones. La forma unificada es equivalente:

```bash
xfetch addon plugin install banner
xfetch addon effect install decrypt
xfetch addon extension install config-roulette
xfetch addon command install github
```

| Acción | Uso | Notas |
|--------|-----|-------|
| `install` | `install [PATH] [--repo <URL>] [--sha256 <HEX>] [--name <NAME>] [--manifest <FILE>] [--all] [--force]` | Nombre de catálogo, directorio local, repositorio, wasm o URL |
| `update` | `update [NAME] [--all] [--check] [--force]` | Recompila addons nativos desde la fuente registrada; conserva `.bak` para rollback |
| `rollback` | `rollback <NAME>` | Restaura el artefacto y recibo anteriores |
| `list` | `list [--verbose]` | Addons instalados; `--verbose` agrega capacidades y límites |
| `info` | `info <NAME>` | Metadatos, capacidades, límites y snippet de configuración |
| `search` | `search [QUERY]` (alias `available`) | Busca en el catálogo |
| `remove` | `remove <NAME>` | Elimina el artefacto y el recibo |

Cada instalación escribe un recibo `.install.json` junto al addon con la versión instalada, fuente, repositorio, ruta, referencia de catálogo, versión del SDK y SHA-256 del artefacto. Los catálogos también pueden declarar `repo`, `ref`, `sdk_version` y `min_xfetch_version`. `install --all` instala todas las entradas del catálogo, omitiendo las ya instaladas salvo con `--force`.

## Addons de comandos

```bash
xfetch command install github
xfetch run github -- rust-lang/rust
xfetch --json run github -- rust-lang/rust
xfetch --layout right run github --render -- rust-lang/rust
```

Los addons de comandos devuelven texto plano, un campo por línea. `--render` pasa las líneas por el layout y logo configurados. `--json` envuelve la salida como `{schema_version, command, args, lines}`. El catálogo vive en `xfetch-cli/commands`; `XFETCH_COMMAND_INDEX`, `XFETCH_COMMAND_REPO` y `XFETCH_COMMAND_DEV_DIR` sobrescriben los valores por defecto.

## Temas y logos

```bash
xfetch theme search dark
xfetch theme info nord
xfetch theme install nord
xfetch theme update --all --check
xfetch theme list --json
xfetch theme set dracula
xfetch logo list
xfetch logo preview arch
```

El registro de temas es `xfetch-cli/themes` (`XFETCH_THEME_INDEX` lo sobrescribe). El catálogo de logos es `xfetch-cli/logos` (`XFETCH_LOGOS_URL` lo sobrescribe). Ambos quedan bloqueados con `--offline`.

## Gestión de configuración

```bash
xfetch config validate
xfetch config print
xfetch config get layout
xfetch config get colors.cpu
xfetch config set layout right
xfetch config set modules.1 kernel
xfetch config unset colors.cpu
xfetch config reset --yes
xfetch config edit
xfetch config backups
xfetch config prune --keep 5
```

`set` y `unset` admiten claves con puntos e índices de array, conservan los comentarios circundantes cuando es posible y validan el resultado antes de escribir. `edit` usa `$VISUAL` o `$EDITOR` después de un backup de seguridad.

## Backup y restauración

```bash
xfetch --backup
xfetch --restore
xfetch config backup --output ~/backups
xfetch config backup --with-addons --compress
xfetch config backup --encrypt --passphrase-file ~/.config/xfetch/backup.pass
xfetch config restore --from ~/backups --dry-run
xfetch config restore --root ~/restored
```

Los backups incluyen la configuración, temas activos, rutas de config-roulette, assets de logo referenciados y, con `--with-addons`, artefactos y recibos de addons. `--compress` escribe gzip; `--encrypt` usa Argon2id y XChaCha20-Poly1305. La restauración escribe un backup de seguridad `pre-restore-*` y valida la configuración restaurada. En Unix los backups se escriben con modo `0600`.

## Doctor

```bash
xfetch doctor
xfetch doctor --json
xfetch doctor --network
xfetch doctor --fix
xfetch doctor --bench
xfetch doctor --image
```

`doctor` revisa el binario, la configuración, el tema, el layout, el tamaño de terminal, el protocolo de imagen, los directorios de addons, los recibos de instalación y la caché. `--fix` genera una configuración faltante y elimina una caché inválida. Termina con código `1` cuando falla alguna comprobación.

## Integración con el shell

```bash
xfetch completions bash > ~/.local/share/bash-completion/completions/xfetch
xfetch completions zsh > ~/.zfunc/_xfetch
xfetch completions fish > ~/.config/fish/completions/xfetch.fish
xfetch man --output ~/.local/share/man/man1/xfetch.1
xfetch schema fetch
```

## Actualización

```bash
xfetch update --check
xfetch update --check --json
xfetch update
xfetch update --prebuilt --bin-dir ~/.local/bin
xfetch update --rollback
```

Las instalaciones prebuilt descargan el asset del release, verifican `SHA256SUMS` y conservan un `xfetch.bak`. Las instalaciones con `cargo install` se actualizan con Cargo; Homebrew, winget y AUR se delegan a su gestor de paquetes.

## Códigos de salida

| Código | Significado |
|--------|-------------|
| `0` | Éxito |
| `1` | Fallo genérico, fallo de doctor o `update --check` con una versión nueva |
| `2` | Error de uso: flag inválido, combinación inválida o error de parseo |
| `3` | Error de configuración |
| `4` | Error de red o petición bloqueada por `--offline` |
| `5` | Error de addon |
| `6` | Error de actualización |
| `7` | No encontrado: módulo, clave de configuración o addon desconocido |

## Logging

```bash
xfetch --log-level debug
xfetch --log-level trace --verbose
xfetch --log-json --log-level debug
xfetch --log-level warn --quiet
```

`--quiet` equivale a `warn`, `--verbose` a `debug`, y un `--log-level` explícito tiene prioridad. `--log-json` escribe líneas `{"level","target","message"}` en stderr para que stdout quede limpio para resultados y `--json`.

## Variables de entorno

| Variable | Efecto |
|----------|--------|
| `XFETCH_PLUGIN_REPO`, `XFETCH_EFFECT_REPO`, `XFETCH_EXTENSION_REPO`, `XFETCH_COMMAND_REPO` | Repositorios de instalación por defecto |
| `XFETCH_PLUGIN_INDEX`, `XFETCH_EFFECT_INDEX`, `XFETCH_EXTENSION_INDEX`, `XFETCH_COMMAND_INDEX` | URLs o rutas locales de catálogo |
| `XFETCH_THEME_INDEX`, `XFETCH_LOGOS_URL` | Overrides del registro de temas y catálogo de logos |
| `XFETCH_BACKUP_PASSPHRASE` | Passphrase para backups cifrados |
| `VISUAL`, `EDITOR` | Editor usado por `xfetch config edit` |
| `XDG_CONFIG_HOME`, `XDG_CACHE_HOME`, `XDG_STATE_HOME` | Raíces de configuración, caché y estado |
| `XFETCH_WASM_LOG_LEVEL` | Umbral de logs de invitados wasm (`off`..`debug`) |
| `XFETCH_UPDATE_API` | Endpoint de la API de GitHub usado por `xfetch update` |
| `GH_TOKEN` / `GITHUB_TOKEN` | Token de GitHub para el límite de la API de update |

## Notas de seguridad

- Los addons nativos se ejecutan sin sandbox con los privilegios del usuario.
- Los addons wasm usan una política de manifiesto deny-by-default con límites de tiempo, memoria, salida, llamadas al host y capacidades.
- `--sha256` al instalar es el pin de procedencia y anula el digest del manifiesto.
- `--offline` bloquea las llamadas de red de xfetch, pero los addons nativos pueden hacer sus propias peticiones.
- Los backups pueden contener secretos de tu configuración; guarda cifrados y protege los archivos de passphrase.

## Documentos relacionados

- [Primeros Pasos](getting-started.md)
- [Configuración](configuration.md)
- [Diseños](layouts.md)
- [Plugins](plugins.md)
- [Extensiones](extensions.md)
- [Efectos](effects.md)
- [Temas](themes.md)
- [Invitados WebAssembly](wasm.md)
