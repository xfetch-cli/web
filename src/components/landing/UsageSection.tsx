import CommandBlock from "./CommandBlock";
import SectionHeader from "./SectionHeader";

export default function UsageSection() {
  return (
    <section id="usage" className="xf-section" aria-labelledby="usage-title">
      <div className="xf-container">
        <div className="xf-usage" data-reveal>
          <SectionHeader
            id="usage-title"
            eyebrow="Run"
            title="Usage"
            lead="Simply run xfetch in your terminal:"
          />
          <CommandBlock code="xfetch" label="run xfetch" className="xf-usage-code" />
        </div>
      </div>
    </section>
  );
}
