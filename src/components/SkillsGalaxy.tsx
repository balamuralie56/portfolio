'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { skills, Skill } from '../utils/data';
import { useTheme } from './ThemeProvider';
import { playHover } from '../utils/audio';

export default function SkillsGalaxy() {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central AI Core Glowing Sphere */}
      <mesh>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial
          color={isDark ? "#d946ef" : "#6366f1"}
          wireframe
        />
      </mesh>

      {/* Galaxy Orbits and Planets */}
      {skills.map((skill, index) => {
        // Orbit parameters
        const orbitRadius = 2.0 + index * 0.9;
        const speed = skill.speed * 0.2;
        
        return (
          <Planet
            key={skill.name}
            skill={skill}
            radius={orbitRadius}
            speed={speed}
            index={index}
            isDark={isDark}
            hoveredSkill={hoveredSkill}
            setHoveredSkill={setHoveredSkill}
          />
        );
      })}
    </group>
  );
}

interface PlanetProps {
  skill: Skill;
  radius: number;
  speed: number;
  index: number;
  isDark: boolean;
  hoveredSkill: Skill | null;
  setHoveredSkill: (s: Skill | null) => void;
}

function Planet({
  skill,
  radius,
  speed,
  index,
  isDark,
  hoveredSkill,
  setHoveredSkill
}: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const phase = (index * 0.77) % (Math.PI * 2);

  // Construct circle orbit lines
  const orbitPoints = useMemo(() => {
    const pts = [];
    const segments = 64;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
    }
    return pts;
  }, [radius]);

  const orbitGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(orbitPoints);
  }, [orbitPoints]);

  const lineObject = useMemo(() => {
    const mat = new THREE.LineBasicMaterial({
      color: isDark ? "#06b6d4" : "#3b82f6",
      transparent: true,
      opacity: 0.12
    });
    return new THREE.Line(orbitGeometry, mat);
  }, [orbitGeometry, isDark]);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed + phase;
      meshRef.current.position.x = Math.cos(t) * radius;
      meshRef.current.position.z = Math.sin(t) * radius;
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  const isHovered = hoveredSkill?.name === skill.name;

  return (
    <group>
      {/* Semi-transparent orbit line */}
      <primitive object={lineObject} />

      {/* Orbiting Planet Mesh */}
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredSkill(skill);
          playHover();
        }}
        onPointerOut={() => setHoveredSkill(null)}
      >
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial
          color={skill.color}
          roughness={0.2}
          metalness={0.8}
          emissive={isHovered ? skill.color : "#000000"}
          emissiveIntensity={isHovered ? 1.5 : 0}
        />

        {/* HTML popups on hovered planet */}
        {isHovered && (
          <Html distanceFactor={8} zIndexRange={[100, 0]} pointerEvents="none">
            <div className={`backdrop-blur-xl border rounded p-3 text-[10px] w-48 font-mono select-none transition-all duration-300 shadow-2xl ${
              isDark 
                ? 'bg-slate-950/95 border-cyan-500/40 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]' 
                : 'bg-white/95 border-blue-200/60 text-blue-800 shadow-[0_8px_30px_rgba(59,130,246,0.15)]'
            }`}>
              {/* Header Title */}
              <div className={`font-bold border-b pb-1 mb-1 text-[11px] uppercase tracking-wider flex items-center justify-between ${
                isDark ? 'border-cyan-500/20 text-cyan-200' : 'border-blue-100 text-blue-900'
              }`}>
                <span>{skill.name}</span>
                <span className={isDark ? 'text-fuchsia-400' : 'text-indigo-600'}>
                  {skill.category}
                </span>
              </div>
              
              {/* description */}
              <p className={`font-sans text-[9px] leading-relaxed mb-2 ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {skill.desc}
              </p>

              {/* Status metrics details */}
              <div className="flex justify-between items-center text-[8px] uppercase tracking-widest font-bold">
                <span className={isDark ? 'text-cyan-500/60' : 'text-blue-500/60'}>Orbit Node</span>
                <span className={isDark ? 'text-fuchsia-400' : 'text-indigo-500'}>NODE_0{index + 1}</span>
              </div>
            </div>
          </Html>
        )}
      </mesh>
    </group>
  );
}

// React useMemo Helper inside component requires React.useMemo or importing it.
// Let's add the imports safely:
import { useMemo } from 'react';
