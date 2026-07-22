"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Hero from "@/components/Hero";
import TerminalDemo from "@/components/TerminalDemo";
import Features from "@/components/Features";
import ModulesTable from "@/components/ModulesTable";
import InstallTabs from "@/components/InstallTabs";
import LayoutShowcase from "@/components/LayoutShowcase";
import ConfigBuilder from "@/components/ConfigBuilder";
import PluginSection from "@/components/PluginSection";
import Roadmap from "@/components/Roadmap";
import Footer from "@/components/Footer";

const FEATURES = [
  { key: "sysinfo", icon: "sysinfo" as const },
  { key: "crossplatform", icon: "crossplatform" as const },
  { key: "layouts", icon: "layouts-icon" as const },
  { key: "jsonc", icon: "jsonc" as const },
  { key: "palette", icon: "palette-icon" as const },
  { key: "plugins", icon: "plugins-icon" as const },
  { key: "logoanim", icon: "logoanim" as const },
  { key: "nerdfont", icon: "nerdfont" as const },
  { key: "logos", icon: "logos-icon" as const },
];

const MODULES = [
  { icon: "os" as const, name: "os", descKey: "Operating system name, version & architecture" },
  { icon: "kernel" as const, name: "kernel", descKey: "Kernel version" },
  { icon: "hostname" as const, name: "hostname", descKey: "Machine hostname" },
  { icon: "uptime" as const, name: "uptime", descKey: "System uptime" },
  { icon: "packages" as const, name: "packages", descKey: "Package count (pacman, dpkg, scoop, brew, etc.)" },
  { icon: "shell" as const, name: "shell", descKey: "Current shell (bash, zsh, powershell)" },
  { icon: "terminal-icon" as const, name: "terminal", descKey: "Terminal emulator" },
  { icon: "wm" as const, name: "wm", descKey: "Window Manager / Desktop Environment" },
  { icon: "cpu" as const, name: "cpu", descKey: "CPU model, cores & frequency" },
  { icon: "gpu" as const, name: "gpu", descKey: "GPU model(s) — integrated & discrete" },
  { icon: "memory" as const, name: "memory", descKey: "RAM used / total with percentage" },
  { icon: "swap" as const, name: "swap", descKey: "Swap usage" },
  { icon: "disk" as const, name: "disk", descKey: "Disk usage" },
  { icon: "battery" as const, name: "battery", descKey: "Battery level & status (charging/discharging)" },
  { icon: "user" as const, name: "user", descKey: "Current username" },
  { icon: "datetime" as const, name: "datetime", descKey: "Current date & time" },
  { icon: "local_ip" as const, name: "local_ip", descKey: "Local IP address" },
  { icon: "palette-mod" as const, name: "palette", descKey: "ANSI color palette (squares, circles, triangles, lines)" },
];

const LAYOUTS = [
  { titleKey: "Default (Classic)", descKey: "Logo on the left, info on the right. Clean and familiar.", code: '{\n  "layout": null\n}' },
  { titleKey: "Pac-Man", descKey: "Boxed layout with Pac-Man header and footer. Fun and retro.", code: '{\n  "layout": "pacman"\n}' },
  { titleKey: "Section", descKey: "Grouped modules with clear section headers.", code: '{\n  "layout": "section",\n  "modules": [\n    { "type": "group", "title": "Hardware",\n      "modules": ["cpu","gpu","memory"] },\n    { "type": "group", "title": "Software",\n      "modules": ["os","shell"] }\n  ]\n}' },
  { titleKey: "Side Block", descKey: "Keys and values in separate side-by-side boxes.", code: '{\n  "layout": "side-block"\n}' },
  { titleKey: "Tree", descKey: "Hierarchical tree with nested groups. Great for organizing.", code: '{\n  "layout": "tree",\n  "modules": [\n    { "type": "group", "title": "OS",\n      "modules": ["os","kernel","packages"] },\n    { "type": "group", "title": "PC",\n      "modules": ["cpu","gpu","memory"] }\n  ]\n}' },
  { titleKey: "Box", descKey: "All info enclosed in a rounded box.", code: '{\n  "layout": "box"\n}' },
];

const INSTALL_TABS = [
  { id: "linux", label: "Linux / macOS" },
  { id: "windows", label: "Windows" },
  { id: "source", label: "Build from source" },
  { id: "arch", label: "Arch Linux" },
];

const INSTALL_CONTENT: Record<string, { lines: { text: string; comment: boolean }[] }> = {
  linux: { lines: [
    { text: "# One-liner (curl)", comment: true },
    { text: "curl -fsSL https://raw.githubusercontent.com/xscriptor/xfetch/main/install.sh | bash", comment: false },
    { text: "", comment: false },
    { text: "# Custom prefix", comment: true },
    { text: "bash <(curl -fsSL ...) --prefix /usr/local", comment: false },
  ] },
  windows: { lines: [
    { text: "# PowerShell one-liner", comment: true },
    { text: "irm https://raw.githubusercontent.com/xscriptor/xfetch/main/install.ps1 | iex", comment: false },
  ] },
  source: { lines: [
    { text: "# Clone & build manually", comment: true },
    { text: "git clone https://github.com/xscriptor/xfetch.git", comment: false },
    { text: "cd xfetch", comment: false },
    { text: "cargo build --release", comment: false },
    { text: "", comment: false },
    { text: "# Binary → target/release/xfetch", comment: true },
    { text: "cp target/release/xfetch ~/.local/bin/", comment: false },
    { text: "", comment: false },
    { text: "# Config files", comment: true },
    { text: "mkdir -p ~/.config/xfetch", comment: false },
    { text: "cp configs/config.jsonc ~/.config/xfetch/config.jsonc", comment: false },
  ] },
  arch: { lines: [
    { text: "# Using the PKGBUILD in the repo", comment: true },
    { text: "git clone https://github.com/xscriptor/xfetch.git", comment: false },
    { text: "cd xfetch", comment: false },
    { text: "makepkg -si", comment: false },
    { text: "", comment: false },
    { text: "# Installed to /usr/bin/xfetch", comment: true },
    { text: "pacman -R xfetch-git   # to uninstall", comment: false },
  ] },
};

const ALL_MODULES = [
  { value: "os", icon: "os" as const }, { value: "kernel", icon: "kernel" as const },
  { value: "hostname", icon: "hostname" as const }, { value: "uptime", icon: "uptime" as const },
  { value: "packages", icon: "packages" as const }, { value: "shell", icon: "shell" as const },
  { value: "terminal", icon: "terminal-icon" as const }, { value: "wm", icon: "wm" as const },
  { value: "cpu", icon: "cpu" as const }, { value: "gpu", icon: "gpu" as const },
  { value: "memory", icon: "memory" as const }, { value: "disk", icon: "disk" as const },
  { value: "battery", icon: "battery" as const }, { value: "local_ip", icon: "local_ip" as const },
  { value: "palette", icon: "palette-mod" as const },
];

const LAYOUT_OPTIONS = [
  { value: "null", label: "Default (classic)" },
  { value: "pacman", label: "Pac-Man" },
  { value: "box", label: "Box" },
  { value: "section", label: "Section" },
  { value: "tree", label: "Tree" },
  { value: "side-block", label: "Side Block" },
  { value: "line", label: "Line" },
  { value: "dots", label: "Dots" },
  { value: "bottom_line", label: "Bottom Line" },
];

const DEFAULT_MODULES = new Set(["os", "kernel", "uptime", "packages", "shell", "wm", "cpu", "gpu", "memory", "disk", "palette"]);

const PLUGINS = [
  { name: "animate-logo", desc: "Animates ASCII logos with multiple color effects via JSON protocol.", tags: ["sweep", "wave", "rainbow", "sparkle", "breathing", "frame"] },
  { name: "github-stats", desc: "Fetches GitHub user stats via the public API.", tags: ["github", "api"] },
  { name: "custom", desc: "Any executable reading JSON from stdin and writing JSON to stdout works.", tags: ["JSON protocol", "any language"] },
];

const PHASES = [
  { title: "Phase 0-3 — Foundation & modules", desc: "Core system, all info modules, 20+ example configs, install scripts, layouts, documentation.", status: "done" },
  { title: "Phase 4 — Package manager expansion", desc: "RPM, APK (Alpine), Nix, Homebrew, Chocolatey, multi-manager detection.", status: "" },
  { title: "Phase 5 — Network & connectivity", desc: "Local/public IP (with privacy toggle), IPv6, network interface display.", status: "" },
  { title: "Phase 6 — Enhanced modules", desc: "Music player (MPD), Spotify, weather, timezone, user info, display resolution, theme detection.", status: "" },
  { title: "Phase 7 — Additional layouts", desc: "Compact, horizontal, bottom, minimal (text-only).", status: "" },
  { title: "Phase 8 — Performance", desc: "Parallel probing, caching, lazy loading, benchmarking, profiling.", status: "" },
  { title: "Phase 9 — CI/CD & distribution", desc: "GitHub Actions, macOS/Windows binaries, Homebrew tap, AUR, changelog automation.", status: "partial" },
  { title: "Phase 10 — Community & ecosystem", desc: "Themes registry, plugin system, community contributions, theme preview tool.", status: "partial" },
  { title: "Phase 11 — Testing & QA", desc: "Unit/integration tests, clippy, rustfmt, platform-specific tests, coverage.", status: "partial" },
  { title: "Phase 12 — Advanced features", desc: "Custom scripting, conditional modules, theme variables, daemon mode, hot-reload, telemetry (opt-in).", status: "" },
  { title: "Phase 13 — Marketing", desc: "User manual, video tutorials, project website, blog posts, comparison guide, community channel.", status: "partial" },
];

export default function Home() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [seen, setSeen] = useState<Set<number>>(new Set([0]));
  const [installTab, setInstallTab] = useState("linux");
  const [selectedModules, setSelectedModules] = useState<Set<string>>(DEFAULT_MODULES);
  const [configLayout, setConfigLayout] = useState("null");

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-stage]");
    if (sections.length === 0) return;

    const update = () => {
      let pastCount = 0;
      const nextSeen = new Set(seen);
      sections.forEach((el, idx) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom <= 0) pastCount = idx + 1;
        if (rect.top < window.innerHeight - 60) nextSeen.add(idx);
      });
      setActiveIdx(pastCount);
      if (nextSeen.size !== seen.size) setSeen(nextSeen);
    };

    update();
    const observer = new IntersectionObserver(update, { threshold: [0] });
    sections.forEach((el) => observer.observe(el));
    window.addEventListener("scroll", update, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener("scroll", update); };
  }, [seen]);

  const dim = (idx: number) => idx < activeIdx;
  const visible = (idx: number) => seen.has(idx);

  const toggleModule = (value: string) => {
    const next = new Set(selectedModules);
    if (next.has(value)) next.delete(value); else next.add(value);
    setSelectedModules(next);
  };

  const configJson = [
    "{",
    configLayout !== "null" ? `  "layout": ${JSON.stringify(configLayout)},` : "",
    '  "modules": [',
    ALL_MODULES.filter((m) => selectedModules.has(m.value)).length
      ? `    ${ALL_MODULES.filter((m) => selectedModules.has(m.value)).map((m) => JSON.stringify(m.value)).join(",\n    ")}`
      : "",
    "  ],",
    '  "show_colors": true',
    "}",
  ].filter(Boolean).join("\n");

  const sectionStyle = (idx: number): React.CSSProperties => {
    const isDim = dim(idx);
    const isVis = visible(idx);
    return {
      opacity: isVis ? (isDim ? 0.34 : 1) : 0,
      filter: isDim ? "blur(6px) saturate(0.72) brightness(0.78)" : isVis ? "blur(0)" : "blur(8px)",
      transform: isDim ? "scale(0.985)" : isVis ? "translateY(0)" : "translateY(2rem)",
      transition: "opacity 0.55s ease, filter 0.55s ease, transform 0.55s ease",
    };
  };

  return (
    <>
      <div className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-6">
        <div className="flex flex-col gap-[clamp(4.5rem,12vh,14rem)] pb-[clamp(4.5rem,12vh,14rem)]">
          {/* STAGE 0 - Title/Header */}
          <section data-stage={0} style={sectionStyle(0)}>
            <Hero />
          </section>

          {/* STAGE 1 - Video demo */}
          <section data-stage={1} style={sectionStyle(1)}>
            <div className="overflow-hidden rounded-xl border border-[#22263a]/60">
              <video className="block w-full h-auto" src="https://i.imgur.com/8qcIITv.mp4" autoPlay loop muted playsInline />
            </div>
          </section>

          {/* STAGE 2 - Features */}
          <section data-stage={2} style={sectionStyle(2)}>
            <Features features={FEATURES} />
          </section>

          {/* STAGE 3 - Terminal demo */}
          <section data-stage={3} style={sectionStyle(3)}>
            <TerminalDemo />
          </section>

          {/* STAGE 4 - Modules reference */}
          <section data-stage={4} style={sectionStyle(4)}>
            <ModulesTable modules={MODULES} />
          </section>

          {/* STAGE 5 - Layout showcase */}
          <section data-stage={5} style={sectionStyle(5)}>
            <LayoutShowcase layouts={LAYOUTS} />
          </section>

          {/* STAGE 6 - Installation */}
          <section data-stage={6} style={sectionStyle(6)}>
            <InstallTabs tabs={INSTALL_TABS} content={INSTALL_CONTENT} installTab={installTab} setInstallTab={setInstallTab} />
          </section>

          {/* STAGE 7 - Configuration builder */}
          <section data-stage={7} style={sectionStyle(7)}>
            <ConfigBuilder allModules={ALL_MODULES} selectedModules={selectedModules} toggleModule={toggleModule} configLayout={configLayout} setConfigLayout={setConfigLayout} configJson={configJson} layoutOptions={LAYOUT_OPTIONS} />
          </section>

          {/* STAGE 8 - Plugin system */}
          <section data-stage={8} style={sectionStyle(8)}>
            <PluginSection plugins={PLUGINS} />
          </section>

          {/* STAGE 9 - Usage */}
          <section data-stage={9} style={sectionStyle(9)}>
            <div className="grid gap-3">
              <h2 className="m-0 text-lg font-semibold">Usage</h2>
              <p className="m-0 max-w-[68ch] text-[#8b91a8] leading-relaxed">Simply run xfetch in your terminal:</p>
              <pre className="m-0 overflow-x-auto border border-[#22263a]/60 bg-[#0f1117]/90 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words rounded-lg"><code>xfetch</code></pre>
            </div>
          </section>

          {/* STAGE 10 - Roadmap */}
          <section data-stage={10} style={sectionStyle(10)}>
            <Roadmap phases={PHASES} />
          </section>

          {/* STAGE 11 - Uninstall + Source link */}
          <section data-stage={11} style={sectionStyle(11)}>
            <div className="grid gap-3">
              <h2 className="m-0 text-lg font-semibold">Uninstall</h2>
              <h3 className="m-0 text-sm font-semibold text-[#8b91a8]">Quick uninstall</h3>
              <pre className="m-0 overflow-x-auto border border-[#22263a]/60 bg-[#0f1117]/90 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words rounded-lg"><code>curl -fsSL https://raw.githubusercontent.com/xscriptor/xfetch/main/uninstall.sh | bash</code></pre>
              <h3 className="m-0 text-sm font-semibold text-[#8b91a8]">Manual uninstall</h3>
              <pre className="m-0 overflow-x-auto border border-[#22263a]/60 bg-[#0f1117]/90 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words rounded-lg"><code>{`rm ~/.local/bin/xfetch\nrm -rf ~/.config/xfetch`}</code></pre>
            </div>
            <div className="flex justify-center pt-2">
              <a className="inline-flex items-center justify-center min-h-[2.85rem] px-7 py-3 border border-[#ffc400] text-[#1a1a1a] bg-[#ffc400] no-underline text-sm font-bold tracking-wide rounded-lg transition-all hover:opacity-90" href="https://github.com/xscriptor/xfetch" target="_blank" rel="noopener noreferrer">
                View Source Code
              </a>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </>
  );
}
