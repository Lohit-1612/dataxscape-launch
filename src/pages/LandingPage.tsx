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
import { VenueMap } from '../components/VenueMap';
import { Contact } from '../components/Contact';
import { Footer } from '../components/Footer';

export const LandingPage: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#020617] text-white selection:bg-cyan-500 selection:text-black">
      {/* 60 FPS Electric Blue / Cyan Bokeh Particle Canvas */}
      <ParticleBackground />

      {/* Navigation Header (Strictly Zero Admin Buttons) */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Hero Section (with First Page Countdown) */}
        <Hero />

        {/* 2. About Section */}
        <About />

        {/* 4. Event Timeline */}
        <Timeline />

        {/* 5. 3D Coverflow Gallery */}
        <Gallery3D />

        {/* 6. Sponsors & Innovation Partners (Picture Rail Gallery) */}
        <Sponsors />

        {/* 7. Leadership Directory (Patrons, Co-Patrons, Convener) */}
        <Patrons />

        {/* 7. Prizes & Awards Podium */}
        <Prizes />

        {/* 8. Interactive FAQ Accordion */}
        <Faq />

        {/* 10. Venue Location Map */}
        <VenueMap />

        {/* 11. Contact Form & Google Form Link */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
