'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { WAYPOINTS } from './chapters';

interface Props {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reduced: boolean;
  coarse: boolean;
}

function sampleWaypoints(offset: number) {
  const points = WAYPOINTS;
  if (offset <= points[0].offset) return points[0];
  if (offset >= points[points.length - 1].offset) return points[points.length - 1];

  let a = points[0];
  let b = points[points.length - 1];
  for (let i = 0; i < points.length - 1; i++) {
    if (offset >= points[i].offset && offset <= points[i + 1].offset) {
      a = points[i];
      b = points[i + 1];
      break;
    }
  }
  const span = b.offset - a.offset || 1;
  const t = (offset - a.offset) / span;
  return {
    pos: [
      THREE.MathUtils.lerp(a.pos[0], b.pos[0], t),
      THREE.MathUtils.lerp(a.pos[1], b.pos[1], t),
      THREE.MathUtils.lerp(a.pos[2], b.pos[2], t),
    ] as [number, number, number],
    look: [
      THREE.MathUtils.lerp(a.look[0], b.look[0], t),
      THREE.MathUtils.lerp(a.look[1], b.look[1], t),
      THREE.MathUtils.lerp(a.look[2], b.look[2], t),
    ] as [number, number, number],
  };
}

// Drives the camera along WAYPOINTS as the visitor scrolls (via drei's
// useScroll — a real native-scroll region, not an intercepted wheel
// handler), then layers the same subtle pointer parallax the room already
// had on top once arrived. Reduced motion snaps straight to the sampled
// position each frame instead of damping toward it — still fully
// scroll-responsive, just no camera-eases-behind-the-scroll lag.
export default function JourneyCamera({ pointer, reduced, coarse }: Props) {
  const { camera } = useThree();
  const scroll = useScroll();
  const lookTarget = useRef(new THREE.Vector3(0, 2.0, 19));
  const desiredPos = useRef(new THREE.Vector3());
  const desiredLook = useRef(new THREE.Vector3());

  useFrame(() => {
    const sample = sampleWaypoints(scroll.offset);
    const parallax = coarse || reduced ? 0 : 1;
    const px = pointer.current.x * 0.22 * parallax;
    const py = -pointer.current.y * 0.12 * parallax;

    desiredPos.current.set(sample.pos[0] + px, sample.pos[1] + py, sample.pos[2]);
    desiredLook.current.set(sample.look[0] + px * 0.3, sample.look[1] + py * 0.3, sample.look[2]);

    if (reduced) {
      camera.position.copy(desiredPos.current);
      lookTarget.current.copy(desiredLook.current);
    } else {
      camera.position.lerp(desiredPos.current, 0.09);
      lookTarget.current.lerp(desiredLook.current, 0.09);
    }
    camera.lookAt(lookTarget.current);
  });

  return null;
}
