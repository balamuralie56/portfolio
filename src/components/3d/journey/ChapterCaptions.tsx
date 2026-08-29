'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import { CHAPTERS } from './chapters';

// Caption opacity is a per-frame value driven by scroll — mutated directly
// via refs in useFrame rather than React state, so scrolling doesn't
// trigger a re-render every frame (the perf pattern the research flagged:
// refs + useFrame, not useState, for anything that changes this often).
export default function ChapterCaptions({ ember }: { ember: string }) {
  const scroll = useScroll();
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useFrame(() => {
    CHAPTERS.forEach((chapter, i) => {
      const el = refs.current[i];
      if (!el) return;
      const visibility = scroll.curve(chapter.from, chapter.distance);
      el.style.opacity = String(visibility);
      el.style.transform = `translateY(${(1 - visibility) * 14}px)`;
      el.style.pointerEvents = visibility > 0.5 ? 'auto' : 'none';
    });
  });

  return (
    <div style={{ width: '100vw', height: '100dvh', position: 'relative' }}>
      {CHAPTERS.map((chapter, i) => (
        <div
          key={chapter.key}
          ref={(el) => {
            refs.current[i] = el;
          }}
          style={{
            position: 'absolute',
            left: '6%',
            bottom: '14%',
            maxWidth: 'min(520px, 80vw)',
            opacity: 0,
            transition: 'opacity 0.05s linear',
          }}
        >
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 11,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: ember,
              marginBottom: 10,
            }}
          >
            {chapter.eyebrow}
          </div>
          <div
            style={{
              fontFamily: "'Orbitron', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(22px, 3.4vw, 34px)',
              color: '#F3F5F7',
              lineHeight: 1.15,
              marginBottom: 10,
              textShadow: '0 2px 18px rgba(0,0,0,0.55)',
            }}
          >
            {chapter.title}
          </div>
          <div
            style={{
              fontFamily: "'Titillium Web', sans-serif",
              fontSize: 15,
              lineHeight: 1.55,
              color: '#D8DBE0',
              textShadow: '0 1px 12px rgba(0,0,0,0.6)',
            }}
          >
            {chapter.body}
          </div>
        </div>
      ))}
    </div>
  );
}
