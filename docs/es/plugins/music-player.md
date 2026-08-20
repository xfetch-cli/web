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
| MPD reproduciendo | ` MPD: Canción - Artista` / `  ▶ reproduciendo` |
| Spotify reproduciendo | ` Spotify: Artista - Canción` |
| Spotify pausado | ` Spotify: pausado` |
| Ambos activos | ` Reproductores de Música:` / `   MPD: ...` / `   Spotify: ...` |
| Sin reproductor | ` Música: sin reproductor activo` |
