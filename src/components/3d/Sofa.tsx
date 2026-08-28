'use client';

import React from 'react';

// Placeholder geometry — see ASSET_DOWNLOADS.md ("loungeSofa" in the Kenney pack).
export default function Sofa() {
  return (
    <group>
      <mesh position={[0, 0.28, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.9, 0.5, 0.85]} />
        <meshStandardMaterial color="#4a5568" roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.72, -0.36]} castShadow>
        <boxGeometry args={[1.9, 0.6, 0.18]} />
        <meshStandardMaterial color="#4a5568" roughness={0.85} />
      </mesh>
      {[-0.98, 0.98].map((x, i) => (
        <mesh key={i} position={[x, 0.5, 0]} castShadow>
          <boxGeometry args={[0.16, 0.44, 0.85]} />
          <meshStandardMaterial color="#3c4353" roughness={0.85} />
        </mesh>
      ))}
      {[-0.55, 0, 0.55].map((x, i) => (
        <mesh key={i} position={[x, 0.56, 0.05]} castShadow>
          <boxGeometry args={[0.5, 0.14, 0.6]} />
          <meshStandardMaterial color="#5a6478" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}
