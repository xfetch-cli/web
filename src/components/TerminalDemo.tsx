"use client";

import { useEffect, useRef, useState } from "react";

interface Line {
  type: "empty" | "prompt" | "dim" | "info" | "palette";
  label?: string;
  icon?: string;
  key?: string;
  value?: string;
}

const T_LINES: Line[] = [
  { type: "prompt", label: "$ xfetch" }, { type: "empty" },
  { type: "dim", label: " ────── Hardware ──────" },
  { type: "info", icon: "cpu", key: "cpu", value: "AMD Ryzen 9 7950X (16) @ 4.50 GHz" },
  { type: "info", icon: "gpu", key: "gpu", value: "NVIDIA GeForce RTX 4090" },
  { type: "info", icon: "memory", key: "memory", value: "8.25 GiB / 31.20 GiB (26%)" },
  { type: "info", icon: "disk", key: "disk", value: "256.4 GiB / 1.0 TiB (25%)" },
  { type: "info", icon: "battery", key: "battery", value: "85% [Charging]" },
  { type: "empty" },
  { type: "dim", label: " ────── Software ──────" },
  { type: "info", icon: "os", key: "os", value: "Arch Linux x86_64" },
  { type: "info", icon: "kernel", key: "kernel", value: "6.6.1-arch1-1" },
  { type: "info", icon: "packages", key: "packages", value: "1456 (pacman)" },
  { type: "info", icon: "shell", key: "shell", value: "zsh" },
  { type: "info", icon: "wm", key: "wm", value: "Hyprland" },
  { type: "empty" },
  { type: "dim", label: " ────── Session ──────" },
  { type: "info", icon: "user", key: "user", value: "x0z" },
  { type: "info", icon: "uptime", key: "uptime", value: "2 hours, 15 mins" },
  { type: "info", icon: "datetime", key: "datetime", value: "2026-07-13 14:23:00" },
  { type: "empty" },
  { type: "palette" },
  { type: "empty" },
  { type: "prompt", label: "$ █" },
];

const palColors = ["#f07178","#f78c6c","#ffcb6b","#78dba9","#78dce8","#82aaff","#b388ff","#dea584"];

export default function TerminalDemo() {
  const [termVisible, setTermVisible] = useState(0);
  const termTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    termTimer.current = setInterval(() => { setTermVisible((prev) => (prev < T_LINES.length ? prev + 1 : prev)); }, 40);
    return () => { if (termTimer.current) clearInterval(termTimer.current); };
  }, []);

  const restartTerm = () => {
    setTermVisible(0);
    if (termTimer.current) clearInterval(termTimer.current);
    termTimer.current = setInterval(() => { setTermVisible((prev) => (prev < T_LINES.length ? prev + 1 : prev)); }, 40);
  };

  return (
    <div className="grid gap-3">
      <span className="block font-mono text-xs uppercase tracking-wide text-accent">● Live demo</span>
      <h2 className="m-0 text-lg font-semibold">See it in action</h2>
      <p className="m-0 max-w-[68ch] text-fg2 leading-relaxed">Watch xfetch display your system information in real time. This is a simulated terminal session.</p>
      <div className="flex justify-center w-full">
        <div className="overflow-hidden rounded-xl border border-bg3/60 bg-bg/94 cursor-pointer max-w-[48rem] w-full" onClick={restartTerm} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === "Enter") restartTerm(); }}>
          <div className="flex items-center gap-[0.45rem] px-3 py-[0.55rem] border-b border-bg3/40 bg-bg/92">
            <span className="w-[0.6rem] h-[0.6rem] rounded-full" style={{ background: "#ff5f56" }} />
            <span className="w-[0.6rem] h-[0.6rem] rounded-full" style={{ background: "#ffbd2e" }} />
            <span className="w-[0.6rem] h-[0.6rem] rounded-full" style={{ background: "#27c93f" }} />
            <span className="ml-auto text-xs text-fg2 font-mono">xfetch — bash</span>
          </div>
          <pre className="m-0 px-[0.9rem] pb-[0.9rem] pt-[0.85rem] overflow-x-auto font-mono text-xs leading-relaxed whitespace-pre min-h-[6rem] terminal-scrollbar" style={{ scrollbarWidth: "thin", scrollbarColor: "color-mix(in srgb, var(--color-bg3) 50%, transparent) transparent" }}>
            {T_LINES.slice(0, termVisible).map((line, i) => {
              if (line.type === "empty") return <div key={i} />;
              if (line.type === "prompt") return <div key={i}><span className="text-[#78dba9]">$</span> {line.label}</div>;
              if (line.type === "dim") return <div key={i} className="text-fg2/50 text-[0.72rem]">{line.label}</div>;
              if (line.type === "info") return (
                <div key={i} className="flex gap-2 flex-wrap">
                  <span className="text-[#78dce8] inline-flex items-center gap-1 min-w-[6rem]">{line.key}</span>
                  <span className="text-fg">{line.value}</span>
                </div>
              );
              if (line.type === "palette") return <div key={i} className="text-fg2/50 tracking-wide">{palColors.map((c) => (<span key={c} style={{ color: c }}>███</span>))}</div>;
              return null;
            })}
            <span className="inline-block text-[#78dba9] animate-blink">█</span>
          </pre>
        </div>
      </div>
      <p className="m-0 text-center text-xs text-fg2">Click to replay</p>
    </div>
  );
}
