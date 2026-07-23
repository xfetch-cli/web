"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import type { DocEntry } from "@/lib/docs";

function LangFlag({ lang, size = 16 }: { lang: string; size?: number }) {
  const w = size;
  const h = Math.round(size * 0.667);
  switch (lang) {
    case "en":
      return (
        <svg width={w} height={h} viewBox="0 0 60 40" fill="none" aria-label="English">
          <rect width="60" height="40" fill="#012169" />
          <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="6" />
          <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="2.5" />
          <rect x="26" y="0" width="8" height="40" fill="#fff" />
          <rect x="0" y="16" width="60" height="8" fill="#fff" />
          <rect x="27" y="0" width="6" height="40" fill="#C8102E" />
          <rect x="0" y="17" width="60" height="6" fill="#C8102E" />
        </svg>
      );
    case "de":
      return (
        <svg width={w} height={h} viewBox="0 0 60 40" fill="none" aria-label="Deutsch">
          <rect width="60" height="13.33" fill="#000" />
          <rect y="13.33" width="60" height="13.33" fill="#DD0000" />
          <rect y="26.66" width="60" height="13.34" fill="#FFCE00" />
        </svg>
      );
    case "es":
      return (
        <svg width={w} height={h} viewBox="0 0 60 40" fill="none" aria-label="Español">
          <rect width="60" height="40" fill="#C60B1E" />
          <rect y="10" width="60" height="20" fill="#FFC400" />
        </svg>
      );
    default:
      return null;
  }
}

export default function DocsClient({
  docs,
  langMeta,
}: {
  docs: DocEntry[];
  langMeta: Record<string, string>;
}) {
  const [search, setSearch] = useState("");
  const [langFilter, setLangFilter] = useState("all");

  const langs = useMemo(
    () => ["all", ...Object.keys(langMeta)],
    [langMeta],
  );

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return docs.filter((d) => {
      if (langFilter !== "all" && d.lang !== langFilter) return false;
      if (!q) return true;
      return (
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.slug.toLowerCase().includes(q) ||
        d.content.toLowerCase().includes(q)
      );
    });
  }, [docs, search, langFilter]);

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-5xl px-6 pt-28 pb-20">
        <div className="mb-10">
          <h1 className="m-0 text-2xl font-bold">Documentation</h1>
        </div>

        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <input
            type="search"
            placeholder="Search documentation..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-bg3/60 bg-bg/90 px-4 py-2.5 text-sm text-fg placeholder-fg2 outline-none transition-colors focus:border-accent/50"
          />

          <div className="flex gap-1.5 flex-wrap">
            {langs.map((l) => (
              <button
                key={l}
                onClick={() => setLangFilter(l)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-medium transition-all ${
                  langFilter === l
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-bg3/60 bg-bg/90 text-fg2 hover:border-accent/40"
                }`}
              >
                {l === "all" ? "All" : <><LangFlag lang={l} size={14} /> {langMeta[l]}</>}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-bg3/60 bg-bg/90 p-10 text-center">
            <p className="text-fg2 text-sm">
              No documentation found for your search.
            </p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((doc) => (
              <Link
                key={`${doc.lang}-${doc.slug}`}
                href={`/docs/${doc.lang}/${doc.slug}`}
                className="group block rounded-lg border border-bg3/60 bg-bg/90 p-4 no-underline transition-all hover:border-accent/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="grid gap-1.5 min-w-0">
                    <h3 className="m-0 text-sm font-semibold text-fg group-hover:text-accent transition-colors truncate">
                      {doc.title}
                    </h3>
                    <p className="m-0 text-xs text-fg2 leading-relaxed line-clamp-2">
                      {doc.description}
                    </p>
                  </div>
                  <span className="shrink-0 inline-flex items-center gap-1 rounded-md border border-bg3/60 bg-bg/90 px-2 py-0.5 text-[10px] font-medium text-fg2 uppercase tracking-wider">
                    <LangFlag lang={doc.lang} size={10} />
                    {doc.lang}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-6 text-center text-xs text-fg2/50">
          {filtered.length} of {docs.length} documents
        </div>
      </div>
    </div>
  );
}
