"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type CopyState = "idle" | "copied" | "error";

function fallbackCopy(text: string) {
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.top = "-1000px";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(area);
  if (!ok) throw new Error("copy failed");
}

export default function CommandBlock({
  code,
  label = "command",
  className = "",
  children,
}: {
  code: string;
  label?: string;
  className?: string;
  children?: ReactNode;
}) {
  const [state, setState] = useState<CopyState>("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const copy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      } else {
        fallbackCopy(code);
      }
      setState("copied");
    } catch {
      setState("error");
    }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setState("idle"), 2000);
  }, [code]);

  const visibleLabel = state === "copied" ? "Copied" : state === "error" ? "Retry" : "Copy";
  const accessibleLabel =
    state === "copied"
      ? `Copied ${label} to clipboard`
      : state === "error"
        ? `Retry copying ${label}`
        : `Copy ${label} to clipboard`;

  return (
    <div className={`xf-code ${className}`}>
      <div className="xf-code-head">
        <span className="xf-code-label">{label}</span>
        <button
          type="button"
          className="xf-copy"
          onClick={copy}
          aria-label={accessibleLabel}
        >
          {state === "copied" ? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          )}
          <span>{visibleLabel}</span>
        </button>
      </div>
      <pre className="xf-code-pre">
        <code>{children ?? code}</code>
      </pre>
      <span className="xf-sr-only" role="status" aria-live="polite">
        {state === "copied"
          ? `${label} copied to clipboard`
          : state === "error"
            ? `Could not copy ${label}`
            : ""}
      </span>
    </div>
  );
}
