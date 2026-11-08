"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { HERO_ASCII_LOGO, HERO_PALETTE, HERO_ROWS } from "./hero-data";
import { VERSION } from "./links";
import { useWebGL } from "./three/scene";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const CHIPS = [
  { className: "xf-chip--tl", label: "JSONC", meta: "config" },
  { className: "xf-chip--tr", label: "WASM", meta: "sandbox" },
  { className: "xf-chip--bl", label: "live", meta: "daemon" },
  { className: "xf-chip--br", label: "6", meta: "targets" },
];

export default function HeroVisual() {
  const iso = useRef<HTMLDivElement>(null);
  const webgl = useWebGL();
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const el = iso.current;
    if (!el || webgl !== false) return;

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
  }, [webgl]);

  return (
    <>
    <figure
      className="xf-hero-visual"
      role="img"
      aria-label="Interactive isometric 3D keyboard. Hovering or tapping a key presses it and types into the holographic xfetch terminal above."
    >
      <div className="xf-visual-stage" aria-hidden="true">
        <div className="xf-hero-glow" />
        {webgl !== true ? <div className="xf-hero-plinth" /> : null}
        {webgl === true ? <HeroScene onType={setTyped} /> : null}

        {webgl === false ? (
          <div className="xf-iso" ref={iso}>
            <div className="xf-term">
              <div className="xf-term-chrome">
                <span className="xf-term-dot is-red" />
                <span className="xf-term-dot is-amber" />
                <span className="xf-term-dot is-green" />
                <span className="xf-term-title">xfetch — zsh</span>
                <span className="xf-term-badge">v{VERSION}</span>
              </div>

              <div className="xf-term-body">
                <pre className="xf-term-logo">{HERO_ASCII_LOGO.join("\n")}</pre>
                <div className="xf-term-rows">
                  {HERO_ROWS.map((row) => (
                    <p key={row.key} className="xf-term-row">
                      <span className="xf-term-key">{row.key}</span>
                      <span className="xf-term-value">{row.value}</span>
                    </p>
                  ))}
                  <p className="xf-term-palette" aria-hidden="true">
                    {HERO_PALETTE.map((color) => (
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
        ) : null}
      </div>

      {webgl === true ? (
        <p className="xf-hero-hint" aria-hidden="true">
          Hover or tap the keys — every key types into the terminal.
        </p>
      ) : null}

      <figcaption className="xf-sr-only">
        xfetch renders system information from a layered pipeline: configuration, probes,
        renderer and terminal output. The 3D keyboard is decorative; the same information is
        available in the page copy.
      </figcaption>
    </figure>
    {webgl === true ? (
      <span className="xf-sr-only" aria-live="polite">
        {typed ? `Terminal input: ${typed}` : ""}
      </span>
    ) : null}
    </>
  );
}
