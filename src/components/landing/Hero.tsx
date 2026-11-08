import { IconGithub } from "@/components/Icons";
import { REPO_URL } from "./links";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  return (
    <section className="xf-hero" aria-labelledby="hero-title">
      <div className="xf-container xf-hero-copy">
        <h1 id="hero-title" className="xf-hero-title">
          System information,
          <br />
          <span className="xf-hero-title-accent">rendered with precision.</span>
        </h1>

        <p className="xf-hero-lead">
          One binary, 18 modules and 16 layouts — your system, drawn in the terminal.
        </p>

        <div className="xf-hero-actions">
          <a className="xf-btn xf-btn--primary" href="#install">
            Install xfetch
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
          <a
            className="xf-btn xf-btn--ghost"
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGithub size={16} />
            View on GitHub
          </a>
        </div>
      </div>

      <HeroVisual />
    </section>
  );
}
