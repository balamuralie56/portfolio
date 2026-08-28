'use client';

import React from 'react';
import { useModel } from './hooks';

// Real asset — see public/ASSET_LICENSES.md. Doubles as the "AI / Computer
// Vision" desk accessory the brief asked for — a security camera reads as
// a sensor/vision device without pretending to be a screenshot of a real
// deployed system.
export default function Camera() {
  const scene = useModel('/models/electronics/camera/security_camera_01_1k.gltf');
  return <primitive object={scene} position={[0, 0.025, 0]} />;
}
