"use client";

import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { useEffect, useMemo, useRef, useState } from "react";
import type { DocPage, NavItem } from "@/lib/docs";
import { docsUI, LANG_META } from "@/lib/docs-ui";
import LangFlag from "./LangFlag";

interface Section {
  id: string | null;
  title: string;
  level: number;
  content: string[];
}

function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function stripInline(markdown: string): string {
  return markdown
    .replace(/`([^`]*)`/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[*_~]/g, "")
    .trim();
}

function stripLeadingTitle(content: string): string {
  const match = /^\s*#\s+.*(?:\n|$)/.exec(content);
  return match ? content.slice(match[0].length) : content;
}

function splitSections(body: string): Section[] {
  const sections: Section[] = [];
  const seen = new Map<string, number>();
  let current: Section = { id: null, title: "", level: 0, content: [] };
  let fence = false;

  for (const line of body.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) fence = !fence;
    const match = !fence && /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (match) {
      sections.push(current);
      const title = stripInline(match[2]);
      let id = slugify(title);
      const count = seen.get(id) ?? 0;
      seen.set(id, count + 1);
      if (count > 0) id = `${id}-${count}`;
      current = { id, title, level: match[1].length, content: [] };
    } else {
      current.content.push(line);
    }
  }
  sections.push(current);
  return sections;
}

function resolveDocHref(
  href: string,
  currentSlug: string,
  lang: string,
  slugs: Set<string>,
): string {
  if (!href) return href;
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  if (href.startsWith("/")) return href;

  const [rawTarget, anchor] = href.split("#");
  const target = rawTarget.replace(/^\.\//, "");
  if (!target) return href;
  const suffix = anchor !== undefined ? `#${anchor}` : "";

  const dir = currentSlug.includes("/")
    ? currentSlug.slice(0, currentSlug.lastIndexOf("/"))
    : "";
  const parts = (dir ? dir.split("/") : []).concat(target.split("/"));
  const out: string[] = [];
  for (const part of parts) {
    if (part === "" || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  const slug = out.join("/").replace(/\.md$/, "");
  if (slug && slugs.has(slug)) return `/docs/${lang}/${slug}${suffix}`;
  if (slug && slugs.has(`${slug}/README`)) return `/docs/${lang}/${slug}/README${suffix}`;
  return `/docs/${lang}/${slug}${suffix}`;
}

export default function DocArticle({
  doc,
  parent,
  prev,
  next,
  langs,
  slugs,
}: {
  doc: DocPage;
  parent: NavItem | null;
  prev: NavItem | null;
  next: NavItem | null;
  langs: string[];
  slugs: string[];
}) {
  const ui = docsUI(doc.lang);
  const lang = doc.lang;
  const slugSet = useMemo(() => new Set(slugs), [slugs]);
  const sections = useMemo(
    () => splitSections(stripLeadingTitle(doc.content)),
    [doc.content],
  );
  const toc = useMemo(
    () => sections.filter((s): s is Section & { id: string } => Boolean(s.id)),
    [sections],
  );
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = toc.map((s) => s.id);
    if (ids.length === 0) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      let currentId = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) currentId = id;
        else break;
      }
      setActive(currentId);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [toc]);

  const components = useMemo<Components>(() => {
    function CodeBlock({ children }: { children?: React.ReactNode }) {
      const ref = useRef<HTMLPreElement>(null);
      const [copied, setCopied] = useState(false);
      const copy = async () => {
        const text = ref.current?.innerText ?? "";
        try {
          await navigator.clipboard.writeText(text);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1600);
        } catch {
          setCopied(false);
        }
      };
      return (
        <div className="doc-code">
          <button type="button" className="doc-copy" onClick={copy}>
            {copied ? ui.copied : ui.copy}
          </button>
          <pre ref={ref}>{children}</pre>
        </div>
      );
    }

    return {
      pre: CodeBlock,
      a: ({ href, children }) => {
        const resolved = resolveDocHref(href ?? "", doc.slug, lang, slugSet);
        if (/^(https?:|mailto:|tel:)/.test(resolved)) {
          return (
            <a href={resolved} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          );
        }
        return <Link href={resolved}>{children}</Link>;
      },
      table: ({ children }) => (
        <div className="doc-table-wrap">
          <table>{children}</table>
        </div>
      ),
    };
  }, [doc.slug, lang, slugSet, ui]);

  return (
    <article className="doc-article">
      <header className="doc-head">
        <div className="doc-breadcrumb">
          <Link href={`/docs/${lang}`}>{ui.docs}</Link>
          {parent && (
            <>
              <span aria-hidden="true">/</span>
              <Link href={parent.href}>{parent.title}</Link>
            </>
          )}
          <span aria-hidden="true">/</span>
          <span className="doc-breadcrumb-current">{doc.navTitle}</span>
        </div>

        <div className="doc-head-row">
          <h1 className="doc-title">{doc.title}</h1>
          <div className="doc-langs" aria-label={ui.language}>
            {langs.map((l) => (
              <Link
                key={l}
                href={`/docs/${l}/${doc.slug}`}
                className={l === lang ? "doc-lang is-active" : "doc-lang"}
                aria-current={l === lang ? "true" : undefined}
                title={LANG_META[l] ?? l}
              >
                <LangFlag lang={l} size={14} />
                <span>{l.toUpperCase()}</span>
              </Link>
            ))}
          </div>
        </div>
      </header>

      <div className={toc.length > 0 ? "doc-layout has-toc" : "doc-layout"}>
        <div className="doc-prose">
          {sections.map((section, index) =>
            section.level > 0 ? (
              <section
                key={section.id ?? index}
                id={section.id ?? undefined}
                className={section.level === 3 ? "doc-section is-sub" : "doc-section"}
              >
                {section.level === 2 ? (
                  <h2>
                    {section.title}
                    <a
                      className="doc-anchor"
                      href={`#${section.id}`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      #
                    </a>
                  </h2>
                ) : (
                  <h3>
                    {section.title}
                    <a
                      className="doc-anchor"
                      href={`#${section.id}`}
                      tabIndex={-1}
                      aria-hidden="true"
                    >
                      #
                    </a>
                  </h3>
                )}
                {section.content.join("\n").trim() !== "" && (
                  <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
                    {section.content.join("\n")}
                  </ReactMarkdown>
                )}
              </section>
            ) : (
              section.content.join("\n").trim() !== "" && (
                <ReactMarkdown
                  key={`intro-${index}`}
                  remarkPlugins={[remarkGfm]}
                  components={components}
                >
                  {section.content.join("\n")}
                </ReactMarkdown>
              )
            ),
          )}
        </div>

        {toc.length > 0 && (
          <aside className="doc-toc">
            <p className="doc-toc-title">{ui.onThisPage}</p>
            <ul className="doc-toc-list">
              {toc.map((section) => (
                <li
                  key={section.id}
                  className={section.level === 3 ? "is-sub" : undefined}
                >
                  <a
                    href={`#${section.id}`}
                    className={active === section.id ? "is-active" : undefined}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>

      {(prev || next) && (
        <nav className="doc-pager" aria-label="Continue reading">
          {prev ? (
            <Link href={prev.href} className="doc-pager-link is-prev">
              <span className="doc-pager-label">← {ui.previous}</span>
              <span className="doc-pager-title">{prev.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link href={next.href} className="doc-pager-link is-next">
              <span className="doc-pager-label">{ui.next} →</span>
              <span className="doc-pager-title">{next.title}</span>
            </Link>
          ) : (
            <span />
          )}
        </nav>
      )}

      <footer className="doc-foot">
        <span>
          {ui.source}: <code>{doc.sourcePath}</code>
        </span>
        <Link href={`/docs/${lang}`}>{ui.allDocs} →</Link>
      </footer>
    </article>
  );
}
