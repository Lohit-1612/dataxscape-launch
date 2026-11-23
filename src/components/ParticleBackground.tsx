import React, { useRef, useEffect } from 'react';

export const ParticleBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Ensure background video autoplays reliably across all mobile and desktop browsers
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.defaultMuted = true;
      video.play().catch((err) => {
        console.warn('Video background autoplay note:', err);
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Pristine High-Definition Particle Video Background (Watermark Removed) */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/images/bg-particles-poster.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-85 transition-opacity duration-1000 scale-[1.02]"
      >
        <source src="/videos/bg-particles.mp4" type="video/mp4" />
      </video>

      {/* Atmospheric Vignette & Contrast Gradients for Maximum Legibility */}
      <div className="absolute inset-0 bg-[#020617]/30 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617]/90 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#020617]/40 via-transparent to-[#020617]/40 pointer-events-none" />
    </div>
  );
};

export default ParticleBackground;
