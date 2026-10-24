export default function SectionHeader({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  id: string;
}) {
  return (
    <header className="xf-sec-head" data-reveal>
      <p className="xf-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {lead ? <p className="xf-sec-lead">{lead}</p> : null}
    </header>
  );
}
