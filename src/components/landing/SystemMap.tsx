"use client";

import { useState } from "react";
import SectionHeader from "./SectionHeader";

type Layer = {
  id: string;
  title: string;
  kicker: string;
  detail: string;
  points: string[];
};

const LAYERS: Layer[] = [
  {
    id: "config",
    title: "Config",
    kicker: "Input layer",
    detail:
      "config.jsonc is parsed with its comments intact. The selected theme is merged, then config-provider extensions may rewrite the resolved config before anything is probed.",
    points: ["JSONC parsing", "Theme merge", "Extension chain"],
  },
  {
    id: "probes",
    title: "Probes",
    kicker: "Collection layer",
    detail:
      "Built-in modules are collected in parallel — OS, kernel, CPU, GPU, memory, disk, battery, network and more. External plugins can add their own lines.",
    points: ["Parallel probing", "18 landing modules", "Plugin info providers"],
  },
  {
    id: "renderer",
    title: "Renderer",
    kicker: "Composition layer",
    detail:
      "The layout engine arranges modules and applies colors, Nerd Font icons, ASCII or image logos, and logo animations. Every layout is driven by the same resolved config.",
    points: ["9 built-in layouts", "Icons + colors", "Logo animation"],
  },
  {
    id: "terminal",
    title: "Terminal",
    kicker: "Output layer",
    detail:
      "ANSI lines are written to stdout. The live daemon can pin a subset at the top of the terminal and refresh it on an interval, with optional config hot-reload.",
    points: ["ANSI output", "Live daemon", "Hot reload"],
  },
  {
    id: "wasm",
    title: "WASM sandbox",
    kicker: "Extension plane",
    detail:
      "Plugins, effects and extensions can run as WebAssembly guests with deny-by-default capabilities and limits for time, memory and output. Native executables use the same JSON stdin/stdout contract.",
    points: ["Plugins", "Effects", "Extensions"],
  },
];

const HOTSPOTS = [
  { left: "10%", top: "18.4%", width: "68%", height: "11.5%" },
  { left: "10%", top: "37.7%", width: "68%", height: "11.5%" },
  { left: "10%", top: "57%", width: "68%", height: "11.5%" },
  { left: "10%", top: "76.3%", width: "68%", height: "11.5%" },
  { left: "81.5%", top: "31.5%", width: "16.5%", height: "38%" },
];

export default function SystemMap() {
  const [active, setActive] = useState(2);
  const layer = LAYERS[active];

  return (
    <section id="architecture" className="xf-section" aria-labelledby="architecture-title">
      <div className="xf-container">
        <SectionHeader
          id="architecture-title"
          eyebrow="Under the hood"
          title="One binary, four layers."
          lead="Follow a run from JSONC to ANSI. The wasm sandbox sits beside the pipeline, so plugins, effects and extensions can extend it without owning the core."
        />

        <div className="xf-map-grid">
          <figure className="xf-map-figure" data-reveal>
            <div className="xf-map-canvas">
              <svg viewBox="0 0 800 620" className="xf-map-svg" aria-hidden="true" focusable="false">
                <defs>
                  <linearGradient id="xfMapTop" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" className="xf-map-stop-top-a" />
                    <stop offset="100%" className="xf-map-stop-top-b" />
                  </linearGradient>
                  <linearGradient id="xfMapSide" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" className="xf-map-stop-side-a" />
                    <stop offset="100%" className="xf-map-stop-side-b" />
                  </linearGradient>
                </defs>

                <g className="xf-map-connectors">
                  <path d="M350 180 L350 240" />
                  <path d="M350 300 L350 360" />
                  <path d="M350 420 L350 480" />
                  <path d="M620 370 C 645 370 645 340 660 340" />
                </g>

                {[
                  { y: 120, num: "01", name: "Config", sub: "config.jsonc + theme merge" },
                  { y: 240, num: "02", name: "Probes", sub: "parallel module collection" },
                  { y: 360, num: "03", name: "Renderer", sub: "layout · icons · colors" },
                  { y: 480, num: "04", name: "Terminal", sub: "ANSI stdout + live daemon" },
                ].map((row) => (
                  <g key={row.name} className="xf-map-layer-g">
                    <path
                      d={`M80 ${row.y} L470 ${row.y - 50} L620 ${row.y + 10} L230 ${row.y + 60} Z`}
                      fill="url(#xfMapTop)"
                      className="xf-map-top"
                    />
                    <path
                      d={`M80 ${row.y} L230 ${row.y + 60} L230 ${row.y + 84} L80 ${row.y + 24} Z`}
                      fill="url(#xfMapSide)"
                      className="xf-map-side"
                    />
                    <path
                      d={`M230 ${row.y + 60} L620 ${row.y + 10} L620 ${row.y + 34} L230 ${row.y + 84} Z`}
                      fill="url(#xfMapSide)"
                      className="xf-map-side"
                    />
                    <text x="112" y={row.y + 26} className="xf-map-num">
                      {row.num}
                    </text>
                    <text x="158" y={row.y + 27} className="xf-map-name">
                      {row.name}
                    </text>
                    <text x="158" y={row.y + 45} className="xf-map-sub">
                      {row.sub}
                    </text>
                  </g>
                ))}

                <g className="xf-map-plane">
                  <path d="M660 200 L770 235 L770 430 L660 395 Z" fill="url(#xfMapTop)" className="xf-map-plane-face" />
                  <path d="M660 200 L660 395 L770 430 L770 235 Z" className="xf-map-plane-edge" />
                  <text x="686" y="290" className="xf-map-plane-title">
                    WASM
                  </text>
                  <text x="686" y="310" className="xf-map-plane-sub">
                    sandbox
                  </text>
                  <circle cx="700" cy="344" r="4" className="xf-map-node" />
                  <text x="714" y="348" className="xf-map-node-label">
                    plugins
                  </text>
                  <circle cx="700" cy="370" r="4" className="xf-map-node" />
                  <text x="714" y="374" className="xf-map-node-label">
                    effects
                  </text>
                  <circle cx="700" cy="396" r="4" className="xf-map-node" />
                  <text x="714" y="400" className="xf-map-node-label">
                    extensions
                  </text>
                </g>
              </svg>

              {LAYERS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`xf-map-hotspot${active === index ? " is-active" : ""}`}
                  style={HOTSPOTS[index]}
                  aria-label={`Inspect layer ${index + 1}: ${item.title}`}
                  aria-pressed={active === index}
                  aria-controls="xf-map-detail"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                >
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                </button>
              ))}
            </div>

            <div className="xf-map-mobile-stack" role="group" aria-label="Inspect system layers">
              {LAYERS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`xf-map-mobile-layer${active === index ? " is-active" : ""}`}
                  aria-pressed={active === index}
                  aria-controls="xf-map-detail"
                  onClick={() => setActive(index)}
                >
                  <span className="xf-map-mobile-num" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="xf-map-mobile-text">
                    <strong>{item.title}</strong>
                    <small>{item.kicker}</small>
                  </span>
                </button>
              ))}
            </div>

            <figcaption>
              Hover, focus or tap a layer. The blue links are data flow; the violet plane is the
              sandbox boundary.
            </figcaption>
          </figure>

          <div className="xf-map-side" data-reveal>
            <div className="xf-map-tabs" role="group" aria-label="Inspect system layers">
              {LAYERS.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={`xf-map-tab${active === index ? " is-active" : ""}`}
                  aria-pressed={active === index}
                  onClick={() => setActive(index)}
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                >
                  <span className="xf-map-tab-num">{String(index + 1).padStart(2, "0")}</span>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>

            <div
              className="xf-map-detail xf-glass"
              id="xf-map-detail"
              aria-live="polite"
              aria-atomic="true"
            >
              <p className="xf-eyebrow">{layer.kicker}</p>
              <h3>{layer.title}</h3>
              <p>{layer.detail}</p>
              <ul className="xf-tag-list" role="list">
                {layer.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
