# Changelog

## 2026-08-20 — v0.7.0 documentation sync

- Docs updated to match **xfetch v0.7.0** across English, Spanish and German:
  - `customization` documents the new `labels` map (rename or hide the row key
    per module, in every layout) and the `formats` map (value templates with
    `{field}` placeholders)
  - Field reference per module: CPU (`{brand}`/`{model}`/`{cores}`/`{freq}`),
    GPU (`{name}`/`{vendor}`/`{model}`/`{vram}`), memory/swap/disk, os,
    packages (per-manager fields), battery, uptime, datetime

## 2026-08-20 — v0.6.0 documentation sync

- Docs updated to match **xfetch v0.6.0** across English, Spanish and German:
  - Changelog pages now cover v0.4.0, v0.5.0 and v0.6.0
  - Themes documented with the new format (no `icons`, `logo_color`/`logo_colors`,
    `xfetch-cli/themes` registry, 17 themes)
  - `theme-manager` registry fixed to `xfetch-cli/themes`
  - New plugin pages: `chocolatey` and `temperature`
  - New config keys: `daemon_live*`, `os_wsl_style`, `show_keys`, `key_width`,
    `logo_color`/`logo_colors`/`logo_padding`/`logo_type`, `custom_x`, `effects`,
    `timeout_secs`
  - Layouts `section-box` and `custom-x` added; `horizontal`/`bottom` descriptions fixed
  - Windows package managers updated (`winget` in, `choco` out of the core)
  - Getting-started reflects `--gen-config` (no more bundled `configs/` folder)
  - Roadmap items completed as of v0.6.0
- New plugin docs for `chocolatey` and `temperature` in all three languages
- Docs updated for the `with_timeout` standard and the optional `timeout_secs` key

## 2026-08-20 — Site quality

- Lint clean: removed unused imports/variables (`page.tsx`, `DocViewer.tsx`) and
  documented the remote-SVG `<img>` exception in `Hero.tsx`
- Added MIT license metadata (`LICENSE`, `"license": "MIT"` in package.json)
- Added local CI scripts (`scripts/ci.sh`, `scripts/ci.ps1` — lint + build)

## 2026-08-14 — Initial site

- Next.js site with landing page: hero, features, modules table, install tabs,
  layout showcase, config builder, plugin section and roadmap
- Documentation in three languages (English, Spanish, German) for the xfetch
  ecosystem: configuration, modules, layouts, customization, plugins,
  extensions, themes, presets, advanced usage and getting-started
- Static export ready for GitHub Pages (`output: "export"`, `basePath: /web`)
- Sitemap and robots.txt
