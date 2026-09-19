export default function LangFlag({ lang, size = 16 }: { lang: string; size?: number }) {
  const w = size;
  const h = Math.round(size * 0.667);
  switch (lang) {
    case "en":
      return (
        <svg width={w} height={h} viewBox="0 0 60 40" fill="none" aria-label="English">
          <rect width="60" height="40" fill="#012169" />
          <path d="M0 0 L60 40 M60 0 L0 40" stroke="#fff" strokeWidth="6" />
          <path d="M0 0 L60 40 M60 0 L0 40" stroke="#C8102E" strokeWidth="2.5" />
          <rect x="26" y="0" width="8" height="40" fill="#fff" />
          <rect x="0" y="16" width="60" height="8" fill="#fff" />
          <rect x="27" y="0" width="6" height="40" fill="#C8102E" />
          <rect x="0" y="17" width="60" height="6" fill="#C8102E" />
        </svg>
      );
    case "de":
      return (
        <svg width={w} height={h} viewBox="0 0 60 40" fill="none" aria-label="Deutsch">
          <rect width="60" height="13.33" fill="#000" />
          <rect y="13.33" width="60" height="13.33" fill="#DD0000" />
          <rect y="26.66" width="60" height="13.34" fill="#FFCE00" />
        </svg>
      );
    case "es":
      return (
        <svg width={w} height={h} viewBox="0 0 60 40" fill="none" aria-label="Español">
          <rect width="60" height="40" fill="#C60B1E" />
          <rect y="10" width="60" height="20" fill="#FFC400" />
        </svg>
      );
    default:
      return null;
  }
}
