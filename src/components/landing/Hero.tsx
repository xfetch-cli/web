import { IconGithub } from "@/components/Icons";
import { REPO_URL } from "./links";
import HeroVisual from "./HeroVisual";

const FACTS = ["JSONC config", "WASM sandbox", "9 layouts", "6 targets", "live daemon"];

export default function Hero() {
  return (
    <section className="xf-hero" aria-labelledby="hero-title">
      <div className="xf-container xf-hero-grid">
        <div className="xf-hero-copy">
          {/* eslint-disable-next-line @next/next/no-img-element -- remote SVG banner; next/image would need remotePatterns + dangerouslyAllowSVG */}
          <img
            src="https://raw.githubusercontent.com/xfetch-cli/assets/main/logo/banner/xfetch.svg"
            alt="xfetch banner"
            width={1000}
            height={175}
            className="xf-hero-banner"
            decoding="async"
          />

          <p className="xf-eyebrow xf-hero-eyebrow">
            Rust <span aria-hidden="true">/</span> cross-platform system fetcher
          </p>

          <h1 id="hero-title" className="xf-hero-title">
            System information,
            <br />
            <span className="xf-hero-title-accent">rendered with precision.</span>
          </h1>

          <p className="xf-hero-lead">
            A cross-platform system information fetching tool written in Rust.
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

          <ul className="xf-facts" role="list" aria-label="xfetch highlights">
            {FACTS.map((fact) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
