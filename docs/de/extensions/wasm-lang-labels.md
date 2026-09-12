# wasm-lang-labels

Uebersetzt Modul-Labels anhand der Systemsprache (Python-Komponente).

- **Art:** `config_provider`
- **Artefakt:** `wasm-lang-labels.wasm` (component)
- **Faehigkeiten:** `env: LANG, LC_ALL, LC_MESSAGES`
- **Sprache:** Python (componentize-py)

## Installation

```bash
xfetch extension install ./extensions/wasm-lang-labels
```

## Konfiguration

```jsonc
{
    "config_providers": [
        {
            "extension": "wasm-lang-labels",
            "args": {}
        }
    ]
}
```

## Argumente

| Feld | Typ | Standard | Beschreibung |
|-------|------|---------|-------------|
| `language` | string | from `LANG` | Ueberschreibt die Erkennung; `es`, `en` und `de` enthalten. |

## Verhalten

Fuellt die `labels`-Map fuer bekannte Module, ohne eigene Labels zu ueberschreiben, auch absichtlich versteckte.
