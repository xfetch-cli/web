"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#features", label: "Features" },
  { href: "#terminal", label: "Demo" },
  { href: "#install", label: "Install" },
  { href: "#layouts", label: "Layouts" },
  { href: "#config", label: "Configure" },
  { href: "#plugins", label: "Plugins" },
  { href: "#roadmap", label: "Roadmap" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 flex h-14 w-full items-center justify-center transition-all duration-300 ${
        scrolled
          ? "border-b border-white/[0.06] bg-bg/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="flex w-full max-w-5xl items-center gap-8 px-6">
        <a href="#" className="font-mono font-bold text-accent text-lg shrink-0">
          xfetch
        </a>
        <div className="hidden sm:flex items-center gap-6 ml-auto">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-fg2 transition-colors hover:text-fg"
            >
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
