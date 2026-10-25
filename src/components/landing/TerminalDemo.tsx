"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import SectionHeader from "./SectionHeader";

type Line =
  | { type: "empty" }
  | { type: "prompt"; label: string }
  | { type: "dim"; label: string }
  | { type: "info"; key: string; value: string }
  | { type: "palette" };

const LINES: Line[] = [
  { type: "prompt", label: "xfetch" },
  { type: "empty" },
  { type: "dim", label: " ────── Hardware ──────" },
  { type: "info", key: "cpu", value: "AMD Ryzen 9 7950X (16) @ 4.50 GHz" },
  { type: "info", key: "gpu", value: "NVIDIA GeForce RTX 4090" },
  { type: "info", key: "memory", value: "8.25 GiB / 31.20 GiB (26%)" },
  { type: "info", key: "disk", value: "256.4 GiB / 1.0 TiB (25%)" },
  { type: "info", key: "battery", value: "85% [Charging]" },
  { type: "empty" },
  { type: "dim", label: " ────── Software ──────" },
  { type: "info", key: "os", value: "Arch Linux x86_64" },
  { type: "info", key: "kernel", value: "6.6.1-arch1-1" },
  { type: "info", key: "packages", value: "1456 (pacman)" },
  { type: "info", key: "shell", value: "zsh" },
  { type: "info", key: "wm", value: "Hyprland" },
  { type: "empty" },
  { type: "dim", label: " ────── Session ──────" },
  { type: "info", key: "user", value: "x0z" },
  { type: "info", key: "uptime", value: "2 hours, 15 mins" },
  { type: "info", key: "datetime", value: "2026-07-13 14:23:00" },
  { type: "empty" },
  { type: "palette" },
  { type: "empty" },
  { type: "prompt", label: "█" },
];

const PALETTE = ["#f07178", "#f78c6c", "#ffcb6b", "#78dba9", "#78dce8", "#82aaff", "#b388ff", "#dea584"];

const TRANSCRIPT = LINES.map((line) => {
  if (line.type === "empty") return "";
  if (line.type === "prompt") return `$ ${line.label}`;
  if (line.type === "dim") return line.label;
  if (line.type === "info") return `${line.key.padEnd(9)} ${line.value}`;
  return "ANSI palette: red, orange, yellow, green, cyan, blue, violet, peach";
}).join("\n");

export default function TerminalDemo() {
  const [visible, setVisible] = useState(0);
  const section = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clear();
    setVisible(0);
    let count = 0;
    timer.current = setInterval(() => {
      count += 1;
      setVisible(count);
      if (count >= LINES.length) clear();
    }, 55);
  }, [clear]);

  useEffect(() => {
    return () => clear();
  }, [clear]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const frame = window.requestAnimationFrame(() => setVisible(LINES.length));
      return () => window.cancelAnimationFrame(frame);
    }
    const el = section.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      start();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      clear();
    };
  }, [clear, start]);

  return (
    <section id="terminal" className="xf-section" aria-labelledby="terminal-title">
      <div className="xf-container">
        <div className="xf-split">
          <div className="xf-terminal-copy" data-reveal>
            <SectionHeader
              id="terminal-title"
              eyebrow="● Live demo"
              title="See it in action"
              lead="Watch xfetch display your system information in real time. This is a simulated terminal session."
            />
            <div className="xf-terminal-actions">
              <button type="button" className="xf-btn xf-btn--primary" onClick={start}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                Replay
              </button>
              <p className="xf-hint">Click to replay</p>
            </div>
          </div>

          <div className="xf-terminal-shell" data-reveal>
            <div className="xf-term-window" ref={section}>
              <div className="xf-term-chrome">
                <span className="xf-term-dot is-red" />
                <span className="xf-term-dot is-amber" />
                <span className="xf-term-dot is-green" />
                <span className="xf-term-title">xfetch — bash</span>
                <span className="xf-term-badge">stdout</span>
              </div>
              <p className="xf-sr-only">{TRANSCRIPT}</p>
              <div
                className="xf-terminal-scroll"
                role="region"
                aria-label="xfetch terminal output"
                tabIndex={0}
              >
                <pre className="xf-terminal-pre" aria-hidden="true">
                  {LINES.slice(0, visible).map((line, index) => {
                  if (line.type === "empty") return <span key={index} className="xf-line-empty" />;
                  if (line.type === "prompt") {
                    return (
                      <span key={index} className="xf-line-prompt">
                        <span>$</span> {line.label}
                      </span>
                    );
                  }
                  if (line.type === "dim") {
                    return (
                      <span key={index} className="xf-line-dim">
                        {line.label}
                      </span>
                    );
                  }
                  if (line.type === "info") {
                    return (
                      <span key={index} className="xf-line-info">
                        <span className="xf-line-key">{line.key}</span>
                        <span>{line.value}</span>
                      </span>
                    );
                  }
                  return (
                    <span key={index} className="xf-line-palette">
                      {PALETTE.map((color) => (
                        <span key={color} style={{ color }}>
                          ███
                        </span>
                      ))}
                    </span>
                  );
                })}
                  <span className="xf-terminal-cursor" aria-hidden="true" />
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
