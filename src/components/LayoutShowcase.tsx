export default function LayoutShowcase({ layouts }: { layouts: { titleKey: string; descKey: string; code: string }[] }) {
  return (
    <div className="grid gap-3">
      <h2 className="m-0 text-lg font-semibold">Layout showcase</h2>
      <p className="m-0 max-w-[68ch] text-[#8b91a8] leading-relaxed">xfetch ships with 9 built-in layouts. Each has a distinct visual style for different preferences.</p>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-3">
        {layouts.map((l) => (
          <div key={l.titleKey} className="grid gap-0 border border-[#22263a]/60 rounded-lg overflow-hidden bg-[#0f1117]/90 transition-all hover:border-[#dea584]/40">
            <pre className="m-0 border-0 border-b border-[#22263a]/40 bg-[#0f1117]/94 p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-words rounded-none"><code>{l.code}</code></pre>
            <div className="grid gap-1 p-[0.65rem_0.75rem_0.75rem]">
              <h4 className="m-0 text-sm font-semibold">{l.titleKey}</h4>
              <p className="m-0 text-xs text-[#8b91a8] leading-relaxed">{l.descKey}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
