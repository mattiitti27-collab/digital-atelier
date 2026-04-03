

## FASE 1 — Le Fondamenta (Setup & WebGL Background)

This plan builds the entire Phase 1 foundation for the INTINIWEBATELIER luxury site.

### What you'll get

- Dark luxury site (#050505 background) with Inter font
- Smooth scroll via Lenis at 60fps
- Fullscreen preloader with 0-100% counter and GSAP clip-path reveal animation
- WebGL background (React Three Fiber) with a liquid distortion shader cycling through all 10 uploaded images every 3 seconds, with smooth crossfade transitions at ~8% opacity
- Glassmorphism cookie banner (bottom-left) with "Accetta" / "Necessari" buttons

### New dependencies

- `@react-three/fiber@^8.18` and `three@^0.160` — WebGL scene
- `@react-three/drei@^9.122.0` — texture loader helpers
- `gsap` — preloader animation, smooth transitions
- `lenis` — smooth scroll (standalone, no wrapper needed)

### Files to create/modify

1. **Copy all 10 images** to `src/assets/bg/` (bg-1.jpg through bg-10.jpg)

2. **`src/index.css`** — Update CSS variables: background `#050505`, foreground white, import Inter from Google Fonts, add safe-area-inset padding on body

3. **`src/components/Preloader.tsx`** — Black fullscreen overlay, numeric counter 0→100 animated with GSAP, on complete: clip-path wipe reveal (bottom to top), then unmount

4. **`src/components/SmoothScroll.tsx`** — Initialize Lenis instance in a useEffect, RAF loop, cleanup on unmount. Wraps children.

5. **`src/components/WebGLBackground.tsx`** — Fixed fullscreen R3F Canvas (z-index: -1). Contains a single `<mesh>` plane filling the viewport with a custom `ShaderMaterial`:
   - **Vertex shader**: standard fullscreen quad
   - **Fragment shader**: two texture uniforms (`uTexCurrent`, `uTexNext`), a `uProgress` float (0→1 crossfade), a `uTime` for liquid distortion (simplex noise displacement on UV coordinates)
   - Opacity clamped at ~8% via fragment alpha
   - A `useFrame` hook advances `uTime`; a `useEffect` interval every 3s triggers crossfade by animating `uProgress` 0→1 via GSAP, then swaps textures and resets

6. **`src/components/CookieBanner.tsx`** — Fixed bottom-left, backdrop-blur glassmorphism card, two buttons. State stored in localStorage; hides permanently on click.

7. **`src/pages/Index.tsx`** — Compose: `<Preloader>`, `<SmoothScroll>`, `<WebGLBackground>`, `<CookieBanner>`, and a minimal content section (placeholder for Phase 2 hero).

8. **`src/App.tsx`** — No structural changes, just ensure Index route works.

### Technical details

- The shader crossfade uses two sampler2D uniforms. On each 3s tick, the "next" texture is loaded, `uProgress` animates 0→1, then current = next and progress resets. A simplex noise function in the fragment shader warps UVs for the liquid distortion effect.
- Lenis is initialized on `document.documentElement` with `smooth: true, lerp: 0.1` for the buttery feel.
- Preloader uses `gsap.to` on a counter object for the number, then `gsap.to` with `clipPath` on the overlay div for the reveal.
- All 10 images are preloaded via `useTexture` from drei (or THREE.TextureLoader) to avoid pop-in.

