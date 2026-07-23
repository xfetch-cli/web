"use client";

import { XGlassNavbar } from "@xscriptor/xcomponents/navigation";
import type { NavLinkItem } from "@xscriptor/xcomponents/navigation";

const linksLeft: NavLinkItem[] = [
  { url: "/#features", title: "Features" },
  { url: "/#terminal", title: "Demo" },
  { url: "/#install", title: "Install" },
  { url: "/#layouts", title: "Layouts" },
];

const linksRight: NavLinkItem[] = [
  { url: "/#config", title: "Configure" },
  { url: "/#plugins", title: "Plugins" },
  { url: "/#roadmap", title: "Roadmap" },
  { url: "/docs", title: "Docs" },
];

const SunIcon = ({ size, color }: { size: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="5" />
    <line x1="12" y1="1" x2="12" y2="3" />
    <line x1="12" y1="21" x2="12" y2="23" />
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
    <line x1="1" y1="12" x2="3" y2="12" />
    <line x1="21" y1="12" x2="23" y2="12" />
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
  </svg>
);

const MoonIcon = ({ size, color }: { size: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color ?? "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

export default function SiteNav() {
  return (
    <XGlassNavbar
      linksLeft={linksLeft}
      linksRight={linksRight}
      logo={
        <span className="font-mono font-bold text-accent text-lg">xfetch</span>
      }
      logoAsThemeToggle
      themeIcons={{
        toDark: (size, color) => <MoonIcon size={size} color={color} />,
        toLight: (size, color) => <SunIcon size={size} color={color} />,
      }}
      defaultTheme="dark"
      storageKey="xfetch-theme"
      iconSize={18}
      labelDark="Dark"
      labelLight="Light"
      labelOpen="Open menu"
      labelClose="Close menu"
      navLabel="Main navigation"
      menuLabel="Navigation menu"
    />
  );
}
