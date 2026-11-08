"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import SectionHeader from "./SectionHeader";
import SystemMapStatic from "./SystemMapStatic";
import { useWebGL } from "./three/scene";

const SystemMapScene = dynamic(() => import("./SystemMapScene"), { ssr: false });

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
    points: ["16 built-in layouts", "Icons + colors", "Logo animation"],
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
  const webgl = useWebGL();
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
              {webgl === true ? (
                <>
                  <SystemMapScene active={active} onActive={setActive} />
                  <div className="xf-map-3d-tag" aria-hidden="true">
                    <span>{String(active + 1).padStart(2, "0")}</span>
                    {layer.title}
                  </div>
                  <div className="xf-map-legend" aria-hidden="true">
                    <span>
                      <i className="xf-map-legend-dot xf-map-legend-dot--cyan" /> data flow
                    </span>
                    <span>
                      <i className="xf-map-legend-dot xf-map-legend-dot--violet" /> wasm sandbox
                    </span>
                  </div>
                </>
              ) : (
                <SystemMapStatic active={active} onActive={setActive} hotspots={HOTSPOTS} />
              )}
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
              Select a slot to inspect a layer. The blue path is data flow; the violet
              plane is the sandbox boundary.
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
