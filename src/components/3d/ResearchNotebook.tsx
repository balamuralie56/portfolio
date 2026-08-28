'use client';

import React from 'react';

interface Props {
  arc: string;
  hovered: boolean;
}

// Procedural — a closed notebook that visually "opens" (pages fan out) on
// hover. No free open-notebook-with-content model was found (see
// ASSET_DOWNLOADS.md); the "pages" are plain geometry, not a fake document
// scan, so nothing is misrepresented as a real research paper.
export default function ResearchNotebook({ arc, hovered }: Props) {
  return (
    <group rotation={[0, 0.15, 0]}>
      <mesh castShadow receiveShadow rotation={[hovered ? -0.35 : -0.02, 0, 0]} position={[0, 0.006, hovered ? -0.03 : 0]}>
        <boxGeometry args={[0.14, 0.008, 0.19]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.75} />
      </mesh>
      <mesh castShadow receiveShadow rotation={[hovered ? 0.35 : 0.02, 0, 0]} position={[0, 0.006, hovered ? 0.03 : 0]}>
        <boxGeometry args={[0.14, 0.008, 0.19]} />
        <meshStandardMaterial color="#f2ede2" roughness={0.9} />
      </mesh>
      <mesh position={[0, hovered ? 0.02 : 0.011, 0]}>
        <boxGeometry args={[0.02, 0.006, 0.19]} />
        <meshStandardMaterial color={arc} emissive={arc} emissiveIntensity={0.3} roughness={0.5} />
      </mesh>
    </group>
  );
}
