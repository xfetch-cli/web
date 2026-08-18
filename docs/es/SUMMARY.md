# Documentación de xfetch

Una herramienta de obtención de información del sistema multiplataforma escrita en Rust.

- **Versión:** 0.5.0
- **Licencia:** MIT
- **Autor:** xscriptor
- **Repositorio:** github.com/xfetch-cli/xfetch

---

## Tabla de Contenidos

1. [Primeros Pasos](getting-started.md)
   - Métodos de instalación (instalación rápida, manual, gestores de paquetes)
   - Primera ejecución
   - Resumen de la interfaz de línea de comandos
   - Variables de entorno

2. [Generación de Configuración](gen-config.md)
   - `--gen-config` básico
   - Logo de distro (`--logo`) y layout (`--layout`)
   - Fallbacks offline
3. [Configuración](configuration.md)
   - Formato de archivo JSONC
   - Todos los campos de configuración
   - Grupos de módulos
   - Iconos y colores
   - Integración de plugins
   - Configuración de animación

4. [Módulos](modules.md)
   - Módulos principales del sistema (SO, kernel, hostname, uptime)
   - Módulos de hardware (CPU, GPU, memoria, swap, disco, batería)
   - Módulos de software (paquetes, shell, terminal, WM/DE)
   - Módulos de red (IP local, IP pública, interfaces)
   - Módulos de usuario/sesión (usuario, fecha/hora)
   - Módulos especiales (paleta, cabecera, separador)
   - Referencias a módulos de plugins

5. [Diseños](layouts.md)
   - Diseño clásico lado a lado
   - Diseño de sección con grupos
   - Diseño Pac-Man
   - Diseño de bloque lateral
   - Diseño de árbol
   - Variantes Box, Line, Dots, Bottom Line
   - Diseño compacto
   - Diseño minimalista
   - Diseños horizontal e inferior

6. [Plugins](plugins.md)
   - Resumen de la arquitectura de plugins
   - Protocolo JSON wire
   - Tipos de plugins (proveedor de información, animación de logo)
   - Descubrimiento e instalación de plugins
   - Referencia de plugins oficiales
     - animate-logo
     - docker
     - github-stats
     - music-player
     - weather
     - timezone
     - user-info
     - display-resolution
     - theme-detection
   - Escritura de plugins personalizados
   - Crate de API para plugins

7. [Extensiones](extensions.md)
   - Resumen de la arquitectura de extensiones
   - Configuración via config_providers
   - Protocolo JSON wire
   - Instalación y comandos CLI
   - Extensiones oficiales
     - config-roulette
     - layout-override
   - Escritura de extensiones personalizadas

8. [Personalización](customization.md)
   - Logos ASCII y de imagen
   - Tamaño y posicionamiento de imágenes
   - Renderizado de imágenes en Kitty
   - Estilos de animación de logo
   - Iconos Nerd Font
   - Personalización de colores ANSI
   - Estilos de visualización de paleta
   - Configuraciones predefinidas

9. [Uso Avanzado](advanced-usage.md)
   - Modo de evaluación comparativa
   - Sistema de caché
   - Controles de privacidad
   - Comportamiento multiplataforma
   - Optimización de rendimiento

10. [Referencia de Predefinidos](presets.md)
   - Predefinidos de diseño
   - Predefinidos de muestra
   - Predefinidos de plugins
   - Predefinido completo

11. [Temas](themes.md)
   - Arquitectura y orden de fusión
   - Formato de archivo de tema
   - Resolución de temas y comandos CLI
   - Temas integrados

12. [Plugin Theme Manager](theme-manager.md)
    - Descripción general e instalación
    - Acciones (listar, buscar, info, instalar)
    - Registro y registros personalizados

13. [Contribuir](contributing.md)
    - Compilación desde el código fuente
    - Estructura del proyecto
    - Guía de desarrollo de plugins
    - Pruebas
    - Proceso de pull request

14. [Hoja de Ruta](roadmap.md)
    - Fases anteriores (base, módulos, diseños, docs)
    - Fase actual (pruebas, funciones avanzadas)
    - Planes futuros

15. [Seguridad](security.md)
    - Reportar vulnerabilidades
    - Buenas prácticas de seguridad
    - Versiones soportadas

16. [Soporte](support.md)
    - Obtener ayuda
    - Antes de abrir un issue
    - Expectativas de respuesta

17. [Registro de Cambios](changelog.md)
    - Historial de versiones
    - Registro de cambios por fase

18. [Código de Conducta](code-of-conduct.md)
    - Nuestros estándares
    - Comportamiento inaceptable
    - Cómo reportar

19. [Licencia](license.md)
    - Términos de la licencia MIT
