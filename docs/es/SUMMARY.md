# Documentación de xfetch

Una herramienta de obtención de información del sistema multiplataforma escrita en Rust.

- **Versión:** 0.1.1
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

2. [Configuración](configuration.md)
   - Formato de archivo JSONC
   - Todos los campos de configuración
   - Grupos de módulos
   - Iconos y colores
   - Integración de plugins
   - Configuración de animación

3. [Módulos](modules.md)
   - Módulos principales del sistema (SO, kernel, hostname, uptime)
   - Módulos de hardware (CPU, GPU, memoria, swap, disco, batería)
   - Módulos de software (paquetes, shell, terminal, WM/DE)
   - Módulos de red (IP local, IP pública, interfaces)
   - Módulos de usuario/sesión (usuario, fecha/hora)
   - Módulos especiales (paleta, cabecera, separador)
   - Referencias a módulos de plugins

4. [Diseños](layouts.md)
   - Diseño clásico lado a lado
   - Diseño de sección con grupos
   - Diseño Pac-Man
   - Diseño de bloque lateral
   - Diseño de árbol
   - Variantes Box, Line, Dots, Bottom Line
   - Diseño compacto
   - Diseño minimalista
   - Diseños horizontal e inferior

5. [Plugins](plugins.md)
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

6. [Personalización](customization.md)
   - Logos ASCII y de imagen
   - Estilos de animación de logo
   - Iconos Nerd Font
   - Personalización de colores ANSI
   - Estilos de visualización de paleta
   - Configuraciones predefinidas

7. [Uso Avanzado](advanced-usage.md)
   - Modo de evaluación comparativa
   - Sistema de caché
   - Controles de privacidad
   - Comportamiento multiplataforma
   - Optimización de rendimiento

8. [Referencia de Predefinidos](presets.md)
   - Predefinidos de diseño
   - Predefinidos de muestra
   - Predefinidos de plugins
   - Predefinido completo

9. [Temas](themes.md)
   - Arquitectura y orden de fusión
   - Formato de archivo de tema
   - Resolución de temas y comandos CLI
   - Temas integrados

10. [Plugin Theme Manager](theme-manager.md)
    - Descripción general e instalación
    - Acciones (listar, buscar, info, instalar)
    - Registro y registros personalizados

11. [Contribuir](contributing.md)
    - Compilación desde el código fuente
    - Estructura del proyecto
    - Guía de desarrollo de plugins
    - Pruebas
    - Proceso de pull request

12. [Hoja de Ruta](roadmap.md)
    - Fases anteriores (base, módulos, diseños, docs)
    - Fase actual (pruebas, funciones avanzadas)
    - Planes futuros

13. [Seguridad](security.md)
    - Reportar vulnerabilidades
    - Buenas prácticas de seguridad
    - Versiones soportadas

14. [Soporte](support.md)
    - Obtener ayuda
    - Antes de abrir un issue
    - Expectativas de respuesta

15. [Registro de Cambios](changelog.md)
    - Historial de versiones
    - Registro de cambios por fase

16. [Código de Conducta](code-of-conduct.md)
    - Nuestros estándares
    - Comportamiento inaceptable
    - Cómo reportar

17. [Licencia](license.md)
    - Términos de la licencia MIT
