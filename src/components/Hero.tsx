import React from 'react';
import { CountdownTimer } from './CountdownTimer';
import { Sparkles } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center pt-24 sm:pt-32 pb-10 sm:pb-14 px-3 sm:px-6 text-center z-10 overflow-hidden">
      {/* Ambient Radial Spotlight Aura in Electric Blue */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[650px] md:w-[850px] h-[340px] sm:h-[550px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-transparent rounded-full blur-[90px] sm:blur-[130px] pointer-events-none -z-10" />

      {/* Luxury Floating Pill Badge */}
      <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 via-sky-400/20 to-blue-500/10 border border-cyan-400/30 text-cyan-300 text-[10px] sm:text-xs font-semibold tracking-widest uppercase backdrop-blur-md mb-4 sm:mb-6 shadow-[0_0_20px_rgba(0,210,255,0.25)] animate-pulse">
        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
        <span>National Level 24-Hour Hackathon</span>
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#00D2FF]" />
      </div>

      {/* DataXscape Logo with Luxury Electric Blue Halo Presentation */}
      <div className="relative mb-4 sm:mb-5 group cursor-pointer max-w-full">
        {/* Outer Rotating Subtle Halo */}
        <div className="absolute -inset-6 sm:-inset-10 bg-gradient-to-r from-cyan-500/25 via-sky-400/20 to-blue-600/25 rounded-full blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 pointer-events-none" />

        {/* High-Tech Reticle Accents */}
        <div className="relative p-2 sm:p-4">
          <img
            src="/images/datascapelogo.jpeg"
            alt="DATAXSCAPE 2.0 Official Logo"
            className="relative max-w-[92vw] sm:max-w-xl md:max-w-2xl lg:max-w-3xl h-auto object-contain mx-auto drop-shadow-[0_15px_45px_rgba(0,210,255,0.45)] transition-all duration-500 group-hover:scale-[1.03] group-hover:drop-shadow-[0_20px_60px_rgba(0,210,255,0.65)]"
          />
        </div>
      </div>

      {/* Institutional Subtitle with Metallic Cyan / Blue Gradient */}
      <h2 className="text-xs sm:text-base md:text-lg font-extrabold tracking-[0.2em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-blue-200 mb-2 font-display px-2 max-w-xl mx-auto drop-shadow-sm">
        Department of Artificial Intelligence and Data Science
      </h2>

      {/* Vision Statement */}
      <p className="text-[11px] sm:text-sm md:text-base text-white/75 max-w-xl mx-auto font-light leading-relaxed mb-4 sm:mb-6 px-3">
        Unlocking possibilities through innovation, collaboration, and the power of data.
      </p>

      {/* Live Vapor Countdown placed on the First Page (Seamless with no card) */}
      <CountdownTimer />
    </section>
  );
};
