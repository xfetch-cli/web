"use client";

import { useEffect, useState } from "react";

export type ScenePalette = {
  accent: string;
  accentStrong: string;
  cyan: string;
  violet: string;
  success: string;
  surface: string;
  surface2: string;
  surface3: string;
  text: string;
  muted: string;
  line: string;
  bg: string;
  dark: boolean;
};

const FALLBACK: ScenePalette = {
  accent: "#ffb27a",
  accentStrong: "#ffc79e",
  cyan: "#7dd3fc",
  violet: "#a78bfa",
  success: "#7ee2b8",
  surface: "#0d111a",
  surface2: "#121826",
  surface3: "#182033",
  text: "#e8ecf5",
  muted: "#98a2b8",
  line: "rgba(148, 163, 184, 0.22)",
  bg: "#07090f",
  dark: true,
};

function normalizeColor(value: string, fallback: string): string {
  const raw = value || fallback;
  const hex8 = raw.match(/^#([0-9a-f]{6})[0-9a-f]{2}$/i);
  if (hex8) return `#${hex8[1]}`;
  const rgb = raw.match(/rgba?\(([^)]+)\)/i);
  if (rgb) {
    const [r, g, b] = rgb[1].split(",").map((part) => part.trim());
    return `rgb(${r}, ${g}, ${b})`;
  }
  return raw;
}

function readPalette(): ScenePalette {
  if (typeof window === "undefined") return FALLBACK;
  const root = document.documentElement;
  const style = getComputedStyle(root);
  const value = (name: string, fallback: string) => {
    const v = style.getPropertyValue(name).trim();
    return v || fallback;
  };
  return {
    accent: value("--xf-accent", FALLBACK.accent),
    accentStrong: value("--xf-accent-strong", FALLBACK.accentStrong),
    cyan: value("--xf-cyan", FALLBACK.cyan),
    violet: value("--xf-violet", FALLBACK.violet),
    success: value("--xf-success", FALLBACK.success),
    surface: value("--xf-surface", FALLBACK.surface),
    surface2: value("--xf-surface-2", FALLBACK.surface2),
    surface3: value("--xf-surface-3", FALLBACK.surface3),
    text: value("--xf-text", FALLBACK.text),
    muted: value("--xf-muted", FALLBACK.muted),
    line: normalizeColor(value("--xf-line-strong", FALLBACK.line), FALLBACK.line),
    bg: value("--xf-bg", FALLBACK.bg),
    dark: root.getAttribute("data-theme") === "dark",
  };
}

/**
 * Reads the xfetch landing tokens from the document root and re-reads them
 * when the theme toggle rewrites the `data-theme` attribute. Keeps WebGL
 * materials in sync with the CSS palette without duplicating values.
 */
export function useScenePalette(): ScenePalette {
  const [palette, setPalette] = useState<ScenePalette>(readPalette);

  useEffect(() => {
    const update = () => setPalette(readPalette());
    update();

    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme", "class", "style"],
    });
    return () => observer.disconnect();
  }, []);

  return palette;
}

/** Deterministic PRNG so particle layouts are stable across renders. */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);

  return reduced;
}

/**
 * `null` while the capability probe has not run yet so server markup and the
 * first client paint stay identical.
 */
export function useWebGL(): boolean | null {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    let ok = false;
    try {
      const canvas = document.createElement("canvas");
      ok = Boolean(
        window.WebGLRenderingContext &&
          (canvas.getContext("webgl2") || canvas.getContext("webgl")),
      );
    } catch {
      ok = false;
    }
    // Capability probe: runs once after mount so SSR and the first paint agree.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(ok);
  }, []);

  return supported;
}

export function useInView<T extends Element>(
  ref: React.RefObject<T | null>,
  rootMargin = "160px",
): boolean {
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => setInView(entries.some((entry) => entry.isIntersecting)),
      { rootMargin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}

export function toThreeColor(value: string, fallback = "#ffffff"): string {
  return value && value !== "rgba(0, 0, 0, 0)" ? value : fallback;
}
