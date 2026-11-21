import React from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { VaporCountdown } from '@/components/ui/countdown-vapor-digits';

export const CountdownTimer: React.FC = () => {
  const { siteData, clearBirthAnimation } = useSiteData();
  const { countdown } = siteData;

  const hasStarted = Boolean(countdown.hasStarted || countdown.isRunning);
  const animateBirth = Boolean(countdown.animateBirth);
  const isDormant = !hasStarted && !animateBirth;

  const targetDateForVapor = countdown.isLive && countdown.targetDate
    ? countdown.targetDate
    : '2027-01-21T09:00:00';

  return (
    <div
      id="countdown"
      className="relative w-full max-w-5xl mx-auto my-6 sm:my-8 text-center z-10 bg-transparent min-h-[140px] sm:min-h-[180px] flex flex-col justify-center items-center"
      style={{
        visibility: isDormant ? 'hidden' : 'visible',
        opacity: isDormant ? 0 : 1,
        transition: 'opacity 0.7s ease-out, visibility 0.7s ease-out',
      }}
    >
      {/* Heading in Electric Cyan (Smoothly reveals when countdown begins) */}
      <h3
        className={`relative text-xs sm:text-sm font-mono font-bold tracking-[0.3em] text-cyan-400 uppercase mb-3 drop-shadow-[0_0_15px_rgba(0,210,255,0.7)] transition-all duration-700 ${
          isDormant ? 'opacity-0 pointer-events-none -translate-y-2' : 'opacity-100 translate-y-0'
        }`}
      >
        {countdown.headline || 'COUNTDOWN TO EVENT'}
      </h3>

      {/* Seamless Floating Countdown (Zero Card / Zero Box) */}
      <div
        className="relative z-10 max-w-full mx-auto flex justify-center items-center overflow-x-auto no-scrollbar select-none py-1 bg-transparent border-0 shadow-none"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <VaporCountdown
          targetDate={targetDateForVapor}
          showDays={true}
          isRunning={Boolean(countdown.isRunning)}
          isDormant={isDormant}
          animateBirth={animateBirth}
          onBirthComplete={clearBirthAnimation}
          remainingSeconds={countdown.remainingSeconds}
          targetEpoch={countdown.targetEpoch}
          className="text-cyan-400 font-display drop-shadow-[0_0_35px_rgba(0,210,255,0.85)]"
        />
      </div>
    </div>
  );
};
