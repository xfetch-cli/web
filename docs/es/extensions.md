# Extensiones

Las extensiones son binarios independientes que se enganchan en el ciclo de vida de xfetch a nivel de configuración. A diferencia de los plugins (que proporcionan líneas de información o animan logos), las extensiones reciben la configuración completamente resuelta por stdin, la modifican y devuelven una versión modificada por stdout.

## Arquitectura

```
xfetch core
  │
  ├─ Carga config.jsonc
  ├─ Fusiona tema (si está definido)
  │
  ├─ extension-1 (stdin/stdout JSON)  ← modifica la configuración
  ├─ extension-2 (stdin/stdout JSON)  ← modifica la configuración
  ├─ ...
  │
  └─ Renderiza la configuración final
```

Las extensiones se ejecutan **después de la fusión del tema, en orden de declaración**. Cada extensión recibe la configuración producida por el paso anterior, por lo que pueden encadenarse.

## Instalación

Las extensiones se instalan en `~/.config/xfetch/extensions/`:

```bash
cp xfetch-extension-<nombre> ~/.config/xfetch/extensions/
```

O mediante CLI:

```bash
xfetch extension install ./ruta/al/binario
xfetch extension list
xfetch extension remove <nombre>
```

Los binarios de extensión siguen la convención `xfetch-extension-<nombre>` (`.exe` en Windows).

## Configuración

Agregue extensiones a su configuración mediante el campo `config_providers`:

```jsonc
{
    "config_providers": [
        {
            "extension": "layout-override",
            "args": {
                "layout": "tree"
            }
        },
        {
            "extension": "config-roulette",
            "args": {
                "routes": "~/.config/xfetch/routes.json",
                "strategy": "daily"
            }
        }
    ]
}
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `extension` | `string` | Nombre de la extensión (binario: `xfetch-extension-<nombre>`) |
| `args` | `object` o `null` | Argumentos JSON arbitrarios pasados a la extensión |

## Protocolo

Las extensiones se comunican mediante stdin/stdout usando el protocolo JSON definido en `xfetch-extension-api`.

### Solicitud (stdin)

```json
{
    "version": 1,
    "kind": "config_provider",
    "config": {
        "layout": "section",
        "modules": ["os", "kernel", "uptime"],
        "colors": { "os": "Cyan" }
    },
    "args": {
        "layout": "tree"
    }
}
```

El campo `config` contiene la configuración de xfetch completamente resuelta después de fusionar los valores predeterminados, el archivo de configuración y cualquier tema.

### Respuesta (stdout)

```json
{
    "config": {
        "layout": "tree",
        "modules": ["os", "kernel", "uptime"],
        "colors": { "os": "Cyan" }
    }
}
```

La extensión devuelve la configuración completa modificada. Los campos no modificados deben preservarse tal cual.

### Manejo de Errores

Los errores deben imprimirse en stderr. El proceso debe salir con un código de estado distinto de cero. xfetch omitirá la extensión y continuará con la configuración actual si ocurre un error.

## Extensiones Disponibles

| Extensión | Descripción |
|-----------|-------------|
| [config-roulette](extensions/config-roulette) | Elige una configuración aleatoria (o diaria) de una lista de rutas |
| [layout-override](extensions/layout-override) | Sobrescribe el diseño y/o los módulos al cargar la configuración |

## Directorios

| Plataforma | Ruta de Extensiones |
|------------|---------------------|
| Linux | `~/.config/xfetch/extensions/` |
| macOS | `~/Library/Application Support/xfetch/extensions/` |
| Windows | `%APPDATA%\xfetch\extensions\` |

## Escribir Extensiones Personalizadas

Las extensiones deben:

1. Leer un objeto JSON `ConfigProviderRequest` de stdin
2. Modificar el campo `config` según sea necesario
3. Escribir un objeto JSON `ConfigProviderResponse` en stdout
4. Salir con estado 0 en caso de éxito, distinto de cero en caso de error

Use el crate `xfetch-extension-api` de `github.com/xfetch-cli/api` para el manejo tipado de solicitudes/respuestas en Rust.

El crate de API compartido está disponible en: [github.com/xfetch-cli/api](https://github.com/xfetch-cli/api)
