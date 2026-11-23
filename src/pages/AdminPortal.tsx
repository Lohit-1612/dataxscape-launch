import React, { useState, useRef } from 'react';
import { useSiteData, GalleryPhoto, SponsorItem, DEFAULT_SPONSORS } from '../context/SiteDataContext';
import {
  Lock,
  Clock,
  Image as ImageIcon,
  Images,
  Upload,
  Award,
  Trash2,
  Plus,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Eye,
  EyeOff,
  Smartphone,
  Play,
  Square,
  QrCode,
  ExternalLink,
  Copy,
  Check,
  Radio,
  RotateCcw,
  Pencil,
  Layers,
  Tag
} from 'lucide-react';

interface AdminPortalProps {
  onBackToSite: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onBackToSite }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<'countdown' | 'about' | 'gallery' | 'sponsors'>('countdown');

  // New photo form state for 3D gallery
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Multiple photos state for About slideshow (no titles needed)
  const [aboutFiles, setAboutFiles] = useState<File[]>([]);
  const [isUploadingAbout, setIsUploadingAbout] = useState(false);
  const aboutFileInputRef = useRef<HTMLInputElement | null>(null);

  // Success toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const {
    siteData,
    updateCountdown,
    startCountdown,
    stopCountdown,
    rearmCountdown,
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
  } = useSiteData();

  // Sponsor management form state
  const [editingSponsorId, setEditingSponsorId] = useState<string | null>(null);
  const [sponsorTitle, setSponsorTitle] = useState('');
  const [sponsorArtist, setSponsorArtist] = useState('');
  const [sponsorYear, setSponsorYear] = useState('');
  const [sponsorTag, setSponsorTag] = useState('');
  const [sponsorFrame, setSponsorFrame] = useState<'black' | 'oak' | 'white'>('black');
  const [sponsorImage, setSponsorImage] = useState('');
  const [sponsorDetailsText, setSponsorDetailsText] = useState('');
  const [sponsorLogoFile, setSponsorLogoFile] = useState<File | null>(null);
  const [isUploadingSponsor, setIsUploadingSponsor] = useState(false);
  const sponsorFileInputRef = useRef<HTMLInputElement | null>(null);

  const resetSponsorForm = () => {
    setEditingSponsorId(null);
    setSponsorTitle('');
    setSponsorArtist('');
    setSponsorYear('');
    setSponsorTag('');
    setSponsorFrame('black');
    setSponsorImage('');
    setSponsorDetailsText('');
    setSponsorLogoFile(null);
    if (sponsorFileInputRef.current) sponsorFileInputRef.current.value = '';
  };

  const startEditingSponsor = (sp: SponsorItem) => {
    setEditingSponsorId(sp.id);
    setSponsorTitle(sp.title);
    setSponsorArtist(sp.artist || '');
    setSponsorYear(sp.year || '');
    setSponsorTag(sp.tag || '');
    setSponsorFrame(sp.frame || 'black');
    setSponsorImage(sp.image);
    setSponsorDetailsText((sp.details || []).join('\n'));
    setSponsorLogoFile(null);
    if (sponsorFileInputRef.current) sponsorFileInputRef.current.value = '';
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleSaveSponsor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sponsorTitle.trim()) {
      alert('Please provide a Sponsor / Partner Name.');
      return;
    }

    if (!sponsorLogoFile && !sponsorImage.trim()) {
      alert('Please upload a logo file or provide an image URL.');
      return;
    }

    setIsUploadingSponsor(true);
    try {
      let finalImageUrl = sponsorImage.trim();

      if (sponsorLogoFile) {
        finalImageUrl = await uploadSponsorLogoFile(sponsorLogoFile);
      }

      const details = sponsorDetailsText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      if (editingSponsorId) {
        updateSponsorItem(editingSponsorId, {
          title: sponsorTitle.trim(),
          artist: sponsorArtist.trim() || undefined,
          year: sponsorYear.trim() || undefined,
          tag: sponsorTag.trim() || undefined,
          frame: sponsorFrame,
          image: finalImageUrl,
          details: details.length > 0 ? details : undefined,
        });
        showToast(`Updated "${sponsorTitle}" in 3D Picture Rail!`);
      } else {
        await addSponsorItem({
          title: sponsorTitle.trim(),
          artist: sponsorArtist.trim() || undefined,
          year: sponsorYear.trim() || undefined,
          tag: sponsorTag.trim() || undefined,
          frame: sponsorFrame,
          image: finalImageUrl,
          details: details.length > 0 ? details : undefined,
          aspect: 0.8,
          mat: true,
          drop: 0,
        });
        showToast(`Added "${sponsorTitle}" to 3D Picture Rail!`);
      }

      resetSponsorForm();
    } catch (err) {
      console.error('Failed to save sponsor:', err);
      showToast('Error saving sponsor. Please check the file and try again.');
    } finally {
      setIsUploadingSponsor(false);
    }
  };

  const moveSponsor = (index: number, direction: 'left' | 'right') => {
    const list = Array.isArray(siteData.sponsors.items) && siteData.sponsors.items.length > 0
      ? [...siteData.sponsors.items]
      : [...DEFAULT_SPONSORS];
    const target = direction === 'left' ? index - 1 : index + 1;
    if (target < 0 || target >= list.length) return;
    const [moved] = list.splice(index, 1);
    list.splice(target, 0, moved);
    reorderSponsorItems(list);
    showToast(`Reordered "${moved.title}"!`);
  };

  const ADMIN_PASSKEY = 'admin123';

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === ADMIN_PASSKEY) {
      setIsAuthenticated(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  };

  // Handle local image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleAddPhoto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile && !newPhotoUrl.trim()) {
      alert('Please upload an image file or provide an image URL.');
      return;
    }
    if (!newPhotoTitle.trim()) {
      alert('Please enter a title for the photo.');
      return;
    }

    setIsUploading(true);
    try {
      if (selectedFile) {
        await uploadPhotoFile(selectedFile, newPhotoTitle);
      } else {
        addGalleryPhoto({
          title: newPhotoTitle,
          url: newPhotoUrl.trim(),
        });
      }

      setNewPhotoTitle('');
      setNewPhotoUrl('');
      setSelectedFile(null);
      showToast('Photo permanently saved to disk and gallery!');
    } catch (err) {
      console.error(err);
      alert('Failed to save photo: ' + String(err));
    } finally {
      setIsUploading(false);
    }
  };

  const movePhoto = (idx: number, direction: 'up' | 'down') => {
    const list = [...siteData.gallery];
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[idx];
    list[idx] = list[targetIdx];
    list[targetIdx] = temp;

    reorderGalleryPhotos(list);
    showToast('Gallery reordered successfully!');
  };

  // Multiple photos upload for About section slideshow
  const handleAboutFilesSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setAboutFiles(Array.from(e.target.files));
    }
  };

  const handleUploadAboutPhotos = async () => {
    if (aboutFiles.length === 0) {
      alert('Please choose at least one photo first.');
      return;
    }
    setIsUploadingAbout(true);
    try {
      const count = await uploadMultipleAboutPhotos(aboutFiles);
      setAboutFiles([]);
      if (aboutFileInputRef.current) {
        aboutFileInputRef.current.value = '';
      }
      showToast(`${count} photo(s) added to About slideshow & saved permanently!`);
    } catch (err) {
      console.error(err);
      alert('Failed to upload photos: ' + String(err));
    } finally {
      setIsUploadingAbout(false);
    }
  };

  // Unauthenticated PIN Gate
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-radial-gradient from-cyan-500/10 via-transparent to-transparent pointer-events-none" />

        <form
          onSubmit={handleLogin}
          className="relative max-w-md w-full bg-[#121212]/95 border border-cyan-500/30 p-8 sm:p-10 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.9)] backdrop-blur-xl text-left"
        >
          <div className="flex items-center gap-3 text-cyan-400 mb-4">
            <Lock className="w-7 h-7" />
            <h2 className="text-xl font-extrabold tracking-wider font-display">
              DATAXSCAPE CONTROL PORTAL
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-white/60 mb-6">
            Confidential management console. Enter the administrative passcode to access countdown, gallery, and sponsor controls.
          </p>

          <div className="relative mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setAuthError(false);
              }}
              placeholder="Enter passcode (default: admin123)"
              className="w-full bg-black/70 border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-3.5 text-white placeholder-white/35 focus:outline-none transition-colors pr-12 text-sm font-mono"
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {authError && (
            <div className="flex items-center gap-2 text-red-400 text-xs mb-4">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>Incorrect passcode. Please try again.</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-black font-bold text-sm tracking-wider uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(255,149,0,0.35)]"
          >
            Authenticate & Unlock
          </button>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onBackToSite}
              className="text-xs text-white/50 hover:text-cyan-400 transition-colors"
            >
              ← Return to public website
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-[#070707] text-white p-4 sm:p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Toast Alert */}
        {toastMessage && (
          <div className="fixed top-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-600 text-white px-5 py-3 rounded-xl shadow-2xl font-semibold text-sm animate-bounce">
            <CheckCircle className="w-5 h-5" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Admin Navigation Bar */}
        <header className="flex flex-wrap items-center justify-between pb-6 border-b border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Administrative Mode Active
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-display">
              DATAXSCAPE 2K26 ADMIN PORTAL
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 transition"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Website
            </button>
          </div>
        </header>

        {/* Tab Selection */}
        <nav className="flex gap-2 sm:gap-4 my-6 border-b border-white/10 pb-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('countdown')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'countdown'
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-black shadow-lg shadow-cyan-500/25'
                : 'bg-white/5 hover:bg-white/10 text-white/70'
            }`}
          >
            <Clock className="w-4 h-4" /> Countdown Manager
          </button>

          <button
            onClick={() => setActiveTab('about')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'about'
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-black shadow-lg shadow-cyan-500/25'
                : 'bg-white/5 hover:bg-white/10 text-white/70'
            }`}
          >
            <Images className="w-4 h-4" /> About Slideshow ({(siteData.aboutPhotos || []).length} Photos)
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-black shadow-lg shadow-cyan-500/25'
                : 'bg-white/5 hover:bg-white/10 text-white/70'
            }`}
          >
            <ImageIcon className="w-4 h-4" /> 3D Gallery ({siteData.gallery.length} Photos)
          </button>

          <button
            onClick={() => setActiveTab('sponsors')}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'sponsors'
                ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-black shadow-lg shadow-cyan-500/25'
                : 'bg-white/5 hover:bg-white/10 text-white/70'
            }`}
          >
            <Award className="w-4 h-4" /> 3D Sponsors ({((siteData.sponsors.items && siteData.sponsors.items.length) || DEFAULT_SPONSORS.length)} Cards)
          </button>
        </nav>

        {/* TAB 1: COUNTDOWN MANAGER */}
        {activeTab === 'countdown' && (() => {
          const isRunning = Boolean(siteData.countdown.isRunning);
          const detectedIp = '192.168.31.81';
          const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
          const remoteHost = isLocal ? detectedIp : (typeof window !== 'undefined' ? window.location.hostname : detectedIp);
          const remotePort = typeof window !== 'undefined' && window.location.port ? `:${window.location.port}` : ':3000';
          const remoteUrl = `${typeof window !== 'undefined' ? window.location.protocol : 'http:'}//${remoteHost}${remotePort}/#remote`;
          const localTabUrl = `/#remote`;

          return (
            <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 rounded-2xl space-y-8">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-1">Stage Countdown Controller</h3>
                  <p className="text-xs sm:text-sm text-white/60">
                    Real-time synchronization across stage displays and smartphones. Changes broadcast with zero lag.
                  </p>
                </div>

                {/* Live Status Pill */}
                <div className={`px-4 py-2 rounded-xl border flex items-center gap-2.5 font-mono text-xs uppercase font-bold tracking-wider ${
                  isRunning
                    ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]'
                    : 'bg-cyan-500/10 border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                }`}>
                  <span className={`w-2.5 h-2.5 rounded-full ${isRunning ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`} />
                  <span>
                    {isRunning
                      ? 'COUNTDOWN: RUNNING'
                      : `PAUSED AT: ${(() => {
                          const sec = siteData.countdown.remainingSeconds || (41 * 86400 + 21 * 3600 + 20 * 60 + 47);
                          const d = Math.floor(sec / 86400);
                          const h = Math.floor((sec % 86400) / 3600);
                          const m = Math.floor((sec % 3600) / 60);
                          const s = sec % 60;
                          return `${d}D ${h}H ${m}M ${s}S (SAVED)`;
                        })()}`
                    }
                  </span>
                </div>
              </div>

              {/* MASTER CONTROLS: STOP & START */}
              <div className="bg-black/60 border border-white/10 p-6 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white">
                      Direct Stage Controls
                    </h4>
                    <p className="text-xs text-white/50">
                      You can stop the countdown immediately from this admin panel. Start can be triggered from your phone or using the button below.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  {/* STOP BUTTON - Prominently emphasized */}
                  <button
                    type="button"
                    onClick={async () => {
                      await stopCountdown();
                      showToast('🛑 Stage Countdown STOPPED and frozen on screen!');
                    }}
                    disabled={!isRunning}
                    className={`py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all ${
                      !isRunning
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5 opacity-50'
                        : 'bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)] active:scale-95 cursor-pointer border border-red-500/50'
                    }`}
                  >
                    <Square className="w-5 h-5 fill-current" />
                    <span>STOP COUNTDOWN</span>
                  </button>

                  {/* START / RESUME BUTTON */}
                  <button
                    type="button"
                    onClick={async () => {
                      await startCountdown();
                      showToast('▶ Stage Countdown STARTED on screen!');
                    }}
                    disabled={isRunning}
                    className={`py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base uppercase tracking-wider flex items-center justify-center gap-3 transition-all ${
                      isRunning
                        ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-white/5 opacity-50'
                        : 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 text-black shadow-[0_0_30px_rgba(0,210,255,0.5)] active:scale-95 cursor-pointer border border-cyan-300'
                    }`}
                  >
                    <Play className="w-5 h-5 fill-current" />
                    <span>START COUNTDOWN</span>
                  </button>
                </div>

                {/* RE-ARM STAGE (MAKE EMPTY) BUTTON */}
                <div className="pt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={async () => {
                      if (window.confirm('Re-arm countdown? This pauses the timer and hides it from the public stage until START is pressed again.')) {
                        await rearmCountdown();
                        showToast('🔄 Stage Re-Armed! Countdown is dormant/empty awaiting Start.');
                      }
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Re-Arm Stage (Make Empty for Kickoff)</span>
                  </button>
                </div>
              </div>

              {/* SMARTPHONE REMOTE CONTROLLER CARD */}
              <div className="bg-gradient-to-br from-cyan-500/10 via-black/80 to-black/90 border border-cyan-500/30 p-6 sm:p-7 rounded-2xl relative overflow-hidden">
                <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
                  <div className="space-y-3 flex-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-[11px] font-mono font-bold tracking-wider uppercase">
                      <Smartphone className="w-3.5 h-3.5" />
                      <span>Mobile Wireless Remote</span>
                    </div>

                    <h4 className="text-lg sm:text-xl font-extrabold text-white font-display tracking-wide">
                      Start Countdown From Your Smartphone
                    </h4>

                    <p className="text-xs sm:text-sm text-white/70 leading-relaxed max-w-xl">
                      Scan the QR code with your mobile phone camera or open the URL below. You can step onto the stage with your phone in hand and tap <strong>START COUNTDOWN</strong> to launch the timer on the main display with zero buttons visible to the audience!
                    </p>

                    {/* URL and Copy Link */}
                    <div className="pt-2 flex flex-wrap items-center gap-2.5">
                      <div className="bg-black/90 border border-white/20 rounded-lg px-3.5 py-2 font-mono text-xs text-cyan-300 select-all max-w-full overflow-hidden text-ellipsis">
                        {remoteUrl}
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText(remoteUrl);
                          setCopiedLink(true);
                          showToast('Phone remote link copied to clipboard!');
                          setTimeout(() => setCopiedLink(false), 2500);
                        }}
                        className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs flex items-center gap-1.5 transition active:scale-95"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? 'Copied!' : 'Copy Link'}</span>
                      </button>

                      <a
                        href={localTabUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs flex items-center gap-1.5 transition active:scale-95 shadow-md shadow-cyan-500/20"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Remote in Tab</span>
                      </a>
                    </div>

                    <div className="text-[11px] font-mono text-white/50 pt-1">
                      Phone Passcode: <span className="text-cyan-400 font-bold">admin123</span> • Phone & PC should be on the same Wi-Fi
                    </div>
                  </div>

                  {/* QR Code Container */}
                  <div className="flex flex-col items-center flex-shrink-0 bg-black/90 p-3.5 rounded-2xl border border-cyan-500/40 shadow-2xl text-center">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(remoteUrl)}&bgcolor=12-12-12&color=f59e0b&margin=6`}
                      alt="Remote QR Code"
                      className="w-32 h-32 sm:w-36 sm:h-36 rounded-xl object-contain"
                    />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400/80 mt-2 font-bold">
                      Scan to Open on Phone
                    </span>
                  </div>
                </div>
              </div>

              {/* Countdown Settings Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Target Date Picker */}
                <div className="bg-black/50 p-5 rounded-xl border border-white/10">
                  <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                    Target Hackathon Date & Time
                  </label>
                  <input
                    type="datetime-local"
                    value={siteData.countdown.targetDate.slice(0, 16)}
                    onChange={(e) => {
                      updateCountdown({ targetDate: e.target.value });
                      showToast('Target date updated!');
                    }}
                    className="w-full bg-black/80 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none"
                  />
                  <span className="text-[11px] text-white/40 mt-1 block">
                    Current target: {new Date(siteData.countdown.targetDate).toLocaleString()}
                  </span>
                </div>

                {/* Countdown Mode Toggle */}
                <div className="bg-black/50 p-5 rounded-xl border border-white/10 flex flex-col justify-between">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                      Countdown Mode
                    </label>
                    <p className="text-xs text-white/60 mb-3">
                      {siteData.countdown.isLive
                        ? 'Currently auto-calculating real time to target date.'
                        : 'Currently frozen at custom static numbers.'}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      updateCountdown({ isLive: !siteData.countdown.isLive });
                      showToast(siteData.countdown.isLive ? 'Switched to Static Mode' : 'Switched to Live Ticking Mode');
                    }}
                    className={`w-full py-2.5 rounded-lg font-bold text-xs uppercase tracking-wider transition ${
                      siteData.countdown.isLive
                        ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                        : 'bg-cyan-500 text-black hover:bg-cyan-400'
                    }`}
                  >
                    {siteData.countdown.isLive ? 'Live Calculation Active' : 'Static Override Active'}
                  </button>
                </div>
              </div>

              {/* Static Numbers Override */}
              {!siteData.countdown.isLive && (
                <div className="bg-black/50 p-5 rounded-xl border border-cyan-500/30">
                  <label className="block text-xs uppercase tracking-wider text-cyan-400 font-semibold mb-3">
                    Fixed Numbers (Days : Hours : Mins : Secs)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <span className="text-[10px] text-white/50 block mb-1">DAYS</span>
                      <input
                        type="number"
                        value={siteData.countdown.staticDays}
                        onChange={(e) => updateCountdown({ staticDays: parseInt(e.target.value) || 0 })}
                        className="w-full bg-black border border-white/20 rounded p-2 text-center font-mono text-lg font-bold text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block mb-1">HOURS</span>
                      <input
                        type="number"
                        value={siteData.countdown.staticHours}
                        onChange={(e) => updateCountdown({ staticHours: parseInt(e.target.value) || 0 })}
                        className="w-full bg-black border border-white/20 rounded p-2 text-center font-mono text-lg font-bold text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block mb-1">MINUTES</span>
                      <input
                        type="number"
                        value={siteData.countdown.staticMinutes}
                        onChange={(e) => updateCountdown({ staticMinutes: parseInt(e.target.value) || 0 })}
                        className="w-full bg-black border border-white/20 rounded p-2 text-center font-mono text-lg font-bold text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-white/50 block mb-1">SECONDS</span>
                      <input
                        type="number"
                        value={siteData.countdown.staticSeconds}
                        onChange={(e) => updateCountdown({ staticSeconds: parseInt(e.target.value) || 0 })}
                        className="w-full bg-black border border-white/20 rounded p-2 text-center font-mono text-lg font-bold text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Headline Editor */}
              <div className="bg-black/50 p-5 rounded-xl border border-white/10">
                <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-2">
                  Countdown Title Headline
                </label>
                <input
                  type="text"
                  value={siteData.countdown.headline}
                  onChange={(e) => updateCountdown({ headline: e.target.value })}
                  placeholder="COUNTDOWN"
                  className="w-full bg-black/80 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none"
                />
              </div>
            </div>
          );
        })()}

        {/* TAB 2: ABOUT SECTION SLIDESHOW MANAGER */}
        {activeTab === 'about' && (
          <div className="space-y-8">
            {/* Slideshow Transition Timing (Seconds) Configuration */}
            <div className="bg-[#121212] border border-cyan-500/30 p-6 sm:p-8 rounded-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
                    <Clock className="w-4 h-4" />
                    Slideshow Timing Configuration
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-1">
                    About Slideshow Transition Speed
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60">
                    Control how many seconds each photo stays on screen before automatically transitioning to the next slide.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-xl">
                  <span className="text-xs text-white/50 uppercase font-mono">Current Speed:</span>
                  <span className="text-base font-extrabold text-cyan-400 font-mono">
                    {siteData.aboutIntervalSeconds ?? 3.5}s
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                {/* Range Slider */}
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-[11px] font-mono text-white/40 mb-1.5">
                    <span>Fast (1s)</span>
                    <span>Default (3.5s)</span>
                    <span>Relaxed (7s)</span>
                    <span>Slow (15s)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={siteData.aboutIntervalSeconds ?? 3.5}
                    onChange={(e) => {
                      updateAboutInterval(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Numeric Input */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    step="0.5"
                    value={siteData.aboutIntervalSeconds ?? 3.5}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val)) updateAboutInterval(val);
                    }}
                    className="w-20 bg-black/80 border border-white/20 focus:border-cyan-400 rounded-lg px-3 py-2 text-center text-sm font-bold font-mono text-cyan-400 focus:outline-none"
                  />
                  <span className="text-xs text-white/60 font-mono">seconds</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] uppercase tracking-wider text-white/40 font-mono mr-1">Quick Presets:</span>
                {[1.5, 2.5, 3.5, 5, 8].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => {
                      updateAboutInterval(sec);
                      showToast(`About slideshow speed set to ${sec}s!`);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                      (siteData.aboutIntervalSeconds ?? 3.5) === sec
                        ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                        : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/5'
                    }`}
                  >
                    {sec}s {sec === 1.5 ? '(Fast)' : sec === 3.5 ? '(Default)' : sec === 5 ? '(Relaxed)' : sec === 8 ? '(Slow)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Multi-Photo Upload Card */}
            <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-1 flex items-center gap-2">
                    <Images className="w-5 h-5 text-cyan-400" />
                    About Section Slideshow Photos
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60">
                    Add multiple photos without typing names. Selected photos will run continuously like an automated looping slideshow in the About DataXscape 2k26 section.
                  </p>
                </div>
                <div className="text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 px-3 py-1.5 rounded-lg">
                  {(siteData.aboutPhotos || []).length} Active Slide(s)
                </div>
              </div>

              {/* Upload Drop Zone / Multi-file Picker */}
              <div className="bg-black/50 border-2 border-dashed border-cyan-500/30 hover:border-cyan-500/60 transition-colors p-6 sm:p-8 rounded-xl text-center">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  ref={aboutFileInputRef}
                  onChange={handleAboutFilesSelect}
                  className="hidden"
                  id="about-multi-upload"
                />
                <label
                  htmlFor="about-multi-upload"
                  className="inline-flex flex-col items-center justify-center cursor-pointer group"
                >
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-3 transition">
                    <Upload className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition">
                    Click to Choose Multiple Photos
                  </span>
                  <span className="text-xs text-white/50 mt-1">
                    Select 1 or more images at once (PNG, JPG, WebP) — No names or titles required
                  </span>
                </label>

                {aboutFiles.length > 0 && (
                  <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-left">
                      <span className="text-xs text-emerald-400 font-semibold block">
                        ✓ {aboutFiles.length} photo(s) selected:
                      </span>
                      <span className="text-[11px] text-white/50 truncate max-w-md block">
                        {aboutFiles.map((f) => f.name).join(', ')}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setAboutFiles([]);
                          if (aboutFileInputRef.current) aboutFileInputRef.current.value = '';
                        }}
                        className="px-3 py-2 text-xs text-white/60 hover:text-white transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        disabled={isUploadingAbout}
                        onClick={handleUploadAboutPhotos}
                        className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 text-black font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition shadow-lg shadow-cyan-500/20 cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        {isUploadingAbout
                          ? 'Uploading & Saving to Disk...'
                          : `Upload ${aboutFiles.length} Photos Now`}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Current Slideshow Photos Grid with Delete Buttons */}
            <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">
                  Current Slideshow Queue ({(siteData.aboutPhotos || []).length})
                </h3>
                <span className="text-xs text-white/50 font-mono">
                  Loops continuously every 3.5s on home page
                </span>
              </div>

              {(siteData.aboutPhotos || []).length === 0 ? (
                <div className="text-center py-12 text-white/40 text-sm">
                  No photos in the About slideshow yet. Select photos above to add.
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {(siteData.aboutPhotos || []).map((url, idx) => (
                    <div
                      key={idx}
                      className="relative bg-black/60 border border-white/10 rounded-xl overflow-hidden p-2.5 flex flex-col justify-between group hover:border-cyan-500/40 transition"
                    >
                      <div className="w-full h-36 rounded-lg overflow-hidden mb-2 bg-neutral-900 border border-white/5 relative">
                        <img
                          src={url}
                          alt={`Slide ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute top-2 left-2 bg-black/75 backdrop-blur-sm text-cyan-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded border border-cyan-500/20">
                          Slide #{idx + 1}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-white/40 truncate max-w-[120px]">
                          {url.split('/').pop() || `Photo ${idx + 1}`}
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Remove Slide #${idx + 1} from the About slideshow?`)) {
                              removeAboutPhoto(idx);
                              showToast(`Slide #${idx + 1} removed`);
                            }
                          }}
                          className="p-1.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-400 transition"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: GALLERY PHOTOS MANAGER */}
        {activeTab === 'gallery' && (
          <div className="space-y-8">
            {/* 3D Gallery Auto-Rotation Timing (Seconds) Configuration */}
            <div className="bg-[#121212] border border-cyan-500/30 p-6 sm:p-8 rounded-2xl space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
                    <Clock className="w-4 h-4" />
                    3D Gallery Auto-Slide Timing
                  </div>
                  <h3 className="text-xl font-bold text-cyan-400 mb-1">
                    3D Gallery Auto-Rotation Speed
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60">
                    Control how many seconds each photo stays focused in the 3D coverflow carousel before automatically rotating to the next.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-cyan-500/10 border border-cyan-500/30 px-4 py-2 rounded-xl">
                  <span className="text-xs text-white/50 uppercase font-mono">Current Speed:</span>
                  <span className="text-base font-extrabold text-cyan-400 font-mono">
                    {siteData.galleryIntervalSeconds ?? 4}s
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                {/* Range Slider */}
                <div className="flex-1 w-full">
                  <div className="flex justify-between text-[11px] font-mono text-white/40 mb-1.5">
                    <span>Fast (1s)</span>
                    <span>Default (4s)</span>
                    <span>Relaxed (7s)</span>
                    <span>Slow (15s)</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="0.5"
                    value={siteData.galleryIntervalSeconds ?? 4}
                    onChange={(e) => {
                      updateGalleryInterval(parseFloat(e.target.value));
                    }}
                    className="w-full accent-cyan-500 cursor-pointer h-2 bg-zinc-800 rounded-lg appearance-none"
                  />
                </div>

                {/* Numeric Input */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <input
                    type="number"
                    min="1"
                    max="30"
                    step="0.5"
                    value={siteData.galleryIntervalSeconds ?? 4}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val)) updateGalleryInterval(val);
                    }}
                    className="w-20 bg-black/80 border border-white/20 focus:border-cyan-400 rounded-lg px-3 py-2 text-center text-sm font-bold font-mono text-cyan-400 focus:outline-none"
                  />
                  <span className="text-xs text-white/60 font-mono">seconds</span>
                </div>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] uppercase tracking-wider text-white/40 font-mono mr-1">Quick Presets:</span>
                {[2, 4, 6, 8, 10].map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => {
                      updateGalleryInterval(sec);
                      showToast(`3D Gallery speed set to ${sec}s!`);
                    }}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition ${
                      (siteData.galleryIntervalSeconds ?? 4) === sec
                        ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                        : 'bg-white/5 hover:bg-white/10 text-white/70 border border-white/5'
                    }`}
                  >
                    {sec}s {sec === 2 ? '(Fast)' : sec === 4 ? '(Default)' : sec === 6 ? '(Relaxed)' : sec === 10 ? '(Slow)' : ''}
                  </button>
                ))}
              </div>
            </div>

            {/* Add New Photo Form */}
            <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-cyan-400 mb-1">Add Photo to 3D Gallery</h3>
              <p className="text-xs sm:text-sm text-white/60 mb-6">
                Upload an image or supply an image URL to add a new card to the 3D coverflow carousel.
              </p>

              <form onSubmit={handleAddPhoto} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Photo Title *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Brainstorming Session"
                      value={newPhotoTitle}
                      onChange={(e) => setNewPhotoTitle(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/80 mb-1.5">
                      Option A: Paste Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://images.unsplash.com/..."
                      value={newPhotoUrl}
                      onChange={(e) => setNewPhotoUrl(e.target.value)}
                      className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-1.5">
                    Option B: Upload from Computer
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-xs text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500 file:text-black hover:file:bg-cyan-400 cursor-pointer"
                  />
                  {selectedFile && (
                    <span className="text-xs text-emerald-400 mt-1 block">
                      ✓ Selected file: {selectedFile.name} (will be saved permanently to disk)
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isUploading}
                  className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 text-black font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition"
                >
                  <Plus className="w-4 h-4" /> {isUploading ? 'Saving Photo to Disk...' : 'Add Photo to Carousel'}
                </button>
              </form>
            </div>

            {/* Existing Photos Grid with Reordering & Deletion */}
            <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 rounded-2xl">
              <h3 className="text-xl font-bold text-white mb-4">
                Current Gallery Photos ({siteData.gallery.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                {siteData.gallery.map((img: GalleryPhoto, idx: number) => (
                  <div
                    key={img.id}
                    className="relative bg-black/60 border border-white/10 rounded-xl overflow-hidden p-3 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="w-full h-40 rounded-lg overflow-hidden mb-2 bg-neutral-900 border border-white/5">
                        <img
                          src={img.url}
                          alt={img.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-mono text-cyan-400 font-bold">
                          Slide #{idx + 1}
                        </span>
                        <span className="text-[11px] text-white/50 truncate max-w-[150px]">
                          {img.title}
                        </span>
                      </div>
                    </div>

                    {/* Action Controls */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/10">
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => movePhoto(idx, 'up')}
                          disabled={idx === 0}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white transition"
                          title="Move Left / Earlier"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => movePhoto(idx, 'down')}
                          disabled={idx === siteData.gallery.length - 1}
                          className="p-1.5 rounded bg-white/5 hover:bg-white/15 disabled:opacity-30 text-white transition"
                          title="Move Right / Later"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm(`Delete "${img.title}" from the gallery?`)) {
                            removeGalleryPhoto(img.id);
                            showToast('Photo removed from gallery');
                          }
                        }}
                        className="p-1.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-400 transition"
                        title="Delete Photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: 3D PICTURE RAIL SPONSORS MANAGER */}
        {activeTab === 'sponsors' && (() => {
          const currentSponsorList = Array.isArray(siteData.sponsors.items) && siteData.sponsors.items.length > 0
            ? siteData.sponsors.items
            : DEFAULT_SPONSORS;

          return (
            <div className="space-y-8">
              {/* 1. SECTION BRANDING & OVERVIEW */}
              <div className="bg-[#121212] border border-cyan-500/30 p-6 sm:p-8 rounded-2xl space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono font-bold tracking-widest uppercase mb-1">
                      <Award className="w-4 h-4" />
                      3D Picture Rail Sponsors & Partners
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Sponsors Management & 3D Rail Display
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60">
                      Add, edit, reorder and customize sponsor cards, logo artworks, ribbon tier tags, and flip-card specifications.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      if (window.confirm('Reset all sponsor cards to default 6 official partners?')) {
                        resetSponsorsToDefault();
                        resetSponsorForm();
                        showToast('Reset sponsor cards to official partners!');
                      }
                    }}
                    className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-mono font-bold rounded-xl flex items-center gap-2 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5" /> Reset to Defaults
                  </button>
                </div>

                {/* Global Tagline & HUD settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1.5">
                      Section Tagline / Caption
                    </label>
                    <input
                      type="text"
                      value={siteData.sponsors.sponsorTagline}
                      onChange={(e) => updateSponsors({ sponsorTagline: e.target.value })}
                      placeholder="Empowering 24 hours of non-stop intelligence..."
                      className="w-full bg-black/80 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-white/70 font-semibold mb-1.5">
                      HUD Viewfinder Brand Text (Top-Right)
                    </label>
                    <input
                      type="text"
                      value={siteData.sponsors.hudSponsorName}
                      onChange={(e) => updateSponsors({ hudSponsorName: e.target.value })}
                      placeholder="e.g. DATAXSCAPE // 2026"
                      className="w-full bg-black/80 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-white font-mono text-sm focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* 2. ADD / EDIT SPONSOR CARD FORM */}
              <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 rounded-2xl relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-cyan-400 flex items-center gap-2">
                      {editingSponsorId ? (
                        <>
                          <Pencil className="w-5 h-5 text-cyan-400" /> Edit Sponsor Card: {sponsorTitle || 'Unnamed'}
                        </>
                      ) : (
                        <>
                          <Plus className="w-5 h-5 text-cyan-400" /> Add New Sponsor Card
                        </>
                      )}
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60">
                      Configure sponsor title, custom logo image, ribbon badge, and back-of-card specifications.
                    </p>
                  </div>

                  {editingSponsorId && (
                    <button
                      type="button"
                      onClick={resetSponsorForm}
                      className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-xs font-mono font-bold text-white rounded-lg transition"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>

                <form onSubmit={handleSaveSponsor} className="space-y-5">
                  {/* Row 1: Name & Role/Subtitle */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">
                        Sponsor / Partner Name *
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Google Cloud, GitHub, Supabase"
                        value={sponsorTitle}
                        onChange={(e) => setSponsorTitle(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">
                        Subtitle / Role Track
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Global AI & Cloud Platform"
                        value={sponsorArtist}
                        onChange={(e) => setSponsorArtist(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Row 2: Ribbon Badge Tag, Category, Frame Style */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">
                        Ribbon Badge (Tag)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. TITLE SPONSOR, DEV PLATFORM"
                        value={sponsorTag}
                        onChange={(e) => setSponsorTag(e.target.value.toUpperCase())}
                        className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-sm text-cyan-400 font-mono font-bold focus:outline-none"
                      />
                      <span className="text-[10px] text-white/40 mt-1 block">Displayed beneath the hanging frame.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">
                        Tier / Category Label
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Title Sponsor, Platform Partner"
                        value={sponsorYear}
                        onChange={(e) => setSponsorYear(e.target.value)}
                        className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none"
                      />
                      <span className="text-[10px] text-white/40 mt-1 block">Printed on detail subtitle.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-white/80 mb-1.5">
                        Frame Moulding Style
                      </label>
                      <select
                        value={sponsorFrame}
                        onChange={(e) => setSponsorFrame(e.target.value as any)}
                        className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none cursor-pointer"
                      >
                        <option value="black">Cyber Obsidian Black (Recommended)</option>
                        <option value="oak">Titanium Oak</option>
                        <option value="white">Steel White</option>
                      </select>
                      <span className="text-[10px] text-white/40 mt-1 block">3D metallic bevel style.</span>
                    </div>
                  </div>

                  {/* Row 3: Logo Upload & Logo URL */}
                  <div className="bg-black/40 border border-white/10 rounded-xl p-4 space-y-3">
                    <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400">
                      Sponsor Logo / Card Artwork
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                      <div>
                        <label className="block text-[11px] font-semibold text-white/70 mb-1.5">
                          Option A: Upload Logo Image / SVG from Computer
                        </label>
                        <input
                          ref={sponsorFileInputRef}
                          type="file"
                          accept="image/*,.svg"
                          onChange={(e) => {
                            const f = e.target.files?.[0];
                            if (f) {
                              setSponsorLogoFile(f);
                              setSponsorImage('');
                            }
                          }}
                          className="w-full text-xs text-white/70 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-cyan-500 file:text-black hover:file:bg-cyan-400 cursor-pointer"
                        />
                        {sponsorLogoFile && (
                          <span className="text-xs text-emerald-400 mt-1 block">
                            ✓ Selected: {sponsorLogoFile.name} (will be saved to /public/images/sponsors/)
                          </span>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-white/70 mb-1.5">
                          Option B: Or Enter Image / SVG URL
                        </label>
                        <input
                          type="text"
                          placeholder="/images/sponsors/sp-google-cloud.svg or https://..."
                          value={sponsorImage}
                          onChange={(e) => {
                            setSponsorImage(e.target.value);
                            if (e.target.value) setSponsorLogoFile(null);
                          }}
                          className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2 text-xs text-white focus:outline-none font-mono"
                        />
                      </div>
                    </div>

                    {/* Preview Thumbnail if image or file selected */}
                    {(sponsorLogoFile || sponsorImage) && (
                      <div className="flex items-center gap-3 pt-2">
                        <span className="text-[11px] text-white/50">Logo Preview:</span>
                        <div className="w-12 h-12 rounded-lg bg-neutral-900 border border-cyan-500/30 p-1 flex items-center justify-center overflow-hidden">
                          <img
                            src={sponsorLogoFile ? URL.createObjectURL(sponsorLogoFile) : sponsorImage}
                            alt="Logo Preview"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Row 4: Back of Card Details */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-semibold text-white/80">
                        Card Content Details (Printed on Back of 3D Card)
                      </label>
                      <span className="text-[11px] font-mono text-cyan-400">One bullet point per line</span>
                    </div>
                    <textarea
                      rows={4}
                      value={sponsorDetailsText}
                      onChange={(e) => setSponsorDetailsText(e.target.value)}
                      placeholder="Role: Title Sponsor & Cloud Infrastructure&#10;Offering: $10,000+ Vertex AI Credits & Cloud Sandbox&#10;Tracks: GenAI, Autonomous Agents & Big Data&#10;Status: Verified Strategic Partner"
                      className="w-full bg-black/60 border border-white/15 focus:border-cyan-400 rounded-lg px-4 py-2.5 text-xs font-mono text-white focus:outline-none resize-none leading-relaxed"
                    />
                    <span className="text-[11px] text-white/40 mt-1 block">
                      When a visitor flips the card in 3D inspection mode, these lines appear as verified specification chips.
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={isUploadingSponsor}
                      className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 disabled:opacity-50 text-black font-bold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition shadow-lg shadow-cyan-500/20"
                    >
                      {editingSponsorId ? (
                        <>
                          <Check className="w-4 h-4" /> {isUploadingSponsor ? 'Saving Changes...' : 'Update Sponsor Card'}
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4" /> {isUploadingSponsor ? 'Adding Sponsor...' : 'Add Sponsor Card'}
                        </>
                      )}
                    </button>

                    {editingSponsorId && (
                      <button
                        type="button"
                        onClick={resetSponsorForm}
                        className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl transition"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* 3. CURRENT SPONSORS ORDERED GRID */}
              <div className="bg-[#121212] border border-white/10 p-6 sm:p-8 rounded-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Current Picture Rail Sponsors ({currentSponsorList.length})
                    </h3>
                    <p className="text-xs sm:text-sm text-white/60">
                      Use arrows to reorder along the hanging picture rail. Click Edit to customize card content.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {currentSponsorList.map((sp: SponsorItem, idx: number) => (
                    <div
                      key={sp.id}
                      className={`relative bg-black/60 border rounded-xl overflow-hidden p-4 flex flex-col justify-between group transition-all duration-200 ${
                        editingSponsorId === sp.id ? 'border-cyan-400 shadow-[0_0_20px_rgba(0,210,255,0.3)]' : 'border-white/10 hover:border-cyan-500/40'
                      }`}
                    >
                      <div>
                        {/* Visual Thumbnail */}
                        <div className="w-full h-36 rounded-lg overflow-hidden mb-3 bg-[#020617] border border-cyan-500/20 p-2 flex items-center justify-center relative">
                          <img
                            src={sp.image}
                            alt={sp.title}
                            className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-[0_4px_10px_rgba(0,210,255,0.4)]"
                          />
                          {sp.tag && (
                            <span className="absolute top-2 right-2 text-[9px] font-mono font-bold px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400 text-cyan-300">
                              {sp.tag}
                            </span>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-mono text-cyan-400 font-bold">
                            Position #{idx + 1}
                          </span>
                          <span className="text-[10px] text-white/50 uppercase font-mono">
                            {sp.year || 'Partner'}
                          </span>
                        </div>

                        <h4 className="text-base font-bold text-white font-display truncate">
                          {sp.title}
                        </h4>
                        {sp.artist && (
                          <p className="text-xs text-white/60 font-mono truncate mb-2">
                            {sp.artist}
                          </p>
                        )}

                        {/* Details count preview */}
                        {sp.details && sp.details.length > 0 && (
                          <div className="flex items-center gap-1.5 text-[10px] text-cyan-300 font-mono bg-cyan-500/10 px-2 py-1 rounded mb-2">
                            <Layers className="w-3 h-3" />
                            <span>{sp.details.length} back-card specification points</span>
                          </div>
                        )}
                      </div>

                      {/* Action Controls */}
                      <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-2">
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveSponsor(idx, 'left')}
                            disabled={idx === 0}
                            className="p-1.5 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white transition"
                            title="Move Left (Earlier on Rail)"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveSponsor(idx, 'right')}
                            disabled={idx === currentSponsorList.length - 1}
                            className="p-1.5 rounded bg-white/5 hover:bg-white/15 disabled:opacity-20 text-white transition"
                            title="Move Right (Later on Rail)"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => startEditingSponsor(sp)}
                            className="px-2.5 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold flex items-center gap-1 transition"
                            title="Edit Sponsor Card"
                          >
                            <Pencil className="w-3 h-3" /> Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm(`Delete "${sp.title}" from the Sponsors rail?`)) {
                                removeSponsorItem(sp.id);
                                if (editingSponsorId === sp.id) resetSponsorForm();
                                showToast(`Removed "${sp.title}" from sponsors!`);
                              }
                            }}
                            className="p-1.5 rounded bg-red-950/60 hover:bg-red-900 border border-red-500/30 text-red-400 transition"
                            title="Delete Sponsor Card"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
