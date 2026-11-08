"use client";

type Props = {
  active: number;
  onActive: (index: number) => void;
  hotspots: Array<{ left: string; top: string; width: string; height: string }>;
};

const LAYERS = ["Config", "Probes", "Renderer", "Terminal", "WASM sandbox"];

/**
 * Static SVG fallback used when WebGL is unavailable. It mirrors the 3D scene:
 * four stacked layers, the sandbox plane and the same hotspots.
 */
export default function SystemMapStatic({ active, onActive, hotspots }: Props) {
  return (
    <div className="xf-map-static">
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
        ].map((row, index) => (
          <g
            key={row.name}
            className={`xf-map-layer-g${active === index ? " is-active" : ""}`}
          >
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
          <path
            d="M660 200 L770 235 L770 430 L660 395 Z"
            fill="url(#xfMapTop)"
            className="xf-map-plane-face"
          />
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

      {hotspots.map((spot, index) => (
        <button
          key={`hotspot-${index}`}
          type="button"
          className={`xf-map-hotspot${active === index ? " is-active" : ""}`}
          style={spot}
          aria-label={`Inspect layer ${index + 1}: ${LAYERS[index]}`}
          aria-pressed={active === index}
          aria-controls="xf-map-detail"
          onMouseEnter={() => onActive(index)}
          onFocus={() => onActive(index)}
          onClick={() => onActive(index)}
        >
          <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        </button>
      ))}
    </div>
  );
}
