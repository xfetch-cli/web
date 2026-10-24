import CommandBlock from "./CommandBlock";
import PluginSandbox from "./PluginSandbox";
import SectionHeader from "./SectionHeader";
import { PLUGINS, PLUGIN_COMMANDS } from "./data";

export default function PluginSection() {
  return (
    <section id="plugins" className="xf-section" aria-labelledby="plugins-title">
      <div className="xf-container">
        <SectionHeader
          id="plugins-title"
          eyebrow="Extend"
          title="Plugin system"
          lead="xfetch communicates with external plugins via JSON over stdin/stdout. Install, list, and remove plugins with simple CLI commands."
        />

        <div className="xf-plugin-grid">
          <div className="xf-plugin-main" data-reveal>
            <CommandBlock code={PLUGIN_COMMANDS} label="plugin commands" />
            <div className="xf-plugin-cards">
              {PLUGINS.map((plugin) => (
                <article key={plugin.name} className="xf-plugin-card">
                  <div className="xf-plugin-card-head">
                    <h3>
                      <code>{plugin.name}</code>
                    </h3>
                    <span className="xf-plugin-dot" aria-hidden="true" />
                  </div>
                  <p>{plugin.desc}</p>
                  <ul className="xf-tag-list" role="list" aria-label={`${plugin.name} tags`}>
                    {plugin.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <PluginSandbox />
        </div>

        <p className="xf-discovery" data-reveal>
          Plugin discovery: explicit path <span aria-hidden="true">→</span>{" "}
          <code>xfetch-plugin-&lt;name&gt;</code> in PATH <span aria-hidden="true">→</span>{" "}
          <code>~/.config/xfetch/plugins/</code> <span aria-hidden="true">→</span>{" "}
          <code>./plugins/&lt;name&gt;/target/release</code>
        </p>
      </div>
    </section>
  );
}
