'use client';

import React from 'react';
import { useModel } from './hooks';

// Real asset — see public/ASSET_LICENSES.md. The model's base sits ~0.088m
// below its own pivot, so it's nudged up to actually rest on the desk
// surface instead of sinking into it.
export default function Lamp() {
  const scene = useModel('/models/decor/lamp/desk_lamp_arm_01_1k.gltf');
  return <primitive object={scene} position={[0, 0.088, 0]} />;
}
