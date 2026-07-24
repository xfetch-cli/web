# animate-logo

Anima logos ASCII con varios efectos de color.

- **Tipo:** `logo_animation`
- **Binario:** `xfetch-plugin-animate-logo`
- **Dependencias:** Ninguna (Rust puro)

## Configuración

```jsonc
{
    "logo_animation": {
        "plugin": "animate-logo",
        "fps": 12,
        "duration_ms": 1200,
        "loop": false,
        "style": "sweep"
    }
}
```

## Argumentos

| Campo | Tipo | Por Defecto | Descripción |
|-------|------|-------------|-------------|
| `fps` | number | `12` | Fotogramas por segundo (limitado 1–60) |
| `duration_ms` | number | `1200` | Duración total de la animación en ms |
| `loop` | bool | `false` | Bucle de animación (actualmente sin uso) |
| `style` | string | `"sweep"` | Estilo de animación (ver abajo) |
| `frames_path` | string o string[] | — | Ruta(s) a archivos de fotogramas (requerido para estilo `frame`) |

## Estilos

| Estilo | Descripción |
|--------|-------------|
| `sweep` | Los colores barren de izquierda a derecha sobre los caracteres (paleta ANSI de 6 colores) |
| `wave` | Patrón de color de onda sinusoidal a través del logo |
| `rainbow` | Gradiente RGB completo cambiando con el tiempo (color de 24 bits) |
| `sparkle` | Caracteres aleatorios se iluminan en colores brillantes |
| `breathing` | Todos los caracteres se desvanecen en tonos ámbar cálidos |
| `frame` | Cicla a través de conjuntos de fotogramas ASCII precargados |
| `none` | Sin coloración, muestra el logo tal cual |
