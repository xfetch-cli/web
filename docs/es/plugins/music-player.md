# music-player

Muestra la música reproduciéndose actualmente desde MPD y/o Spotify.

- **Tipo:** `info_provider`
- **Binario:** `xfetch-plugin-music-player`
- **Dependencias:** `mpc` (MPD), `playerctl` (Spotify)

## Configuración

```jsonc
{
    "info_plugins": [{ "plugin": "music-player" }],
    "modules": ["plugin:music-player"]
}
```

## Argumentos

Ninguno.

## Plataforma

Solo Linux y macOS; en Windows responde `Music: no active player`.

## Salida

| Estado | Salida |
|--------|--------|
| MPD reproduciendo | ` MPD: Song Title - Artist` / `  ▶ playing` |
| Spotify reproduciendo | ` Spotify: Artist - Song Title` |
| Spotify pausado | ` Spotify: paused` |
| Ambos activos | ` Music Players:` / `   MPD: ...` / `   Spotify: ...` |
| Sin reproductor | ` Music: no active player` |
