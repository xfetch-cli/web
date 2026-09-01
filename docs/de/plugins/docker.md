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
| Daemon läuft | ` Containers: 15 total`, `  ▶ 3 running`, `  ⏸ 1 paused`, `  ⏹ 11 stopped` |
| Daemon läuft nicht | ` Docker: daemon not running` |
| CLI nicht gefunden | ` Docker: not found` |
