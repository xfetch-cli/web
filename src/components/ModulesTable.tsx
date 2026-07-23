import { renderModuleIcon } from "./Icons";

export default function ModulesTable({ modules }: { modules: { icon: string; name: string; descKey: string }[] }) {
  return (
    <div className="grid gap-3">
      <h2 className="m-0 text-lg font-semibold">Available modules</h2>
      <p className="m-0 max-w-[68ch] text-fg2 leading-relaxed">Every piece of information xfetch can display. Mix, match, and reorder them in your config.</p>
      <div className="grid gap-1">
        {modules.map((m) => (
          <div key={m.name} className="grid grid-cols-[1.8rem_9rem_1fr] gap-2 items-center rounded-md border border-bg3/40 bg-bg/92 p-[0.35rem_0.6rem] min-w-0">
            <span className="text-base text-center leading-none">{renderModuleIcon(m.icon, 16)}</span>
            <code className="overflow-hidden text-ellipsis font-mono text-sm text-accent">{m.name}</code>
            <span className="overflow-hidden text-ellipsis whitespace-nowrap text-xs text-fg2">{m.descKey}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
