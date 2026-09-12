# wasm-proc

Carga media, uso de memoria y uptime leidos de /proc en C sin libc.

- **Tipo:** `info_provider`
- **Artefacto:** `wasm-proc.wasm` (core module, about 4 KiB)
- **Capacidades:** `fs: /proc` (read-only)
- **Lenguaje:** C

## Instalacion

```bash
xfetch plugin install ./plugins/wasm-proc
```

El instalador compila el invitado con su manifiesto cuando hace falta.

## Configuracion

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-proc", "args": {} }],
    "modules": ["plugin:wasm-proc"]
}
```

## Argumentos

Ninguno.

## Salida

```
load: 2.39 2.33 1.63
uptime: 6h 40m
memory: 8% used (7.9 GiB / 93.8 GiB)
```

## Notas

El manifiesto preabre /proc en solo lectura. Solo Linux y WSL, porque depende de procfs.
