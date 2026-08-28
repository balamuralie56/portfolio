'use client';

import React, { useState } from 'react';

interface Props {
  arc: string;
}

// Placeholder geometry — see ASSET_DOWNLOADS.md ("computerScreen" in the
// Kenney pack). The glowing "code lines" on the screen are cheap emissive
// strips rather than a texture, so there's nothing to load before this
// renders.
export default function Monitor({ arc }: Props) {
  const [screenHovered, setScreenHovered] = useState(false);

  return (
    <group>
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.09, 0.11, 0.04, 16]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.13, 0]} castShadow>
        <boxGeometry args={[0.03, 0.2, 0.03]} />
        <meshStandardMaterial color="#1a1c20" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[0, 0.26, 0]} castShadow>
        <boxGeometry args={[0.56, 0.34, 0.025]} />
        <meshStandardMaterial color="#101216" roughness={0.4} metalness={0.4} />
      </mesh>
      <mesh
        position={[0, 0.26, 0.014]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setScreenHovered(true);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setScreenHovered(false);
        }}
      >
        <planeGeometry args={[0.5, 0.28]} />
        <meshStandardMaterial
          color="#0a0b0e"
          emissive={arc}
          emissiveIntensity={screenHovered ? 0.85 : 0.45}
          toneMapped={false}
        />
      </mesh>
      {[0.34, 0.3, 0.26, 0.22].map((y, i) => (
        <mesh key={i} position={[-0.16 + (i % 2) * 0.06, y, 0.016]}>
          <planeGeometry args={[0.15 + (i % 3) * 0.05, 0.012]} />
          <meshStandardMaterial color={arc} emissive={arc} emissiveIntensity={1} toneMapped={false} transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}
