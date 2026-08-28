# 3D Asset Downloads — Resolved

**Update:** the models described below as blocked *were* downloaded, in the
next round of this work — via a different, correct access path. Keeping
this file's original account for the record, since it explains a real dead
end worth knowing about, followed by what actually worked.

## What was tried first (didn't work)

- **Kenney's Furniture Kit** (`kenney.nl/assets/furniture-kit`) — real, CC0,
  verified on the official page. Its Download button is JS-triggered with
  no static file URL in the page HTML, and a curl fetch of the page
  returned no `.zip` link.
- **poly.pizza**, which mirrors the same Kenney pack as ready GLB files —
  blocked by a Cloudflare bot-challenge (`gettoken` endpoint). Not
  something to script around.

## What actually worked

**Poly Haven has a separate, public, unauthenticated API**
(`api.polyhaven.com` for metadata, `dl.polyhaven.org` for the files
themselves) — entirely different from the polyhaven.com *website's*
download button, and built by Poly Haven specifically to be used
programmatically. `curl https://api.polyhaven.com/files/<slug>` returns
direct, versioned URLs for every resolution/format of a model, including
the `.gltf` + `.bin` + texture files needed to actually render it.

Poly Haven's own furniture catalog turned out to have real, well-matched
CC0 models for nearly everything needed — see `public/ASSET_LICENSES.md`
for the full list actually in use (desk, chair, sofa, bookshelf, coffee
table, plant, lamp, laptop, a security camera standing in for the "AI /
Computer Vision" accessory, picture frames, books, plus a wood-floor PBR
texture set and an HDRI for environment lighting).

No monitor and no smartphone model exists in Poly Haven's catalog in a
style that fit — those two stayed procedural, documented as such in
`ASSET_LICENSES.md` rather than silently left out or faked.
