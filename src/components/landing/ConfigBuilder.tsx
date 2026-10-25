"use client";

import { useMemo, useState } from "react";
import { renderModuleIcon } from "@/components/Icons";
import CommandBlock from "./CommandBlock";
import SectionHeader from "./SectionHeader";
import {
  ALL_MODULES,
  CUSTOM_CONFIG_COMMAND,
  DEFAULT_MODULES,
  LAYOUT_OPTIONS,
} from "./data";

export default function ConfigBuilder() {
  const [selected, setSelected] = useState<Set<string>>(() => new Set(DEFAULT_MODULES));
  const [layout, setLayout] = useState("null");

  const ordered = ALL_MODULES.filter((module) => selected.has(module.value));

  const configJson = useMemo(() => {
    const lines = ["{"];
    if (layout !== "null") lines.push(`  "layout": ${JSON.stringify(layout)},`);
    lines.push('  "modules": [');
    if (ordered.length > 0) {
      lines.push(`    ${ordered.map((module) => JSON.stringify(module.value)).join(",\n    ")}`);
    }
    lines.push("  ],", '  "show_colors": true', "}");
    return lines.join("\n");
  }, [layout, ordered]);

  const toggle = (value: string) => {
    setSelected((previous) => {
      const next = new Set(previous);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const selectAll = () => setSelected(new Set(ALL_MODULES.map((module) => module.value)));
  const clearAll = () => setSelected(new Set());
  const reset = () => {
    setSelected(new Set(DEFAULT_MODULES));
    setLayout("null");
  };

  return (
    <section id="config" className="xf-section" aria-labelledby="config-title">
      <div className="xf-container">
        <SectionHeader
          id="config-title"
          eyebrow="Build"
          title="Configuration"
          lead="Toggle modules and pick a layout to generate a config.jsonc."
        />

        <div className="xf-config-grid" data-reveal>
          <div className="xf-config-controls">
            <fieldset className="xf-fieldset">
              <legend>
                Modules
                <span className="xf-fieldset-count" aria-live="polite">
                  {ordered.length} of {ALL_MODULES.length} selected
                </span>
              </legend>
              <div className="xf-config-actions">
                <button type="button" className="xf-link-btn" onClick={selectAll}>
                  Select all
                </button>
                <button type="button" className="xf-link-btn" onClick={clearAll}>
                  Clear
                </button>
                <button type="button" className="xf-link-btn" onClick={reset}>
                  Reset
                </button>
              </div>
              <div className="xf-config-modules">
                {ALL_MODULES.map((module) => (
                  <label key={module.value} className="xf-check">
                    <input
                      type="checkbox"
                      checked={selected.has(module.value)}
                      onChange={() => toggle(module.value)}
                    />
                    <span className="xf-check-box" aria-hidden="true">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="xf-check-icon" aria-hidden="true">
                      {renderModuleIcon(module.icon, 15)}
                    </span>
                    <code>{module.value}</code>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="xf-select-field">
              <label htmlFor="config-layout" className="xf-mini-label">
                Layout
              </label>
              <select
                id="config-layout"
                value={layout}
                onChange={(event) => setLayout(event.target.value)}
              >
                {LAYOUT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="xf-config-output">
            <CommandBlock code={configJson} label="Generated config.jsonc" className="xf-config-code" />
            <p className="xf-config-hint">Use a custom config file:</p>
            <CommandBlock code={CUSTOM_CONFIG_COMMAND} label="custom config command" />
          </div>
        </div>
      </div>
    </section>
  );
}
