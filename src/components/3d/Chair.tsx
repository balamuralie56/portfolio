'use client';

import React from 'react';
import { useModel } from './hooks';

// Real asset — see public/ASSET_LICENSES.md.
export default function Chair() {
  const scene = useModel('/models/furniture/chair/modern_arm_chair_01_1k.gltf');
  return <primitive object={scene} />;
}
