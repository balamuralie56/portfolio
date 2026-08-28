'use client';

import React from 'react';
import { useModel } from './hooks';

// Real asset — see public/ASSET_LICENSES.md.
export default function Sofa() {
  const scene = useModel('/models/furniture/sofa/sofa_02_1k.gltf');
  return <primitive object={scene} />;
}
