import type { Metadata } from "next";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Previews — xfetch",
  description: "Real screenshots and recordings of xfetch running on Linux, Windows and macOS.",
};

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

const LINUX_STILLS = [
  { src: "preview-linux-2.webp", alt: "xfetch on Linux, default layout" },
  { src: "preview-linux-3.webp", alt: "xfetch on Linux, custom layout" },
  { src: "preview-linux-4.webp", alt: "xfetch on Linux, palette module" },
  { src: "preview-linux-5.webp", alt: "xfetch on Linux, logo animation" },
  { src: "preview-linux-6.webp", alt: "xfetch on Linux, full desktop capture" },
];

const WINDOWS_STILLS = [
  { src: "preview-windows-1.webp", alt: "xfetch on Windows, PowerShell" },
  { src: "preview-windows-2.webp", alt: "xfetch on Windows, alternate layout" },
  { src: "preview-windows-3.webp", alt: "xfetch on Windows, full desktop capture" },
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
              A quick look at xfetch in action: system modules on the left, ASCII logo on the
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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {LINUX_STILLS.map((img) => (
                <PreviewImage key={img.src} {...img} />
              ))}
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
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              {WINDOWS_STILLS.map((img) => (
                <PreviewImage key={img.src} {...img} />
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
