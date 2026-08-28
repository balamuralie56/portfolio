'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  pointer: React.MutableRefObject<{ x: number; y: number }>;
  reduced: boolean;
  coarse: boolean;
}

// Eye-level (~1.6m), slightly above desk height, wide enough to read desk +
// bookshelf + sofa without fisheye distortion (see Canvas fov in
// WorkspaceScene). Since objects no longer trigger navigation, this only
// ever does one thing: a gentle, heavily-damped cursor parallax. No
// per-object "fly to" targets, no sudden moves — damping is intentionally
// slow so nothing about it reads as aggressive.
const BASE_POS = new THREE.Vector3(0, 1.6, 4.3);
const BASE_LOOK = new THREE.Vector3(0, 0.95, -1.1);

export default function WorkspaceCamera({ pointer, reduced, coarse }: Props) {
  const { camera } = useThree();
  const lookTarget = useRef(BASE_LOOK.clone());
  const desiredPos = useRef(new THREE.Vector3());
  const desiredLook = useRef(new THREE.Vector3());

  useFrame(() => {
    const parallax = coarse || reduced ? 0 : 1;
    const px = pointer.current.x * 0.26 * parallax;
    const py = -pointer.current.y * 0.14 * parallax;

    desiredPos.current.set(BASE_POS.x + px, BASE_POS.y + py, BASE_POS.z);
    desiredLook.current.set(BASE_LOOK.x + px * 0.3, BASE_LOOK.y + py * 0.3, BASE_LOOK.z);

    if (reduced) {
      camera.position.copy(desiredPos.current);
      lookTarget.current.copy(desiredLook.current);
    } else {
      camera.position.lerp(desiredPos.current, 0.035);
      lookTarget.current.lerp(desiredLook.current, 0.035);
    }
    camera.lookAt(lookTarget.current);
  });

  return null;
}

export { BASE_POS, BASE_LOOK };
