"use client";

import { useEffect, useRef } from "react";
import { VERSION } from "./links";

const ASCII_LOGO = ["██   ██", " ██ ██ ", "  ███  ", " ██ ██ ", "██   ██"];

const ROWS = [
  { key: "os", value: "Arch Linux x86_64" },
  { key: "wm", value: "Hyprland" },
  { key: "cpu", value: "Ryzen 9 7950X · 16" },
  { key: "gpu", value: "RTX 4090" },
  { key: "memory", value: "8.25 / 31.20 GiB" },
  { key: "uptime", value: "2h 15m" },
];

const PALETTE = ["#f07178", "#f78c6c", "#ffcb6b", "#78dba9", "#78dce8", "#82aaff", "#b388ff", "#dea584"];

const CHIPS = [
  { className: "xf-chip--tl", label: "JSONC", meta: "config" },
  { className: "xf-chip--tr", label: "WASM", meta: "sandbox" },
  { className: "xf-chip--bl", label: "live", meta: "daemon" },
  { className: "xf-chip--br", label: "6", meta: "targets" },
];

export default function HeroVisual() {
  const iso = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = iso.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(pointer: fine)");
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      if (reduce.matches || !fine.matches) return;
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        el.style.setProperty("--rx", `${(-y * 5).toFixed(2)}deg`);
        el.style.setProperty("--ry", `${(x * 7).toFixed(2)}deg`);
      });
    };

    const onLeave = () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      window.cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <figure
      className="xf-hero-visual"
      role="img"
      aria-label="Isometric terminal stack showing xfetch output for Arch Linux with Hyprland, a Ryzen 9 CPU, an RTX 4090 GPU, memory and uptime, plus the ANSI color palette."
    >
      <div className="xf-visual-stage" aria-hidden="true">
        <div className="xf-hero-plinth" />
        <div className="xf-hero-glow" />

        <div className="xf-iso" ref={iso}>
          <div className="xf-slab xf-slab--back">
            <div className="xf-slab-logo">{ASCII_LOGO.join("\n")}</div>
          </div>

          <div className="xf-slab xf-slab--mid">
            <div className="xf-slab-rows">
              {ROWS.slice(0, 4).map((row) => (
                <span key={row.key}>
                  <i>{row.key}</i> {row.value}
                </span>
              ))}
            </div>
          </div>

          <div className="xf-term">
            <div className="xf-term-chrome">
              <span className="xf-term-dot is-red" />
              <span className="xf-term-dot is-amber" />
              <span className="xf-term-dot is-green" />
              <span className="xf-term-title">xfetch — zsh</span>
              <span className="xf-term-badge">v{VERSION}</span>
            </div>

            <div className="xf-term-body">
              <pre className="xf-term-logo">{ASCII_LOGO.join("\n")}</pre>
              <div className="xf-term-rows">
                {ROWS.map((row) => (
                  <p key={row.key} className="xf-term-row">
                    <span className="xf-term-key">{row.key}</span>
                    <span className="xf-term-value">{row.value}</span>
                  </p>
                ))}
                <p className="xf-term-palette" aria-hidden="true">
                  {PALETTE.map((color) => (
                    <span key={color} style={{ background: color }} />
                  ))}
                </p>
              </div>
            </div>

            <div className="xf-term-foot">
              <span className="xf-term-prompt">$</span>
              <span>xfetch</span>
              <span className="xf-term-cursor" />
            </div>
          </div>

          {CHIPS.map((chip) => (
            <span key={chip.label} className={`xf-chip ${chip.className}`}>
              <strong>{chip.label}</strong> {chip.meta}
            </span>
          ))}
        </div>
      </div>

      <figcaption className="xf-sr-only">
        xfetch renders system information from a layered pipeline: configuration, probes,
        renderer and terminal output.
      </figcaption>
    </figure>
  );
}
