export type DocsLang = "en" | "es" | "de";

export const DOCS_LANGS: DocsLang[] = ["en", "es", "de"];

export const LANG_META: Record<string, string> = {
  en: "English",
  es: "Español",
  de: "Deutsch",
};

export const GROUP_KEYS = [
  "start",
  "reference",
  "plugins",
  "extensions",
  "effects",
  "project",
  "more",
] as const;

export type GroupKey = (typeof GROUP_KEYS)[number];

export const GROUP_DESCRIPTIONS: Record<string, Record<GroupKey, string>> = {
  en: {
    start: "Install xfetch and run it for the first time.",
    reference: "Configuration, modules, layouts, themes and customization.",
    plugins: "Official plugins and the WebAssembly guest runtime.",
    extensions: "Extensions that hook into the config, layout and render pipeline.",
    effects: "Frame effects applied over the rendered output.",
    project: "Contributing, roadmap, security and project policies.",
    more: "Everything else.",
  },
  es: {
    start: "Instalá xfetch y ejecutalo por primera vez.",
    reference: "Configuración, módulos, layouts, temas y personalización.",
    plugins: "Plugins oficiales y el runtime de invitados WebAssembly.",
    extensions: "Extensiones que se enganchan en config, layout y render.",
    effects: "Efectos de cuadro aplicados sobre la salida renderizada.",
    project: "Contribución, roadmap, seguridad y políticas del proyecto.",
    more: "Todo lo demás.",
  },
  de: {
    start: "xfetch installieren und zum ersten Mal ausführen.",
    reference: "Konfiguration, Module, Layouts, Themes und Anpassung.",
    plugins: "Offizielle Plugins und die WebAssembly-Gastlaufzeit.",
    extensions: "Erweiterungen für Konfiguration, Layout und Render-Pipeline.",
    effects: "Frame-Effekte auf der gerenderten Ausgabe.",
    project: "Mitwirken, Roadmap, Sicherheit und Projektrichtlinien.",
    more: "Alles andere.",
  },
};

export const GROUP_LABELS: Record<string, Record<GroupKey, string>> = {
  en: {
    start: "Getting Started",
    reference: "Reference",
    plugins: "Plugins",
    extensions: "Extensions",
    effects: "Effects",
    project: "Project",
    more: "More",
  },
  es: {
    start: "Primeros Pasos",
    reference: "Referencia",
    plugins: "Plugins",
    extensions: "Extensiones",
    effects: "Efectos",
    project: "Proyecto",
    more: "Más",
  },
  de: {
    start: "Erste Schritte",
    reference: "Referenz",
    plugins: "Plugins",
    extensions: "Erweiterungen",
    effects: "Effekte",
    project: "Projekt",
    more: "Mehr",
  },
};

export interface DocsUIStrings {
  docs: string;
  documentation: string;
  allDocs: string;
  documents: string;
  browse: string;
  openNav: string;
  closeNav: string;
  searchPlaceholder: string;
  searchAria: string;
  clearSearch: string;
  resultsFor: string;
  noResults: string;
  showing: string;
  onThisPage: string;
  previous: string;
  next: string;
  source: string;
  copy: string;
  copied: string;
  language: string;
}

export const DOCS_UI: Record<string, DocsUIStrings> = {
  en: {
    docs: "Docs",
    documentation: "Documentation",
    allDocs: "All docs",
    documents: "documents",
    browse: "Browse",
    openNav: "Open documentation navigation",
    closeNav: "Close documentation navigation",
    searchPlaceholder: "Search the docs…",
    searchAria: "Search documentation content",
    clearSearch: "Clear search",
    resultsFor: "results for",
    noResults: "No matches for",
    showing: "Showing 8 of",
    onThisPage: "On this page",
    previous: "Previous",
    next: "Next",
    source: "Source",
    copy: "Copy",
    copied: "Copied",
    language: "Language",
  },
  es: {
    docs: "Docs",
    documentation: "Documentación",
    allDocs: "Todos los docs",
    documents: "documentos",
    browse: "Explorar",
    openNav: "Abrir la navegación de la documentación",
    closeNav: "Cerrar la navegación de la documentación",
    searchPlaceholder: "Buscar en los docs…",
    searchAria: "Buscar en el contenido de la documentación",
    clearSearch: "Limpiar búsqueda",
    resultsFor: "resultados para",
    noResults: "Sin resultados para",
    showing: "Mostrando 8 de",
    onThisPage: "En esta página",
    previous: "Anterior",
    next: "Siguiente",
    source: "Fuente",
    copy: "Copiar",
    copied: "Copiado",
    language: "Idioma",
  },
  de: {
    docs: "Docs",
    documentation: "Dokumentation",
    allDocs: "Alle Docs",
    documents: "Dokumente",
    browse: "Durchsuchen",
    openNav: "Dokumentationsnavigation öffnen",
    closeNav: "Dokumentationsnavigation schließen",
    searchPlaceholder: "Docs durchsuchen…",
    searchAria: "Dokumentationsinhalt durchsuchen",
    clearSearch: "Suche löschen",
    resultsFor: "Ergebnisse für",
    noResults: "Keine Treffer für",
    showing: "Zeige 8 von",
    onThisPage: "Auf dieser Seite",
    previous: "Zurück",
    next: "Weiter",
    source: "Quelle",
    copy: "Kopieren",
    copied: "Kopiert",
    language: "Sprache",
  },
};

export function docsUI(lang: string): DocsUIStrings {
  return DOCS_UI[lang] ?? DOCS_UI.en;
}
