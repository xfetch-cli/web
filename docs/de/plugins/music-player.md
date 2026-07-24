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

## Ausgabe

| Zustand | Ausgabe |
|---------|---------|
| MPD spielt | ` MPD: Song - Künstler` / `  ▶ spielt` |
| Spotify spielt | ` Spotify: Künstler - Song` |
| Spotify pausiert | ` Spotify: pausiert` |
| Beide aktiv | ` Musik-Player:` / `   MPD: ...` / `   Spotify: ...` |
| Kein Player | ` Musik: kein aktiver Player` |
