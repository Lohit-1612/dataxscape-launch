import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { ChevronLeft, ChevronRight, Clock, Trophy, Users, Award, Sparkles, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  const { siteData } = useSiteData();
  const photos = siteData.aboutPhotos && siteData.aboutPhotos.length > 0
    ? siteData.aboutPhotos
    : ['/images/about-team.jpg'];
  const intervalSeconds = siteData.aboutIntervalSeconds ?? 3.5;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Touch swipe support for mobile
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
      handleNext();
    } else if (distance < -40) {
      handlePrev();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Continuous loop slideshow based on configured interval in seconds
  useEffect(() => {
    if (photos.length <= 1 || isHovered) return;

    const ms = Math.max(500, intervalSeconds * 1000);
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, ms);

    return () => clearInterval(timer);
  }, [photos.length, isHovered, intervalSeconds]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  return (
    <section id="about" className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 scroll-mt-20">
      {/* Section Header */}
      <div className="text-center mb-12 sm:mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>ABOUT DATAXSCAPE 2K26</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-3 font-display">
          Where Data Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500">Innovation</span>
        </h2>
        <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto font-normal">
          24 hours of non-stop adrenaline, cutting-edge analytics, and collaborative problem-solving.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Bento Grid Narrative & Metrics */}
        <div className="lg:col-span-6 space-y-6 text-left">
          {/* Main Narrative Card */}
          <div className="bg-gradient-to-br from-[#0c182c]/90 via-[#081220]/95 to-[#040b17]/90 border border-cyan-500/25 hover:border-cyan-400/40 rounded-2xl p-6 sm:p-7 backdrop-blur-md shadow-2xl transition-all duration-300">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 font-display flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00D2FF]" />
              The Arena of Breakthroughs
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-white/80 leading-relaxed font-normal">
              Organized by the Department of Artificial Intelligence and Data Science at Panimalar Engineering College, DataXscape 2k26 is South India's flagship 24-hour national hackathon. Teams from premier institutions compete to architect real-world AI, Machine Learning, and Big Data applications.
            </p>
          </div>

          {/* 4 Luxury Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
            <div className="bg-[#030d22]/70 border border-white/10 hover:border-cyan-400/40 rounded-xl p-3.5 sm:p-4 text-center backdrop-blur-sm transition-colors group">
              <Clock className="w-5 h-5 text-cyan-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-lg sm:text-xl font-black text-white font-mono">24 Hrs</div>
              <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Non-Stop</div>
            </div>

            <div className="bg-[#030d22]/70 border border-white/10 hover:border-cyan-400/40 rounded-xl p-3.5 sm:p-4 text-center backdrop-blur-sm transition-colors group">
              <Trophy className="w-5 h-5 text-cyan-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-lg sm:text-xl font-black text-white font-mono">₹1.5L+</div>
              <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Prize Pool</div>
            </div>

            <div className="bg-[#030d22]/70 border border-white/10 hover:border-cyan-400/40 rounded-xl p-3.5 sm:p-4 text-center backdrop-blur-sm transition-colors group">
              <Users className="w-5 h-5 text-cyan-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-lg sm:text-xl font-black text-white font-mono">500+</div>
              <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Innovators</div>
            </div>

            <div className="bg-[#030d22]/70 border border-white/10 hover:border-cyan-400/40 rounded-xl p-3.5 sm:p-4 text-center backdrop-blur-sm transition-colors group">
              <Award className="w-5 h-5 text-cyan-400 mx-auto mb-1.5 group-hover:scale-110 transition-transform" />
              <div className="text-lg sm:text-xl font-black text-white font-mono">National</div>
              <div className="text-[10px] sm:text-xs text-white/50 uppercase tracking-wider">Accredited</div>
            </div>
          </div>

          {/* Key Feature Highlights */}
          <div className="space-y-2.5">
            {[
              'Direct mentorship and evaluation by industry senior engineers',
              'Complimentary food, refreshments, and on-campus stay provided',
              'Certificate of merit for all finalists and cash rewards for podium winners'
            ].map((text, i) => (
              <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-white/75 bg-white/[0.02] border border-white/5 rounded-lg px-3.5 py-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Premium Showcase Slideshow */}
        <div className="lg:col-span-6">
          <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="relative group rounded-3xl overflow-hidden border border-cyan-500/30 bg-[#081224]/90 backdrop-blur-md shadow-[0_15px_45px_rgba(0,0,0,0.9)] p-2.5 sm:p-3"
          >
            {/* Ambient Corner Flare */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent rounded-3xl blur-xl opacity-50 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none" />

            {/* Slideshow Display Window */}
            <div
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="relative w-full h-[250px] sm:h-[360px] md:h-[420px] rounded-2xl overflow-hidden bg-black select-none"
            >
              {photos.map((photoUrl, idx) => (
                <div
                  key={idx}
                  className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                    idx === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={photoUrl}
                    alt={`DataXscape event showcase slide ${idx + 1}`}
                    className="w-full h-full object-cover rounded-2xl transform transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                </div>
              ))}

              {/* Top Luxury Badge */}
              <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono font-semibold text-cyan-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping inline-block" />
                <span>GALLERY PREVIEW • {currentIndex + 1} / {photos.length}</span>
              </div>

              {/* Navigation Arrows */}
              {photos.length > 1 && (
                <>
                  <button
                    onClick={handlePrev}
                    aria-label="Previous slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 hover:bg-cyan-500 hover:text-black text-white/90 transition-all border border-white/10 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-xl active:scale-90"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/70 hover:bg-cyan-500 hover:text-black text-white/90 transition-all border border-white/10 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 shadow-xl active:scale-90"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Dot Indicators */}
                  <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    {photos.map((_, dotIdx) => (
                      <button
                        key={dotIdx}
                        onClick={() => setCurrentIndex(dotIdx)}
                        aria-label={`Go to slide ${dotIdx + 1}`}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          dotIdx === currentIndex
                            ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#00D2FF]'
                            : 'w-2 bg-white/40 hover:bg-white/70'
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
