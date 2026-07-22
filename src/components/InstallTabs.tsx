"use client";

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
      <p className="m-0 max-w-[68ch] text-[#8b91a8] leading-relaxed">Choose your platform. The quick installer handles everything — including Rust setup if needed.</p>
      <div className="flex flex-wrap gap-[0.15rem]">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setInstallTab(tab.id)}
            className={`px-3 py-[0.4rem] font-mono text-xs border border-[#22263a]/60 border-b-0 rounded-t-md bg-[#0f1117]/92 text-[#8b91a8] cursor-pointer transition-all hover:bg-[#0f1117]/85 hover:text-[#e1e4ed] ${installTab === tab.id ? "bg-[#0f1117]/86 text-[#e1e4ed] font-semibold border-[#22263a]/60" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <pre className="m-0 overflow-x-auto border border-[#22263a]/60 bg-[#0f1117]/86 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words rounded-b-lg rounded-tr-lg">
        <code>{content[installTab].lines.map((line, i) => (
          <span key={i} className={line.comment ? "text-[#5a5f7a]" : ""}>{line.text}{"\n"}</span>
        ))}</code>
      </pre>
      <div className="grid gap-2">
        <p className="m-0 max-w-[68ch] text-[#8b91a8] leading-relaxed">After install, just run:</p>
        <pre className="m-0 overflow-x-auto border border-[#22263a]/60 bg-[#0f1117]/86 p-4 font-mono text-sm leading-relaxed whitespace-pre rounded-lg">
          <code><span className="text-[#78dba9]">$</span> xfetch{"\n"}<span className="text-[#78dba9]">$</span> xfetch --version{"\n"}<span className="text-[#78dba9]">$</span> xfetch --gen-config</code>
        </pre>
      </div>
    </div>
  );
}
