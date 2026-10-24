const CAPABILITIES = [
  "Deny-by-default capabilities",
  "Time, memory and output limits",
  "Same JSON stdin/stdout contract",
  "Native or WebAssembly guests",
];

export default function PluginSandbox() {
  return (
    <figure className="xf-sandbox" data-reveal>
      <svg
        viewBox="0 0 520 440"
        className="xf-sandbox-svg"
        role="img"
        aria-label="Isometric sandbox core labelled WASM, with orbiting rings for plugins, effects and extensions."
      >
        <defs>
          <linearGradient id="xfSandboxTop" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" className="xf-sandbox-top-a" />
            <stop offset="100%" className="xf-sandbox-top-b" />
          </linearGradient>
          <linearGradient id="xfSandboxSide" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className="xf-sandbox-side-a" />
            <stop offset="100%" className="xf-sandbox-side-b" />
          </linearGradient>
          <radialGradient id="xfSandboxGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="260" cy="220" r="190" fill="url(#xfSandboxGlow)" />

        <g className="xf-orbit xf-orbit--a">
          <ellipse cx="260" cy="220" rx="208" ry="66" className="xf-orbit-ring" />
          <circle cx="468" cy="220" r="5" className="xf-orbit-node" />
        </g>
        <g className="xf-orbit xf-orbit--b">
          <ellipse cx="260" cy="220" rx="180" ry="58" className="xf-orbit-ring" transform="rotate(54 260 220)" />
          <circle cx="188" cy="82" r="5" className="xf-orbit-node is-cyan" />
        </g>
        <g className="xf-orbit xf-orbit--c">
          <ellipse cx="260" cy="220" rx="160" ry="52" className="xf-orbit-ring" transform="rotate(-48 260 220)" />
          <circle cx="342" cy="352" r="5" className="xf-orbit-node is-warm" />
        </g>

        <g className="xf-sandbox-cube">
          <path d="M260 96 L380 158 L260 220 L140 158 Z" fill="url(#xfSandboxTop)" className="xf-sandbox-face" />
          <path d="M140 158 L260 220 L260 342 L140 280 Z" fill="url(#xfSandboxSide)" className="xf-sandbox-face" />
          <path d="M380 158 L260 220 L260 342 L380 280 Z" fill="url(#xfSandboxSide)" className="xf-sandbox-face" />
          <text x="260" y="168" textAnchor="middle" className="xf-sandbox-title">
            WASM
          </text>
          <text x="260" y="188" textAnchor="middle" className="xf-sandbox-sub">
            sandbox
          </text>
          <text x="260" y="418" textAnchor="middle" className="xf-sandbox-caption">
            deny-by-default
          </text>
        </g>
      </svg>

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
