# langs

Zeigt die Sprachen eines GitHub-Repositories (oder aggregiert über einen User/Org) mit einem Nerd-Font-Glyph pro Sprache und optional deren Markenfarbe.

- **Art:** `info_provider`
- **Binary:** `xfetch-plugin-langs`
- **Abhängigkeiten:** GitHub-API-Zugriff; ein Token wird empfohlen

## Installation

```bash
xfetch plugin install langs
```

## Konfiguration

Ein einzelnes Repository:

```jsonc
{
    "info_plugins": [
        { "plugin": "langs", "args": { "repo": "xfetch-cli/xfetch" } }
    ],
    "modules": ["plugin:langs"]
}
```

Oder die Primärsprache aller Repositories eines Users/Orgs aggregieren:

```jsonc
{
    "info_plugins": [
        { "plugin": "langs", "args": { "owner": "xfetch-cli", "limit": 4 } }
    ],
    "modules": ["plugin:langs"]
}
```

## Argumente

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|--------------|
| `repo` | string | keins | Repository als `owner/name` oder vollständige GitHub-URL; zeigt die exakte Byte-Aufteilung |
| `owner` | string | keins | User oder Org; aggregiert die Primärsprache der Repositories |
| `limit` | number | `5` | Wie viele Sprachen angezeigt werden |
| `color` | boolean | `true` | Färbt jede Sprache in ihrer Markenfarbe (Truecolor-ANSI) |
| `include_forks` | boolean | `false` | Bezieht Forks bei der `owner`-Aggregation ein |
| `info` | boolean | `true` | Gibt Repository-/Owner-Metadaten aus |
| `token` | string | keins | GitHub-Token; wird auch aus `GITHUB_TOKEN` oder `GH_TOKEN` gelesen |

## Ausgabe

```
 Rust 96.4%
 Python 2.1%
 Shell 1.1%

 Rust ×12 (60%)
 Python ×3 (15%)
 Shell ×2 (10%)
```

Der Repository-Modus gibt zuerst Metadaten aus: Beschreibung, Stars, Forks, offene Issues, Lizenz, Größe, Branch, Aktualisierung, Topics und Homepage, plus `Archived`/`Private` falls gesetzt.

Ohne Token erlaubt GitHub 60 Requests/Stunde und jeder Lauf macht 2 Aufrufe; setze `GITHUB_TOKEN`/`GH_TOKEN` für regelmäßige Nutzung. Wenn ein Layout Breiten misst und die Färbung die Ausrichtung verschiebt, setze `"color": false`.
