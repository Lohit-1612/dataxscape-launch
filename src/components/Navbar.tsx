import React, { useState, useEffect } from 'react';

interface NavbarProps {
  onSecretAdminTrigger?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSecretAdminTrigger }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Sponsors', href: '#sponsors' },
    { label: 'Prizes', href: '#prizes' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#020617]/90 backdrop-blur-md border-b border-cyan-500/25 py-3 shadow-xl shadow-black/70'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-[96%] xl:max-w-[1440px] mx-auto px-2.5 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Panimalar Engineering College Official Logo */}
        <a href="#" className="flex items-center group flex-shrink-0">
          <img
            src="/images/panimalar-logo.png"
            alt="Panimalar Engineering College - An Autonomous Institution"
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[220px] sm:max-w-[280px] md:max-w-none object-contain group-hover:scale-105 transition-transform duration-200"
          />
        </a>

        {/* Center: Navigation Links + Our Community placed near Contact */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 2xl:space-x-8">
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs xl:text-sm 2xl:text-base font-semibold text-white/90 hover:text-cyan-400 transition-colors duration-200 tracking-wide"
            >
              {item.label}
            </a>
          ))}

          {/* Our Community Button placed right near Contact */}
          <a
            href="https://chat.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 xl:ml-3 px-3.5 xl:px-5 py-1.5 xl:py-2 rounded-full text-xs xl:text-sm font-extrabold text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 transition-all duration-200 shadow-[0_0_15px_rgba(0,210,255,0.4)] hover:shadow-[0_0_28px_rgba(0,210,255,0.8)] hover:scale-105 active:scale-95 whitespace-nowrap"
          >
            Our Community
          </a>
        </nav>

        {/* Right: Data Science Club Branding (Content & Logo moved to the right side) */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 group">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-white font-black text-xs sm:text-sm md:text-base xl:text-lg tracking-wider leading-tight uppercase font-display drop-shadow-[0_2px_10px_rgba(0,210,255,0.4)]">
                DATA SCIENCE CLUB
              </span>
              <span className="text-cyan-400 font-bold text-[9px] sm:text-[11px] leading-tight uppercase tracking-wider">
                DEPT. OF AI &amp; DS
              </span>
            </div>
            <img
              src="/images/ds-club-logo.png"
              alt="Data Science Club Logo"
              className="w-9 h-9 sm:w-11 sm:h-11 md:w-14 md:h-14 xl:w-16 xl:h-16 object-contain flex-shrink-0 group-hover:scale-105 transition-transform duration-200 drop-shadow-[0_0_10px_rgba(0,210,255,0.4)]"
            />
          </div>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white/80 hover:text-white p-1 sm:p-1.5 rounded-lg bg-white/5 border border-white/10"
            aria-label="Toggle Navigation Menu"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#020617]/95 backdrop-blur-xl border-b border-cyan-500/25 px-6 py-4 space-y-3">
          <div className="flex items-center gap-3 pb-3 border-b border-white/10">
            <img
              src="/images/ds-club-logo.png"
              alt="Data Science Club Logo"
              className="w-10 h-10 object-contain flex-shrink-0"
            />
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm tracking-wide">
                DATA SCIENCE CLUB
              </span>
              <span className="text-cyan-400 text-xs font-semibold">
                Dept. of Artificial Intelligence &amp; Data Science
              </span>
            </div>
          </div>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-semibold text-white/80 hover:text-cyan-400 transition-colors"
            >
              {item.label}
            </a>
          ))}
          {/* Our Community Button in Mobile Menu */}
          <a
            href="https://chat.whatsapp.com/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="block w-full text-center py-2.5 rounded-full text-sm font-extrabold text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-600 shadow-[0_0_15px_rgba(0,210,255,0.4)] mt-2"
          >
            Our Community
          </a>
        </div>
      )}
    </header>
  );
};
