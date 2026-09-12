# Efectos

Los efectos de introducción animan las líneas de contenido cuando arranca el fetch. En lugar de imprimir el resultado al instante, cada efecto transforma cada línea desde un estado codificado hasta su texto final durante una corta duración.

## Resumen de la Arquitectura

Los efectos son ejecutables independientes con el nombre `xfetch-effect-<nombre>` (o `xfetch-effect-<nombre>.exe` en Windows). Reciben las líneas de contenido renderizadas del núcleo de xfetch y devuelven una secuencia de frames.

```
xfetch core  --->  stdin (JSON request)     --->  effect process
xfetch core  <---  stdout (JSON response)   <---  effect process
```

Los efectos son **opcionales**: si el binario del efecto configurado falta o falla, xfetch renderiza la salida normalmente — nada se rompe.

## Instalación

```bash
# Instalar desde el repositorio oficial de efectos
xfetch effects install decrypt

# Instalar desde un directorio local
xfetch effects install ./my-effect

# Instalar desde un repositorio git personalizado
xfetch effects install my-effect --repo https://github.com/user/effects.git

# Listar efectos instalados
xfetch effects list

# Eliminar un efecto
xfetch effects remove glitch
```

Los efectos se compilan con `cargo build --release` y se instalan en `~/.config/xfetch/effects/xfetch-effect-<nombre>` (o `%APPDATA%\xfetch\effects\` en Windows). El repositorio predeterminado es `https://github.com/xfetch-cli/effects.git`, que se puede sobrescribir con la variable de entorno `XFETCH_EFFECT_REPO`.

## Configuración

La clave de configuración `effects` acepta un solo efecto o una lista de efectos que se reproducen en secuencia:

```jsonc
{
    "effects": {
        "plugin": "decrypt",
        "duration_ms": 1500,
        "fps": 30
    }
}
```

Varios efectos se reproducen uno tras otro:

```jsonc
{
    "effects": [
        {
            "plugin": "glitch",
            "duration_ms": 800,
            "fps": 30
        },
        {
            "plugin": "decrypt",
            "duration_ms": 1500,
            "fps": 30
        }
    ]
}
```

### Campos

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `plugin` | `string` | Nombre del efecto (instalado como `xfetch-effect-<nombre>`) |
| `style` | `string` o `null` | Sugerencia de estilo específica del efecto |
| `duration_ms` | `number` o `null` | Duración total de la animación en milisegúndos |
| `fps` | `number` o `null` | Frames por segúndo |
| `args` | `object` o `null` | Argumentos libres específicos del efecto |
| `timeout_secs` | `number` o `null` | Red de seguridad en segúndos: el núcleo termina el proceso del efecto si tarda más |

## Protocolo JSON wire

**Versión del protocolo:** 1

### Solicitud (stdin)

```json
{
    "version": 1,
    "kind": "effect",
    "lines": [
        "os: Arch Linux x86_64",
        "kernel: 6.6.87.2-arch1-1"
    ],
    "args": {
        "style": null,
        "duration_ms": 1500,
        "fps": 30,
        "args": null
    }
}
```

El campo `lines` contiene las líneas de contenido renderizadas (icono + valor por línea) que el efecto transforma. El campo `args` lleva los parámetros del efecto.

### Respuesta (stdout)

```json
{
    "frames": [
        {
            "delay_ms": 33,
            "lines": ["scrambled line 1", "scrambled line 2"]
        },
        {
            "delay_ms": 33,
            "lines": ["os: Arch Linux x86_64", "kernel: 6.6.87.2-arch1-1"]
        }
    ]
}
```

Cada frame tiene un `delay_ms` (cuánto tiempo mostrarlo) y `lines` (el contenido del frame). La respuesta no debe estar vacía, y el último frame debe alcanzar el contenido final original — el núcleo se re-asienta exactamente en el contenido final cuando termina la reproducción.

### Manejo de errores

Los efectos deben escribir los errores en stderr y salir con un código de estado distinto de cero. xfetch omite el efecto y renderiza la salida normal si se produce un error.

## Efectos Oficiales

| Efecto | Descripción |
|--------|-------------|
| `decrypt` | Revela cada línea desde glifos codificados hasta su texto real (decodificación suave). Valores por defecto: `duration_ms` 1500, `fps` 30. |
| `glitch` | Parpadeo codificado entrecortado con ráfagas de corrupción, franjas horizontales y filas caídas. Valores por defecto: `duration_ms` 800, `fps` 30. Mantiene intactas las secuencias de escape ANSI. |

### Efectos WebAssembly

`wasm-matrix` (Rust) y `wasm-python-pulse` (componente Python) son efectos
WebAssembly que generan fotogramas igual que los nativos; sus manifiestos
declaran los limites de ejecución. Consulta la referencia de invitados
WebAssembly en el repositorio xfetch (`docs/WASM.md`).

## Escritura de Efectos Personalizados

### Convención de nombres del binario

```
xfetch-effect-<nombre>          (Linux/macOS)
xfetch-effect-<nombre>.exe     (Windows)
```

### Esqueleto mínimo de un efecto (Rust)

```toml
[package]
name = "xfetch-effect-my-effect"
version = "0.1.0"
edition = "2024"

[dependencies]
serde_json = "1"
xfetch-effect-api = { git = "https://github.com/xfetch-cli/api", package = "xfetch-effect-api" }
```

```rust
use xfetch_effect_api::{read_effect_request, write_effect_frames, EffectFrame};

fn main() {
    let request = match read_effect_request() {
        Ok(value) => value,
        Err(err) => {
            eprintln!("{}", err);
            std::process::exit(1);
        }
    };

    let duration_ms = request.args.duration_ms.unwrap_or(1000).max(1);
    let fps = request.args.fps.unwrap_or(30).max(1);
    let frame_count = ((duration_ms * fps) / 1000).max(1);
    let frame_delay = (1000.0 / fps as f64) as u64;

    let mut frames = Vec::with_capacity(frame_count as usize + 1);
    for i in 0..=frame_count {
        let progress = i as f64 / frame_count as f64;
        let lines: Vec<String> = request.lines.iter()
            .map(|line| reveal(line, progress, i))
            .collect();
        frames.push(EffectFrame::new(frame_delay, lines));
    }

    if let Err(err) = write_effect_frames(&frames) {
        eprintln!("{}", err);
        std::process::exit(1);
    }
}
```

### Crate de API para efectos

El crate `xfetch-effect-api` (código fuente en `github.com/xfetch-cli/api`) proporciona los tipos y helpers del protocolo:

- **Tipos de protocolo:** `EffectArgs`, `EffectFrame`, `EffectRequest`, `EffectResponse`, `KIND_EFFECT`
- **Helpers de punto de entrada:** `read_effect_request()`, `write_effect_frames()`
- **Análisis de argumentos:** `EffectArgs::parse_args()` y `EffectArgs::parse_args_or_default()`
- **Helpers de timeout:** `with_timeout()` y el error `TimedOut`

El crate compartido `xfetch-effects-lib` ofrece helpers seguros para ANSI (`SCRAMBLE_GLYPHS`, `tokenize`, `reveal`, ...) para que los efectos puedan codificar y revelar texto sin romper las secuencias de escape del terminal.

### Pautas

- Mantenga los efectos enfocados en un único estilo visual
- Escriba los errores en stderr y salga con estado distinto de cero
- Devuelva un array `frames` no vacío cuyo último frame coincida con el contenido final
- Preserve las secuencias de escape ANSI entre frames
- Maneje los timeouts con elegancia usando `with_timeout()`
