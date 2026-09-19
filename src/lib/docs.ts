import fs from "fs";
import path from "path";
import {
  DOCS_LANGS,
  GROUP_KEYS,
  GROUP_LABELS,
  LANG_META,
  type GroupKey,
} from "./docs-ui";

const DOCS_DIR = path.join(process.cwd(), "docs");

export { DOCS_LANGS, LANG_META, GROUP_LABELS };
export type { GroupKey };

export interface DocPage {
  slug: string;
  title: string;
  navTitle: string;
  description: string;
  content: string;
  lang: string;
  group: GroupKey;
  sourcePath: string;
  isIndex: boolean;
  href: string;
}

export interface NavItem {
  slug: string;
  href: string;
  title: string;
}

export interface NavGroup {
  key: GroupKey;
  label: string;
  items: NavItem[];
}

export interface SearchEntry {
  slug: string;
  href: string;
  title: string;
  section: string;
  text: string;
}

export interface HubMeta {
  title: string;
  description: string;
  version: string;
  license: string;
  author: string;
  repo: string;
}

export interface LangData {
  lang: string;
  label: string;
  hub: HubMeta;
  groups: NavGroup[];
  pages: DocPage[];
  bySlug: Map<string, DocPage>;
  search: SearchEntry[];
}

export function docsHref(lang: string, slug = ""): string {
  return slug ? `/docs/${lang}/${slug}` : `/docs/${lang}`;
}

export function isDocsLang(lang: string): boolean {
  return DOCS_LANGS.includes(lang as (typeof DOCS_LANGS)[number]);
}

const GROUP_BY_SLUG: Record<string, GroupKey> = {
  "getting-started": "start",
  "gen-config": "start",
  configuration: "reference",
  modules: "reference",
  layouts: "reference",
  "custom-x": "reference",
  presets: "reference",
  themes: "reference",
  "theme-manager": "reference",
  customization: "reference",
  "advanced-usage": "reference",
  plugins: "plugins",
  wasm: "plugins",
  extensions: "extensions",
  effects: "effects",
  contributing: "project",
  roadmap: "project",
  security: "project",
  support: "project",
  changelog: "project",
  "code-of-conduct": "project",
  license: "project",
};

function groupForSlug(slug: string): GroupKey {
  if (GROUP_BY_SLUG[slug]) return GROUP_BY_SLUG[slug];
  if (slug.startsWith("plugins/")) return "plugins";
  if (slug.startsWith("extensions/")) return "extensions";
  if (slug.startsWith("effects/")) return "effects";
  return "more";
}

const ACRONYMS: Record<string, string> = {
  wasm: "WASM",
  ip: "IP",
  gpu: "GPU",
  cpu: "CPU",
  os: "OS",
  de: "DE",
  wm: "WM",
  ui: "UI",
  cli: "CLI",
  gtk: "GTK",
  kde: "KDE",
  mpd: "MPD",
  aur: "AUR",
  api: "API",
  mcp: "MCP",
  github: "GitHub",
  geo: "Geo",
};

function humanize(value: string): string {
  return value
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => ACRONYMS[w.toLowerCase()] ?? w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function extractTitle(content: string): string {
  const m = content.match(/^#\s+(.+)/m);
  return m ? m[1].trim() : "Untitled";
}

function extractDescription(content: string): string {
  const lines = content.split("\n");
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("#")) continue;
    if (line.trim() === "") continue;
    if (line.trim() === "---") continue;
    return line.replace(/^[#\s]*/, "").trim();
  }
  return "";
}

/** Markdown -> plain text used by the client-side search index. */
function toPlainText(content: string): string {
  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]*)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*+]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/<\/?[a-z][^>]*>/gi, " ")
    .replace(/[*_>|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

interface SummaryEntry {
  title: string;
  slug: string;
}

interface SummaryData {
  title: string;
  description: string;
  entries: SummaryEntry[];
  titles: Map<string, string>;
  version: string;
  license: string;
  author: string;
  repo: string;
}

function parseSummary(content: string): SummaryData {
  const lines = content.split("\n");
  const title = lines.find((l) => l.startsWith("# "))?.slice(2).trim() ?? "";
  const description =
    lines
      .slice(1)
      .find(
        (l) =>
          l.trim() !== "" &&
          !l.startsWith("#") &&
          !l.startsWith("-") &&
          !l.startsWith("*") &&
          !l.startsWith("---"),
      )
      ?.trim() ?? "";

  const entries: SummaryEntry[] = [];
  const titles = new Map<string, string>();
  const linkRe = /^\d+\.\s+\[([^\]]+)\]\(([^)]+?)(?:#[^)]*)?\)/gm;
  let m: RegExpExecArray | null;
  while ((m = linkRe.exec(content))) {
    const slug = m[2].replace(/\.md$/, "");
    const entryTitle = m[1].trim();
    entries.push({ title: entryTitle, slug });
    titles.set(slug, entryTitle);
  }

  const bullets = Array.from(
    content.matchAll(/^-\s+\*\*[^*]+:\*\*\s*(.+)$/gm),
    (b) => b[1].trim(),
  );

  return {
    title,
    description,
    entries,
    titles,
    version: bullets[0] ?? "",
    license: bullets[1] ?? "",
    author: bullets[2] ?? "",
    repo: bullets[3] ?? "",
  };
}

function scanDocs(dir: string, lang: string, baseSlug = ""): DocPage[] {
  const docs: DocPage[] = [];
  if (!fs.existsSync(dir)) return docs;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "SUMMARY.md") continue;
    if (entry.isDirectory()) {
      docs.push(...scanDocs(path.join(dir, entry.name), lang, `${baseSlug}${entry.name}/`));
    } else if (entry.name.endsWith(".md")) {
      const fp = path.join(dir, entry.name);
      const content = fs.readFileSync(fp, "utf-8");
      const slug = `${baseSlug}${entry.name.replace(/\.md$/, "")}`;
      const h1 = extractTitle(content);
      const navTitle = slug.includes("/")
        ? humanize(slug.split("/").pop() ?? slug)
        : h1;
      docs.push({
        slug,
        title: h1,
        navTitle,
        description: extractDescription(content),
        content,
        lang,
        group: groupForSlug(slug),
        sourcePath: `${slug}.md`,
        isIndex: entry.name === "README.md",
        href: docsHref(lang, slug),
      });
    }
  }
  return docs;
}

function buildLangData(lang: string): LangData {
  const dir = path.join(DOCS_DIR, lang);
  const summary = parseSummary(
    fs.existsSync(path.join(dir, "SUMMARY.md"))
      ? fs.readFileSync(path.join(dir, "SUMMARY.md"), "utf-8")
      : "",
  );
  const pages = scanDocs(dir, lang);
  const bySlug = new Map(pages.map((p) => [p.slug, p]));

  for (const page of pages) {
    const summaryTitle = summary.titles.get(page.slug);
    if (summaryTitle) page.navTitle = summaryTitle;
  }

  const summarySlugs = summary.entries
    .map((e) => e.slug)
    .filter((s) => bySlug.has(s));
  const known = new Set(summarySlugs);
  const restRoot = pages
    .filter((p) => !p.slug.includes("/") && !known.has(p.slug) && !p.isIndex)
    .map((p) => p.slug)
    .sort();

  const rootOrdered = [...summarySlugs, ...restRoot];
  const itemsByGroup = Object.fromEntries(
    GROUP_KEYS.map((k) => [k, [] as string[]]),
  ) as Record<GroupKey, string[]>;
  for (const slug of rootOrdered) {
    const page = bySlug.get(slug);
    if (page) itemsByGroup[page.group].push(slug);
  }

  const nestedPlugins = pages
    .filter((p) => p.slug.startsWith("plugins/") && !p.isIndex)
    .map((p) => p.slug)
    .sort();
  const nestedExtensions = pages
    .filter((p) => p.slug.startsWith("extensions/") && !p.isIndex)
    .map((p) => p.slug)
    .sort();

  const wasmFirst = itemsByGroup.plugins.filter((s) => s !== "wasm");
  const wasmLinks = itemsByGroup.plugins.filter((s) => s === "wasm");
  itemsByGroup.plugins = [...wasmFirst, ...nestedPlugins, ...wasmLinks];
  itemsByGroup.extensions = [...itemsByGroup.extensions, ...nestedExtensions];

  const labels = GROUP_LABELS[lang] ?? GROUP_LABELS.en;
  const groups: NavGroup[] = GROUP_KEYS.filter(
    (k) => itemsByGroup[k].length > 0,
  ).map((key) => ({
    key,
    label: labels[key],
    items: itemsByGroup[key].map((slug) => {
      const page = bySlug.get(slug)!;
      return { slug, href: page.href, title: page.navTitle };
    }),
  }));

  const orderedPages = GROUP_KEYS.flatMap((k) => itemsByGroup[k])
    .map((slug) => bySlug.get(slug))
    .filter((p): p is DocPage => Boolean(p));

  const search: SearchEntry[] = orderedPages
    .filter((p) => !p.isIndex)
    .map((p) => ({
      slug: p.slug,
      href: p.href,
      title: p.navTitle,
      section: labels[p.group],
      text: toPlainText(p.content),
    }));

  return {
    lang,
    label: LANG_META[lang] ?? lang,
    hub: {
      title: summary.title || "xfetch Documentation",
      description: summary.description,
      version: summary.version,
      license: summary.license,
      author: summary.author,
      repo: summary.repo,
    },
    groups,
    pages: orderedPages,
    bySlug,
    search,
  };
}

const langCache = new Map<string, LangData>();

export function getLangData(lang: string): LangData | null {
  if (!isDocsLang(lang)) return null;
  let data = langCache.get(lang);
  if (!data) {
    data = buildLangData(lang);
    langCache.set(lang, data);
  }
  return data;
}

export function getDocBySlug(slug: string, lang: string): DocPage | null {
  const data = getLangData(lang);
  return data?.bySlug.get(slug) ?? null;
}

export function getAllDocs(): DocPage[] {
  return DOCS_LANGS.flatMap((lang) => getLangData(lang)?.pages ?? []);
}

/** Previous / next page following the sidebar order of a language. */
export function getPrevNext(
  lang: string,
  slug: string,
): { prev: NavItem | null; next: NavItem | null } {
  const data = getLangData(lang);
  if (!data) return { prev: null, next: null };
  const at = data.pages.findIndex((p) => p.slug === slug);
  if (at === -1) return { prev: null, next: null };
  const toItem = (p: DocPage): NavItem => ({
    slug: p.slug,
    href: p.href,
    title: p.navTitle,
  });
  return {
    prev: at > 0 ? toItem(data.pages[at - 1]) : null,
    next: at < data.pages.length - 1 ? toItem(data.pages[at + 1]) : null,
  };
}
