# Portfolio Redesign — Project Report

**Project:** balamurali-portfolio (Next.js + React Three Fiber)
**Owner:** Balamurali E — applying as Jr. Full-Stack AI Developer
**Report date:** 2026-08-29

This document records what the site was, what was found wrong with it, what was
changed, the current state of the codebase, and what's still open.

---

## 1. Starting point

The original site was a single-page, 10-section, scroll-hijacked experience:
Hero → About → Skills Galaxy → Experience Corridor → Project Universe →
Achievements → Certifications → Research → Recruiter Mode → AI Chatbot, all
layered over a persistent full-screen React Three Fiber canvas (particles,
a 3D skills galaxy, a 3D experience corridor), a cyberpunk HUD overlay, Lenis
smooth-scroll, GSAP, Framer Motion, and a custom Web Audio click/hover sound
engine.

It was not a git repository — no version history existed before this work.

## 2. Audit findings

A full read of `src/`, `package.json`, `public/images/`, and the resume PDF
on file turned up the following, ranked by how much each would cost with a
recruiter:

| Severity | Finding |
|---|---|
| Critical | Site branding said "Deep Learning Engineer, Technical Lead" everywhere; the actual resume says "Jr. AI Developer" / "Jr. Full-Stack AI Developer." Dates didn't match either (site: "2024–Present," resume: "Jan 2026–Present"). |
| Critical | The three core calls-to-action were all non-functional: **Download Resume** ran `alert("...")` with no PDF anywhere in the project; the **contact form** faked a "sending…" state via `setTimeout` and always reported success; the **QR code** was a decorative, non-functional SVG pattern. |
| High | ForgeAI's project screenshot (`mint_terminal.png`) was actually a TradingView-style silver CFD chart, in a browser with visible tabs for an unrelated marketing site and a Twilio pricing search, on a domain called `millionairevault.in` — nothing to do with ForgeAI. CitySense's screenshot was generic Storyblocks stock footage of a "Pole Detection Sandbox," not the described helmet/pothole detector. |
| High | The site listed 10 "shipped" projects with fake `.demo` links and unverified GitHub URLs. The resume backs 3. |
| Medium | No persistent navigation; the HUD's "SECTOR_GRID" section list looked clickable but had no `onClick`. Reaching Projects or Contact meant scrolling through the full 10-section sequence. |
| Medium | Global `select-none` on `<body>` blocked copy-pasting contact info by default; most labels ran 8–10px on cyan-on-black. |
| Medium | Full-screen WebGL canvas, particle system, GSAP (0 imports anywhere in `src/`), Lenis, Framer Motion, and a custom audio engine all mounted for the entire session regardless of section. No `prefers-reduced-motion` guard. |
| Low | `.old-vite/` (a complete duplicate of a prior Vite version of the site, including its own `package.json`/lockfile), a stale `dist/` build, and 17 of 30 files in `public/images/` were byte-identical duplicates (confirmed by hash) — mostly the same WhatsApp-exported photos saved twice under different names. |

Full detail: see the "Portfolio Diagnostic" artifact produced during this
engagement (linked in chat history).

## 3. Design research and direction

Two reference portfolios were pulled for grounding, representing opposite
poles of the developer-portfolio spectrum:

- **[Brittany Chiang](https://brittanychiang.com)** — minimal, single-column,
  Inter typeface, dark theme, anchor-link navigation, one deliberate playful
  easter egg (a "spinning TARDIS"). Content-first, fast to scan.
- **[Bruno Simon](https://bruno-simon.com)** — a fully explorable 3D world
  where visitors drive a car to discover content, built by a WebGL specialist
  as a literal skill demonstration (physics engine, achievements, custom
  music, months of production).

The original site was closer to Bruno Simon's *scale* of production without
his *focus* — 3D on every section, no way to skip it, for a candidate whose
actual job target has nothing to do with 3D specialization. The redesign
targets the middle: Chiang's clarity and restraint, with one well-crafted 3D
moment rather than a full spectacle.

### Visual identity — "Field Dossier"

An original sci-fi/HUD aesthetic (Transformers-*inspired* mood — hazard
orange, arc blue, hex-plate motifs — with no copyrighted logos, stills, or
character likenesses reproduced).

- **Type:** Orbitron (display/headings), Titillium Web (body), Share Tech
  Mono (data/labels/mono accents).
- **Color tokens** (light default via `:root`, dark via `html.dark`):
  `--bg`, `--surface`, `--surface-2`, `--line`, `--ink`, `--ink-dim`,
  `--ember` / `--ember-2` (primary accent), `--arc` (secondary accent).
- **Motifs:** a hex-plate "BE" badge mark (echoed in 3D as a hexagonal-prism
  emblem), corner-bracket framing on cards, mono-uppercase eyebrows/labels.

## 4. Content calibration

Everything on the site was brought in line with what's actually defensible
in an interview, not just what sounds impressive:

- **Title:** "Jr. Full-Stack AI Developer" everywhere (was "Deep Learning
  Engineer, Technical Lead, Full-Stack AI Developer").
- **Skills scope:** Machine Learning, Deep Learning, Computer Vision only.
  "Edge AI" as a labeled category was dropped; the underlying NVIDIA
  Jetson/TensorRT work is still described, folded into "Computer Vision
  Deployment" instead of branded as a separate edge-AI specialty.
- **AI-assisted engineering** promoted to its own named skill category
  ("AI-Assisted Engineering" — LLM-paired coding & debugging, rapid
  prototyping, AI-accelerated troubleshooting) rather than downplayed or
  hidden — a real, current practice, stated plainly.
- **GitHub handle corrected:** `github.com/Balamurali2002` (wrong — either a
  stale or unrelated account) → `github.com/balamuralie56` (verified from the
  user's actual repo list).
- **Projects trimmed to three, each with an honest status:**
  - **CitySense** — YOLOv11 street-level detection prototype. *Not on
    GitHub; presented as a prototype build, not backed by a repo link.*
  - **EOMS** — exam operations console (admin, check-in, seat-grid, undo).
    *Private repo, available on request* — this one is genuinely on GitHub.
  - **ALPR** — license-plate recognition. *Not on GitHub; same honest
    "prototype" framing as CitySense.*
  - (Rezoe was dropped entirely — the user did not select it as a project
    they could confidently discuss in depth.)
- **"In the Lab" (ongoing, not claimed as finished):** ForgeAI (private),
  BrightPath HRM (private, active), FDAIAOS (private, active), Bacteria
  Classification (ongoing, from resume), SVV Estates (private — family
  business web platform), DSA-Bootcamp-JS (**public** — the only one that
  actually links out).
- **Achievements** re-grounded in the resume's own language: mentorship of
  10 interns at FDAI, 22+ workshops to 300+ students, Guinness World Record
  **event participant** (not "record holder") — dropped an invented "15+
  projects" metric that no longer matched the trimmed project list.

## 5. Implementation

### Components

| Removed | Replaced by / reason |
|---|---|
| `HUD.tsx`, `ParticleCore.tsx`, `SkillsGalaxy.tsx`, `SkillsOverlay.tsx`, `ExperienceCorridor.tsx`, `ThreeScene.tsx` | Global always-on 3D/HUD layer removed entirely |
| `Recruiter.tsx` | → `Contact.tsx` |
| `AIChatbot.tsx` | Dropped — a hardcoded keyword-matched FAQ mislabeled as an "AI clone"; not rebuilt |
| `Certifications.tsx` | Merged into `Achievements.tsx` |
| `src/utils/audio.ts` | Click/hover/success sound effects dropped |

| New | Purpose |
|---|---|
| `Nav.tsx` | Sticky nav, anchor links to every section, theme toggle |
| `Scene3D.tsx` | The hero's 3D scene (see below) |
| `Skills.tsx` | Arsenal grid (replaces SkillsOverlay/SkillsGalaxy) |
| `Contact.tsx` | Real contact form (see below) |

`About.tsx`, `Achievements.tsx`, `Experience.tsx`, `Hero.tsx`, `Projects.tsx`,
`Research.tsx` were rewritten in place; `ThemeProvider.tsx` was kept as-is
(its `.dark`/`.light` class + `localStorage` mechanism was sound).

### 3D scene (`Scene3D.tsx`)

Fully procedural — no imported model files, no external asset downloads.
Built with `@react-three/fiber` + `@react-three/drei` (both already
dependencies):

- A `MeshDistortMaterial` icosahedron core (organic, animated distortion)
- 6 orbiting satellite nodes (`Float` for independent bobbing), each
  connected to the core by a thin line — a network/constellation look
- An outer hexagonal-prism wireframe plate, tying back to the 2D "BE" badge
  mark used in the nav and hero
- Two layered `Sparkles` particle fields
- Filmic tone mapping (`THREE.ACESFilmicToneMapping`) on the renderer
- Pointer-based parallax (camera-independent, tracks `pointermove`)
- Mounted **only** in the Hero section (not globally across the page), and
  fully respects `prefers-reduced-motion` — animation, distortion, and
  particles all disable cleanly for that setting

This was upgraded once already in this engagement after initial feedback
that a first pass (a static wireframe hex-plate + octahedron) read as
"boring." Further direction — specifically whether "3D avatars" means a
literal character model versus a further evolution of this abstract scene —
is an open item; see §7.

### Images

- Two verified real photos in use: `B.sc Graduvation.jpeg` (graduation,
  About section) and `GUVI Class at SRM.jpeg` (workshop, About section),
  both with a duotone treatment (grayscale + gradient `mix-blend-mode:
  color` overlay) consistent with the Field Dossier identity.
- The two screenshots identified as mismatched/compromised
  (`mint_terminal.png`, `citysense.png`) are **not referenced** anywhere in
  the new code. Project cards use original inline-SVG diagrams instead
  (a detection HUD for CitySense, a seat-grid diagram for EOMS, a plate-scan
  diagram for ALPR) — built from primitive shapes, not imported art.
- 8 further real photos exist in `public/images/` but are not yet used —
  their actual event/context needs confirmation before captioning; see §7.

### Contact form

Rebuilt to be genuinely functional rather than faked: on submit, it
constructs a `mailto:` link with the subject and body pre-filled from the
form fields and navigates to it, opening the visitor's own email client.
No backend, no fake "sending…" animation, no false success state. The UI
says exactly what will happen.

### Dependencies

Removed (confirmed unused after the rewrite): `gsap`, `lenis`,
`framer-motion`. Kept: `@react-three/fiber`, `@react-three/drei`, `three`
(now doing real work in `Scene3D.tsx`), `canvas-confetti` (kept for one
deliberate easter egg — a confetti burst on clicking the Guinness World
Record achievement card, echoing the "one small personality moment"
principle from the design research).

### Housekeeping

- Removed `.old-vite/` (full duplicate legacy app), `dist/` (stale build),
  and a leftover `.vite/` cache directory.
- Removed the orphaned root-level `images/` folder (duplicate of
  `public/images/`, not served by Next.js).
- Deleted 16 confirmed byte-identical duplicate files from
  `public/images/` (30 → 14 files).
- Initialized git (the project had no version control before this work) and
  committed in discrete, reviewable steps.

## 6. Current stack

- **Framework:** Next.js 16.2.10 (Turbopack), React 19.2.4
- **3D:** three ^0.185.1, @react-three/fiber ^9.6.1, @react-three/drei ^10.7.7
- **Styling:** Tailwind CSS ^4, CSS custom properties for theming
- **Icons:** lucide-react
- **Misc:** canvas-confetti (one easter egg)
- **Fonts:** Orbitron, Titillium Web, Share Tech Mono (Google Fonts)

## 7. Open items — need input before proceeding

1. **Resume PDF.** `Hero.tsx`'s "Download Resume" button points to
   `/resume.pdf`, which does not exist yet. The exact file read earlier in
   this engagement (`BALAMURALI E 22-08.pdf`) is no longer at its original
   path; only older dated versions remain locally. Which one is current (or
   send a fresh export) and it'll be wired in for a fully working download.
2. **Photo identification.** 8 real photos in `public/images/` are not yet
   used in the site. Their filenames don't reliably describe their content
   (confirmed by inspection — several files named "micro bio ..." actually
   show a Maritime Studies or general Engineering department banner, not
   microbiology). Specific questions on what each shows were sent in chat;
   answers are needed before writing accurate captions.
3. **3D scene direction.** The scene was upgraded once (see §5) after
   feedback that the first version was "boring." Follow-up feedback asked
   for "real 3d avatars," but the clarifying question on what that means
   (a literal character model requiring a licensed external download vs.
   a further evolution of the current abstract scene) hasn't been answered
   yet.

## 8. Verification performed

- `npm run build` — clean, zero errors, at every stage of this work
- `npm run lint` (ESLint via `eslint-config-next`, including the
  `react-hooks` plugin) — clean, zero errors (one real issue caught and
  fixed: a `setState`-in-effect on mount in `Scene3D.tsx`, corrected to a
  lazy `useState` initializer)
- Dev server runtime console — no errors; a single `THREE.WebGLRenderer:
  Context Lost` observed during heavy iterative hot-reloading was confirmed
  transient (clean `webgl2` context on a fresh page load) and tied to the
  test environment's backgrounded/non-composited browser tab, not the code
  — this sandbox's screenshot tool cannot composite frames for pixel-level
  visual verification, so structural checks (DOM content, network requests,
  console output, accessibility tree) were used in its place throughout

## 9. Git history

```
484d587  Richer procedural hero scene: distorted core, orbiting satellites
6853c45  Untrack .claude/scheduled_tasks.lock
e53c094  Fix react-hooks lint error in Scene3D reduced-motion hook
858a501  Redesign portfolio: honest content, lighter 3D, real design system
621e6ff  Baseline snapshot before redesign
```

`621e6ff` is a full snapshot of the site exactly as it was found, before any
change in this engagement — a revert point if any of the above needs to be
walked back.
