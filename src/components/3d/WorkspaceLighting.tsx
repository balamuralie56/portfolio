'use client';

import React from 'react';

interface Props {
  ember: string;
  arc: string;
}

// Warm directional "sunlight" + soft ambient fill + a small warm lamp glow.
// Deliberately bright — this is a workspace, not a cyberpunk cave.
export default function WorkspaceLighting({ ember, arc }: Props) {
  return (
    <>
      <ambientLight intensity={0.55} color="#fff4e0" />
      <directionalLight
        position={[4.5, 5.5, 3.5]}
        intensity={1.9}
        color="#ffdca8"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      <hemisphereLight args={['#cfe8ff', '#3a2f22', 0.35]} />
      {/* Lamp glow accent, tying back to the site's ember/arc palette */}
      <pointLight position={[-2.3, 1.6, -0.6]} intensity={0.6} color={ember} distance={4} />
      <pointLight position={[1.8, 1.2, -2.6]} intensity={0.35} color={arc} distance={4} />
    </>
  );
}
