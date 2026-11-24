import React from 'react';
import { ParticleBackground } from '../components/ParticleBackground';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Timeline } from '../components/Timeline';
import { Gallery3D } from '../components/Gallery3D';
import { Sponsors } from '../components/Sponsors';
import { Patrons } from '../components/Patrons';
import { Prizes } from '../components/Prizes';
import { Faq } from '../components/Faq';
import { Footer } from '../components/Footer';
import { HorizontalSectionTransition } from '../components/ui/SectionTransition';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 60 FPS Electric Blue / Cyan Bokeh Particle Canvas */}
      <ParticleBackground />

      {/* Navigation Header (Strictly Zero Admin Buttons) */}
      <Navbar />

      {/* Main Content Sections with Alternating Cyber Horizontal Transitions */}
      <main className="relative z-10 flex flex-col overflow-x-clip">
        {/* 1. Hero Section (with First Page Countdown) - Enters from Left */}
        <HorizontalSectionTransition direction="left" showLaserBeam={false}>
          <Hero />
        </HorizontalSectionTransition>

        {/* 2. About Section - Enters from Right */}
        <HorizontalSectionTransition direction="right" showLaserBeam={true}>
          <About />
        </HorizontalSectionTransition>

        {/* 3. Event Timeline - Enters from Left */}
        <HorizontalSectionTransition direction="left" showLaserBeam={true}>
          <Timeline />
        </HorizontalSectionTransition>

        {/* 4. 3D Coverflow Gallery - Enters from Right */}
        <HorizontalSectionTransition direction="right" showLaserBeam={true}>
          <Gallery3D />
        </HorizontalSectionTransition>

        {/* 5. Sponsors & Innovation Partners - Enters from Left */}
        <HorizontalSectionTransition direction="left" showLaserBeam={true}>
          <Sponsors />
        </HorizontalSectionTransition>

        {/* 6. Leadership Directory - Enters from Right */}
        <HorizontalSectionTransition direction="right" showLaserBeam={true} id="patrons">
          <Patrons />
        </HorizontalSectionTransition>

        {/* 7. Prizes & Awards Podium - Enters from Left */}
        <HorizontalSectionTransition direction="left" showLaserBeam={true}>
          <Prizes />
        </HorizontalSectionTransition>

        {/* 8. Interactive FAQ Accordion - Enters from Right */}
        <HorizontalSectionTransition direction="right" showLaserBeam={true}>
          <Faq />
        </HorizontalSectionTransition>
      </main>

      {/* Footer - Enters from Left */}
      <HorizontalSectionTransition direction="left" showLaserBeam={false}>
        <Footer />
      </HorizontalSectionTransition>
    </div>
  );
};
