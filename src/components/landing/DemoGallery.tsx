"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import SectionHeader from "./SectionHeader";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const PANEL_ID = "xf-gallery-panel";

type Shot = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

type Platform = {
  id: "linux" | "macos" | "windows";
  label: string;
  images: Shot[];
};

const PLATFORMS: Platform[] = [
  {
    id: "linux",
    label: "Linux",
    images: [
      {
        src: "preview-linux-2.webp",
        alt: "xfetch on Linux, default side-by-side layout",
        caption: "Default side-by-side layout on Linux — logo, modules and colors.",
        width: 971,
        height: 576,
      },
      {
        src: "preview-linux-3.webp",
        alt: "xfetch on Linux, custom layout and color scheme",
        caption: "Custom layout and palette from the same config.jsonc.",
        width: 968,
        height: 591,
      },
      {
        src: "preview-linux-4.webp",
        alt: "xfetch on Linux, ANSI color palette module",
        caption: "The ANSI palette module rendered as squares.",
        width: 960,
        height: 518,
      },
      {
        src: "preview-linux-5.webp",
        alt: "xfetch on Linux, logo animation frame",
        caption: "animate-logo frame from the sweep and rainbow cycle.",
        width: 977,
        height: 549,
      },
      {
        src: "preview-linux-6.webp",
        alt: "xfetch on Linux, four layout variations on one desktop",
        caption: "Four layouts on one desktop — classic, grouped, boxed and minimal.",
        width: 1919,
        height: 1079,
      },
    ],
  },
  {
    id: "macos",
    label: "macOS",
    images: [
      {
        src: "macos-preview-2.webp",
        alt: "xfetch on macOS, default layout on an Apple M4 laptop",
        caption: "macOS on Apple M4 — Homebrew packages, battery and uptime.",
        width: 1272,
        height: 589,
      },
      {
        src: "macos-preview-3.webp",
        alt: "xfetch on macOS, tree layout inside iTerm2",
        caption: "Tree layout generated with --gen-config, running in iTerm2.",
        width: 2048,
        height: 1332,
      },
    ],
  },
  {
    id: "windows",
    label: "Windows",
    images: [
      {
        src: "preview-windows-2.webp",
        alt: "xfetch on Windows, Pac-Man layout in Windows Terminal",
        caption: "Windows Terminal running the Pac-Man layout.",
        width: 2871,
        height: 1619,
      },
      {
        src: "preview-windows-3.webp",
        alt: "xfetch on Windows, grouped modules and package counts",
        caption: "Windows 11 with grouped modules, PowerShell and package counts.",
        width: 2559,
        height: 1439,
      },
    ],
  },
];

export default function DemoGallery() {
  const [active, setActive] = useState<Platform["id"]>("linux");
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const platform = PLATFORMS.find((item) => item.id === active) ?? PLATFORMS[0];

  const select = (index: number) => {
    const next = (index + PLATFORMS.length) % PLATFORMS.length;
    setActive(PLATFORMS[next].id);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      select(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      select(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(PLATFORMS.length - 1);
    }
  };

  return (
    <section id="screens" className="xf-section" aria-labelledby="screens-title">
      <div className="xf-container">
        <SectionHeader
          id="screens-title"
          eyebrow="Recorded session"
          title="A real xfetch run"
          lead="Captured on real machines — logo, modules, layouts and the ANSI palette in one pass. Choose a platform."
        />

        <div className="xf-gallery" data-reveal>
          <div className="xf-gallery-bar">
            <div className="xf-tabs" role="tablist" aria-label="Preview platform">
              {PLATFORMS.map((item, index) => (
                <button
                  key={item.id}
                  ref={(node) => {
                    tabs.current[index] = node;
                  }}
                  type="button"
                  role="tab"
                  id={`xf-gallery-tab-${item.id}`}
                  aria-selected={active === item.id}
                  aria-controls={PANEL_ID}
                  tabIndex={active === item.id ? 0 : -1}
                  className={`xf-tab${active === item.id ? " is-active" : ""}`}
                  onClick={() => setActive(item.id)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <Link className="xf-gallery-link" href="/previews" prefetch={false}>
              See all previews
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div
            className="xf-gallery-panel"
            id={PANEL_ID}
            role="tabpanel"
            aria-labelledby={`xf-gallery-tab-${platform.id}`}
          >
            <ul className="xf-gallery-grid" role="list">
              {platform.images.map((image) => (
                <li key={image.src} className="xf-gallery-item">
                  <figure>
                    <div className="xf-gallery-media">
                      {/* eslint-disable-next-line @next/next/no-img-element -- existing static preview assets; dimensions reserved and images lazy-loaded */}
                      <img
                        src={`${base}/previews/${image.src}`}
                        alt={image.alt}
                        width={image.width}
                        height={image.height}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <figcaption>{image.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
