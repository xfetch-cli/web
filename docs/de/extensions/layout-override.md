# Layout Override

Erzwingt ein bestimmtes Layout und/oder einen Modulsatz beim Laden der Konfiguration, unabhängig davon, was die Konfigurations- oder Theme-Datei vorgibt. Wird nach der Theme-Zusammenführung (Theme Merge), aber vor dem Rendering ausgeführt.

## Installation

```bash
cp xfetch-extension-layout-override ~/.config/xfetch/extensions/
```

Oder via CLI:

```bash
xfetch extension install ./path/to/xfetch-extension-layout-override
```

## Konfiguration

```jsonc
{
    "layout": "pacman",
    "modules": ["os", "kernel", "uptime"],
    "config_providers": [
        {
            "extension": "layout-override",
            "args": {
                "layout": "tree",
                "modules": ["os", "kernel", "uptime", "packages", "shell", "cpu", "memory", "palette"]
            }
        }
    ]
}
```

In diesem Beispiel setzt die Konfiguration `layout: "pacman"`, aber die Erweiterung überschreibt es vor dem Rendering mit `"tree"`.

## Argumente

| Feld | Typ | Standard | Beschreibung |
|-------|------|---------|-------------|
| `layout` | `string` | — | Zu erzwingendes Layout (`default`, `tree`, `pacman`, `compact`, `box`, `section`, etc.) |
| `modules` | `string[]` | — | Zu ersetzende Modulliste |

Wenn ein Feld weggelassen wird, bleibt der ursprüngliche Wert aus der Konfiguration erhalten.

## Anwendungsfälle

- Ein bestimmtes Layout erzwingen, wenn ein Theme verwendet wird, das keines vorgibt
- Module vorübergehend überschreiben, ohne die Konfigurationsdatei zu bearbeiten
- Mit config-roulette verketten — eine Erweiterung randomisiert, eine andere normalisiert das Layout
