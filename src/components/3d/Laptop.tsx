'use client';

import React from 'react';

interface Props {
  ember: string;
}

// Procedural, not the real Poly Haven "Classic Laptop" — that model's own
// tags are literally ['old', 'vintage', 'beige', 'notebook', 'lcd',
// 'trackball'], and it visibly clashed with a modern workspace once in
// place. A clean, correctly-proportioned primitive reads better than a
// real asset that's actively the wrong object. See ASSET_LICENSES.md.
export default function Laptop({ ember }: Props) {
  return (
    <group rotation={[0, 0.35, 0]}>
      <mesh position={[0, 0.012, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.32, 0.014, 0.22]} />
        <meshStandardMaterial color="#c9ced6" roughness={0.35} metalness={0.55} />
      </mesh>
      <mesh position={[0, 0.125, -0.1]} rotation={[-0.22, 0, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.32, 0.2, 0.011]} />
        <meshStandardMaterial color="#c9ced6" roughness={0.35} metalness={0.55} />
      </mesh>
      <mesh position={[0, 0.128, -0.094]} rotation={[-0.22, 0, 0]}>
        <planeGeometry args={[0.28, 0.165]} />
        <meshStandardMaterial color="#05070a" emissive={ember} emissiveIntensity={0.28} toneMapped={false} />
      </mesh>
    </group>
  );
}
