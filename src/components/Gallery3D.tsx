import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const Gallery3D: React.FC = () => {
  const { siteData } = useSiteData();
  const photos = siteData.gallery;
  const intervalSeconds = siteData.galleryIntervalSeconds ?? 4;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Responsive screen detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch swipe support for smooth mobile interaction
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    if (distance > 40) {
      nextSlide();
    } else if (distance < -40) {
      prevSlide();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Auto-slide based on configured interval in seconds
  useEffect(() => {
    if (photos.length === 0) return;
    const ms = Math.max(500, intervalSeconds * 1000);
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % photos.length);
    }, ms);
    return () => clearInterval(timer);
  }, [photos.length, intervalSeconds]);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  if (photos.length === 0) return null;

  return (
    <section className="relative py-16 sm:py-24 px-3 sm:px-4 overflow-hidden z-10">
      {/* Ambient Floor Spotlight in Electric Cyan */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[300px] sm:w-[600px] h-[150px] bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>VISUAL ARCHIVES</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 font-display">
          3D Hall of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Innovation</span>
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-normal">
          Relive unforgettable breakthroughs, teamwork, and celebrations from past hackathons.
        </p>
      </div>

      {/* 3D Coverflow Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative max-w-5xl mx-auto h-[290px] sm:h-[400px] md:h-[440px] flex items-center justify-center [perspective:1200px]"
      >
        {photos.map((item, index) => {
          // Calculate relative position to active index
          const total = photos.length;
          let offset = index - activeIndex;
          if (offset > total / 2) offset -= total;
          if (offset < -total / 2) offset += total;

          const isActive = offset === 0;
          const isLeft = offset < 0;
          const isRight = offset > 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          // Responsive 3D transform styles
          const stepX = isMobile ? 80 : 180;
          const translateX = offset * stepX;
          const translateZ = isActive ? (isMobile ? 60 : 110) : (isMobile ? -80 : -130);
          const rotateY = isActive ? 0 : isLeft ? (isMobile ? 28 : 38) : (isMobile ? -28 : -38);
          const scale = isActive ? (isMobile ? 1.05 : 1.1) : (isMobile ? 0.78 : 0.85);
          const zIndex = 20 - Math.abs(offset) * 5;
          const opacity = Math.abs(offset) >= 2 ? 0.25 : isActive ? 1 : 0.65;

          return (
            <div
              key={item.id}
              onClick={() => setActiveIndex(index)}
              style={{
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                zIndex,
                opacity,
              }}
              className={`absolute w-[210px] sm:w-[330px] md:w-[390px] h-[145px] sm:h-[225px] md:h-[265px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out bg-black/90 shadow-2xl reflect-below select-none ${
                isActive
                  ? 'border-2 border-cyan-400 shadow-[0_0_40px_rgba(0,210,255,0.45)]'
                  : 'border border-white/20'
              }`}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover rounded-2xl"
              />

              {/* Slide Counter on Active Slide */}
              {isActive && (
                <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#020617]/80 backdrop-blur-md border border-cyan-400/40 text-[10px] sm:text-xs font-mono font-bold text-cyan-300">
                  {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </div>
              )}

              {/* Bottom Caption Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex items-end p-3 sm:p-4">
                <span className="text-white text-xs sm:text-sm font-semibold tracking-wide drop-shadow-md truncate">
                  {item.title}
                </span>
              </div>
            </div>
          );
        })}

        {/* Minimalist Frosted Glass Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-1 sm:left-4 z-40 p-2 sm:p-2.5 rounded-full bg-[#020617]/70 hover:bg-cyan-500 hover:text-black border border-cyan-500/30 text-white transition-all shadow-xl active:scale-95 backdrop-blur-md"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-1 sm:right-4 z-40 p-2 sm:p-2.5 rounded-full bg-[#020617]/70 hover:bg-cyan-500 hover:text-black border border-cyan-500/30 text-white transition-all shadow-xl active:scale-95 backdrop-blur-md"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Dots Indicator */}
      <div className="flex items-center justify-center gap-1.5 mt-8 sm:mt-10">
        {photos.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === activeIndex
                ? 'w-7 bg-cyan-400 shadow-[0_0_8px_#00D2FF]'
                : 'w-2 bg-white/30 hover:bg-white/60'
            }`}
          />
        ))}
      </div>
    </section>
  );
};
