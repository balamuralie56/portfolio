'use client';

import React from 'react';
import { useReducedMotion } from '../utils/useReducedMotion';

// The whole site's backdrop: one fixed, looping clip behind every
// section. Fixed rather than per-section, so scrolling moves the content
// over a steady backdrop instead of dragging the footage along with it.
// Nothing is layered in front of it — no scrim, no blur — so legibility
// is carried entirely by .text-depth's halo and the raised .card-3d /
// .chip-3d surfaces the content sits on.
export default function SiteBackdrop() {
  const reduced = useReducedMotion();

  return (
    <div className="site-backdrop" aria-hidden="true">
      {reduced ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src="/video/hero-poster.jpg" alt="" className="backdrop-media" />
      ) : (
        <video
          className="backdrop-media"
          src="/video/hero-loop.mp4"
          poster="/video/hero-poster.jpg"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      )}
    </div>
  );
}
