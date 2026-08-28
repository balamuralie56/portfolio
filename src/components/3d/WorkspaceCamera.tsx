'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export interface CameraFocus {
  position: THREE.Vector3;
  lookAt: THREE.Vector3;
}

interface Props {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reduced: boolean;
  coarse: boolean;
  focus: CameraFocus | null;
}

// Eye-level, slightly above desk height, wide enough to read desk +
// bookshelf + sofa without fisheye distortion (see Canvas fov in
// WorkspaceScene). This is the "idle" resting pose the room returns to.
const BASE_POS = new THREE.Vector3(0, 1.55, 3.6);
const BASE_LOOK = new THREE.Vector3(0, 0.95, -1.1);

// Cursor parallax + click-to-focus camera rig. Idle state drifts gently with
// the pointer (damped — this is inertia, not a snap-to-cursor follow).
// When `focus` is set (an object was clicked), it takes over smoothly, then
// hands control back once cleared.
export default function WorkspaceCamera({ pointer, reduced, coarse, focus }: Props) {
  const { camera } = useThree();
  const lookTarget = useRef(BASE_LOOK.clone());
  const desiredPos = useRef(new THREE.Vector3());
  const desiredLook = useRef(new THREE.Vector3());

  useFrame(() => {
    const parallax = coarse || reduced ? 0 : 1;
    const px = pointer.current.x * 0.3 * parallax;
    const py = -pointer.current.y * 0.16 * parallax;

    if (focus) {
      desiredPos.current.copy(focus.position);
      desiredLook.current.copy(focus.lookAt);
    } else {
      desiredPos.current.set(BASE_POS.x + px, BASE_POS.y + py, BASE_POS.z);
      desiredLook.current.set(BASE_LOOK.x + px * 0.35, BASE_LOOK.y + py * 0.35, BASE_LOOK.z);
    }

    if (reduced) {
      camera.position.copy(desiredPos.current);
      lookTarget.current.copy(desiredLook.current);
    } else {
      const speed = focus ? 0.055 : 0.045;
      camera.position.lerp(desiredPos.current, speed);
      lookTarget.current.lerp(desiredLook.current, speed);
    }
    camera.lookAt(lookTarget.current);
  });

  return null;
}

export { BASE_POS, BASE_LOOK };
