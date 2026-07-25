# Layout Override

Fuerza un diseño y/o conjunto de módulos específico al cargar la configuración, independientemente de lo que especifique el archivo de configuración o el tema. Se ejecuta después de la fusión del tema pero antes del renderizado.

## Instalación

```bash
cp xfetch-extension-layout-override ~/.config/xfetch/extensions/
```

O mediante CLI:

```bash
xfetch extension install ./ruta/a/xfetch-extension-layout-override
```

## Configuración

```jsonc
{
    "layout": "pacman",
    "modules": ["os", "kernel", "uptime"],
    "config_providers": [
        {
            "extension": "layout-override",
            "args": {
                "layout": "tree",
                "modules": ["os", "kernel", "uptime", "packages", "shell", "cpu", "memory", "palette"]
            }
        }
    ]
}
```

En este ejemplo, la configuración define `layout: "pacman"`, pero la extensión lo sobrescribe a `"tree"` antes del renderizado.

## Argumentos

| Campo | Tipo | Predeterminado | Descripción |
|-------|------|----------------|-------------|
| `layout` | `string` | — | Diseño a forzar (`default`, `tree`, `pacman`, `compact`, `box`, `section`, etc.) |
| `modules` | `string[]` | — | Lista de módulos a reemplazar |

Si se omite un campo, se conserva el valor original de la configuración.

## Casos de Uso

- Forzar un diseño específico al usar un tema que no especifica uno
- Sobrescribir módulos temporalmente sin editar el archivo de configuración
- Encadenar con config-roulette — una extensión aleatoriza, otra normaliza el diseño
