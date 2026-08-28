'use client';

import React from 'react';
import { useProgress } from '@react-three/drei';

// Sits as a sibling of <Canvas>, not inside it — useProgress is a global
// store, so this works purely from DOM/CSS while assets stream in.
export default function WorkspaceLoader() {
  const { active, progress } = useProgress();

  if (!active) return null;

  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 pointer-events-none"
      style={{ background: 'var(--bg)' }}
    >
      <div className="font-mono text-[11px] tracking-[0.2em] uppercase" style={{ color: 'var(--ember)' }}>
        Entering Workspace
      </div>
      <div className="font-display font-bold text-sm" style={{ color: 'var(--ink)' }}>
        Loading environment…
      </div>
      <div className="w-48 h-1 rounded-full overflow-hidden" style={{ background: 'var(--line)' }}>
        <div
          className="h-full rounded-full"
          style={{ width: `${Math.round(progress)}%`, background: 'var(--ember)', transition: 'width 0.2s ease' }}
        />
      </div>
      <div className="font-mono text-[10px]" style={{ color: 'var(--ink-dim)' }}>{Math.round(progress)}%</div>
    </div>
  );
}
