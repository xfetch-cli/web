import { DOCS_LANGS, getLangData } from "@/lib/docs";

export const dynamic = "force-static";

export default async function sitemap() {
  const base = "https://xfetch-cli.github.io/web";
  const urls: { url: string; lastModified: Date }[] = [
    { url: base, lastModified: new Date() },
    { url: `${base}/docs`, lastModified: new Date() },
  ];

  for (const lang of DOCS_LANGS) {
    const data = getLangData(lang);
    if (!data) continue;
    urls.push({ url: `${base}/docs/${lang}`, lastModified: new Date() });
    for (const page of data.pages) {
      urls.push({ url: `${base}${page.href}`, lastModified: new Date() });
    }
  }

  return urls;
}
