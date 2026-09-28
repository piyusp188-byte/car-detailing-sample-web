# Usacardetailing — Marketing Website

A high-converting, modern, premium automotive detailing marketing website built with **Vanilla HTML5, CSS3, and JavaScript**.

## Features & Highlights

- **Conversion-Optimized "Featured Work" Portfolio Gallery**: Placed as the 2nd section directly below the Hero (`#gallery`). Features an interactive service filter toolbar (`All Work`, `Paint Correction`, `Ceramic Coating`, `Interior Deep Clean`, `Headlight Restoration`, `Wheel Detailing`) and a responsive Bento grid layout.
- **Accessible Fullscreen Modal Lightbox**: Click any vehicle card to view an expanded view with caption details, service tag pill, wrap-around next/previous navigation, keyboard support (`Escape`, arrow keys, focus trapping), and touch swipe gestures.
- **Design System ("Midnight Chrome")**:
  - Near-black `#0a0a0c` base with metallic amber-gold `#f5a623` accents.
  - Bebas Neue punchy automotive typography paired with Inter body text.
  - Subtle ambient backlights, glassmorphic header, card elevation, and pulse glows.
- **Full 11-Section Single-Page Architecture**:
  1. Sticky Glass Header with active-scroll indicator, desktop nav, and accessible mobile drawer
  2. High-Impact Hero with trust strip (`500+ Cars Detailed`, `5-Star Rated`, `Fully Insured`)
  3. Featured Work Portfolio Gallery with Bento grid and modal lightbox
  4. 6 Detailing Services with inline SVGs and direct booking triggers
  5. Packages & Pricing with 3 tiers (Basic, Premium highlighted "Most Popular", Ultimate)
  6. Why Choose Us with 4 trust pillars
  7. How It Works (4-step timeline with connector accents)
  8. Customer Testimonials with 5-star ratings and verified vehicle models
  9. FAQ Accordion with smooth height transitions and ARIA accessibility
  10. Booking / Contact Form with instant client-side validation and confirmation view
  11. Footer with social links, opening hours, and service coverage
- **Zero Build Tooling Required**: Pure static web application that runs directly in any modern web browser or deploys instantly to Netlify, Vercel, or GitHub Pages.

---

## Quick Start / Local Preview

### Option A: Open directly in your browser
Double-click `index.html` or open it with Google Chrome, Microsoft Edge, Firefox, or Safari.

### Option B: VS Code Live Server
1. Open this folder in VS Code.
2. Click **Go Live** on the bottom status bar (using the Live Server extension).
3. The site opens at `http://127.0.0.1:5500/index.html`.

### Option C: Python HTTP Server (Terminal)
```bash
python -m http.server 3000
```
Then visit `http://localhost:3000`.

### Option D: Node.js (Terminal)
```bash
npx serve .
```

---

## Swapping Photos (`🔄 SWAP` Guide)

All placeholder imagery uses high-resolution automotive detailing photography. When you are ready to replace them with your own shop photos:

1. **Hero Car Image**:
   - In `index.html` under `#hero`, find `<img class="hero-img" ...>` and update the `src` attribute. Recommended resolution: `1920×1080` (WebP or JPG).
2. **Featured Work Portfolio Photos**:
   - In `js/gallery.js`, find the `galleryItems` array. Each item has a `/* 🔄 SWAP */` comment with `id`, `src`, `alt`, `tag`, and `caption`.
   - Update the corresponding `<img src="..." alt="...">` in `index.html` under `#gallery`.
3. **Map Embed**:
   - In `index.html` under `#contact`, replace the `.map-placeholder` container with an official Google Maps `<iframe>` embed code.
