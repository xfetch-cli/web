# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability in the **website** (e.g. XSS in the docs renderer,
content injection, or a broken dependency), please report it responsibly by contacting:

**Email:** `x@xscriptor.com`

### What to Include

When reporting a security issue, please provide:

1. **Description** — A clear explanation of the vulnerability
2. **Type** — What kind of security issue is it? (e.g., XSS, content injection, dependency, availability)
3. **Steps to Reproduce** — Detailed steps to trigger the vulnerability
4. **Impact** — How severe is the issue? What could an attacker do?
5. **Affected Versions** — Which deployment/pages are affected?
6. **Proposed Fix** (optional) — If you have a suggestion for how to fix it

### Guidelines

- **Do not** open public GitHub issues for security vulnerabilities
- **Do not** disclose the vulnerability publicly until a fix is released
- **Do** give the maintainers reasonable time to address the issue before public disclosure
- Typically, we aim to respond within **7 days** and release a fix within **30 days** for critical issues

## Scope

The `web` repository builds the static xfetch site (Next.js) and renders the documentation
from `docs/`. Anything that compromises the site or its visitors is in scope:

- **XSS in the docs renderer**: the documentation is rendered from markdown via
  `react-markdown` — raw HTML or crafted markdown that escapes the renderer and executes
  script is a vulnerability.
- **Content injection**: any way to make the site serve attacker-controlled content (e.g. a
  compromised docs file, an asset from a non-HTTPS source).
- **Dependencies**: known-vulnerable npm packages in the dependency tree.
- **Availability**: build-time or runtime paths that could be used to deface or take down the
  site.
