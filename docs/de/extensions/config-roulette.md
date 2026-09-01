# Config Roulette

Wählt eine zufällige (oder tägliche) Konfiguration aus einer Liste von Pfaden aus und lädt sie. Jeder xfetch-Aufruf kann ein völlig anderes Erscheinungsbild zeigen — anderes Layout, Logo, Theme, Farben, Module und Icons.

## Installation

```bash
cp target/release/xfetch-extension-config-roulette ~/.config/xfetch/extensions/
```

Oder via CLI:

```bash
xfetch extension install ./path/to/xfetch-extension-config-roulette
```

## Konfiguration

### 1. Routen-Datei erstellen

```json
[
    { "_name": "default-full",   "path": "~/.config/xfetch/fetchs/001-layout-default/config.jsonc" },
    { "_name": "tree-view",      "path": "~/.config/xfetch/fetchs/004-layout-tree/config.jsonc" },
    { "_name": "pacman-classic",  "path": "~/.config/xfetch/fetchs/008-layout-pacman/config.jsonc" }
]
```

Jede Route verweist auf eine vollständige xfetch-Konfigurationsdatei. Das Feld `_name` ist optional und dient nur der Lesbarkeit.

### 2. In Ihre xfetch-Konfiguration einfügen

```jsonc
{
    "config_providers": [
        {
            "extension": "config-roulette",
            "args": {
                "routes": "~/.config/xfetch/routes.json",
                "strategy": "random"
            }
        }
    ]
}
```

## Argumente

| Feld | Typ | Standard | Beschreibung |
|-------|------|---------|-------------|
| `routes` | `string` | `~/.config/xfetch/routes.json` | Pfad zur JSON-Routen-Datei |
| `strategy` | `"random"` oder `"daily"` | `"daily"` | Auswahlstrategie |

## Strategien

- **`random`** — wählt bei jeder Ausführung eine andere Konfiguration (verwendet einen Subsekunden-Timer als Seed)
- **`daily`** — wählt den ganzen Tag dieselbe Konfiguration und wechselt am nächsten Tag (verwendet das Unix-Datum als Seed)

## Anwendungsfälle

- Jedes Mal ein anderes visuelles Erscheinungsbild beim Öffnen eines Terminals
- Alle Konfigurationen automatisch testen, ohne sie manuell auszuführen
- Tägliche Themes — den ganzen Tag dasselbe Aussehen, morgen ein neues
- Durch 300+ Konfigurationen aus der Testsuite rotieren
