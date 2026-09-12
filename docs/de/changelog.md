# Anderungsprotokoll
# Anderungsprotokoll

## v0.9.0 · WebAssembly-Gaeste, Host-Aufrufe und nützliche Beispiele · 2026-09-12

- **Sandboxed WebAssembly Runtime:** Plugins, Effekte und Erweiterungen können `.wasm`-Artefakte (Core-Module und Komponenten) sein, ausgeführt von wasmtime mit im Manifest deklarierten, standardmäßig verweigerten Fähigkeiten (HTTP, Exec, Dateisystem, Umgebung) und Limits für Zeit, Speicher und Ausgabe
- **Dasselbe Protokoll:** Core-Module behalten den JSON-Vertrag über stdin/stdout; Komponenten exportieren `run` aus der WIT-Welt `xfetch:runtime` mit typisierten Host-Imports
- **Werkzeuge:** `xfetch wasm inspect`, `xfetch wasm run` und `xfetch wasm wit`; die Installer akzeptieren vorgebaute Artefakte, `build`-Befehle, `artifact_url` oder direkte URLs
- **Neues Crate `xfetch-guest-api`** für Rust-Core-Gäste und wasm-kompatibles `with_timeout` in allen API-Crates
- **Nuetzliche Beispiele in vier Sprachen:** Krypto-Preise, IP-Geolokation, Pacman-Paketzahlen und `/proc`-Werte, dazu die Erweiterungen Nachtmodus, Update-Fusszeile und lokalisierte Labels
- Der `swap`-Glyph generierter Konfigurationen wurde korrigiert und restliche Emojis aus Presets und Wetter-Dokumentation entfernt
- Gast-Logs werden standardmäßig gefiltert (nur `warn`/`error` werden gezeigt); `XFETCH_WASM_LOG_LEVEL` (`off`..`debug`) steuert die Schwelle
- 195 Tests plus CLI-End-to-End-Wasm-Tests, clippy sauber

## v0.8.0 · Crates.io-Installation, schlankere Abhängigkeiten und HTTPS-Public-IP · 2026-08-21

- **crates.io:** `cargo install xfetch-cli` wird jetzt unterstützt
- **Verschlankter Abhängigkeitsbaum:** die AVIF-Encoder-Kette (`ravif`/`rav1e`/`rayon`) wurde entfernt — von 196 auf 133 Crates, null Schwachstellen; `image`-Codecs auf die vom Logo-Renderer genutzten beschränkt; API-Crates auf einen festen Commit gepinnt
- **Public IP über HTTPS:** die Public-IP-Sonden verwenden jetzt TLS (Mozilla-Roots) mit strenger `IpAddr`-Validierung, 64-Byte-Limit und ohne Redirects
- **Härtung des Logo-Katalogs:** heruntergeladene Logo-Grafiken lehnen ANSI-Escape-Sequenzen und Steuerzeichen ab und fallen auf das Standardlogo zurück
- 147 Tests, Clippy sauber

## v0.7.0 · Konfigurierbare Labels und Wertformate · 2026-08-20

- **`labels`-Konfigurationsmap:** benennt den pro Modul angezeigten Schlüssel in jedem Layout um; eine leere Zeichenkette verbirgt den Schlüssel (nur-Icon-Zeile); Farben verwenden weiterhin den rohen Modulschlüssel
- **`formats`-Konfigurationsmap:** Wertvorlagen mit `{feld}`-Platzhaltern pro Modul — CPU `{brand}`/`{model}`/`{cores}`/`{freq}`, GPU `{name}`/`{vendor}`/`{model}`/`{vram}`, Speicher/Swap `{used}`/`{total}`/`{percent}`, Disk `{fs}`, os `{distro}`/`{version}`/`{arch}`/`{wsl}`, packages ein Feld pro Manager plus `{count}`/`{manager}`/`{managers}`, Akku `{percent}`/`{state}`, Uptime `{days}`/`{hours}`/`{mins}`, datetime `{date}`/`{time}`; unbekannte Felder werden leer gerendert, `{{`/`}}` escapen geschweifte Klammern
- **Akku-Fix (Linux):** Peripherie-Akkus (z. B. Logitech HID++) werden nicht mehr als Systemakkus gezählt
- 141 Tests, Clippy sauber

## v0.6.0 · Themes, Live-Statistik-Daemon und Plattform-Modularisierung · 2026-08-19

- **Theme-Format vereinfacht:** `theme set` andert nur den `theme`-Schlussel und erhalt Kommentare und Formatierung; Themes tragen keine `icons` mehr (Schriftwahl des Benutzers, wird aus den Standardwerten befullt); neue Felder `logo_color` und `logo_colors` (pro Zeile)
- **Live-Statistik-Daemon (`daemon_live`):** fixiert die Ausgabe oben im Terminal und fragt alle `daemon_live_refresh` Sekunden eine leichte Teilmenge der Module neu ab; Hot Reload uber `daemon_live_reload` (uberwacht Config und Theme); Flags `--no-daemon-live`, `--daemon-live-stop`, `--daemon-live-reload`
- **Windows:** `winget` zahlt nur uber winget installierte Pakete; Chocolatey verließ die Kern-Probes (kommt als Plugin zuruck); Shell-Erkennung lauft uber die Eltern-Prozesskette (cmd.exe wird nicht mehr als PowerShell gemeldet); Versions-zu-Logo-Zuordnung nutzt Build-Nummern
- **Plugin- und Erweiterungs-Timeouts:** neue `subprocess.rs` mit begrenztem Pipe-Drain — Kindprozesse, die die Pipe halten, konnen xfetch nicht mehr aufhangen; optionales `timeout_secs` pro Plugin/Erweiterung in der Config; `with_timeout`-Helfer in den API-Crates
- **Plattform-Modularisierung:** macOS und Linux spiegeln die Windows-Struktur (`platform/<os>/version.rs`, `software.rs`, `network.rs`, ...); Arch trennt `pacman` (offiziell) vom neuen `aur`-Eintrag (`pacman -Qm`); Gentoo-portage-Zahl wird angezeigt; WSL-bewusste Darstellung
- **Effekte:** Intro-Animationen uber den neuen `effects`-Schlussel und die Befehle `xfetch effects install/list/remove`

## v0.5.0 · Performance, Paketmanager und Distro-Logos · 2026-08-18

- **Performance-Runden:** Paketzahlen direkt aus den Distro-Datenbanken (dpkg/pacman/apk/flatpak, Mikrosekunden statt Subprozessen); PATH-Prufung vor dem Spawnen von Probes; battery/datetime in den parallelen Abschnitt verschoben; Public-IP-Hosts parallel abgefragt; Probes erst alle spawnen, dann joinen (kalter Fetch 8.7 s → 0.05 s auf WSL)
- **Distro-Logos in `--gen-config`:** holt das ASCII-Logo des erkannten OS/Distro aus dem neuen Katalog `xfetch-cli/logos`, mit `--logo <id>`-Override und `XFETCH_LOGOS_URL` fur Forks
- **Neues Flag `--layout <name>`** fur `--gen-config`; der Ordner `configs/` wurde entfernt — die Vorlage ist jetzt im Binary eingebettet und die Installer erzeugen die erste Config mit `xfetch --gen-config`
- **WSL-Darstellung:** neuer Schlussel `os_wsl_style` (`off` / `minimal` / `full`)
- **Weitere Paketmanager:** Void (xbps-Datenbank) und Gentoo (portage) unterstutzt; unbekannte Config-Schlussel werden ignoriert
- **Windows:** `winget`-Unterstutzung hinzugefugt; `choco list --local-only` zahlt nicht mehr falsch; `scoop list` zahlt Zeilen korrekt
- **Parallele Plugins:** Plugins laufen in parallelen Threads — API unverandert, kein Plugin muss angepasst werden

## v0.4.0 · Daemon-Modus, neue Layouts und Hang-Fixes · 2026-08-17

- **Daemon-Modus (`--daemon`):** fixiert das animierte Logo in einem festen Scrollbereich und beendet sich sofort; stoppen mit `--daemon-stop`
- **Externe Befehls-Timeouts:** `run_cmd_with_timeout()` beendet hangende Befehle — snap ohne snapd-Daemon blockiert den Fetch nicht mehr; Timeouts pro Befehl fur Paketmanager und Hardware-Probes
- **Plattformtrennung:** neue Struktur `src/info/platform/{linux,macos,windows}/` mit gemeinsamem Vertrag und Mechanik in `shared/`
- **Neue Layouts:** `section-box` (umrandete Boxen pro Modulgruppe) und `custom-x` (vollstandig anpassbare Rahmenvorlagen mit `{fill}`/`{title}`, Breite auto/full/fest)
- **Neue Optionen:** `show_keys`, `key_width`, `logo_color` (Namen, 256-Farb-Indizes und Hex-RGB), `logo_padding`, `logo_type` (auto/ascii/image)
- **XDG_CONFIG_HOME-Unterstutzung** (macOS-Fix) und lokale CI-Skripte (`scripts/ci.sh`, `scripts/ci.ps1`)

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
