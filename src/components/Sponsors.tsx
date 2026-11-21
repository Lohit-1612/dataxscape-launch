import React from 'react';
import { PictureRailGallery, PictureRailItem } from './ui/picture-rail-gallery';
import { useSiteData } from '../context/SiteDataContext';

export const Sponsors: React.FC = () => {
  const { siteData } = useSiteData();
  const { titleSponsorName, sponsorTagline, sponsorLogoUrl } = siteData.sponsors;

  // Curated tier list representing high-tier tech partners for DataXscape 2.0
  const sponsorItems: PictureRailItem[] = [
    {
      id: 'sp-google-cloud',
      title: titleSponsorName || 'Google Cloud',
      artist: 'Global Cloud & AI Ecosystem',
      year: 'Title Sponsor',
      image: sponsorLogoUrl || '/images/sponsors/sp-google-cloud.svg',
      aspect: 0.8,
      frame: 'black',
      mat: true,
      drop: 0,
      tag: 'TITLE SPONSOR',
      details: [
        'Role: Title Sponsor & Cloud Infrastructure',
        'Offering: $10,000+ Vertex AI Credits & Cloud Sandbox Access',
        'Tracks: GenAI, Autonomous Agents & Big Data Systems',
        'Status: Verified Strategic Partner',
      ],
    },
    {
      id: 'sp-github',
      title: 'GitHub',
      artist: 'Global Developer Platform',
      year: 'Platform Partner',
      image: '/images/sponsors/sp-github.svg',
      aspect: 0.8,
      frame: 'black',
      mat: true,
      drop: 0.05,
      tag: 'DEV PLATFORM',
      details: [
        'Role: Official Developer Platform Partner',
        'Offering: GitHub Copilot Subscriptions & Codespaces',
        'Tracks: Open Source & Code Quality Excellence',
        'Status: Verified Strategic Partner',
      ],
    },
    {
      id: 'sp-vercel',
      title: 'Vercel',
      artist: 'Frontend Cloud & AI Deployment',
      year: 'Deployment Partner',
      image: '/images/sponsors/sp-vercel.svg',
      aspect: 0.8,
      frame: 'black',
      mat: true,
      drop: -0.05,
      tag: 'CLOUD DEPLOYMENT',
      details: [
        'Role: Official Cloud Deployment Partner',
        'Offering: Instant Edge Deployment & AI SDK Support',
        'Tracks: Modern Web Apps & Real-time Systems',
        'Status: Verified Strategic Partner',
      ],
    },
    {
      id: 'sp-postman',
      title: 'Postman',
      artist: 'API Platform for Developers',
      year: 'API Innovation Partner',
      image: '/images/sponsors/sp-postman.svg',
      aspect: 0.8,
      frame: 'black',
      mat: true,
      drop: 0.08,
      tag: 'API INNOVATION',
      details: [
        'Role: Official API Innovation Partner',
        'Offering: Postman Enterprise Workspaces & Testing Suite',
        'Tracks: Microservices & API Orchestration',
        'Status: Verified Strategic Partner',
      ],
    },
    {
      id: 'sp-supabase',
      title: 'Supabase',
      artist: 'Open Source Firebase Alternative',
      year: 'Database Partner',
      image: '/images/sponsors/sp-supabase.svg',
      aspect: 0.8,
      frame: 'black',
      mat: true,
      drop: -0.03,
      tag: 'DATA & STORAGE',
      details: [
        'Role: Official Data Infrastructure Partner',
        'Offering: Dedicated Managed Postgres & Vector Storage',
        'Tracks: High-Scale Databases & Realtime Sync',
        'Status: Verified Strategic Partner',
      ],
    },
    {
      id: 'sp-ds-club',
      title: 'Data Science Club',
      artist: 'Dept. of AI & DS, Panimalar',
      year: 'Organizing Host',
      image: '/images/sponsors/sp-ds-club.svg',
      aspect: 0.8,
      frame: 'oak',
      mat: true,
      drop: 0.04,
      tag: 'HOST & COMMUNITY',
      details: [
        'Role: Lead Organizing Community',
        'Institution: Panimalar Engineering College',
        'Mission: Advancing AI, Data Science & Student Innovation',
        'Edition: DataXscape 2.0 National Level Hackathon',
      ],
    },
  ];

  return (
    <section id="sponsors" className="relative py-12 sm:py-20 z-10 overflow-hidden">
      <PictureRailGallery
        items={sponsorItems}
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
