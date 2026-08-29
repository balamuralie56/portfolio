'use client';

import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface Props {
  reduced: boolean;
  drivingRef: React.MutableRefObject<boolean>;
  roverPosRef: React.MutableRefObject<THREE.Vector3>;
  roverHeadingRef: React.MutableRefObject<number>;
}

const CHASE_DISTANCE = 2.6;
const CHASE_HEIGHT = 1.7;

// Third-person chase camera, active only once `drivingRef` is true (set by
// VehicleRig on first input) — until then JourneyCamera owns the camera
// exclusively, so there's never a frame where two controllers fight over
// camera.position.
export default function VehicleCamera({ reduced, drivingRef, roverPosRef, roverHeadingRef }: Props) {
  const { camera } = useThree();
  const lookTarget = useRef(new THREE.Vector3());
  const desiredPos = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!drivingRef.current) return;

    const h = roverHeadingRef.current;
    desiredPos.current.set(
      roverPosRef.current.x - Math.sin(h) * CHASE_DISTANCE,
      CHASE_HEIGHT,
      roverPosRef.current.z + Math.cos(h) * CHASE_DISTANCE
    );
    lookTarget.current.set(roverPosRef.current.x, 0.35, roverPosRef.current.z);

    if (reduced) {
      camera.position.copy(desiredPos.current);
    } else {
      camera.position.lerp(desiredPos.current, 0.06);
    }
    camera.lookAt(lookTarget.current);
  });

  return null;
}
