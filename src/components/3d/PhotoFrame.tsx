'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useModel } from './hooks';
import InfoPanel from './InfoPanel';

interface Props {
  src: string;
  caption: string;
  position: [number, number, number];
  reduced: boolean;
}

// Real frame model (see public/ASSET_LICENSES.md) with the actual verified
// photo composited as a plane just in front of it — the frame ships with
// its own placeholder art baked in, so rather than trying to locate and
// swap an internal material by name, the real photo sits as its own layer.
// Hover only — hover, brighten, show the (already-verified) caption; never
// navigates anywhere.
export default function PhotoFrame({ src, caption, position, reduced }: Props) {
  const frame = useModel('/models/decor/photo-frame/hanging_picture_frame_02_1k.gltf');
  const texture = useTexture(src);
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const targetZ = hovered && !reduced ? position[2] + 0.03 : position[2];
    if (reduced) {
      group.current.position.z = targetZ;
    } else {
      group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, targetZ, 0.15);
    }
  });

  return (
    <group
      ref={group}
      position={position}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = 'auto';
      }}
    >
      <primitive object={frame} />
      <mesh position={[0, -0.03, 0.016]}>
        <planeGeometry args={[0.46, 0.28]} />
        <meshStandardMaterial map={texture} toneMapped={false} emissiveMap={texture} emissive={hovered ? '#ffffff' : '#000000'} emissiveIntensity={hovered ? 0.12 : 0} />
      </mesh>
      {hovered && <InfoPanel title="Field Log" lines={[caption]} offset={[0, -0.38, 0.05]} />}
    </group>
  );
}
