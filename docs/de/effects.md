# Effekte

Intro-Effekte animieren die Inhaltszeilen beim Start des Fetch. Statt das Ergebnis sofort auszugeben, transformiert ein Effekt jede Zeile von einem verschlüsselten Zustand in seinen endgültigen Text über eine kurze Dauer.

## Architektur im Überblick

Effekte sind eigenständige ausführbare Dateien mit dem Namen `xfetch-effect-<name>` (bzw. `xfetch-effect-<name>.exe` unter Windows). Sie erhalten die gerenderten Inhaltszeilen vom xfetch-Kern und geben eine Folge von Frames zurück.

```
xfetch core  --->  stdin (JSON request)     --->  effect process
xfetch core  <---  stdout (JSON response)   <---  effect process
```

Effekte sind **optional**: Wenn die konfigurierte Effekt-Datei fehlt oder fehlschlägt, rendert xfetch die Ausgabe normal — nichts bricht ab.

## Installation

```bash
# Aus dem offiziellen Effekt-Repository installieren
xfetch effects install decrypt

# Aus einem lokalen Verzeichnis installieren
xfetch effects install ./my-effect

# Aus einem benutzerdefinierten Git-Repository installieren
xfetch effects install my-effect --repo https://github.com/user/effects.git

# Installierte Effekte auflisten
xfetch effects list

# Einen Effekt entfernen
xfetch effects remove glitch
```

Effekte werden mit `cargo build --release` gebaut und nach `~/.config/xfetch/effects/xfetch-effect-<name>` installiert (bzw. `%APPDATA%\xfetch\effects\` unter Windows). Das Standard-Repository ist `https://github.com/xfetch-cli/effects.git`, überschreibbar mit der Umgebungsvariable `XFETCH_EFFECT_REPO`.

## Konfiguration

Der Konfigurationsschlüssel `effects` akzeptiert einen einzelnen Effekt oder eine Liste von Effekten, die in Folge abgespielt werden:

```jsonc
{
    "effects": {
        "plugin": "decrypt",
        "duration_ms": 1500,
        "fps": 30
    }
}
```

Mehrere Effekte spielen nacheinander:

```jsonc
{
    "effects": [
        {
            "plugin": "glitch",
            "duration_ms": 800,
            "fps": 30
        },
        {
            "plugin": "decrypt",
            "duration_ms": 1500,
            "fps": 30
        }
    ]
}
```

### Felder

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| `plugin` | `string` | Effektname (installiert als `xfetch-effect-<name>`) |
| `style` | `string` oder `null` | Effekt-spezifischer Stilhinweis |
| `duration_ms` | `number` oder `null` | Gesamtdauer der Animation in Millisekunden |
| `fps` | `number` oder `null` | Bilder pro Sekunde |
| `args` | `object` oder `null` | Freie effektspezifische Argumente |
| `timeout_secs` | `number` oder `null` | Sicherheitsnetz in Sekunden: Der Kern beendet den Effektprozess, wenn er länger läuft |

## JSON-Drahtprotokoll

**Protokollversion:** 1

### Anfrage (stdin)

```json
{
    "version": 1,
    "kind": "effect",
    "lines": [
        "os: Arch Linux x86_64",
        "kernel: 6.6.87.2-arch1-1"
    ],
    "args": {
        "style": null,
        "duration_ms": 1500,
        "fps": 30,
        "args": null
    }
}
```

Das Feld `lines` enthält die gerenderten Inhaltszeilen (Icon + Wert pro Zeile), die der Effekt transformiert. Das Feld `args` trägt die Parameter des Effekts.

### Antwort (stdout)

```json
{
    "frames": [
        {
            "delay_ms": 33,
            "lines": ["scrambled line 1", "scrambled line 2"]
        },
        {
            "delay_ms": 33,
            "lines": ["os: Arch Linux x86_64", "kernel: 6.6.87.2-arch1-1"]
        }
    ]
}
```

Jeder Frame hat ein `delay_ms` (wie lange er angezeigt wird) und `lines` (den Frame-Inhalt). Die Antwort muss nicht leer sein, und der letzte Frame sollte den ursprünglichen endgültigen Inhalt erreichen — der Kern stabilisiert sich nach dem Abspielen exakt auf den finalen Inhalt.

### Fehlerbehandlung

Effekte müssen Fehler auf stderr schreiben und mit einem Nicht-Null-Statuscode enden. xfetch überspringt den Effekt und rendert die normale Ausgabe, wenn ein Fehler auftritt.

## Offizielle Effekte

| Effekt | Beschreibung |
|--------|--------------|
| `decrypt` | Deckt jede Zeile von verschlüsselten Glyphen zum echten Text auf (sanftes Decodieren). Standard: `duration_ms` 1500, `fps` 30. |
| `glitch` | Ruckartiges verschlüsseltes Flackern mit Korruptionsausbrüchen, horizontalen Streifen und fallengelassenen Zeilen. Standard: `duration_ms` 800, `fps` 30. Erhält ANSI-Escape-Sequenzen intakt. |

## Eigene Effekte schreiben

### Benennungskonvention der Binärdatei

```
xfetch-effect-<name>          (Linux/macOS)
xfetch-effect-<name>.exe     (Windows)
```

### Minimales Effekt-Gerüst (Rust)

```toml
[package]
name = "xfetch-effect-my-effect"
version = "0.1.0"
edition = "2024"

[dependencies]
serde_json = "1"
xfetch-effect-api = { git = "https://github.com/xfetch-cli/api", package = "xfetch-effect-api" }
```

```rust
use xfetch_effect_api::{read_effect_request, write_effect_frames, EffectFrame};

fn main() {
    let request = match read_effect_request() {
        Ok(value) => value,
        Err(err) => {
            eprintln!("{}", err);
            std::process::exit(1);
        }
    };

    let duration_ms = request.args.duration_ms.unwrap_or(1000).max(1);
    let fps = request.args.fps.unwrap_or(30).max(1);
    let frame_count = ((duration_ms * fps) / 1000).max(1);
    let frame_delay = (1000.0 / fps as f64) as u64;

    let mut frames = Vec::with_capacity(frame_count as usize + 1);
    for i in 0..=frame_count {
        let progress = i as f64 / frame_count as f64;
        let lines: Vec<String> = request.lines.iter()
            .map(|line| reveal(line, progress, i))
            .collect();
        frames.push(EffectFrame::new(frame_delay, lines));
    }

    if let Err(err) = write_effect_frames(&frames) {
        eprintln!("{}", err);
        std::process::exit(1);
    }
}
```

### Effekt-API-Crate

Das Crate `xfetch-effect-api` (Quellcode unter `github.com/xfetch-cli/api`) bietet die Protokolltypen und Helfer:

- **Protokolltypen:** `EffectArgs`, `EffectFrame`, `EffectRequest`, `EffectResponse`, `KIND_EFFECT`
- **Einstiegspunkt-Helfer:** `read_effect_request()`, `write_effect_frames()`
- **Argument-Parsing:** `EffectArgs::parse_args()` und `EffectArgs::parse_args_or_default()`
- **Timeout-Helfer:** `with_timeout()` und der `TimedOut`-Fehler

Das gemeinsame Crate `xfetch-effects-lib` bietet ANSI-sichere Helfer (`SCRAMBLE_GLYPHS`, `tokenize`, `reveal`, ...), damit Effekte Text verschlüsseln und aufdecken können, ohne Terminal-Escape-Sequenzen zu brechen.

### Richtlinien

- Halten Sie Effekte auf einen einzigen visuellen Stil fokussiert
- Schreiben Sie Fehler auf stderr und enden Sie mit Nicht-Null-Status
- Geben Sie ein nicht leeres `frames`-Array zurück, dessen letzter Frame dem finalen Inhalt entspricht
- Bewahren Sie ANSI-Escape-Sequenzen über die Frames hinweg
- Behandeln Sie Timeouts elegant mit `with_timeout()`
