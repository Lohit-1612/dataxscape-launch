import React from 'react';
import { PictureRailGallery } from './ui/picture-rail-gallery';
import { useSiteData, DEFAULT_SPONSORS } from '../context/SiteDataContext';

export const Sponsors: React.FC = () => {
  const { siteData } = useSiteData();
  const { sponsorTagline, items } = siteData.sponsors;

  // Use dynamically managed sponsors from admin portal, fallback to defaults
  const currentItems = Array.isArray(items) && items.length > 0 ? items : DEFAULT_SPONSORS;

  return (
    <section id="sponsors" className="relative py-12 sm:py-20 z-10 overflow-hidden scroll-mt-20">
      <PictureRailGallery
        items={currentItems}
        eyebrow="STRATEGIC ALLIANCES & TECH LEADERS"
        heading="Sponsors & Innovation Partners"
        caption={
          sponsorTagline ||
          'Empowering 24 hours of non-stop intelligence, cloud compute, and transformative software engineering.'
        }
        action={
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:contact@dataxscape.tech?subject=Sponsorship%20Inquiry%20DataXscape%202.0"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-mono font-bold tracking-wider uppercase text-black bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:shadow-[0_0_30px_rgba(0,210,255,0.7)] hover:scale-105 transition-all duration-300"
            >
              <span>Partner With Us</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        }
        autoplay
        interval={4500}
      />
    </section>
  );
};

export default Sponsors;
