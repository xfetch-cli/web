export default function Roadmap({ phases }: { phases: { title: string; desc: string; status: string }[] }) {
  return (
    <div className="grid gap-3">
      <h2 className="m-0 text-lg font-semibold">Roadmap</h2>
      <p className="m-0 max-w-[68ch] text-fg2 leading-relaxed">What&apos;s planned for xfetch — from additional package managers to a daemon mode. Contributions welcome!</p>
      <div className="grid gap-4 pl-5 border-l-2 border-bg3/60">
        {phases.map((p, i) => (
          <div key={i} className="grid grid-cols-[0.75rem_1fr] gap-3 relative">
            <div className={`w-[0.65rem] h-[0.65rem] rounded-full border-2 mt-[0.3rem] ${p.status === "done" ? "border-[#78dba9] bg-[#78dba9]" : p.status === "partial" ? "border-[#ffcb6b] bg-[#ffcb6b]" : "border-bg3/70 bg-bg"}`} />
            <div className="grid gap-1">
              <h4 className="m-0 text-sm font-semibold">{p.title}</h4>
              <p className="m-0 text-xs text-fg2 leading-relaxed">{p.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
