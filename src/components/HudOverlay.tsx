import React from 'react';
import { useSiteData } from '../context/SiteDataContext';

export const HudOverlay: React.FC = () => {
  const { siteData } = useSiteData();
  const { hudSponsorPrefix, hudSponsorName } = siteData.sponsors;

  if (!hudSponsorName) {
    return null;
  }

  return (
    <aside
      aria-label="Sponsorship HUD Overlay"
      className="fixed top-24 sm:top-28 right-4 sm:right-8 z-40 hidden md:flex flex-col items-end pointer-events-none select-none font-mono"
    >
      <div className="relative w-40 sm:w-44 h-24 sm:h-28 border border-cyan-500/20 p-2.5 rounded-sm bg-[#020617]/70 backdrop-blur-[3px] shadow-2xl shadow-black/80">
        {/* Reticle 4 Corner Brackets in Cyan */}
        <span className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-cyan-400/80" />
        <span className="absolute -top-1 -right-1 w-3 h-3 border-t-2 border-r-2 border-cyan-400/80" />
        <span className="absolute -bottom-1 -left-1 w-3 h-3 border-b-2 border-l-2 border-cyan-400/80" />
        <span className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-cyan-400/80" />

        {/* REC Status Badge */}
        <div className="flex items-center gap-1.5 text-[11px] text-red-500 font-bold tracking-wider">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-rec-blink inline-block shadow-[0_0_8px_#ef4444]" />
          <span className="text-[10px] tracking-widest text-red-500 font-mono">REC</span>
        </div>

        {/* Sponsor Dynamic Branding */}
        <div className="mt-2.5 flex flex-col items-center justify-center text-center">
          <span className="text-[9px] uppercase tracking-widest text-white/60 font-semibold font-mono">
            {hudSponsorPrefix || 'SPONSORED BY'}
          </span>
          <span className="text-base font-black tracking-widest text-cyan-400 drop-shadow-[0_0_10px_rgba(0,210,255,0.85)] mt-0.5 uppercase font-mono">
            {hudSponsorName}
          </span>
        </div>
      </div>
    </aside>
  );
};
