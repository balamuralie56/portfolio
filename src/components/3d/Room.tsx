'use client';

import React, { useEffect } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Real PBR wood floor texture (Poly Haven "Wood Planks", CC0 — see
// ASSET_LICENSES.md), tiled across the floor. Walls stay a simple matte
// material — a real wall-plaster texture would be a nice next step, but
// the floor is the single highest-value surface to get right first.
export default function Room({ wallColor }: { wallColor: string }) {
  const [diff, normal, rough] = useTexture([
    '/models/environment/floor/wood_planks_diff_1k.jpg',
    '/models/environment/floor/wood_planks_nor_gl_1k.jpg',
    '/models/environment/floor/wood_planks_rough_1k.jpg',
  ]);

  useEffect(() => {
    [diff, normal, rough].forEach((tex) => {
      tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(5, 4);
      tex.needsUpdate = true;
    });
  }, [diff, normal, rough]);

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[14, 10]} />
        <meshStandardMaterial map={diff} normalMap={normal} roughnessMap={rough} roughness={1} />
      </mesh>

      <mesh position={[0, 2.4, -3]} receiveShadow>
        <planeGeometry args={[14, 5.2]} />
        <meshStandardMaterial color={wallColor} roughness={0.95} />
      </mesh>

      {/* A simple window opening — the visual justification for the warm
          directional "sunlight" rather than a literal glazed/glass build. */}
      <mesh position={[3.6, 2.1, -2.97]}>
        <planeGeometry args={[1.4, 1.9]} />
        <meshStandardMaterial color="#e8a856" emissive="#ff9d4d" emissiveIntensity={0.55} toneMapped={false} />
      </mesh>
      <mesh position={[3.6, 2.1, -2.965]}>
        <boxGeometry args={[0.02, 1.9, 0.02]} />
        <meshStandardMaterial color="#c8cdd6" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[3.6, 2.1, -2.965]}>
        <boxGeometry args={[1.4, 0.02, 0.02]} />
        <meshStandardMaterial color="#c8cdd6" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Wall shelf above the desk */}
      <mesh position={[0, 2.55, -2.94]} castShadow receiveShadow>
        <boxGeometry args={[2.6, 0.06, 0.22]} />
        <meshStandardMaterial color="#7a5a3a" roughness={0.6} />
      </mesh>
    </group>
  );
}
