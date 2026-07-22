import React, { type SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

const s = (props: Props, size = 20) => ({ width: props.size ?? size, height: props.size ?? size, viewBox: "0 0 16 16", fill: "none", stroke: "currentColor", strokeWidth: 1.3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, ...props });

export function IconSysinfo(props: Props) {
  return <svg {...s(props)}><rect x="2" y="2" width="12" height="12" rx="2" /><circle cx="8" cy="8" r="2" /><path d="M2 10h12" /></svg>;
}

export function IconGlobe(props: Props) {
  return <svg {...s(props)}><circle cx="8" cy="8" r="6" /><path d="M2 8h12" /><path d="M8 2a10 10 0 0 1 0 12 10 10 0 0 1 0-12z" /></svg>;
}

export function IconLayouts(props: Props) {
  return <svg {...s(props)}><rect x="2" y="2" width="5" height="5" rx="1" /><rect x="9" y="2" width="5" height="5" rx="1" /><rect x="2" y="9" width="5" height="5" rx="1" /><rect x="9" y="9" width="5" height="5" rx="1" /></svg>;
}

export function IconJsonc(props: Props) {
  return <svg {...s(props)}><path d="M4 2h8l2 2v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" /><path d="M6 7l-2 2 2 2M10 7l2 2-2 2" /></svg>;
}

export function IconPalette(props: Props) {
  return <svg {...s(props)}><circle cx="8" cy="8" r="6" /><circle cx="8" cy="8" r="2" fill="currentColor" /><path d="M8 2v3M8 11v3M2 8h3M11 8h3" /></svg>;
}

export function IconPlugins(props: Props) {
  return <svg {...s(props)}><rect x="3" y="5" width="10" height="8" rx="1" /><path d="M5 5V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" /></svg>;
}

export function IconLogoAnim(props: Props) {
  return <svg {...s(props)}><path d="M8 2l1.5 3 3.5.5-2.5 2.5.5 3.5L8 9.5 5 11.5l.5-3.5L3 5.5 6.5 5z" /></svg>;
}

export function IconNerdfont(props: Props) {
  return <svg {...s(props)}><rect x="2" y="4" width="12" height="8" rx="1" /><text x="4" y="10" fontSize="6" fill="currentColor" stroke="none" fontFamily="monospace">N</text></svg>;
}

export function IconLogos(props: Props) {
  return <svg {...s(props)}><rect x="2" y="2" width="12" height="12" rx="2" /><circle cx="6" cy="6" r="1.5" fill="currentColor" stroke="none" /><path d="M2 12l3-3 2 2 3-4 4 5" strokeWidth="1" /></svg>;
}

export function IconOs(props: Props) {
  return <svg {...s(props)}><rect x="3" y="2" width="10" height="12" rx="1" /><line x1="3" y1="6" x2="13" y2="6" /><circle cx="8" cy="10" r="1" /></svg>;
}

export function IconKernel(props: Props) {
  return <svg {...s(props)}><rect x="4" y="2" width="8" height="12" rx="1" /><circle cx="8" cy="8" r="2" fill="currentColor" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="8" y1="10" x2="8" y2="14" /></svg>;
}

export function IconHostname(props: Props) {
  return <svg {...s(props)}><rect x="3" y="2" width="10" height="10" rx="1" /><rect x="5" y="8" width="6" height="6" rx="2" fill="currentColor" stroke="none" /><line x1="8" y1="8" x2="8" y2="10" /></svg>;
}

export function IconUptime(props: Props) {
  return <svg {...s(props)}><circle cx="8" cy="8" r="6" /><polyline points="8,4 8,8 11,10" /></svg>;
}

export function IconPackages(props: Props) {
  return <svg {...s(props)}><path d="M3 4l5-2 5 2v8l-5 2-5-2z" /><line x1="8" y1="2" x2="8" y2="12" /><line x1="3" y1="6" x2="8" y2="8" /><line x1="8" y1="8" x2="13" y2="6" /></svg>;
}

export function IconShell(props: Props) {
  return <svg {...s(props)}><polyline points="5,5 8,8 5,11" /><line x1="11" y1="10" x2="9" y2="10" /></svg>;
}

export function IconTerminal(props: Props) {
  return <svg {...s(props)}><rect x="2" y="3" width="12" height="10" rx="1" /><polyline points="5,6 7,8 5,10" /><line x1="10" y1="10" x2="8" y2="10" /></svg>;
}

export function IconWm(props: Props) {
  return <svg {...s(props)}><rect x="2" y="3" width="12" height="10" rx="1" /><line x1="2" y1="7" x2="14" y2="7" /><rect x="4" y="9" width="3" height="4" /><rect x="9" y="9" width="3" height="4" /></svg>;
}

export function IconCpu(props: Props) {
  return <svg {...s(props)}><rect x="4" y="4" width="8" height="8" rx="1" /><line x1="8" y1="2" x2="8" y2="4" /><line x1="8" y1="12" x2="8" y2="14" /><line x1="2" y1="8" x2="4" y2="8" /><line x1="12" y1="8" x2="14" y2="8" /></svg>;
}

export function IconGpu(props: Props) {
  return <svg {...s(props)}><rect x="2" y="5" width="12" height="6" rx="1" /><rect x="4" y="7" width="4" height="2" rx=".5" fill="currentColor" stroke="none" /><line x1="10" y1="7" x2="12" y2="7" /><line x1="10" y1="9" x2="12" y2="9" /></svg>;
}

export function IconMemory(props: Props) {
  return <svg {...s(props)}><rect x="3" y="3" width="10" height="10" rx="1" /><line x1="5" y1="5" x2="5" y2="11" /><line x1="8" y1="5" x2="8" y2="11" /><line x1="11" y1="5" x2="11" y2="11" /></svg>;
}

export function IconSwap(props: Props) {
  return <svg {...s(props)}><path d="M9 2l3 3-3 3M7 8l-3 3 3 3" /><line x1="12" y1="5" x2="4" y2="5" /><line x1="4" y1="11" x2="12" y2="11" /></svg>;
}

export function IconDisk(props: Props) {
  return <svg {...s(props)}><rect x="2" y="3" width="12" height="10" rx="1" /><circle cx="8" cy="8" r="2" fill="currentColor" stroke="none" /></svg>;
}

export function IconBattery(props: Props) {
  return <svg {...s(props)}><rect x="2" y="5" width="10" height="6" rx="1" /><line x1="12" y1="7" x2="13" y2="7" /><line x1="12" y1="9" x2="13" y2="9" /><rect x="4" y="6.5" width="5" height="3" rx=".5" fill="currentColor" stroke="none" /></svg>;
}

export function IconUser(props: Props) {
  return <svg {...s(props)}><circle cx="8" cy="5.5" r="3" /><path d="M3 14c0-3 2.5-5 5-5s5 2 5 5" /></svg>;
}

export function IconDatetime(props: Props) {
  return <svg {...s(props)}><rect x="2" y="3" width="12" height="11" rx="2" /><line x1="2" y1="7" x2="14" y2="7" /><line x1="8" y1="7" x2="8" y2="14" /><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none" /></svg>;
}

export function IconLocalIp(props: Props) {
  return <svg {...s(props)}><circle cx="8" cy="8" r="6" /><path d="M8 2a6 6 0 0 1 0 12" /><path d="M8 2a6 6 0 0 0 0 12" /><line x1="2" y1="8" x2="14" y2="8" /></svg>;
}

export function IconPaletteMod(props: Props) {
  return <svg {...s(props)}><circle cx="4" cy="5" r="2" fill="#f07178" stroke="none" /><circle cx="10" cy="4" r="2" fill="#78dba9" stroke="none" /><circle cx="13" cy="9" r="2" fill="#78dce8" stroke="none" /><circle cx="10" cy="13" r="2" fill="#b388ff" stroke="none" /><circle cx="4" cy="12" r="2" fill="#ffcb6b" stroke="none" /></svg>;
}

export function IconXLogo(props: Props) {
  return <svg {...{ ...s(props, 80), viewBox: "0 0 200 200" }}>
    <defs>
      <linearGradient id="xgrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#dea584" />
        <stop offset="100%" stopColor="#ffa500" />
      </linearGradient>
    </defs>
    <line x1="30" y1="30" x2="170" y2="170" stroke="url(#xgrad)" strokeWidth={24} strokeLinecap="round" />
    <line x1="170" y1="30" x2="30" y2="170" stroke="url(#xgrad)" strokeWidth={24} strokeLinecap="round" />
  </svg>;
}

export function IconGithub(props: Props) {
  return <svg {...{ ...s(props, 18), viewBox: "0 0 24 24" }}><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" fill="currentColor" /></svg>;
}

const featureIconMap: Record<string, React.FC<Props>> = {
  sysinfo: IconSysinfo, crossplatform: IconGlobe, "layouts-icon": IconLayouts,
  jsonc: IconJsonc, "palette-icon": IconPalette, "plugins-icon": IconPlugins,
  logoanim: IconLogoAnim, nerdfont: IconNerdfont, "logos-icon": IconLogos,
};

const moduleIconMap: Record<string, React.FC<Props>> = {
  os: IconOs, kernel: IconKernel, hostname: IconHostname, uptime: IconUptime,
  packages: IconPackages, shell: IconShell, "terminal-icon": IconTerminal,
  wm: IconWm, cpu: IconCpu, gpu: IconGpu, memory: IconMemory, swap: IconSwap,
  disk: IconDisk, battery: IconBattery, user: IconUser, datetime: IconDatetime,
  local_ip: IconLocalIp, "palette-mod": IconPaletteMod,
};

export function renderFeatureIcon(name: string, size = 20, className?: string): React.ReactElement | null {
  const Comp = featureIconMap[name];
  if (!Comp) return null;
  return <Comp size={size} className={className} />;
}

export function renderModuleIcon(name: string, size = 20, className?: string): React.ReactElement | null {
  const Comp = moduleIconMap[name];
  if (!Comp) return null;
  return <Comp size={size} className={className} />;
}

export function getIconForFeature(title: string): string {
  const m: Record<string, string> = {
    "System information": "sysinfo",
    "Cross-platform": "crossplatform",
    "Multiple layouts": "layouts-icon",
    "JSONC config": "jsonc",
    "Color palette": "palette-icon",
    "Plugin system": "plugins-icon",
    "Logo animation": "logoanim",
    "NERD Font icons": "nerdfont",
    "ASCII & image logos": "logos-icon",
  };
  return m[title] ?? "sysinfo";
}

export function getIconForModule(module: string): string {
  const m: Record<string, string> = {
    os: "os", kernel: "kernel", hostname: "hostname", uptime: "uptime",
    packages: "packages", shell: "shell", terminal: "terminal-icon", wm: "wm",
    cpu: "cpu", gpu: "gpu", memory: "memory", swap: "swap",
    disk: "disk", battery: "battery", user: "user", datetime: "datetime",
    local_ip: "local_ip", palette: "palette-mod",
  };
  return m[module] ?? "os";
}
