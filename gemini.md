# AI Context: Dellano Portfolio (High-Performance Systems Architect)

## 🎯 Project Intent
A professional portfolio designed to mirror "Systems Engineering" and "High-Performance Computing" aesthetics. The site uses a "Road" metaphor to guide users through the developer's journey.

## 🛠 Tech Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS (Custom Design Tokens: Neon #00ff9d, Accent #0066ff)
- **Animations:** 
  - GSAP (ScrollTrigger, pinning, complex timelines)
  - Framer Motion (SVG Path following, simple UI transitions)
  - Lenis (Smooth scroll synchronization)
- **3D Engine:** React Three Fiber (Three.js) for the F1 Car loader and experimental scenes.
- **State:** Zustand (Minimal global state for loader/mouse).

## 🧩 Architecture Patterns
1. **The "Road" System (`SiteRoad.tsx`):**
   - Uses a dynamically calculated SVG path based on `document.scrollHeight`.
   - The `F1Car` component uses `useMotionValueEvent` from Framer Motion to map `scrollYProgress` to the SVG's `getPointAtLength()` method.

2. **Performance Optimization:**
   - GSAP `ticker` is synced with `Lenis` for frame-perfect scroll animations.
   - `will-change-transform` is used on high-frequency moving elements (F1 Car).

3. **Design System:**
   - **Metal Text:** Linear gradients with `background-clip: text` for a industrial look.
   - **Glass Panels:** High-blur (`backdrop-blur-md`) containers with thin borders.
   - **Typography:** Uses `Syne` for headings (bold/geometric) and `JetBrains Mono` for technical data/telemetry.

## 🚀 Key Files for AI Understanding
- `app/layout.tsx`: Provider hierarchy (Loader -> Background -> Lenis).
- `components/SiteRoad.tsx`: The primary logic for the scroll-following vehicle.
- `components/ui/RocketLoader.tsx`: Complex Three.js assembly logic.
- `lib/gsap.ts`: Custom animation utilities like `magneticTilt`.

## 🤖 AI Interaction Guidelines
- When adding sections, ensure they follow the "Engineering Log" or "Spec Sheet" visual style.
- Maintain the high-contrast light/dark toggle logic seen in the `Skills` section.
- Use `JetBrains Mono` for any "raw data" or "telemetry" UI elements.
