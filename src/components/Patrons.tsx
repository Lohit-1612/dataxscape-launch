import React from 'react';
import { PATRONS, CO_PATRONS, CONVENER, Patron } from '../data/patronsData';
import { motion } from 'framer-motion';

export const Patrons: React.FC = () => {
  const renderCard = (p: Patron, index: number) => (
    <motion.div
      key={p.name}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className="group flex flex-col items-center bg-[#0c182c]/85 border border-white/10 hover:border-cyan-500/50 rounded-2xl p-6 sm:p-7 shadow-[0_10px_25px_rgba(0,0,0,0.7)] hover:shadow-[0_15px_35px_rgba(0,210,255,0.2)] backdrop-blur-sm transition-all duration-300 text-center relative overflow-hidden"
    >
      {/* Subtle Ambient Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/0 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      {/* Circular Avatar with Electric Blue Metallic Ring */}
      <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-gradient-to-tr from-cyan-500 via-sky-300 to-blue-600 shadow-[0_0_20px_rgba(0,210,255,0.6)] group-hover:shadow-[0_0_30px_rgba(0,210,255,0.85)] transition-shadow duration-300 mb-4">
        <img
          src={p.image}
          alt={p.name}
          className="w-full h-full object-cover rounded-full"
        />
      </div>

      {/* Name in Luminous Cyan */}
      <h4 className="text-base sm:text-lg font-bold text-cyan-400 group-hover:text-cyan-300 transition-colors mb-1 leading-snug">
        {p.name}
      </h4>

      {/* Role / Designation */}
      <p className="text-xs sm:text-sm text-white/75 font-medium">
        {p.role}
      </p>
    </motion.div>
  );

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      {/* 1. PATRONS */}
      <div className="mb-16">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-widest uppercase mb-10 font-display">
          PATRONS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {PATRONS.map((p, i) => renderCard(p, i))}
        </div>
      </div>

      {/* 2. CO-PATRONS */}
      <div className="mb-16">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-widest uppercase mb-10 font-display">
          CO-PATRONS
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {CO_PATRONS.map((p, i) => renderCard(p, i))}
        </div>
      </div>

      {/* 3. CONVENER */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white text-center tracking-widest uppercase mb-10 font-display">
          CONVENER
        </h3>
        <div className="max-w-sm mx-auto">
          {renderCard(CONVENER, 0)}
        </div>
      </div>
    </section>
  );
};
