'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../utils/useReducedMotion';

const CLIPS = ['/video/clip-1.mp4', '/video/clip-2.mp4', '/video/clip-3.mp4'];

// The whole site's backdrop: the three clips play one after another and
// wrap around, forever. They're stacked rather than swapped into a single
// <video> because changing src mid-playback stalls on a black frame while
// the new file buffers — stacking lets the next clip be ready and just
// crossfade in. No `loop` attribute anywhere: looping would suppress the
// `ended` event this cycle depends on.
//
// Nothing is layered in front of it — no scrim, no blur — so legibility
// is carried entirely by .text-depth's halo and the raised .card-3d /
// .chip-3d surfaces the content sits on.
export default function SiteBackdrop() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);
  const clipRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    if (reduced) return;
    clipRefs.current.forEach((clip, i) => {
      if (!clip) return;
      if (i === active) {
        clip.currentTime = 0;
        // Autoplay can be refused (power saving, platform policy); the
        // poster stays up rather than the page erroring.
        clip.play().catch(() => {});
      } else {
        clip.pause();
      }
    });
  }, [active, reduced]);

  if (reduced) {
    return (
      <div className="site-backdrop" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/video/hero-poster.jpg" alt="" className="backdrop-media" />
      </div>
    );
  }

  return (
    <div className="site-backdrop" aria-hidden="true">
      {CLIPS.map((src, i) => (
        <video
          key={src}
          ref={(el) => {
            clipRefs.current[i] = el;
          }}
          className={`backdrop-media backdrop-clip${i === active ? ' is-active' : ''}`}
          src={src}
          poster={i === 0 ? '/video/hero-poster.jpg' : undefined}
          autoPlay={i === 0}
          muted
          playsInline
          // Only the clip on screen and the one queued behind it are worth
          // buffering — the third would just be bandwidth spent early.
          preload={i === active || i === (active + 1) % CLIPS.length ? 'auto' : 'none'}
          onEnded={() => setActive((current) => (current + 1) % CLIPS.length)}
        />
      ))}
    </div>
  );
}
