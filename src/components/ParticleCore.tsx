'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useTheme } from './ThemeProvider';

interface ParticleCoreProps {
  activeSection: number;
}

// Pure pseudo-random generator declared outside of React render cycles to avoid compilation errors
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export default function ParticleCore({ activeSection }: ParticleCoreProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const { theme } = useTheme();
  const { pointer } = useThree();

  const particleCount = 2000;

  // Pre-calculate target positions for each state/shape
  const shapes = useMemo(() => {
    const targets: Float32Array[] = [];

    // Shape 0: Hero - Floating Cloud / Nebula
    const heroArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = pseudoRandom(i * 1.1) * Math.PI * 2;
      const r = 3 + pseudoRandom(i * 1.2) * 8;
      heroArray[i * 3] = Math.cos(theta) * r + (pseudoRandom(i * 1.3) - 0.5) * 2;
      heroArray[i * 3 + 1] = (pseudoRandom(i * 1.4) - 0.5) * 6;
      heroArray[i * 3 + 2] = Math.sin(theta) * r + (pseudoRandom(i * 1.5) - 0.5) * 2;
    }
    targets.push(heroArray);

    // Shape 1: About - Flat Grid Plane (Digital Desk)
    const aboutArray = new Float32Array(particleCount * 3);
    const cols = 50;
    for (let i = 0; i < particleCount; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      aboutArray[i * 3] = (col - cols / 2) * 0.4;
      aboutArray[i * 3 + 1] = -2.5 + Math.sin(col * 0.2) * 0.2;
      aboutArray[i * 3 + 2] = (row - (particleCount / cols) / 2) * 0.4;
    }
    targets.push(aboutArray);

    // Shape 2: Skills - Orbiting planetary solar system
    const skillsArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      // 5 orbits
      const orbitIdx = i % 5;
      const radius = 2 + orbitIdx * 2.2;
      const angle = (i / particleCount) * Math.PI * 2 * (orbitIdx + 1) + pseudoRandom(i * 1.6) * 0.2;
      skillsArray[i * 3] = Math.cos(angle) * radius;
      skillsArray[i * 3 + 1] = (pseudoRandom(i * 1.7) - 0.5) * 0.8;
      skillsArray[i * 3 + 2] = Math.sin(angle) * radius;
    }
    targets.push(skillsArray);

    // Shape 3: Experience - Scrolling grid corridor/tunnel
    const expArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const slice = i / particleCount;
      const angle = slice * Math.PI * 2 * 12; // spiral wrapping
      const radius = 4;
      expArray[i * 3] = Math.cos(angle) * radius;
      expArray[i * 3 + 1] = slice * 24 - 12;
      expArray[i * 3 + 2] = Math.sin(angle) * radius;
    }
    targets.push(expArray);

    // Shape 4: Projects - Floating Island Clusters
    const projArray = new Float32Array(particleCount * 3);
    const islandCount = 5;
    const centers = [
      [-6, 0, -2],
      [-2, 1, -6],
      [4, -1, -4],
      [5, 2, -1],
      [0, -2, -2]
    ];
    for (let i = 0; i < particleCount; i++) {
      const island = i % islandCount;
      const center = centers[island];
      const r = pseudoRandom(i * 2.1) * 1.5;
      const theta = pseudoRandom(i * 2.2) * Math.PI * 2;
      projArray[i * 3] = center[0] + Math.cos(theta) * r + (pseudoRandom(i * 2.3) - 0.5) * 0.5;
      projArray[i * 3 + 1] = center[1] + (pseudoRandom(i * 2.4) - 0.5) * 0.8;
      projArray[i * 3 + 2] = center[2] + Math.sin(theta) * r + (pseudoRandom(i * 2.5) - 0.5) * 0.5;
    }
    targets.push(projArray);

    // Shape 5: Achievements - Core Sphere
    const achArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const u = pseudoRandom(i * 3.1);
      const v = pseudoRandom(i * 3.2);
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = 3;
      achArray[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      achArray[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      achArray[i * 3 + 2] = r * Math.cos(phi);
    }
    targets.push(achArray);

    // Shape 6: Certifications - Curved display wall
    const certArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = -Math.PI / 4 + (i / particleCount) * (Math.PI / 2);
      const radius = 8;
      certArray[i * 3] = Math.sin(angle) * radius;
      certArray[i * 3 + 1] = ((i % 40) - 20) * 0.15;
      certArray[i * 3 + 2] = -Math.cos(angle) * radius + 5;
    }
    targets.push(certArray);

    // Shape 7: Research - DNA Double Helix
    const researchArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const strand = i % 2;
      const t = (i / particleCount) * Math.PI * 6; // 3 turns
      const radius = 2.5;
      const angle = t + (strand * Math.PI);
      researchArray[i * 3] = Math.cos(angle) * radius;
      researchArray[i * 3 + 1] = t * 1.5 - 4.5;
      researchArray[i * 3 + 2] = Math.sin(angle) * radius;
    }
    targets.push(researchArray);

    // Shape 8: Recruiter - Holographic grid metrics
    const recArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = (i / particleCount) * Math.PI * 2;
      const radius = 5 + Math.sin(theta * 8) * 0.5;
      recArray[i * 3] = Math.cos(theta) * radius;
      recArray[i * 3 + 1] = ((i % 10) - 5) * 1.2;
      recArray[i * 3 + 2] = Math.sin(theta) * radius;
    }
    targets.push(recArray);

    // Shape 9: AI Assistant - Sine Wave Signal
    const assistArray = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const x = ((i / particleCount) - 0.5) * 20;
      assistArray[i * 3] = x;
      assistArray[i * 3 + 1] = Math.sin(x * 1.5) * 1.5 + Math.cos(x * 0.5) * 0.5;
      assistArray[i * 3 + 2] = (pseudoRandom(i * 4.1) - 0.5) * 3;
    }
    targets.push(assistArray);

    return targets;
  }, [particleCount]);

  // Initial buffer geometry arrays
  const initialPositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      arr[i] = (pseudoRandom(i * 5.1) - 0.5) * 20;
    }
    return arr;
  }, [particleCount]);

  // Handle color transitions depending on theme
  const colors = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    const colorA = new THREE.Color(theme === 'dark' ? '#06b6d4' : '#2563eb'); // cyan vs blue
    const colorB = new THREE.Color(theme === 'dark' ? '#d946ef' : '#6366f1'); // fuchsia vs indigo
    
    for (let i = 0; i < particleCount; i++) {
      const mixed = colorA.clone().lerp(colorB, pseudoRandom(i * 6.1));
      arr[i * 3] = mixed.r;
      arr[i * 3 + 1] = mixed.g;
      arr[i * 3 + 2] = mixed.b;
    }
    return arr;
  }, [theme, particleCount]);

  // Frame animation loop
  useFrame(({ clock }) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const pos = geo.attributes.position;
    if (!pos) return;

    const time = clock.getElapsedTime();
    const targetArr = shapes[Math.min(activeSection, shapes.length - 1)];

    // Target tracking values
    const current = pos.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      
      // Interpolate current positions towards active shape target
      current[idx] += (targetArr[idx] - current[idx]) * 0.08;
      current[idx + 1] += (targetArr[idx + 1] - current[idx + 1]) * 0.08;
      current[idx + 2] += (targetArr[idx + 2] - current[idx + 2]) * 0.08;

      // Small secondary animation noise
      current[idx] += Math.sin(time + i) * 0.005;
      current[idx + 1] += Math.cos(time + i * 1.5) * 0.005;
      current[idx + 2] += Math.sin(time + i * 0.5) * 0.005;

      // Mouse distortion
      const pX = current[idx];
      const pY = current[idx + 1];
      
      // Map pointer coordinates (-1 to 1) to screen space roughly
      const mX = pointer.x * 6;
      const mY = pointer.y * 4;

      const dx = pX - mX;
      const dy = pY - mY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 1.8) {
        const force = (1.8 - dist) * 0.04;
        current[idx] += (dx / dist) * force;
        current[idx + 1] += (dy / dist) * force;
      }
    }

    pos.needsUpdate = true;

    // Apply overall rotation
    pointsRef.current.rotation.y = time * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[initialPositions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
