'use client';

import React from 'react';
import { Html } from '@react-three/drei';

interface Props {
  title: string;
  lines: string[];
  offset?: [number, number, number];
  accent?: string;
}

// The in-scene reveal used by every interactive object. Deliberately quiet —
// a small technical label, not a HUD panel: the room is the primary visual,
// this is a caption. Content always comes from the caller (real portfolio
// data), never invented here.
export default function InfoPanel({ title, lines, offset = [0, 0.8, 0], accent = '#FF7A1A' }: Props) {
  return (
    <Html center distanceFactor={7.5} position={offset} style={{ pointerEvents: 'none' }} occlude={false}>
      <div
        style={{
          fontFamily: "'Titillium Web', -apple-system, sans-serif",
          background: 'rgba(12,13,16,0.88)',
          border: `1px solid ${accent}`,
          borderRadius: 3,
          padding: '8px 12px',
          minWidth: 150,
          maxWidth: 230,
          animation: 'infoPanelIn 0.18s ease',
        }}
      >
        <div
          style={{
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: 9,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: accent,
            marginBottom: 5,
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {lines.map((line, i) => (
            <div key={i} style={{ fontSize: 11, lineHeight: 1.4, color: '#F3F5F7' }}>
              {line}
            </div>
          ))}
        </div>
        <style>{`@keyframes infoPanelIn { from { opacity: 0; transform: translateY(3px); } to { opacity: 1; transform: translateY(0); } }`}</style>
      </div>
    </Html>
  );
}
