import type { CSSProperties } from "react";
import SectionHeader from "./SectionHeader";
import { PHASES } from "./data";

const STATUS_LABEL: Record<string, string> = {
  done: "Done",
  partial: "In progress",
  planned: "Planned",
};

export default function RoadmapSection() {
  return (
    <section id="roadmap" className="xf-section" aria-labelledby="roadmap-title">
      <div className="xf-container">
        <SectionHeader
          id="roadmap-title"
          eyebrow="Direction"
          title="Roadmap"
          lead="What's next for xfetch — from real-time stats in daemon mode to config hot-reload. Contributions welcome!"
        />

        <div className="xf-roadmap-legend" data-reveal>
          <span><i className="is-done" aria-hidden="true" /> Done</span>
          <span><i className="is-partial" aria-hidden="true" /> In progress</span>
        </div>

        <ol className="xf-timeline" role="list">
          {PHASES.map((phase, index) => (
            <li
              key={phase.title}
              className={`xf-phase is-${phase.status}`}
              data-reveal
              style={{ "--reveal-delay": `${Math.min(index, 8) * 35}ms` } as CSSProperties}
            >
              <span className="xf-phase-marker" aria-hidden="true" />
              <div className="xf-phase-body">
                <div className="xf-phase-head">
                  <h3>{phase.title}</h3>
                  <span className="xf-status">{STATUS_LABEL[phase.status]}</span>
                </div>
                <p>{phase.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
