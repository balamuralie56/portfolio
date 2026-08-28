'use client';

import React from 'react';
import { Environment } from '@react-three/drei';

interface Props {
  ember: string;
  arc: string;
}

// Real HDRI (Poly Haven "Reading Room", CC0 — see ASSET_LICENSES.md) drives
// ambient light and every material's reflections — this is what actually
// makes PBR surfaces (the desk's metal legs, the lamp, the frame glass)
// read as real rather than flat. A warm directional light on top gives the
// specific "sunlight through a window" cast shadow the brief asked for.
export default function WorkspaceLighting({ ember, arc }: Props) {
  return (
    <>
      <Environment files="/models/environment/reading_room_1k.hdr" environmentIntensity={0.65} />
      <ambientLight intensity={0.25} color="#fff4e0" />
      <directionalLight
        position={[4.2, 5.2, 2.6]}
        intensity={2.1}
        color="#ffd9a0"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
        shadow-bias={-0.0004}
      />
      {/* Lamp glow + a faint accent, tying back to the site palette without reading as neon */}
      <pointLight position={[-2.3, 1.75, -0.55]} intensity={0.45} color={ember} distance={3.2} />
      <pointLight position={[1.8, 1.1, -2.6]} intensity={0.2} color={arc} distance={3} />
    </>
  );
}
