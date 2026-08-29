'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, useScroll } from '@react-three/drei';
import { ARRIVAL_OFFSET } from './obstacles';

interface Props {
  drivingRef: React.MutableRefObject<boolean>;
  ember: string;
}

// Shown once arrived, before the visitor has touched a key; fades out the
// moment driving starts and stays gone (opacity written directly via ref,
// not React state — this runs every frame while visible, and the existing
// codebase already avoids re-rendering on continuous scroll-driven values
// for the same reason).
export default function DriveHint({ drivingRef, ember }: Props) {
  const scroll = useScroll();
  const ref = useRef<HTMLDivElement>(null);

  useFrame(() => {
    if (!ref.current) return;
    const arrived = scroll.offset >= ARRIVAL_OFFSET;
    const target = arrived && !drivingRef.current ? 1 : 0;
    const current = parseFloat(ref.current.style.opacity || '0');
    ref.current.style.opacity = String(current + (target - current) * 0.08);
  });

  return (
    <Html fullscreen style={{ pointerEvents: 'none' }}>
      <div
        ref={ref}
        style={{
          position: 'absolute',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: 0,
          fontFamily: "'Share Tech Mono', monospace",
          fontSize: 11,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#F3F5F7',
          background: 'rgba(12,13,16,0.82)',
          border: `1px solid ${ember}`,
          borderRadius: 3,
          padding: '8px 16px',
          whiteSpace: 'nowrap',
        }}
      >
        WASD or arrow keys — drive the rover around
      </div>
    </Html>
  );
}
