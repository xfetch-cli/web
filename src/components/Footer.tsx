import { REPO_URL, VERSION } from "@/components/landing/links";

const LINKS = [
  { href: REPO_URL, label: "GitHub" },
  { href: "https://dev.xscriptor.com", label: "Dev" },
  { href: "https://www.xscriptor.com", label: "Xscriptor" },
  { href: `${REPO_URL}/blob/main/LICENSE`, label: "MIT License" },
  { href: `${REPO_URL}/blob/main/CONTRIBUTING.md`, label: "Contributing" },
];

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Footer() {
  return (
    <footer className="xf-footer">
      <div className="xf-container xf-footer-inner">
        <div className="xf-footer-brand">
          {/* eslint-disable-next-line @next/next/no-img-element -- local SVG wordmark; next/image would need dangerouslyAllowSVG */}
          <img
            src={`${base}/brand/xfetch-logo.svg`}
            alt="xfetch"
            width={800}
            height={144}
            className="xf-footer-logo"
          />
          <p className="xf-footer-made">
            Made with Rust &amp; passion by <strong>X</strong>
          </p>
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
