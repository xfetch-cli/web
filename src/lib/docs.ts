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

export function getAllDocs(): DocEntry[] {
  const docs: DocEntry[] = [];
  for (const [lang] of Object.entries(LANG_META)) {
    const dir = path.join(DOCS_DIR, lang);
    if (!fs.existsSync(dir)) continue;
    for (const file of fs.readdirSync(dir)) {
      if (!file.endsWith(".md") || file === "SUMMARY.md") continue;
      const content = fs.readFileSync(path.join(dir, file), "utf-8");
      const slug = file.replace(/\.md$/, "");
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

export function getDocBySlug(slug: string, lang: string): DocFile | null {
  const fp = path.join(DOCS_DIR, lang, `${slug}.md`);
  if (!fs.existsSync(fp)) return null;
  const content = fs.readFileSync(fp, "utf-8");
  return { content, title: extractTitle(content) };
}

export function getLangMeta(): Record<string, string> {
  return LANG_META;
}
