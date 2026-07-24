"use client";

import Link from "next/link";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
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

export default function DocViewer({
  content,
  title,
  slug,
  lang,
  langMeta,
  allDocs,
}: {
  content: string;
  title: string;
  slug: string;
  lang: string;
  langMeta: Record<string, string>;
  allDocs: DocEntry[];
}) {
  const otherLangs = useMemo(
    () =>
      Object.keys(langMeta)
        .filter((l) => l !== lang)
        .filter((l) => allDocs.some((d) => d.slug === slug && d.lang === l)),
    [langMeta, lang, allDocs, slug],
  );

  return (
    <div className="min-h-screen">
      <div className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        <div className="mb-8">
          <Link
            href="/docs"
            className="inline-flex items-center gap-1.5 text-xs text-fg2 no-underline hover:text-accent transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back to docs
          </Link>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-md border border-bg3/60 bg-bg/90 px-2.5 py-0.5 text-[11px] font-medium text-fg2 uppercase tracking-wider">
            <LangFlag lang={lang} size={12} />
            {langMeta[lang]}
          </span>
          {otherLangs.map((l) => (
            <Link
              key={l}
              href={`/docs/${l}/${slug}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-bg3/60 bg-bg/90 px-2.5 py-0.5 text-[11px] font-medium text-fg2 no-underline uppercase tracking-wider hover:border-accent/40 hover:text-accent transition-colors"
            >
              <LangFlag lang={l} size={12} />
              {langMeta[l]}
            </Link>
          ))}
        </div>

        <div className="doc-article">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
