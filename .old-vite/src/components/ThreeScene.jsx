import React from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleCore from './ParticleCore';
import SkillsGalaxy from './SkillsGalaxy';
import ExperienceCorridor from './ExperienceCorridor';

// Camera position targets for each section index
const CAMERA_TARGETS = {
  0: { pos: new THREE.Vector3(0, 0, 5), look: new THREE.Vector3(0, 0, 0) },      // Hero: center core
  1: { pos: new THREE.Vector3(0, 2.2, 4), look: new THREE.Vector3(0, -0.6, -1) },   // About: desk angle
  2: { pos: new THREE.Vector3(0, 1.2, 7.5), look: new THREE.Vector3(0, 0, 0) },     // Skills: orbit galaxy
  3: { pos: new THREE.Vector3(-1.2, 0.5, 6), look: new THREE.Vector3(0, 0, 0) },    // Projects: grid skew
  4: { pos: new THREE.Vector3(0, 0, 0.5), look: new THREE.Vector3(0, 0, -20) },   // Experience: corridor entry
  5: { pos: new THREE.Vector3(0, 1.8, 5.5), look: new THREE.Vector3(0, 0.2, 0) },  // Achievements: gallery
  6: { pos: new THREE.Vector3(0, 0.5, 4.5), look: new THREE.Vector3(0, 0, 0) }    // Recruiter: console front
};

function CameraController({ scrollProgress }) {
  const { camera, pointer } = useThree();

  useFrame(() => {
    // Interpolate targets based on fractional scroll progress
    const lowerIndex = Math.min(6, Math.max(0, Math.floor(scrollProgress)));
    const upperIndex = Math.min(6, Math.max(0, Math.ceil(scrollProgress)));
    const t = scrollProgress - lowerIndex;

    const lowerTarget = CAMERA_TARGETS[lowerIndex];
    const upperTarget = CAMERA_TARGETS[upperIndex];

    if (!lowerTarget || !upperTarget) return;

    // Linear interpolate position and lookAt target vectors
    const lerpedPos = new THREE.Vector3().lerpVectors(lowerTarget.pos, upperTarget.pos, t);
    const lerpedLook = new THREE.Vector3().lerpVectors(lowerTarget.look, upperTarget.look, t);
    
    // Add mouse parallax on top
    lerpedPos.x += pointer.x * 0.75;
    lerpedPos.y += pointer.y * 0.45;

    // Smoothly lerp camera position
    camera.position.lerp(lerpedPos, 0.05);
    
    // Smoothly lerp lookAt target direction
    const currentLook = new THREE.Vector3(0, 0, -5).applyQuaternion(camera.quaternion).add(camera.position);
    currentLook.lerp(lerpedLook, 0.055);
    camera.lookAt(currentLook);
  });

  return null;
}

export default function ThreeScene({ scrollProgress, activeSkill, hoveredSkill, onSelectSkill }) {
  const activeSection = Math.round(scrollProgress);

  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#020205] select-none pointer-events-auto">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#020205'));
        }}
      >
        {/* Ambient base */}
        <ambientLight intensity={0.15} />
        
        {/* Cyan key spotlight */}
        <pointLight
          position={[6, 4, 8]}
          intensity={1.8}
          color="#06b6d4"
        />

        {/* Magenta fill spotlight */}
        <pointLight
          position={[-6, -4, 4]}
          intensity={1.2}
          color="#d946ef"
        />

        {/* Morphing Particles */}
        <ParticleCore activeSection={activeSection} />

        {/* Skills Galaxy (only visible around Skills sector 2) */}
        {(activeSection === 2 || Math.abs(scrollProgress - 2) < 0.6) && (
          <SkillsGalaxy
            activeSkill={activeSkill}
            hoveredSkill={hoveredSkill}
            onSelectSkill={onSelectSkill}
          />
        )}

        {/* Corridor Cylinder (only visible in Corridor sector 4) */}
        {(activeSection === 4 || Math.abs(scrollProgress - 4) < 0.6) && <ExperienceCorridor />}

        {/* Achievements accent lights */}
        {(activeSection === 5 || Math.abs(scrollProgress - 5) < 0.6) && (
          <>
            <pointLight position={[0, -1, 1]} intensity={3.5} color="#d946ef" distance={10} />
            <pointLight position={[0, 3, -1]} intensity={2.5} color="#06b6d4" distance={10} />
          </>
        )}

        {/* Camera Scroll Controller */}
        <CameraController scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
