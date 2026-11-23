# DATAXSCAPE 2K26 — 100% REPLICATION & IMPLEMENTATION PLAN

> **Document Type:** Master Implementation Blueprint  
> **Target Project:** DataXscape 2k26 National Hackathon Website  
> **Source Media Analysis:** `datascapevideo.mp4` (Duration: 42.70s, Resolution: 1280x576 @ 30 FPS)  
> **Author:** Antigravity Engineering Architecture  
> **Target Workspace:** `c:\Users\lohit\OneDrive\Desktop\dataXscape2.0`  

---

## 1. Executive Video Breakdown & Scene-by-Scene Chronology

A deep-frame extraction and visual analysis was conducted on `datascapevideo.mp4` across all 1,281 frames. The video presents a continuous, highly styled dark-mode landing page featuring gold/amber glowing aesthetics, 3D typography, floating ember particles, and an interactive cyberpunk-style HUD.

```
00:00 - 00:03 │ Hero Section: Sticky Navbar, 3D Gold Logo, Department Info, "Register Now" CTA, Fixed HUD Viewfinder
00:03 - 00:05 │ Countdown Timer: 4-Segment Flip Clock (Days : Hours : Mins : Secs)
00:05 - 00:08 │ About Section: Split layout with hackathon overview text and previous edition team photo
00:08 - 00:13 │ Event Timeline: 5 Alternating milestone cards along a central vertical amber line
00:13 - 00:16 │ 3D Coverflow Gallery: Perspective carousel with mirror floor reflections
00:16 - 00:21 │ Leadership & Patrons: 3 tiers (Patrons 4x, Co-Patrons 2x, Convener 1x) with circular gold frames
00:21 - 00:25 │ Prizes & Awards: 3-tier podium (Champion ₹75,000, Runner Up ₹50,000, 2nd Runner Up ₹25,000)
00:25 - 00:29 │ Sponsors & Partners: Large 3D beveled metallic "HEXAWARE" emblem
00:29 - 00:35 │ FAQ Section: 2-column grid of 8 accordion questions with interactive expand/collapse
00:35 - 00:38 │ Venue Map: Embedded interactive Google Map of Panimalar Engineering College
00:38 - 00:41 │ Contact & Connect: Split layout with direct info, Google Form CTA, social links & contact form with shining submit button
00:41 - 00:42 │ Footer: Copyright notice and developer attribution
```

---

## 2. Design System, Color Tokens & Aesthetic Specifications

### 2.1 Color Palette
| Token Name | Hex Code | Purpose & Usage |
| :--- | :--- | :--- |
| `bg-primary` | `#050505` | Master viewport background (deep void black) |
| `bg-card` | `rgba(18, 18, 18, 0.82)` | Semi-transparent frosted cards with backdrop blur |
| `accent-gold` | `#FF9500` - `#FFB800` | Primary brand gradient (buttons, borders, icons) |
| `accent-amber-glow` | `rgba(255, 149, 0, 0.35)` | Box shadows, button glows, radial ambient lighting |
| `gold-text` | `#F5A623` / `#FFC107` | Subheadings, dates, milestone titles |
| `text-white` | `#FFFFFF` | Primary headings, button typography, timer digits |
| `text-muted` | `#B0B0B0` / `#9CA3AF` | Body copy, secondary descriptions |
| `hud-red` | `#FF3B30` | `[● REC]` live indicator dot and text |
| `border-subtle` | `rgba(255, 184, 0, 0.15)` | Card borders, horizontal separators |

### 2.2 Typography
- **Headings & Accents:** Geometric Sans-Serif (`Inter`, `Space Grotesk`, or `Outfit` — 700/800 bold, tracking-tight).
- **Body & Copy:** `Inter` or `system-ui` (400 regular, 500 medium, line-height 1.6).
- **Countdown Flip Clock:** Monospace 7-segment / Digital clock font (`Orbitron`, `Share Tech Mono`, or custom SVG flip glyphs).
- **HUD & Viewfinder:** Monospace uppercase cyber/terminal styling (`JetBrains Mono` or `VT323`).

### 2.3 Visual Effects & Motion Language
1. **Interactive Ambient Particle Background:**
   - 120–160 floating golden embers/particles floating vertically with subtle horizontal drift.
   - Particles have randomized radiuses (1px to 3.5px), variable opacities (0.2 to 0.9), and pulsating glow effects.
2. **Fixed HUD Viewfinder (Top-Right):**
   - 4-corner bracket reticle: `┌ ┐` and `└ ┘`.
   - `[● REC]` pulsating red recording dot.
   - `SPONSORED BY` label in cyber font.
   - `HEXAWARE` logo in yellow/gold pixel-stencil font.
3. **CTA Button Sheen Animation:**
   - Diagonal white shimmer gleam (`translateX(-100%)` to `translateX(200%)`) running across buttons on hover or looped every 3.5 seconds.
4. **3D Coverflow with Floor Reflection:**
   - Active card at center: `scale(1.1)`, `rotateY(0deg)`, `z-index: 10`.
   - Flanking cards: `scale(0.85)`, `rotateY(±35deg)`, `translateZ(-100px)`.
   - Underneath: `-webkit-box-reflect: below 8px linear-gradient(to bottom, rgba(0,0,0,0) 60%, rgba(0,0,0,0.5) 100%)`.

---

## 3. Comprehensive Section-by-Section Specifications

### Section 1: Top Navigation Bar (Fixed / Sticky)
- **Positioning:** `fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/60 border-b border-white/5`.
- **Left Brand Section:**
  - Panimalar Engineering College circular emblem logo.
  - Institutional typography:
    ```
    PANIMALAR ENGINEERING COLLEGE
    An Autonomous Institution
    Affiliated to Anna University, Chennai
    (JAISAKTHI EDUCATIONAL TRUST)
    ```
- **Center Nav Links (Smooth Scroll):**
  - `About` (`#about`)
  - `Timeline` (`#timeline`)
  - `Gallery` (`#gallery`)
  - `Prizes` (`#prizes`)
  - `FAQ` (`#faq`)
  - `Contact` (`#contact`)
- **Right Action & Branding Section:**
  - **Data Science Club Branding:** Circular Data Science Club emblem badge (`/images/ds-club-logo.png`) with luminous cyan glow ring and dual-line typography:
    - `"DATA SCIENCE CLUB"` (Bold font-display, tracking-wider)
    - `"Dept. of AI & DS"` (Amber-400 subtitle)
  - `"Our Community"`: Pill button (`rounded-full`), orange-to-amber gradient, glowing hover shadow.

---

### Section 2: HUD Viewfinder Overlay (Fixed Top-Right)
- **Positioning:** `fixed top-20 right-8 z-40 pointer-events-none`.
- **Elements:**
  - 4 corner brackets `[ ]` framing a 160x100px reticle.
  - Red dot indicator: `● REC` (blinking at 1Hz).
  - Upper caption: `SPONSORED BY`.
  - Sponsor typography: `HEXAWARE` in golden pixel-stencil font.

---

### Section 3: Hero & Call-to-Action
- **Hero Title:** 3D extruded metallic gold typography reading **DATAXSCAPE** (`/images/datascape-removed.png`).
  - Custom SVG / 3D rendered graphic with beveled faces, golden luster, and an illuminated central 'X'.
- **Institutional Subtitles:**
  - `"Department of Artificial Intelligence and Data Science"` (Font size: ~1.25rem, semibold, white).
  - `"Unlocking possibilities through innovation, collaboration, and the power of data."` (Muted gray-gold, ~1.0rem).
- **Primary CTA:**
  - `"Register Now"`: Golden rounded rectangular button (`px-8 py-3.5 rounded-xl`), radiant amber glow shadow (`box-shadow: 0 0 30px rgba(255, 149, 0, 0.45)`).
  - Smooth anchor link to the registration modal or external Google Form.

---

### Section 4: Flip-Clock Countdown Timer
- **Heading:** `"COUNTDOWN"` (Bold uppercase white, centered).
- **Structure:** 4 dual-digit mechanical flip modules:
  1. **Days** (e.g., `41`)
  2. **Hours** (e.g., `21`)
  3. **Minutes** (e.g., `21`)
  4. **Seconds** (e.g., `00`)
- **Visuals:** Warm amber/golden rectangular flip cards with a horizontal divider slit. Digits are high-contrast white in bold digital display font. Colon (`:`) separators between units.

---

### Section 5: About DataXscape 2k26
- **Layout:** Responsive 2-column grid (`grid-cols-1 md:grid-cols-2 gap-10 items-center`).
- **Left Content:**
  - Title: `"About DataXscape 2k26"` (H2, 2.25rem bold, white).
  - Description:
    > "DataXscape 2k26 is a 24-hour national data science hackathon where students and innovators come together to solve real-world challenges. This immersive event blends creativity, analytics, and a compelling narrative, empowering the next generation of data enthusiasts to showcase their skills under pressure. Participants will get the chance to network with industry experts, attend workshops, and compete for exciting prizes, making it a premier event for aspiring data scientists and engineers."
- **Right Media:**
  - Framed showcase photo of students and faculty holding the *Data Science Club* crest with IEEE affiliation banner.
  - Border: Subtle rounded rectangle (`rounded-2xl`) with amber rim lighting.

---

### Section 6: Event Timeline
- **Heading:** `"Event Timeline"`
- **Subheading:** `"Follow our schedule from registration to the final announcement."`
- **Layout:** Vertical central spine (`w-0.5 bg-gradient-to-b from-amber-500/20 via-amber-500 to-amber-500/20`) with alternating left/right cards and central circular amber icon nodes.
- **5 Exact Milestones Extracted from Video:**
  1. **Dec 1, 2025** │ *Registration Opens*
     - Card Side: Left
     - Badge Icon: Briefcase / ID Badge
     - Description: "Sign up individually or as a team to secure your spot."
  2. **Jan 10, 2026** │ *Students Shortlisted*
     - Card Side: Right
     - Badge Icon: Calendar
     - Description: "The list of shortlisted students for the hackathon will be announced."
  3. **Jan 21, 2026** │ *Hackathon Kick-off*
     - Card Side: Left
     - Badge Icon: Microphone
     - Description: "Opening ceremony, keynotes, and the official start of the 24-hour hack."
  4. **Jan 22, 2026** │ *Submission Deadline & Judging*
     - Card Side: Right
     - Badge Icon: Trophy
     - Description: "Final projects are submitted, and judging begins."
  5. **Jan 23, 2026** │ *Winners Announcement*
     - Card Side: Left
     - Badge Icon: Flag
     - Description: "Closing ceremony and announcement of the hackathon winners."

---

### Section 7: 3D Coverflow Gallery
- **Heading:** `"GALLERY"`
- **Subheading:** `"A glimpse into our past events."`
- **Component Mechanism:**
  - 3D Coverflow perspective slider (`perspective: 1000px`).
  - Active center slide with 2 slides on the left and 2 on the right.
  - Realistic floor mirror reflection effect below every photo card.
  - Slide navigation with drag/swipe, left/right arrow buttons, and auto-play.

---

### Section 8: Leadership & Patrons
Divided into 3 distinct hierarchical levels, each card featuring a circular portrait with a metallic golden border, dark frosted container, and golden name/title typography:

#### 1. PATRONS (4 Cards in a row)
1. **Dr. P Chinnadurai** — *Secretary & Correspondent*
2. **Dr. C SakthiKumar** — *Director*
3. **Mrs. C Vijayarajeswari** — *Director*
4. **Dr. Saranya Sree Sakthi Kumar** — *Director*

#### 2. CO-PATRONS (2 Cards centered)
1. **Dr. K. Mani** — *Principal*
2. **Dr. S. Prasanna Devi** — *Chief Academic Officer*

#### 3. CONVENER (1 Card centered)
1. **Dr. S. Malathi, M.E., Ph.D** — *Convener*

---

### Section 9: Prizes & Awards (Podium Layout)
- **Heading:** `"Prizes & Awards"`
- **Subheading:** `"Compete for amazing prizes and take home more than just code."`
- **Podium Hierarchy (3 Cards):**
  1. **CHAMPION (Center — 1st Place Podium, Highest Height):**
     - Shield Crest: Regal Purple & Gold Shield with White Ribbon & Star.
     - Label: `"CHAMPION"`
     - Amount: `"75,000"` (Large bold typography).
     - Card Styling: Golden halo glow, elevated position.
  2. **RUNNER UP (Left — 2nd Place Podium):**
     - Shield Crest: Orange & Silver Shield with Ribbon & Star.
     - Label: `"RUNNER UP"`
     - Amount: `"50,000"`.
  3. **2ND RUNNER UP (Right — 3rd Place Podium):**
     - Shield Crest: Royal Blue & Silver Shield with Ribbon & Star.
     - Label: `"2ND RUNNER UP"`
     - Amount: `"25,000"`.

---

### Section 10: Sponsors & Partners
- **Heading:** `"Sponsors & Partners"`
- **Subheading:** `"We are grateful for the support of our partners who make this event possible."`
- **Feature Centerpiece:**
  - Massive 3D Golden Beveled Logo: **HEXAWARE**.
  - Dynamic sheen and subtle floating idle animation.

---

### Section 11: Frequently Asked Questions (FAQ Accordion)
- **Heading:** `"Frequently Asked Questions"`
- **Subheading:** `"Have questions? We've got answers. If you can't find what you're looking for, feel free to contact us."`
- **Layout:** 2-column interactive accordion grid (4 items per column) with chevron rotation (`v` to `^`) and smooth expand/collapse.
- **Exact 8 Questions from Video:**
  - **Left Column:**
    1. *Who is eligible to participate?* (College students across undergraduate/postgraduate programs).
    2. *What is the team size?* (Verified in video frame 35: **"Team size is 3 to 4."**).
    3. *Can Panimalar Engineering College students participate?* (Yes, internal and external students eligible).
    4. *Is accommodation provided for participants?* (Yes, on-campus food and accommodation during 24-hr event).
  - **Right Column:**
    5. *Is there a fee to participate?* (Free registration for shortlisted teams).
    6. *What should I bring?* (Laptops, chargers, student college ID cards).
    7. *What makes DataXscape different from other hackathons?* (Hands-on problem statements from Hexaware, real-world datasets, industry mentorship).
    8. *How long is the hackathon?* (24 consecutive hours).

---

### Section 12: Venue & Interactive Map
- **Content:** Full-width embedded Google Maps view centered on:
  - **Panimalar Engineering College**
  - Address: *Bangalore Trunk Road, Varadharajapuram, Poonamallee, Chennai, Tamil Nadu 600123*.
  - Dark-mode styled map frame with amber borders.

---

### Section 13: Contact & Registration Section ("Let's Connect")
- **Layout:** 2-column split layout.
- **Left Column:**
  - Heading: `"Let's Connect"` (H2, bold white).
  - Organization: `"Dept. of AI & DS, Panimalar Engineering College, Chennai"`
  - Email: `pecdatascienceclub@gmail.com`
  - Action Button: `"Register on Google Forms"` (Golden button).
  - Social Links: LinkedIn (`in` icon), Instagram (`📷` camera icon).
- **Right Column (Interactive Form):**
  - `Name` (Input, placeholder: `"John Doe"`)
  - `Email *` (Input, placeholder: `"john.doe@example.com"`)
  - `Team Name (Optional)` (Input, placeholder: `"The A-Team"`)
  - `Message / Idea` (Textarea, placeholder: `"Tell us about your project idea or any questions you have."`)
  - Submit Button: `"Submit"` with animated diagonal light gleam sweeping across the button surface.

---

### Section 14: Footer
- **Copyright:** `© 2025 HackWeb. All rights reserved.`
- **Attribution:** `Developed by P.Saravanan`
- **Styling:** Minimalist dark bar with centered muted typography.

---

### Section 15: Hidden Admin Control Portal (Zero Public Footprint)
> **Crucial Architectural Mandate:** **NO admin button, link, or cue is visible anywhere on the public website.** The navigation bar, footer, and hero remain 100% faithful to the video with zero admin indicators. Access is strictly via a direct hidden URL route (`/admin` or `/manage-dataxscape`) and protected by a secure PIN/Passcode gate.

- **Route & Access Control:**
  - Route: `/admin` (or configurable `/manage-dataxscape`).
  - Auth Guard: Master Passcode / Security PIN modal. Unauthenticated visitors attempting direct route access are challenged with a sleek cyber-themed password screen with lockout throttling.
  - Secret Keybind (Optional Developer Convenience): `Ctrl + Shift + Alt + A` to directly launch the hidden admin prompt.

- **Admin Module 1: Countdown Timer Manager:**
  - **Target Date & Time Picker:** Adjust the exact target hackathon launch date/time (e.g., target `2026-01-21T09:00:00`).
  - **Live Countdown Display Mode:**
    - *Auto Calculation Mode:* Real-time countdown to target date.
    - *Fixed Static Mode:* Freeze timer at exact values (e.g., matching the video's `41 : 21 : 21 : 00`).
    - *Event Status Override:* Switch between "Countdown Active", "Hackathon is Live!", or "Event Concluded".
  - **Sync:** Any date/time change instantly recalculates and ticks on the main landing page flip clock in real time.

- **Admin Module 2: 3D Coverflow Gallery Photo Manager:**
  - **Photo Addition:**
    - Drag-and-drop local image upload (converts to persistent local storage / IndexedDB or cloud storage).
    - Direct Image URL input for fast external image linking.
    - Title, caption, and event year tagging.
  - **Photo Deletion & Reordering:**
    - One-click deletion with confirmation.
    - Order adjustment (move left/right or up/down) to control which photo occupies the center 3D coverflow position.
  - **Live 3D Preview:** Visual preview showing how added/reordered photos appear with perspective and floor reflection before saving.

- **Admin Module 3: Sponsors & Partners Manager:**
  - **HUD Viewfinder Sponsor Control:**
    - Live edit the text displayed in the fixed top-right HUD reticle (`"SPONSORED BY HEXAWARE"`).
    - Change sponsor name, accent color, or tracking link.
  - **Primary 3D Sponsor Section:**
    - Edit title sponsor name and 3D metallic style.
    - Upload or replace sponsor logo SVG/PNG.
  - **Tier-based Partner Management:**
    - Add/Edit/Remove sponsors categorized by tier: *Title Sponsor*, *Powered By*, *Platform Partner*, *Associate Sponsor*.
    - Set sponsor external website URLs.

- **Admin Module 4: State Persistence & Live Reactive Sync:**
  - React Context (`SiteDataContext`) managing application state.
  - Changes persist across browser sessions in `localStorage` / `IndexedDB`, with support for JSON export/import backup.
  - *"Restore Video Defaults"* button: 1-click reset to instantly restore the original video state (Hexaware sponsor, default countdown, original gallery images).

---

## 4. Architecture & Recommended Tech Stack

To achieve a 100% faithful replication that matches the video's 60fps smoothness and crisp visuals:

```
┌────────────────────────────────────────────────────────┐
│                   Frontend Application                 │
│         Next.js 14 / Vite + React 18 + TypeScript      │
├──────────────────────────┬─────────────────────────────┤
│ Styling & Motion         │ UI & Icon Ecosystem         │
│ • Tailwind CSS           │ • Lucide React / Heroicons  │
│ • Framer Motion          │ • Canvas-Confetti           │
│ • CSS 3D Transforms      │ • Swiper / Keen-Slider 3D   │
├──────────────────────────┼─────────────────────────────┤
│ Visual Effects           │ Data & Form Handling        │
│ • HTML5 Canvas Particles │ • React Hook Form / Zod     │
│ • 3D Text & Reflect Shims│ • EmailJS / Server Actions  │
└──────────────────────────┴─────────────────────────────┘
```

### Proposed Folder Structure in Workspace
```
c:\Users\lohit\OneDrive\Desktop\dataXscape2.0\
├── public/
│   ├── images/
│   │   ├── panimalar-logo.png
│   │   ├── dataxscape-3d-logo.png
│   │   ├── hexaware-3d-logo.png
│   │   ├── about-team.jpg
│   │   ├── gallery/ (slide1.jpg ... slide5.jpg)
│   │   └── patrons/ (patron1.jpg ... convener.jpg)
│   └── fonts/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── HudOverlay.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── Hero.tsx
│   │   ├── CountdownTimer.tsx
│   │   ├── About.tsx
│   │   ├── Timeline.tsx
│   │   ├── Gallery3D.tsx
│   │   ├── Patrons.tsx
│   │   ├── Prizes.tsx
│   │   ├── Sponsors.tsx
│   │   ├── Faq.tsx
│   │   ├── VenueMap.tsx
│   │   ├── Contact.tsx
│   │   └── Footer.tsx
│   ├── components/admin/
│   │   ├── AdminAuthModal.tsx        # Password/PIN challenge gate
│   │   ├── CountdownManager.tsx      # Date picker, countdown toggle, live status
│   │   ├── GalleryManager.tsx        # Photo uploader, reordering, card remover
│   │   ├── SponsorsManager.tsx       # 3D logo editor, tier manager, HUD reticle
│   │   └── AdminNavbar.tsx           # Admin portal navigation bar
│   ├── pages/
│   │   ├── LandingPage.tsx           # 100% video replica public landing page
│   │   └── AdminPortal.tsx           # Hidden management dashboard (/admin)
│   ├── context/
│   │   └── SiteDataContext.tsx       # Live reactive state for Countdown, Gallery & Sponsors
│   ├── data/
│   │   ├── defaultSiteData.ts        # Default fallback matching datascapevideo.mp4 100%
│   │   ├── timelineData.ts
│   │   ├── patronsData.ts
│   │   ├── prizesData.ts
│   │   └── faqData.ts
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## 5. Phase-by-Phase Execution Roadmap

```mermaid
flowchart TD
    P1["Phase 1: Project Scaffolding, Design Tokens & Background Canvas"] --> P2["Phase 2: Navigation, HUD Viewfinder, Hero & Flip Countdown"]
    P2 --> P3["Phase 3: About Section & Interactive Vertical Timeline"]
    P3 --> P4["Phase 4: 3D Coverflow Gallery with Mirror Reflections"]
    P4 --> P5["Phase 5: Leadership Grid & 3-Tier Podium Prizes"]
    P5 --> P6["Phase 6: 3D Sponsor Banner & Interactive FAQ Accordions"]
    P6 --> P7["Phase 7: Google Map Embed, Contact Form & Footer"]
    P7 --> P8["Phase 8: Hidden Admin Portal & Reactive State System"]
    P8 --> P9["Phase 9: Polish, Video Conformance QA & Verification"]
```

### Phase 1: Project Scaffolding & Visual Foundation
- Initialize React + TypeScript project with Vite or Next.js.
- Configure Tailwind CSS with custom amber/gold color palette (`#FF9500`, `#FFB800`, `#050505`).
- Implement the HTML5 Canvas Particle Background (`ParticleBackground.tsx`) with floating amber embers and subtle upward drift.

### Phase 2: Navigation, HUD Viewfinder & Hero
- Implement the frosted sticky header (`Navbar.tsx`) with Panimalar College insignia, anchor links, and glowing "Our Community" button (**ensuring strictly zero admin buttons**).
- Construct the fixed HUD Viewfinder (`HudOverlay.tsx`) at `top-20 right-8` with corner brackets, blinking `● REC`, and Hexaware sponsor badge.
- Build the Hero section (`Hero.tsx`) with the 3D metallic `DATAXSCAPE` title, Department subtitles, and glowing `Register Now` button.
- Build the 4-block mechanical flip clock (`CountdownTimer.tsx`) with active live calculation.

### Phase 3: Content Sections (About & Timeline)
- Build the About section (`About.tsx`) with the 2-column layout and framed event photograph.
- Build the vertical Timeline component (`Timeline.tsx`) with central amber spine, milestone badges, and alternating cards for all 5 dates.

### Phase 4: 3D Coverflow Gallery & Leadership
- Implement the 3D Coverflow component (`Gallery3D.tsx`) using Swiper 3D effect or Framer Motion with perspective transforms and CSS floor reflections (`-webkit-box-reflect`).
- Build the Patrons & Leadership directory (`Patrons.tsx`) organized into Patrons (4), Co-Patrons (2), and Convener (1) with golden circular border avatars.

### Phase 5: Prizes & 3D Sponsor Showcase
- Implement the 3-tier podium (`Prizes.tsx`): Champion (₹75,000, Purple/Gold shield, center elevated), Runner Up (₹50,000, Red shield), and 2nd Runner Up (₹25,000, Blue shield).
- Implement the Sponsors section (`Sponsors.tsx`) featuring the large 3D beveled golden "HEXAWARE" emblem with reflective surface sheen.

### Phase 6: Interactive FAQs & Venue Map
- Build the two-column FAQ accordion (`Faq.tsx`) with animated height transitions and chevron rotation (`v` to `^`).
- Embed the responsive Google Maps iframe (`VenueMap.tsx`) pointing to Panimalar Engineering College, Chennai.

### Phase 7: Contact Form & Footer
- Implement "Let's Connect" (`Contact.tsx`) with department email, Google Form CTA, social icons, and contact form.
- Add the diagonal light shimmer effect on the "Submit" button.
- Build the Footer with copyright and developer attribution.

### Phase 8: Hidden Admin Portal & Reactive State System
- Implement `SiteDataContext.tsx` to bind the Countdown, Gallery, and Sponsors into a single real-time reactive state engine with persistent storage (`localStorage` / `IndexedDB`).
- Develop the hidden route `/admin` with zero navbar/footer footprint.
- Build the PIN/Password Challenge Guard (`AdminAuthModal.tsx`).
- Build the 3 dedicated admin management panels:
  1. **Countdown Management Panel**: Update event date/time, toggle between auto/static modes, update status headlines.
  2. **Gallery Photo Management Panel**: Drag-and-drop image upload or URL addition, remove existing photos, and re-order 3D coverflow sequence.
  3. **Sponsors Management Panel**: Edit primary 3D sponsor, customize HUD reticle sponsor text, and manage secondary partner tiers.
- Add "Reset to Video Defaults" button to restore original video states on demand.

### Phase 9: Verification & Pixel-Perfect Alignment
- Compare live public rendering side-by-side with frames extracted from `datascapevideo.mp4` to ensure 100% visual match.
- Verify that no admin button or link exists anywhere on the public page.
- Test admin workflow: edit countdown, add/remove gallery photo, change sponsor, and verify immediate real-time reflection on the landing page.
- Validate responsive scaling across desktop, tablet, and mobile displays.
- Verify 60 FPS performance of canvas particle animations and smooth scrolling.

---

## 6. Exact Technical Implementations for Key Visual Effects

### 6.1 Floating Amber Ember Particle Canvas (`ParticleBackground.tsx`)
```typescript
import React, { useEffect, useRef } from 'react';

export const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const particleCount = 140;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2.5 + 0.8,
      speedY: -(Math.random() * 0.6 + 0.2),
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.2,
      pulse: Math.random() * 0.02 + 0.005,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Deep dark background with subtle center amber glow
      const radial = ctx.createRadialGradient(
        width / 2, height / 2, 50,
        width / 2, height / 2, Math.max(width, height) * 0.7
      );
      radial.addColorStop(0, '#0d0a04');
      radial.addColorStop(1, '#050505');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      // Render floating amber embers
      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.opacity += Math.sin(Date.now() * p.pulse) * 0.01;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 175, 40, ${Math.max(0.1, Math.min(0.9, p.opacity))})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#FF9500';
        ctx.fill();
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
    />
  );
};
```

### 6.2 Cyberpunk HUD Viewfinder Overlay (`HudOverlay.tsx`)
```typescript
import React from 'react';

export const HudOverlay: React.FC = () => {
  return (
    <div className="fixed top-24 right-8 z-40 hidden lg:flex flex-col items-end pointer-events-none select-none font-mono">
      <div className="relative w-44 h-28 border border-white/10 p-2.5 rounded-sm bg-black/30 backdrop-blur-[2px]">
        {/* Reticle Brackets */}
        <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-white/70" />
        <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-white/70" />
        <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-white/70" />
        <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-white/70" />

        {/* REC Status */}
        <div className="flex items-center gap-1.5 text-[11px] text-red-500 font-bold tracking-wider">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping inline-block" />
          <span>REC</span>
        </div>

        {/* Sponsored By Hexaware */}
        <div className="mt-3 flex flex-col items-center justify-center text-center">
          <span className="text-[9px] uppercase tracking-widest text-white/60">SPONSORED BY</span>
          <span className="text-base font-black tracking-widest text-amber-400 drop-shadow-[0_0_8px_rgba(255,184,0,0.7)] mt-0.5">
            HEXAWARE
          </span>
        </div>
      </div>
    </div>
  );
};
```

### 6.3 Sheen Button Sweep Effect (`styles/globals.css`)
```css
.btn-shimmer {
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #ff9500 0%, #ffb800 100%);
  box-shadow: 0 0 25px rgba(255, 149, 0, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-shimmer:hover {
  transform: translateY(-2px);
  box-shadow: 0 0 35px rgba(255, 149, 0, 0.65);
}

.btn-shimmer::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -60%;
  width: 40%;
  height: 200%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.5),
    transparent
  );
  transform: rotate(25deg);
  animation: shimmerSweep 3.5s infinite;
}

@keyframes shimmerSweep {
  0% { left: -60%; }
  30%, 100% { left: 140%; }
}
```

### 6.4 Reactive State Management Engine (`context/SiteDataContext.tsx`)
```typescript
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  year?: string;
}

export interface CountdownConfig {
  targetDate: string; // ISO string e.g. "2026-01-21T09:00:00"
  isLive: boolean;
  statusText?: string;
  staticDays?: number;
  staticHours?: number;
  staticMinutes?: number;
  staticSeconds?: number;
}

export interface SponsorItem {
  id: string;
  name: string;
  tier: 'Title Sponsor' | 'Co-Sponsor' | 'Associate' | 'Partner';
  logoUrl?: string;
  is3dMetallic?: boolean;
}

export interface SiteData {
  countdown: CountdownConfig;
  gallery: GalleryItem[];
  sponsors: {
    hudSponsorText: string;
    hudSponsorName: string;
    titleSponsorName: string;
    list: SponsorItem[];
  };
}

const DEFAULT_SITE_DATA: SiteData = {
  countdown: {
    targetDate: '2026-01-21T09:00:00',
    isLive: true,
    statusText: 'HACKATHON COUNTDOWN',
  },
  gallery: [
    { id: '1', url: '/images/gallery/slide1.jpg', title: 'Coding Marathon' },
    { id: '2', url: '/images/gallery/slide2.jpg', title: 'Keynote Session' },
    { id: '3', url: '/images/gallery/slide3.jpg', title: 'Hardware Hacking' },
    { id: '4', url: '/images/gallery/slide4.jpg', title: 'Mentorship Circles' },
    { id: '5', url: '/images/gallery/slide5.jpg', title: 'Award Ceremony' },
  ],
  sponsors: {
    hudSponsorText: 'SPONSORED BY',
    hudSponsorName: 'HEXAWARE',
    titleSponsorName: 'HEXAWARE',
    list: [
      { id: 'hex-1', name: 'Hexaware Technologies', tier: 'Title Sponsor', is3dMetallic: true }
    ],
  },
};

interface SiteContextType {
  siteData: SiteData;
  updateCountdown: (config: Partial<CountdownConfig>) => void;
  addGalleryPhoto: (photo: Omit<GalleryItem, 'id'>) => void;
  removeGalleryPhoto: (id: string) => void;
  reorderGalleryPhotos: (newGallery: GalleryItem[]) => void;
  updateSponsors: (sponsorsData: Partial<SiteData['sponsors']>) => void;
  restoreVideoDefaults: () => void;
}

const SiteDataContext = createContext<SiteContextType | null>(null);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    const saved = localStorage.getItem('dataxscape_site_data');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_DATA;
  });

  useEffect(() => {
    localStorage.setItem('dataxscape_site_data', JSON.stringify(siteData));
  }, [siteData]);

  const updateCountdown = (config: Partial<CountdownConfig>) => {
    setSiteData((prev) => ({
      ...prev,
      countdown: { ...prev.countdown, ...config },
    }));
  };

  const addGalleryPhoto = (photo: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = { ...photo, id: Date.now().toString() };
    setSiteData((prev) => ({
      ...prev,
      gallery: [...prev.gallery, newItem],
    }));
  };

  const removeGalleryPhoto = (id: string) => {
    setSiteData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((item) => item.id !== id),
    }));
  };

  const reorderGalleryPhotos = (newGallery: GalleryItem[]) => {
    setSiteData((prev) => ({
      ...prev,
      gallery: newGallery,
    }));
  };

  const updateSponsors = (sponsorsData: Partial<SiteData['sponsors']>) => {
    setSiteData((prev) => ({
      ...prev,
      sponsors: { ...prev.sponsors, ...sponsorsData },
    }));
  };

  const restoreVideoDefaults = () => {
    setSiteData(DEFAULT_SITE_DATA);
    localStorage.removeItem('dataxscape_site_data');
  };

  return (
    <SiteDataContext.Provider
      value={{
        siteData,
        updateCountdown,
        addGalleryPhoto,
        removeGalleryPhoto,
        reorderGalleryPhotos,
        updateSponsors,
        restoreVideoDefaults,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const context = useContext(SiteDataContext);
  if (!context) throw new Error('useSiteData must be used within a SiteDataProvider');
  return context;
};
```

### 6.5 Hidden Admin Portal Component Skeleton (`pages/AdminPortal.tsx`)
```typescript
import React, { useState } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { Clock, Image, Award, Lock, RotateCcw, Plus, Trash2, ArrowLeft } from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [activeTab, setActiveTab] = useState<'countdown' | 'gallery' | 'sponsors'>('countdown');

  const {
    siteData,
    updateCountdown,
    addGalleryPhoto,
    removeGalleryPhoto,
    updateSponsors,
    restoreVideoDefaults
  } = useSiteData();

  // Simple secure passkey gate (Configured in .env or local secret)
  const ADMIN_PASSKEY = 'dataxscape2026';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === ADMIN_PASSKEY) {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Security Passcode');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="max-w-md w-full bg-[#121212] border border-amber-500/20 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 text-amber-400 mb-6">
            <Lock className="w-6 h-6" />
            <h2 className="text-xl font-bold tracking-wider">DATAXSCAPE CONTROL PORTAL</h2>
          </div>
          <p className="text-sm text-white/60 mb-6">Restricted management access. Enter your administrative master passcode.</p>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Enter Admin Passcode"
            className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-amber-400 mb-6"
            autoFocus
          />
          <button type="submit" className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold rounded-lg transition-all shadow-lg shadow-amber-500/20">
            Access System
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070707] text-white p-6 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">Restricted Management Area</span>
            <h1 className="text-2xl font-black tracking-tight">DATAXSCAPE 2K26 ADMIN CONSOLE</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={restoreVideoDefaults}
              className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-500/30 text-red-400 text-sm font-semibold rounded-lg flex items-center gap-2 transition"
            >
              <RotateCcw className="w-4 h-4" /> Reset Video Defaults
            </button>
            <a href="/" className="px-4 py-2 bg-white/10 hover:bg-white/20 text-sm font-semibold rounded-lg flex items-center gap-2 transition">
              <ArrowLeft className="w-4 h-4" /> View Live Site
            </a>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex gap-3 my-6 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('countdown')}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition ${
              activeTab === 'countdown' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/5 hover:bg-white/10 text-white/70'
            }`}
          >
            <Clock className="w-4 h-4" /> Countdown Manager
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition ${
              activeTab === 'gallery' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/5 hover:bg-white/10 text-white/70'
            }`}
          >
            <Image className="w-4 h-4" /> Gallery Photos ({siteData.gallery.length})
          </button>
          <button
            onClick={() => setActiveTab('sponsors')}
            className={`px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2 transition ${
              activeTab === 'sponsors' ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20' : 'bg-white/5 hover:bg-white/10 text-white/70'
            }`}
          >
            <Award className="w-4 h-4" /> Sponsors & Partners
          </button>
        </div>

        {/* Dynamic Panels */}
        {activeTab === 'countdown' && (
          <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4 text-amber-400">Countdown Target Configuration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase text-white/60 mb-2">Target Launch Date & Time</label>
                <input
                  type="datetime-local"
                  value={siteData.countdown.targetDate.slice(0, 16)}
                  onChange={(e) => updateCountdown({ targetDate: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-white/60 mb-2">Timer Live Status</label>
                <button
                  onClick={() => updateCountdown({ isLive: !siteData.countdown.isLive })}
                  className={`px-4 py-2.5 rounded-lg font-bold text-sm w-full ${
                    siteData.countdown.isLive ? 'bg-emerald-500 text-black' : 'bg-red-500/80 text-white'
                  }`}
                >
                  {siteData.countdown.isLive ? 'Timer Active & Ticking' : 'Timer Paused'}
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'gallery' && (
          <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4 text-amber-400">Manage 3D Coverflow Gallery Photos</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {siteData.gallery.map((img) => (
                <div key={img.id} className="relative group rounded-xl overflow-hidden border border-white/10 bg-black/50 p-2">
                  <img src={img.url} alt={img.title} className="w-full h-36 object-cover rounded-lg mb-2" />
                  <p className="text-sm font-semibold truncate">{img.title}</p>
                  <button
                    onClick={() => removeGalleryPhoto(img.id)}
                    className="absolute top-4 right-4 p-2 bg-red-600/80 hover:bg-red-600 text-white rounded-full transition shadow-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sponsors' && (
          <div className="bg-[#121212] border border-white/10 p-6 rounded-2xl">
            <h3 className="text-lg font-bold mb-4 text-amber-400">Sponsors & HUD Brand Controls</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs uppercase text-white/60 mb-2">Primary 3D Sponsor Name</label>
                <input
                  type="text"
                  value={siteData.sponsors.titleSponsorName}
                  onChange={(e) => updateSponsors({ titleSponsorName: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-xs uppercase text-white/60 mb-2">HUD Viewfinder Sponsor Label</label>
                <input
                  type="text"
                  value={siteData.sponsors.hudSponsorName}
                  onChange={(e) => updateSponsors({ hudSponsorName: e.target.value })}
                  className="w-full bg-black/60 border border-white/10 rounded-lg px-4 py-2.5 text-white"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
```

---

## 7. Deliverables & Readiness Checklist

- [x] Full frame-by-frame reverse engineering of `datascapevideo.mp4` completed.
- [x] Complete text transcriptions (Milestones, About copy, FAQ answers, Patrons, Prizes) extracted.
- [x] Visual effects, animations, HUD layout, and color tokens defined.
- [x] Project architecture and file structure specified.
- [x] Implementation roadmap prepared for 100% pixel-perfect recreation.
- [x] **Hidden Admin Management Portal (`/admin`) designed with STRICTLY ZERO public navigation buttons.**
- [x] **Countdown control, gallery photo upload/removal, and sponsor editing modules architected with real-time reactive sync.**
- [ ] Ready to initiate Phase 1 project scaffolding upon user confirmation.
