"use client";

export default function BgPaths() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <svg className="w-full h-full" fill="none" preserveAspectRatio="xMidYMid slice" viewBox="-2400 -800 4800 1600">
        <defs>
          <linearGradient id="xfetchBgGrad" x1="0%" x2="100%" y1="0%" y2="0%">
            <stop offset="0%" stopColor="#fc618d" />
            <stop offset="50%" stopColor="#948ae3" />
            <stop offset="100%" stopColor="#5ad4e6" />
          </linearGradient>
        </defs>
        {Array.from({ length: 12 }).map((_, i) => (
          <path
            key={`p-${i}`}
            d={`M 2400 800 C 1200 ${400 - i * 30}, 600 ${1200 - i * 20}, -2400 ${-800 + i * 25}`}
            stroke="url(#xfetchBgGrad)"
            strokeLinecap="round"
            strokeWidth={4 + i * 0.3}
            style={{ opacity: 0.15 + i * 0.02 }}
          >
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-15; 0,0" dur={`${8 + i * 0.2}s`} repeatCount="indefinite" />
          </path>
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <path
            key={`s-${i}`}
            d={`M 2400 900 C 1300 ${500 - i * 25}, 500 ${1300 - i * 15}, -2400 ${-700 + i * 20}`}
            stroke="url(#xfetchBgGrad)"
            strokeLinecap="round"
            strokeWidth={3 + i * 0.25}
            style={{ opacity: 0.12 + i * 0.015 }}
          >
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-10; 0,0" dur={`${6 + i * 0.15}s`} repeatCount="indefinite" />
          </path>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={`a-${i}`}
            d={`M 2200 1000 C 1400 ${600 - i * 20}, 400 ${1400 - i * 10}, -2000 ${-600 + i * 30}`}
            stroke="url(#xfetchBgGrad)"
            strokeLinecap="round"
            strokeWidth={2 + i * 0.2}
            style={{ opacity: 0.08 + i * 0.12 }}
          >
            <animateTransform attributeName="transform" type="translate" values="0,0; 0,-5; 0,0" dur={`${4 + i * 0.1}s`} repeatCount="indefinite" />
          </path>
        ))}
      </svg>
    </div>
  );
}
