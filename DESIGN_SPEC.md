# Design Specification: "Void Identity" Portfolio (v2025)

## 1. Visual Philosophy
**Theme:** *Industrial High-Tech / Cyber-Minimalism*
A precision-engineered aesthetic that treats the portfolio as a high-performance system rather than a static document. The visual language mimics HUDs (Heads-Up Displays), terminal interfaces, and raw hardware instrumentation.

**Core Keywords:**
*   **Precision:** Grid layouts, monospaced data, fine hairlines.
*   **Immersion:** Deep void backgrounds, atmospheric blurs, cinematic typography.
*   **Telemetry:** Data-driven presentation (metrics, status indicators, version numbers).

---

## 2. Color Palette ("The Void")

| Role | Color Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Canvas** | `Void` | `#050505` | Deepest background. Not pure black, but a rich, warm dark. |
| **Surface** | `Tungsten` | `#111111` | Card backgrounds, panels, secondary layers. |
| **Accent** | `Neon` | `#00ff9d` | **Primary Action Color.** CTAs, hover states, status lights. High-vis green. |
| **Text** | `Silver` | `#E0E0E0` | Primary readability. Soft white. |
| **Subtext** | `Mercury` | `#A3A3A3` | Secondary text, labels, descriptors. |
| **Border** | `Steel` | `#1F1F1F` | Subtle separation lines, grid textures. |

**Gradients:**
*   *Text Metal:* `linear-gradient(180deg, #ffffff 10%, #737373 100%)` (Used for the Hero Name).
*   *Glass Panel:* `rgba(18, 18, 18, 0.4)` with `backdrop-filter: blur(12px)`.

---

## 3. Typography

**Display Font: [Syne](https://fonts.google.com/specimen/Syne)**
*   **Weights:** 700 (Bold), 800 (Extra Bold).
*   **Usage:** Hero headings, section titles.
*   **Vibe:** Art-house meets brutalism. Unique, wide stance.

**Body Font: [Inter Tight](https://fonts.google.com/specimen/Inter+Tight)**
*   **Weights:** 300 (Light), 400 (Regular), 500 (Medium).
*   **Usage:** Long-form text, descriptions.
*   **Vibe:** Clean, legible, highly technical.

**Monospace Font: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)**
*   **Weights:** 400 (Regular).
*   **Usage:** Navigation, labels, tags, code snippets, button text.
*   **Vibe:** The developer's native tongue. Precision engineering.

---

## 4. UI Components

### A. The "System" Background
*   **Base:** Deep Void Black.
*   **Layer 1:** Abstract texture image (low opacity, mix-blend-screen) to add organic noise.
*   **Layer 2:** **Morphing Orb.** A massive, blurred radial gradient of Neon Green moving slowly behind the content (`animate-morph`).
*   **Layer 3:** **Technical Grid.** A 50px x 50px linear gradient grid, masked radially to fade into the void.

### B. Hero Section
*   **Status Badge:** A "System Online" pill with a pulsing green neon dot.
*   **The Name:** Rendered in *Syne* Extra Bold with a "Text Metal" gradient.
    *   *Effect:* **Text Scramble.** On load, characters cycle through random glyphs (`!<>-_\/[]`) before resolving to the name.
*   **Stats Box:** A frosted glass panel displaying key metrics (e.g., "44x Speedup") like hardware specs.

### C. Skill Matrix (The "Skills")
*   **Layout:** A strict list view reminiscent of a file directory or server log.
*   **Interaction:** Rows light up on hover (`hover:bg-white/[0.02]`).
*   **Chips:** Tech stack items (React, C++) are rendered as "chips" with a glass background and monospaced text.

### D. Project Cards ("Engineering Logs")
*   **Structure:** Large glass panels with a distinct "Telemetry Strip" at the bottom.
*   **Telemetry Strip:** A grid of 3 key metrics (e.g., Latency, Architecture, Efficiency) attached to the project card, mimicking a server dashboard.
*   **Typography:** Large industrial headings, precise monospaced tags.

### E. Navigation & Footer
*   **Navbar:** Minimalist. Glass blur. Links are uppercase, monospaced, small size.
    *   *CTA:* "INITIALIZE" (Button style).
*   **Footer:** Centered, massive typography ("LET'S ENGINEER").
    *   *CTA:* "INITIALIZE CONNECTION" (Email link).

---

## 5. Animation & Interaction (The "Feel")

**1. Scramble/Decode:**
Text doesn't just appear; it *compiles*. Used on the Hero name.

**2. Glass Hover:**
Cards have a subtle border glow (`border-neon/30`) and lift (`translateY(-2px)`) on interaction, simulating a tactical interface response.

**3. Smooth Scroll (Lenis):**
Heavy, luxurious scrolling physics (damping: 0.1) that makes the content feel weighted and premium.

**4. Parallax/Reveal:**
Elements utilize `GSAP ScrollTrigger` to slide up (`y: 30` -> `0`) and fade in as the user scrolls, creating a sense of unfolding data.
