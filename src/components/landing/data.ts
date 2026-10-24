export type Feature = {
  key: string;
  icon: string;
  title: string;
  desc: string;
};

export const FEATURES: Feature[] = [
  {
    key: "sysinfo",
    icon: "sysinfo",
    title: "System information",
    desc: "OS, kernel, CPU, GPU, memory, disk, battery, uptime, packages, shell, terminal, WM/DE and more.",
  },
  {
    key: "crossplatform",
    icon: "crossplatform",
    title: "Cross-platform",
    desc: "Works on Linux, Windows, and macOS. Same tool, same config — everywhere.",
  },
  {
    key: "layouts",
    icon: "layouts-icon",
    title: "Multiple layouts",
    desc: "Classic side-by-side, Pac-Man, tree, section, side-block, box, lines, dots, and bottom-line.",
  },
  {
    key: "jsonc",
    icon: "jsonc",
    title: "JSONC config",
    desc: "Full customization via config.jsonc — modules, icons, colors, logos, and layouts.",
  },
  {
    key: "palette",
    icon: "palette-icon",
    title: "Color palette",
    desc: "Built-in ANSI color palette display with square, circle, triangle, and line styles.",
  },
  {
    key: "plugins",
    icon: "plugins-icon",
    title: "Plugin system",
    desc: "Extend with external plugins via JSON over stdin/stdout. Animate logos, fetch GitHub stats, and more.",
  },
  {
    key: "logoanim",
    icon: "logoanim",
    title: "Logo animation",
    desc: "Animate ASCII logos with sweep, wave, rainbow, sparkle, breathing, and frame-by-frame styles.",
  },
  {
    key: "nerdfont",
    icon: "nerdfont",
    title: "NERD Font icons",
    desc: "Customizable Nerd Font icons per module. Use emojis, text, or any Unicode glyph.",
  },
  {
    key: "logos",
    icon: "logos-icon",
    title: "ASCII & image logos",
    desc: "Display text logos with ANSI colors or image files (png, jpg, svg) via viuer.",
  },
];

export const MODULE_CATEGORIES = [
  "All",
  "Hardware",
  "Software",
  "System",
  "Session",
  "Network",
  "Display",
] as const;

export type ModuleCategory = (typeof MODULE_CATEGORIES)[number];

export type ModuleEntry = {
  icon: string;
  name: string;
  desc: string;
  category: Exclude<ModuleCategory, "All">;
};

export const MODULES: ModuleEntry[] = [
  { icon: "os", name: "os", desc: "Operating system name, version & architecture", category: "System" },
  { icon: "kernel", name: "kernel", desc: "Kernel version", category: "System" },
  { icon: "hostname", name: "hostname", desc: "Machine hostname", category: "System" },
  { icon: "uptime", name: "uptime", desc: "System uptime", category: "System" },
  { icon: "packages", name: "packages", desc: "Package count (pacman, dpkg, scoop, brew, etc.)", category: "Software" },
  { icon: "shell", name: "shell", desc: "Current shell (bash, zsh, powershell)", category: "Software" },
  { icon: "terminal-icon", name: "terminal", desc: "Terminal emulator", category: "Software" },
  { icon: "wm", name: "wm", desc: "Window Manager / Desktop Environment", category: "Software" },
  { icon: "cpu", name: "cpu", desc: "CPU model, cores & frequency", category: "Hardware" },
  { icon: "gpu", name: "gpu", desc: "GPU model(s) — integrated & discrete", category: "Hardware" },
  { icon: "memory", name: "memory", desc: "RAM used / total with percentage", category: "Hardware" },
  { icon: "swap", name: "swap", desc: "Swap usage", category: "Hardware" },
  { icon: "disk", name: "disk", desc: "Disk usage", category: "Hardware" },
  { icon: "battery", name: "battery", desc: "Battery level & status (charging/discharging)", category: "Hardware" },
  { icon: "user", name: "user", desc: "Current username", category: "Session" },
  { icon: "datetime", name: "datetime", desc: "Current date & time", category: "Session" },
  { icon: "local_ip", name: "local_ip", desc: "Local IP address", category: "Network" },
  { icon: "palette-mod", name: "palette", desc: "ANSI color palette (squares, circles, triangles, lines)", category: "Display" },
];

export type LayoutExample = {
  id: string;
  title: string;
  desc: string;
  code: string;
  preview: "default" | "pacman" | "section" | "side-block" | "tree" | "box";
};

export const LAYOUT_EXAMPLES: LayoutExample[] = [
  {
    id: "default",
    title: "Default (Classic)",
    desc: "Logo on the left, info on the right. Clean and familiar.",
    code: '{\n  "layout": null\n}',
    preview: "default",
  },
  {
    id: "pacman",
    title: "Pac-Man",
    desc: "Boxed layout with Pac-Man header and footer. Fun and retro.",
    code: '{\n  "layout": "pacman"\n}',
    preview: "pacman",
  },
  {
    id: "section",
    title: "Section",
    desc: "Grouped modules with clear section headers.",
    code: '{\n  "layout": "section",\n  "modules": [\n    { "type": "group", "title": "Hardware",\n      "modules": ["cpu","gpu","memory"] },\n    { "type": "group", "title": "Software",\n      "modules": ["os","shell"] }\n  ]\n}',
    preview: "section",
  },
  {
    id: "side-block",
    title: "Side Block",
    desc: "Keys and values in separate side-by-side boxes.",
    code: '{\n  "layout": "side-block"\n}',
    preview: "side-block",
  },
  {
    id: "tree",
    title: "Tree",
    desc: "Hierarchical tree with nested groups. Great for organizing.",
    code: '{\n  "layout": "tree",\n  "modules": [\n    { "type": "group", "title": "OS",\n      "modules": ["os","kernel","packages"] },\n    { "type": "group", "title": "PC",\n      "modules": ["cpu","gpu","memory"] }\n  ]\n}',
    preview: "tree",
  },
  {
    id: "box",
    title: "Box",
    desc: "All info enclosed in a rounded box.",
    code: '{\n  "layout": "box"\n}',
    preview: "box",
  },
];

export type InstallTab = { id: string; label: string };
export type InstallLine = { text: string; comment: boolean };
export type InstallContent = Record<string, { lines: InstallLine[] }>;

export const INSTALL_TABS: InstallTab[] = [
  { id: "linux", label: "Linux / macOS" },
  { id: "windows", label: "Windows" },
  { id: "source", label: "Build from source" },
  { id: "arch", label: "Arch/X Linux" },
];

export const INSTALL_CONTENT: InstallContent = {
  linux: {
    lines: [
      { text: "# One-liner (curl)", comment: true },
      {
        text: "curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.sh | bash",
        comment: false,
      },
      { text: "", comment: false },
      { text: "# Custom prefix", comment: true },
      { text: "bash <(curl -fsSL ...) --prefix /usr/local", comment: false },
    ],
  },
  windows: {
    lines: [
      { text: "# PowerShell one-liner", comment: true },
      {
        text: "irm https://raw.githubusercontent.com/xfetch-cli/xfetch/main/install.ps1 | iex",
        comment: false,
      },
    ],
  },
  source: {
    lines: [
      { text: "# Clone & build manually", comment: true },
      { text: "git clone https://github.com/xfetch-cli/xfetch.git", comment: false },
      { text: "cd xfetch", comment: false },
      { text: "cargo build --release", comment: false },
      { text: "", comment: false },
      { text: "# Binary → target/release/xfetch", comment: true },
      { text: "cp target/release/xfetch ~/.local/bin/", comment: false },
      { text: "", comment: false },
      { text: "# Config files", comment: true },
      { text: "mkdir -p ~/.config/xfetch", comment: false },
      { text: "cp configs/config.jsonc ~/.config/xfetch/config.jsonc", comment: false },
    ],
  },
  arch: {
    lines: [
      { text: "# Using the PKGBUILD in the repo", comment: true },
      { text: "git clone https://github.com/xfetch-cli/xfetch.git", comment: false },
      { text: "cd xfetch", comment: false },
      { text: "makepkg -si", comment: false },
      { text: "", comment: false },
      { text: "# Installed to /usr/bin/xfetch", comment: true },
      { text: "pacman -R xfetch-git   # to uninstall", comment: false },
    ],
  },
};

export const ALL_MODULES = [
  { value: "os", icon: "os" as const },
  { value: "kernel", icon: "kernel" as const },
  { value: "hostname", icon: "hostname" as const },
  { value: "uptime", icon: "uptime" as const },
  { value: "packages", icon: "packages" as const },
  { value: "shell", icon: "shell" as const },
  { value: "terminal", icon: "terminal-icon" as const },
  { value: "wm", icon: "wm" as const },
  { value: "cpu", icon: "cpu" as const },
  { value: "gpu", icon: "gpu" as const },
  { value: "memory", icon: "memory" as const },
  { value: "swap", icon: "swap" as const },
  { value: "disk", icon: "disk" as const },
  { value: "battery", icon: "battery" as const },
  { value: "user", icon: "user" as const },
  { value: "datetime", icon: "datetime" as const },
  { value: "local_ip", icon: "local_ip" as const },
  { value: "palette", icon: "palette-mod" as const },
];

export const LAYOUT_OPTIONS = [
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

export const DEFAULT_MODULES = [
  "os",
  "kernel",
  "uptime",
  "packages",
  "shell",
  "wm",
  "cpu",
  "gpu",
  "memory",
  "disk",
  "palette",
];

export type PluginEntry = { name: string; desc: string; tags: string[] };

export const PLUGINS: PluginEntry[] = [
  {
    name: "animate-logo",
    desc: "Animates ASCII logos with multiple color effects via JSON protocol.",
    tags: ["sweep", "wave", "rainbow", "sparkle", "breathing", "frame"],
  },
  {
    name: "github-stats",
    desc: "Fetches GitHub user stats via the public API.",
    tags: ["github", "api"],
  },
  {
    name: "custom",
    desc: "Any executable reading JSON from stdin and writing JSON to stdout works.",
    tags: ["JSON protocol", "any language"],
  },
];

export type Phase = { title: string; desc: string; status: "done" | "partial" | "planned" };

export const PHASES: Phase[] = [
  {
    title: "Phase 0-3 — Foundation & modules",
    desc: "Core system, all info modules, 20+ example configs, install scripts, layouts, documentation.",
    status: "done",
  },
  {
    title: "Phase 4 — Package manager expansion",
    desc: "RPM, APK (Alpine), Nix, Homebrew, Chocolatey, multi-manager detection, performance optimization.",
    status: "done",
  },
  {
    title: "Phase 5 — Network & connectivity",
    desc: "Local/public IP (with privacy toggle), IPv6, network interface display.",
    status: "done",
  },
  {
    title: "Phase 6 — Enhanced modules",
    desc: "Music player (MPD), Spotify, weather, timezone, user info, display resolution, theme detection.",
    status: "done",
  },
  {
    title: "Phase 7 — Additional layouts",
    desc: "Compact, horizontal, bottom, minimal (text-only), layout preview documentation.",
    status: "done",
  },
  {
    title: "Phase 8 — Performance",
    desc: "Parallel probing, caching, lazy loading, benchmarking, profiling, modularized files.",
    status: "done",
  },
  {
    title: "Phase 9 — CI/CD & distribution",
    desc: "GitHub Actions, macOS/Windows binaries, Homebrew tap, AUR, install scripts, changelog automation.",
    status: "done",
  },
  {
    title: "Phase 10 — Community & ecosystem",
    desc: "Themes registry, plugin system, theme download manager, community contributions, theme preview tool.",
    status: "done",
  },
  {
    title: "Phase 11 — Testing & QA",
    desc: "Unit/integration tests, clippy, rustfmt, platform-specific tests, cross-platform suite, coverage.",
    status: "partial",
  },
  {
    title: "Phase 12 — Advanced features",
    desc: "Daemon mode, custom scripting, conditional modules, theme variables, telemetry (opt-in); pending: real-time stats in daemon mode, config hot-reload, animations, accessibility.",
    status: "partial",
  },
  {
    title: "Phase 13 — Marketing",
    desc: "User manual, video tutorials, project website, blog posts, comparison guide, community channel.",
    status: "partial",
  },
];

export const INSTALL_AFTER = "$ xfetch\n$ xfetch --version\n$ xfetch --gen-config";

export const PLUGIN_COMMANDS = `# Install from local path
xfetch plugin install ./plugins/animate-logo

# List installed
xfetch plugin list

# Remove
xfetch plugin remove animate-logo`;

export const QUICK_UNINSTALL =
  "curl -fsSL https://raw.githubusercontent.com/xfetch-cli/xfetch/main/uninstall.sh | bash";

export const MANUAL_UNINSTALL = "rm ~/.local/bin/xfetch\nrm -rf ~/.config/xfetch";

export const CUSTOM_CONFIG_COMMAND = "xfetch --config path/to/my_config.jsonc";
