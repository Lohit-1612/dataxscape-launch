import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Zap,
  ExternalLink,
  ShieldCheck,
  Terminal,
  Database,
  Cloud,
  ChevronRight,
  X,
  ArrowUpRight,
  CheckCircle2,
  Rocket,
  Globe,
  Award,
  Layers,
  HeartHandshake
} from 'lucide-react';
import { useSiteData, DEFAULT_SPONSORS, SponsorItem } from '../context/SiteDataContext';

// Brand colors and styling dictionary for key tech leaders
const BRAND_PRESETS: Record<
  string,
  {
    border: string;
    borderHover: string;
    glow: string;
    gradient: string;
    accentText: string;
    badgeBg: string;
  }
> = {
  'sp-google-cloud': {
    border: 'border-blue-500/30',
    borderHover: 'hover:border-blue-400/80',
    glow: 'rgba(66, 133, 244, 0.45)',
    gradient: 'from-blue-500/20 via-sky-500/10 to-transparent',
    accentText: 'text-sky-400',
    badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
  },
  'sp-github': {
    border: 'border-purple-500/30',
    borderHover: 'hover:border-purple-400/80',
    glow: 'rgba(168, 85, 247, 0.45)',
    gradient: 'from-purple-500/20 via-indigo-500/10 to-transparent',
    accentText: 'text-purple-400',
    badgeBg: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
  },
  'sp-vercel': {
    border: 'border-white/30',
    borderHover: 'hover:border-white/80',
    glow: 'rgba(255, 255, 255, 0.35)',
    gradient: 'from-white/15 via-slate-500/10 to-transparent',
    accentText: 'text-white',
    badgeBg: 'bg-white/10 text-white border-white/30',
  },
  'sp-postman': {
    border: 'border-orange-500/30',
    borderHover: 'hover:border-orange-400/80',
    glow: 'rgba(255, 108, 55, 0.45)',
    gradient: 'from-orange-500/20 via-amber-500/10 to-transparent',
    accentText: 'text-orange-400',
    badgeBg: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
  },
  'sp-supabase': {
    border: 'border-emerald-500/30',
    borderHover: 'hover:border-emerald-400/80',
    glow: 'rgba(62, 207, 142, 0.45)',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
    accentText: 'text-emerald-400',
    badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
  },
  'sp-ds-club': {
    border: 'border-cyan-500/30',
    borderHover: 'hover:border-cyan-400/80',
    glow: 'rgba(0, 210, 255, 0.45)',
    gradient: 'from-cyan-500/20 via-sky-500/10 to-transparent',
    accentText: 'text-cyan-400',
    badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
  },
};

const DEFAULT_BRAND_PRESET = {
  border: 'border-cyan-500/30',
  borderHover: 'hover:border-cyan-400/80',
  glow: 'rgba(0, 210, 255, 0.4)',
  gradient: 'from-cyan-500/15 via-blue-500/10 to-transparent',
  accentText: 'text-cyan-400',
  badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
};

// Ultra-sharp brand vector emblem component
const SponsorEmblem: React.FC<{ item: SponsorItem; size?: 'sm' | 'md' | 'lg' | 'xl' }> = ({
  item,
  size = 'md',
}) => {
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
    xl: 'w-28 h-28',
  };

  const id = item.id.toLowerCase();
  const title = item.title.toLowerCase();

  // 1. Google Cloud Official Vector Emblem
  if (id === 'sp-google-cloud' || title.includes('google')) {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]}`}>
        <svg className="w-full h-full drop-shadow-[0_0_25px_rgba(66,133,244,0.65)]" viewBox="0 0 64 64" fill="none">
          {/* Subtle Outer Hex Shield */}
          <path
            d="M32 4L56 18V46L32 60L8 46V18L32 4Z"
            stroke="rgba(66, 133, 244, 0.35)"
            strokeWidth="1.5"
            fill="rgba(66, 133, 244, 0.08)"
          />
          {/* 4-Color Google Cloud Shape */}
          <path
            d="M45.5 28.5C44.4 22.8 39.5 18.5 33.5 18.5c-4.9 0-9.2 2.9-11.2 7.2-4.8.8-8.5 4.9-8.5 10 0 5.6 4.6 10.2 10.2 10.2h21c4.9 0 8.8-3.9 8.8-8.8 0-4.6-3.5-8.3-8.3-8.6z"
            fill="url(#gcpGradient)"
          />
          <path
            d="M45.5 28.5C44.4 22.8 39.5 18.5 33.5 18.5"
            stroke="#4285F4"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M22.3 25.7C17.5 26.5 13.8 30.6 13.8 35.7"
            stroke="#EA4335"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M13.8 35.7c0 5.6 4.6 10.2 10.2 10.2h10"
            stroke="#34A853"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M34 45.9h10c4.9 0 8.8-3.9 8.8-8.8 0-4.6-3.5-8.3-8.3-8.6"
            stroke="#FBBC05"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="gcpGradient" x1="14" y1="18.5" x2="52" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#4285F4" />
              <stop offset="0.33" stopColor="#EA4335" />
              <stop offset="0.66" stopColor="#FBBC05" />
              <stop offset="1" stopColor="#34A853" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // 2. GitHub Official Vector Emblem
  if (id === 'sp-github' || title.includes('github')) {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]}`}>
        <svg className="w-full h-full fill-white drop-shadow-[0_0_25px_rgba(168,85,247,0.6)]" viewBox="0 0 24 24">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
      </div>
    );
  }

  // 3. Vercel Official Vector Emblem
  if (id === 'sp-vercel' || title.includes('vercel')) {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]}`}>
        <svg className="w-full h-full drop-shadow-[0_0_25px_rgba(255,255,255,0.7)]" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L24 22H0L12 2Z" fill="white" />
        </svg>
      </div>
    );
  }

  // 4. Postman Official Vector Emblem
  if (id === 'sp-postman' || title.includes('postman')) {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]}`}>
        <svg className="w-full h-full drop-shadow-[0_0_25px_rgba(255,108,55,0.65)]" viewBox="0 0 48 48" fill="none">
          <circle cx="24" cy="24" r="22" fill="#FF6C37" />
          {/* Postman Space Traveler silhouette */}
          <circle cx="24" cy="18" r="6" fill="white" />
          <path
            d="M14 36c0-6 4.5-9 10-9s10 3 10 9"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d="M30 18l6-6M30 14l5-2"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }

  // 5. Supabase Official Vector Emblem
  if (id === 'sp-supabase' || title.includes('supabase')) {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]}`}>
        <svg className="w-full h-full drop-shadow-[0_0_25px_rgba(62,207,142,0.65)]" viewBox="0 0 24 24" fill="none">
          <path
            d="M21.362 9.354H12V.646a.646.646 0 0 0-1.171-.383L2.435 12.646A.646.646 0 0 0 2.97 13.65h9.362v8.708a.646.646 0 0 0 1.171.383l8.394-12.383a.646.646 0 0 0-.535-1.004z"
            fill="url(#supabaseLogoGrad)"
          />
          <defs>
            <linearGradient id="supabaseLogoGrad" x1="2.4" y1=".6" x2="21.4" y2="22.7" gradientUnits="userSpaceOnUse">
              <stop stopColor="#3ECF8E" />
              <stop offset="1" stopColor="#1B9A59" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    );
  }

  // 6. Data Science Club Official Crest
  if (id === 'sp-ds-club' || title.includes('data science')) {
    return (
      <div className={`relative flex items-center justify-center ${sizeMap[size]}`}>
        <img
          src="/images/ds-club-logo.png"
          alt="Data Science Club"
          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,210,255,0.6)] group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            // Fallback if image fails to load
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>
    );
  }

  // 7. Generic / Custom Uploaded Sponsor Image
  return (
    <div className={`relative flex items-center justify-center ${sizeMap[size]}`}>
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(0,210,255,0.5)] group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 font-bold font-mono">
          {item.title.slice(0, 2).toUpperCase()}
        </div>
      )}
    </div>
  );
};

// Interactive 3D Cyber Card Component with Cursor-Tracking Spotlight
const CyberSponsorCard: React.FC<{
  item: SponsorItem;
  onSelect: (item: SponsorItem) => void;
}> = ({ item, onSelect }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const brand = BRAND_PRESETS[item.id] || DEFAULT_BRAND_PRESET;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Derive quick perk chips from details or defaults
  const perks = useMemo(() => {
    if (Array.isArray(item.details) && item.details.length > 0) {
      return item.details.slice(0, 2).map((d) => {
        // Strip out 'Role: ', 'Offering: ', etc. for clean badge rendering
        return d.replace(/^[A-Za-z]+:\s*/, '');
      });
    }
    return ['Official Track Challenge', 'Direct Engineering Mentorship'];
  }, [item.details]);

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelect(item)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(item);
        }
      }}
      className={`group relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 bg-[#040e22]/90 border ${brand.border} ${brand.borderHover} backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer overflow-hidden shadow-[0_15px_35px_rgba(2,6,23,0.7)] hover:shadow-[0_20px_50px_rgba(0,210,255,0.2)]`}
    >
      {/* 1. Dynamic Cursor Spotlight Beam */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 210, 255, 0.16), transparent 70%)`,
        }}
      />

      {/* 2. Ambient Gradient Underlay */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${brand.gradient} opacity-40 group-hover:opacity-80 transition-opacity duration-300`}
      />

      {/* 3. Cyber Corner Reticles */}
      <div className="pointer-events-none absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-cyan-400/50 group-hover:border-cyan-300 transition-colors" />
      <div className="pointer-events-none absolute top-3 right-3 w-2.5 h-2.5 border-t-2 border-r-2 border-cyan-400/50 group-hover:border-cyan-300 transition-colors" />
      <div className="pointer-events-none absolute bottom-3 left-3 w-2.5 h-2.5 border-b-2 border-l-2 border-cyan-400/50 group-hover:border-cyan-300 transition-colors" />
      <div className="pointer-events-none absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-cyan-400/50 group-hover:border-cyan-300 transition-colors" />

      {/* Header Row: Tier Tag Badge & Verified Status */}
      <div className="relative z-10 flex items-center justify-between gap-2 mb-6">
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-bold tracking-widest uppercase border ${brand.badgeBg}`}
        >
          <Zap className="w-3 h-3 flex-shrink-0 animate-pulse" />
          <span className="truncate">{item.tag || item.year || 'ALLIANCE PARTNER'}</span>
        </span>

        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-cyan-400/70 group-hover:text-cyan-300 transition-colors">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span className="hidden sm:inline">Verified</span>
        </span>
      </div>

      {/* Center Stage: Emblem Pedestal */}
      <div className="relative z-10 flex flex-col items-center justify-center py-6 sm:py-8">
        {/* Glow Halo behind Emblem */}
        <div
          className="absolute w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-70 transition-opacity duration-500 pointer-events-none"
          style={{ backgroundColor: brand.glow }}
        />

        <div className="relative transform group-hover:scale-110 transition-transform duration-300 ease-out">
          <SponsorEmblem item={item} size="lg" />
        </div>

        {/* Sponsor Name & Tagline */}
        <div className="mt-6 text-center">
          <h4 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight group-hover:text-cyan-200 transition-colors">
            {item.title}
          </h4>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 line-clamp-1 font-normal max-w-[240px] mx-auto">
            {item.artist || item.year || 'Technology & Innovation Partner'}
          </p>
        </div>
      </div>

      {/* Bottom Features & Action Row */}
      <div className="relative z-10 border-t border-cyan-500/15 pt-4 mt-2">
        <div className="space-y-1.5 mb-4">
          {perks.map((perk, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span className="line-clamp-1">{perk}</span>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] font-mono text-cyan-400 font-semibold tracking-wider uppercase group-hover:underline flex items-center gap-1">
            <span>Explore Perks</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>

          <div className="w-7 h-7 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500 group-hover:text-black transition-all">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Sponsors: React.FC = () => {
  const { siteData } = useSiteData();
  const { sponsorTagline, items } = siteData.sponsors;

  // Use dynamically managed sponsors from admin portal, fallback to defaults
  const currentItems = Array.isArray(items) && items.length > 0 ? items : DEFAULT_SPONSORS;

  // State management for category filter and detailed modal
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'TITLE' | 'CLOUD' | 'DATA' | 'COMMUNITY'>('ALL');
  const [selectedPartner, setSelectedPartner] = useState<SponsorItem | null>(null);

  // Identify title sponsor (Google Cloud)
  const titleSponsor = useMemo(() => {
    return (
      currentItems.find(
        (sp) =>
          sp.id === 'sp-google-cloud' ||
          (sp.tag && sp.tag.toUpperCase().includes('TITLE')) ||
          (sp.year && sp.year.toLowerCase().includes('title'))
      ) || currentItems[0]
    );
  }, [currentItems]);

  // Filter remaining partners
  const filteredItems = useMemo(() => {
    return currentItems.filter((item) => {
      if (activeCategory === 'ALL') return true;
      if (activeCategory === 'TITLE') {
        return (
          item.id === 'sp-google-cloud' ||
          (item.tag && item.tag.toUpperCase().includes('TITLE'))
        );
      }
      if (activeCategory === 'CLOUD') {
        return (
          item.id === 'sp-google-cloud' ||
          item.id === 'sp-github' ||
          item.id === 'sp-vercel' ||
          (item.tag && (item.tag.includes('CLOUD') || item.tag.includes('DEV')))
        );
      }
      if (activeCategory === 'DATA') {
        return (
          item.id === 'sp-supabase' ||
          item.id === 'sp-postman' ||
          (item.tag && (item.tag.includes('DATA') || item.tag.includes('API')))
        );
      }
      if (activeCategory === 'COMMUNITY') {
        return (
          item.id === 'sp-ds-club' ||
          (item.tag && item.tag.includes('COMMUNITY')) ||
          (item.tag && item.tag.includes('HOST'))
        );
      }
      return true;
    });
  }, [currentItems, activeCategory]);

  // Non-title partners for grid
  const gridPartners = useMemo(() => {
    return filteredItems.filter((sp) => sp.id !== titleSponsor?.id);
  }, [filteredItems, titleSponsor]);

  // Double items array for seamless infinite marquee loop
  const marqueeItems = useMemo(() => {
    return [...currentItems, ...currentItems];
  }, [currentItems]);

  // Close modal on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedPartner(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 overflow-hidden">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-sky-500/15 to-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center mb-14 sm:mb-20">
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-4 shadow-[0_0_20px_rgba(0,210,255,0.2)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span>STRATEGIC ALLIANCES & TECH LEADERS</span>
        </div>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4 font-display">
          Sponsors & <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_35px_rgba(0,210,255,0.35)]">Innovation Partners</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-normal px-4 leading-relaxed">
          {sponsorTagline ||
            'Empowering 24 hours of non-stop intelligence, cloud compute, and transformative software engineering alongside global tech titans.'}
        </p>

        {/* Interactive Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mt-8">
          {[
            { key: 'ALL', label: 'All Partners' },
            { key: 'TITLE', label: 'Title Sponsor' },
            { key: 'CLOUD', label: 'Cloud & Platforms' },
            { key: 'DATA', label: 'Data & APIs' },
            { key: 'COMMUNITY', label: 'Community Host' },
          ].map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key as any)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-black shadow-[0_0_20px_rgba(0,210,255,0.5)] scale-105'
                    : 'bg-[#061226]/80 border border-cyan-500/20 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/5'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 1. Grand Title Sponsor Spotlight Card (Google Cloud) */}
      {titleSponsor && (activeCategory === 'ALL' || activeCategory === 'TITLE' || activeCategory === 'CLOUD') && (
        <div className="relative mb-14 sm:mb-20">
          <div className="relative rounded-3xl sm:rounded-[32px] p-6 sm:p-10 lg:p-12 bg-gradient-to-b from-[#081835]/95 via-[#040e22]/95 to-[#020713]/98 border-2 border-cyan-400/60 shadow-[0_20px_70px_rgba(0,210,255,0.25)] backdrop-blur-2xl overflow-hidden group">
            {/* Ambient Background Aura */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Corner Cyber Reticles */}
            <div className="pointer-events-none absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
            <div className="pointer-events-none absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
            <div className="pointer-events-none absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
            <div className="pointer-events-none absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center relative z-10">
              {/* Left Column: Brand Emblem & Identity */}
              <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-indigo-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase mb-6 shadow-[0_0_15px_rgba(0,210,255,0.3)]">
                  <Award className="w-3.5 h-3.5 text-cyan-400" />
                  <span>★ OFFICIAL TITLE SPONSOR ★</span>
                </div>

                <div className="flex items-center gap-6 mb-5">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#09152a] border border-cyan-500/40 flex items-center justify-center p-3 shadow-[0_0_30px_rgba(66,133,244,0.4)] group-hover:scale-105 transition-transform duration-300">
                    <SponsorEmblem item={titleSponsor} size="lg" />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white font-display tracking-tight">
                      {titleSponsor.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-cyan-400 font-mono font-semibold tracking-wider mt-1">
                      {titleSponsor.artist || 'Global Cloud & Autonomous AI Ecosystem'}
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-md">
                  Anchoring the entire computational backbone of DataXscape 2.0 with enterprise-grade cloud sandboxes, Vertex AI infrastructure, and premier hackathon challenge tracks.
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setSelectedPartner(titleSponsor)}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 text-black text-xs font-mono font-bold tracking-wider uppercase shadow-[0_0_25px_rgba(0,210,255,0.4)] hover:shadow-[0_0_35px_rgba(0,210,255,0.7)] hover:scale-105 transition-all cursor-pointer"
                  >
                    <span>Inspect Track Perks</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Right Column: Key Offerings Bento Grid */}
              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div className="p-4 sm:p-5 rounded-2xl bg-[#071326]/90 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                    <Cloud className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-wide mb-1">$10,000+ Vertex AI Credits</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Access Gemini 1.5 Pro, Imagen 3, and dedicated cloud compute sandboxes for all qualified hackathon finalists.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#071326]/90 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                    <Rocket className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-wide mb-1">Dedicated GenAI Track</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Exclusive high-bounty challenge track for autonomous multi-agent swarms and production intelligence systems.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#071326]/90 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 mb-3">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-wide mb-1">Architecture Mentorship</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Direct on-site and virtual office hours with Google Cloud technical architects and certified developers.
                  </p>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-[#071326]/90 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-3">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold text-white tracking-wide mb-1">Fast-Track Hiring Interviews</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Exceptional performers gain expedited review for associate cloud engineering & technology ecosystem roles.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Strategic Partners 3D Grid */}
      {gridPartners.length > 0 && (
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-cyan-500/20">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm sm:text-base font-bold text-white font-mono tracking-wider uppercase">
                STRATEGIC & INNOVATION PARTNERS
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-400/70">
              {gridPartners.length} Alliances Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {gridPartners.map((item) => (
              <CyberSponsorCard
                key={item.id}
                item={item}
                onSelect={(selected) => setSelectedPartner(selected)}
              />
            ))}
          </div>
        </div>
      )}

      {/* 3. Infinite Holographic Partner Marquee Ticker */}
      <div className="relative w-full py-8 sm:py-10 mb-16 sm:mb-20 overflow-hidden rounded-2xl bg-[#030914]/80 border border-cyan-500/20 backdrop-blur-md">
        {/* Left & Right Gradient Masking */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#020617] to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#020617] to-transparent z-10" />

        <div className="text-center mb-5">
          <span className="text-[11px] font-mono tracking-widest text-cyan-400/80 uppercase">
            // LIVE ALLIANCE NETWORK & HACKATHON TOOLS //
          </span>
        </div>

        {/* Scrolling Strip */}
        <div className="animate-sponsor-marquee flex items-center gap-10 sm:gap-14">
          {marqueeItems.map((item, idx) => (
            <div
              key={`${item.id}-${idx}`}
              onClick={() => setSelectedPartner(item)}
              className="flex items-center gap-3.5 px-4 py-2 rounded-xl bg-slate-900/60 border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-500/10 transition-all cursor-pointer flex-shrink-0 group"
            >
              <div className="w-7 h-7 flex items-center justify-center">
                <SponsorEmblem item={item} size="sm" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.title}
                </span>
                <span className="text-[9px] font-mono text-cyan-400/70 truncate max-w-[120px]">
                  {item.tag || item.year || 'Partner'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. "Partner With Us" Futuristic Call To Action */}
      <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-[#081835]/80 via-[#040e22]/90 to-[#020713]/95 border border-cyan-500/30 text-center shadow-[0_15px_40px_rgba(0,210,255,0.15)] backdrop-blur-xl">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold tracking-widest uppercase">
            <HeartHandshake className="w-3.5 h-3.5 text-cyan-400" />
            <span>BECOME AN ALLIANCE PARTNER</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-black text-white font-display tracking-tight">
            Want to Empower <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">1,000+ Top Developers</span> & Future AI Leaders?
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            Showcase your developer platform, sponsor dedicated innovation challenges, mentor national talent, and accelerate recruitment at Panimalar Engineering College.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:contact@dataxscape.tech?subject=Sponsorship%20Inquiry%20DataXscape%202.0"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 shadow-[0_0_25px_rgba(0,210,255,0.5)] hover:shadow-[0_0_35px_rgba(0,210,255,0.8)] hover:scale-105 transition-all"
            >
              <span>Partner With Us</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="mailto:pecdatascienceclub@gmail.com?subject=Request%20Sponsorship%20Deck%20DataXscape%202.0"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-cyan-300 bg-[#071322] border border-cyan-500/40 hover:bg-cyan-500/10 hover:border-cyan-400 transition-all"
            >
              <span>Request Prospectus</span>
              <Globe className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* 5. Detailed Partner Dossier Modal */}
      <AnimatePresence>
        {selectedPartner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPartner(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-opacity"
            />

            {/* Modal Dialog Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-xl rounded-3xl bg-[#061226] border-2 border-cyan-400/60 p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,210,255,0.35)] z-10 text-left overflow-hidden"
            >
              {/* Corner Cyber Accents */}
              <div className="pointer-events-none absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
              <div className="pointer-events-none absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
              <div className="pointer-events-none absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
              <div className="pointer-events-none absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedPartner(null)}
                aria-label="Close modal"
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-800/80 border border-white/20 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Partner Identity Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#091833] border border-cyan-500/40 p-2 flex items-center justify-center shadow-[0_0_20px_rgba(0,210,255,0.3)]">
                  <SponsorEmblem item={selectedPartner} size="md" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-widest uppercase bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 mb-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>{selectedPartner.tag || selectedPartner.year || 'OFFICIAL PARTNER'}</span>
                  </div>
                  <h3 className="text-2xl font-black text-white font-display tracking-tight">
                    {selectedPartner.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {selectedPartner.artist || 'Official Innovation Partner'}
                  </p>
                </div>
              </div>

              {/* Offerings & Hackathon Perks */}
              <div className="space-y-4 mb-6">
                <h4 className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                  PARTNER OFFERINGS & TRACK CONTRIBUTIONS
                </h4>

                <div className="space-y-2.5 bg-[#030b18]/80 rounded-2xl p-4 border border-cyan-500/20">
                  {selectedPartner.details && selectedPartner.details.length > 0 ? (
                    selectedPartner.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </div>
                    ))
                  ) : (
                    <div className="flex items-start gap-2.5 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                      <span>Official Technology & Challenge Sponsor for DataXscape 2.0 Hackathon.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-cyan-500/20">
                <span className="text-[11px] font-mono text-slate-400">
                  Edition: DataXscape 2.0 • 2026
                </span>

                <button
                  onClick={() => setSelectedPartner(null)}
                  className="px-5 py-2 rounded-full bg-cyan-500 text-black text-xs font-mono font-bold tracking-wider uppercase hover:bg-cyan-400 transition-colors cursor-pointer"
                >
                  Close Dossier
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Sponsors;
