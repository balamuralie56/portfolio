'use client';

import React from 'react';
import { useModel } from './hooks';

// Real asset — see public/ASSET_LICENSES.md (Kenney was researched but
// couldn't be scripted; this came from Poly Haven's public files API,
// CC0, no attribution required).
export default function Desk() {
  const scene = useModel('/models/furniture/desk/metal_office_desk_1k.gltf');
  return <primitive object={scene} />;
}
