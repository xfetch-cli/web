# banner

Gibt ein kurzes chinesisch/japanisches Sprichwort-Banner unter oder über dem ASCII-Logo aus, ohne die Logo-Datei zu verändern.

- **Art:** `logo_animation`
- **Binary:** `xfetch-plugin-banner`
- **Abhängigkeiten:** keine
- **Terminal:** benötigt eine CJK-fähige Schrift und ein TTY

## Installation

```bash
xfetch plugin install banner
```

## Konfiguration

```jsonc
{
    "logo_animation": {
        "plugin": "banner",
        "style": "banner",
        "timeout_secs": 3
    }
}
```

## Stile

| `style` | Verhalten |
|---------|-----------|
| `banner` | Zufälliges Sprichwort, unter dem Logo |
| `banner-above` | Zufälliges Sprichwort, über dem Logo |
| `banner-static` | Immer das erste Sprichwort, darunter |
| `banner-N` | Das N-te Sprichwort (1-basiert), darunter |

Setze `frames_path` auf eine Textdatei, um deren ersten `===`-getrennten Frame als Bannertext statt der eingebauten Liste zu verwenden.

## Ausrichtung

Das Banner wird an der Logo-Breite zentriert und nutzt die sichtbare Terminalbreite, sodass ANSI-Farbcodes ignoriert werden. Längere Banner werden auf die Logo-Breite umgebrochen, statt den Logo-Block zu verbreitern, damit Box-Layouts ausgerichtet bleiben.

## Sprichwortliste

Eine Mischung aus chinesischen und japanischen Sprüchen wie `千里之行，始于足下`, `七転び八起き` und `一期一会`. Das Plugin wählt pro Lauf eines aus.

## Plattform

Natives Plugin für Linux, macOS und Windows. Das Banner wird übersprungen, wenn xfetch ein Bildlogo rendert; nutze `banner-text` für Bildunterschriften, die auch bei Bildlogos erscheinen sollen.
