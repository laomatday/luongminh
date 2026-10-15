# V6 QA / Browser verification

**Date:** 15 Oct 2026 · **Target under test:** bundled, offline React preview in Chromium. WebGL2 was unavailable in the isolated environment; actual software Canvas2D renderer was tested. WebGL2 shader path was checked with standalone TypeScript strict compilation, not real GPU render testing.

## Results verified

- **60/60** responsive + interaction assertions passed at 320×740, 390×844, 768×1024, 1024×768, 1440×900, 1920×1080: autoplay default, five selectable scenes, no viewport overflow, mode changes, Replay, Pause/Play, correct Explorer availability and responsive behavior. No uncaught JS errors occurred in these cases.
- **Timed cycle:** initial `finish` scene progressed automatically to `structure` after approximately 4.8 seconds, without a user click.
- **Pause test:** scene remained unchanged after waiting for more than one full stage duration (5.2 seconds).
- **Renderer pixels:** Canvas image bytes changed after 950ms without user interaction, proving orbit motion rather than static illustration.
- **Offscreen:** when scrolled away, the current scene remained frozen after 5.12 seconds.
- **Assembly animation (Explorer):** stage 04 started at **8%** and reached **45%** after 1.95 seconds of playback in the tested environment.
- **Manual control:** selecting stage 05 showed its portfolio CTA; switching VI→EN updated its text; dragging the canvas paused playback and autoplay resumed after the 7-second idle timeout.
- **Reduced motion:** 390px Chromium emulation opened in manual mode and showed an explanatory message.
- **API validation (Next.js handoff):** **10/10** existing API inquiry-input checks still passed.
- **Strict TypeScript:** `engine3d.ts` + `cinematic-scenes.ts` compile with TypeScript 5.8 `--strict` and DOM libs, standalone.

Screenshots: `luong-minh-v6-hero-1440.png`, `luong-minh-v6-hero-390.png`, `luong-minh-v6-explorer-1440.png`, `luong-minh-v6-scene-structure.png`, `luong-minh-v6-scene-exploded.png`.

## Exclusions / release blockers

1. **Next.js / React 19 actual npm build:** unavailable due network restrictions in authoring container. Source and offline HTML preview were checked; production package install/CI must still be run.
2. **Real GPU WebGL2 path:** not testable in this Chromium environment. Test shaders, antialiasing, frame pacing, thermal and memory on actual devices before go-live.
3. **WCAG 2.2 AA complete audit:** not claimed. Lightbox controls, focus trapping, screen readers, low-motion and full keyboard journey still need formal QA.
4. **Real project content:** illustration is not BIM, does not prove a project delivery claim. Replace user-visible assets and data only with approved content.
5. **Online deployment:** website is not deployed; domain, CMS, transactional mail and marketing tracking are not provisioned by this deliverable.
