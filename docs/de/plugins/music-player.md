# music-player

Zeigt die aktuelle Musikwiedergabe von MPD und/oder Spotify an.

- **Art:** `info_provider`
- **Binär:** `xfetch-plugin-music-player`
- **Abhängigkeiten:** `mpc` (MPD), `playerctl` (Spotify)

## Konfiguration

```jsonc
{
    "info_plugins": [{ "plugin": "music-player" }],
    "modules": ["plugin:music-player"]
}
```

## Argumente

Keine.

## Plattform

Nur Linux und macOS; unter Windows meldet es `Music: no active player`.

## Ausgabe

| Zustand | Ausgabe |
|---------|---------|
| MPD spielt | ` MPD: Song Title - Artist` / `  ▶ playing` |
| Spotify spielt | ` Spotify: Artist - Song Title` |
| Spotify pausiert | ` Spotify: paused` |
| Beide aktiv | ` Music Players:` / `   MPD: ...` / `   Spotify: ...` |
| Kein Player | ` Music: no active player` |
