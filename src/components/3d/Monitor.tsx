'use client';

import React from 'react';

interface Props {
  arc: string;
  hovered: boolean;
}

// No real free monitor model was found in Poly Haven's catalog (see
// ASSET_DOWNLOADS.md), so this stays hand-built — but with real
// roughness/metalness values instead of flat color, and a screen that
// actually wakes up on hover rather than glowing at a constant level.
// `hovered` is threaded down from the wrapping InteractiveObject so the
// screen and its InfoPanel activate from the exact same hover state.
export default function Monitor({ arc, hovered }: Props) {
  return (
    <group>
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.1, 0.12, 0.03, 24]} />
        <meshStandardMaterial color="#2a2c31" roughness={0.35} metalness={0.75} />
      </mesh>
      <mesh position={[0, 0.15, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.035, 0.24, 0.035]} />
        <meshStandardMaterial color="#2a2c31" roughness={0.35} metalness={0.75} />
      </mesh>
      {/* Bezel */}
      <mesh position={[0, 0.3, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.6, 0.38, 0.028]} />
        <meshStandardMaterial color="#1c1d20" roughness={0.4} metalness={0.5} />
      </mesh>
      {/* Screen glass — subtle reflection via clearcoat-like roughness, wakes up on hover */}
      <mesh position={[0, 0.3, 0.015]}>
        <planeGeometry args={[0.55, 0.32]} />
        <meshPhysicalMaterial
          color="#05070a"
          emissive={arc}
          emissiveIntensity={hovered ? 0.9 : 0.22}
          roughness={0.15}
          metalness={0.1}
          clearcoat={0.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
