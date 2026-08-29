'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useKeyboardControls, useScroll } from '@react-three/drei';
import * as THREE from 'three';
import Rover from './Rover';
import { ARRIVAL_OFFSET, OBSTACLES, ROOM_BOUNDS, ROVER_START } from './obstacles';

interface Props {
  ember: string;
  arc: string;
  reduced: boolean;
  drivingRef: React.MutableRefObject<boolean>;
  roverPosRef: React.MutableRefObject<THREE.Vector3>;
  roverHeadingRef: React.MutableRefObject<number>;
}

const ACCEL = 3.4;
const MAX_SPEED = 2.4;
const FRICTION = 3.6;
const TURN_SPEED = 2.6;

// Kinematic, not physics-engine — a real Rapier/Cannon body would be
// overkill (and a new dependency) for "roll around a small room and don't
// clip through furniture." Acceleration/friction/turn give it a believable
// weighted feel; OBSTACLES are simple push-back circles, not mesh collision.
export default function VehicleRig({ ember, arc, reduced, drivingRef, roverPosRef, roverHeadingRef }: Props) {
  const group = useRef<THREE.Group>(null);
  const velocity = useRef(0);
  const scroll = useScroll();
  const [, getKeys] = useKeyboardControls();

  useFrame((_, rawDelta) => {
    if (scroll.offset < ARRIVAL_OFFSET) return; // not arrived yet — rover waits, parked

    const delta = Math.min(rawDelta, 0.05);
    const { forward, back, left, right } = getKeys() as {
      forward: boolean;
      back: boolean;
      left: boolean;
      right: boolean;
    };

    if (forward || back || left || right) drivingRef.current = true;
    if (!drivingRef.current) return;

    let accel = 0;
    if (forward) accel += ACCEL;
    if (back) accel -= ACCEL * 0.65;
    velocity.current += accel * delta;
    velocity.current -= velocity.current * Math.min(1, FRICTION * delta);
    velocity.current = THREE.MathUtils.clamp(velocity.current, -MAX_SPEED * 0.5, MAX_SPEED);

    const turnInput = (left ? 1 : 0) - (right ? 1 : 0);
    const speedFactor = THREE.MathUtils.clamp(Math.abs(velocity.current) / MAX_SPEED, 0.25, 1);
    const dir = velocity.current >= 0 ? 1 : -1;
    roverHeadingRef.current += turnInput * TURN_SPEED * delta * speedFactor * dir;

    let nx = roverPosRef.current.x + Math.sin(roverHeadingRef.current) * velocity.current * delta;
    let nz = roverPosRef.current.z - Math.cos(roverHeadingRef.current) * velocity.current * delta;

    nx = THREE.MathUtils.clamp(nx, ROOM_BOUNDS.minX, ROOM_BOUNDS.maxX);
    nz = THREE.MathUtils.clamp(nz, ROOM_BOUNDS.minZ, ROOM_BOUNDS.maxZ);

    for (const obs of OBSTACLES) {
      const ddx = nx - obs.x;
      const ddz = nz - obs.z;
      const dist = Math.hypot(ddx, ddz) || 0.0001;
      if (dist < obs.r) {
        const push = obs.r - dist;
        nx += (ddx / dist) * push;
        nz += (ddz / dist) * push;
        velocity.current *= 0.55;
      }
    }

    roverPosRef.current.set(nx, 0, nz);

    if (group.current) {
      if (reduced) {
        group.current.position.copy(roverPosRef.current);
        group.current.rotation.y = roverHeadingRef.current;
      } else {
        group.current.position.lerp(roverPosRef.current, 0.4);
        group.current.rotation.y = THREE.MathUtils.lerp(
          group.current.rotation.y,
          roverHeadingRef.current,
          0.3
        );
      }
    }
  });

  return (
    <group ref={group} position={ROVER_START}>
      <Rover ember={ember} arc={arc} />
    </group>
  );
}
