import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import LangFlag from "@/components/docs/LangFlag";
import { DOCS_LANGS, LANG_META, getLangData } from "@/lib/docs";
import { GROUP_DESCRIPTIONS, docsUI } from "@/lib/docs-ui";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const data = getLangData(lang);
  if (!data) return { title: "Not found" };
  return {
    title: `${data.hub.title} — xfetch`,
    description: data.hub.description,
  };
}

export default async function DocsHubPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = getLangData(lang);
  if (!data) notFound();
  const ui = docsUI(lang);
  const descriptions = GROUP_DESCRIPTIONS[lang] ?? GROUP_DESCRIPTIONS.en;

  return (
    <div className="docs-hub">
      <header className="docs-hub-head">
        <h1>{data.hub.title}</h1>
        {data.hub.description && <p className="docs-hub-lead">{data.hub.description}</p>}
        <div className="docs-hub-badges">
          {data.hub.version && <span className="docs-badge">v{data.hub.version}</span>}
          {data.hub.license && <span className="docs-badge">{data.hub.license}</span>}
          <span className="docs-badge">
            {data.pages.length} {ui.documents}
          </span>
        </div>
        <div className="docs-hub-langs">
          {DOCS_LANGS.map((l) => (
            <Link
              key={l}
              href={`/docs/${l}`}
              className={l === lang ? "docs-lang-chip is-active" : "docs-lang-chip"}
              aria-current={l === lang ? "page" : undefined}
            >
              <LangFlag lang={l} size={14} />
              {LANG_META[l]}
            </Link>
          ))}
        </div>
      </header>

      <div className="docs-hub-grid">
        {data.groups.map((group) => {
          const preview = group.items.slice(
            0,
            group.key === "plugins" || group.key === "extensions" ? 4 : 6,
          );
          const remaining = group.items.length - preview.length;
          return (
            <section className="docs-hub-card" key={group.key}>
              <div className="docs-hub-card-head">
                <h2>{group.label}</h2>
                <span className="docs-hub-count">{group.items.length}</span>
              </div>
              <p className="docs-hub-desc">{descriptions[group.key]}</p>
              <ul className="docs-hub-links">
                {preview.map((item) => (
                  <li key={item.slug}>
                    <Link href={item.href}>{item.title}</Link>
                  </li>
                ))}
                {remaining > 0 && (
                  <li className="docs-hub-remaining">+{remaining} more</li>
                )}
              </ul>
              <Link className="docs-hub-more" href={group.items[0].href}>
                {ui.browse} →
              </Link>
            </section>
          );
        })}
      </div>
    </div>
  );
}
