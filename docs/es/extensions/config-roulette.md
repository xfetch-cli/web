# Config Roulette

Elige una configuración aleatoria (o diaria) de una lista de rutas y la carga. Cada invocación de xfetch puede mostrar un aspecto completamente diferente — diferente diseño, logo, tema, colores, módulos e iconos.

## Instalación

```bash
cp target/release/xfetch-extension-config-roulette ~/.config/xfetch/extensions/
```

O mediante CLI:

```bash
xfetch extension install ./ruta/a/xfetch-extension-config-roulette
```

## Configuración

### 1. Crear un archivo de rutas

```json
[
    { "_name": "default-full",   "path": "~/.config/xfetch/fetchs/001-layout-default/config.jsonc" },
    { "_name": "tree-view",      "path": "~/.config/xfetch/fetchs/004-layout-tree/config.jsonc" },
    { "_name": "pacman-classic",  "path": "~/.config/xfetch/fetchs/008-layout-pacman/config.jsonc" }
]
```

Cada ruta apunta a un archivo de configuración completo de xfetch. El campo `_name` es opcional y solo se usa para legibilidad.

### 2. Agregar a la configuración de xfetch

```jsonc
{
    "config_providers": [
        {
            "extension": "config-roulette",
            "args": {
                "routes": "~/.config/xfetch/routes.json",
                "strategy": "random"
            }
        }
    ]
}
```

## Argumentos

| Campo | Tipo | Predeterminado | Descripción |
|-------|------|----------------|-------------|
| `routes` | `string` | `~/.config/xfetch/routes.json` | Ruta al archivo JSON de rutas |
| `strategy` | `"random"` o `"daily"` | `"daily"` | Estrategia de selección |

## Estrategias

- **`random`** — elige una configuración diferente en cada ejecución (usa un temporizador de subsegundos como semilla)
- **`daily`** — elige la misma configuración todo el día, cambia al día siguiente (usa la fecha Unix como semilla)

## Casos de Uso

- Ver un estilo visual diferente cada vez que abre una terminal
- Probar todas sus configuraciones automáticamente sin ejecutarlas manualmente
- Temas diarios — mismo aspecto todo el día, nuevo aspecto mañana
- Rotar a través de 300+ configuraciones de la suite de pruebas
