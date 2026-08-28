'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  src: string;
  position: [number, number, number];
  reduced: boolean;
  ember: string;
  onSelect: () => void;
}

// A real photo (from public/images/, already verified — see report.md)
// mounted as a physical framed object rather than an HTML <img> card.
// Moves subtly forward and brightens on hover.
export default function PhotoFrame({ src, position, reduced, ember, onSelect }: Props) {
  const texture = useTexture(src);
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const targetZ = hovered && !reduced ? position[2] + 0.08 : position[2];
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
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
    >
      <mesh castShadow>
        <boxGeometry args={[0.62, 0.46, 0.03]} />
        <meshStandardMaterial color={hovered ? ember : '#2b2f38'} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[0.54, 0.38]} />
        <meshStandardMaterial map={texture} toneMapped={false} emissiveIntensity={hovered ? 0.15 : 0} />
      </mesh>
    </group>
  );
}
