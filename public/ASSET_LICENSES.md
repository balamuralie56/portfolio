# 3D Asset License Record

All assets below were downloaded via Poly Haven's public files API
(`api.polyhaven.com` / `dl.polyhaven.org`) — a documented, unauthenticated
endpoint separate from the polyhaven.com website's UI, which is what made
scripted download possible this time (see `ASSET_DOWNLOADS.md` at the
project root for what was tried before this and why it didn't work).

Every entry below is **CC0 (Public Domain)** — confirmed on each asset's own
Poly Haven page — no attribution required, modification allowed,
commercial use allowed.

| Asset | Poly Haven slug | Used as | Local path |
|---|---|---|---|
| Metal Office Desk | `metal_office_desk` | Desk | `public/models/furniture/desk/` |
| Modern Arm Chair 01 | `modern_arm_chair_01` | Desk chair | `public/models/furniture/chair/` |
| Sofa 02 | `sofa_02` | Sofa | `public/models/furniture/sofa/` |
| Shelf 01 | `Shelf_01` | Bookshelf | `public/models/furniture/bookshelf/` |
| Modern Coffee Table 01 | `modern_coffee_table_01` | Coffee table | `public/models/furniture/coffee-table/` |
| Potted Plant 02 | `potted_plant_02` | Plants (×2, reused/cloned at different scale/position) | `public/models/plants/plant-b/` |
| Desk Lamp Arm 01 | `desk_lamp_arm_01` | Desk lamp | `public/models/decor/lamp/` |
| Security Camera 01 | `security_camera_01` | AI / Computer Vision desk accessory | `public/models/electronics/camera/` |
| Hanging Picture Frame 02 | `hanging_picture_frame_02` | Wall photo frames (×2, reused) | `public/models/decor/photo-frame/` |
| Book Encyclopedia Set 01 | `book_encyclopedia_set_01` | Books on the shelf (×7, reused) | `public/models/decor/books/` |
| Wood Planks (texture) | `wood_planks` | Floor material (diffuse + normal + roughness) | `public/models/environment/floor/` |
| Reading Room (HDRI) | `reading_room` | Environment lighting / reflections | `public/models/environment/reading_room_1k.hdr` |

All downloaded at the smallest available resolution tier (1k) — appropriate
for a portfolio hero, not a print render, and it keeps total payload down
(~20MB across all models + textures + HDRI combined, all lazy-loaded only
when the hero's WebGL scene actually mounts).

## Not from an external source (procedural, and why)

- **Monitor** — no free monitor/display model was found in Poly Haven's
  catalog that fit. Hand-built with real `roughness`/`metalness` values
  (not flat color) rather than left unfilled.
- **Laptop** — Poly Haven's only laptop (`classic_laptop`) has its own tags
  `['old', 'vintage', 'beige', 'notebook', 'lcd', 'trackball']` — a genuine
  vintage machine, not a modern one. It was downloaded and placed first,
  visibly clashed with the "premium modern workspace" brief once actually
  in the scene, and was swapped back to a clean procedural laptop rather
  than kept for the sake of using a "real" asset.
- **Phone** — not in any of the packs checked, and nothing in the current
  project content maps to "mobile development" now that the one mobile
  project (Rezoe) was cut earlier in this engagement. Not included this
  pass rather than added as an empty gesture.
- **Achievement plaque** — no free trophy/certificate/plaque model fit; a
  small procedural plaque instead of a fake certificate image.
- **Research notebook** — no free "open notebook with visible pages" model
  fit; built as simple procedural geometry, not a fake document scan.

None of these are claimed as downloaded assets — they're plain
`meshStandardMaterial`/`meshPhysicalMaterial` primitives, same as this
file would say if a claimed CC0 source didn't actually check out.
