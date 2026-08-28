'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

function useReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setReduced(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return reduced;
}

function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handle = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      pointer.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handle);
    return () => window.removeEventListener('pointermove', handle);
  }, []);
  return pointer;
}

interface EmblemProps {
  reduced: boolean;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  ember: string;
  arc: string;
}

// A 3D extension of the site's hex-badge mark: a six-sided plate (a cylinder
// with 6 radial segments is a hexagonal prism) with a rotating core inside it.
function Emblem({ reduced, pointer, ember, arc }: EmblemProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (group.current && !reduced) {
      group.current.rotation.y += delta * 0.16;
    }
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.current.y * 0.22, 0.04);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.current.x * 0.1, 0.04);
    }
    if (core.current && !reduced) {
      core.current.rotation.y -= delta * 0.32;
      core.current.rotation.x += delta * 0.12;
    }
  });

  return (
    <group ref={group}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[1.55, 1.55, 0.34, 6, 1]} />
        <meshStandardMaterial color={ember} wireframe transparent opacity={0.8} />
      </mesh>
      <mesh ref={core}>
        <octahedronGeometry args={[0.82, 0]} />
        <meshStandardMaterial color={arc} wireframe transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const pointer = usePointer();
  const isDark = theme === 'dark';

  const ember = isDark ? '#FF7A1A' : '#D2600F';
  const arc = isDark ? '#40C6F0' : '#0E7FA6';
  const sparkleColor = isDark ? '#8FD8F2' : '#0E7FA6';

  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.65} />
      <pointLight position={[3, 2, 4]} intensity={1.2} color={ember} />
      <pointLight position={[-3, -2, -2]} intensity={0.8} color={arc} />
      <Emblem reduced={reduced} pointer={pointer} ember={ember} arc={arc} />
      {!reduced && (
        <Sparkles count={55} scale={[6.5, 4.5, 4]} size={2} speed={0.25} color={sparkleColor} opacity={0.5} />
      )}
    </Canvas>
  );
}
