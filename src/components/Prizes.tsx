import React from 'react';
import { Sparkles, Trophy, Award, Gift, CheckCircle } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';

const EXPO_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const Prizes: React.FC = () => {
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <section className="relative py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto z-10">
      {/* Header */}
      <div className="text-center mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>REWARDS & RECOGNITION</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 font-display">
          ₹1,50,000+ <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Prize Pool</span>
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-normal px-2">
          Compete for life-changing cash awards, direct corporate mentorship, and career-launching opportunities.
        </p>
      </div>

      {/* 3-Tier Luxury Podium Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end max-w-5xl mx-auto mb-12">
        {/* RUNNER UP (2nd Place - Left) */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 'some', margin: '0px 0px -30px 0px' }}
          transition={{ duration: 0.7, delay: 0.14, ease: EXPO_EASE }}
          whileHover={prefersReducedMotion ? undefined : { y: -6, transition: { duration: 0.25 } }}
          className="order-2 md:order-1 flex flex-col bg-gradient-to-b from-[#0e1d35]/95 via-[#091529]/95 to-[#040b17]/95 border border-sky-500/30 hover:border-sky-400/60 rounded-3xl p-6 sm:p-7 shadow-[0_15px_35px_rgba(56,189,248,0.15)] backdrop-blur-md relative transition-colors duration-300"
        >
          {/* Badge Icon */}
          <div className="relative -mt-12 flex justify-center mb-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-sky-500 via-blue-500 to-cyan-400 p-0.5 shadow-[0_8px_25px_rgba(56,189,248,0.5)]">
              <div className="w-full h-full bg-[#081224] rounded-[14px] flex items-center justify-center">
                <Trophy className="w-9 h-9 text-sky-400" />
              </div>
            </div>
          </div>

          <div className="text-center mb-5">
            <span className="text-[11px] font-mono font-bold tracking-widest text-sky-400 uppercase px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 inline-block mb-2">
              2ND PLACE
            </span>
            <h4 className="text-lg font-bold text-white tracking-wider uppercase mb-1">
              RUNNER UP
            </h4>
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-sky-300 via-white to-blue-200 font-mono tracking-wider drop-shadow-sm">
              ₹50,000
            </div>
          </div>

          {/* Perks list */}
          <div className="space-y-2 border-t border-white/10 pt-4 text-left">
            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <CheckCircle className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>Runner-Up Trophy + Silver Medals</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <CheckCircle className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>Direct Industry Mentorship Session</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <CheckCircle className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>Executive Swag Kit + Certificate</span>
            </div>
          </div>

          <div className="w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-60 mt-5" />
        </motion.div>

        {/* CHAMPION (1st Place - Center Elevated) */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 36, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 'some', margin: '0px 0px -30px 0px' }}
          transition={{ duration: 0.75, delay: 0.05, ease: EXPO_EASE }}
          whileHover={prefersReducedMotion ? undefined : { y: -8, transition: { duration: 0.25 } }}
          className="order-1 md:order-2 flex flex-col bg-gradient-to-b from-[#0a2040]/95 via-[#061630]/95 to-[#030d1c]/95 border-2 border-cyan-400/80 rounded-3xl p-7 sm:p-8 shadow-[0_20px_60px_rgba(0,210,255,0.4)] backdrop-blur-xl relative transition-colors duration-300 z-20 md:mb-5"
        >
          {/* Champion Crown Aura */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 text-black text-[10px] font-black tracking-widest uppercase shadow-[0_0_15px_rgba(0,210,255,0.8)]">
            ★ GRAND WINNER ★
          </div>

          {/* 3D Gold / Cyan Badge Icon */}
          <div className="relative -mt-10 flex justify-center mb-4">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-cyan-400 via-sky-300 to-blue-600 p-1 shadow-[0_10px_35px_rgba(0,210,255,0.85)] animate-pulse">
              <div className="w-full h-full bg-[#030d1c] rounded-[12px] flex items-center justify-center">
                <Trophy className="w-12 h-12 text-cyan-400 drop-shadow-[0_0_12px_rgba(0,210,255,0.95)]" />
              </div>
            </div>
          </div>

          <div className="text-center mb-6">
            <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-400/40 inline-block mb-2">
              1ST PLACE
            </span>
            <h4 className="text-xl font-black text-cyan-400 tracking-wider uppercase mb-1 font-display">
              CHAMPION
            </h4>
            <div className="text-4xl sm:text-5xl font-black text-white font-mono tracking-wider drop-shadow-[0_0_20px_rgba(0,210,255,0.8)]">
              ₹75,000
            </div>
          </div>

          {/* Perks list */}
          <div className="space-y-2.5 border-t border-cyan-400/20 pt-4 text-left">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
              <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Grand Champion Trophy + Gold Medals</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
              <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Fast-Track Industry Internship Interviews</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs sm:text-sm text-white/90 font-medium">
              <CheckCircle className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>Exclusive Premium Tech Goodies + Winner Shield</span>
            </div>
          </div>

          <div className="w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-6" />
        </motion.div>

        {/* 2ND RUNNER UP (3rd Place - Right) */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 28, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 'some', margin: '0px 0px -30px 0px' }}
          transition={{ duration: 0.7, delay: 0.22, ease: EXPO_EASE }}
          whileHover={prefersReducedMotion ? undefined : { y: -6, transition: { duration: 0.25 } }}
          className="order-3 md:order-3 flex flex-col bg-gradient-to-b from-[#0a182f]/95 via-[#061122]/95 to-[#030a17]/95 border border-blue-500/30 hover:border-blue-500/60 rounded-3xl p-6 sm:p-7 shadow-[0_15px_35px_rgba(37,99,235,0.18)] backdrop-blur-md relative transition-colors duration-300"
        >
          {/* Badge Icon */}
          <div className="relative -mt-12 flex justify-center mb-3">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-cyan-400 p-0.5 shadow-[0_8px_25px_rgba(37,99,235,0.5)]">
              <div className="w-full h-full bg-[#061122] rounded-[14px] flex items-center justify-center">
                <Trophy className="w-9 h-9 text-blue-400" />
              </div>
            </div>
          </div>

          <div className="text-center mb-5">
            <span className="text-[11px] font-mono font-bold tracking-widest text-blue-400 uppercase px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 inline-block mb-2">
              3RD PLACE
            </span>
            <h4 className="text-lg font-bold text-white tracking-wider uppercase mb-1">
              2ND RUNNER UP
            </h4>
            <div className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-cyan-200 font-mono tracking-wider drop-shadow-sm">
              ₹25,000
            </div>
          </div>

          {/* Perks list */}
          <div className="space-y-2 border-t border-white/10 pt-4 text-left">
            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>2nd Runner-Up Trophy + Bronze Medals</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>Expert Project Evaluation Feedback</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-white/80">
              <CheckCircle className="w-4 h-4 text-blue-400 flex-shrink-0" />
              <span>Executive Swag Kit + Certificate</span>
            </div>
          </div>

          <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-60 mt-5" />
        </motion.div>
      </div>

      {/* Special Category Awards Banner in Blue */}
      <div className="bg-gradient-to-r from-cyan-500/10 via-sky-400/15 to-blue-500/10 border border-cyan-400/30 rounded-2xl p-4 sm:p-5 text-center max-w-4xl mx-auto backdrop-blur-sm shadow-lg">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-white/90">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-cyan-300">Best All-Girls Team Award</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-cyan-300">Most Innovative AI Solution</span>
          </div>
          <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold text-cyan-300">Best UI/UX Design Trophy</span>
          </div>
        </div>
      </div>
    </section>
  );
};
