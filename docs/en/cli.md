# CLI Reference

This page is the reference for the xfetch command line: global options, output modes, runtime overrides, every subcommand, configuration management, diagnostics, exit codes and environment variables. The full generated help is always available with `xfetch --help` and `xfetch <command> --help`.

## Synopsis

```bash
xfetch [OPTIONS] [COMMAND]
```

With no command, xfetch renders the fetch. Global options may appear before or after the subcommand. Invalid combinations exit with code `2`.

## Global Options

| Option | Description |
|--------|-------------|
| `-c, --config <PATH>` | Use a custom config file |
| `--gen-config` | Generate a starter config |
| `--logo <NAME>` | Logo for the generated config (only with `--gen-config`) |
| `--layout <NAME>` | Override the layout at runtime; with `--gen-config`, choose the generated layout |
| `--theme <NAME>` | Override the theme at runtime |
| `--list-layouts` | Print every accepted layout name |
| `--list-modules` | Print every accepted module key |
| `--json` | Emit machine-readable JSON |
| `--get <KEY>` | Print only the requested keys; repeat the flag or use commas |
| `--modules <LIST>` / `--only <LIST>` | Override the rendered module list |
| `--color <MODE>` | `auto`, `always` or `never` |
| `--no-color` | Same as `--color never` |
| `--offline` | Disable network access (public IP, catalogs, updates, remote addon installs) |
| `--no-cache` | Bypass the package and public-IP cache for this run |
| `--quiet` | Suppress informational output |
| `--verbose` | Extra diagnostics on stderr (same as `--log-level debug`) |
| `--log-level <LEVEL>` | `off`, `error`, `warn`, `info`, `debug` or `trace` |
| `--log-json` | JSON log lines on stderr |
| `--template <FILE>` | Render the fetch with a template file |
| `--format <STRING>` | Render the fetch with an inline template |
| `--backup` / `--restore` | Back up or restore the config in use |
| `--benchmark` | Print info collection timings |
| `--clean-cache` | Clear the package and public-IP cache |
| `--daemon` / `--daemon-stop` | Start or stop the animated logo daemon |
| `--no-daemon-live` / `--daemon-live-stop` / `--daemon-live-reload` | Control the live stats daemon |
| `-h, --help`, `-V, --version` | Help and version |

## Output Modes

### Normal render

```bash
xfetch
xfetch --layout right
xfetch --modules os,kernel,cpu,memory
xfetch --config ~/.config/xfetch/config.jsonc
```

### JSON

```bash
xfetch --json
xfetch --json --benchmark
xfetch --json --modules os,kernel,cpu
```

`--json` prints one object with `schema_version: 1` and never prints ANSI escapes. `--benchmark` adds a `benchmark` array. `--list-layouts`, `--list-modules`, `modules`, `theme list`, `addon list`, `doctor` and `update --check` also accept `--json`.

### Specific values

```bash
xfetch --get os
xfetch --get os,cpu,memory
xfetch --get version,name
xfetch --json --get os,cpu
```

A single key prints the raw value; multiple keys print `key=value` lines. With `--json` the output is `{ "schema_version": 1, "values": { ... } }`. Supported keys are the module keys from `--list-modules`, plus `version`, `name`, `packages:<manager>` and `plugin:<name>`. Unknown keys exit with code `7`.

### Templates

```bash
xfetch --format 'os={{os}} kernel={{kernel}}'
xfetch --template ~/.config/xfetch/my.tmpl
```

Templates support `{{key}}`, the filters `upper`, `lower`, `trim`, `count`, `join:" / "` and `default:"..."`, plus `{{#if}}`, `{{#unless}}` and `{{#each}}` blocks. Placeholders cover every module key, `packages:<manager>`, `plugin:<name>`, `palette`, `header`, `sep`, `name` and `version`. `--get`, `--template` and `--format` only apply to the default fetch and cannot be combined with a subcommand or daemon mode.

### Runtime overrides

Precedence, highest to lowest:

1. CLI overrides (`--layout`, `--modules`, `--no-color`, `--offline`, `--no-cache`)
2. Config providers (extensions)
3. Theme
4. Config file
5. Built-in defaults

## Commands

| Command | Purpose |
|---------|---------|
| `plugin` / `plugins` | Manage plugins |
| `effects` / `effect` | Manage intro effects |
| `extension` / `extensions` | Manage config providers |
| `addon <kind> <action>` | Unified addon command (`plugin`, `effect`, `extension`, `command`) |
| `command` / `commands` | Manage CLI command addons |
| `run <name> [--] <args>` | Run a command addon; `--render` uses the core layout |
| `theme` | Search, install, update, list, set, remove or export themes |
| `logo` | List and preview logos from the ASCII catalog |
| `wasm` | Inspect, run or export WIT for WebAssembly guests |
| `doctor` | Diagnose install, config, terminal and addons (`--fix`, `--bench`, `--image`, `--network`) |
| `modules` | List module keys |
| `config` | Validate, print, get, set, unset, reset, edit, back up or restore |
| `completions <shell>` | Generate bash/zsh/fish/elvish/PowerShell completions |
| `man` | Render the man page |
| `schema` | Print JSON Schemas for machine-readable outputs |
| `paths` / `env` / `build-info` | Diagnostics for paths, environment and build |
| `update` | Check, install or roll back releases |
| `self-uninstall` | Remove the binary and optionally config, cache and data |

## Addon Management

`plugin`, `effects`, `extension` and `command` share the same actions. The unified form is equivalent:

```bash
xfetch plugin install banner
xfetch effects install decrypt
xfetch extension install config-roulette
xfetch command install github
xfetch addon plugin install banner
xfetch addon effect install decrypt
xfetch addon extension install config-roulette
xfetch addon command install github
```

| Action | Usage | Notes |
|--------|-------|-------|
| `install` | `install [PATH] [--repo <URL>] [--sha256 <HEX>] [--name <NAME>] [--manifest <FILE>] [--all] [--force]` | Catalog name, local directory, repository, wasm file or URL |
| `update` | `update [NAME] [--all] [--check] [--force]` | Rebuild native addons from the recorded source; keep `.bak` for rollback |
| `rollback` | `rollback <NAME>` | Restore the previous artifact and receipt |
| `list` | `list [--verbose]` | Installed addons; `--verbose` adds capabilities and limits |
| `info` | `info <NAME>` | Metadata, capabilities, limits and config snippet |
| `search` | `search [QUERY]` (alias `available`) | Search the catalog |
| `remove` | `remove <NAME>` | Remove the artifact and receipt |

Every install writes an `.install.json` receipt beside the addon with the installed version, source, repository, path, catalog reference, SDK version and artifact SHA-256. Catalogs may also declare `repo`, `ref`, `sdk_version` and `min_xfetch_version`. `install --all` installs every catalog entry, skipping installed addons unless `--force` is used.

## Command Addons

```bash
xfetch command install github
xfetch run github -- rust-lang/rust
xfetch --json run github -- rust-lang/rust
xfetch --layout right run github --render -- rust-lang/rust
```

Command addons return plain text, one field per line. `--render` passes the lines through the configured layout and logo. `--json` wraps the output as `{schema_version, command, args, lines}`. The catalog lives in `xfetch-cli/commands`; `XFETCH_COMMAND_INDEX`, `XFETCH_COMMAND_REPO` and `XFETCH_COMMAND_DEV_DIR` override the defaults.

## Themes and Logos

```bash
xfetch theme search dark
xfetch theme info nord
xfetch theme install nord
xfetch theme install nord --force
xfetch theme update nord --check
xfetch theme update nord --force
xfetch theme update --all
xfetch theme list
xfetch theme set dracula
xfetch theme remove dracula
xfetch theme export my-theme
xfetch logo list
xfetch logo list arch
xfetch logo preview arch
```

The theme registry is `xfetch-cli/themes` (`XFETCH_THEME_INDEX` overrides it). The logo catalog is `xfetch-cli/logos` (`XFETCH_LOGOS_URL` overrides it). Both are blocked by `--offline`.

## Config Management

```bash
xfetch config validate
xfetch config print
xfetch config print --raw
xfetch config get layout
xfetch config get colors.cpu
xfetch config set layout right
xfetch config set modules.1 kernel
xfetch config unset colors.cpu
xfetch config reset --yes
xfetch config edit
xfetch config backups
xfetch config prune --keep 5
xfetch config prune --keep 5 --dry-run
```

`set` and `unset` support dotted keys and array indices, preserve surrounding comments where possible and validate the result before writing. `edit` uses `$VISUAL` or `$EDITOR` after a safety backup.

## Backup and Restore

```bash
xfetch --backup
xfetch --restore
xfetch config backup --output ~/backups
xfetch config backup --with-addons --compress
xfetch config backup --encrypt --passphrase-file ~/.config/xfetch/backup.pass
xfetch config restore --from ~/backups --dry-run
xfetch config restore --from ~/backups --passphrase-file ~/.config/xfetch/backup.pass
xfetch config restore --root ~/restored
```

Backups include the config, active themes, config-roulette routes, referenced logo assets and, with `--with-addons`, addon artifacts and receipts. `--compress` writes gzip; `--encrypt` uses Argon2id and XChaCha20-Poly1305. Restore writes a `pre-restore-*` safety backup and validates the restored config. On Unix backups are written with mode `0600`.

## Doctor

```bash
xfetch doctor
xfetch doctor --json
xfetch doctor --network
xfetch doctor --fix
xfetch doctor --bench
xfetch doctor --image
```

`doctor` checks the binary, config, theme, layout, terminal size, image protocol, addon directories, install receipts and cache. `--fix` generates a missing config and removes an invalid cache file. It exits `1` when any check fails.

## WebAssembly

```bash
xfetch wasm inspect ./plugin.wasm
xfetch wasm run ./plugin.wasm --request '{"version":1,"kind":"info_provider"}'
xfetch wasm run ./plugin.wasm --request-file request.json --timeout 5 --kind plugin
xfetch wasm wit
```

`wasm inspect` prints the resolved kind, manifest, capabilities and limits without executing the guest. `wasm run` executes a guest with a raw JSON request (or `--request-file`) and prints its response; `--timeout` overrides the manifest timeout and `--kind` selects the component world (`plugin`, `effect`, `extension` or `command`). `wasm wit` prints the WIT package for component guests.

## Diagnostics and Utilities

```bash
xfetch modules
xfetch modules --json
xfetch paths
xfetch env
xfetch build-info
xfetch schema fetch
xfetch schema all
xfetch self-uninstall
xfetch self-uninstall --purge --yes
```

`modules` lists the accepted module keys; with `--json` it returns objects with `key`, `description` and `platforms`. `paths` prints the resolved config, addon, cache and data paths; `env` prints platform, terminal, environment and runtime settings; `build-info` prints the build version and enabled features. `schema [fetch|backup|addon|update|doctor|config|all]` prints the JSON Schema for the machine-readable outputs. `self-uninstall` removes the binary; `--purge` also removes config, cache and data, and `--yes` skips the confirmation.

## Shell Integration

```bash
xfetch completions bash > ~/.local/share/bash-completion/completions/xfetch
xfetch completions zsh > ~/.zfunc/_xfetch
xfetch completions fish > ~/.config/fish/completions/xfetch.fish
xfetch completions elvish > xfetch.elv
xfetch completions powershell > xfetch.ps1
xfetch man --output ~/.local/share/man/man1/xfetch.1
```

## Update

```bash
xfetch update --check
xfetch update --check --json
xfetch update
xfetch update --yes
xfetch update --prebuilt --bin-dir ~/.local/bin
xfetch update --rollback
```

Prebuilt installs download the release asset, verify `SHA256SUMS` and keep a `xfetch.bak`. `cargo install` is updated through Cargo; Homebrew, winget and AUR are delegated to their package manager.

## Exit Codes

| Code | Meaning |
|------|---------|
| `0` | Success |
| `1` | Generic failure, doctor failure or `update --check` finding a newer release |
| `2` | Usage error: invalid flag, invalid combination or parse error |
| `3` | Configuration error |
| `4` | Network error or a request blocked by `--offline` |
| `5` | Addon error |
| `6` | Update error |
| `7` | Not found: unknown module, config key or addon |

## Logging

```bash
xfetch --log-level debug
xfetch --log-level trace --verbose
xfetch --log-json --log-level debug
xfetch --log-level warn --quiet
```

`--quiet` maps to `warn`, `--verbose` maps to `debug`, and an explicit `--log-level` wins. `--log-json` writes `{"level","target","message"}` lines to stderr so stdout stays clean for command results and `--json`.

## Environment Variables

| Variable | Effect |
|----------|--------|
| `XFETCH_PLUGIN_REPO`, `XFETCH_EFFECT_REPO`, `XFETCH_EXTENSION_REPO`, `XFETCH_COMMAND_REPO` | Default install repositories |
| `XFETCH_PLUGIN_INDEX`, `XFETCH_EFFECT_INDEX`, `XFETCH_EXTENSION_INDEX`, `XFETCH_COMMAND_INDEX` | Catalog URLs or local paths |
| `XFETCH_THEME_INDEX`, `XFETCH_LOGOS_URL` | Theme registry and logo catalog overrides |
| `XFETCH_BACKUP_PASSPHRASE` | Passphrase for encrypted config backups |
| `VISUAL`, `EDITOR` | Editor used by `xfetch config edit` |
| `XDG_CONFIG_HOME`, `XDG_CACHE_HOME`, `XDG_STATE_HOME` | Config, cache and state roots |
| `XFETCH_WASM_LOG_LEVEL` | Wasm guest log threshold (`off`..`debug`) |
| `XFETCH_UPDATE_API` | GitHub API endpoint used by `xfetch update` |
| `GH_TOKEN` / `GITHUB_TOKEN` | GitHub token for update rate limits |
| `XFETCH_PLUGIN_DEV_DIR`, `XFETCH_COMMAND_DEV_DIR` | Extra development directories for addon lookup |
| `XPM_AUR_STATE` | Override the xpm-aur state file used for package counts |
| `KITTY_WINDOW_ID` | Enables the Kitty graphics protocol when set |
| `TERM_PROGRAM`, `LC_TERMINAL` | Select iTerm-compatible inline images when supported |

## Security Notes

- Native addons run unsandboxed with your user privileges.
- Wasm addons use a deny-by-default manifest policy with time, memory, output, host-call and capability limits.
- `--sha256` on install is the provenance pin and overrides the manifest digest.
- `--offline` blocks xfetch network calls, but native addons can still make their own requests.
- Backups may contain secrets from your configuration; store encrypted backups and passphrase files securely.

## Related Documents

- [Getting Started](getting-started.md)
- [Configuration](configuration.md)
- [Layouts](layouts.md)
- [Plugins](plugins.md)
- [Extensions](extensions.md)
- [Effects](effects.md)
- [Themes](themes.md)
- [WebAssembly Guests](wasm.md)
