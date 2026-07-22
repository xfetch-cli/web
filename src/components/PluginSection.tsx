export default function PluginSection({ plugins }: { plugins: { name: string; desc: string; tags: string[] }[] }) {
  return (
    <div className="grid gap-3">
      <h2 className="m-0 text-lg font-semibold">Plugin system</h2>
      <p className="m-0 max-w-[68ch] text-[#8b91a8] leading-relaxed">xfetch communicates with external plugins via JSON over stdin/stdout. Install, list, and remove plugins with simple CLI commands.</p>
      <pre className="m-0 overflow-x-auto border border-[#22263a]/60 bg-[#0f1117]/86 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words rounded-lg">
        <code>
          <span className="text-[#5a5f7a]"># Install from local path</span>{"\n"}
          xfetch plugin install ./plugins/animate-logo{"\n\n"}
          <span className="text-[#5a5f7a]"># List installed</span>{"\n"}
          xfetch plugin list{"\n\n"}
          <span className="text-[#5a5f7a]"># Remove</span>{"\n"}
          xfetch plugin remove animate-logo
        </code>
      </pre>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3">
        {plugins.map((p) => (
          <div key={p.name} className="grid gap-[0.4rem] p-[0.85rem] rounded-lg border border-[#22263a]/60 bg-[#0f1117]/90">
            <h4 className="m-0 font-mono text-sm text-[#dea584] font-semibold">{p.name}</h4>
            <p className="m-0 text-xs text-[#8b91a8] leading-relaxed">{p.desc}</p>
            <div className="flex flex-wrap gap-[0.3rem] mt-[0.2rem]">
              {p.tags.map((tag) => (
                <span key={tag} className="inline-block px-[0.4rem] py-[0.15rem] font-mono text-[0.65rem] rounded-md bg-[#0f1117]/88 border border-[#22263a]/50 text-[#8b91a8]">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="m-0 max-w-[68ch] text-[#8b91a8] leading-relaxed">Plugin discovery: explicit path → <code className="text-[#dea584]">xfetch-plugin-&lt;name&gt;</code> in PATH → <code className="text-[#dea584]">~/.config/xfetch/plugins/</code> → <code className="text-[#dea584]">./plugins/&lt;name&gt;/target/release</code></p>
    </div>
  );
}
