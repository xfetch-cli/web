<h1>Contributing to the Website</h1>

<p>
  Thanks for contributing to the <strong>xfetch</strong> website. This
  repository contains the Next.js site (<code>src/</code>) and the rendered
  documentation (<code>docs/</code>) in three languages: English
  (<code>en</code>), Spanish (<code>es</code>) and German (<code>de</code>).
</p>

<h2>Workflow</h2>

<ol>
  <li>Fork the repository and create a feature branch.</li>
  <li>Make your change in <code>src/</code> (site code) and/or <code>docs/&lt;lang&gt;/</code> (documentation).</li>
  <li>
    Run the CI locally before opening the PR:
    <code>bash scripts/ci.sh</code> (Linux/macOS) or <code>./scripts/ci.ps1</code>
    (Windows). It runs <code>npm run lint</code> and <code>npm run build</code>.
    PRs that fail CI are rejected.
  </li>
  <li>Open a pull request.</li>
</ol>

<h2>Documentation Rules</h2>

<ul>
  <li><strong>Three languages.</strong> Every documentation page exists in <code>en</code>, <code>es</code> and <code>de</code>. A change to one language must be mirrored in the other two — pages missing in a language are not rendered.</li>
  <li><strong>Source of truth is the repos.</strong> The docs describe the other xfetch repositories (<a href="https://github.com/xfetch-cli/xfetch">xfetch</a>, <a href="https://github.com/xfetch-cli/plugins">plugins</a>, <a href="https://github.com/xfetch-cli/extensions">extensions</a>, <a href="https://github.com/xfetch-cli/themes">themes</a>, <a href="https://github.com/xfetch-cli/configs">configs</a>). Verify config keys, commands and behaviors against the code before documenting them; keep the pages as adaptations, not verbatim copies.</li>
  <li>Keep the markdown structure of the page (title, sections, tables) so titles, descriptions and the summary stay consistent.</li>
  <li>No emojis in documentation; use Nerd Font glyphs or plain text where icons are needed.</li>
  <li>Update <code>docs/&lt;lang&gt;/SUMMARY.md</code> when adding or removing pages.</li>
</ul>

<h2>Site Code Rules</h2>

<ul>
  <li>Run <code>npm run lint</code> before committing; fix warnings, do not disable rules without a comment explaining why.</li>
  <li>Keep the docs renderer (<code>src/app/docs/</code>, <code>src/lib/docs.ts</code>) dependency-light: markdown is rendered with <code>react-markdown</code> + <code>remark-gfm</code>.</li>
  <li>No unused imports or dead props — the docs pages are statically generated, keep them deterministic.</li>
</ul>

<h2>Code of Conduct</h2>

<p>
  Be respectful, constructive, and collaborative. Harassment, trolling, and
  personal attacks are not tolerated.
</p>
