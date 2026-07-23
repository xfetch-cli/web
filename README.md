# xfetch/web

Landing page and documentation site for the [xfetch-cli/xfetch](https://github.com/xfetch-cli/xfetch) project — a cross-platform system information fetching tool written in Rust.

Built with **Next.js 16**, **Tailwind CSS 4**, and **TypeScript**.

## Features

- **Interactive terminal demo** — live-simulated `xfetch` output
- **Live config builder** — toggle modules and generate `config.jsonc`
- **Documentation** — multi-language docs (en, de, es) with markdown rendering
- **Theme switching** — dark/light mode with persistent localStorage
- **Glassmorphism UI** — blurred glass-style cards and navbar
- **GitHub Pages deployment** — automatic deploy on push to `main`

## Stack

| Tool | Version |
|------|---------|
| Next.js | 16 (App Router) |
| Tailwind CSS | 4 |
| TypeScript | 5 |
| React | 19 |
| Framer Motion | 12 |
| Hosting | GitHub Pages |

## Development

```bash
npm install
npm run dev      # local dev server
npm run build    # production build
npm run lint     # ESLint
```

## Project structure

```
src/
├── app/
│   ├── docs/[lang]/[slug]/   # Multi-language docs
│   ├── globals.css            # Tailwind theme + CSS variables
│   ├── layout.tsx             # Root layout (navbar, bg, theme init)
│   ├── not-found.tsx          # Custom 404 (old URL redirect)
│   ├── page.tsx               # Landing page
│   ├── robots.ts              # robots.txt
│   └── sitemap.ts             # sitemap.xml
├── components/
│   ├── BgPaths.tsx             # Animated SVG background
│   ├── Features.tsx            # Feature cards
│   ├── Hero.tsx                # Hero section
│   ├── InstallTabs.tsx         # Install command tabs + copy buttons
│   ├── TerminalDemo.tsx        # Live terminal simulation
│   └── ...
└── lib/docs.ts                 # Docs filesystem loader
```

## Deployment

On push/merge to `main`, the site is automatically built and deployed to GitHub Pages via the workflow at `.github/workflows/deploy.yml`. The build generates a static export with all docs pre-rendered (52 pages across 3 languages).
