# music-player

Displays currently playing music from MPD and/or Spotify.

- **Kind:** `info_provider`
- **Binary:** `xfetch-plugin-music-player`
- **Dependencies:** `mpc` (MPD), `playerctl` (Spotify)

## Configuration

```jsonc
{
    "info_plugins": [{ "plugin": "music-player" }],
    "modules": ["plugin:music-player"]
}
```

## Arguments

None.

## Output

| State | Output |
|-------|--------|
| MPD playing | ` MPD: Song - Artist` / `  ▶ playing` |
| Spotify playing | ` Spotify: Artist - Song` |
| Spotify paused | ` Spotify: paused` |
| Both active | ` Music Players:` / `   MPD: ...` / `   Spotify: ...` |
| No player | ` Music: no active player` |
