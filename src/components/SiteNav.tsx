"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

type NavItem = {
  href: string;
  label: string;
  section?: string;
};

type Theme = "dark" | "light";

const NAV_ITEMS: NavItem[] = [
  { href: "/#features", label: "Features", section: "features" },
  { href: "/#terminal", label: "Demo", section: "terminal" },
  { href: "/#install", label: "Install", section: "install" },
  { href: "/#layouts", label: "Layouts", section: "layouts" },
  { href: "/previews", label: "Previews" },
  { href: "/#config", label: "Configure", section: "config" },
  { href: "/#plugins", label: "Plugins", section: "plugins" },
  { href: "/#roadmap", label: "Roadmap", section: "roadmap" },
  { href: "/docs", label: "Docs" },
];

// DOM order, not nav order, so the active link follows the page.
const SECTION_IDS = ["install", "features", "terminal", "layouts", "config", "plugins", "roadmap"];

const themeListeners = new Set<() => void>();

function subscribeTheme(callback: () => void) {
  themeListeners.add(callback);
  return () => {
    themeListeners.delete(callback);
  };
}

function getThemeSnapshot(): Theme {
  return document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
}

function getThemeServerSnapshot(): Theme {
  return "dark";
}

function applyTheme(next: Theme) {
  if (next === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  } else {
    document.documentElement.removeAttribute("data-theme");
  }
  try {
    localStorage.setItem("xfetch-theme", next);
  } catch {
    /* storage can be unavailable in private modes */
  }
  themeListeners.forEach((callback) => callback());
}

const SunIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2v2.2M12 19.8V22M4.22 4.22l1.56 1.56M18.22 18.22l1.56 1.56M2 12h2.2M19.8 12H22M4.22 19.78l1.56-1.56M18.22 5.78l1.56-1.56" />
  </svg>
);

const MoonIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

const CloseIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

const MenuIcon = ({ open }: { open: boolean }) => (
  <span className={`xf-menu-icon${open ? " is-open" : ""}`} aria-hidden="true">
    <span />
    <span />
    <span />
  </span>
);

export default function SiteNav() {
  const pathname = usePathname();
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getThemeServerSnapshot);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);
  const scrolledRef = useRef(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    let raf = 0;
    let ticking = false;

    const update = () => {
      ticking = false;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const next = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0;
      if (progressRef.current) progressRef.current.style.width = `${next}%`;

      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      raf = window.requestAnimationFrame(update);
    };

    raf = window.requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    const sections = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (element): element is HTMLElement => element !== null,
    );
    if (sections.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) visible.add(id);
          else visible.delete(id);
        });

        const current = SECTION_IDS.filter((id) => visible.has(id)).pop();
        if (current) {
          setActive(current);
          return;
        }

        // The band can sit in a section without a nav entry (modules, usage,
        // uninstall). Fall back to the last section whose top passed the line.
        const passed = sections
          .map((section) => ({ id: section.id, top: section.offsetTop - window.scrollY }))
          .filter((item) => item.top <= 150)
          .pop();
        setActive(passed?.id ?? "");
      },
      { rootMargin: "-100px 0px -84% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) {
      window.requestAnimationFrame(() => menuButton.current?.focus());
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    const content = document.getElementById("content");
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    content?.setAttribute("inert", "");

    const menu = menuRef.current;
    const focusables = menu
      ? Array.from(
          menu.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        )
      : [];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu(true);
        return;
      }
      if (event.key !== "Tab" || focusables.length === 0) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (menuRef.current?.contains(target) || menuButton.current?.contains(target)) return;
      closeMenu(true);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    const raf = window.requestAnimationFrame(() => firstMobileLink.current?.focus());

    return () => {
      window.cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
      document.body.style.overflow = previousOverflow;
      content?.removeAttribute("inert");
    };
  }, [open, closeMenu]);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, [open]);

  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const currentPath = base && pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;
  const isHome = currentPath === "/";

  const isCurrent = (item: NavItem) => {
    if (item.section) {
      return isHome && active === item.section;
    }
    if (item.href === "/docs") return currentPath === "/docs" || currentPath.startsWith("/docs/");
    return currentPath === item.href;
  };

  const prefetchFor = (item: NavItem) => (item.href === "/previews" ? false : undefined);

  return (
    <header className={`xf-nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="xf-nav-inner">
        <Link href="/" className="xf-brand" aria-label="xfetch home">
          <span className="xf-brand-mark" aria-hidden="true">
            xf
          </span>
          <span className="xf-brand-word">xfetch</span>
        </Link>

        <nav className="xf-nav-links" aria-label="Main navigation">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={prefetchFor(item)}
              className={`xf-nav-link${isCurrent(item) ? " is-active" : ""}`}
              aria-current={isCurrent(item) ? (item.section ? "location" : "page") : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="xf-nav-actions">
          <button
            type="button"
            className="xf-theme-toggle"
            onClick={() => applyTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
            aria-pressed={theme === "dark"}
            title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          >
            <span className="xf-theme-icon xf-theme-icon--sun">
              <SunIcon />
            </span>
            <span className="xf-theme-icon xf-theme-icon--moon">
              <MoonIcon />
            </span>
          </button>
          <button
            ref={menuButton}
            type="button"
            className="xf-menu-btn"
            aria-expanded={open}
            aria-controls="xf-mobile-menu"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => (open ? closeMenu(true) : setOpen(true))}
          >
            <MenuIcon open={open} />
          </button>
        </div>
      </div>

      <div className="xf-nav-progress" aria-hidden="true">
        <span ref={progressRef} />
      </div>

      <div
        id="xf-mobile-menu"
        ref={menuRef}
        className="xf-mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        hidden={!open}
      >
        <div className="xf-mobile-head">
          <span className="xf-mobile-title">Navigation</span>
          <button
            type="button"
            className="xf-mobile-close"
            onClick={() => closeMenu(true)}
            aria-label="Close navigation menu"
          >
            <CloseIcon />
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {NAV_ITEMS.map((item, index) => (
            <Link
              key={item.href}
              ref={index === 0 ? firstMobileLink : undefined}
              href={item.href}
              prefetch={prefetchFor(item)}
              className={`xf-mobile-link${isCurrent(item) ? " is-active" : ""}`}
              aria-current={isCurrent(item) ? (item.section ? "location" : "page") : undefined}
              onClick={() => closeMenu(true)}
            >
              <span className="xf-mobile-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
