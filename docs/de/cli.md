# CLI-Referenz

Diese Seite ist die Referenz für die xfetch-Kommandozeile: globale Optionen, Ausgabemodi, Laufzeit-Overrides, alle Unterbefehle, Konfigurationsverwaltung, Diagnose, Exit-Codes und Umgebungsvariablen. Die vollständige Hilfe ist jederzeit mit `xfetch --help` und `xfetch <command> --help` verfügbar.

## Syntax

```bash
xfetch [OPTIONS] [COMMAND]
```

Ohne Kommando rendert xfetch den Fetch. Globale Optionen dürfen vor oder nach dem Unterbefehl stehen. Ungültige Kombinationen enden mit Code `2`.

## Globale Optionen

| Option | Beschreibung |
|--------|--------------|
| `-c, --config <PATH>` | Eigene Konfigurationsdatei verwenden |
| `--gen-config` | Startkonfiguration erzeugen |
| `--logo <NAME>` | Logo für die erzeugte Konfiguration (nur mit `--gen-config`) |
| `--layout <NAME>` | Layout zur Laufzeit überschreiben; mit `--gen-config` das erzeugte Layout wählen |
| `--theme <NAME>` | Theme zur Laufzeit überschreiben |
| `--list-layouts` | Alle akzeptierten Layout-Namen ausgeben |
| `--list-modules` | Alle akzeptierten Modulschlüssel ausgeben |
| `--json` | Maschinenlesbares JSON ausgeben |
| `--get <KEY>` | Nur die angeforderten Schlüssel ausgeben; Flag wiederholen oder Kommas verwenden |
| `--modules <LIST>` / `--only <LIST>` | Gerenderte Modulliste überschreiben |
| `--color <MODE>` | `auto`, `always` oder `never` |
| `--no-color` | Wie `--color never` |
| `--offline` | Netzwerk deaktivieren (öffentliche IP, Kataloge, Updates, Remote-Addon-Installationen) |
| `--no-cache` | Paket- und Public-IP-Cache für diesen Lauf umgehen |
| `--quiet` | Informative Ausgabe unterdrücken |
| `--verbose` | Zusätzliche Diagnose auf stderr (wie `--log-level debug`) |
| `--log-level <LEVEL>` | `off`, `error`, `warn`, `info`, `debug` oder `trace` |
| `--log-json` | JSON-Logzeilen auf stderr |
| `--template <FILE>` | Fetch mit einer Template-Datei rendern |
| `--format <STRING>` | Fetch mit einem Inline-Template rendern |
| `--backup` / `--restore` | Aktive Konfiguration sichern oder wiederherstellen |
| `--benchmark` | Zeiten der Informationssammlung ausgeben |
| `--clean-cache` | Paket- und Public-IP-Cache leeren |
| `--daemon` / `--daemon-stop` | Animierten Logo-Daemon starten oder stoppen |
| `--no-daemon-live` / `--daemon-live-stop` / `--daemon-live-reload` | Live-Statistik-Daemon steuern |
| `-h, --help`, `-V, --version` | Hilfe und Version |

## Ausgabemodi

### Normales Rendern

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

`--json` gibt ein Objekt mit `schema_version: 1` aus und enthält nie ANSI-Escapes. `--benchmark` ergänzt ein `benchmark`-Array. Auch `--list-layouts`, `--list-modules`, `modules`, `theme list`, `addon list`, `doctor` und `update --check` akzeptieren `--json`.

### Einzelne Werte

```bash
xfetch --get os
xfetch --get os,cpu,memory
xfetch --get version,name
xfetch --json --get os,cpu
```

Ein Schlüssel gibt den Rohwert aus; mehrere Schlüssel geben `key=value`-Zeilen aus. Mit `--json` ist die Ausgabe `{ "schema_version": 1, "values": { ... } }`. Unterstützt werden die Modulschlüssel aus `--list-modules` sowie `version`, `name`, `packages:<manager>` und `plugin:<name>`. Unbekannte Schlüssel enden mit Code `7`.

### Templates

```bash
xfetch --format 'os={{os}} kernel={{kernel}}'
xfetch --template ~/.config/xfetch/my.tmpl
```

Templates unterstützen `{{key}}`, die Filter `upper`, `lower`, `trim`, `count`, `join:" / "` und `default:"..."` sowie `{{#if}}`, `{{#unless}}`- und `{{#each}}`-Blöcke. Platzhalter decken alle Modulschlüssel, `packages:<manager>`, `plugin:<name>`, `palette`, `header`, `sep`, `name` und `version` ab. `--get`, `--template` und `--format` gelten nur für den Standard-Fetch und lassen sich nicht mit einem Unterbefehl oder dem Daemon-Modus kombinieren.

### Laufzeit-Overrides

Priorität, von hoch nach niedrig:

1. CLI-Overrides (`--layout`, `--modules`, `--no-color`, `--offline`, `--no-cache`)
2. Config-Provider (Erweiterungen)
3. Theme
4. Konfigurationsdatei
5. Eingebaute Standardwerte

## Befehle

| Befehl | Zweck |
|--------|-------|
| `plugin` / `plugins` | Plugins verwalten |
| `effects` / `effect` | Intro-Effekte verwalten |
| `extension` / `extensions` | Config-Provider verwalten |
| `addon <kind> <action>` | Einheitlicher Addon-Befehl (`plugin`, `effect`, `extension`, `command`) |
| `command` / `commands` | CLI-Command-Addons verwalten |
| `run <name> [--] <args>` | Ein Command-Addon ausführen; `--render` nutzt das Core-Layout |
| `theme` | Themes suchen, installieren, aktualisieren, auflisten, setzen, entfernen oder exportieren |
| `logo` | Logos aus dem ASCII-Katalog auflisten und anzeigen |
| `wasm` | WebAssembly-Gäste inspizieren, ausführen oder WIT exportieren |
| `doctor` | Installation, Konfiguration, Terminal und Addons diagnostizieren (`--fix`, `--bench`, `--image`, `--network`) |
| `modules` | Modulschlüssel auflisten |
| `config` | Validieren, ausgeben, lesen, setzen, entfernen, zurücksetzen, bearbeiten, sichern oder wiederherstellen |
| `completions <shell>` | Shell-Completions für bash/zsh/fish/elvish/PowerShell erzeugen |
| `man` | Manpage rendern |
| `schema` | JSON-Schemas für maschinenlesbare Ausgaben ausgeben |
| `paths` / `env` / `build-info` | Diagnose für Pfade, Umgebung und Build |
| `update` | Releases prüfen, installieren oder zurückrollen |
| `self-uninstall` | Binary und optional Konfiguration, Cache und Daten entfernen |

## Addon-Verwaltung

`plugin`, `effects`, `extension` und `command` teilen dieselben Aktionen. Die einheitliche Form ist äquivalent:

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

| Aktion | Verwendung | Hinweise |
|--------|------------|----------|
| `install` | `install [PATH] [--repo <URL>] [--sha256 <HEX>] [--name <NAME>] [--manifest <FILE>] [--all] [--force]` | Katalogname, lokales Verzeichnis, Repository, Wasm-Datei oder URL |
| `update` | `update [NAME] [--all] [--check] [--force]` | Native Addons aus der aufgezeichneten Quelle neu bauen; `.bak` für Rollback behalten |
| `rollback` | `rollback <NAME>` | Vorheriges Artefakt und Receipt wiederherstellen |
| `list` | `list [--verbose]` | Installierte Addons; `--verbose` ergänzt Fähigkeiten und Limits |
| `info` | `info <NAME>` | Metadaten, Fähigkeiten, Limits und Config-Snippet |
| `search` | `search [QUERY]` (Alias `available`) | Katalog durchsuchen |
| `remove` | `remove <NAME>` | Artefakt und Receipt entfernen |

Jede Installation schreibt ein `.install.json`-Receipt neben das Addon mit installierter Version, Quelle, Repository, Pfad, Katalogreferenz, SDK-Version und SHA-256 des Artefakts. Kataloge können außerdem `repo`, `ref`, `sdk_version` und `min_xfetch_version` deklarieren. `install --all` installiert jeden Katalogeintrag und überspringt installierte Addons, sofern nicht `--force` gesetzt ist.

## Command-Addons

```bash
xfetch command install github
xfetch run github -- rust-lang/rust
xfetch --json run github -- rust-lang/rust
xfetch --layout right run github --render -- rust-lang/rust
```

Command-Addons liefern reinen Text, ein Feld pro Zeile. `--render` schickt die Zeilen durch Layout und Logo. `--json` verpackt die Ausgabe als `{schema_version, command, args, lines}`. Der Katalog liegt in `xfetch-cli/commands`; `XFETCH_COMMAND_INDEX`, `XFETCH_COMMAND_REPO` und `XFETCH_COMMAND_DEV_DIR` überschreiben die Standardwerte.

## Themes und Logos

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

Die Theme-Registry ist `xfetch-cli/themes` (`XFETCH_THEME_INDEX` überschreibt sie). Der Logo-Katalog ist `xfetch-cli/logos` (`XFETCH_LOGOS_URL` überschreibt ihn). Beide sind mit `--offline` blockiert.

## Konfigurationsverwaltung

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

`set` und `unset` unterstützen Punkt-Pfade und Array-Indizes, bewahren umgebende Kommentare wo möglich und validieren das Ergebnis vor dem Schreiben. `edit` nutzt `$VISUAL` oder `$EDITOR` nach einem Safety-Backup.

## Backup und Wiederherstellung

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

Backups enthalten die Konfiguration, aktive Themes, config-roulette-Routen, referenzierte Logo-Assets und mit `--with-addons` auch Addon-Artefakte und Receipts. `--compress` schreibt gzip; `--encrypt` nutzt Argon2id und XChaCha20-Poly1305. Die Wiederherstellung schreibt ein `pre-restore-*`-Safety-Backup und validiert die wiederhergestellte Konfiguration. Unter Unix werden Backups mit Modus `0600` geschrieben.

## Doctor

```bash
xfetch doctor
xfetch doctor --json
xfetch doctor --network
xfetch doctor --fix
xfetch doctor --bench
xfetch doctor --image
```

`doctor` prüft Binary, Konfiguration, Theme, Layout, Terminalgröße, Bildprotokoll, Addon-Verzeichnisse, Install-Receipts und Cache. `--fix` erzeugt eine fehlende Konfiguration und entfernt einen ungültigen Cache. Es endet mit Code `1`, wenn eine Prüfung fehlschlägt.

## WebAssembly

```bash
xfetch wasm inspect ./plugin.wasm
xfetch wasm run ./plugin.wasm --request '{"version":1,"kind":"info_provider"}'
xfetch wasm run ./plugin.wasm --request-file request.json --timeout 5 --kind plugin
xfetch wasm wit
```

`wasm inspect` gibt Art, Manifest, Fähigkeiten und Limits aus, ohne den Gast auszuführen. `wasm run` führt einen Gast mit einer rohen JSON-Anfrage (oder `--request-file`) aus und gibt die Antwort aus; `--timeout` überschreibt das Manifest-Timeout und `--kind` wählt die Komponentenwelt (`plugin`, `effect`, `extension` oder `command`). `wasm wit` gibt das WIT-Paket für Komponenten-Gäste aus.

## Diagnose und Dienstprogramme

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

`modules` listet die akzeptierten Modulschlüssel; mit `--json` liefert es Objekte mit `key`, `description` und `platforms`. `paths` gibt die aufgelösten Konfigurations-, Addon-, Cache- und Datenpfade aus; `env` gibt Plattform, Terminal, Umgebung und Laufzeiteinstellungen aus; `build-info` gibt Build-Version und aktivierte Features aus. `schema [fetch|backup|addon|update|doctor|config|all]` gibt das JSON-Schema für die maschinenlesbaren Ausgaben aus. `self-uninstall` entfernt das Binary; `--purge` entfernt zusätzlich Konfiguration, Cache und Daten, und `--yes` überspringt die Bestätigung.

## Shell-Integration

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

Prebuilt-Installationen laden das Release-Asset, prüfen `SHA256SUMS` und behalten eine `xfetch.bak`. `cargo install` wird über Cargo aktualisiert; Homebrew, winget und AUR werden an ihren Paketmanager delegiert.

## Exit-Codes

| Code | Bedeutung |
|------|-----------|
| `0` | Erfolg |
| `1` | Allgemeiner Fehler, Doctor-Fehler oder `update --check` mit neuerer Version |
| `2` | Nutzungsfehler: ungültiges Flag, ungültige Kombination oder Parse-Fehler |
| `3` | Konfigurationsfehler |
| `4` | Netzwerkfehler oder durch `--offline` blockierte Anfrage |
| `5` | Addon-Fehler |
| `6` | Update-Fehler |
| `7` | Nicht gefunden: unbekanntes Modul, Config-Schlüssel oder Addon |

## Logging

```bash
xfetch --log-level debug
xfetch --log-level trace --verbose
xfetch --log-json --log-level debug
xfetch --log-level warn --quiet
```

`--quiet` entspricht `warn`, `--verbose` entspricht `debug`, und ein explizites `--log-level` gewinnt. `--log-json` schreibt `{"level","target","message"}`-Zeilen auf stderr, damit stdout für Ergebnisse und `--json` sauber bleibt.

## Umgebungsvariablen

| Variable | Wirkung |
|----------|---------|
| `XFETCH_PLUGIN_REPO`, `XFETCH_EFFECT_REPO`, `XFETCH_EXTENSION_REPO`, `XFETCH_COMMAND_REPO` | Standard-Installationsrepositories |
| `XFETCH_PLUGIN_INDEX`, `XFETCH_EFFECT_INDEX`, `XFETCH_EXTENSION_INDEX`, `XFETCH_COMMAND_INDEX` | Katalog-URLs oder lokale Pfade |
| `XFETCH_THEME_INDEX`, `XFETCH_LOGOS_URL` | Overrides für Theme-Registry und Logo-Katalog |
| `XFETCH_BACKUP_PASSPHRASE` | Passphrase für verschlüsselte Backups |
| `VISUAL`, `EDITOR` | Editor für `xfetch config edit` |
| `XDG_CONFIG_HOME`, `XDG_CACHE_HOME`, `XDG_STATE_HOME` | Wurzeln für Konfiguration, Cache und State |
| `XFETCH_WASM_LOG_LEVEL` | Log-Schwelle für Wasm-Gäste (`off`..`debug`) |
| `XFETCH_UPDATE_API` | GitHub-API-Endpunkt für `xfetch update` |
| `GH_TOKEN` / `GITHUB_TOKEN` | GitHub-Token für das Update-Rate-Limit |
| `XFETCH_PLUGIN_DEV_DIR`, `XFETCH_COMMAND_DEV_DIR` | Zusätzliche Entwicklungsverzeichnisse für die Addon-Suche |
| `XPM_AUR_STATE` | Überschreibt die xpm-aur-State-Datei für die Paketzählung |
| `KITTY_WINDOW_ID` | Aktiviert das Kitty-Grafikprotokoll, wenn gesetzt |
| `TERM_PROGRAM`, `LC_TERMINAL` | Wählen iTerm-kompatible Inline-Bilder, wenn unterstützt |

## Sicherheitshinweise

- Native Addons laufen ohne Sandbox mit den Rechten des Benutzers.
- Wasm-Addons nutzen eine Deny-by-default-Manifestrichtlinie mit Limits für Zeit, Speicher, Ausgabe, Host-Aufrufe und Fähigkeiten.
- `--sha256` bei der Installation ist der Provenance-Pin und überschreibt den Manifest-Digest.
- `--offline` blockiert xfetch-Netzwerkaufrufe, native Addons können jedoch eigene Anfragen stellen.
- Backups können Geheimnisse aus der Konfiguration enthalten; verschlüsselte Backups und Passphrase-Dateien sicher aufbewahren.

## Verwandte Dokumente

- [Erste Schritte](getting-started.md)
- [Konfiguration](configuration.md)
- [Layouts](layouts.md)
- [Plugins](plugins.md)
- [Erweiterungen](extensions.md)
- [Effekte](effects.md)
- [Themes](themes.md)
- [WebAssembly-Gäste](wasm.md)
