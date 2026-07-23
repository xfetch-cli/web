"use client";

import { useRef, useState, useCallback } from "react";

function CopyBtn({ getText }: { getText: () => string }) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(() => {
    navigator.clipboard.writeText(getText()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    }).catch(() => {});
  }, [getText]);

  return (
    <button onClick={copy} aria-label="Copy to clipboard"
      className="absolute top-2 right-2 p-1.5 rounded-md border border-bg3/50 bg-bg/80 text-fg2/60 opacity-60 transition-all hover:bg-bg hover:text-fg hover:opacity-100 cursor-pointer"
    >
      {copied ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

function PreBlock({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLPreElement>(null);
  const getText = useCallback(() => ref.current?.textContent ?? "", []);

  return (
    <pre ref={ref}
      className={`group relative m-0 overflow-x-auto border border-bg3/60 bg-bg/86 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words ${className}`}
    >
      <CopyBtn getText={getText} />
      {children}
    </pre>
  );
}

export default function InstallTabs({
  tabs, content, installTab, setInstallTab,
}: {
  tabs: { id: string; label: string }[];
  content: Record<string, { lines: { text: string; comment: boolean }[] }>;
  installTab: string;
  setInstallTab: (v: string) => void;
}) {
  return (
    <div className="grid gap-3">
      <h2 className="m-0 text-lg font-semibold">Installation</h2>
      <p className="m-0 max-w-[68ch] text-fg2 leading-relaxed">Choose your platform. The quick installer handles everything — including Rust setup if needed.</p>
      <div className="flex flex-wrap gap-[0.15rem]">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setInstallTab(tab.id)}
            className={`px-3 py-[0.4rem] font-mono text-xs border border-bg3/60 border-b-0 rounded-t-md bg-bg/92 text-fg2 cursor-pointer transition-all hover:bg-bg/85 hover:text-fg ${installTab === tab.id ? "bg-bg/86 text-fg font-semibold border-bg3/60" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <PreBlock className="rounded-b-lg rounded-tr-lg">
        <code>{content[installTab].lines.map((line, i) => (
          <span key={i} className={line.comment ? "text-fg2/60" : ""}>{line.text}{"\n"}</span>
        ))}</code>
      </PreBlock>
      <div className="grid gap-2">
        <p className="m-0 max-w-[68ch] text-fg2 leading-relaxed">After install, just run:</p>
        <PreBlock className="rounded-lg">
          <code><span className="text-[#78dba9]">$</span> xfetch{"\n"}<span className="text-[#78dba9]">$</span> xfetch --version{"\n"}<span className="text-[#78dba9]">$</span> xfetch --gen-config</code>
        </PreBlock>
      </div>
    </div>
  );
}
