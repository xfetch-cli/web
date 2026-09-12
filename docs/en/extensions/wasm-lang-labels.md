# wasm-lang-labels

Localizes module labels based on the system language (Python component).

- **Kind:** `config_provider`
- **Artifact:** `wasm-lang-labels.wasm` (component)
- **Capabilities:** `env: LANG, LC_ALL, LC_MESSAGES`
- **Language:** Python (componentize-py)

## Installation

```bash
xfetch extension install ./extensions/wasm-lang-labels
```

## Configuration

```jsonc
{
    "config_providers": [
        {
            "extension": "wasm-lang-labels",
            "args": {}
        }
    ]
}
```

## Arguments

| Field | Type | Default | Description |
|-------|------|---------|-------------|
| `language` | string | from `LANG` | Overrides environment detection; `es`, `en` and `de` are included. |

## Behavior

Fills the `labels` map for known modules without overriding labels you already customized, including intentionally hidden ones.
