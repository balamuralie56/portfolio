'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Line, MeshDistortMaterial, Sparkles } from '@react-three/drei';
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

const SATELLITE_COUNT = 6;

function Satellites({ reduced, ember, arc }: { reduced: boolean; ember: string; arc: string }) {
  const ringRef = useRef<THREE.Group>(null);
  const radius = 2.15;

  const positions = useMemo(
    () =>
      Array.from({ length: SATELLITE_COUNT }, (_, i) => {
        const angle = (i / SATELLITE_COUNT) * Math.PI * 2;
        return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle * 1.3) * 0.55, Math.sin(angle) * radius);
      }),
    []
  );

  useFrame((_, delta) => {
    if (ringRef.current && !reduced) {
      ringRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={ringRef}>
      {positions.map((pos, i) => {
        const color = i % 2 === 0 ? ember : arc;
        return (
          <group key={i}>
            <Line
              points={[
                [0, 0, 0],
                [pos.x, pos.y, pos.z],
              ]}
              color={color}
              transparent
              opacity={0.22}
              lineWidth={1}
            />
            <Float
              speed={reduced ? 0 : 1.3 + (i % 3) * 0.3}
              rotationIntensity={reduced ? 0 : 0.6}
              floatIntensity={reduced ? 0 : 0.9}
            >
              <mesh position={pos}>
                <icosahedronGeometry args={[0.15, 0]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.55} wireframe={i % 3 === 0} />
              </mesh>
            </Float>
          </group>
        );
      })}
    </group>
  );
}

interface CoreProps {
  reduced: boolean;
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  ember: string;
  arc: string;
}

function Core({ reduced, pointer, ember, arc }: CoreProps) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (group.current) {
      if (!reduced) group.current.rotation.y += delta * 0.13;
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, pointer.current.y * 0.22, 0.04);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, -pointer.current.x * 0.1, 0.04);
    }
    if (core.current && !reduced) {
      core.current.rotation.y -= delta * 0.18;
    }
  });

  return (
    <group ref={group}>
      {/* Outer hex-plate — ties back to the site's badge mark */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 2.5, 0.04, 6, 1]} />
        <meshStandardMaterial color={ember} wireframe transparent opacity={0.25} />
      </mesh>

      {/* Organic distorted core */}
      <mesh ref={core}>
        <icosahedronGeometry args={[0.92, 4]} />
        <MeshDistortMaterial
          color={arc}
          emissive={arc}
          emissiveIntensity={0.4}
          factor={reduced ? 0 : 0.4}
          speed={reduced ? 0 : 1.7}
          roughness={0.25}
          metalness={0.35}
        />
      </mesh>

      <Satellites reduced={reduced} ember={ember} arc={arc} />
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
      camera={{ position: [0, 0, 6.2], fov: 40 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping }}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[4, 3, 5]} intensity={1.7} color={ember} />
      <pointLight position={[-4, -2, -3]} intensity={1.1} color={arc} />
      <Core reduced={reduced} pointer={pointer} ember={ember} arc={arc} />
      {!reduced && (
        <>
          <Sparkles count={70} scale={[7, 5, 5]} size={2.2} speed={0.22} color={sparkleColor} opacity={0.5} />
          <Sparkles count={28} scale={[4, 3, 3]} size={1.2} speed={0.4} color={ember} opacity={0.35} />
        </>
      )}
    </Canvas>
  );
}
