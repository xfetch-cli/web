# wasm-pacman

Cuenta de paquetes de repositorio y AUR desde la base de datos local de pacman, escrito en Go.

- **Tipo:** `info_provider`
- **Artefacto:** `wasm-pacman.wasm` (core module)
- **Capacidades:** `exec: pacman`
- **Lenguaje:** Go (wasip1)

## Instalacion

```bash
xfetch plugin install ./plugins/wasm-pacman
```

El instalador compila el invitado con su manifiesto cuando hace falta.

## Configuracion

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-pacman", "args": { "samples": 3 } }],
    "modules": ["plugin:wasm-pacman"]
}
```

## Argumentos

| Campo | Tipo | Por defecto | Descripcion |
|-------|------|---------|-------------|
| `samples` | number | `3` | Nombres de paquetes extranjeros anadidos como muestra. |

## Salida

```
packages: 1084 installed (1066 repo, 18 AUR/foreign)
foreign: android-sdk-cmdline-tools-latest, ...
```

## Notas

El manifiesto solo permite el programa `pacman`; no hay shell. Solo distribuciones de la familia Arch.
