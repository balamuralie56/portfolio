/* eslint-disable */
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Target shape generators
const generateSphere = (count, radius) => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = radius * (0.85 + Math.random() * 0.15);
    
    arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    arr[i * 3 + 2] = r * Math.cos(phi);
  }
  return arr;
};

const generateGrid = (count, width, depth) => {
  const arr = new Float32Array(count * 3);
  const cols = Math.floor(Math.sqrt(count));
  const rows = Math.ceil(count / cols);
  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    arr[i * 3] = (c / cols - 0.5) * width;
    arr[i * 3 + 1] = -1.5; // desk height offset
    arr[i * 3 + 2] = (r / rows - 0.5) * depth;
  }
  return arr;
};

const generateTunnel = (count, radius, length) => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const distZ = (Math.random() - 0.5) * length;
    const r = radius * (0.95 + Math.random() * 0.05);

    arr[i * 3] = Math.cos(angle) * r;
    arr[i * 3 + 1] = Math.sin(angle) * r;
    arr[i * 3 + 2] = distZ - 10; // offset tunnel z coordinate
  }
  return arr;
};

const generateScatter = (count, size) => {
  const arr = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    arr[i * 3] = (Math.random() - 0.5) * size;
    arr[i * 3 + 1] = (Math.random() - 0.5) * size;
    arr[i * 3 + 2] = (Math.random() - 0.5) * size;
  }
  return arr;
};

export default function ParticleCore({ activeSection }) {
  const pointsRef = useRef();
  const particleCount = 2000;

  // Pre-generate target shapes
  const shapes = useMemo(() => {
    return {
      0: generateSphere(particleCount, 2.2),     // Hero Sphere core
      1: generateGrid(particleCount, 8, 8),      // About desk flat grid
      2: generateScatter(particleCount, 12),     // Skills Galaxy stars
      3: generateScatter(particleCount, 9),       // Project boards
      4: generateTunnel(particleCount, 4.8, 30),  // Experience tunnel outline
      5: generateSphere(particleCount, 4.0),     // Achievements dome
      6: generateGrid(particleCount, 12, 6)      // Recruiter console base
    };
  }, [particleCount]);

  // Current active positions
  const currentPositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    const initialTarget = shapes[0];
    for (let i = 0; i < particleCount * 3; i++) {
      arr[i] = initialTarget[i];
    }
    return arr;
  }, [shapes, particleCount]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    
    // Choose active shape target
    const target = shapes[activeSection] || shapes[0];
    const lerpFactor = 0.06; // Morphing speed

    // Easing current position to target coordinate
    for (let i = 0; i < particleCount * 3; i++) {
      currentPositions[i] += (target[i] - currentPositions[i]) * lerpFactor;
      
      // Add slight noise waving motion to make particles feel alive
      if (i % 3 === 0) {
        currentPositions[i] += Math.sin(state.clock.getElapsedTime() + i) * 0.002;
      } else if (i % 3 === 1) {
        currentPositions[i] += Math.cos(state.clock.getElapsedTime() + i) * 0.002;
      }
    }

    posAttr.copyArray(currentPositions);
    posAttr.needsUpdate = true;

    // Spin entire cluster slowly
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[currentPositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        color="#06b6d4"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
