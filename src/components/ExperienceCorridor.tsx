'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

// Pure pseudo-random generator declared outside of React render cycles
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function ExperienceCorridor() {
  const corridorRef = useRef<THREE.Group>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  // Create ring structures
  const ringCount = 15;
  const rings = useMemo(() => {
    const arr = [];
    for (let i = 0; i < ringCount; i++) {
      arr.push({
        z: -i * 3,
        scale: 1 + Math.sin(i * 0.5) * 0.1,
        color: i % 2 === 0 ? (isDark ? '#06b6d4' : '#2563eb') : (isDark ? '#d946ef' : '#6366f1')
      });
    }
    return arr;
  }, [isDark]);

  useFrame(({ clock }) => {
    if (!corridorRef.current) return;
    
    // Constant slow rotation
    corridorRef.current.rotation.z = clock.getElapsedTime() * 0.08;

    // Shift rings slightly based on time to simulate moving forward
    const children = corridorRef.current.children;
    const time = clock.getElapsedTime() * 1.5;

    for (let i = 0; i < children.length; i++) {
      const child = children[i] as THREE.Mesh;
      if (child.name === 'ring') {
        // Move ring along Z
        const baseZ = -i * 3;
        // loop coordinate
        let currentZ = baseZ + (time % 3);
        if (currentZ > 2) {
          currentZ -= ringCount * 3;
        }
        child.position.z = currentZ;
      }
    }
  });

  return (
    <group ref={corridorRef}>
      {/* Grid Cylinder Wireframe Core */}
      <mesh position={[0, 0, -10]}>
        <cylinderGeometry args={[4.2, 4.2, 35, 16, 12, true]} />
        <meshBasicMaterial
          color={isDark ? "#083344" : "#e2e8f0"}
          wireframe
          transparent
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Repeating Cyberpunk Rings */}
      {rings.map((ring, idx) => (
        <mesh
          key={idx}
          name="ring"
          position={[0, 0, ring.z]}
          rotation={[0, 0, (idx * Math.PI) / 6]}
        >
          <torusGeometry args={[4.0, 0.03, 8, 32]} />
          <meshBasicMaterial
            color={ring.color}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}

      {/* Floating Sparkles in the tunnel */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[
              useMemo(() => {
                const arr = new Float32Array(300);
                for (let i = 0; i < 100; i++) {
                  const angle = pseudoRandom(i * 1.2) * Math.PI * 2;
                  const radius = 2 + pseudoRandom(i * 2.3) * 2;
                  arr[i * 3] = Math.cos(angle) * radius;
                  arr[i * 3 + 1] = Math.sin(angle) * radius;
                  arr[i * 3 + 2] = -pseudoRandom(i * 3.4) * 30;
                }
                return arr;
              }, []),
              3
            ]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={isDark ? "#d946ef" : "#3b82f6"}
          transparent
          opacity={0.6}
        />
      </points>
    </group>
  );
}
