# Registro de Cambios

## Fase 0 · Base y Núcleo

- Inicializar proyecto Rust con dependencias
- Detección multiplataforma de SO (Linux, Windows, macOS)
- Módulo de recopilación de información del sistema
- Sistema de configuración con soporte JSONC
- Motor de renderizado UI con crossterm

## Fase 1 · Módulos de Información del Sistema

- Mostrar nombre del SO y arquitectura
- Detección de versión del kernel
- Resolución de hostname
- Detección y visualización de shell
- Detección de emulador de terminal
- Información del modelo y frecuencia de CPU
- Detección de GPU (discreta e integrada)
- Visualización de uso de memoria y RAM
- Estadísticas de uso de disco
- Estado y porcentaje de batería
- Cálculo de tiempo de actividad del sistema
- Conteo de paquetes para múltiples gestores (pacman, dpkg, scoop)
- Detección de entorno de escritorio / gestor de ventanas

## Fase 2 · Personalización Visual y Diseños

- Soporte de arte ASCII personalizado desde archivos
- Soporte de logotipos SVG/Imagen via viuer
- Códigos de color ANSI en logotipos ASCII
- Personalización de iconos por módulo (Nerd Fonts)
- Personalización de colores por módulo
- Diseño predeterminado (lado a lado)
- Diseño Pac-Man con cabecera/pie personalizado
- Diseño de bloque lateral
- Diseño de árbol para visualización jerárquica
- Diseño de sección para información agrupada
- Paleta de colores con opciones de estilo

## Fase 3 · Documentación y Ejemplos

- Guía de instalación
- Guía de configuración
- Script de instalación rápida para Linux/macOS
- Script de instalación PowerShell para Windows
- 20+ configuraciones de ejemplo
- Logotipos de muestra (texto y SVG)
- Scripts de desinstalación
- Documentación de diseños

## Fase 4 · Expansión de Gestores de Paquetes

- Soporte para gestor RPM (Fedora, RHEL)
- Soporte para gestor APK (Alpine)
- Soporte para gestor Nix
- Soporte para gestor Homebrew (macOS/Linux)
- Soporte para gestor Chocolatey (Windows)
- Detección de múltiples gestores instalados
- Optimización de rendimiento del conteo de paquetes

## Fase 5 · Red y Conectividad

- Detección de dirección IP local
- Obtención de IP pública (con opción de privacidad)
- Soporte IPv6
- Información de interfaces de red
- Opción para deshabilitar obtención de IP por privacidad

## Fase 6 · Módulos Mejorados

- Integración con reproductor de música (soporte MPD)
- Visualización de pista actual de Spotify
- Módulo meteorológico con API de ubicación
- Visualización de zona horaria y reloj mundial
- Información de usuario y estado de inicio de sesión
- Resolución de pantalla y tasa de refresco
- Detección de tema y esquema de colores

## Fase 7 · Diseños Adicionales

- Diseño compacto para salida mínima
- Diseño horizontal
- Diseño inferior con logo debajo de la info
- Diseño minimalista (solo texto)
- Documentación de vista previa de diseños

## Fase 8 · Optimización de Rendimiento

- Sondas lentas de hardware paralelizadas
- Caché de datos de módulos
- Optimización de detección GPU para sistemas multi-GPU
- Carga diferida para módulos opcionales
- Evaluación comparativa y perfilado de rendimiento
- Estructura de archivos modularizada

## Fase 9 · CI/CD y Distribución

- GitHub Actions para compilaciones automatizadas
- Lanzamientos binarios para Linux x86_64, macOS (Intel & ARM) y Windows
- Paquete AUR para Arch Linux
- Homebrew tap para macOS
- Scripts de instalación para todas las plataformas
- Instalación automatizada de Rust en install.ps1 para Windows

## Fase 10 · Comunidad y Ecosistema

- Repositorio y registro de temas
- Gestor de descarga de temas (plugin)
- Herramienta de vista previa de temas en línea
- Proceso de contribución de temas comunitarios
- Sistema de plugins para módulos personalizados
- Plantillas de issues para xfetch, plugins, configs y api
- Guías de contribución

## Fase 11 · Pruebas y Aseguramiento de Calidad

- Pruebas unitarias para el módulo de información
- Pruebas unitarias para el módulo de configuración
- Pruebas de integración para diseños
- 41 pruebas en total, todas exitosas

## Fase 12 · Funciones Avanzadas

> Por respeto a la privacidad de nuestros usuarios: hemos decidido eliminar incluso la posibilidad, mantenemos esto como un registro de lo que no debe hacerse bajo ninguna circunstancia en el futuro.

## Fase 13 · Documentación y Marketing

- Manual de usuario completo
- Sitio web del proyecto con showcase
- Documentación para desarrolladores
