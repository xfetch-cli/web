# animate-logo

Animiert ASCII-Logos mit verschiedenen Farbeffekten.

- **Art:** `logo_animation`
- **Binär:** `xfetch-plugin-animate-logo`
- **Abhängigkeiten:** Keine (reines Rust)

## Konfiguration

```jsonc
{
    "logo_animation": {
        "plugin": "animate-logo",
        "fps": 12,
        "duration_ms": 1200,
        "loop": false,
        "style": "sweep"
    }
}
```

## Argumente

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `fps` | number | `12` | Bilder pro Sekunde (begrenzt auf 1–60) |
| `duration_ms` | number | `1200` | Gesamtanimationsdauer in ms |
| `loop` | bool | `false` | Animation wiederholen (derzeit ungenutzt) |
| `style` | string | `"sweep"` | Animationsstil (siehe unten) |
| `frames_path` | string oder string[] | — | Pfad(e) zu Framedateien (erforderlich für Stil `frame`) |

## Stile

| Stil | Beschreibung |
|------|-------------|
| `sweep` | Farben verlaufen von links nach rechts über Zeichen (6-Farben-ANSI-Palette) |
| `wave` | Sinuswellen-Farbmuster über das Logo |
| `rainbow` | Vollständiger RGB-Farbverlauf, der sich über die Zeit verschiebt (24-Bit-Farbe) |
| `sparkle` | Zufällige Zeichen leuchten in hellen Farben auf |
| `breathing` | Alle Zeichen blenden in warmen Bernsteintönen ein und aus |
| `frame` | Wechselt durch vorgeladene ASCII-Framereihen |
| `none` | Keine Einfärbung, Logo wird unverändert angezeigt |
