'use client';

import React from 'react';

// Placeholder geometry — see ASSET_DOWNLOADS.md. Swap for
// useGLTF('/models/furniture/desk.glb') once the real asset is imported;
// keep this component's exported size/footprint similar so nothing else
// needs to move.
export default function Desk() {
  return (
    <group castShadow receiveShadow>
      <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.05, 0.85]} />
        <meshStandardMaterial color="#8a6a48" roughness={0.55} />
      </mesh>
      {[
        [-0.88, -0.36],
        [0.88, -0.36],
        [-0.88, 0.36],
        [0.88, 0.36],
      ].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.37, z]} castShadow>
          <boxGeometry args={[0.06, 0.72, 0.06]} />
          <meshStandardMaterial color="#4a3826" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
}
