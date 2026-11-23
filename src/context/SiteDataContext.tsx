import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { setPersistentData, getPersistentData, compressImage } from '../utils/storage';
import { countdownSync, SyncPayload } from '../services/countdownSync';

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
}

export interface CountdownSettings {
  targetDate: string;
  isLive: boolean;
  isRunning: boolean; // Controls whether countdown is running or stopped
  hasStarted?: boolean; // Controls whether countdown has been triggered (empty if false)
  animateBirth?: boolean; // Triggers sequential dust condensation
  remainingSeconds?: number; // Exact paused seconds remaining
  targetEpoch?: number; // Authoritative target epoch ms when running
  staticDays: number;
  staticHours: number;
  staticMinutes: number;
  staticSeconds: number;
  headline: string;
}

export function getAuthoritativeRemainingSeconds(
  countdown: CountdownSettings,
  serverTimeOffset: number = 0
): number {
  if (!countdown.isRunning) {
    if (typeof countdown.remainingSeconds === 'number') {
      return countdown.remainingSeconds;
    }
    return (
      (countdown.staticDays || 0) * 86400 +
      (countdown.staticHours || 0) * 3600 +
      (countdown.staticMinutes || 0) * 60 +
      (countdown.staticSeconds || 0)
    );
  }

  // When running, calculate from authoritative targetEpoch
  if (typeof countdown.targetEpoch === 'number' && countdown.targetEpoch > 0) {
    const currentServerTime = Date.now() + serverTimeOffset;
    return Math.max(0, Math.ceil((countdown.targetEpoch - currentServerTime) / 1000));
  }

  // Fallback to remainingSeconds or targetDate
  if (typeof countdown.remainingSeconds === 'number') {
    return countdown.remainingSeconds;
  }
  return 0;
}

export interface SponsorItem {
  id: string;
  title: string;
  artist?: string;
  year?: string;
  image: string;
  aspect?: number;
  frame?: 'black' | 'oak' | 'white';
  mat?: boolean;
  drop?: number;
  tag?: string;
  details?: string[];
}

export const DEFAULT_SPONSORS: SponsorItem[] = [
  {
    id: 'sp-google-cloud',
    title: 'Google Cloud',
    artist: 'Global Cloud & AI Ecosystem',
    year: 'Title Sponsor',
    image: '/images/sponsors/sp-google-cloud.svg',
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

export interface SponsorSettings {
  hudSponsorPrefix: string;
  hudSponsorName: string;
  titleSponsorName: string;
  sponsorLogoUrl?: string;
  sponsorTagline: string;
  items: SponsorItem[];
}

export interface SiteData {
  countdown: CountdownSettings;
  gallery: GalleryPhoto[];
  galleryIntervalSeconds: number; // Transition interval for 3D gallery coverflow (seconds)
  aboutPhotos: string[];
  aboutIntervalSeconds: number; // Transition interval for About section slideshow (seconds)
  sponsors: SponsorSettings;
}

export const INITIAL_SITE_DATA: SiteData = {
  countdown: {
    targetDate: '2027-01-21T09:00:00',
    isLive: true,
    isRunning: false,
    hasStarted: false,
    remainingSeconds: 41 * 86400 + 21 * 3600 + 20 * 60 + 47,
    staticDays: 41,
    staticHours: 21,
    staticMinutes: 20,
    staticSeconds: 47,
    headline: 'COUNTDOWN',
  },
  gallery: [
    { id: 'g-1', url: '/images/gallery/gallery1.jpg', title: 'Data Science Lab Workshop' },
    { id: 'g-2', url: '/images/gallery/gallery2.jpg', title: 'Ideation & Prototyping' },
    { id: 'g-3', url: '/images/gallery/gallery3.jpg', title: 'Hardware & IoT Testing' },
    { id: 'g-4', url: '/images/gallery/gallery4.jpg', title: 'Mentor Technical Reviews' },
    { id: 'g-5', url: '/images/gallery/gallery5.jpg', title: 'Grand Finale Showcase' },
  ],
  galleryIntervalSeconds: 4,
  aboutPhotos: ['/images/about-team.jpg'],
  aboutIntervalSeconds: 3.5,
  sponsors: {
    hudSponsorPrefix: '',
    hudSponsorName: '',
    titleSponsorName: '',
    sponsorLogoUrl: '',
    sponsorTagline: '',
    items: DEFAULT_SPONSORS,
  },
};

interface SiteContextType {
  siteData: SiteData;
  updateCountdown: (newCountdown: Partial<CountdownSettings>) => void;
  startCountdown: () => Promise<void>;
  stopCountdown: (currentSecondsRemaining?: number) => Promise<void>;
  rearmCountdown: () => Promise<void>;
  clearBirthAnimation: () => void;
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  uploadPhotoFile: (file: File, title: string) => Promise<void>;
  removeGalleryPhoto: (id: string) => void;
  reorderGalleryPhotos: (newGallery: GalleryPhoto[]) => void;
  updateGalleryInterval: (seconds: number) => void;
  uploadMultipleAboutPhotos: (files: FileList | File[]) => Promise<number>;
  removeAboutPhoto: (index: number) => void;
  updateAboutInterval: (seconds: number) => void;
  updateSponsors: (newSponsors: Partial<SponsorSettings>) => void;
  addSponsorItem: (sponsor: Omit<SponsorItem, 'id'>) => Promise<void>;
  updateSponsorItem: (id: string, updated: Partial<SponsorItem>) => void;
  removeSponsorItem: (id: string) => void;
  reorderSponsorItems: (newItems: SponsorItem[]) => void;
  uploadSponsorLogoFile: (file: File) => Promise<string>;
  resetSponsorsToDefault: () => void;
  restoreVideoDefaults: () => Promise<void>;
}

const SiteDataContext = createContext<SiteContextType | null>(null);

export const SiteDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [siteData, setSiteData] = useState<SiteData>(() => {
    try {
      const saved = localStorage.getItem('dataxscape_2k26_state');
      if (saved) {
        const parsed = JSON.parse(saved);
        const cd = parsed.countdown || {};
        const isRunning = Boolean(cd.isRunning);
        const hasStarted = Boolean(cd.hasStarted);
        let remSecs = typeof cd.remainingSeconds === 'number'
          ? cd.remainingSeconds
          : INITIAL_SITE_DATA.countdown.remainingSeconds;

        // If countdown was running, calculate exact remaining seconds so refresh never rewinds or jumps!
        if (isRunning && typeof cd.targetEpoch === 'number' && cd.targetEpoch > 0) {
          remSecs = Math.max(0, Math.ceil((cd.targetEpoch - Date.now()) / 1000));
        }

        const sp = parsed.sponsors || {};
        const sponsorItems = Array.isArray(sp.items) && sp.items.length > 0 ? sp.items : DEFAULT_SPONSORS;

        return {
          ...INITIAL_SITE_DATA,
          ...parsed,
          sponsors: {
            ...INITIAL_SITE_DATA.sponsors,
            ...sp,
            items: sponsorItems,
          },
          countdown: {
            ...INITIAL_SITE_DATA.countdown,
            ...cd,
            hasStarted,
            isRunning,
            animateBirth: false, // NEVER re-trigger birth animation on browser refresh
            remainingSeconds: remSecs,
            targetEpoch: cd.targetEpoch,
          },
        };
      }
    } catch (e) {
      console.warn('Initial localStorage read fallback:', e);
    }
    return INITIAL_SITE_DATA;
  });

  const isInitialMount = useRef(true);

  // 1. On mount: Fetch persistent site-data.json from server and IndexedDB
  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      // Step A: First fetch authoritative live countdown status from server
      try {
        const statusRes = await fetch('/api/countdown/status');
        if (statusRes.ok) {
          const status = await statusRes.json();
          if (status && !isCancelled) {
            setSiteData((prev) => {
              const isRunning = typeof status.isRunning === 'boolean' ? status.isRunning : prev.countdown.isRunning;
              const hasStarted = typeof status.hasStarted === 'boolean' ? status.hasStarted : prev.countdown.hasStarted;
              const remainingSeconds = typeof status.remainingSeconds === 'number' ? status.remainingSeconds : prev.countdown.remainingSeconds;
              return {
                ...prev,
                countdown: {
                  ...prev.countdown,
                  isRunning,
                  hasStarted,
                  animateBirth: false, // Never re-trigger birth on refresh
                  remainingSeconds,
                  targetEpoch: status.targetEpoch,
                },
              };
            });
          }
        }
      } catch (e) {
        console.warn('Countdown status fetch note:', e);
      }

      // Step B: Fetch site-data.json for gallery, about, sponsors
      try {
        const res = await fetch('/site-data.json?t=' + Date.now());
        if (res.ok) {
          const serverData = await res.json();
          if (serverData && !isCancelled) {
            setSiteData((prev) => {
              const sp = serverData.sponsors || {};
              const sponsorItems = Array.isArray(sp.items) && sp.items.length > 0
                ? sp.items
                : prev.sponsors.items?.length
                ? prev.sponsors.items
                : DEFAULT_SPONSORS;
              return {
                ...prev,
                ...serverData,
                sponsors: {
                  ...prev.sponsors,
                  ...sp,
                  items: sponsorItems,
                },
                countdown: {
                  ...prev.countdown,
                  headline: serverData.countdown?.headline ?? prev.countdown.headline,
                  targetDate: serverData.countdown?.targetDate ?? prev.countdown.targetDate,
                },
              };
            });
            await setPersistentData('siteData', serverData);
            return;
          }
        }
      } catch (e) {
        console.warn('Could not fetch /site-data.json:', e);
      }

      // Step C: Try loading from IndexedDB
      try {
        const idbData = await getPersistentData<SiteData>('siteData');
        if (idbData && !isCancelled) {
          setSiteData((prev) => ({
            ...prev,
            gallery: idbData.gallery || prev.gallery,
            aboutPhotos: idbData.aboutPhotos || prev.aboutPhotos,
            sponsors: idbData.sponsors || prev.sponsors,
          }));
        }
      } catch (e) {
        console.warn('IndexedDB read error:', e);
      }
    }

    loadData();

    // Step D: Cloud Real-time MQTT synchronization (ultra-fast, cross-device, works on Vercel)
    const unsubscribeSync = countdownSync.subscribe((payload: SyncPayload) => {
      console.log('[SiteDataContext] Real-time cloud sync received:', payload);
      setSiteData((prev) => {
        const isRunning = payload.isRunning;
        const hasStarted = payload.hasStarted;

        // Animate birth only if action is START and triggered recently (<15 seconds ago)
        const isRecent = Boolean(payload.sentAt && Math.abs(Date.now() - payload.sentAt) < 15000);
        const animateBirth = payload.type === 'START' && isRecent;

        let remSecs = typeof payload.remainingSeconds === 'number'
          ? payload.remainingSeconds
          : prev.countdown.remainingSeconds;

        if (isRunning && payload.targetEpoch) {
          remSecs = Math.max(0, Math.ceil((payload.targetEpoch - Date.now()) / 1000));
        }

        if (
          prev.countdown.isRunning === isRunning &&
          prev.countdown.hasStarted === hasStarted &&
          !animateBirth &&
          prev.countdown.targetEpoch === payload.targetEpoch &&
          Math.abs((prev.countdown.remainingSeconds || 0) - (remSecs || 0)) <= 1
        ) {
          return prev;
        }

        return {
          ...prev,
          countdown: {
            ...prev.countdown,
            isRunning,
            hasStarted,
            animateBirth: animateBirth ? true : (prev.countdown.animateBirth && isRunning),
            remainingSeconds: remSecs,
            targetEpoch: payload.targetEpoch,
          },
        };
      });
    });

    // Step E: Same-device BroadcastChannel for zero-latency multi-tab sync
    let bc: BroadcastChannel | null = null;
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        bc = new BroadcastChannel('dataxscape_countdown_sync');
        bc.onmessage = (event) => {
          const payload = event.data as SyncPayload;
          if (payload) {
            setSiteData((prev) => {
              const isRunning = payload.isRunning;
              const hasStarted = payload.hasStarted;
              const isRecent = Boolean(payload.sentAt && Math.abs(Date.now() - payload.sentAt) < 15000);
              const animateBirth = payload.type === 'START' && isRecent;

              let remSecs = typeof payload.remainingSeconds === 'number'
                ? payload.remainingSeconds
                : prev.countdown.remainingSeconds;

              if (isRunning && payload.targetEpoch) {
                remSecs = Math.max(0, Math.ceil((payload.targetEpoch - Date.now()) / 1000));
              }

              return {
                ...prev,
                countdown: {
                  ...prev.countdown,
                  isRunning,
                  hasStarted,
                  animateBirth: animateBirth ? true : (prev.countdown.animateBirth && isRunning),
                  remainingSeconds: remSecs,
                  targetEpoch: payload.targetEpoch,
                },
              };
            });
          }
        };
      }
    } catch {}

    // Step F: Set up SSE listener for local dev server
    let evtSource: EventSource | null = null;
    try {
      evtSource = new EventSource('/api/countdown/events');
      evtSource.onmessage = (event) => {
        try {
          const payload = JSON.parse(event.data);
          if (payload && (typeof payload.isRunning === 'boolean' || typeof payload.hasStarted === 'boolean')) {
            setSiteData((prev) => {
              const newRemaining = typeof payload.remainingSeconds === 'number'
                ? payload.remainingSeconds
                : prev.countdown.remainingSeconds;

              const isRunning = typeof payload.isRunning === 'boolean' ? payload.isRunning : prev.countdown.isRunning;
              const hasStarted = typeof payload.hasStarted === 'boolean'
                ? payload.hasStarted
                : (isRunning ? true : Boolean(prev.countdown.hasStarted));
              
              const animateBirth = payload.type === 'START';

              if (
                prev.countdown.isRunning === isRunning &&
                prev.countdown.hasStarted === hasStarted &&
                !animateBirth &&
                Math.abs((prev.countdown.remainingSeconds || 0) - (newRemaining || 0)) <= 1 &&
                prev.countdown.targetEpoch === payload.targetEpoch
              ) {
                return prev;
              }
              return {
                ...prev,
                countdown: {
                  ...prev.countdown,
                  isRunning,
                  hasStarted,
                  animateBirth,
                  remainingSeconds: newRemaining,
                  targetEpoch: payload.targetEpoch,
                  ...(payload.targetDate ? { targetDate: payload.targetDate } : {}),
                },
              };
            });
          }
        } catch (err) {
          console.warn('SSE payload parse note:', err);
        }
      };
    } catch (err) {
      console.warn('EventSource connection note:', err);
    }

    // Step G: Polling fallback every 2s
    const pollInterval = setInterval(async () => {
      try {
        const res = await fetch('/api/countdown/status');
        if (res.ok) {
          const contentType = res.headers.get('content-type') || '';
          if (!contentType.includes('application/json')) return;
          const status = await res.json();
          if (typeof status.isRunning === 'boolean' || typeof status.hasStarted === 'boolean') {
            setSiteData((prev) => {
              const isRunning = typeof status.isRunning === 'boolean' ? status.isRunning : prev.countdown.isRunning;
              const hasStarted = typeof status.hasStarted === 'boolean'
                ? status.hasStarted
                : (isRunning ? true : Boolean(prev.countdown.hasStarted));

              if (
                prev.countdown.isRunning === isRunning &&
                prev.countdown.hasStarted === hasStarted &&
                !prev.countdown.animateBirth
              ) {
                if (isRunning) {
                  if (status.targetEpoch && prev.countdown.targetEpoch !== status.targetEpoch) {
                    return {
                      ...prev,
                      countdown: { ...prev.countdown, targetEpoch: status.targetEpoch },
                    };
                  }
                  return prev;
                }
                const newRemaining = typeof status.remainingSeconds === 'number'
                  ? status.remainingSeconds
                  : prev.countdown.remainingSeconds;
                if (
                  typeof prev.countdown.remainingSeconds === 'number' &&
                  typeof newRemaining === 'number' &&
                  Math.abs(prev.countdown.remainingSeconds - newRemaining) < 1
                ) {
                  return prev;
                }
              }

              const newRemaining = typeof status.remainingSeconds === 'number'
                ? status.remainingSeconds
                : prev.countdown.remainingSeconds;

              return {
                ...prev,
                countdown: {
                  ...prev.countdown,
                  isRunning,
                  hasStarted,
                  remainingSeconds: newRemaining,
                  targetEpoch: status.targetEpoch,
                },
              };
            });
          }
        }
      } catch {}
    }, 2000);

    return () => {
      isCancelled = true;
      unsubscribeSync();
      bc?.close();
      evtSource?.close();
      clearInterval(pollInterval);
    };
  }, []);

  // 2. Local persistence (IndexedDB + localStorage) on state change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Persist to IndexedDB
    setPersistentData('siteData', siteData);

    // Persist to LocalStorage safely
    try {
      localStorage.setItem('dataxscape_2k26_state', JSON.stringify(siteData));
    } catch (e) {
      console.warn('LocalStorage save note:', e);
    }
  }, [siteData]);

  // Explicit helper to save content changes to disk without triggering loops
  const persistToServer = (updatedData: SiteData) => {
    fetch('/api/save-site-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData),
    }).catch((err) => {
      console.warn('Server save background note:', err);
    });
  };

  const updateCountdown = (newCountdown: Partial<CountdownSettings>) => {
    setSiteData((prev) => {
      const updated = {
        ...prev,
        countdown: { ...prev.countdown, ...newCountdown },
      };
      persistToServer(updated);
      return updated;
    });
  };

  // Remote trigger: Start countdown
  const startCountdown = async () => {
    let startFrom = siteData.countdown.remainingSeconds || (41 * 86400 + 21 * 3600 + 20 * 60 + 47);
    if (startFrom <= 0) {
      startFrom = 41 * 86400 + 21 * 3600 + 20 * 60 + 47;
    }
    const targetEpoch = Date.now() + startFrom * 1000;

    // 1. Local state update
    setSiteData((prev) => ({
      ...prev,
      countdown: {
        ...prev.countdown,
        isRunning: true,
        hasStarted: true,
        animateBirth: true,
        remainingSeconds: startFrom,
        targetEpoch,
      },
    }));

    const payload: SyncPayload = {
      type: 'START',
      hasStarted: true,
      isRunning: true,
      animateBirth: true,
      remainingSeconds: startFrom,
      targetEpoch,
      sentAt: Date.now(),
    };

    // 2. Publish to cloud MQTT sync
    countdownSync.publish(payload);

    // 3. Local BroadcastChannel
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('dataxscape_countdown_sync');
        bc.postMessage(payload);
        bc.close();
      }
    } catch {}

    // 4. Local dev API
    try {
      const res = await fetch('/api/countdown/start', { method: 'POST' });
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (typeof data.remainingSeconds === 'number') {
            setSiteData((prev) => ({
              ...prev,
              countdown: {
                ...prev.countdown,
                isRunning: true,
                hasStarted: true,
                animateBirth: true,
                remainingSeconds: data.remainingSeconds,
                targetEpoch: data.targetEpoch || targetEpoch,
              },
            }));
          }
        }
      }
    } catch (e) {
      console.warn('Network note on startCountdown:', e);
    }
  };

  const clearBirthAnimation = () => {
    setSiteData((prev) => {
      if (!prev.countdown.animateBirth) return prev;
      return {
        ...prev,
        countdown: {
          ...prev.countdown,
          animateBirth: false,
        },
      };
    });
  };

  // Remote trigger: Stop/Pause countdown
  const stopCountdown = async (currentSecondsRemaining?: number) => {
    let remainingSecs = typeof currentSecondsRemaining === 'number'
      ? currentSecondsRemaining
      : siteData.countdown.remainingSeconds;

    if (typeof remainingSecs !== 'number' || remainingSecs <= 0) {
      if (siteData.countdown.targetEpoch) {
        remainingSecs = Math.max(0, Math.ceil((siteData.countdown.targetEpoch - Date.now()) / 1000));
      } else {
        remainingSecs = 41 * 86400 + 21 * 3600 + 20 * 60 + 47;
      }
    }

    // 1. Local state update
    setSiteData((prev) => ({
      ...prev,
      countdown: {
        ...prev.countdown,
        isRunning: false,
        hasStarted: true, // Keep it visible in paused state!
        animateBirth: false,
        remainingSeconds: remainingSecs,
        targetEpoch: undefined,
      },
    }));

    const payload: SyncPayload = {
      type: 'STOP',
      hasStarted: true,
      isRunning: false,
      animateBirth: false,
      remainingSeconds: remainingSecs,
      sentAt: Date.now(),
    };

    // 2. Publish to cloud MQTT sync
    countdownSync.publish(payload);

    // 3. Local BroadcastChannel
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('dataxscape_countdown_sync');
        bc.postMessage(payload);
        bc.close();
      }
    } catch {}

    // 4. Local dev API
    try {
      const res = await fetch('/api/countdown/stop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ remainingSeconds: remainingSecs }),
      });
      if (res.ok) {
        const contentType = res.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const data = await res.json();
          if (typeof data.remainingSeconds === 'number') {
            setSiteData((prev) => ({
              ...prev,
              countdown: {
                ...prev.countdown,
                isRunning: false,
                hasStarted: true,
                animateBirth: false,
                remainingSeconds: data.remainingSeconds,
                targetEpoch: undefined,
              },
            }));
          }
        }
      }
    } catch (e) {
      console.warn('Network note on stopCountdown:', e);
    }
  };

  // Re-arm stage countdown (Admin: sets hasStarted=false, making screen empty again)
  const rearmCountdown = async () => {
    // 1. Local state update
    setSiteData((prev) => ({
      ...prev,
      countdown: {
        ...prev.countdown,
        isRunning: false,
        hasStarted: false,
        animateBirth: false,
        targetEpoch: undefined,
      },
    }));

    const payload: SyncPayload = {
      type: 'REARM',
      hasStarted: false,
      isRunning: false,
      animateBirth: false,
      sentAt: Date.now(),
    };

    // 2. Publish to cloud MQTT sync
    countdownSync.publish(payload);

    // 3. Local BroadcastChannel
    try {
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('dataxscape_countdown_sync');
        bc.postMessage(payload);
        bc.close();
      }
    } catch {}

    // 4. Local dev API
    try {
      await fetch('/api/countdown/rearm', { method: 'POST' });
    } catch (e) {
      console.warn('Network note on rearmCountdown:', e);
    }
  };

  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    const newEntry: GalleryPhoto = { ...photo, id: `g-${Date.now()}` };
    setSiteData((prev) => {
      const updated = {
        ...prev,
        gallery: [...prev.gallery, newEntry],
      };
      persistToServer(updated);
      return updated;
    });
  };

  // Upload an image file, save to disk, and add to gallery
  const uploadPhotoFile = async (file: File, title: string) => {
    const compressedDataUrl = await compressImage(file, 1400, 900, 0.88);
    try {
      const res = await fetch('/api/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataUrl: compressedDataUrl,
          filename: file.name,
        }),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.url) {
          addGalleryPhoto({ title, url: result.url });
          return;
        }
      }
    } catch (err) {
      console.warn('Server upload error, falling back to local persistent store:', err);
    }

    addGalleryPhoto({ title, url: compressedDataUrl });
  };

  const removeGalleryPhoto = (id: string) => {
    setSiteData((prev) => {
      const updated = {
        ...prev,
        gallery: prev.gallery.filter((p) => p.id !== id),
      };
      persistToServer(updated);
      return updated;
    });
  };

  const reorderGalleryPhotos = (newGallery: GalleryPhoto[]) => {
    setSiteData((prev) => {
      const updated = {
        ...prev,
        gallery: newGallery,
      };
      persistToServer(updated);
      return updated;
    });
  };

  // Upload multiple photos for the About section slideshow without needing titles
  const uploadMultipleAboutPhotos = async (files: FileList | File[]) => {
    const fileArray = Array.from(files);
    const uploadedUrls: string[] = [];

    for (const file of fileArray) {
      try {
        const compressed = await compressImage(file, 1400, 900, 0.88);
        const res = await fetch('/api/upload-photo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dataUrl: compressed,
            filename: file.name,
            folder: 'about',
          }),
        });

        if (res.ok) {
          const result = await res.json();
          if (result.url) {
            uploadedUrls.push(result.url);
            continue;
          }
        }
        uploadedUrls.push(compressed);
      } catch (err) {
        console.warn('Upload error for file:', file.name, err);
      }
    }

    if (uploadedUrls.length > 0) {
      setSiteData((prev) => {
        const updated = {
          ...prev,
          aboutPhotos: [...(prev.aboutPhotos || ['/images/about-team.jpg']), ...uploadedUrls],
        };
        persistToServer(updated);
        return updated;
      });
    }
    return uploadedUrls.length;
  };

  const removeAboutPhoto = (index: number) => {
    setSiteData((prev) => {
      const current = prev.aboutPhotos || ['/images/about-team.jpg'];
      const updatedList = current.filter((_, idx) => idx !== index);
      const updated = {
        ...prev,
        aboutPhotos: updatedList.length > 0 ? updatedList : ['/images/about-team.jpg'],
      };
      persistToServer(updated);
      return updated;
    });
  };

  const updateAboutInterval = (seconds: number) => {
    const val = Math.max(0.5, Math.min(60, Number(seconds) || 3.5));
    setSiteData((prev) => {
      const updated = {
        ...prev,
        aboutIntervalSeconds: val,
      };
      persistToServer(updated);
      return updated;
    });
  };

  const updateGalleryInterval = (seconds: number) => {
    const val = Math.max(0.5, Math.min(60, Number(seconds) || 4));
    setSiteData((prev) => {
      const updated = {
        ...prev,
        galleryIntervalSeconds: val,
      };
      persistToServer(updated);
      return updated;
    });
  };

  const updateSponsors = (newSponsors: Partial<SponsorSettings>) => {
    setSiteData((prev) => {
      const updated = {
        ...prev,
        sponsors: { ...prev.sponsors, ...newSponsors },
      };
      persistToServer(updated);
      return updated;
    });
  };

  const addSponsorItem = async (sponsor: Omit<SponsorItem, 'id'>) => {
    const newItem: SponsorItem = {
      ...sponsor,
      id: `sp-${Date.now()}`,
      aspect: sponsor.aspect ?? 0.8,
      frame: sponsor.frame ?? 'black',
      mat: sponsor.mat ?? true,
      drop: sponsor.drop ?? 0,
    };
    setSiteData((prev) => {
      const currentItems = Array.isArray(prev.sponsors.items) && prev.sponsors.items.length > 0
        ? prev.sponsors.items
        : DEFAULT_SPONSORS;
      const updated = {
        ...prev,
        sponsors: {
          ...prev.sponsors,
          items: [...currentItems, newItem],
        },
      };
      persistToServer(updated);
      return updated;
    });
  };

  const updateSponsorItem = (id: string, updatedFields: Partial<SponsorItem>) => {
    setSiteData((prev) => {
      const currentItems = Array.isArray(prev.sponsors.items) && prev.sponsors.items.length > 0
        ? prev.sponsors.items
        : DEFAULT_SPONSORS;
      const updatedItems = currentItems.map((item) =>
        item.id === id ? { ...item, ...updatedFields } : item
      );
      const updated = {
        ...prev,
        sponsors: {
          ...prev.sponsors,
          items: updatedItems,
        },
      };
      persistToServer(updated);
      return updated;
    });
  };

  const removeSponsorItem = (id: string) => {
    setSiteData((prev) => {
      const currentItems = Array.isArray(prev.sponsors.items) && prev.sponsors.items.length > 0
        ? prev.sponsors.items
        : DEFAULT_SPONSORS;
      const updatedItems = currentItems.filter((item) => item.id !== id);
      const updated = {
        ...prev,
        sponsors: {
          ...prev.sponsors,
          items: updatedItems,
        },
      };
      persistToServer(updated);
      return updated;
    });
  };

  const reorderSponsorItems = (newItems: SponsorItem[]) => {
    setSiteData((prev) => {
      const updated = {
        ...prev,
        sponsors: {
          ...prev.sponsors,
          items: newItems,
        },
      };
      persistToServer(updated);
      return updated;
    });
  };

  const uploadSponsorLogoFile = async (file: File): Promise<string> => {
    try {
      let dataUrl: string;
      if (file.type === 'image/svg+xml') {
        dataUrl = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } else {
        dataUrl = await compressImage(file, 800, 800, 0.9);
      }

      const res = await fetch('/api/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataUrl,
          filename: file.name,
          folder: 'sponsors',
        }),
      });

      if (res.ok) {
        const result = await res.json();
        if (result.url) {
          return result.url;
        }
      }
      return dataUrl;
    } catch (err) {
      console.warn('Error uploading sponsor logo:', err);
      throw err;
    }
  };

  const resetSponsorsToDefault = () => {
    setSiteData((prev) => {
      const updated = {
        ...prev,
        sponsors: {
          ...prev.sponsors,
          items: DEFAULT_SPONSORS,
        },
      };
      persistToServer(updated);
      return updated;
    });
  };

  const restoreVideoDefaults = async () => {
    setSiteData(INITIAL_SITE_DATA);
    try {
      localStorage.removeItem('dataxscape_2k26_state');
      await setPersistentData('siteData', INITIAL_SITE_DATA);
      await fetch('/api/save-site-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(INITIAL_SITE_DATA),
      });
    } catch (e) {
      console.warn('Reset error:', e);
    }
  };

  return (
    <SiteDataContext.Provider
      value={{
        siteData,
        updateCountdown,
        startCountdown,
        stopCountdown,
        rearmCountdown,
        clearBirthAnimation,
        addGalleryPhoto,
        uploadPhotoFile,
        removeGalleryPhoto,
        reorderGalleryPhotos,
        updateGalleryInterval,
        uploadMultipleAboutPhotos,
        removeAboutPhoto,
        updateAboutInterval,
        updateSponsors,
        addSponsorItem,
        updateSponsorItem,
        removeSponsorItem,
        reorderSponsorItems,
        uploadSponsorLogoFile,
        resetSponsorsToDefault,
        restoreVideoDefaults,
      }}
    >
      {children}
    </SiteDataContext.Provider>
  );
};

export const useSiteData = () => {
  const ctx = useContext(SiteDataContext);
  if (!ctx) throw new Error('useSiteData must be used within a SiteDataProvider');
  return ctx;
};
