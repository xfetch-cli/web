export default function Footer() {
  return (
    <footer className="border-t border-bg3/60 px-6 py-16 text-center">
      <p className="text-sm text-fg2">Made with Rust & passion by <strong className="text-fg">X</strong></p>
      <div className="mt-5 flex flex-wrap justify-center gap-5 text-sm">
        {[
          { href: "https://github.com/xscriptor/xfetch", label: "GitHub" },
          { href: "https://dev.xscriptor.com", label: "Dev" },
          { href: "https://www.xscriptor.com", label: "Xscriptor" },
          { href: "https://github.com/xscriptor/xfetch/blob/main/LICENSE", label: "MIT License" },
          { href: "https://github.com/xscriptor/xfetch/blob/main/CONTRIBUTING.md", label: "Contributing" },
        ].map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-fg2 transition-colors hover:text-accent">{link.label}</a>
        ))}
      </div>
      <p className="mt-6 text-xs text-fg2/60">xfetch v0.2.0 — Rust 2024 edition</p>
    </footer>
  );
}
