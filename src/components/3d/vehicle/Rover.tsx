'use client';

import React from 'react';

interface Props {
  ember: string;
  arc: string;
}

// Procedural, on purpose — a literal car doesn't make sense driving around
// an indoor office, so this is a small exploration rover instead: the same
// "steer a vehicle through the world" mechanic, adapted to fit the actual
// scene rather than copying the reference site's object literally.
export default function Rover({ ember, arc }: Props) {
  return (
    <group>
      {/* Chassis */}
      <mesh position={[0, 0.13, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.34, 0.12, 0.48]} />
        <meshStandardMaterial color="#2b2f38" roughness={0.4} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.2, -0.02]} castShadow receiveShadow>
        <boxGeometry args={[0.22, 0.09, 0.26]} />
        <meshStandardMaterial color="#1c1e24" roughness={0.35} metalness={0.6} />
      </mesh>
      {/* Wheels */}
      {[
        [-0.19, 0.08, 0.16],
        [0.19, 0.08, 0.16],
        [-0.19, 0.08, -0.16],
        [0.19, 0.08, -0.16],
      ].map((p, i) => (
        <mesh key={i} position={p as [number, number, number]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.08, 0.08, 0.06, 16]} />
          <meshStandardMaterial color="#111214" roughness={0.7} metalness={0.2} />
        </mesh>
      ))}
      {/* Front sensor "eyes" — marks facing direction (-Z) */}
      <mesh position={[-0.08, 0.15, -0.24]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color={arc} emissive={arc} emissiveIntensity={1} toneMapped={false} />
      </mesh>
      <mesh position={[0.08, 0.15, -0.24]}>
        <sphereGeometry args={[0.025, 12, 12]} />
        <meshStandardMaterial color={arc} emissive={arc} emissiveIntensity={1} toneMapped={false} />
      </mesh>
      {/* Antenna + beacon */}
      <mesh position={[0, 0.28, 0.04]}>
        <cylinderGeometry args={[0.008, 0.008, 0.14, 6]} />
        <meshStandardMaterial color="#7c8290" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.36, 0.04]}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshStandardMaterial color={ember} emissive={ember} emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
    </group>
  );
}
