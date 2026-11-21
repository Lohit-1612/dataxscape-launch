import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative w-full z-10 py-10 border-t border-cyan-500/20 bg-[#020617]/95 text-center backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center space-y-3">
        <img
          src="/images/datascapelogo.jpeg"
          alt="DATAXSCAPE 2.0"
          className="h-9 sm:h-11 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity drop-shadow-[0_0_15px_rgba(0,210,255,0.4)]"
        />
        <p className="text-xs sm:text-sm text-white/70 font-normal">
          © 2026 DataXscape 2.0. All rights reserved.
        </p>
        <p className="text-[11px] sm:text-xs text-cyan-400/80 font-medium">
          Organized by Department of AI &amp; DS, Panimalar Engineering College
        </p>
      </div>
    </footer>
  );
};
