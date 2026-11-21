# DATAXSCAPE 2K26 — National Hackathon Website

A 100% pixel-perfect recreation of the official **DataXscape 2k26** 24-hour national data science hackathon landing page organized by the **Department of Artificial Intelligence and Data Science at Panimalar Engineering College, Chennai** and sponsored by **Hexaware Technologies**.

---

## 🚀 Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` (or the port indicated in terminal).

### 3. Production Build
```bash
npm run build
```

---

## 🔐 Hidden Admin Management Portal

> **Strict Privacy Requirement:** There is **NO admin button or link** anywhere on the public website. The public interface matches the video 100%.

### How to Access the Admin Portal
You can open the admin dashboard using either of two methods:
1. **Direct URL / Hash**:
   Navigate directly in your browser to:
   - `http://localhost:3000/#admin` or `http://localhost:3000/admin`
2. **Secret Developer Keyboard Shortcut**:
   Press **`Ctrl + Shift + Alt + A`** on any page to immediately toggle the admin prompt.

### Authentication
- **Default Master Passcode**: `dataxscape2026`

### Admin Capabilities
1. **⏱ Countdown Manager**:
   - Set custom target launch date & time with interactive picker.
   - Switch between **Live Auto Ticking** and **Static Override Numbers** (Days, Hours, Minutes, Seconds).
   - Change headline text.
2. **🖼 3D Gallery Photos Manager**:
   - Add new photos by uploading local image files (instant data-URL encoding) or pasting image URLs.
   - Delete/remove existing slides.
   - Reorder slides (move up/down) to choose which photo sits front-and-center in the 3D perspective coverflow.
3. **🤝 Sponsors & HUD Reticle Manager**:
   - Change the Title Sponsor name (displays as 3D gold emblem).
   - Change the HUD Viewfinder sponsor label (`SPONSORED BY HEXAWARE`).
   - Edit the sponsors section tagline.
4. **🔄 Reset Defaults**:
   - One-click restore button to revert all settings back to the exact video state.

---

## 🎨 Implemented Video Sections & Components

| Section | Component | Features |
| :--- | :--- | :--- |
| **Sticky Navbar** | `Navbar.tsx` | Panimalar emblem & institutional hierarchy on left, Data Science Club emblem & title on right, smooth navigation, glowing "Our Community" CTA (No admin button). |
| **Fixed HUD Reticle** | `HudOverlay.tsx` | Cyberpunk top-right viewfinder, blinking `[● REC]` red dot, `SPONSORED BY HEXAWARE`. |
| **Hero** | `Hero.tsx` | 3D Metallic Gold DATAXSCAPE logo (`datascape-removed.png`), AI & DS department subtitle, glowing `Register Now` button. |
| **Countdown Timer** | `CountdownTimer.tsx` | Mechanical 4-card flip clock (Days : Hours : Mins : Secs) with divider slits and live ticking. |
| **About Section** | `About.tsx` | Full event description text alongside framed previous edition faculty & student team photograph. |
| **Event Timeline** | `Timeline.tsx` | Central amber spine with 5 alternating milestone cards (Dec 1, Jan 10, Jan 21, Jan 22, Jan 23). |
| **3D Gallery** | `Gallery3D.tsx` | 3D Coverflow perspective carousel with realistic floor reflections (`-webkit-box-reflect`). |
| **Patrons** | `Patrons.tsx` | Patrons (4), Co-Patrons (2), and Convener (1) with golden circular border avatars. |
| **Prizes & Awards** | `Prizes.tsx` | 3-tier podium: Champion (₹75,000), Runner Up (₹50,000), 2nd Runner Up (₹25,000). |
| **Sponsors** | `Sponsors.tsx` | 3D embossed metallic golden **HEXAWARE** emblem. |
| **FAQ Accordion** | `Faq.tsx` | Two-column 8-question grid with smooth expand/collapse and chevron rotation. |
| **Venue Map** | `VenueMap.tsx` | Embedded Google Map of Panimalar Engineering College, Chennai. |
| **Let's Connect** | `Contact.tsx` | Contact info, Google Forms CTA, social links, and contact form with animated shimmer submit button and confetti. |
| **Footer** | `Footer.tsx` | Copyright & developer attribution (`Developed by P.Saravanan`). |
| **Particle Background** | `ParticleBackground.tsx` | 60 FPS HTML5 canvas engine rendering floating golden ember particles with ambient radial lighting. |

---

## 🛠 Tech Stack
- **Framework:** React 18 + Vite + TypeScript
- **Styling:** Tailwind CSS + Custom CSS Keyframe Animations
- **Icons:** Lucide React + Custom Inline SVGs
- **Celebration Effects:** Canvas-Confetti
- **State Management:** React Context (`SiteDataContext.tsx`) + LocalStorage
