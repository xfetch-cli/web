import CommandBlock from "./CommandBlock";
import SectionHeader from "./SectionHeader";
import { MANUAL_UNINSTALL, QUICK_UNINSTALL } from "./data";

export default function UninstallSection() {
  return (
    <section id="uninstall" className="xf-section" aria-labelledby="uninstall-title">
      <div className="xf-container">
        <SectionHeader
          id="uninstall-title"
          eyebrow="Remove"
          title="Uninstall"
          lead="Remove the binary, or clean out the config too if you no longer need your settings."
        />

        <div className="xf-uninstall-grid" data-reveal>
          <div>
            <h3 className="xf-subhead">Quick uninstall</h3>
            <CommandBlock code={QUICK_UNINSTALL} label="quick uninstall" />
          </div>
          <div>
            <h3 className="xf-subhead">Manual uninstall</h3>
            <CommandBlock code={MANUAL_UNINSTALL} label="manual uninstall" />
          </div>
        </div>

        <p className="xf-caution">
          The manual commands remove both the binary and <code>~/.config/xfetch</code>. Back up
          custom configs and themes first.
        </p>
      </div>
    </section>
  );
}
