# Konfigurationsgenerierung (`--gen-config`)

`xfetch --gen-config` erzeugt eine gebrauchsfertige Startkonfiguration. Wenn eine Internetverbindung verfügbar ist, wird zusätzlich das ASCII-Logo deines OS/der Distribution eingefügt.

## Grundlegende Verwendung

Konfiguration am Standardort generieren:

```bash
xfetch --gen-config
```

Anderen Ort angeben:

```bash
xfetch --gen-config --config ~/mein-setup/xfetch-config.jsonc
```

## Distro-Logo (`--logo`)

Standardmäßig enthält die generierte Konfiguration das ASCII-Logo des erkannten OS/der Distro, geladen aus dem Katalog [xfetch-cli/logos](https://github.com/xfetch-cli/logos).

### Automatische Erkennung

Linux liest `/etc/os-release` (`ID` + `ID_LIKE`); macOS und Windows mappen ihre Version (`macos-ventura`, `windows-11`, ...). Auflösungsreihenfolge: exakte `ID` → jeder `ID_LIKE`-Eintrag → generisches Logo der Kategorie.

Das Kunstwerk wird unter `<config_dir>/xfetch/logos/<id>.txt` gespeichert und die Konfiguration referenziert es über den Schlüssel `ascii`:

```jsonc
{
    "ascii": "/home/user/.config/xfetch/logos/ubuntu.txt",
    "layout": "pacman"
}
```

### Ein Logo erzwingen

Jede Katalog-ID oder jedes Alias funktioniert, auch von anderen Betriebssystemen:

```bash
# Ubuntu-Maschine, Arch-Logo
xfetch --gen-config --logo arch

# Bestimmtes OS/Version-Logo erzwingen
xfetch --gen-config --logo windows-11
xfetch --gen-config --logo macos-ventura
```

### Fallbacks

- **Unbekannte ID:** Warnung und generisches Logo der aktuellen Kategorie (`default.txt`)
- **Kein Netzwerk / Katalogfehler:** das Template wird ohne Logo geschrieben; die automatische Erkennung fällt still zurück, ein explizites `--logo` zeigt eine Warnung
- **Offline-Cache:** nach dem Download bleibt das Logo auf der Platte und wird ohne Internet wiederverwendet

Die Basis-URL des Katalogs kann für Forks überschrieben werden:

```bash
XFETCH_LOGOS_URL=https://raw.githubusercontent.com/<user>/logos/main xfetch --gen-config
```

## Layout (`--layout`)

Das Template enthält standardmäßig das `section`-Layout (Gruppen Hardware/Software/Session). Mit `--layout` erzeugst du eines der integrierten Layouts:

```bash
xfetch --gen-config --layout pacman
xfetch --gen-config --layout tree
xfetch --gen-config --layout compact
```

Verfügbare Namen: `default`, `side-block`, `tree`, `section`, `section-box`, `custom-x`, `compact`, `minimal`, `pacman`, `box`, `line`, `dots`, `bottom_line`, `horizontal`, `bottom`. Ein unbekannter Name zeigt eine Warnung und behält `section`.

## Kombiniertes Beispiel

```bash
xfetch --gen-config --layout tree --logo arch --config ~/configs/arch-tree.jsonc
```

Die Flags `--logo` und `--layout` gelten nur für `--gen-config`; das Laufzeitverhalten bleibt unverändert.
