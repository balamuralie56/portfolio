'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import InfoPanel from './InfoPanel';

interface Props {
  position?: [number, number, number];
  rotation?: [number, number, number];
  title: string;
  lines: string[];
  panelOffset?: [number, number, number];
  accent?: string;
  reduced: boolean;
  children: React.ReactNode | ((hovered: boolean) => React.ReactNode);
}

// Hover-only. No onClick, no navigation, no URL change — the object reacts
// in place (subtle scale-up) and an InfoPanel appears beside it with real
// portfolio content. The visitor never leaves the room.
export default function InteractiveObject({
  position,
  rotation,
  title,
  lines,
  panelOffset,
  accent,
  reduced,
  children,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const target = hovered && !reduced ? 1.03 : 1;
    if (reduced) {
      group.current.scale.setScalar(target);
    } else {
      group.current.scale.lerp(new THREE.Vector3(target, target, target), 0.18);
    }
  });

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'default';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      {typeof children === 'function' ? children(hovered) : children}
      {hovered && <InfoPanel title={title} lines={lines} offset={panelOffset} accent={accent} />}
    </group>
  );
}
