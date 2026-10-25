import { REPO_URL, VERSION } from "@/components/landing/links";

const LINKS = [
  { href: REPO_URL, label: "GitHub" },
  { href: "https://dev.xscriptor.com", label: "Dev" },
  { href: "https://www.xscriptor.com", label: "Xscriptor" },
  { href: `${REPO_URL}/blob/main/LICENSE`, label: "MIT License" },
  { href: `${REPO_URL}/blob/main/CONTRIBUTING.md`, label: "Contributing" },
];

export default function Footer() {
  return (
    <footer className="xf-footer">
      <div className="xf-container xf-footer-inner">
        <div className="xf-footer-brand">
          <span className="xf-footer-mark" aria-hidden="true">
            xf
          </span>
          <div>
            <p className="xf-footer-title">xfetch</p>
            <p className="xf-footer-made">
              Made with Rust &amp; passion by <strong>X</strong>
            </p>
          </div>
        </div>

        <nav className="xf-footer-links" aria-label="Footer navigation">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="xf-footer-link"
            >
              {link.label}
            </a>
          ))}
          <a className="xf-footer-link" href="#content">
            Back to top
          </a>
        </nav>

        <p className="xf-footer-version">xfetch v{VERSION} — Rust 2024 edition</p>
      </div>
    </footer>
  );
}
