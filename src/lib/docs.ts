import fs from "fs";
import path from "path";

const DOCS_DIR = path.join(process.cwd(), "docs");

export interface DocEntry {
  slug: string;
  title: string;
  description: string;
  content: string;
  lang: string;
}

export interface DocFile {
  content: string;
  title: string;
}

const LANG_META: Record<string, string> = {
  en: "English",
  de: "Deutsch",
  es: "Español",
};

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
    return line.replace(/^[#\s]*/, "").trim();
  }
  return "";
}

function scanDocs(dir: string, lang: string, baseSlug: string = ""): DocEntry[] {
  const docs: DocEntry[] = [];
  if (!fs.existsSync(dir)) return docs;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "SUMMARY.md") continue;
    if (entry.isDirectory()) {
      docs.push(...scanDocs(path.join(dir, entry.name), lang, `${baseSlug}${entry.name}/`));
    } else if (entry.name.endsWith(".md")) {
      const fp = path.join(dir, entry.name);
      const content = fs.readFileSync(fp, "utf-8");
      const slug = `${baseSlug}${entry.name.replace(/\.md$/, "")}`;
      docs.push({
        slug,
        title: extractTitle(content),
        description: extractDescription(content),
        content,
        lang,
      });
    }
  }
  return docs;
}

export function getAllDocs(): DocEntry[] {
  const docs: DocEntry[] = [];
  for (const [lang] of Object.entries(LANG_META)) {
    docs.push(...scanDocs(path.join(DOCS_DIR, lang), lang));
  }
  return docs;
}

export function getDocBySlug(slug: string, lang: string): DocFile | null {
  const fp = path.join(DOCS_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(fp)) return null;
  const content = fs.readFileSync(fp, "utf-8");
  return { content, title: extractTitle(content) };
}

export function getLangMeta(): Record<string, string> {
  return LANG_META;
}
