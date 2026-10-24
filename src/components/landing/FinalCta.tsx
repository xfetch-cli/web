import Link from "next/link";
import { IconGithub } from "@/components/Icons";
import { REPO_URL } from "./links";

export default function FinalCta() {
  return (
    <section className="xf-cta" aria-labelledby="cta-title">
      <div className="xf-cta-grid" aria-hidden="true" />
      <div className="xf-container xf-cta-inner" data-reveal>
        <p className="xf-eyebrow">Open source · MIT</p>
        <h2 id="cta-title">
          Build it, theme it,
          <br />
          <span>extend it.</span>
        </h2>
        <p className="xf-cta-lead">
          One Rust binary, a JSONC config, and a JSON protocol for plugins, effects and
          extensions. Fork it, ship a theme, or write the next module.
        </p>
        <div className="xf-cta-actions">
          <a
            className="xf-btn xf-btn--primary"
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGithub size={17} />
            View Source Code
          </a>
          <Link className="xf-btn xf-btn--ghost" href="/docs">
            Read the docs
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
