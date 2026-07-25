# xfetch Dokumentation

Ein plattformunabhangiges Systeminformations-Tool geschrieben in Rust.

- ****Version:** 0.3.0
- **Lizenz:** MIT
- **Autor:** xscriptor
- **Repository:** github.com/xfetch-cli/xfetch

---

## Inhaltsverzeichnis

1. [Erste Schritte](getting-started.md)
   - Installationsmethoden (Schnellinstallation, manuell, Paketmanager)
   - Erster Start
   - Befehlszeilen-Schnittstelle im Uberblick
   - Umgebungsvariablen

2. [Konfiguration](configuration.md)
   - JSONC-Konfigurationsdatei-Format
   - Alle Konfigurationsfelder
   - Modulgruppen
   - Icons und Farben
   - Plugin-Integration
   - Animationskonfiguration

3. [Module](modules.md)
   - Kernsystemmodule (OS, Kernel, Hostname, Uptime)
   - Hardwaremodule (CPU, GPU, Arbeitsspeicher, Swap, Festplatte, Akku)
   - Softwaremodule (Pakete, Shell, Terminal, WM/DE)
   - Netzwerkmodule (Lokale IP, Offentliche IP, Schnittstellen)
   - Benutzer-/Sitzungsmodule (Benutzer, Datum/Uhrzeit)
   - Spezialmodule (Palette, Header, Separator)
   - Plugin-Modulreferenzen

4. [Layouts](layouts.md)
   - Klassisches Nebeneinander-Layout
   - Abschnittslayout mit Gruppen
   - Pac-Man-Layout
   - Seitenblock-Layout
   - Baum-Layout
   - Box-, Linien-, Punkt-, Untere-Linie-Varianten
   - Kompaktes Layout
   - Minimales Layout
   - Horizontales und Unteres Layout

5. [Plugins](plugins.md)
   - Plugin-Architektur im Uberblick
   - JSON-Drahtprotokoll
   - Plugin-Arten (Info-Anbieter, Logo-Animation)
   - Plugin-Erkennung und -Installation
   - Referenz der offiziellen Plugins
     - animate-logo
     - docker
     - github-stats
     - music-player
     - weather
     - timezone
     - user-info
     - display-resolution
     - theme-detection
   - Eigene Plugins schreiben
   - Plugin-API-Crate

6. [Erweiterungen](extensions.md)
   - Erweiterungsarchitektur im Uberblick
   - Konfiguration uber config_providers
   - JSON-Drahtprotokoll
   - Installation und CLI-Befehle
   - Offizielle Erweiterungen
     - config-roulette
     - layout-override
   - Eigene Erweiterungen schreiben

7. [Anpassung](customization.md)
   - ASCII- und Bildlogos
   - Bildgrosse und Positionierung
   - Kitty Terminal Bild-Rendering
   - Logo-Animationsstile
   - Nerd Font Icons
   - ANSI-Farbanpassung
   - Paletten-Anzeigestile
   - Preset-Konfigurationen

8. [Fortgeschrittene Nutzung](advanced-usage.md)
   - Benchmark-Modus
   - Cache-System
   - Datenschutzeinstellungen
   - Plattformubergreifendes Verhalten
   - Leistungsoptimierung

9. [Presets-Referenz](presets.md)
   - Layout-Presets
   - Showcase-Presets
   - Plugin-Presets
   - Full-Stack-Preset

9. [Themes](themes.md)
   - Architektur und Zusammenfuhlungsreihenfolge
   - Theme-Dateiformat
   - Theme-Auflosung und CLI-Befehle
   - Integrierte Themes

10. [Theme Manager Plugin](theme-manager.md)
    - Ubersicht und Installation
    - Aktionen (liste, suche, info, installiere)
    - Registry und benutzerdefinierte Registries

12. [Mitwirken](contributing.md)
    - Aus dem Quellcode bauen
    - Projektstruktur
    - Plugin-Entwicklungsleitfaden
    - Testen
    - Pull-Request-Prozess

12. [Fahrplan](roadmap.md)
    - Vergangene Phasen (Grundlage, Module, Layouts, Dokus)
    - Aktuelle Phase (Tests, erweiterte Funktionen)
    - Zukunftsplane

14. [Sicherheit](security.md)
    - Melden von Sicherheitslucken
    - Sicherheitsempfehlungen
    - Unterstutzte Versionen

15. [Support](support.md)
    - Hilfe erhalten
    - Vor dem Offnen eines Issues
    - Reaktionserwartungen

16. [Anderungsprotokoll](changelog.md)
    - Versionsgeschichte
    - Phasenweises Anderungsprotokoll

17. [Verhaltenskodex](code-of-conduct.md)
    - Unsere Standards
    - Inakzeptables Verhalten
    - Melden

18. [Lizenz](license.md)
    - MIT-Lizenzbestimmungen
