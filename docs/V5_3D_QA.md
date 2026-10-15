# V5 / Interactive 3D smoke QA

Environment: local Chromium using offline self-contained React prototype, 15 Oct 2026. GPU/WebGL2 was unavailable in the sandbox, so the **Canvas2D perspective rendering fallback** handled all viewport and interaction tests. The WebGL2 renderer code compiles to JavaScript and passes `tsc --strict` in isolation, but its GPU shader path remains **unverified on actual supported hardware**.

- Six viewport suites: 320×720, 390×844, 768×1024, 1024×768, 1440×900 and 1920×1080.
- Across six primary routes per width: Home, /3d, Projects, project preview, Services, Contact. No horizontal overflow or blank route.
- `Construction3D` uses the same custom procedural warehouse in compact hero and full explorer.
- The 3D model is **actually recomputed and projected in perspective**, using depth-sorted face rendering under Canvas fallback, and is not a pre-rendered image.
- 3 mode controls, five layer controls, phase slider; buttons have state and are operable.
- **Pixel-sample differences were tested**, and confirmed after changing: Structure, Exploded, Focus Steel, 19% construction progress, orbit with button, drag orbit.
- Mobile navigation and English switch tested.
- 115 / 115 smoke assertions passed; no uncaught JavaScript exceptions.

**Unverified / must finish before production:** WebGL2 GPU shader compilation + scene output on real browsers, mobile-device framerate/thermal, CI Next 16 build with npm packages installed, Figma signoff, screen readers, actual media, contractual rights, real delivery APIs and deployment.

See `QA_V5_RAW.json` for individual assertions and screenshots in the accompanying deliverable.
