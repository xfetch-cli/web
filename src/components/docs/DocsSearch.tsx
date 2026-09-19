"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { SearchEntry } from "@/lib/docs";
import { docsUI } from "@/lib/docs-ui";

const MAX_HITS = 12;
const SHOWN_HITS = 8;

function fold(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function snippet(text: string, terms: string[], folded: string): string {
  let at = -1;
  for (const term of terms) {
    const i = folded.indexOf(term);
    if (i !== -1 && (at === -1 || i < at)) at = i;
  }
  if (at === -1) return text.slice(0, 120) + (text.length > 120 ? "…" : "");
  let start = Math.max(0, at - 45);
  let end = Math.min(text.length, start + 150);
  if (start > 0) {
    const sp = text.indexOf(" ", start);
    start = sp > 0 && sp < at ? sp + 1 : start;
  }
  if (end < text.length) {
    const sp = text.lastIndexOf(" ", end);
    if (sp > at) end = sp;
  }
  return `${start > 0 ? "…" : ""}${text.slice(start, end).trimEnd()}${end < text.length ? "…" : ""}`;
}

function highlight(text: string, terms: string[], folded: string): React.ReactNode {
  if (terms.length === 0 || text.length === 0) return text;
  const ranges: [number, number][] = [];
  for (const term of terms) {
    let idx = folded.indexOf(term);
    while (idx !== -1) {
      ranges.push([idx, idx + term.length]);
      idx = folded.indexOf(term, idx + term.length);
    }
  }
  if (ranges.length === 0) return text;
  ranges.sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  for (const range of ranges) {
    const last = merged[merged.length - 1];
    if (last && range[0] <= last[1]) last[1] = Math.max(last[1], range[1]);
    else merged.push([range[0], range[1]]);
  }
  const out: React.ReactNode[] = [];
  let cursor = 0;
  merged.forEach(([start, end], i) => {
    if (start > cursor) out.push(text.slice(cursor, start));
    out.push(
      <mark key={i} className="docs-mark">
        {text.slice(start, end)}
      </mark>,
    );
    cursor = end;
  });
  if (cursor < text.length) out.push(text.slice(cursor));
  return out;
}

interface Hit {
  entry: SearchEntry;
  snippet: string;
  score: number;
}

interface IndexedEntry {
  entry: SearchEntry;
  title: string;
  section: string;
  slug: string;
  body: string;
}

function search(indexed: IndexedEntry[], query: string): Hit[] {
  const folded = fold(query).trim();
  if (folded.length < 2) return [];
  const terms = Array.from(
    new Set(folded.split(/\s+/).filter((t) => t.length >= 2)),
  );
  if (terms.length === 0) return [];

  const ranked: Hit[] = [];
  for (const { entry, title, section, slug, body } of indexed) {
    const hay = `${title} ${section} ${slug} ${body}`;
    let score = 0;
    for (const term of terms) {
      score += (title.includes(term) ? 60 : 0) + (slug.includes(term) ? 25 : 0) + (section.includes(term) ? 15 : 0);
      let count = 0;
      let idx = hay.indexOf(term);
      while (idx !== -1) {
        count++;
        if (count > 24) break;
        idx = hay.indexOf(term, idx + 1);
      }
      score += count;
    }
    if (score > 0) {
      ranked.push({ entry, snippet: snippet(entry.text, terms, body), score });
    }
  }

  ranked.sort((a, b) => b.score - a.score || a.entry.title.length - b.entry.title.length);
  return ranked.slice(0, MAX_HITS);
}

export default function DocsSearch({
  lang,
  entries,
}: {
  lang: string;
  entries: SearchEntry[];
}) {
  const ui = docsUI(lang);
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [selected, setSelected] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const raw = query.trim();
  const indexed = useMemo<IndexedEntry[]>(
    () =>
      entries.map((entry) => ({
        entry,
        title: fold(entry.title),
        section: fold(entry.section),
        slug: fold(entry.slug),
        body: fold(entry.text),
      })),
    [entries],
  );
  const hits = useMemo(
    () => (raw.length >= 2 ? search(indexed, raw) : []),
    [indexed, raw],
  );
  const terms = useMemo(
    () =>
      Array.from(
        new Set(
          fold(raw)
            .split(/\s+/)
            .map((t) => t.trim())
            .filter((t) => t.length >= 2),
        ),
      ),
    [raw],
  );

  const open = focused && raw.length >= 2;

  useEffect(() => {
    const onDown = (event: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    };
    const onKey = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable);
      if (
        !typing &&
        (event.key === "/" || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k"))
      ) {
        event.preventDefault();
        setFocused(true);
        inputRef.current?.focus();
      }
      if (event.key === "Escape") setFocused(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (href: string) => {
    setFocused(false);
    router.push(href);
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setSelected((s) => Math.min(s + 1, hits.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (event.key === "Enter") {
      event.preventDefault();
      const hit = hits[selected] ?? hits[0];
      if (hit) go(hit.entry.href);
    } else if (event.key === "Escape") {
      setFocused(false);
      inputRef.current?.blur();
    }
  };

  return (
    <div className="docs-search" ref={boxRef}>
      <div className={open ? "docs-search-bar is-open" : "docs-search-bar"}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          placeholder={ui.searchPlaceholder}
          aria-label={ui.searchAria}
          value={query}
          role="combobox"
          aria-expanded={open}
          aria-controls="docs-search-results"
          aria-activedescendant={
            open && hits[selected] ? `docs-hit-${selected}` : undefined
          }
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(0);
          }}
          onFocus={() => setFocused(true)}
          onKeyDown={onInputKeyDown}
        />
        {query && (
          <button
            type="button"
            className="docs-search-clear"
            aria-label={ui.clearSearch}
            onClick={() => {
              setQuery("");
              setFocused(true);
              inputRef.current?.focus();
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        )}
        <kbd className="docs-search-kbd">/</kbd>
      </div>

      {open && (
        <div className="docs-search-panel" id="docs-search-results" role="listbox">
          {hits.length > 0 ? (
            <>
              <p className="docs-search-count">
                {hits.length} {ui.resultsFor} “{raw}”
              </p>
              {hits.slice(0, SHOWN_HITS).map((hit, index) => (
                <button
                  type="button"
                  key={hit.entry.href}
                  id={`docs-hit-${index}`}
                  role="option"
                  aria-selected={index === selected}
                  className={
                    index === selected ? "docs-search-item is-selected" : "docs-search-item"
                  }
                  onMouseEnter={() => setSelected(index)}
                  onClick={() => go(hit.entry.href)}
                >
                  <span className="docs-search-item-head">
                    <span className="docs-search-item-title">{hit.entry.title}</span>
                    <span className="docs-search-item-section">{hit.entry.section}</span>
                  </span>
                  <span className="docs-search-item-snippet">
                    {highlight(hit.snippet, terms, fold(hit.snippet))}
                  </span>
                </button>
              ))}
              {hits.length > SHOWN_HITS && (
                <p className="docs-search-more">
                  {ui.showing} {hits.length}…
                </p>
              )}
            </>
          ) : (
            <p className="docs-search-empty">
              {ui.noResults} “{raw}”
            </p>
          )}
        </div>
      )}
    </div>
  );
}
