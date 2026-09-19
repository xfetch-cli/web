import type { Metadata } from "next";
import Link from "next/link";
import LangFlag from "@/components/docs/LangFlag";
import { DOCS_LANGS, LANG_META, getLangData } from "@/lib/docs";

export const metadata: Metadata = {
  title: "Documentation — xfetch",
  description:
    "Reference manual for xfetch: installation, configuration, modules, layouts, themes, plugins and extensions.",
};

const POPULAR = [
  { slug: "getting-started", title: "Getting Started", hint: "Install and first run" },
  { slug: "configuration", title: "Configuration", hint: "Config file and all fields" },
  { slug: "modules", title: "Modules", hint: "Every module reference" },
  { slug: "layouts", title: "Layouts", hint: "All layout styles" },
  { slug: "plugins", title: "Plugins", hint: "Plugin architecture and API" },
  { slug: "themes", title: "Themes", hint: "Theme format and registry" },
];

export default function DocsPortalPage() {
  const languages = DOCS_LANGS.map((lang) => ({ lang, data: getLangData(lang) }));

  return (
    <div className="mx-auto w-full max-w-5xl px-6 pt-28 pb-20">
      <header className="mb-10">
        <p className="m-0 font-mono text-xs uppercase tracking-[0.2em] text-accent">xfetch</p>
        <h1 className="m-0 mt-2 text-3xl font-bold">Documentation</h1>
        <p className="m-0 mt-3 max-w-[62ch] text-sm leading-relaxed text-fg2">
          The complete reference manual for xfetch — installation, configuration,
          modules, layouts, themes, plugins and extensions. Available in three
          languages.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-3">
        {languages.map(({ lang, data }) => {
          if (!data) return null;
          return (
            <Link key={lang} href={`/docs/${lang}`} className="docs-portal-card group">
              <div className="flex items-center gap-2.5">
                <LangFlag lang={lang} size={20} />
                <h2 className="m-0 text-base font-semibold text-fg group-hover:text-accent transition-colors">
                  {LANG_META[lang]}
                </h2>
              </div>
              <p className="m-0 mt-2 line-clamp-3 text-xs leading-relaxed text-fg2">
                {data.hub.description}
              </p>
              <ul className="m-0 mt-3 grid list-none gap-1.5 p-0">
                {data.groups.slice(0, 3).map((group) => (
                  <li
                    key={group.key}
                    className="flex items-center justify-between text-[11px] text-fg2"
                  >
                    <span>{group.label}</span>
                    <span className="text-fg2/60">{group.items.length}</span>
                  </li>
                ))}
              </ul>
              <p className="m-0 mt-4 flex items-center justify-between border-t border-bg3/60 pt-3 text-xs text-accent">
                {data.pages.length} documents
                <span>Browse →</span>
              </p>
            </Link>
          );
        })}
      </div>

      <section className="mt-12">
        <h2 className="m-0 text-xs font-semibold uppercase tracking-wider text-fg2">
          Popular in English
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {POPULAR.map((item) => (
            <Link
              key={item.slug}
              href={`/docs/en/${item.slug}`}
              className="docs-portal-link group"
            >
              <span className="text-sm font-medium text-fg group-hover:text-accent transition-colors">
                {item.title}
              </span>
              <span className="text-[11px] text-fg2">{item.hint}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
