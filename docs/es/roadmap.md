# Hoja de Ruta

## Fase 0 · Base y Núcleo

- [x] Inicializar proyecto Rust con dependencias
- [x] Detección multiplataforma de SO (Linux, Windows, macOS)
- [x] Crear módulo de recopilación de información del sistema
- [x] Implementar sistema de configuración con soporte JSONC
- [x] Construir motor de renderizado UI con crossterm

## Fase 1 · Módulos de Información del Sistema

- [x] Mostrar nombre del SO y arquitectura
- [x] Detección de versión del kernel
- [x] Resolución de hostname
- [x] Detección y visualización de shell
- [x] Detección de emulador de terminal
- [x] Información del modelo y frecuencia de CPU
- [x] Detección de GPU (discreta e integrada)
- [x] Visualización de uso de memoria y RAM
- [x] Estadísticas de uso de disco
- [x] Estado y porcentaje de batería
- [x] Cálculo de tiempo de actividad del sistema
- [x] Conteo de paquetes para múltiples gestores (pacman, dpkg, scoop)
- [x] Detección de entorno de escritorio / gestor de ventanas

## Fase 2 · Personalización Visual y Diseños

- [x] Soporte de arte ASCII personalizado desde archivos
- [x] Soporte de logotipos SVG/Imagen via viuer
- [x] Códigos de color ANSI en logotipos ASCII
- [x] Personalización de iconos por módulo (Nerd Fonts)
- [x] Personalización de colores por módulo
- [x] Diseño predeterminado (lado a lado)
- [x] Diseño Pac-Man con cabecera/pie personalizado
- [x] Diseño de bloque lateral
- [x] Diseño de árbol para visualización jerárquica
- [x] Diseño de sección para información agrupada
- [x] Paleta de colores con opciones de estilo

## Fase 3 · Documentación y Ejemplos

- [x] Guía de instalación
- [x] Guía de configuración
- [x] Script de instalación rápida para Linux/macOS
- [x] Script de instalación PowerShell para Windows
- [x] 20+ configuraciones de ejemplo
- [x] Logotipos de muestra (texto y SVG)
- [x] Scripts de desinstalación
- [x] Documentación de diseños

## Fase 4 · Expansión de Gestores de Paquetes

- [x] Soporte para gestor RPM (Fedora, RHEL)
- [x] Soporte para gestor APK (Alpine)
- [x] Soporte para gestor Nix
- [x] Soporte para gestor Homebrew (macOS/Linux)
- [x] Soporte para gestor Chocolatey (Windows)
- [x] Detección de múltiples gestores instalados
- [x] Optimización de rendimiento del conteo de paquetes

## Fase 5 · Red y Conectividad

- [x] Detección de dirección IP local
- [x] Obtención de IP pública (con opción de privacidad)
- [x] Soporte IPv6
- [x] Visualización de información de interfaces de red
- [x] Opción para deshabilitar la obtención de IP por privacidad

## Fase 6 · Módulos Mejorados

- [x] Integración con reproductor de música (soporte MPD)
- [x] Visualización de pista actual de Spotify
- [x] Módulo meteorológico con API de ubicación
- [x] Visualización de zona horaria y reloj mundial
- [x] Información de usuario y estado de inicio de sesión
- [x] Resolución de pantalla y tasa de refresco
- [x] Detección de tema y esquema de colores

## Fase 7 · Diseños Adicionales

- [x] Diseño compacto para salida mínima
- [x] Diseño horizontal
- [x] Diseño inferior con logo debajo de la info
- [x] Diseño minimalista (solo texto)
- [x] Documentación de vista previa de diseños

## Fase 8 · Optimización de Rendimiento

- [x] Sondas lentas de hardware paralelizadas
- [x] Caché de datos de módulos
- [x] Optimización de detección GPU para sistemas multi-GPU
- [x] Carga diferida para módulos opcionales
- [x] Evaluación comparativa y perfilado de rendimiento
- [x] Estructura de archivos modularizada

## Fase 9 · CI/CD y Distribución

- [x] GitHub Actions para compilaciones automatizadas
- [x] Lanzamientos binarios para Linux x86_64
- [x] Lanzamientos binarios para macOS (Intel & ARM)
- [x] Lanzamientos binarios para Windows
- [x] Paquete AUR para Arch Linux
- [x] Homebrew tap para macOS
- [x] Registro cargo para distribución
- [x] Generación automatizada de changelog

## Fase 10 · Comunidad y Ecosistema

- [x] Crear repositorio/registro de temas
- [x] Implementar gestor de descarga de temas
- [x] Crear herramienta de vista previa de temas en línea
- [x] Establecer proceso de contribución de temas comunitarios
- [x] Crear sistema de plugins para módulos personalizados
- [/] Implementar validación de configuración de plugins
- [x] Establecer plantillas de issues comunitarias
- [x] Crear guías de contribución

## Fase 11 · Pruebas y Aseguramiento de Calidad

- [x] Pruebas unitarias para el módulo de información
- [x] Pruebas unitarias para el módulo de configuración
- [x] Pruebas de integración para diseños
- [ ] Configurar linting con clippy
- [ ] Configurar formateador de código (rustfmt)
- [ ] Implementar pruebas específicas por plataforma
- [/ ] Añadir suite de pruebas multiplataforma
- [ ] Configurar informe de cobertura de código

## Fase 12 · Funciones Avanzadas

- [ ] Implementar lenguaje de scripting / soporte para módulos personalizados
- [ ] Añadir visualización condicional de módulos según estado del sistema
- [ ] Implementar sistema de temas con variables
- [ ] Añadir soporte de animación para elementos transicionales
- [ ] Implementar actualizaciones en tiempo real / modo daemon
- [ ] Añadir capacidad de recarga en caliente de configuración
- [x] Implementar telemetría (opcional, respetuosa con la privacidad)
- [ ] Añadir funciones de accesibilidad (temas de alto contraste)

## Fase 13 · Documentación y Marketing

- [x] Crear manual de usuario completo
- [ ] Crear tutoriales en video
- [x] Configurar sitio web del proyecto con showcase
- [x] Crear documentación para desarrolladores
- [ ] Publicar artículos de blog sobre funciones
- [/] Crear guía comparativa con herramientas similares
- [ ] Configurar canal comunitario Discord/Slack
- [/] Crear programa de contribución
