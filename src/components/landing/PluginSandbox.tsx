"use client";

import dynamic from "next/dynamic";
import PluginSandboxStatic from "./PluginSandboxStatic";
import { useWebGL } from "./three/scene";

const PluginSandboxScene = dynamic(() => import("./PluginSandboxScene"), { ssr: false });

const CAPABILITIES = [
  "Deny-by-default capabilities",
  "Time, memory and output limits",
  "Same JSON stdin/stdout contract",
  "Native or WebAssembly guests",
];

export default function PluginSandbox() {
  const webgl = useWebGL();
  const live = webgl === true;

  return (
    <figure className="xf-sandbox" data-reveal>
      <div className="xf-sandbox-stage">
        {live ? <PluginSandboxScene /> : <PluginSandboxStatic />}
        {live ? (
          <div className="xf-sandbox-hud" aria-hidden="true">
            <div className="xf-sandbox-hud-card">
              <strong>WASM</strong>
              <span>sandbox</span>
            </div>
            <small>deny-by-default</small>
          </div>
        ) : null}
      </div>

      <figcaption>
        <span className="xf-sandbox-legend">
          <i className="is-warm" aria-hidden="true" /> plugins
          <i className="is-cyan" aria-hidden="true" /> effects
          <i className="is-violet" aria-hidden="true" /> extensions
        </span>
        <span className="xf-sandbox-note">Orbits are decorative; the list below is the source of truth.</span>
      </figcaption>

      <ul className="xf-capabilities" role="list">
        {CAPABILITIES.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </figure>
  );
}
