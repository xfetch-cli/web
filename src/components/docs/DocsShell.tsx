"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { NavGroup } from "@/lib/docs";
import { docsUI } from "@/lib/docs-ui";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

function cleanPath(pathname: string): string {
  let p = pathname;
  if (BASE && p.startsWith(BASE)) p = p.slice(BASE.length);
  return p.replace(/\/+$/, "") || "/";
}

export default function DocsShell({
  lang,
  groups,
  children,
}: {
  lang: string;
  groups: NavGroup[];
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const current = cleanPath(pathname);
  const ui = docsUI(lang);
  const [open, setOpen] = useState(false);
  const asideRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const aside = asideRef.current;
    if (!aside) return;
    const el = aside.querySelector<HTMLElement>('[data-active="true"]');
    if (!el) return;
    aside.scrollTop = Math.max(0, el.offsetTop - aside.clientHeight / 2 + el.clientHeight / 2);
  }, [current]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const nav = (
    <nav className="docs-nav" aria-label={ui.documentation}>
      {groups.map((group) => (
        <div className="docs-nav-group" key={group.key}>
          <p className="docs-nav-title">
            <span>{group.label}</span>
            <span className="docs-nav-count">{group.items.length}</span>
          </p>
          <ul className="docs-nav-list">
            {group.items.map((item) => {
              const active = current === item.href;
              return (
                <li key={item.slug}>
                  <Link
                    href={item.href}
                    className={active ? "docs-nav-item is-active" : "docs-nav-item"}
                    data-active={active ? "true" : undefined}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setOpen(false)}
                  >
                    <span className="docs-nav-dot" aria-hidden="true" />
                    <span className="docs-nav-text">{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 pt-28 pb-20 sm:px-6">
      <button type="button" className="docs-menu-btn" onClick={() => setOpen(true)}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M4 7h16M4 12h16M4 17h10" />
        </svg>
        {ui.docs}
      </button>

      <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)] xl:grid-cols-[264px_minmax(0,1fr)] xl:gap-14">
        <aside ref={asideRef} className="docs-sidebar">
          {nav}
        </aside>

        {open && (
          <div className="docs-mobile" role="dialog" aria-modal="true" aria-label={ui.documentation}>
            <div className="docs-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />
            <div className="docs-drawer">
              <div className="docs-drawer-head">
                <span className="font-mono text-lg font-bold text-accent">xfetch</span>
                <button
                  type="button"
                  className="docs-drawer-close"
                  onClick={() => setOpen(false)}
                  aria-label={ui.closeNav}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    aria-hidden="true"
                  >
                    <path d="M6 6l12 12M18 6 6 18" />
                  </svg>
                </button>
              </div>
              <div className="docs-drawer-body">{nav}</div>
            </div>
          </div>
        )}

        <main className="docs-main min-w-0">{children}</main>
      </div>
    </div>
  );
}
