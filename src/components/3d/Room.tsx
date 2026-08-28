'use client';

import React from 'react';

// Floor + back wall. Deliberately not a fully enclosed box — no side walls,
// no ceiling — keeps geometry light and avoids the camera ever feeling boxed
// in during the subtle parallax drift.
export default function Room({ floorColor, wallColor }: { floorColor: string; wallColor: string }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial color={floorColor} roughness={0.85} metalness={0.05} />
      </mesh>
      <mesh position={[0, 2.4, -3]} receiveShadow>
        <planeGeometry args={[14, 5.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>
      {/* Wall shelf above the desk */}
      <mesh position={[0, 2.55, -2.94]} castShadow>
        <boxGeometry args={[2.6, 0.06, 0.22]} />
        <meshStandardMaterial color="#7a5a3a" roughness={0.6} />
      </mesh>
    </group>
  );
}
