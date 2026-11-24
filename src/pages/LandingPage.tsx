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
import { SectionTransition } from '../components/ui/SectionTransition';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white selection:bg-cyan-500 selection:text-black overflow-x-hidden">
      {/* 60 FPS Electric Blue / Cyan Bokeh Particle Canvas */}
      <ParticleBackground />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Content Sections with Cyber Transitions */}
      <main className="relative z-10 flex flex-col overflow-x-clip">
        {/* 1. Hero Section (with First Page Countdown) */}
        <SectionTransition
          showLaser={false}
          direction="none"
          ambientAura="cyan"
        >
          <Hero />
        </SectionTransition>

        {/* 2. About Section */}
        <SectionTransition
          id="about"
          sectionNumber="01"
          sectionTitle="MISSION INTEL"
          direction="up"
          ambientAura="cyan"
        >
          <About />
        </SectionTransition>

        {/* 3. Event Timeline */}
        <SectionTransition
          id="timeline"
          sectionNumber="02"
          sectionTitle="ORBITAL ROADMAP"
          direction="left"
          ambientAura="blue"
        >
          <Timeline />
        </SectionTransition>

        {/* 4. 3D Coverflow Gallery */}
        <SectionTransition
          id="gallery"
          sectionNumber="03"
          sectionTitle="VISUAL ARCHIVE"
          direction="right"
          ambientAura="purple"
        >
          <Gallery3D />
        </SectionTransition>

        {/* 5. Sponsors & Innovation Partners */}
        <SectionTransition
          id="sponsors"
          sectionNumber="04"
          sectionTitle="STRATEGIC ALLIANCES"
          direction="left"
          ambientAura="cyan"
        >
          <Sponsors />
        </SectionTransition>

        {/* 6. Leadership Directory (Patrons, Co-Patrons, Convener) */}
        <SectionTransition
          id="patrons"
          sectionNumber="05"
          sectionTitle="LEADERSHIP COUNCIL"
          direction="right"
          ambientAura="indigo"
        >
          <Patrons />
        </SectionTransition>

        {/* 7. Prizes & Awards Podium */}
        <SectionTransition
          id="prizes"
          sectionNumber="06"
          sectionTitle="REWARDS PODIUM"
          direction="up"
          ambientAura="gold"
        >
          <Prizes />
        </SectionTransition>

        {/* 8. Interactive FAQ Accordion */}
        <SectionTransition
          id="faq"
          sectionNumber="07"
          sectionTitle="INTELLIGENCE FAQ"
          direction="up"
          ambientAura="cyan"
        >
          <Faq />
        </SectionTransition>
      </main>

      {/* 9. Footer & Communication Channels */}
      <SectionTransition
        id="contact"
        sectionNumber="08"
        sectionTitle="COMMUNICATION TERMINAL"
        direction="none"
        showLaser={true}
        ambientAura="blue"
      >
        <Footer />
      </SectionTransition>
    </div>
  );
};
