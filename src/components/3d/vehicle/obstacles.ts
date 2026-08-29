// Shared between the vehicle controller and the journey/vehicle camera
// handoff — kept in one place so the two systems can't drift apart.

// Matches the last journey waypoint's offset (chapters.ts) — the point at
// which the camera has fully arrived at the room and holds still.
export const ARRIVAL_OFFSET = 0.78;

export interface Obstacle {
  x: number;
  z: number;
  r: number;
}

// Rough circular footprints of the room's furniture clusters, for simple
// push-back collision — not real physics, just enough that the rover can't
// drive through the desk/bookshelf/sofa. Coordinates match their placement
// in WorkspaceScene.
export const OBSTACLES: Obstacle[] = [
  { x: 0, z: -1, r: 1.35 }, // desk cluster
  { x: -2.75, z: -1.75, r: 0.95 }, // bookshelf
  { x: 2.1, z: -0.4, r: 1.5 }, // sofa + coffee table
];

export const ROOM_BOUNDS = { minX: -6, maxX: 6, minZ: -2.7, maxZ: 4.6 };

export const ROVER_START: [number, number, number] = [1.3, 0, 1.6];
