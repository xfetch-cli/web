# Anderungsprotokoll

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
