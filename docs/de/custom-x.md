# Custom-X-Layout

`custom-x` ist das flexibelste Layout in xfetch: Jede Rahmenzeile ist eine **wörtliche Vorlage** (Template), die du im `custom_x`-Objekt der Konfiguration schreibst. Du bestimmst die Zeichen, die Größe, die internen Trennlinien und kannst zusätzliche Zeilen einfügen — nichts ist fest verdrahtet.

## Aktivierung

```jsonc
{
    "layout": "custom-x",
    "custom_x": {
        // ... deine Vorlagen ...
    }
}
```

## Vorlagen und Platzhalter

Alle Rahmenzeilen sind Zeichenketten (Vorlagen) mit zwei Platzhaltern:

- `{fill}` — wiederholt das `fill`-Zeichen, bis die Zeile die Boxbreite erreicht. Vorlagen *ohne* `{fill}` werden am Ende mit dem `fill`-Zeichen verlängert; Vorlagen, die *länger* als der Inhalt sind, legen die Boxbreite fest.
- `{title}` — wird durch den Titel der aktuellen Gruppe ersetzt (in den `group_title`- und `top`-Vorlagen).

## Optionen

| Option | Standard | Beschreibung |
|--------|----------|--------------|
| `top` | `╭─ {title}{fill}╮` | Vorlage für die obere Kante. Leerer String deaktiviert sie. |
| `bottom` | `╰{fill}╯` | Vorlage für die untere Kante. Leerer String deaktiviert sie. |
| `left` | `│` | Präfix für jede Inhaltszeile (kann mehrere Zeichen haben). |
| `right` | `│` | Suffix für jede Inhaltszeile. |
| `fill` | `─` | Zeichen für `{fill}` und zum Verlängern kurzer Vorlagen. |
| `padding` | `1` | Leerzeichen zwischen den Seitenkanten und dem Inhalt. |
| `width` | `"auto"` | `"auto"` passt die Box an den Inhalt an; `"full"` streckt sie bis zum Ende der Terminalzeile (unter Berücksichtigung der Logo-Spalte, abzüglich `full_margin`); eine Zahl legt eine feste Breite in Spalten fest. |
| `full_margin` | `2` | Freie Zellen am rechten Rand bei `width: "full"` (vermeidet die Umbruchspalte des Terminals). |
| `group_title` | `── {title} ──` | Vorlage, die am Anfang einer Modulgruppe gerendert wird. Leerer String blendet Gruppentitel aus. |
| `divider` | (aus) | Vorlage für eine interne Trennlinie. Leerer String deaktiviert sie. |
| `divider_between` | `"groups"` | Wo Trennlinien erscheinen: `"groups"` (zwischen Gruppen), `"modules"` (auch zwischen jedem Modul in Gruppen) oder `"none"`. |
| `module_top` | (aus) | Vorlage über jeder Modulzeile — umschließt jedes Modul in einer eigenen Box. |
| `module_bottom` | (aus) | Vorlage unter jeder Modulzeile. |
| `header_lines` | `[]` | Zusätzliche wörtliche Zeilen nach der oberen Kante (Vorlagen mit Platzhaltern erlaubt). |
| `footer_lines` | `[]` | Zusätzliche wörtliche Zeilen vor der unteren Kante. |

## Beispiel

Alles in einem großen Rahmen, jeder Gruppentitel in einer eigenen Box und jedes Modul in seiner eigenen Box:

```jsonc
{
    "layout": "custom-x",
    "custom_x": {
        "top": "╔═══════ XFETCH ═══════{fill}╗",
        "bottom": "╚══════════════════════{fill}╝",
        "left": "║",
        "right": "║",
        "fill": "═",
        "padding": 1,
        "width": "full",
        "full_margin": 2,
        "group_title": "╭─── {title} ───{fill}╮",
        "module_top": "╠{fill}╣",
        "module_bottom": "╠{fill}╣",
        "divider_between": "none"
    },
    "modules": [
        { "type": "group", "title": "Hardware", "modules": ["cpu", "gpu"] },
        { "type": "group", "title": "Software", "modules": ["os", "kernel"] }
    ]
}
```

**Ergebnis:**

```
╔═══════ XFETCH ═════════════════════════╗
╭─── Hardware ───════════════════════════╮
╠════════════════════════════════════════╣
║  cpu Apple M4 (10) @ 4.46 GHz         ║
╠════════════════════════════════════════╣
║  gpu Apple M4                          ║
╠════════════════════════════════════════╣
╭─── Software ───════════════════════════╮
╠════════════════════════════════════════╣
║  os Darwin 26.5.2 aarch64              ║
╚════════════════════════════════════════╝
```

## Abschnitts-Stil (ohne Boxen)

Gruppenüberschriften wie `hardware──────` mit `────`-Trennlinien zwischen den Gruppen, ohne äußeren Rahmen:

```jsonc
{
    "layout": "custom-x",
    "custom_x": {
        "top": "",
        "bottom": "",
        "left": "",
        "right": "",
        "fill": "─",
        "padding": 0,
        "group_title": "{title}{fill}",
        "divider": "{fill}",
        "divider_between": "groups"
    }
}
```

## Hinweise

- Leere Vorlagen (`""`) werden komplett übersprungen — es entstehen keine Leerzeilen.
- Bei `width: "full"` wird der Fallback für kleine Terminals konsistent mit den klassischen Layouts angewendet.
- Verschachtelte Gruppen werden rekursiv gerendert (Titelzeilen und Modulzeilen innerhalb der Elternbox).
- Die Boxbreite ist immer mindestens so breit wie die breiteste Vorlagen-/Inhaltszeile; kürzere Zeilen werden innerhalb der rechten Kante aufgefüllt.

Siehe auch: [Layouts](layouts.md).
