'use client';

import React from 'react';
import { useModel } from './hooks';

// Real asset — see public/ASSET_LICENSES.md. Bounding box has its base
// ~0.097m below the model's pivot, so it's nudged up to actually sit on
// the floor rather than sinking into it.
export default function Plant({ scale = 1 }: { scale?: number }) {
  const scene = useModel('/models/plants/plant-b/potted_plant_02_1k.gltf');
  return <primitive object={scene} scale={scale} position={[0, 0.097 * scale, 0]} />;
}
