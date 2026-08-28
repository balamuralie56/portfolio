'use client';

import React, { useMemo } from 'react';

const BOOK_COLORS = ['#D2600F', '#0E7FA6', '#4a3826', '#7a5a3a', '#2b2f38', '#B14D09'];

// Placeholder geometry — see ASSET_DOWNLOADS.md ("bookcaseOpen" in the Kenney
// pack). Books are procedural regardless (reused/instanced per the brief)
// since a hand-varied shelf reads better than a single imported "books" mesh.
export default function Bookshelf() {
  const books = useMemo(
    () =>
      Array.from({ length: 9 }, (_, i) => ({
        x: -0.55 + i * 0.13,
        h: 0.32 + ((i * 37) % 10) / 100,
        color: BOOK_COLORS[i % BOOK_COLORS.length],
      })),
    []
  );

  return (
    <group>
      {/* Frame */}
      <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 1.8, 0.32]} />
        <meshStandardMaterial color="#5a4530" roughness={0.75} />
      </mesh>
      {/* Shelves (carve the look with slightly recessed inner box) */}
      <mesh position={[0, 0.9, 0.03]}>
        <boxGeometry args={[1.18, 1.65, 0.26]} />
        <meshStandardMaterial color="#3a2c1e" roughness={0.85} />
      </mesh>
      {[0.45, 0.95, 1.45].map((y, i) => (
        <mesh key={i} position={[0, y, 0.03]} castShadow>
          <boxGeometry args={[1.18, 0.03, 0.26]} />
          <meshStandardMaterial color="#5a4530" roughness={0.7} />
        </mesh>
      ))}
      {/* Books on the middle shelf */}
      {books.map((b, i) => (
        <mesh key={i} position={[b.x, 0.45 + b.h / 2 + 0.02, 0.05]} castShadow>
          <boxGeometry args={[0.1, b.h, 0.2]} />
          <meshStandardMaterial color={b.color} roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
