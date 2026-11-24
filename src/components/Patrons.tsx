import React from 'react';
import { PATRONS, CO_PATRONS, CONVENER, Patron } from '../data/patronsData';

export const Patrons: React.FC = () => {
  const renderCard = (p: Patron) => (
    <div
      key={p.name}
      className="flex flex-col items-center bg-[#0c182c]/85 border border-white/10 hover:border-cyan-500/50 rounded-2xl p-6 sm:p-7 shadow-[0_10px_25px_rgba(0,0,0,0.7)] backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] text-center"
    >
      {/* Circular Avatar with Electric Blue Metallic Ring */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-500 via-sky-300 to-blue-600 shadow-[0_0_20px_rgba(0,210,255,0.6)] mb-4">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Name in Luminous Cyan */}
      <h4 className="text-base sm:text-lg font-bold text-cyan-400 mb-1 leading-snug">
        {p.name}
      </h4>

      {/* Role / Designation */}
      <p className="text-xs sm:text-sm text-white/75 font-medium">
        {p.role}
      </p>
    </div>
  );

  return (
    <section id="patrons" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 scroll-mt-20">
      {/* 1. PATRONS */}
      <div className="mb-16">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-widest uppercase mb-10 font-display">
          PATRONS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATRONS.map(renderCard)}
        </div>
      </div>

      {/* 2. CO-PATRONS */}
      <div className="mb-16">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-widest uppercase mb-10 font-display">
          CO-PATRONS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {CO_PATRONS.map(renderCard)}
        </div>
      </div>

      {/* 3. CONVENER */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-widest uppercase mb-10 font-display">
          CONVENER
        </h3>
        <div className="max-w-sm mx-auto">
          {renderCard(CONVENER)}
        </div>
      </div>
    </section>
  );
};
