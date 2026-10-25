import type { CSSProperties } from "react";
import { renderFeatureIcon } from "@/components/Icons";
import SectionHeader from "./SectionHeader";
import { FEATURES } from "./data";

export default function FeaturesSection() {
  return (
    <section id="features" className="xf-section" aria-labelledby="features-title">
      <div className="xf-container">
        <SectionHeader
          id="features-title"
          eyebrow="Capabilities"
          title="Features"
          lead="From OS detection to animated ASCII art — xfetch packs a punch in a single binary."
        />

        <div className="xf-features">
          {FEATURES.map((feature, index) => (
            <article
              key={feature.key}
              className="xf-feature"
              data-reveal
              style={{ "--reveal-delay": `${Math.min(index, 6) * 45}ms` } as CSSProperties}
            >
              <div className="xf-feature-top">
                <span className="xf-feature-icon" aria-hidden="true">
                  {renderFeatureIcon(feature.icon, 20)}
                </span>
                <span className="xf-feature-num" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              {index === 0 ? (
                <ul className="xf-feature-stats" role="list" aria-label="xfetch at a glance">
                  <li>
                    <strong>18</strong>
                    <span>modules</span>
                  </li>
                  <li>
                    <strong>9</strong>
                    <span>layouts</span>
                  </li>
                  <li>
                    <strong>6</strong>
                    <span>targets</span>
                  </li>
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
