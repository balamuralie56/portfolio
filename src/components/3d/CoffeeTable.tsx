'use client';

import React from 'react';
import { useModel } from './hooks';

// Real asset — see public/ASSET_LICENSES.md.
export default function CoffeeTable() {
  const scene = useModel('/models/furniture/coffee-table/modern_coffee_table_01_1k.gltf');
  return <primitive object={scene} />;
}
