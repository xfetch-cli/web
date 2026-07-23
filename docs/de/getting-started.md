# Erste Schritte mit xfetch

xfetch ist ein plattformunabhangiges Systeminformations-Tool geschrieben in Rust. Es zeigt Details zu Ihrem Betriebssystem, Ihrer Hardware, Software und Ihrem Netzwerk in einer anpassbaren Terminalausgabe mit ASCII-Kunst oder Bildern an.

## Schnellinstallation

### Linux und macOS

```bash
curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.sh | bash
```

Dies installiert xfetch nach `~/.local/bin/`, kopiert Standardkonfigurationen nach `~/.config/xfetch/` und fugt optional das Binarbildverzeichnis zu Ihrem PATH hinzu.

So passen Sie den Installationspfad an:

```bash
curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.sh | bash -s -- --prefix ~/myapps
```

Flags:

| Flag | Beschreibung |
|------|-------------|
| `--local` | Das lokale Repository anstelle von Klonen verwenden |
| `--prefix <verz>` | Installationspraefix (Standard: `~/.local`) |
| `--bin-dir <verz>` | Binarbildverzeichnis (Standard: `~/.local/bin`) |
| `--config-dir <verz>` | Konfigurationsverzeichnis (Standard: `~/.config/xfetch`) |
| `--no-modify-path` | Das Binardir nicht zum PATH in der Shell-RC hinzufugen |
| `--yes` | Automatische Bestatigung aller Eingabeaufforderungen |
| `--skip-config` | Kopieren der Standardkonfiguration uberspringen |
| `--no-cargo-install` | Ein vorgebautes Binary anstelle von Cargo-Build verwenden |

### Windows (PowerShell)

```powershell
irm https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.ps1 | iex
```

### Manueller Build aus dem Quellcode

```bash
git clone https://github.com/xfetch-cli/xfetch.git
cd xfetch
cargo build --release
cp target/release/xfetch ~/.local/bin/
```

### Arch Linux (AUR)

xfetch ist im AUR als `xfetch-git` verfugbar. Bauen und installieren Sie es mit makepkg oder Ihrem bevorzugten AUR-Helfer:

```bash
git clone https://aur.archlinux.org/xfetch-git.git
cd xfetch-git
makepkg -si
```

## Erster Start

Nach der Installation fuhren Sie einfach aus:

```bash
xfetch
```

Sie sollten Systeminformationen zusammen mit einem ASCII-Logo sehen, das dieser Struktur ahnelt:

```
__  __                               OS: Arch Linux x86_64
  \ \/ /                             Kernel: 6.6.87.2-arch1-1
   \  /                              Uptime: 2 hours, 15 mins
   /  \                              Packages: 657 (pacman)
  /_/\_\                             WM: Hyprland
 /____/linux                         Shell: zsh
---------BEGIN PUBLIC KEY----------   CPU: Intel(R) Core(TM) i5-7400 @ 3.00GHz (4)
...                                  GPU: NVIDIA GeForce RTX 3060
----------END PUBLIC KEY-----------   Memory: 3.10 GiB / 7.74 GiB (40%)
                                     Disk: 120.5 GiB / 256 GiB (47%) - ext4
                                     Battery: 85% [Charging]
```

## Befehlszeilen-Schnittstelle

### Globale Flags

| Flag | Beschreibung |
|------|-------------|
| `-c, --config <PFAD>` | Pfad zu einer benutzerdefinierten Konfigurationsdatei (JSONC-Format) |
| `--gen-config` | Standardkonfigurationsdatei am Standard-Konfigurationspfad generieren |
| `--clean-cache` | Die Cache-Datenbank leeren |
| `--benchmark` | Zeitinformationen fur parallele Proben anzeigen |

### Plugin-Unterbefehle

```
xfetch plugin install <name>      Ein Plugin installieren (lokaler Pfad oder aus Repository)
xfetch plugin list                Alle installierten Plugins auflisten
xfetch plugin remove <name>       Ein installiertes Plugin entfernen
```

### Nutzungsbeispiele

```bash
# Mit Standardkonfiguration ausfuhren
xfetch

# Mit einer benutzerdefinierten Konfiguration ausfuhren
xfetch --config ~/.config/xfetch/my-config.jsonc

# Eine Standardkonfiguration generieren
xfetch --gen-config

# Im Benchmark-Modus ausfuhren
xfetch --benchmark

# Zwischengespeicherte Daten loschen
xfetch --clean-cache

# Ein Plugin installieren
xfetch plugin install animate-logo

# Installierte Plugins auflisten
xfetch plugin list

# Ein Plugin entfernen
xfetch plugin remove docker
```

## Umgebungsvariablen

| Variable | Beschreibung |
|----------|-------------|
| `XFETCH_PLUGIN_REPO` | Die Standard-Plugin-Git-Repository-URL uberschreiben |
| `XFETCH_PLUGIN_DEV_DIR` | Den Suchpfad fur das Plugin-Entwicklungsverzeichnis uberschreiben |
| `CARGO_NET_GIT_FETCH_WITH_CLI` | Git CLI zum Abrufen verwenden (wird bei Plugin-Installation automatisch gesetzt) |

## Deinstallation

### Schnelldeinstallation

```bash
curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/uninstall.sh | bash
```

### Manuelle Deinstallation

```bash
rm ~/.local/bin/xfetch
rm -rf ~/.config/xfetch
```

Entfernen Sie anschlieend alle PATH-Anderungen aus Ihrer Shell-RC-Datei, falls der Installer sie hinzugefugt hat.
