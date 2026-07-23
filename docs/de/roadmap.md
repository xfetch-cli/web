# Fahrplan

## Phase 0 · Grundlage und Kern

- [x] Rust-Projekt mit Abhangigkeiten initialisieren
- [x] Plattformubergreifende OS-Erkennung (Linux, Windows, macOS)
- [x] Modul zur Systeminformationserfassung erstellen
- [x] Konfigurationssystem mit JSONC-Unterstutzung implementieren
- [x] UI-Rendering-Engine mit crossterm entwickeln

## Phase 1 · Systeminformationsmodule

- [x] OS-Name & Architektur anzeigen
- [x] Kernel-Version erkennen
- [x] Hostname auflosen
- [x] Shell erkennen und anzeigen
- [x] Terminalemulator erkennen
- [x] CPU-Modell & Frequenzinformationen
- [x] GPU-Erkennung (diskret & integriert)
- [x] Arbeitsspeicher- und RAM-Auslastung anzeigen
- [x] Festplattennutzungsstatistiken
- [x] Akkustand und -prozentsatz
- [x] Systemlaufzeit berechnen
- [x] Paketanzahl fur mehrere Verwaltungsprogramme (pacman, dpkg, scoop)
- [x] Desktop-Umgebung / Fenstermanager erkennen

## Phase 2 · Visuelle Anpassung und Layouts

- [x] Benutzerdefinierte ASCII-Kunst aus Textdateien
- [x] Bild-/SVG-Logo-Unterstutzung uber viuer
- [x] ANSI-Farbcodes in ASCII-Logos
- [x] Symbolanpassung pro Modul (Nerd Fonts)
- [x] Farbanpassung pro Modul
- [x] Standardlayout (nebeneinander)
- [x] Pac-Man-Layout mit benutzerdefiniertem Kopf-/Fußbereich
- [x] Seitenblock-Layout
- [x] Baum-Layout fur hierarchische Anzeige
- [x] Abschnittslayout fur gruppierte Informationen
- [x] Farbpalette mit Stiloptionen

## Phase 3 · Dokumentation und Beispiele

- [x] Installationsanleitung
- [x] Konfigurationsanleitung
- [x] Schnellinstallationsskript fur Linux/macOS
- [x] PowerShell-Installationsskript fur Windows
- [x] 20+ Beispielkonfigurationen
- [x] Beispiel-Logos (Text und SVG)
- [x] Deinstallationsskripte
- [x] Layout-Dokumentation

## Phase 4 · Paketverwalter-Erweiterung

- [x] RPM-Paketverwalter-Unterstutzung (Fedora, RHEL)
- [x] APK-Paketverwalter-Unterstutzung (Alpine)
- [x] Nix-Paketverwalter-Unterstutzung
- [x] Homebrew-Paketverwalter-Unterstutzung (macOS/Linux)
- [x] Chocolatey-Paketverwalter-Unterstutzung (Windows)
- [x] Mehrere installierte Paketverwalter erkennen
- [x] Leistung der Paketanzahlerkennung optimieren

## Phase 5 · Netzwerk und Konnektivitat

- [x] Lokale IP-Adresserkennung
- [x] Offentliche IP-Adresse abrufen (mit Datenschutzoption)
- [x] IPv6-Unterstutzung
- [x] Netzwerkschnittstelleninformationen anzeigen
- [x] Option zum Deaktivieren des IP-Abrufs aus Datenschutzgrunden

## Phase 6 · Erweiterte Module

- [x] Musikplayer-Integration (MPD-Unterstutzung)
- [x] Spotify-Titelanzeige
- [x] Wettermodul mit Standort-API
- [x] Zeitzonen- und Weltuhranzeige
- [x] Benutzerinfo und Anmeldestatus
- [x] Bildschirmauflosung und Bildwiederholfrequenz
- [x] Themen- und Farbschemaerkennung

## Phase 7 · Zusatzliche Layouts

- [x] Kompaktes Layout fur minimale Ausgabe
- [x] Horizontales Layout
- [x] Unteres Layout mit Logo unter den Informationen
- [x] Minimales Layout (nur Text)
- [x] Layout-Vorschau-Dokumentation

## Phase 8 · Leistungsoptimierung

- [x] Langsame Hardwareabfragen parallelisieren
- [x] Zwischenspeicherung von Moduldaten
- [x] GPU-Erkennung fur Multi-GPU-Systeme optimieren
- [x] Nachladen fur optionale Module
- [x] Leistung messen und profilieren
- [x] Dateien modularisieren

## Phase 9 · CI/CD und Vertrieb

- [x] GitHub Actions fur automatisierte Builds
- [x] Binar-Releases fur Linux x86_64
- [x] Binar-Releases fur macOS (Intel & ARM)
- [x] Binar-Releases fur Windows
- [x] AUR-Paket fur Arch Linux
- [x] Homebrew-Tap fur macOS
- [x] Cargo-Registry fur den Vertrieb
- [x] Automatisierte Changelog-Generierung

## Phase 10 · Gemeinschaft und Okosystem

- [x] Themen-Repository / Registry erstellen
- [x] Theme-Download-Manager implementieren
- [x] Online-Theme-Vorschau-Tool erstellen
- [x] Gemeinschaftsprozess fur Theme-Beitrage einrichten
- [x] Plugin-System fur benutzerdefinierte Module erstellen
- [/] Plugin-Konfigurationsvalidierung implementieren
- [x] Issue-Templates fur die Gemeinschaft einrichten
- [x] Beitragsrichtlinien erstellen

## Phase 11 · Tests und Qualitätssicherung

- [x] Unit-Tests fur das Info-Modul
- [x] Unit-Tests fur das Konfigurationsmodul
- [x] Integrationstests fur Layouts
- [ ] Linting mit clippy einrichten
- [ ] Code-Formatter (rustfmt) einrichten
- [ ] Plattformspezifische Tests fur jedes Betriebssystem
- [/] Plattformubergreifende Testsuite
- [ ] Codeabdeckungsbericht einrichten

## Phase 12 · Erweiterte Funktionen

- [ ] Benutzerdefinierte Modul-Skriptsprache / Unterstutzung
- [ ] Bedingte Modulanzeige basierend auf Systemzustand
- [ ] Themsystem mit Variablen implementieren
- [ ] Animationsunterstutzung fur Ubergangselemente
- [ ] Echtzeitaktualisierungen / Daemon-Modus
- [ ] Konfigurations-Hot-Reload-Fahigkeit
- [x] Telemetrie (optional, datenschutzrespektierend)
- [ ] Barrierefreiheitsfunktionen (kontrastreiche Designs)

## Phase 13 · Dokumentation und Marketing

- [x] Umfassendes Benutzerhandbuch
- [ ] Video-Tutorials erstellen
- [x] Projektwebsite mit Showcase einrichten
- [x] Entwicklerdokumentation erstellen
- [ ] Blogbeitrage uber Funktionen veroffentlichen
- [/] Vergleichsleitfaden mit ahnlichen Tools erstellen
- [ ] Discord/Slack-Community-Kanal einrichten
- [/] Beitragsprogramm erstellen
