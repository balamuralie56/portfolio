'use client';

import React from 'react';

interface Props {
  ember: string;
}

// Placeholder geometry — see ASSET_DOWNLOADS.md ("laptop" in the Kenney pack).
export default function Laptop({ ember }: Props) {
  return (
    <group rotation={[0, 0.35, 0]}>
      <mesh position={[0, 0.015, 0]} castShadow>
        <boxGeometry args={[0.34, 0.015, 0.24]} />
        <meshStandardMaterial color="#c8cdd6" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.13, -0.115]} rotation={[-0.22, 0, 0]} castShadow>
        <boxGeometry args={[0.34, 0.22, 0.012]} />
        <meshStandardMaterial color="#c8cdd6" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.135, -0.108]} rotation={[-0.22, 0, 0]}>
        <planeGeometry args={[0.3, 0.18]} />
        <meshStandardMaterial color="#0a0b0e" emissive={ember} emissiveIntensity={0.3} toneMapped={false} />
      </mesh>
    </group>
  );
}
