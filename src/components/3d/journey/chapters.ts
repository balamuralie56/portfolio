// Single source of truth for the scroll journey: camera waypoints + the
// caption shown at each. Every fact in every caption is pulled directly
// from src/utils/data.ts — nothing here is invented. The one deliberately
// soft beat is "origins": there's no verified 11th-grade-era material in
// the resume this project is built from, so that caption stays evocative
// rather than specific rather than fabricate a school, a year, or an event.
// Swap it out the moment there's real material for it.

export interface Waypoint {
  offset: number;
  pos: [number, number, number];
  look: [number, number, number];
}

// The last waypoint deliberately matches WorkspaceCamera's old BASE_POS/
// BASE_LOOK exactly — arrival hands off into the same room, same coordinate
// space, same hover-interactive objects, unchanged.
export const WAYPOINTS: Waypoint[] = [
  { offset: 0.0, pos: [0, 2.2, 22], look: [0, 2.0, 19] },
  { offset: 0.2, pos: [0, 1.9, 16], look: [0, 1.6, 13] },
  { offset: 0.4, pos: [0, 1.7, 10], look: [0, 1.3, 7] },
  { offset: 0.6, pos: [0, 1.65, 6], look: [0, 1.0, 3] },
  { offset: 0.78, pos: [0, 1.6, 4.3], look: [0, 0.95, -1.1] },
];

export interface Chapter {
  key: string;
  eyebrow: string;
  title: string;
  body: string;
  from: number;
  distance: number;
}

export const CHAPTERS: Chapter[] = [
  {
    key: 'origins',
    eyebrow: 'Chengalpattu, Tamil Nadu',
    title: 'Before any of this had a name',
    body: 'it was curiosity — the kind that takes things apart to see how they work.',
    from: 0.0,
    distance: 0.22,
  },
  {
    key: 'bsc',
    eyebrow: '2020 — 2023',
    title: 'B.Sc Computer Science',
    body: 'A.M. Jain College. Passed with 82%. The start of building instead of just studying.',
    from: 0.16,
    distance: 0.24,
  },
  {
    key: 'field',
    eyebrow: 'Along the way',
    title: 'Field work',
    body: 'An intrusion detection system at Crown Shield IT. Cancer Insight’s webpages, built during a RUSA internship. Full-stack work at 8Queens Technologies.',
    from: 0.36,
    distance: 0.24,
  },
  {
    key: 'msc',
    eyebrow: '2023 — 2025',
    title: 'M.Sc Information Technology',
    body: 'University of Madras. Passed with 75%. A Guinness World Record along the way, for a collaborative coding event with GUVI & AICTE — and 22+ workshops teaching what I’d learned to 300+ students.',
    from: 0.56,
    distance: 0.24,
  },
  {
    key: 'now',
    eyebrow: 'Jan 2026 — Present',
    title: 'Jr. Full-Stack AI Developer',
    body: 'Future Development Artificial Intelligence. This is the desk — hover to look around.',
    from: 0.76,
    distance: 0.24,
  },
];
