import React from 'react';
import { motion, type Variants } from 'framer-motion';

export type TransitionDirection = 'up' | 'left' | 'right' | 'none';
export type AuraColor = 'cyan' | 'blue' | 'indigo' | 'purple' | 'gold' | 'emerald';

interface SectionTransitionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  direction?: TransitionDirection;
  sectionNumber?: string;
  sectionTitle?: string;
  showLaser?: boolean;
  ambientAura?: AuraColor;
  delay?: number;
}

const AURA_GRADIENTS: Record<AuraColor, { aura: string; laser: string; badge: string; text: string; glow: string }> = {
  cyan: {
    aura: 'from-cyan-500/12 via-sky-500/8 to-transparent',
    laser: 'from-transparent via-cyan-400 to-transparent',
    badge: 'border-cyan-400/40 bg-cyan-950/40 text-cyan-300',
    text: 'text-cyan-400',
    glow: 'shadow-[0_0_15px_#00D2FF]',
  },
  blue: {
    aura: 'from-blue-600/12 via-cyan-600/8 to-transparent',
    laser: 'from-transparent via-blue-400 to-transparent',
    badge: 'border-blue-400/40 bg-blue-950/40 text-blue-300',
    text: 'text-blue-400',
    glow: 'shadow-[0_0_15px_#3B82F6]',
  },
  indigo: {
    aura: 'from-indigo-600/12 via-blue-600/8 to-transparent',
    laser: 'from-transparent via-indigo-400 to-transparent',
    badge: 'border-indigo-400/40 bg-indigo-950/40 text-indigo-300',
    text: 'text-indigo-400',
    glow: 'shadow-[0_0_15px_#6366F1]',
  },
  purple: {
    aura: 'from-purple-600/12 via-indigo-600/8 to-transparent',
    laser: 'from-transparent via-purple-400 to-transparent',
    badge: 'border-purple-400/40 bg-purple-950/40 text-purple-300',
    text: 'text-purple-400',
    glow: 'shadow-[0_0_15px_#A855F7]',
  },
  gold: {
    aura: 'from-amber-500/12 via-yellow-600/8 to-transparent',
    laser: 'from-transparent via-amber-400 to-transparent',
    badge: 'border-amber-400/40 bg-amber-950/40 text-amber-300',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_15px_#F59E0B]',
  },
  emerald: {
    aura: 'from-emerald-500/12 via-teal-600/8 to-transparent',
    laser: 'from-transparent via-emerald-400 to-transparent',
    badge: 'border-emerald-400/40 bg-emerald-950/40 text-emerald-300',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_15px_#10B981]',
  },
};

/**
 * SectionTransition:
 * A cinematic cyber-themed section boundary and viewport entrance transition.
 * Features an animated laser sweep with traveling photon pulse, a center telemetry
 * HUD indicator, and atmospheric aura tailored to the section's visual theme.
 */
export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  id,
  className = '',
  direction = 'up',
  sectionNumber,
  sectionTitle,
  showLaser = true,
  ambientAura = 'cyan',
  delay = 0,
}) => {
  const theme = AURA_GRADIENTS[ambientAura] || AURA_GRADIENTS.cyan;

  // Compute directional entrance offsets
  let initialX = 0;
  let initialY = 0;
  if (direction === 'up') initialY = 36;
  else if (direction === 'left') initialX = -45;
  else if (direction === 'right') initialX = 45;

  const contentVariants: Variants = {
    hidden: {
      opacity: 0,
      x: initialX,
      y: initialY,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1], // Exponential cubic bezier deceleration
      },
    },
  };

  return (
    <div
      id={id}
      className={`relative w-full overflow-x-clip scroll-mt-24 ${className}`}
    >
      {/* 1. Animated Cyber Laser Divider & Telemetry Node */}
      {showLaser && (
        <div className="relative w-full flex items-center justify-center my-2 pointer-events-none z-20 select-none">
          {/* Main Laser Line expanding from center */}
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 1.1,
              delay: delay + 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`w-[94%] max-w-6xl h-[1px] bg-gradient-to-r ${theme.laser} ${theme.glow}`}
          />

          {/* Traveling Photon Energy Pulse */}
          <motion.div
            initial={{ x: '-30%', opacity: 0 }}
            whileInView={{
              x: ['-40%', '40%', '-40%'],
              opacity: [0, 1, 0],
            }}
            viewport={{ once: true }}
            transition={{
              repeat: Infinity,
              duration: 5.5,
              ease: 'easeInOut',
              delay: delay + 0.3,
            }}
            className="absolute top-1/2 -translate-y-1/2 w-28 h-[2px] bg-gradient-to-r from-transparent via-white to-transparent blur-[0.5px]"
          />

          {/* Center Telemetry HUD Badge (if section title/number provided) */}
          {(sectionNumber || sectionTitle) && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: delay + 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="absolute top-1/2 -translate-y-1/2 px-3.5 py-0.5 rounded-full backdrop-blur-md border flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase shadow-lg z-10"
              style={{
                backgroundColor: 'rgba(2, 6, 23, 0.85)',
                borderColor: 'rgba(0, 210, 255, 0.25)',
              }}
            >
              {/* Pulsing Core Indicator */}
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400" />
              </span>

              {sectionNumber && (
                <span className="text-cyan-400 font-bold">{sectionNumber}</span>
              )}
              {sectionNumber && sectionTitle && (
                <span className="text-white/30">•</span>
              )}
              {sectionTitle && (
                <span className="text-white/70 font-semibold tracking-wider">
                  {sectionTitle}
                </span>
              )}
            </motion.div>
          )}
        </div>
      )}

      {/* 2. Atmospheric Nebula Aura */}
      <div
        className={`absolute top-1/4 left-1/2 -translate-x-1/2 w-[340px] sm:w-[650px] md:w-[900px] h-[220px] sm:h-[350px] bg-gradient-to-b ${theme.aura} rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10`}
      />

      {/* 3. Main Viewport Content Reveal */}
      <motion.div
        variants={contentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08, margin: '0px 0px -60px 0px' }}
        className="relative w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SectionTransition;
