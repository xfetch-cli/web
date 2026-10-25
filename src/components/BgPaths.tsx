/**
 * Ambient background: a hairline engineering grid, two restrained glows and a
 * few slowly drifting isometric curves. Pure CSS/SVG, theme-aware through the
 * existing `bg-paths-*` visibility rules in globals.css, and motion is disabled
 * by `prefers-reduced-motion` in landing.css.
 */
export default function BgPaths() {
  return (
    <div className="xf-bg" aria-hidden="true">
      <div className="xf-bg-grid" />
      <div className="xf-bg-glow xf-bg-glow--warm" />
      <div className="xf-bg-glow xf-bg-glow--cool" />
      <svg
        className="xf-bg-lines"
        viewBox="0 0 1600 1000"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        focusable="false"
      >
        <defs>
          <linearGradient id="xfBgDark" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffb27a" stopOpacity="0" />
            <stop offset="42%" stopColor="#ffb27a" stopOpacity="0.55" />
            <stop offset="70%" stopColor="#7dd3fc" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="xfBgLight" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#b85c2a" stopOpacity="0" />
            <stop offset="45%" stopColor="#b85c2a" stopOpacity="0.4" />
            <stop offset="72%" stopColor="#0e7490" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#6d28d9" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g className="bg-paths-dark xf-bg-drift">
          <path d="M-120 760 C 240 560 420 880 760 700 S 1260 420 1720 560" stroke="url(#xfBgDark)" strokeWidth="1.1" />
          <path d="M-120 820 C 270 620 460 940 800 760 S 1300 480 1720 620" stroke="url(#xfBgDark)" strokeWidth="0.8" opacity="0.7" />
          <path d="M-160 640 C 220 470 380 720 720 600 S 1200 330 1680 430" stroke="url(#xfBgDark)" strokeWidth="0.7" opacity="0.55" />
          <path d="M260 1040 L 720 300 L 1180 1040" stroke="url(#xfBgDark)" strokeWidth="0.6" opacity="0.28" />
          <path d="M520 1040 L 980 300 L 1440 1040" stroke="url(#xfBgDark)" strokeWidth="0.6" opacity="0.2" />
        </g>

        <g className="bg-paths-light xf-bg-drift">
          <path d="M-120 760 C 240 560 420 880 760 700 S 1260 420 1720 560" stroke="url(#xfBgLight)" strokeWidth="1.1" />
          <path d="M-120 820 C 270 620 460 940 800 760 S 1300 480 1720 620" stroke="url(#xfBgLight)" strokeWidth="0.8" opacity="0.6" />
          <path d="M-160 640 C 220 470 380 720 720 600 S 1200 330 1680 430" stroke="url(#xfBgLight)" strokeWidth="0.7" opacity="0.5" />
          <path d="M260 1040 L 720 300 L 1180 1040" stroke="url(#xfBgLight)" strokeWidth="0.6" opacity="0.22" />
          <path d="M520 1040 L 980 300 L 1440 1040" stroke="url(#xfBgLight)" strokeWidth="0.6" opacity="0.16" />
        </g>
      </svg>
      <div className="xf-bg-noise" />
    </div>
  );
}
