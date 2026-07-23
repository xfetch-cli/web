"use client";

import { useMemo } from "react";
import Link from "next/link";
import BgPaths from "@/components/BgPaths";

export default function NotFound() {
  const info = useMemo(() => {
    if (typeof window === "undefined") return { isOldDoc: false, slug: "" };
    const path = window.location.pathname.replace(/\/web|\/web$/g, "");
    const m = path.match(/^\/docs\/([^/]+)$/);
    return m ? { isOldDoc: true, slug: m[1] } : { isOldDoc: false, slug: "" };
  }, []);

  return (
    <>
      <BgPaths />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center justify-center px-6 text-center">
        <h1 className="m-0 text-6xl font-bold text-accent">404</h1>
        {info.isOldDoc ? (
          <>
            <p className="mt-4 text-fg2 leading-relaxed">
              The documentation URL has changed. Docs are now organized by language.
            </p>
            <p className="mt-2 text-sm text-fg2/60">
              Try the English version:
            </p>
            <Link
              href={`/docs/en/${info.slug}`}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-bg/90 px-5 py-2.5 text-sm font-medium text-accent no-underline transition-all hover:border-accent/70"
            >
              /docs/en/{info.slug}
            </Link>
            <Link
              href="/docs"
              className="mt-3 text-xs text-fg2/50 underline underline-offset-2 transition-colors hover:text-fg2"
            >
              Browse all documentation
            </Link>
          </>
        ) : (
          <>
            <p className="mt-4 text-fg2 leading-relaxed">
              Page not found.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-lg border border-accent/40 bg-bg/90 px-5 py-2.5 text-sm font-medium text-accent no-underline transition-all hover:border-accent/70"
            >
              Back to home
            </Link>
          </>
        )}
      </div>
    </>
  );
}
