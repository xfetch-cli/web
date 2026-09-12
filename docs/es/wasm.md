# Invitados WebAssembly

Los plugins, efectos y extensiones pueden ser artefactos WebAssembly en lugar de ejecutables nativos. El core los detecta por la cabecera del binario, los ejecuta en un runtime wasmtime con sandbox y mantiene el mismo protocolo JSON, asi que la configuracion, el listado, los timeouts y los comandos de instalacion funcionan igual que con invitados nativos.

## Formatos de invitado

| Formato | Objetivo | Contrato | Lenguajes |
|---------|----------|----------|-----------|
| Modulo core | `wasm32-wasip1` | Peticion JSON por stdin, respuesta JSON por stdout, host calls via `xfetch.host_call` | Rust, C, C++, Zig, Go, AssemblyScript, ... |
| Componente | Component model | Exporta `run` desde el mundo WIT `xfetch:runtime` con imports tipados | Python (`componentize-py`), JavaScript (`componentize-js`), Rust/C/Go (`wit-bindgen`), .NET, ... |

La deteccion es por contenido: los primeros ocho bytes distinguen modulos core de componentes. La extension del archivo da igual.

## Instalacion

```bash
# Desde un checkout local (compila con el manifiesto si hace falta)
xfetch plugin install ./plugins/wasm-pacman
xfetch effects install ./effects/wasm-matrix
xfetch extension install ./extensions/wasm-night-mode

# Artefacto precompilado desde una URL
xfetch plugin install https://example.com/releases/plugin.wasm
```

El instalador coloca el artefacto como `xfetch-<tipo>-<nombre>.wasm` junto a un manifiesto en `~/.config/xfetch/`.

## Manifiesto

Las capacidades y los limites se declaran en un manifiesto JSON: sidecar (`<nombre>.json` junto al artefacto), seccion embebida `xfetch:manifest`, o valores por defecto conservadores si no existe.

```json
{
  "manifest_version": 1,
  "name": "wasm-hello",
  "kind": "info_provider",
  "runtime": "core",
  "capabilities": {
    "http": { "allow": ["https://api.example.com/*"] },
    "exec": { "allow": ["pacman"], "env": ["PATH"] },
    "fs": [{ "host": "/proc", "guest": "/proc", "mode": "ro" }],
    "env": ["LANG"]
  },
  "limits": {
    "timeout_ms": 15000,
    "memory_mb": 64,
    "output_kb": 64,
    "host_call_kb": 256
  }
}
```

Los repositorios de origen usan `xfetch-plugin.json`, `xfetch-effect.json` o `xfetch-extension.json` con el mismo esquema; el instalador lo copia junto al artefacto.

## Capacidades

Las capacidades se deniegan por defecto; un campo vacio o ausente deniega la operacion.

| Capacidad | Campo | Semantica |
|-----------|-------|-----------|
| HTTP | `http.allow` | Patrones glob contra la URL completa. Las redirecciones se revisan en cada salto. |
| Procesos | `exec.allow` | Patrones sobre el nombre del programa. No hay shell y el entorno se limpia salvo los nombres permitidos. |
| Sistema de archivos | `fs` | Preopens WASI. Las cadenas montan en solo lectura; los objetos eligen `host`, `guest` y `mode` (`ro`/`rw`). |
| Entorno | `env` | Nombres de variables expuestos al invitado. |
| Argumentos | `args` | Si es true, el invitado recibe su nombre como `argv[0]`. |

Las operaciones `log` y `version` estan siempre disponibles.

## Limites

| Campo | Por defecto | Significado |
|-------|-------------|-------------|
| `timeout_ms` | 30000 | Limite de tiempo; `timeout_secs` de la config lo sobrescribe. |
| `memory_mb` | 256 | Limite de memoria lineal. Los invitados de Python y Go necesitan margen. |
| `output_kb` | 4096 | Limite de la respuesta JSON. |
| `host_call_kb` | 4096 | Limite de una respuesta de host call. |

## Host calls

Los modulos core llaman a `xfetch.host_call` con una operacion JSON; los componentes usan los imports tipados `fetch`, `exec`, `log` y `protocol-version`. Los modulos Rust pueden usar el crate `xfetch-guest-api`. La referencia completa esta en `docs/WASM.md` del repositorio xfetch.

## Herramientas

```bash
xfetch wasm inspect ./plugin.wasm                  # cabecera, manifiesto, capacidades
xfetch wasm run ./plugin.wasm --request '{"version":1,"kind":"info_provider"}'
xfetch wasm wit                                    # contrato de componentes
```

## Logs

Los logs de los invitados van a stderr; por defecto solo se muestran `warn` y `error`. Ajusta `XFETCH_WASM_LOG_LEVEL` a `off`, `error`, `warn`, `info` o `debug` para cambiar el umbral.

## Seguridad

Los invitados wasm no tienen autoridad ambiental: sin acceso a archivos, red, entorno o procesos salvo lo que permita el manifiesto, y con limites de tiempo, memoria y salida. Los plugins nativos conservan sus privilegios de proceso; elegir wasm es elegir el sandbox.

## Ejemplos

| Invitado | Lenguaje | Formato | Repositorio |
|----------|----------|---------|-------------|
| `wasm-crypto` | Rust | Modulo core, HTTP | xfetch-cli/plugins |
| `wasm-ip-geo` | Python | Componente, HTTP | xfetch-cli/plugins |
| `wasm-pacman` | Go | Modulo core, exec | xfetch-cli/plugins |
| `wasm-proc` | C | Modulo core, filesystem | xfetch-cli/plugins |
| `wasm-matrix` | Rust | Efecto core | xfetch-cli/effects |
| `wasm-python-pulse` | Python | Efecto componente | xfetch-cli/effects |
| `wasm-night-mode` | Rust | Extension core | xfetch-cli/extensions |
| `wasm-updates-footer` | Go | Extension core | xfetch-cli/extensions |
| `wasm-lang-labels` | Python | Extension componente | xfetch-cli/extensions |

Consulta `docs/WASM.md` en el repositorio xfetch y `docs/wasm-guests.md` en el repositorio api para la referencia completa.
