'use client';

import React, { Suspense, useCallback, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from '../ThemeProvider';
import { useReducedMotion, useIsCoarsePointer, usePointer, goToSection, type SectionId } from './hooks';
import WorkspaceLighting from './WorkspaceLighting';
import WorkspaceCamera, { type CameraFocus } from './WorkspaceCamera';
import WorkspaceLoader from './WorkspaceLoader';
import Room from './Room';
import Desk from './Desk';
import Chair from './Chair';
import Bookshelf from './Bookshelf';
import Sofa from './Sofa';
import Plant from './Plant';
import Monitor from './Monitor';
import Laptop from './Laptop';
import PhotoFrame from './PhotoFrame';
import InteractiveObject from './InteractiveObject';

const PALETTE = {
  dark: { ember: '#FF7A1A', arc: '#40C6F0', floor: '#2a2620', wall: '#3a342b' },
  light: { ember: '#D2600F', arc: '#0E7FA6', floor: '#c9bfae', wall: '#ded4c0' },
};

// Only the two verified real photos are placed on the wall — see
// report.md §7. More can be added once identified.
const PHOTOS: { src: string; x: number }[] = [
  { src: '/images/B.sc%20Graduvation.jpeg', x: -0.75 },
  { src: '/images/GUVI%20Class%20at%20SRM.jpeg', x: 0 },
];

interface Target {
  pos: [number, number, number];
  look: [number, number, number];
}

const TARGETS: Record<SectionId, Target> = {
  about: { pos: [0.15, 1.15, 1.15], look: [0, 0.78, -0.4] },
  skills: { pos: [-1.55, 1.25, 0.35], look: [-2.6, 0.85, -1.5] },
  experience: { pos: [1.55, 1.15, 0.55], look: [2.5, 0.55, -0.7] },
  projects: { pos: [0, 1.02, 1.3], look: [0, 0.95, -1.15] },
  achievements: { pos: [-0.35, 1.55, 0.4], look: [-0.4, 1.75, -2.9] },
  contact: { pos: [0.5, 1.3, 0.75], look: [0.75, 0.85, -1.05] },
};

function RoomContents({
  isDark,
  reduced,
  coarse,
}: {
  isDark: boolean;
  reduced: boolean;
  coarse: boolean;
}) {
  const pointer = usePointer();
  const [focus, setFocus] = useState<CameraFocus | null>(null);
  const palette = isDark ? PALETTE.dark : PALETTE.light;

  const select = useCallback(
    (id: SectionId) => {
      const t = TARGETS[id];
      setFocus({ position: new THREE.Vector3(...t.pos), lookAt: new THREE.Vector3(...t.look) });
      const holdMs = reduced ? 0 : 650;
      window.setTimeout(() => goToSection(id, reduced), holdMs);
      window.setTimeout(() => setFocus(null), reduced ? 50 : 1500);
    },
    [reduced]
  );

  return (
    <>
      <WorkspaceLighting ember={palette.ember} arc={palette.arc} />
      <WorkspaceCamera pointer={pointer} reduced={reduced} coarse={coarse} focus={focus} />
      <Room floorColor={palette.floor} wallColor={palette.wall} />

      {/* Desk cluster */}
      <InteractiveObject position={[0, 0, -1]} onSelect={() => select('about')} label="About" reduced={reduced}>
        <Desk />
      </InteractiveObject>
      <InteractiveObject position={[-0.35, 0.75, -1.15]} onSelect={() => select('projects')} label="Projects" reduced={reduced}>
        <Monitor arc={palette.arc} />
      </InteractiveObject>
      <InteractiveObject position={[0.4, 0.75, -0.95]} onSelect={() => select('projects')} label="Projects" reduced={reduced}>
        <Laptop ember={palette.ember} />
      </InteractiveObject>
      <InteractiveObject position={[0.75, 0.76, -1.05]} onSelect={() => select('contact')} label="Contact" reduced={reduced}>
        <mesh castShadow>
          <boxGeometry args={[0.14, 0.02, 0.07]} />
          <meshStandardMaterial color={palette.ember} emissive={palette.ember} emissiveIntensity={0.5} toneMapped={false} />
        </mesh>
      </InteractiveObject>
      <Chair />

      {/* Bookshelf — stage left */}
      <InteractiveObject position={[-2.6, 0, -1.5]} rotation={[0, 0.25, 0]} onSelect={() => select('skills')} label="Skills" reduced={reduced}>
        <Bookshelf />
      </InteractiveObject>

      {/* Sofa — stage right */}
      <InteractiveObject position={[2.5, 0, -0.7]} rotation={[0, -0.55, 0]} onSelect={() => select('experience')} label="Experience" reduced={reduced}>
        <Sofa />
      </InteractiveObject>

      {/* Wall photo gallery */}
      {PHOTOS.map((p) => (
        <PhotoFrame
          key={p.src}
          src={p.src}
          position={[p.x, 1.75, -2.9]}
          reduced={reduced}
          ember={palette.ember}
          onSelect={() => select('achievements')}
        />
      ))}

      {/* Decor */}
      <group position={[-1.85, 0, -0.35]}>
        <Plant scale={0.85} />
      </group>
      <group position={[3.15, 0, -1.7]}>
        <Plant scale={1.1} />
      </group>
    </>
  );
}

interface WorkspaceSceneProps {
  coarse: boolean;
}

export default function WorkspaceScene({ coarse }: WorkspaceSceneProps) {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const isCoarse = useIsCoarsePointer() || coarse;
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0">
      <WorkspaceLoader />
      <Canvas
        shadows={!isCoarse}
        camera={{ position: [0, 1.55, 3.6], fov: 48 }}
        dpr={isCoarse ? [1, 1.2] : [1, 1.6]}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <color attach="background" args={[isDark ? '#0A0B0E' : '#F5F3EE']} />
        <fog attach="fog" args={[isDark ? '#0A0B0E' : '#F5F3EE', 6, 13]} />
        <Suspense fallback={null}>
          <RoomContents isDark={isDark} reduced={reduced} coarse={isCoarse} />
        </Suspense>
      </Canvas>
    </div>
  );
}
