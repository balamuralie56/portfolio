'use client';

import React, { useMemo } from 'react';

// Placeholder geometry — see ASSET_DOWNLOADS.md ("plantSmall" in the Kenney pack).
export default function Plant({ scale = 1 }: { scale?: number }) {
  const leaves = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        return { x: Math.cos(angle) * 0.14, z: Math.sin(angle) * 0.14, r: angle };
      }),
    []
  );
  return (
    <group scale={scale}>
      <mesh position={[0, 0.14, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.13, 0.28, 12]} />
        <meshStandardMaterial color="#B14D09" roughness={0.8} />
      </mesh>
      {leaves.map((l, i) => (
        <mesh key={i} position={[l.x, 0.42 + (i % 2) * 0.08, l.z]} rotation={[0.3, l.r, 0]} castShadow>
          <coneGeometry args={[0.09, 0.42, 6]} />
          <meshStandardMaterial color={i % 2 === 0 ? '#2f6b3a' : '#3d8449'} roughness={0.75} />
        </mesh>
      ))}
    </group>
  );
}
