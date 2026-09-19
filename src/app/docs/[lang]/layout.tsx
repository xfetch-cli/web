import { notFound } from "next/navigation";
import DocsShell from "@/components/docs/DocsShell";
import DocsSearch from "@/components/docs/DocsSearch";
import { DOCS_LANGS, getLangData } from "@/lib/docs";

export function generateStaticParams() {
  return DOCS_LANGS.map((lang) => ({ lang }));
}

export default async function DocsLangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const data = getLangData(lang);
  if (!data) notFound();

  return (
    <DocsShell lang={lang} groups={data.groups}>
      <DocsSearch lang={lang} entries={data.search} />
      {children}
    </DocsShell>
  );
}
