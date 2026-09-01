import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Previews — xfetch",
  description: "Real screenshots and recordings of xfetch running on Linux, Windows and macOS.",
};

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const LINUX_STILLS = [
  {
    src: "preview-linux-2.webp",
    alt: "xfetch on Linux, default layout",
  },
  {
    src: "preview-linux-3.webp",
    alt: "xfetch on Linux, custom layout",
  },
  {
    src: "preview-linux-4.webp",
    alt: "xfetch on Linux, palette module",
  },
  {
    src: "preview-linux-5.webp",
    alt: "xfetch on Linux, logo animation",
  },
];

const LINUX_NOTES = [
  "The default side-by-side layout: ASCII logo on the left, system modules on the right — OS, kernel, uptime, packages, shell, CPU, GPU, memory and disk at a glance. Next to it, a custom layout and color scheme from the same config file — xfetch reads config.jsonc at startup, so changing layout, icons or colors is a matter of editing text.",
  "The ANSI color palette module rendered as squares — handy to verify your terminal colors match the theme you picked. And a frame of the logo animation, showing the sweep and rainbow effects the animate-logo plugin cycles through.",
];

const WINDOWS_STILLS = [
  {
    src: "preview-windows-1.webp",
    alt: "xfetch on Windows, PowerShell",
    text: "The classic side-by-side layout inside Windows Terminal: ASCII logo on the left, system modules on the right, package count detected via scoop and chocolatey.",
  },
  {
    src: "preview-windows-2.webp",
    alt: "xfetch on Windows, alternate layout",
    text: "A different layout and color scheme on the same machine — layouts, colors and icons are fully driven by config.jsonc, no rebuilds needed.",
  },
  {
    src: "preview-windows-3.webp",
    alt: "xfetch on Windows, full desktop capture",
    text: "Full desktop capture: xfetch sitting next to the Windows explorer, showing the ANSI palette, GPU info and swap usage.",
  },
];

function PreviewImage({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={`${base}/previews/${src}`}
      alt={alt}
      loading="lazy"
      className="h-auto w-full rounded-lg border border-bg3/60 bg-bg/90"
    />
  );
}

export default function PreviewsPage() {
  return (
    <>
      <div className="mx-auto min-h-screen max-w-5xl px-6 pt-28 pb-20">
        <div className="grid gap-[clamp(2.5rem,6vh,5rem)]">
          {/* Hero */}
          <section className="grid gap-4">
            <h1 className="m-0 text-2xl font-bold">Previews</h1>
            <p className="m-0 max-w-[68ch] leading-relaxed text-fg2">
              xfetch is a cross-platform system information fetching tool written in Rust.
              It works on Linux, Windows, and macOS — the same binary, the same config,
              everywhere. This page collects real captures of xfetch running on each
              platform: animated recordings and still screenshots straight from the terminal.
            </p>
          </section>

          {/* Main demo */}
          <section className="grid gap-3">
            <h2 className="m-0 text-lg font-semibold">The main demo</h2>
            <p className="m-0 max-w-[68ch] leading-relaxed text-fg2">
              A quick look at xfetch in action: ASCII logo on the left, system modules on the
              right, colors from the active theme palette. Everything is configurable through
              <code className="mx-1 rounded bg-bg/90 px-1.5 py-0.5 text-xs">config.jsonc</code> —
              modules, icons, logos, layouts, and colors.
            </p>
            <div className="overflow-hidden rounded-xl border border-bg3/60">
              <img
                src={`${base}/previews/xfetch-demo.gif`}
                alt="xfetch main demo"
                className="block h-auto w-full"
              />
            </div>
          </section>

          {/* Linux */}
          <section className="grid gap-3">
            <h2 className="m-0 text-lg font-semibold">Linux</h2>
            <p className="m-0 max-w-[68ch] leading-relaxed text-fg2">
              Recorded and captured on real Linux sessions: different layouts, the ANSI color
              palette module, ASCII logo animations, and package/module counts from pacman,
              dpkg and friends.
            </p>
            <div className="overflow-hidden rounded-xl border border-bg3/60">
              <img
                src={`${base}/previews/preview-linux-1.gif`}
                alt="xfetch on Linux, animated demo"
                className="block h-auto w-full"
              />
            </div>
            <p className="m-0 max-w-[68ch] leading-relaxed text-fg2">
              Watch the ASCII logo animate in the recording above: sweep and rainbow effects
              cycled by the animate-logo plugin, speaking JSON over stdin/stdout.
            </p>
            <div className="grid gap-6">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {LINUX_STILLS.slice(0, 2).map((img) => (
                  <div key={img.src} className="overflow-hidden rounded-xl border border-bg3/60">
                    <PreviewImage src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
              <p className="m-0 max-w-[68ch] leading-relaxed text-fg2">{LINUX_NOTES[0]}</p>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {LINUX_STILLS.slice(2).map((img) => (
                  <div key={img.src} className="overflow-hidden rounded-xl border border-bg3/60">
                    <PreviewImage src={img.src} alt={img.alt} />
                  </div>
                ))}
              </div>
              <p className="m-0 max-w-[68ch] leading-relaxed text-fg2">{LINUX_NOTES[1]}</p>
            </div>
          </section>

          {/* Windows */}
          <section className="grid gap-3">
            <h2 className="m-0 text-lg font-semibold">Windows</h2>
            <p className="m-0 max-w-[68ch] leading-relaxed text-fg2">
              Same tool, same config, different platform: xfetch running inside Windows
              Terminal with full module detection — OS, kernel, shell, packages via
              scoop/chocolatey, and the color palette rendered from the Windows console.
            </p>
            <div className="grid gap-6">
              {WINDOWS_STILLS.map((img) => (
                <div key={img.src} className="grid gap-3">
                  <div className="overflow-hidden rounded-xl border border-bg3/60">
                    <PreviewImage src={img.src} alt={img.alt} />
                  </div>
                  <p className="m-0 max-w-[68ch] leading-relaxed text-fg2">{img.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* macOS */}
          <section className="grid gap-3">
            <h2 className="m-0 text-lg font-semibold">macOS</h2>
            <p className="m-0 max-w-[68ch] leading-relaxed text-fg2">
              xfetch on macOS, running in Terminal or iTerm2 with Homebrew package detection.
              More macOS captures are on the way.
            </p>
            <div className="overflow-hidden rounded-xl border border-bg3/60">
              <img
                src={`${base}/previews/macos-preview-1.gif`}
                alt="xfetch on macOS, animated demo"
                className="block h-auto w-full"
              />
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {["macos-preview-2", "macos-preview-3"].map((name) => (
                <div
                  key={name}
                  className="grid aspect-video place-items-center rounded-lg border border-dashed border-accent/40 bg-bg/50"
                >
                  <div className="grid gap-1 text-center">
                    <span className="text-sm font-semibold text-accent">{name}</span>
                    <span className="text-xs text-fg2">placeholder — preview macos</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
