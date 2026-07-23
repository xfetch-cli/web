# xfetch Dokumentation

Ein plattformunabhangiges Systeminformations-Tool geschrieben in Rust.

- **Version:** 0.1.1
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

6. [Anpassung](customization.md)
   - ASCII- und Bildlogos
   - Logo-Animationsstile
   - Nerd Font Icons
   - ANSI-Farbanpassung
   - Paletten-Anzeigestile
   - Preset-Konfigurationen

7. [Fortgeschrittene Nutzung](advanced-usage.md)
   - Benchmark-Modus
   - Cache-System
   - Datenschutzeinstellungen
   - Plattformubergreifendes Verhalten
   - Leistungsoptimierung

8. [Presets-Referenz](presets.md)
   - Layout-Presets
   - Showcase-Presets
   - Plugin-Presets
   - Full-Stack-Preset

9. [Mitwirken](contributing.md)
   - Aus dem Quellcode bauen
   - Projektstruktur
   - Plugin-Entwicklungsleitfaden
   - Testen
   - Pull-Request-Prozess
