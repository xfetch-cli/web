"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import CommandBlock from "./CommandBlock";
import SectionHeader from "./SectionHeader";
import { INSTALL_AFTER, INSTALL_CONTENT, INSTALL_TABS } from "./data";

export default function InstallSection() {
  const [tab, setTab] = useState("linux");
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const move = (index: number) => {
    const next = (index + INSTALL_TABS.length) % INSTALL_TABS.length;
    setTab(INSTALL_TABS[next].id);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      move(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      move(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      move(0);
    } else if (event.key === "End") {
      event.preventDefault();
      move(INSTALL_TABS.length - 1);
    }
  };

  return (
    <section id="install" className="xf-section" aria-labelledby="install-title">
      <div className="xf-container">
        <SectionHeader
          id="install-title"
          eyebrow="Install"
          title="Installation"
          lead="Choose your platform. The quick installer handles everything — including Rust setup if needed."
        />

        <div className="xf-install" data-reveal>
          <div className="xf-tabs" role="tablist" aria-label="Installation methods">
            {INSTALL_TABS.map((item, index) => (
              <button
                key={item.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`install-tab-${item.id}`}
                aria-selected={tab === item.id}
                aria-controls={`install-panel-${item.id}`}
                tabIndex={tab === item.id ? 0 : -1}
                className={`xf-tab${tab === item.id ? " is-active" : ""}`}
                onClick={() => setTab(item.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {item.label}
              </button>
            ))}
          </div>

          {INSTALL_TABS.map((item) => {
            const content = INSTALL_CONTENT[item.id];
            const code = content.lines.map((line) => line.text).join("\n");
            return (
              <div
                key={item.id}
                className="xf-tab-panel"
                role="tabpanel"
                id={`install-panel-${item.id}`}
                aria-labelledby={`install-tab-${item.id}`}
                hidden={tab !== item.id}
              >
                <CommandBlock code={code} label={item.label}>
                  {content.lines.map((line, index) => (
                    <span key={index} className={line.comment ? "xf-code-comment" : undefined}>
                      {line.text}
                      {"\n"}
                    </span>
                  ))}
                </CommandBlock>
              </div>
            );
          })}

          <div className="xf-install-after">
            <p className="xf-mini-label">After install, just run:</p>
            <CommandBlock code={INSTALL_AFTER} label="first run commands">
              {INSTALL_AFTER.split("\n").map((line) => (
                <span key={line}>
                  <span className="xf-code-prompt">$</span> {line.slice(2)}
                  {"\n"}
                </span>
              ))}
            </CommandBlock>
          </div>
        </div>
      </div>
    </section>
  );
}
