'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useModel } from '../hooks';
import AchievementPlaque from '../AchievementPlaque';

interface Props {
  ember: string;
  arc: string;
  reduced: boolean;
}

// Small, restrained focal objects for the earlier (pre-arrival) chapters —
// mood and continuity, not literal illustration. The actual storytelling
// is carried by ChapterCaptions; these just give the camera something to
// pass by. Deliberately simple so they never compete with the real room
// at the end of the journey.
export default function ChapterMarkers({ ember, arc, reduced }: Props) {
  const spark = useRef<THREE.Mesh>(null);
  const books = useModel('/models/decor/books/book_encyclopedia_set_01_1k.gltf');

  useFrame((_, delta) => {
    if (spark.current && !reduced) {
      spark.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <>
      {/* Origins — a single small spark, alone */}
      <mesh position={[0, 2.0, 19]} ref={spark}>
        <icosahedronGeometry args={[0.09, 1]} />
        <meshStandardMaterial color={ember} emissive={ember} emissiveIntensity={1.1} toneMapped={false} />
      </mesh>
      <pointLight position={[0, 2.0, 19]} color={ember} intensity={0.7} distance={3} />

      {/* B.Sc — books, three stacked/fanned */}
      <group position={[0, 1.42, 13]} rotation={[0, 0.3, 0]}>
        <primitive object={books} />
        <primitive object={books.clone(true)} position={[0.05, 0, 0.05]} rotation={[0, 0.4, 0]} />
        <primitive object={books.clone(true)} position={[-0.04, 0, -0.03]} rotation={[0, -0.3, 0]} />
      </group>

      {/* Field work — three small connected nodes */}
      <group position={[0, 1.15, 7]}>
        {[-0.22, 0, 0.22].map((x, i) => (
          <mesh key={i} position={[x, i === 1 ? 0.12 : 0, 0]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshStandardMaterial color={arc} emissive={arc} emissiveIntensity={0.8} toneMapped={false} />
          </mesh>
        ))}
      </group>

      {/* M.Sc + recognition — the achievement plaque, floating */}
      <group position={[0, 0.95, 3]} scale={1.6}>
        <AchievementPlaque ember={ember} />
      </group>
    </>
  );
}
