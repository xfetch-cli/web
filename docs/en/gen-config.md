# Config Generation (`--gen-config`)

`xfetch --gen-config` generates a ready-to-use starter config file. When network is available it also attaches the ASCII logo of your OS/distro.

## Basic Usage

Generate the config at the default location:

```bash
xfetch --gen-config
```

Generate it somewhere else:

```bash
xfetch --gen-config --config ~/my-setup/xfetch-config.jsonc
```

## Distro Logo (`--logo`)

By default the generated config includes the ASCII logo of the detected OS/distro, fetched from the [xfetch-cli/logos](https://github.com/xfetch-cli/logos) catalog.

### Automatic Detection

Linux reads `/etc/os-release` (`ID` + `ID_LIKE`); macOS and Windows map their version (`macos-ventura`, `windows-11`, ...). Resolution order: exact `ID` → each `ID_LIKE` token → generic logo of the category.

The art is stored at `<config_dir>/xfetch/logos/<id>.txt` and the config references it via the `ascii` key:

```jsonc
{
    "ascii": "/home/user/.config/xfetch/logos/ubuntu.txt",
    "layout": "pacman"
}
```

### Forcing a Logo

Any catalog id or alias works, including logos of other OSes:

```bash
# Ubuntu machine, Arch logo
xfetch --gen-config --logo arch

# Force a specific OS/version logo
xfetch --gen-config --logo windows-11
xfetch --gen-config --logo macos-ventura
```

### Fallbacks

- **Unknown id:** warns and uses the generic logo of the current category (`default.txt`)
- **No network / catalog error:** the template is written without a logo; automatic detection falls back silently, an explicit `--logo` prints a warning
- **Offline cache:** once downloaded, the logo stays on disk and is reused without internet

The catalog base URL can be overridden to test forks:

```bash
XFETCH_LOGOS_URL=https://raw.githubusercontent.com/<user>/logos/main xfetch --gen-config
```

## Layout (`--layout`)

The template ships with the `pacman` layout. Use `--layout` to generate it with any of the built-in layouts:

```bash
xfetch --gen-config --layout section
xfetch --gen-config --layout tree
xfetch --gen-config --layout compact
```

Available names: `default`, `side-block`, `tree`, `section`, `section-box`, `custom-x`, `compact`, `minimal`, `pacman`, `box`, `line`, `dots`, `bottom_line`, `horizontal`, `bottom`. An unknown name warns and keeps `pacman`.

## Combined Example

```bash
xfetch --gen-config --layout tree --logo arch --config ~/configs/arch-tree.jsonc
```

The `--logo` and `--layout` flags only apply to `--gen-config`; runtime behavior is untouched.
