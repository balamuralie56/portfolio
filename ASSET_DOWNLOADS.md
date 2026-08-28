# 3D Asset Downloads Needed

This project's workspace scene currently renders with **procedural placeholder
geometry** for every furniture/electronics item (simple boxes and primitives
built directly in `src/components/3d/`) instead of real GLB models.

## Why: what was actually attempted

Real, licensed sources were researched and verified — the blocker is
mechanical, not a licensing gap:

- **Poly Haven** (`polyhaven.com/models`) was checked directly. All CC0, but
  its model catalog is thin for this use case — sofas and office chairs
  exist (e.g. [Sofa 03](https://polyhaven.com/a/sofa_03),
  [Modern Arm Chair 01](https://polyhaven.com/a/modern_arm_chair_01)), but no
  desk, bookshelf, monitor, laptop, or phone in a matching style.
- **Kenney's "Furniture Kit"** (`kenney.nl/assets/furniture-kit`) was found
  and verified as the right fit — see the table below. It's a single
  internally-consistent CC0 pack covering nearly the entire list (desk,
  desk chair, sofa, bookcase, lamp, plants, computer screen, laptop). The
  page's own "Download" control is a JS-triggered action (no static file URL
  in the page HTML), which couldn't be reliably scripted from this
  environment. A curl fetch of the page returned no `.zip` link, and
  triggering the button via the sandboxed browser tool produced no captured
  network request for the file itself — likely a native-navigation download
  this tooling doesn't expose an accessible save location for.
- **poly.pizza** mirrors this same Kenney pack as ready-made GLB files
  (`poly.pizza/bundle/Furniture-Kit-NoG1sEUD1z`), which would have been the
  easiest path (GLB, no format conversion needed) — but its download
  mechanism sits behind a Cloudflare bot-challenge (`/cdn-cgi/challenge-platform/...`,
  a `gettoken` endpoint). Scripting past that is bot-detection circumvention,
  which is out of bounds regardless of the source being CC0.

**No URLs were invented.** Everything below is a real, checked page.

## To unblock: manual download (2 minutes)

1. Open **https://kenney.nl/assets/furniture-kit** in a normal browser.
2. Click **Download** (grabs `kenney_furniture-kit.zip`, ~140 files, CC0, no
   attribution required).
3. Extract it — the GLTF/FBX source models are in the `Models/` subfolder.
4. Convert/copy the pieces below into `public/models/...` as GLB (if the
   extracted format is GLTF or FBX rather than GLB, `npx gltf-pipeline` or
   Blender's glTF export can convert to a single-file `.glb`).

| Needed | Source model (inside the pack) | Place at |
|---|---|---|
| Desk | `desk.gltf` (or `deskCorner`) | `public/models/furniture/desk.glb` |
| Office chair | `chairDesk.gltf` | `public/models/furniture/chair.glb` |
| Sofa | `loungeSofa.gltf` (or `loungeDesignSofa`) | `public/models/furniture/sofa.glb` |
| Bookshelf | `bookcaseOpen.gltf` (or `bookcaseClosed`) | `public/models/furniture/bookshelf.glb` |
| Floor/table lamp | `lampRoundFloor.gltf` or `lampSquareTable.gltf` | `public/models/decor/lamp.glb` |
| Plant (×2, reused) | `plantSmall1.gltf`, `plantSmall3.gltf` | `public/models/plants/plant-a.glb`, `plant-b.glb` |
| Books (reused/instanced) | any `books_*.gltf` variant | `public/models/decor/books.glb` |
| Computer monitor | `computerScreen.gltf` | `public/models/electronics/monitor.glb` |
| Laptop | `laptop.gltf` | `public/models/electronics/laptop.glb` |

That's 9 assets, comfortably inside the 8–20 target, all one consistent
low-poly stylized look (matches "original," not a photoreal match to any
reference).

**Phone**: not in the Kenney Furniture Kit. Left as a procedural placeholder
(a rounded box) — it's a minor object and not worth pulling in a second
source/style just for it, unless you'd like one sourced specifically.

## License record

| Asset pack | Source | License | Attribution required | Modification allowed |
|---|---|---|---|---|
| Furniture Kit (Kenney) | https://kenney.nl/assets/furniture-kit | CC0 (Public Domain) | No | Yes |

Confirmed directly on the asset's own page (license badge links to
`creativecommons.org/publicdomain/zero/1.0/`). Mirrors this exact license
via poly.pizza — see `public/ASSET_LICENSES.md` for the format to fill in
once the real files are in place.

## After importing the real GLBs

Each placeholder component in `src/components/3d/` (`Desk.tsx`, `Chair.tsx`,
`Bookshelf.tsx`, `Sofa.tsx`, `Monitor.tsx`, `Laptop.tsx`, `Plant.tsx`) has a
comment marking exactly where a `useGLTF('/models/.../x.glb')` call replaces
the placeholder `<mesh>`. No other files need to change — the scene graph,
positions, and interaction wiring are already built around these components.
