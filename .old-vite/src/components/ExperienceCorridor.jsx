import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ExperienceCorridor() {
  const tunnelRef = useRef();
  const ringGroupRef = useRef();

  useFrame(({ clock }) => {
    const elapsed = clock.getElapsedTime();
    
    // Rotate tunnel grid slowly
    if (tunnelRef.current) {
      tunnelRef.current.rotation.z = elapsed * 0.05;
    }

    // Move rings backwards along Z to simulate travel
    if (ringGroupRef.current) {
      ringGroupRef.current.children.forEach((ring) => {
        ring.position.z += 0.08;
        
        // Wrap around when it gets behind camera (e.g. Z > 5)
        if (ring.position.z > 5) {
          ring.position.z = -25;
        }
      });
    }
  });

  // Pre-generate positions for 6 neon rings
  const rings = Array.from({ length: 6 }).map((_, i) => ({
    z: -i * 5,
    color: i % 2 === 0 ? "#06b6d4" : "#d946ef"
  }));

  return (
    <group>
      {/* Grid Cylinder Tunnel */}
      <mesh ref={tunnelRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -10]}>
        <cylinderGeometry args={[5, 5, 40, 24, 20, true]} />
        <meshBasicMaterial
          color="#06b6d4"
          wireframe
          transparent
          opacity={0.12}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Floating Neon Rings */}
      <group ref={ringGroupRef}>
        {rings.map((ring, i) => (
          <mesh key={i} position={[0, 0, ring.z]} rotation={[0, 0, 0]}>
            <torusGeometry args={[4.9, 0.03, 8, 48]} />
            <meshBasicMaterial
              color={ring.color}
              transparent
              opacity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Corridor Ambient Spotlights */}
      <spotLight
        position={[0, 4, -5]}
        angle={0.6}
        penumbra={1}
        intensity={2.5}
        color="#d946ef"
        distance={20}
      />
      <spotLight
        position={[0, -4, -15]}
        angle={0.6}
        penumbra={1}
        intensity={2.5}
        color="#06b6d4"
        distance={20}
      />
    </group>
  );
}
