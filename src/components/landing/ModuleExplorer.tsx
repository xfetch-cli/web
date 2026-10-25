"use client";

import { useMemo, useRef, useState } from "react";
import { renderModuleIcon } from "@/components/Icons";
import SectionHeader from "./SectionHeader";
import { MODULES, MODULE_CATEGORIES, type ModuleCategory } from "./data";

export default function ModuleExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ModuleCategory>("All");
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return MODULES.filter((module) => {
      const matchesCategory = category === "All" || module.category === category;
      const matchesQuery =
        needle.length === 0 ||
        module.name.toLowerCase().includes(needle) ||
        module.desc.toLowerCase().includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const reset = () => {
    setQuery("");
    setCategory("All");
    searchRef.current?.focus();
  };

  return (
    <section id="modules" className="xf-section" aria-labelledby="modules-title">
      <div className="xf-container">
        <SectionHeader
          id="modules-title"
          eyebrow="Reference"
          title="Available modules"
          lead="Every piece of information xfetch can display. Mix, match, and reorder them in your config."
        />

        <div className="xf-explorer" data-reveal>
          <div className="xf-explorer-search">
            <label htmlFor="module-search" className="xf-mini-label">
              Filter modules
            </label>
            <div className="xf-input-wrap">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
              <input
                ref={searchRef}
                id="module-search"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search os, cpu, memory…"
                autoComplete="off"
                aria-controls="module-results"
              />
              {query ? (
                <button
                  type="button"
                  className="xf-input-clear"
                  onClick={() => {
                    setQuery("");
                    searchRef.current?.focus();
                  }}
                  aria-label="Clear module search"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              ) : null}
            </div>
          </div>

          <div className="xf-filter-col">
            <span className="xf-mini-label" id="module-category-label">
              Category
            </span>
            <div className="xf-chips" role="group" aria-labelledby="module-category-label">
              {MODULE_CATEGORIES.map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`xf-chip-btn${category === item ? " is-active" : ""}`}
                  aria-pressed={category === item}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <p className="xf-count" aria-live="polite">
            <strong>{filtered.length}</strong> of {MODULES.length} modules
          </p>
        </div>

        <ul id="module-results" className="xf-module-grid" role="list" data-reveal>
          {filtered.map((module) => (
            <li key={module.name} className="xf-module">
              <span className="xf-module-icon" aria-hidden="true">
                {renderModuleIcon(module.icon, 18)}
              </span>
              <div className="xf-module-body">
                <div className="xf-module-head">
                  <h3>
                    <code>{module.name}</code>
                  </h3>
                  <span className="xf-module-cat">{module.category}</span>
                </div>
                <p>{module.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        {filtered.length === 0 ? (
          <div className="xf-empty" role="status">
            <p>No modules match “{query}” in {category}.</p>
            <button type="button" className="xf-btn xf-btn--ghost" onClick={reset}>
              Clear filters
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
