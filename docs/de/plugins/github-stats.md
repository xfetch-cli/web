# github-stats

Ruft GitHub-Benutzerprofilstatistiken ab.

- **Art:** `info_provider`
- **Binär:** `xfetch-plugin-github-stats`
- **Abhängigkeiten:** `curl` im PATH
- **API-Aufrufe:** 4 Anfragen an api.github.com

## Konfiguration

```jsonc
{
    "info_plugins": [{
        "plugin": "github-stats",
        "args": {
            "username": "xscriptor",
            "token": "ghp_your_token_here",
            "max_lines": 3
        }
    }],
    "modules": ["plugin:github-stats"]
}
```

## Argumente

| Feld | Erforderlich | Standard | Beschreibung |
|------|-------------|----------|-------------|
| `username` | Ja (oder Umgebungsvariable `GITHUB_USER`) | — | GitHub-Benutzername |
| `token` | Nein | — | Persönlicher Zugriffstoken (5000 Anfragen/h vs. 60 Anfragen/h ohne Authentifizierung) |
| `max_lines` | Nein | alle 7 | Ausgabe auf die ersten N Zeilen begrenzen (1–7) |

## Ausgabe

| # | Zeile |
|---|-------|
| 1 | ` Name (@username)` |
| 2 | ` N Sterne` |
| 3 | ` N Repos` |
| 4 | ` N PRs` |
| 5 | ` N Issues` |
| 6 | ` N Follower` |
| 7 | ` N folgt` |
