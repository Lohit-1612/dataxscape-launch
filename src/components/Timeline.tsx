import React from 'react';
import { Sparkles, Orbit } from 'lucide-react';
import RadialOrbitalTimeline from '@/components/ui/radial-orbital-timeline';
import { RADIAL_TIMELINE_DATA } from '../data/timelineData';

export const Timeline: React.FC = () => {
  return (
    <section id="timeline" className="relative py-16 sm:py-24 px-3 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10 scroll-mt-20 overflow-visible">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>ROADMAP &amp; MILESTONES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 font-display">
          Event <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Timeline</span>
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-xl mx-auto font-normal">
          Interactive Orbital Roadmap — Click any phase node to explore schedule details, energy progress, and connected phases.
        </p>
      </div>

      {/* Radial Orbital Timeline Component (Transparent Seamless Background) */}
      <div className="relative w-full bg-transparent overflow-visible">
        <RadialOrbitalTimeline timelineData={RADIAL_TIMELINE_DATA} />

        {/* Footer Interaction Guide */}
        <div className="mt-2 text-center pb-3">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs text-cyan-400/70 font-mono">
            <Orbit className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '8s' }} />
            Click an orbit node to expand • Click center or background to resume auto-orbit
          </span>
        </div>
      </div>
    </section>
  );
};
