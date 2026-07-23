"use client";

import { renderModuleIcon } from "./Icons";

export default function ConfigBuilder({
  allModules, selectedModules, toggleModule, configLayout, setConfigLayout, configJson, layoutOptions,
}: {
  allModules: { value: string; icon: string }[];
  selectedModules: Set<string>;
  toggleModule: (v: string) => void;
  configLayout: string;
  setConfigLayout: (v: string) => void;
  configJson: string;
  layoutOptions: { value: string; label: string }[];
}) {
  return (
    <div className="grid gap-3">
      <h2 className="m-0 text-lg font-semibold">Configuration</h2>
      <p className="m-0 max-w-[68ch] text-fg2 leading-relaxed">Toggle modules and pick a layout to generate a config.jsonc.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2 content-start">
          <p className="m-0 text-sm font-semibold text-fg2">Modules</p>
          <div className="grid gap-[0.2rem]">
            {allModules.map((m) => (
              <label key={m.value} className="flex items-center gap-[0.4rem] px-2 py-[0.25rem] text-sm rounded-md cursor-pointer transition-colors hover:bg-bg/85">
                <input type="checkbox" checked={selectedModules.has(m.value)} onChange={() => toggleModule(m.value)}
                  className="appearance-none w-[0.85rem] h-[0.85rem] border border-bg3/70 rounded-sm bg-bg/86 cursor-pointer inline-flex items-center justify-center transition-all checked:bg-accent checked:border-accent [&:checked::after]:content-['✓'] [&:checked::after]:text-[0.6rem] [&:checked::after]:text-bg [&:checked::after]:font-bold" />
                <span className="inline-flex text-accent">{renderModuleIcon(m.icon, 16)}</span>
                <code className="font-mono text-sm text-accent">{m.value}</code>
              </label>
            ))}
          </div>
          <p className="m-0 text-sm font-semibold text-fg2">Layout</p>
          <select value={configLayout} onChange={(e) => setConfigLayout(e.target.value)}
            className="w-full px-[0.6rem] py-[0.45rem] border border-bg3/60 rounded-md bg-bg/86 text-fg font-mono text-sm cursor-pointer transition-colors hover:border-accent/40">
            {layoutOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2 content-start">
          <p className="m-0 text-sm font-semibold text-fg2">Generated config.jsonc</p>
          <pre className="m-0 overflow-x-auto border border-bg3/60 bg-bg/86 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words rounded-lg min-h-[280px]"><code>{configJson}</code></pre>
        </div>
      </div>
      <p className="m-0 max-w-[68ch] text-fg2 leading-relaxed">Use a custom config file:</p>
      <pre className="m-0 overflow-x-auto border border-bg3/60 bg-bg/86 p-4 font-mono text-sm leading-relaxed whitespace-pre-wrap break-words rounded-lg"><code>xfetch --config path/to/my_config.jsonc</code></pre>
    </div>
  );
}
