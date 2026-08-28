'use client';

import React from 'react';

interface Props {
  ember: string;
}

// Procedural — no free plaque/trophy/certificate model was found that fit
// (see ASSET_DOWNLOADS.md); a small beveled plaque, not a fake certificate
// screenshot, so nothing is misrepresented as a real object.
export default function AchievementPlaque({ ember }: Props) {
  return (
    <group>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.16, 0.11, 0.012]} />
        <meshStandardMaterial color="#c9a15a" roughness={0.35} metalness={0.75} />
      </mesh>
      <mesh position={[0, 0, 0.008]}>
        <boxGeometry args={[0.13, 0.085, 0.004]} />
        <meshStandardMaterial color="#141414" roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.005, 0.011]}>
        <circleGeometry args={[0.022, 24]} />
        <meshStandardMaterial color={ember} emissive={ember} emissiveIntensity={0.3} roughness={0.4} metalness={0.6} />
      </mesh>
    </group>
  );
}
