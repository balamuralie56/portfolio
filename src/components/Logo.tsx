import React from 'react';

// The brand mark, shared by the nav and the browser tab. The tab version
// lives separately at src/app/icon.svg with its colours hard-coded —
// a favicon can't read CSS variables — so any change to the geometry
// here needs mirroring there.
export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Balamurali E">
      <polygon points="16,1.5 28.5,8.75 28.5,23.25 16,30.5 3.5,23.25 3.5,8.75" fill="var(--ember)" />
      <circle cx="24.8" cy="10.2" r="1.9" fill="var(--arc)" />
      <g fill="#FFFFFF">
        <rect x="9.8" y="7.6" width="4.3" height="16.8" />
        <path d="M13 7.6 H17.2 a4 4 0 0 1 0 8 H13 Z" />
        <path d="M13 16.4 H17.8 a4 4 0 0 1 0 8 H13 Z" />
      </g>
    </svg>
  );
}
