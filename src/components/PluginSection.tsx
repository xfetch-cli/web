export default function PluginSection({ plugins }: { plugins: { name: string; desc: string; tags: string[] }[] }) {
  return (
    <div className="grid gap-3">
      <h2 className="m-0 text-lg font-semibold">Plugin system</h2>
      <p className="m-0 max-w-[68ch] text-fg2 leading-relaxed">xfetch communicates with external plugins via JSON over stdin/stdout. Install, list, and remove plugins with simple CLI commands.</p>
      <pre className="m-0 overflow-x-auto border border-bg3/60 bg-bg/86 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words rounded-lg">
        <code>
          <span className="text-fg2/60"># Install from local path</span>{"\n"}
          xfetch plugin install ./plugins/animate-logo{"\n\n"}
          <span className="text-fg2/60"># List installed</span>{"\n"}
          xfetch plugin list{"\n\n"}
          <span className="text-fg2/60"># Remove</span>{"\n"}
          xfetch plugin remove animate-logo
        </code>
      </pre>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] gap-3">
        {plugins.map((p) => (
          <div key={p.name} className="grid gap-[0.4rem] p-[0.85rem] rounded-lg border border-bg3/60 bg-bg/90">
            <h4 className="m-0 font-mono text-sm text-accent font-semibold">{p.name}</h4>
            <p className="m-0 text-xs text-fg2 leading-relaxed">{p.desc}</p>
            <div className="flex flex-wrap gap-[0.3rem] mt-[0.2rem]">
              {p.tags.map((tag) => (
                <span key={tag} className="inline-block px-[0.4rem] py-[0.15rem] font-mono text-[0.65rem] rounded-md bg-bg/88 border border-bg3/50 text-fg2">{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="m-0 max-w-[68ch] text-fg2 leading-relaxed">Plugin discovery: explicit path → <code className="text-accent">xfetch-plugin-&lt;name&gt;</code> in PATH → <code className="text-accent">~/.config/xfetch/plugins/</code> → <code className="text-accent">./plugins/&lt;name&gt;/target/release</code></p>
    </div>
  );
}
