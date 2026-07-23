# Diseños

xfetch admite múltiples diseños visuales para mostrar información del sistema. Cada diseño organiza los módulos, grupos y el logo de manera diferente. Los diseños se seleccionan mediante el campo `layout` en el archivo de configuración.

## Resumen de Diseños

| Valor de Configuración | Descripción |
|------------------------|-------------|
| `null` o `"default"` | Clásico lado a lado: logo a la izquierda, información a la derecha |
| `"section"` | Información agrupada con encabezados de sección |
| `"pacman"` | Diseño encuadrado con cabecera y pie decorativos |
| `"side-block"` | Dos columnas: iconos a la izquierda, valores a la derecha |
| `"tree"` | Árbol jerárquico con conectores de ramas |
| `"box"` | Recuadro redondeado alrededor de todo el contenido |
| `"line"` | Clásico con separadores `---` cada 3 elementos |
| `"dots"` | Clásico con separadores `...` cada 3 elementos |
| `"bottom_line"` | Clásico con una línea `---` en la parte inferior |
| `"compact"` | Salida mínima sin bordes ni separadores |
| `"minimal"` | Formato `clave: valor` plano, sin iconos ni colores |
| `"horizontal"` | Contenido encima del logo (apilado verticalmente) |
| `"bottom"` | Logo debajo del contenido (apilado verticalmente) |

## Diseño Predeterminado / Clásico

El diseño predeterminado coloca el logo (arte ASCII o imagen) en el lado izquierdo y las líneas de información en el lado derecho, separadas por un espacio doble.

```
__  __                               OS: Arch Linux x86_64
  \ \/ /                             Kernel: 6.6.87.2-arch1-1
   \  /                              Uptime: 2 hours, 15 mins
   /  \                              Packages: 657
  /_/\_\                             Shell: zsh
 /____/linux                         Terminal: WezTerm
---------BEGIN PUBLIC KEY----------   WM: Hyprland
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMII CPU: Intel i5-7400 @ 3.00GHz (4)
BCgKCAQEAwtU/XOS/xOf/FakeKeyDataFor GPU: NVIDIA GeForce RTX 3060
ArtPutHere+Of/XOSLINUXDISTRO/gD4t4+ Memory: 3.10 GiB / 7.74 GiB (40%)
...                                  Disk: 120.5 GiB / 256 GiB (47%)
----------END PUBLIC KEY-----------   Battery: 85% [Charging]
```

Este es el predeterminado cuando no se especifica el campo `layout` o cuando se establece en `null`.

## Diseño de Sección

Agrupa módulos bajo secciones con título. Usa encabezados `------ Título ------` y sangra el contenido con una barra vertical.

```
------ Hardware ------
hostname thinkpad-x1
cpu      Intel i5-7400 @ 3.00GHz (4)
gpu      NVIDIA GeForce RTX 3060
memory   3.10 GiB / 7.74 GiB (40%)
disk     120.5 GiB / 256 GiB (47%) - ext4
battery  85% [Charging]

------ Software ------
os       Arch Linux x86_64
kernel   6.6.87.2-arch1-1
packages 657
shell    zsh
wm       Hyprland
terminal WezTerm

------ Session ------
user     xscriptor
uptime   2 hours, 15 mins
datetime 2026-07-23 14:30:00
```

Configuración:

```jsonc
{
    "layout": "section",
    "modules": [
        {
            "type": "group",
            "title": "Hardware",
            "modules": ["hostname", "cpu", "gpu", "memory", "disk", "battery"]
        },
        {
            "type": "group",
            "title": "Software",
            "modules": ["os", "kernel", "packages", "shell", "wm", "terminal"]
        },
        {
            "type": "group",
            "title": "Session",
            "modules": ["user", "uptime", "datetime"]
        }
    ]
}
```

## Diseño Pac-Man

Un diseño encuadrado con un borde superior decorativo que recuerda a Pac-Man, iconos de cabecera configurables, un borde inferior con texto de pie y contenido en medio.

```
╭── ᗧ ● ● ● ● ───────────────────────╮
│                                      │
│ xscriptor@thinkpad-x1                │
│ OS:      Arch Linux x86_64           │
│ Kernel:  6.6.87.2-arch1-1           │
│ Uptime:  2 hours, 15 mins            │
│ Packages: 657                        │
│ Shell:   zsh                         │
│ CPU:     Intel i5-7400               │
│ Memory:  3.10 GiB / 7.74 GiB (40%)  │
│                                      │
╰──────────────────── GAME OVER ───────╯
```

Configuración:

```jsonc
{
    "layout": "pacman",
    "header_icons": ["\u15a7", "\u25cf", "\u25cf", "\u25cf", "\u25cf"],
    "footer_text": "GAME OVER",
    "modules": ["header", "os", "kernel", "uptime", "packages", "shell", "cpu", "memory"]
}
```

El módulo `header` muestra `usuario@hostname`. El array `header_icons` llena el borde superior. El `footer_text` aparece en el borde inferior.

## Diseño de Bloque Lateral

Dos recuadros alineados: el recuadro izquierdo contiene iconos, el recuadro derecho contiene valores. Los títulos de grupo aparecen como encabezados de sección dentro de los bloques.

```
┌ Icons ───────────────────┐ ┌ Values ──────────────────────┐
│ \uf17c                   │ │ OS                           │
│ \ue266                   │ │ Memory                       │
│ \uf2db                   │ │ CPU                          │
│ \uf0b9                   │ │ GPU                          │
│ \uf240                   │ │ Battery                      │
└──────────────────────────┘ └──────────────────────────────┘
```

## Diseño de Árbol

Diseño jerárquico con conectores de árbol (`---`, `+-`, `\-`) que muestran el anidamiento de módulos.

```
\uf17c OS
\uf17c Kernel
\uf109 Hostname
  \uf2db CPU
  \uf0b9 GPU
  \ue266 Memory
  \uf0a0 Disk
  \uf240 Battery
```

Los grupos se renderizan con sus títulos como nodos padre y los módulos como hijos:

```
DE
  \uf08e Hyprland
  \uf0e7 WezTerm
PC
  \uf2db Intel i5-7400 @ 3.00GHz (4)
  \uf0b9 NVIDIA GeForce RTX 3060
  \ue266 3.10 GiB / 7.74 GiB (40%)
  \uf0a0 120.5 GiB / 256 GiB (47%) - ext4
  \uf240 85% [Charging]
```

## Diseño de Recuadro

Todo el contenido encerrado en un recuadro de esquinas redondeadas:

```
╭──────────────────────────────────────╮
│                                      │
│ OS:      Arch Linux x86_64           │
│ Kernel:  6.6.87.2-arch1-1           │
│ Uptime:  2 hours, 15 mins            │
│ Packages: 657                        │
│ Shell:   zsh                         │
│ CPU:     Intel i5-7400 @ 3.00GHz (4) │
│ Memory:  3.10 GiB / 7.74 GiB (40%)  │
│                                      │
╰──────────────────────────────────────╯
```

## Diseños Line, Dots, Bottom Line

Variantes del diseño clásico con separadores decorativos:

### Diseño Line (separador cada 3 elementos)

```
OS:   Arch Linux x86_64
Kernel: 6.6.87.2-arch1-1
Uptime: 2 hours, 15 mins
─────────────────────────────────────────
Packages: 657
Shell: zsh
Terminal: WezTerm
─────────────────────────────────────────
WM: Hyprland
CPU: Intel i5-7400 @ 3.00GHz (4)
Memory: 3.10 GiB / 7.74 GiB (40%)
```

### Diseño Dots (separador cada 3 elementos)

```
OS:   Arch Linux x86_64
Kernel: 6.6.87.2-arch1-1
Uptime: 2 hours, 15 mins
...
Packages: 657
Shell: zsh
Terminal: WezTerm
...
WM: Hyprland
CPU: Intel i5-7400 @ 3.00GHz (4)
Memory: 3.10 GiB / 7.74 GiB (40%)
```

### Diseño Bottom Line (línea en la parte inferior)

```
OS:   Arch Linux x86_64
Kernel: 6.6.87.2-arch1-1
Uptime: 2 hours, 15 mins
─────────────────────────────────────────
```

## Diseño Compacto

Salida mínima sin bordes, encabezados ni separadores. Solo icono y valor por línea.

```
\uf17c Arch Linux x86_64
\uf17c 6.6.87.2-arch1-1
\uf109 thinkpad-x1
\uf2db Intel i5-7400 @ 3.00GHz (4)
\uf0b9 NVIDIA GeForce RTX 3060
\ue266 3.10 GiB / 7.74 GiB (40%)
\uf0a0 120.5 GiB / 256 GiB (47%) - ext4
```

## Diseño Minimalista

Formato de texto plano sin iconos ni colores. Usa apilamiento vertical (el logo no se muestra).

```
os: Arch Linux x86_64
kernel: 6.6.87.2-arch1-1
hostname: thinkpad-x1
cpu: Intel i5-7400 @ 3.00GHz (4)
memory: 3.10 GiB / 7.74 GiB (40%)
disk: 120.5 GiB / 256 GiB (47%) - ext4
```

## Diseños Horizontal e Inferior

Variantes que cambian la posición del logo en relación al contenido:

- **Horizontal:** Contenido mostrado arriba, logo abajo (útil para terminales anchas)
- **Inferior:** Logo mostrado arriba, contenido abajo (igual que el predeterminado pero apilado verticalmente)

Estos diseños no muestran el logo lado a lado. En su lugar, apilan el logo y el contenido verticalmente.
