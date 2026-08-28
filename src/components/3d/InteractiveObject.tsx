'use client';

import React, { useRef, useState } from 'react';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  position?: [number, number, number];
  rotation?: [number, number, number];
  onSelect: () => void;
  label: string;
  reduced: boolean;
  children: React.ReactNode;
}

// Wraps any furniture group with hover feedback (subtle scale-up + a small
// mono label, in the site's Field Dossier style) and a click handler.
// Reacts first; the actual section jump happens after, in the parent.
export default function InteractiveObject({ position, rotation, onSelect, label, reduced, children }: Props) {
  const [hovered, setHovered] = useState(false);
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!group.current) return;
    const target = hovered && !reduced ? 1.035 : 1;
    if (reduced) {
      group.current.scale.setScalar(target);
    } else {
      group.current.scale.lerp(new THREE.Vector3(target, target, target), 0.18);
    }
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
  };
  const handleOut = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'auto';
  };
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <group
      ref={group}
      position={position}
      rotation={rotation}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
    >
      {children}
      {hovered && (
        <Html center distanceFactor={9} position={[0, 0.85, 0]} style={{ pointerEvents: 'none' }}>
          <div
            style={{
              fontFamily: "'Share Tech Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#F3F5F7',
              background: 'rgba(10,11,14,0.82)',
              border: '1px solid #FF7A1A',
              padding: '4px 9px',
              borderRadius: 2,
              whiteSpace: 'nowrap',
            }}
          >
            {label}
          </div>
        </Html>
      )}
    </group>
  );
}
