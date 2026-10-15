# Lương Minh V6 · Cinematic 3D Autoplay

**Implementation state:** Functional interactive React prototype, 15 October 2026. One illustrative procedural industrial hall, not real BIM, engineering documentation or the approved image of a Luong Minh project.

## Scene sequence / storyboard

| Order | Scene | Visual mode | Camera | Stage duration | Motion |
|---|---|---|---|---:|---|
| 01 | Finished / Hoàn thiện | `complete` | Yaw -0.64 / pitch .50 / zoom 1.06 | 4.8s | Establish the complete building with slow yaw drift |
| 02 | Structure / Khung kết cấu | `structure` | Yaw +0.39 / pitch .42 / zoom 1.12 | 4.8s | Hide envelope and roof to reveal columns and portal frames |
| 03 | Exploded / Tách lớp | `exploded` | Yaw +1.61 / pitch .61 / zoom 1.28 | 4.8s | Separate roof/side envelope components spatially |
| 04 | Assembly / Lắp dựng | `complete` | Yaw +2.88 / pitch .49 / zoom 1.08 | 4.8s | Increase conceptual construction progress 8% → 100% |
| 05 | Portfolio / Công trình | `complete` | Yaw +4.10 / pitch .44 / zoom 1.02 | 4.8s | Return finished building and show a CTA to the actual project archive |

Loop length: **24s**. Camera / model interpolation: approx. **960ms** transition with frame-level easing. Segment progress bars update without React state updates every animation frame. Camera rotation is approximately **0.08 radians/second** during playback in addition to scene-specific camera poses. Actual perceived motion speed varies during transitions.

Auto-play is enabled when the page enters and `prefers-reduced-motion` is not enabled. A scene-switch always keeps the renderer mounted (no WebGL canvas recreation between scenes).

## Input and pause contracts

- **Pause:** pauses scene clock and auto orbit. Resume restarts the current scene from the preserved elapsed time.
- **Replay:** starts from the first scene at 00:00 and re-enables autoplay.
- **Explore manually:** stops scene clock permanently until Play/Replay; manual modes/layers/progress do not fight scene autoplay.
- **Drag / Ctrl+wheel / orbit controls:** pauses autoplay, hands control to the user and resumes after 7 seconds without any new manual interruption. The deliberate `Explore manually` selection does not auto-resume.
- **Scene selectors:** select any of the five scenes and enter manual mode.
- **Hidden tab / offscreen model:** freezes clock and renderer; playback continues from the previous timestamp when visible again.
- **Reduced-motion preference:** no automatic cinematic or rotation on initial page load; static first scene and active manual controls. Clicking Play is an explicit user request; continuous rotation remains disabled when reduced motion applies.
- **Mobile:** same five stages; software fallback uses adaptive lower FPS. Scrolling the page is native, not intercepted.

## Renderer and transitions

- **Main:** custom WebGL2 instanced box geometry and perspective camera. `setAutoMotion` and `setCameraPose` are exposed in `engine3d.ts` and reused by React and Next.js.
- **Fallback:** Canvas2D geometry recomputed and depth-sorted for perspective, not a static screenshot; adaptive animation frame budget around 40–115ms. Static SVG is only shown when even Canvas2D is unavailable.
- **Timebase:** UI state and timers use monotonic `performance.now`. The clock runs at ~85ms tick interval while visible; GPU rendering is driven by `requestAnimationFrame`. Scene captions use a subtle enter transition while the actual geometry morphs.
- **No fake BIM:** components and layer positions are authored geometry. They are illustrative and contain no verified dimensions, cost quantities or structural calculations.

## Design → Dev handoff checklist

1. Approve story titles, 5-scene order, transition direction and CTA wording in VI/EN.
2. Validate WebGL2 shader/compiler support on target Android, iOS and desktop GPU models.
3. Verify at least 30 FPS on intended WebGL2 mobile baseline where feasible; test FPS/thermals after five full loops. Prefer reduced DPR/LOD rather than lowering accessibility.
4. Test fallback within idle power budget. No animations offscreen or in hidden tab.
5. Cross-browser QA for keyboard, screen reader focus, drag, touch, zoom, reduced motion and all player states.
6. Real project 3D / BIM is a separate approved data integration. Do not label this concept as a built LMC warehouse.
