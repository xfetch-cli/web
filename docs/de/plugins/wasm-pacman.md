# wasm-pacman

Repository- und AUR-Paketzahlen aus der lokalen pacman-Datenbank, in Go.

- **Art:** `info_provider`
- **Artefakt:** `wasm-pacman.wasm` (core module)
- **Faehigkeiten:** `exec: pacman`
- **Sprache:** Go (wasip1)

## Installation

```bash
xfetch plugin install ./plugins/wasm-pacman
```

Der Installer baut den Gast bei Bedarf ueber sein Manifest.

## Konfiguration

```jsonc
{
    "info_plugins": [{ "plugin": "wasm-pacman", "args": { "samples": 3 } }],
    "modules": ["plugin:wasm-pacman"]
}
```

## Argumente

| Feld | Typ | Standard | Beschreibung |
|-------|------|---------|-------------|
| `samples` | number | `3` | Fremd-Paketnamen als Beispiellinie. |

## Ausgabe

```
packages: 1084 installed (1066 repo, 18 AUR/foreign)
foreign: android-sdk-cmdline-tools-latest, ...
```

## Hinweise

Das Manifest erlaubt nur das Programm `pacman`; keine Shell. Nur Arch-basierte Distributionen.
