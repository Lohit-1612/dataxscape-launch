import React from 'react';
import { motion, type Variants } from 'framer-motion';

export type HorizontalDirection = 'left' | 'right';

interface HorizontalSectionTransitionProps {
  children: React.ReactNode;
  direction?: HorizontalDirection;
  className?: string;
  id?: string;
  delay?: number;
  showLaserBeam?: boolean;
}

/**
 * HorizontalSectionTransition:
 * Provides a cinematic, high-framerate horizontal slide & blur-dissipate transition
 * for each section as it scrolls into view, complete with an electric cyan laser beam wipe.
 */
export const HorizontalSectionTransition: React.FC<HorizontalSectionTransitionProps> = ({
  children,
  direction = 'left',
  className = '',
  id,
  delay = 0,
  showLaserBeam = true,
}) => {
  const isLeft = direction === 'left';
  const initialX = isLeft ? -55 : 55;

  const sectionVariants: Variants = {
    hidden: {
      opacity: 0,
      x: initialX,
      filter: 'blur(8px)',
    },
    visible: {
      opacity: 1,
      x: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1], // Cubic bezier exponential out for buttery smooth deceleration
      },
    },
  };

  return (
    <div
      id={id}
      className={`relative w-full overflow-x-clip ${className}`}
    >
      {/* Dynamic Cyber Laser Sweep across the top of the section */}
      {showLaserBeam && (
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 1.1,
            delay: delay + 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          style={{ transformOrigin: isLeft ? 'left' : 'right' }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[92%] max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_14px_#00D2FF] pointer-events-none z-20"
        />
      )}

      {/* Ambient Horizontal Entry Glow on originating side */}
      <div
        className={`absolute top-1/4 ${
          isLeft ? '-left-16 sm:-left-24' : '-right-16 sm:-right-24'
        } w-48 sm:w-72 h-48 sm:h-72 ${
          isLeft ? 'bg-cyan-500/10' : 'bg-blue-600/10'
        } rounded-full blur-[80px] pointer-events-none -z-10`}
      />

      {/* Main Motion Section Container */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="relative w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default HorizontalSectionTransition;
