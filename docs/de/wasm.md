# WebAssembly-Gaeste

Plugins, Effekte und Erweiterungen koennen WebAssembly-Artefakte statt nativer Programme sein. Der Core erkennt sie an der Binaerkopfzeile, fuehrt sie in einer wasmtime-Sandbox aus und behaelt dasselbe JSON-Protokoll, sodass Konfiguration, Auflistung, Timeouts und Installationsbefehle identisch funktionieren.

## Gast-Formen

| Form | Ziel | Vertrag | Sprachen |
|------|------|---------|----------|
| Core-Modul | `wasm32-wasip1` | JSON-Anfrage ueber stdin, JSON-Antwort ueber stdout, Host-Aufrufe ueber `xfetch.host_call` | Rust, C, C++, Zig, Go, AssemblyScript, ... |
| Komponente | Component Model | Exportiert `run` aus der WIT-Welt `xfetch:runtime` mit typisierten Host-Imports | Python (`componentize-py`), JavaScript (`componentize-js`), Rust/C/Go (`wit-bindgen`), .NET, ... |

Die Erkennung erfolgt inhaltlich: die ersten acht Bytes unterscheiden Core-Module von Komponenten. Die Dateiendung spielt keine Rolle.

## Installation

```bash
# Aus einem lokalen Checkout (baut bei Bedarf ueber das Manifest)
xfetch plugin install ./plugins/wasm-pacman
xfetch effects install ./effects/wasm-matrix
xfetch extension install ./extensions/wasm-night-mode

# Vorgebautes Artefakt von einer URL
xfetch plugin install https://example.com/releases/plugin.wasm
```

Der Installer legt das Artefakt als `xfetch-<art>-<name>.wasm` plus Manifest in `~/.config/xfetch/` ab.

## Manifest

Faehigkeiten und Limits werden in einem JSON-Manifest deklariert: Sidecar (`<name>.json` neben dem Artefakt), eingebetteter Abschnitt `xfetch:manifest` oder konservative Standardwerte.

```json
{
  "manifest_version": 1,
  "name": "wasm-hello",
  "kind": "info_provider",
  "runtime": "core",
  "capabilities": {
    "http": { "allow": ["https://api.example.com/*"] },
    "exec": { "allow": ["pacman"], "env": ["PATH"] },
    "fs": [{ "host": "/proc", "guest": "/proc", "mode": "ro" }],
    "env": ["LANG"]
  },
  "limits": {
    "timeout_ms": 15000,
    "memory_mb": 64,
    "output_kb": 64,
    "host_call_kb": 256
  }
}
```

Quell-Repositories nutzen `xfetch-plugin.json`, `xfetch-effect.json` oder `xfetch-extension.json` mit demselben Schema; der Installer kopiert es neben das Artefakt.

## Faehigkeiten

Faehigkeiten sind standardmaessig verweigert; leere oder fehlende Felder verweigern die Operation.

| Faehigkeit | Feld | Bedeutung |
|------------|------|-----------|
| HTTP | `http.allow` | Glob-Muster gegen die vollstaendige URL. Redirects werden bei jedem Sprung geprueft. |
| Prozesse | `exec.allow` | Muster auf den Programmnamen. Keine Shell, Umgebung wird bis auf erlaubte Namen geleert. |
| Dateisystem | `fs` | WASI-Preopens. Strings mounten schreibgeschuetzt; Objekte waehlen `host`, `guest` und `mode` (`ro`/`rw`). |
| Umgebung | `env` | Variablennamen, die der Gast sieht. |
| Argumente | `args` | Bei true erhaelt der Gast seinen Namen als `argv[0]`. |

Die Operationen `log` und `version` sind immer verfuegbar.

## Limits

| Feld | Standard | Bedeutung |
|------|----------|-----------|
| `timeout_ms` | 30000 | Zeitlimit; `timeout_secs` aus der Konfiguration hat Vorrang. |
| `memory_mb` | 256 | Limit des linearen Speichers. Python- und Go-Gaeste brauchen Reserve. |
| `output_kb` | 4096 | Limit der JSON-Antwort. |
| `host_call_kb` | 4096 | Limit einer Host-Aufruf-Antwort. |

## Host-Aufrufe

Core-Module rufen `xfetch.host_call` mit einer JSON-Operation auf; Komponenten nutzen die typisierten Imports `fetch`, `exec`, `log` und `protocol-version`. Rust-Module koennen das Crate `xfetch-guest-api` verwenden. Die vollstaendige Referenz steht in `docs/WASM.md` des xfetch-Repositories.

## Werkzeuge

```bash
xfetch wasm inspect ./plugin.wasm                  # Kopfzeile, Manifest, Faehigkeiten
xfetch wasm run ./plugin.wasm --request '{"version":1,"kind":"info_provider"}'
xfetch wasm wit                                    # Komponenten-Vertrag
```

## Logs

Gast-Logs gehen nach stderr; standardmaessig werden nur `warn` und `error` gezeigt. `XFETCH_WASM_LOG_LEVEL` (`off`, `error`, `warn`, `info`, `debug`) aendert die Schwelle.

## Sicherheit

Wasm-Gaeste starten ohne Umgebungsrechte: kein Datei-, Netzwerk-, Umgebungs- oder Prozesszugriff ohne Manifest, und Limits begrenzen Zeit, Speicher und Ausgabe. Native Plugins behalten ihre vollen Prozessrechte; wasm zu waehlen heisst Sandbox zu waehlen.

## Beispiele

| Gast | Sprache | Form | Repository |
|------|---------|------|------------|
| `wasm-crypto` | Rust | Core-Modul, HTTP | xfetch-cli/plugins |
| `wasm-ip-geo` | Python | Komponente, HTTP | xfetch-cli/plugins |
| `wasm-pacman` | Go | Core-Modul, exec | xfetch-cli/plugins |
| `wasm-proc` | C | Core-Modul, Dateisystem | xfetch-cli/plugins |
| `wasm-matrix` | Rust | Core-Effekt | xfetch-cli/effects |
| `wasm-python-pulse` | Python | Komponenten-Effekt | xfetch-cli/effects |
| `wasm-night-mode` | Rust | Core-Erweiterung | xfetch-cli/extensions |
| `wasm-updates-footer` | Go | Core-Erweiterung | xfetch-cli/extensions |
| `wasm-lang-labels` | Python | Komponenten-Erweiterung | xfetch-cli/extensions |

Vollstaendige Referenz: `docs/WASM.md` im xfetch-Repository und `docs/wasm-guests.md` im api-Repository.
