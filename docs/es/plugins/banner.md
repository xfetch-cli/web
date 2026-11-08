# banner

Imprime un banner corto con un proverbio chino/japonés debajo o encima del logo ASCII, sin modificar el archivo del logo.

- **Tipo:** `logo_animation`
- **Binario:** `xfetch-plugin-banner`
- **Dependencias:** ninguna
- **Terminal:** requiere una fuente con soporte CJK y una TTY

## Instalación

```bash
xfetch plugin install banner
```

## Configuración

```jsonc
{
    "logo_animation": {
        "plugin": "banner",
        "style": "banner",
        "timeout_secs": 3
    }
}
```

## Estilos

| `style` | Comportamiento |
|---------|----------------|
| `banner` | Proverbio aleatorio, debajo del logo |
| `banner-above` | Proverbio aleatorio, encima del logo |
| `banner-static` | Siempre el primer proverbio, debajo |
| `banner-N` | El N-ésimo proverbio (base 1), debajo |

Configura `frames_path` con un archivo de texto para usar su primer frame separado por `===` como texto del banner en lugar de la lista integrada.

## Alineación

El banner se centra al ancho del logo usando el ancho visible en terminal, por lo que ignora los códigos de color ANSI. Los banners más largos se ajustan al ancho del logo en lugar de ensancharlo, manteniendo alineados los layouts con caja.

## Lista de proverbios

Una mezcla de dichos chinos y japoneses como `千里之行，始于足下`, `七転び八起き` y `一期一会`. El plugin elige uno por ejecución.

## Plataforma

Plugin nativo para Linux, macOS y Windows. El banner se omite cuando xfetch renderiza un logo de imagen; usa `banner-text` para leyendas que también deban aparecer con logos de imagen.
