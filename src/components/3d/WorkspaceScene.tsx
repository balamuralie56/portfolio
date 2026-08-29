'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ScrollControls, Scroll } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../ThemeProvider';
import { useReducedMotion, useIsCoarsePointer, usePointer } from './hooks';
import { skillGroups, experience, projects, serviceLog, achievements, researchInterests, journeyPhotos } from '../../utils/data';
import WorkspaceLighting from './WorkspaceLighting';
import WorkspaceLoader from './WorkspaceLoader';
import Room from './Room';
import Desk from './Desk';
import Chair from './Chair';
import Bookshelf from './Bookshelf';
import Sofa from './Sofa';
import CoffeeTable from './CoffeeTable';
import Plant from './Plant';
import Lamp from './Lamp';
import Monitor from './Monitor';
import Laptop from './Laptop';
import Camera from './Camera';
import PhotoFrame from './PhotoFrame';
import AchievementPlaque from './AchievementPlaque';
import ResearchNotebook from './ResearchNotebook';
import InteractiveObject from './InteractiveObject';
import JourneyCamera from './journey/JourneyCamera';
import ChapterMarkers from './journey/ChapterMarkers';
import ChapterCaptions from './journey/ChapterCaptions';
import AmbientAudio from './journey/AmbientAudio';

const PALETTE = {
  dark: { ember: '#FF7A1A', arc: '#40C6F0', wall: '#3a342b' },
  light: { ember: '#D2600F', arc: '#0E7FA6', wall: '#ded4c0' },
};

const aiSkills = skillGroups.find((g) => g.title === 'AI & ML')?.items ?? [];
const aiAssistedSkills = skillGroups.find((g) => g.title === 'AI-Assisted Engineering')?.items ?? [];
const skillCategories = skillGroups.map((g) => g.title);
const projectLines = projects.map((p) => p.title.split('—')[0].trim());
const journeyLines = experience.bullets.map((b) => b.title);
const timelineLines = serviceLog.map((s) => `${s.when}: ${s.title}`);
const achievementLines = achievements.map((a) => `${a.metric} — ${a.title}`);
const researchLines = researchInterests.map((r) => r.name);

function RoomContents({ palette, reduced }: { palette: typeof PALETTE.dark; reduced: boolean }) {
  return (
    <>
      <Room wallColor={palette.wall} />

      {/* Desk cluster */}
      <group position={[0, 0, -1]}>
        <Desk />

        <InteractiveObject
          position={[-0.4, 0.788, -0.18]}
          title="Project Lab"
          lines={projectLines}
          panelOffset={[0, 0.42, 0]}
          accent={palette.arc}
          reduced={reduced}
        >
          {(hovered: boolean) => <Monitor arc={palette.arc} hovered={hovered} />}
        </InteractiveObject>

        <InteractiveObject
          position={[0.42, 0.788, 0.08]}
          rotation={[0, -0.3, 0]}
          title="Full-Stack & AI-Assisted Eng."
          lines={[...aiAssistedSkills, 'Python · SQL']}
          panelOffset={[0, 0.3, 0]}
          accent={palette.arc}
          reduced={reduced}
        >
          <Laptop ember={palette.ember} />
        </InteractiveObject>

        <InteractiveObject
          position={[0.78, 0.795, -0.15]}
          rotation={[0, 0.5, 0]}
          title="AI / Computer Vision"
          lines={aiSkills}
          panelOffset={[0, 0.28, 0]}
          accent={palette.ember}
          reduced={reduced}
        >
          <Camera />
        </InteractiveObject>

        <group position={[-0.85, 0.788, -0.28]}>
          <Lamp />
        </group>

        <InteractiveObject
          position={[0.05, 0.792, 0.28]}
          title="Research"
          lines={researchLines}
          panelOffset={[0, 0.24, 0]}
          accent={palette.arc}
          reduced={reduced}
        >
          {(hovered: boolean) => <ResearchNotebook arc={palette.arc} hovered={hovered} />}
        </InteractiveObject>

        <group position={[0, 0, 0.55]}>
          <Chair />
        </group>
      </group>

      {/* Bookshelf — stage left */}
      <InteractiveObject
        position={[-2.75, 0, -1.75]}
        rotation={[0, 0.3, 0]}
        title="Systems Arsenal"
        lines={skillCategories}
        panelOffset={[0, 1.5, 0.3]}
        accent={palette.arc}
        reduced={reduced}
      >
        <Bookshelf />
      </InteractiveObject>
      <group position={[-1.9, 0, -0.55]}>
        <Plant scale={0.9} />
      </group>

      {/* Sofa + coffee table — stage right */}
      <InteractiveObject
        position={[2.55, 0, -0.55]}
        rotation={[0, -0.6, 0]}
        title="Professional Journey"
        lines={journeyLines}
        panelOffset={[0, 1.1, 0.2]}
        accent={palette.ember}
        reduced={reduced}
      >
        <Sofa />
      </InteractiveObject>
      <InteractiveObject
        position={[1.65, 0, 0.55]}
        rotation={[0, -0.6, 0]}
        title="Experience Timeline"
        lines={timelineLines}
        panelOffset={[0, 0.55, 0]}
        accent={palette.ember}
        reduced={reduced}
      >
        <CoffeeTable />
      </InteractiveObject>
      <group position={[3.2, 0, -1.75]}>
        <Plant scale={1.05} />
      </group>

      {/* Wall gallery — only the two verified real photos */}
      {journeyPhotos.map((p, i) => (
        <PhotoFrame
          key={p.src}
          src={encodeURI(p.src)}
          caption={p.caption}
          position={[-1.0 + i * 0.8, 1.95, -2.94]}
          reduced={reduced}
        />
      ))}

      {/* Achievement plaque — on the wall shelf */}
      <InteractiveObject
        position={[1.15, 2.63, -2.86]}
        title="Achievements"
        lines={achievementLines}
        panelOffset={[0, 0.22, 0]}
        accent={palette.ember}
        reduced={reduced}
      >
        <AchievementPlaque ember={palette.ember} />
      </InteractiveObject>
    </>
  );
}

interface WorkspaceSceneProps {
  coarse: boolean;
}

export default function WorkspaceScene({ coarse }: WorkspaceSceneProps) {
  const { theme } = useTheme();
  const reduced = useReducedMotion();
  const isCoarse = useIsCoarsePointer() || coarse;
  const isDark = theme === 'dark';
  const palette = isDark ? PALETTE.dark : PALETTE.light;
  const pointer = usePointer();

  return (
    <div className="absolute inset-0">
      <WorkspaceLoader />
      <Canvas
        shadows={!isCoarse}
        camera={{ position: [0, 2.2, 22], fov: 46 }}
        dpr={isCoarse ? [1, 1.2] : [1, 1.6]}
        gl={{ antialias: true, alpha: false, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.15 }}
        style={{ position: 'absolute', inset: 0 }}
      >
        <color attach="background" args={[isDark ? '#0A0B0E' : '#F5F3EE']} />
        <fog attach="fog" args={[isDark ? '#0A0B0E' : '#F5F3EE', 7, 26]} />
        <WorkspaceLighting ember={palette.ember} arc={palette.arc} />
        <ScrollControls pages={5} damping={reduced ? 0 : 0.2}>
          <JourneyCamera pointer={pointer} reduced={reduced} coarse={isCoarse} />
          <Suspense fallback={null}>
            <RoomContents palette={palette} reduced={reduced} />
            <ChapterMarkers ember={palette.ember} arc={palette.arc} reduced={reduced} />
          </Suspense>
          <Scroll html>
            <ChapterCaptions ember={palette.ember} />
          </Scroll>
        </ScrollControls>
      </Canvas>
      <div className="absolute bottom-5 right-5 pointer-events-none">
        <AmbientAudio />
      </div>
    </div>
  );
}
