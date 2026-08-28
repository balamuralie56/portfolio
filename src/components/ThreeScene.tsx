'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useTheme } from './ThemeProvider';
import ParticleCore from './ParticleCore';
import SkillsGalaxy from './SkillsGalaxy';
import ExperienceCorridor from './ExperienceCorridor';
import * as THREE from 'three';

interface ThreeSceneProps {
  scrollProgress: number;
}

// Subcomponent to smoothly animate camera positions based on scroll section index
function CameraController({ scrollProgress }: { scrollProgress: number }) {
  const { camera } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    const section = Math.floor(scrollProgress);
    const progress = scrollProgress - section;

    const lerp = (start: number, end: number, amt: number) => start + (end - start) * amt;

    // Define positions & viewing targets for each sector
    const cameraConfigs = [
      // Sec 0: Hero
      { pos: [0, 0, 8], look: [0, 0, 0] },
      // Sec 1: About Room (desk view)
      { pos: [0, 2.5, 4], look: [0, -1, -2] },
      // Sec 2: Skills Galaxy (overhead orbit view)
      { pos: [0, 6, 8], look: [0, 0, 0] },
      // Sec 3: Experience Corridor (inside tunnel)
      { pos: [0, 0, 5], look: [0, 0, -15] },
      // Sec 4: Project Universe (floating islands)
      { pos: [0, 3, 10], look: [0, 0, 0] },
      // Sec 5: Achievements (centered orb)
      { pos: [0, 0, 5], look: [0, 0, 0] },
      // Sec 6: Certifications (curved display wall)
      { pos: [0, 1.5, 6], look: [0, 0, 0] },
      // Sec 7: Research (DNA double helix side view)
      { pos: [3.5, 0, 6], look: [0, 0, 0] },
      // Sec 8: Recruiter (dashboard grid)
      { pos: [0, 0, 7.5], look: [0, 0, 0] },
      // Sec 9: AI Assistant (signal wave)
      { pos: [0, 0, 6], look: [0, 0, 0] }
    ];

    const currentConfig = cameraConfigs[Math.min(section, cameraConfigs.length - 1)];
    const nextConfig = cameraConfigs[Math.min(section + 1, cameraConfigs.length - 1)];

    // Interpolate camera positions
    const posX = lerp(currentConfig.pos[0], nextConfig.pos[0], progress);
    const posY = lerp(currentConfig.pos[1], nextConfig.pos[1], progress);
    const posZ = lerp(currentConfig.pos[2], nextConfig.pos[2], progress);

    const lookX = lerp(currentConfig.look[0], nextConfig.look[0], progress);
    const lookY = lerp(currentConfig.look[1], nextConfig.look[1], progress);
    const lookZ = lerp(currentConfig.look[2], nextConfig.look[2], progress);

    // Smoothly apply coordinates to camera
    camera.position.lerp(new THREE.Vector3(posX, posY, posZ), 0.08);
    currentTarget.current.lerp(new THREE.Vector3(lookX, lookY, lookZ), 0.08);
    camera.lookAt(currentTarget.current);
  });

  return null;
}

export default function ThreeScene({ scrollProgress }: ThreeSceneProps) {
  const { theme } = useTheme();
  const activeSection = Math.round(scrollProgress);

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 w-full h-full z-0 select-none pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Dynamic Theme Adaptive Lights */}
        {isDark ? (
          <>
            <ambientLight intensity={0.15} color="#020617" />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#06b6d4" />
            <pointLight position={[-5, -5, -5]} intensity={1.5} color="#d946ef" />
            <directionalLight position={[0, 10, 0]} intensity={0.5} color="#0284c7" />
          </>
        ) : (
          <>
            <ambientLight intensity={0.8} color="#f8fafc" />
            <directionalLight position={[5, 10, 5]} intensity={1.8} color="#60a5fa" />
            <pointLight position={[-5, 5, -5]} intensity={1.0} color="#818cf8" />
          </>
        )}

        {/* Morphing Particles */}
        <ParticleCore activeSection={activeSection} />

        {/* Render interactive 3D structures based on active section */}
        {activeSection === 2 && <SkillsGalaxy />}
        {activeSection === 3 && <ExperienceCorridor />}

        {/* Camera controller tracking scroll */}
        <CameraController scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
