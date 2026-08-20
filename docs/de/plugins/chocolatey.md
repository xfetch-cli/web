# chocolatey

Zählt die über Chocolatey installierten Pakete (Windows-Paketmanager).

- **Art:** `info_provider`
- **Binär:** `xfetch-plugin-chocolatey`
- **Abhängigkeiten:** `choco`-CLI (nur Windows)

## Installation

```bash
xfetch plugin install chocolatey
```

## Konfiguration

```jsonc
{
    "info_plugins": [{ "plugin": "chocolatey" }],
    "modules": ["plugin:chocolatey"]
}
```

## Argumente

Keine.

## Plattform

Nur Windows. Chocolatey ist ein Windows-Paketmanager; auf Linux und macOS antwortet das Plugin mit `Chocolatey: not installed`.

## Ausgabe

| Zustand | Ausgabe |
|---------|---------|
| Pakete installiert | ` 20 (chocolatey)` |
| Choco nicht installiert | `Chocolatey: not installed` |
| Keine Pakete | `Chocolatey: no packages installed` |

## Einschränkungen

- Chocolatey 2.4+ hat `--local-only` entfernt; `-r` (`--limit-output`) funktioniert in allen Versionen.
- Das Plugin läuft mit einem `with_timeout`-Budget von 10 s aus der Plugin-API — ein langsamer erster Lauf antwortet mit `Chocolatey: timed out`, statt xfetch hängen zu lassen.
