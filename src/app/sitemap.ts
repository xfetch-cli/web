import { getAllDocs } from "@/lib/docs";

export default async function sitemap() {
  const docs = getAllDocs();
  const base = "https://xfetch-cli.github.io/web";

  const docUrls = docs.map((d) => ({
    url: `${base}/docs/${d.lang}/${d.slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: base, lastModified: new Date() },
    { url: `${base}/docs`, lastModified: new Date() },
    ...docUrls,
  ];
}
