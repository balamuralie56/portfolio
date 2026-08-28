import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { skills } from '../utils/data';

function Planet({ skill, index, onHoverPlanet, onSelectPlanet, isHovered, isSelected }) {
  const meshRef = useRef();
  
  // Calculate orbits: spread planets in concentric circles
  const radius = 3.5 + index * 1.5;
  const speed = skill.speed * 0.15;
  
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    
    // Slow planetary orbit
    const t = clock.getElapsedTime() * speed + (index * Math.PI * 2) / skills.length;
    meshRef.current.position.x = Math.cos(t) * radius;
    meshRef.current.position.z = Math.sin(t) * radius;
    meshRef.current.position.y = Math.sin(t * 2) * 0.5; // Slight wave motion
    
    // Spin on its own axis
    meshRef.current.rotation.y += 0.01;
  });

  const displayScale = isSelected ? 1.6 : isHovered ? 1.3 : 1.0;

  return (
    <group>
      {/* Orbit Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 64]} />
        <meshBasicMaterial color="#06b6d4" opacity={0.06} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Orbit Body */}
      <group ref={meshRef}>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
            onHoverPlanet(skill);
          }}
          onPointerOut={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'default';
            onHoverPlanet(null);
          }}
          onClick={(e) => {
            e.stopPropagation();
            onSelectPlanet(skill);
          }}
        >
          <sphereGeometry args={[0.35 * skill.size * displayScale, 32, 32]} />
          <meshStandardMaterial
            color={skill.color}
            emissive={skill.color}
            emissiveIntensity={isSelected ? 1.5 : isHovered ? 0.9 : 0.2}
            roughness={0.1}
            metalness={0.8}
          />
        </mesh>

        {/* Orbit Ring / Halo */}
        {(isHovered || isSelected) && (
          <mesh rotation={[Math.PI / 2.5, 0, 0]}>
            <ringGeometry args={[0.35 * skill.size * displayScale + 0.1, 0.35 * skill.size * displayScale + 0.15, 32]} />
            <meshBasicMaterial color="#06b6d4" opacity={0.6} transparent side={THREE.DoubleSide} />
          </mesh>
        )}

        {/* 3D HTML Label */}
        {(isHovered || isSelected) && (
          <Html distanceFactor={8} position={[0, 0.7, 0]} center>
            <div className="backdrop-blur-md bg-black/80 border border-cyan-400/50 px-2 py-1 rounded text-[8px] font-mono text-cyan-300 whitespace-nowrap uppercase tracking-widest pointer-events-none select-none shadow-[0_0_8px_#06b6d4]">
              {skill.name}
            </div>
          </Html>
        )}
      </group>
    </group>
  );
}

export default function SkillsGalaxy({ activeSkill, hoveredSkill, onSelectSkill }) {
  const galaxyRef = useRef();

  useFrame(() => {
    if (galaxyRef.current) {
      galaxyRef.current.rotation.y += 0.001; // Slow rotation of entire galaxy
    }
  });

  return (
    <group ref={galaxyRef}>
      {/* Central Star - The AI Core */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshBasicMaterial color="#06b6d4" />
      </mesh>
      
      {/* Outer Halo */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.8, 64]} />
        <meshBasicMaterial color="#d946ef" opacity={0.2} transparent side={THREE.DoubleSide} />
      </mesh>

      {/* Orbiting planets */}
      {skills.map((skill, index) => (
        <Planet
          key={skill.name}
          skill={skill}
          index={index}
          onHoverPlanet={(s) => onSelectSkill(s, true)}
          onSelectPlanet={(s) => onSelectSkill(s, false)}
          isHovered={hoveredSkill?.name === skill.name}
          isSelected={activeSkill?.name === skill.name}
        />
      ))}
    </group>
  );
}
