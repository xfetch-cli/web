import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DocArticle from "@/components/docs/DocArticle";
import {
  DOCS_LANGS,
  getDocBySlug,
  getLangData,
  getPrevNext,
  type NavItem,
} from "@/lib/docs";

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { lang: string; slug: string[] }[] = [];
  for (const lang of DOCS_LANGS) {
    const data = getLangData(lang);
    if (!data) continue;
    for (const page of data.bySlug.values()) {
      params.push({ lang, slug: page.slug.split("/") });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const slugStr = slug.join("/");
  const doc = getDocBySlug(slugStr, lang);
  if (!doc) return { title: "Not found" };
  return {
    title: `${doc.title} — xfetch docs`,
    description: doc.description || "xfetch documentation",
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string[] }>;
}) {
  const { lang, slug } = await params;
  const slugStr = slug.join("/");
  const doc = getDocBySlug(slugStr, lang);
  if (!doc) notFound();

  const data = getLangData(lang);
  if (!data) notFound();

  const { prev, next } = getPrevNext(lang, slugStr);

  const parentSlug = slugStr.includes("/") ? slugStr.split("/")[0] : null;
  const parentPage = parentSlug ? getDocBySlug(parentSlug, lang) : null;
  const parent: NavItem | null = parentPage
    ? { slug: parentPage.slug, href: parentPage.href, title: parentPage.navTitle }
    : null;

  return (
    <DocArticle
      doc={doc}
      parent={parent}
      prev={prev}
      next={next}
      langs={[...DOCS_LANGS]}
      slugs={Array.from(data.bySlug.keys())}
    />
  );
}
