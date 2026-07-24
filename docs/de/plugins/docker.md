# docker

Zeigt Docker-Container-Statistiken an.

- **Art:** `info_provider`
- **Binär:** `xfetch-plugin-docker`
- **Abhängigkeiten:** Docker-CLI (`docker` im PATH)

## Konfiguration

```jsonc
{
    "info_plugins": [{ "plugin": "docker" }],
    "modules": ["plugin:docker"]
}
```

## Argumente

Keine.

## Ausgabe

| Zustand | Ausgabe |
|---------|---------|
| Daemon läuft | ` Container: 15 gesamt`, `  ▶ 3 laufen`, `  ⏸ 1 pausiert`, `  ⏹ 11 gestoppt` |
| Daemon läuft nicht | ` Docker: Daemon läuft nicht` |
| CLI nicht gefunden | ` Docker: nicht gefunden` |
