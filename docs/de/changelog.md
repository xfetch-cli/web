# Anderungsprotokoll

## v0.3.0 · Bild-Rendering und Erweiterungen · 2026-07-25

- **Kitty Bild-Rendering uberarbeitet:** `logo_kitty` Toggle (natives Protokoll vs Half-Block), `logo_gap` fur konfigurierbaren Bild-Text-Abstand, `logo_width`/`logo_height` fur explizite Grose, und auto-responsive Breite (28% des Terminals, clamp 12–42 Spalten)
- **Cursor-Positionierung korrigiert:** `MoveUp`/`MoveToColumn` durch `SavePosition`/`RestorePosition` ersetzt fur korrektes Verhalten bei allen Bildprotokollen
- **Stacked-Layout korrigiert:** `print_stacked_output()` fur reine Bildlogos (ohne ASCII-Text) repariert
- **Erweiterungs-API:** `api/crates/extension-api/` erstellt — `ConfigProviderRequest`/`ConfigProviderResponse` Protokoll, `config_providers[]` Feld, stdin/stdout JSON-Kommunikation
- **config-roulette Erweiterung:** Wahlt zufallige oder tagliche Konfiguration aus einer JSON-Routenliste, unterstutzt 100+ Routen
- **layout-override Erweiterung:** Erzwingt Layout und/oder Module beim Konfigurationsladen
- **Erweiterungs-CLI:** Befehle `xfetch extension install/list/remove` hinzugefugt
- **100 bildbasierte Konfigurationen** fur config-roulette mit `logo_gap: 3` und `logo_kitty: true`

## Phase 0 · Grundlage und Kern

- Rust-Projekt mit Abhangigkeiten initialisieren
- Plattformubergreifende OS-Erkennung (Linux, Windows, macOS)
- Modul zur Systeminformationserfassung
- Konfigurationssystem mit JSONC-Unterstutzung
- UI-Rendering-Engine mit crossterm

## Phase 1 · Systeminformationsmodule

- OS-Name & Architektur anzeigen
- Kernel-Version erkennen
- Hostname auflosen
- Shell erkennen und anzeigen
- Terminalemulator erkennen
- CPU-Modell & Frequenzinformationen
- GPU-Erkennung (diskret & integriert)
- Arbeitsspeicher- und RAM-Auslastung
- Festplattennutzungsstatistiken
- Akkustand und -prozentsatz
- Systemlaufzeit berechnen
- Paketanzahl fur mehrere Verwaltungsprogramme (pacman, dpkg, scoop)
- Desktop-Umgebung / Fenstermanager erkennen

## Phase 2 · Visuelle Anpassung und Layouts

- Benutzerdefinierte ASCII-Kunst aus Textdateien
- Bild-/SVG-Logo-Unterstutzung uber viuer
- ANSI-Farbcodes in ASCII-Logos
- Symbolanpassung pro Modul (Nerd Fonts)
- Farbanpassung pro Modul
- Standardlayout (nebeneinander)
- Pac-Man-Layout mit benutzerdefiniertem Kopf-/Fußbereich
- Seitenblock-Layout
- Baum-Layout
- Abschnittslayout
- Farbpalette mit Stiloptionen

## Phase 3 · Dokumentation und Beispiele

- Installationsanleitung
- Konfigurationsanleitung
- Schnellinstallationsskript fur Linux/macOS
- PowerShell-Installationsskript fur Windows
- 20+ Beispielkonfigurationen
- Beispiel-Logos (Text und SVG)
- Deinstallationsskripte
- Layout-Dokumentation

## Phase 4 · Paketverwalter-Erweiterung

- RPM-Paketverwalter-Unterstutzung (Fedora, RHEL)
- APK-Paketverwalter-Unterstutzung (Alpine)
- Nix-Paketverwalter-Unterstutzung
- Homebrew-Paketverwalter-Unterstutzung (macOS/Linux)
- Chocolatey-Paketverwalter-Unterstutzung (Windows)
- Mehrere installierte Paketverwalter erkennen
- Leistungsoptimierung der Paketanzahlerkennung

## Phase 5 · Netzwerk und Konnektivitat

- Lokale IP-Adresserkennung
- Offentliche IP-Adresse abrufen (mit Datenschutzoption)
- IPv6-Unterstutzung
- Netzwerkschnittstelleninformationen anzeigen
- Option zum Deaktivieren des IP-Abrufs

## Phase 6 · Erweiterte Module

- Musikplayer-Integration (MPD-Unterstutzung)
- Spotify-Titelanzeige
- Wettermodul mit Standort-API
- Zeitzonen- und Weltuhranzeige
- Benutzerinfo und Anmeldestatus
- Bildschirmauflosung und Bildwiederholfrequenz
- Themen- und Farbschemaerkennung

## Phase 7 · Zusatzliche Layouts

- Kompaktes Layout
- Horizontales Layout
- Unteres Layout
- Minimales Layout (nur Text)
- Layout-Vorschau-Dokumentation

## Phase 8 · Leistungsoptimierung

- Parallelisierung langsamer Hardwareabfragen
- Zwischenspeicherung von Moduldaten
- GPU-Erkennung fur Multi-GPU-Systeme optimiert
- Nachladen fur optionale Module
- Leistungsmessung und -profilierung
- Modularisierte Dateistruktur

## Phase 9 · CI/CD und Vertrieb

- GitHub Actions fur automatisierte Builds
- Binar-Releases fur Linux x86_64, macOS (Intel & ARM) und Windows
- AUR-Paket fur Arch Linux
- Homebrew-Tap fur macOS
- Installationsskripte fur alle Plattformen
- Automatisierte Rust-Installation in install.ps1 fur Windows

## Phase 10 · Gemeinschaft und Okosystem

- Themen-Repository und Registry
- Theme-Download-Manager (Plugin)
- Online-Theme-Vorschau-Tool
- Gemeinschaftsprozess fur Theme-Beitrage
- Plugin-System fur benutzerdefinierte Module
- Issue-Templates fur xfetch, Plugins, Konfigurationen und API
- Beitragsrichtlinien

## Phase 11 · Tests und Qualitätssicherung

- Unit-Tests fur das Info-Modul
- Unit-Tests fur das Konfigurationsmodul
- Integrationstests fur Layouts
- 41 Tests insgesamt, alle bestanden

## Phase 12 · Erweiterte Funktionen

> Aus Respekt vor der Privatsphare unserer Benutzer: Wir haben uns entschlossen, selbst die Moglichkeit auszuschließen. Wir behalten dies als Aufzeichnung dessen, was unter keinen Umstanden in der Zukunft getan werden sollte.

## Phase 13 · Dokumentation und Marketing

- Umfassendes Benutzerhandbuch
- Projektwebsite mit Showcase
- Entwicklerdokumentation
