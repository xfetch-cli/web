import { getAllDocs, getLangMeta } from "@/lib/docs";
import DocsClient from "./DocsClient";

export default function DocsPage() {
  const docs = getAllDocs();
  const langMeta = getLangMeta();
  return <DocsClient docs={docs} langMeta={langMeta} />;
}
