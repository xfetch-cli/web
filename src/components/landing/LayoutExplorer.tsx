"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import CommandBlock from "./CommandBlock";
import SectionHeader from "./SectionHeader";
import { LAYOUT_EXAMPLES, type LayoutExample } from "./data";

function LayoutPreview({ layout }: { layout: LayoutExample["preview"] }) {
  return (
    <div className={`xf-lp xf-lp--${layout}`} aria-hidden="true">
      {layout === "default" ? (
        <>
          <div className="xf-lp-logo">
            <span>██   ██</span>
            <span> ██ ██ </span>
            <span>  ███  </span>
            <span> ██ ██ </span>
            <span>██   ██</span>
          </div>
          <div className="xf-lp-rows">
            <span><i>os</i><b>Arch Linux</b></span>
            <span><i>wm</i><b>Hyprland</b></span>
            <span><i>cpu</i><b>Ryzen 9</b></span>
            <span><i>gpu</i><b>RTX 4090</b></span>
            <span><i>mem</i><b>8.2 / 31 GiB</b></span>
          </div>
        </>
      ) : null}

      {layout === "pacman" ? (
        <div className="xf-lp-pacman">
          <div className="xf-lp-pac-head">● ● ● PAC-MAN ● ● ●</div>
          <div className="xf-lp-pac-body">
            <div className="xf-lp-logo xf-lp-logo--small">
              <span>██   ██</span>
              <span> ██ ██ </span>
              <span>  ███  </span>
              <span> ██ ██ </span>
              <span>██   ██</span>
            </div>
            <div className="xf-lp-rows">
              <span><i>os</i><b>Arch Linux</b></span>
              <span><i>cpu</i><b>Ryzen 9</b></span>
              <span><i>mem</i><b>8.2 / 31 GiB</b></span>
            </div>
          </div>
          <div className="xf-lp-pac-foot">●●●●●●●●●●</div>
        </div>
      ) : null}

      {layout === "section" ? (
        <div className="xf-lp-section">
          <span className="xf-lp-sec-title">──── Hardware ────</span>
          <span><i>cpu</i><b>Ryzen 9</b></span>
          <span><i>gpu</i><b>RTX 4090</b></span>
          <span><i>mem</i><b>8.2 / 31 GiB</b></span>
          <span className="xf-lp-sec-title">──── Software ────</span>
          <span><i>os</i><b>Arch Linux</b></span>
          <span><i>shell</i><b>zsh</b></span>
        </div>
      ) : null}

      {layout === "side-block" ? (
        <div className="xf-lp-side">
          <div className="xf-lp-side-col">
            <span>os</span>
            <span>kernel</span>
            <span>cpu</span>
            <span>gpu</span>
            <span>memory</span>
          </div>
          <div className="xf-lp-side-col is-values">
            <span>Arch Linux</span>
            <span>6.6.1</span>
            <span>Ryzen 9</span>
            <span>RTX 4090</span>
            <span>8.2 / 31 GiB</span>
          </div>
        </div>
      ) : null}

      {layout === "tree" ? (
        <div className="xf-lp-tree">
          <span><b>xfetch</b></span>
          <span>├─ <i>OS</i></span>
          <span>│  ├─ os</span>
          <span>│  ├─ kernel</span>
          <span>│  └─ packages</span>
          <span>└─ <i>PC</i></span>
          <span>   ├─ cpu</span>
          <span>   ├─ gpu</span>
          <span>   └─ memory</span>
        </div>
      ) : null}

      {layout === "box" ? (
        <div className="xf-lp-box">
          <div className="xf-lp-box-inner">
            <span><i>os</i><b>Arch Linux</b></span>
            <span><i>wm</i><b>Hyprland</b></span>
            <span><i>cpu</i><b>Ryzen 9</b></span>
            <span><i>gpu</i><b>RTX 4090</b></span>
            <span><i>mem</i><b>8.2 / 31 GiB</b></span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function LayoutExplorer() {
  const [activeId, setActiveId] = useState(LAYOUT_EXAMPLES[0].id);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const active = LAYOUT_EXAMPLES.find((layout) => layout.id === activeId) ?? LAYOUT_EXAMPLES[0];

  const select = (index: number) => {
    const next = (index + LAYOUT_EXAMPLES.length) % LAYOUT_EXAMPLES.length;
    setActiveId(LAYOUT_EXAMPLES[next].id);
    tabs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      select(index + 1);
    } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      select(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      select(0);
    } else if (event.key === "End") {
      event.preventDefault();
      select(LAYOUT_EXAMPLES.length - 1);
    }
  };

  return (
    <section id="layouts" className="xf-section" aria-labelledby="layouts-title">
      <div className="xf-container">
        <SectionHeader
          id="layouts-title"
          eyebrow="Composition"
          title="Layout showcase"
          lead="xfetch ships with 9 built-in layouts. Each has a distinct visual style for different preferences."
        />

        <div className="xf-layout-grid" data-reveal>
          <div className="xf-layout-tabs" role="tablist" aria-orientation="vertical" aria-label="Layout examples">
            {LAYOUT_EXAMPLES.map((layout, index) => (
              <button
                key={layout.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`layout-tab-${layout.id}`}
                aria-selected={layout.id === active.id}
                aria-controls={`layout-panel-${layout.id}`}
                tabIndex={layout.id === active.id ? 0 : -1}
                className={`xf-layout-tab${layout.id === active.id ? " is-active" : ""}`}
                onClick={() => setActiveId(layout.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                <span className="xf-layout-tab-num">{String(index + 1).padStart(2, "0")}</span>
                <span className="xf-layout-tab-body">
                  <span className="xf-layout-tab-title">{layout.title}</span>
                  <span className="xf-layout-tab-desc">{layout.desc}</span>
                </span>
              </button>
            ))}
          </div>

          {LAYOUT_EXAMPLES.map((layout, index) => (
            <div
              key={layout.id}
              className="xf-layout-panel"
              role="tabpanel"
              id={`layout-panel-${layout.id}`}
              aria-labelledby={`layout-tab-${layout.id}`}
              tabIndex={0}
              hidden={layout.id !== active.id}
            >
              <div className="xf-layout-preview-wrap">
                <LayoutPreview layout={layout.preview} />
                <span className="xf-layout-preview-label" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")} / {String(LAYOUT_EXAMPLES.length).padStart(2, "0")}
                </span>
              </div>
              <CommandBlock code={layout.code} label={`${layout.title} JSON`} className="xf-layout-code" />
              <p className="xf-layout-note">
                Showing 6 examples. <code>line</code>, <code>dots</code>, and <code>bottom_line</code> are also available in the config builder.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
