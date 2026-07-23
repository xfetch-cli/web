import { renderFeatureIcon } from "./Icons";

const FEATURE_TEXT: Record<string, { title: string; desc: string }> = {
  sysinfo: { title: "System information", desc: "OS, kernel, CPU, GPU, memory, disk, battery, uptime, packages, shell, terminal, WM/DE and more." },
  crossplatform: { title: "Cross-platform", desc: "Works on Linux, Windows, and macOS. Same tool, same config — everywhere." },
  layouts: { title: "Multiple layouts", desc: "Classic side-by-side, Pac-Man, tree, section, side-block, box, lines, dots, and bottom-line." },
  jsonc: { title: "JSONC config", desc: "Full customization via config.jsonc — modules, icons, colors, logos, and layouts." },
  palette: { title: "Color palette", desc: "Built-in ANSI color palette display with square, circle, triangle, and line styles." },
  plugins: { title: "Plugin system", desc: "Extend with external plugins via JSON over stdin/stdout. Animate logos, fetch GitHub stats, and more." },
  logoanim: { title: "Logo animation", desc: "Animate ASCII logos with sweep, wave, rainbow, sparkle, breathing, and frame-by-frame styles." },
  nerdfont: { title: "NERD Font icons", desc: "Customizable Nerd Font icons per module. Use emojis, text, or any Unicode glyph." },
  logos: { title: "ASCII & image logos", desc: "Display text logos with ANSI colors or image files (png, jpg, svg) via viuer." },
};

export default function Features({ features }: { features: { key: string; icon: string }[] }) {
  return (
    <div className="grid gap-3">
      <h2 className="m-0 text-lg font-semibold">Features</h2>
      <p className="m-0 max-w-[68ch] text-fg2 leading-relaxed">From OS detection to animated ASCII art — xfetch packs a punch in a single binary.</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-3">
        {features.map((f) => {
          const t = FEATURE_TEXT[f.key];
          return (
            <div key={f.key} className="grid gap-1.5 rounded-lg border border-bg3/60 bg-bg/90 p-4 transition-all hover:border-accent/40">
              <span className="text-lg leading-none text-accent">{renderFeatureIcon(f.icon, 20)}</span>
              <h3 className="m-0 text-sm font-semibold">{t.title}</h3>
              <p className="m-0 text-xs leading-relaxed text-fg2">{t.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
