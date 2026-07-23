import type { Metadata } from "next";
import { getAllDocs, getDocBySlug, getLangMeta } from "@/lib/docs";
import DocViewer from "./DocViewer";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  const docs = getAllDocs();
  return docs.map((d) => ({ lang: d.lang, slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const langMeta = getLangMeta();
  if (!langMeta[lang]) return { title: "Not found" };
  const doc = getDocBySlug(slug, lang);
  if (!doc) return { title: "Not found" };
  return {
    title: `${doc.title} — xfetch docs`,
    description: doc.content
      .split("\n")
      .find((l) => l.trim() && !l.startsWith("#"))
      ?.replace(/^[#\s]*/, "")
      .trim() ?? "xfetch documentation",
  };
}

export default async function DocPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const langMeta = getLangMeta();

  if (!langMeta[lang]) notFound();

  const doc = getDocBySlug(slug, lang);
  if (!doc) notFound();

  const allDocs = getAllDocs();

  return (
    <DocViewer
      content={doc.content}
      title={doc.title}
      slug={slug}
      lang={lang}
      langMeta={langMeta}
      allDocs={allDocs}
    />
  );
}
