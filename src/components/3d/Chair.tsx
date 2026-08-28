'use client';

import React from 'react';

// Placeholder geometry — see ASSET_DOWNLOADS.md ("chairDesk" in the Kenney pack).
export default function Chair() {
  return (
    <group>
      <mesh position={[0, 0.42, 0]} castShadow>
        <boxGeometry args={[0.46, 0.06, 0.46]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.78, -0.21]} castShadow>
        <boxGeometry args={[0.46, 0.62, 0.06]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 0.4, 8]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.6} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.26, 0.26, 0.03, 16]} />
        <meshStandardMaterial color="#1a1c20" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}
