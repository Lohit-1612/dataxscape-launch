import React, { useState, useEffect } from 'react';
import { useSiteData } from '../context/SiteDataContext';
import { countdownSync } from '../services/countdownSync';
import { Play, Pause, Smartphone, CheckCircle, Radio, RotateCcw } from 'lucide-react';

export const MobileRemote: React.FC = () => {
  const { siteData, startCountdown, stopCountdown, rearmCountdown } = useSiteData();
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [isCloudConnected, setIsCloudConnected] = useState(countdownSync.getStatus());
  const REMOTE_PASSCODE = 'admin123';
  const isRunning = siteData.countdown.isRunning;
  const hasStarted = Boolean(siteData.countdown.hasStarted || isRunning);

  useEffect(() => {
    return countdownSync.onStatusChange((connected) => {
      setIsCloudConnected(connected);
    });
  }, []);

  const getSeconds = (): number => {
    if (siteData.countdown.targetEpoch && siteData.countdown.isRunning) {
      return Math.max(0, Math.floor((siteData.countdown.targetEpoch - Date.now()) / 1000));
    }
    return siteData.countdown.remainingSeconds ?? 0;
  };

  const [liveSeconds, setLiveSeconds] = useState<number>(getSeconds);

  // Local ticker matching exact countdown
  useEffect(() => {
    setLiveSeconds(getSeconds());
  }, [siteData.countdown.targetEpoch, siteData.countdown.remainingSeconds, isRunning]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setLiveSeconds((prev: number) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Check persistent login in session
  useEffect(() => {
    const saved = localStorage.getItem('dataxscape_remote_auth');
    if (saved === 'true') {
      setIsUnlocked(true);
    }
  }, []);

  const triggerHaptic = () => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([40, 20, 60]);
      } catch {
        // Ignore if unsupported
      }
    }
  };

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === REMOTE_PASSCODE) {
      setIsUnlocked(true);
      setAuthError(false);
      localStorage.setItem('dataxscape_remote_auth', 'true');
    } else {
      setAuthError(true);
    }
  };

  const handleStart = async () => {
    triggerHaptic();
    setIsActionLoading(true);
    try {
      await startCountdown();
      showToast(hasStarted ? 'Countdown Resumed Live!' : 'Stage Ignited! Cosmic Dust Condensing...');
    } catch {
      showToast('Failed to start. Check Wi-Fi connection.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleStop = async () => {
    triggerHaptic();
    setIsActionLoading(true);
    try {
      await stopCountdown();
      showToast('Countdown Paused & Saved!');
    } catch {
      showToast('Failed to pause countdown.');
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleRearm = async () => {
    if (confirm('Reset stage countdown? This will make the countdown empty on the main screen until you tap Start again.')) {
      triggerHaptic();
      setIsActionLoading(true);
      try {
        await rearmCountdown();
        showToast('Stage Re-armed! Main display is now EMPTY.');
      } catch {
        showToast('Failed to rearm stage.');
      } finally {
        setIsActionLoading(false);
      }
    }
  };

  // Passcode gate for phone
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 text-center select-none">
        <div className="w-16 h-16 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 shadow-[0_0_30px_rgba(0,210,255,0.3)]">
          <Smartphone className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-extrabold tracking-wider text-white font-display mb-2">
          PHONE REMOTE CONTROL
        </h1>
        <p className="text-xs text-white/60 max-w-xs mb-8">
          Enter admin passcode to securely control the stage countdown from your smartphone.
        </p>

        <form onSubmit={handleUnlock} className="w-full max-w-xs space-y-4">
          <input
            type="password"
            value={passcode}
            onChange={(e) => {
              setPasscode(e.target.value);
              setAuthError(false);
            }}
            placeholder="Passcode (default: admin123)"
            className="w-full bg-black/80 border border-white/20 focus:border-cyan-400 rounded-xl px-4 py-3.5 text-center text-white font-mono text-sm focus:outline-none"
            autoFocus
          />

          {authError && (
            <p className="text-xs text-red-400 font-medium">Incorrect passcode. Try again.</p>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 active:scale-95 text-black font-bold text-sm tracking-wider uppercase rounded-xl shadow-[0_0_20px_rgba(0,210,255,0.4)]"
          >
            Connect Remote
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col justify-between p-4 sm:p-6 select-none max-w-md mx-auto">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-4 left-4 right-4 z-50 bg-cyan-400 text-black font-extrabold text-sm py-3 px-4 rounded-xl shadow-2xl flex items-center justify-center gap-2 animate-bounce">
          <CheckCircle className="w-5 h-5 flex-shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Header */}
      <header className="pt-2 text-center">
        <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full border text-[11px] font-mono font-bold tracking-widest uppercase mb-3 transition-colors ${
          isCloudConnected
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
        }`}>
          <Radio className={`w-3.5 h-3.5 ${isCloudConnected ? 'animate-pulse text-emerald-400' : 'text-amber-400'}`} />
          <span>{isCloudConnected ? 'ONLINE • STAGE SYNC ACTIVE' : 'CONNECTING TO STAGE CLOUD...'}</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-black text-white tracking-wider font-display">
          DATAXSCAPE 2.0
        </h1>
        <p className="text-xs text-white/50 font-mono mt-0.5">
          Mobile Countdown Commander
        </p>
      </header>

      {/* Main Status Display */}
      <div className="my-6 p-6 rounded-2xl bg-[#040e20]/80 border border-cyan-500/20 shadow-xl text-center relative overflow-hidden">
        <div className={`absolute top-0 inset-x-0 h-1 ${isRunning ? 'bg-emerald-500 animate-pulse' : 'bg-cyan-500'}`} />

        <span className="text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase block mb-1">
          MAIN SCREEN COUNTDOWN STATE
        </span>

        <div className="my-2">
          {isRunning ? (
            <div className="inline-flex items-center gap-2 text-emerald-400 font-bold text-lg font-mono">
              <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
              <span>LIVE &amp; TICKING DOWN</span>
            </div>
          ) : !hasStarted ? (
            <div className="inline-flex items-center gap-2 text-amber-300 font-bold text-base sm:text-lg font-mono">
              <span className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />
              <span>STAGE DORMANT • READY</span>
            </div>
          ) : (
            <div className="inline-flex items-center gap-2 text-cyan-400 font-bold text-lg font-mono">
              <span className="w-3 h-3 rounded-full bg-cyan-400" />
              <span>STOPPED / PAUSED</span>
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-around text-xs font-mono text-white/70">
          <div>
            <span className="text-[10px] text-white/40 block">TIME REMAINING</span>
            <span className="font-bold text-cyan-300">
              {(() => {
                const total = liveSeconds;
                const d = Math.floor(total / 86400);
                const h = Math.floor((total % 86400) / 3600);
                const m = Math.floor((total % 3600) / 60);
                const s = total % 60;
                return `${d}d ${h}h ${m}m ${s}s`;
              })()}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-white/40 block">SAVED STATE</span>
            <span className="font-bold text-white">
              {isRunning ? 'Ticking Live' : !hasStarted ? 'Ready for Ignition' : 'Paused & Saved'}
            </span>
          </div>
        </div>
      </div>

      {/* Ergonomic Big Touch Controls */}
      <div className="space-y-4 my-2">
        {/* START BUTTON */}
        <button
          type="button"
          onClick={handleStart}
          disabled={isActionLoading || isRunning}
          className={`w-full py-5 sm:py-6 rounded-2xl font-black text-base sm:text-lg tracking-widest uppercase transition-all flex items-center justify-center gap-3 active:scale-95 shadow-xl ${
            isRunning
              ? 'bg-neutral-800 text-white/30 border border-white/5 cursor-not-allowed'
              : 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-black shadow-[0_0_35px_rgba(0,210,255,0.6)] cursor-pointer'
          }`}
        >
          <Play className="w-6 h-6 fill-current" />
          <span>{hasStarted ? 'RESUME COUNTDOWN' : 'START COUNTDOWN (IGNITE STAGE)'}</span>
        </button>

        {/* STOP / FREEZE BUTTON */}
        <button
          type="button"
          onClick={handleStop}
          disabled={isActionLoading || !isRunning}
          className={`w-full py-4 sm:py-5 rounded-2xl font-bold text-sm sm:text-base tracking-widest uppercase transition-all flex items-center justify-center gap-2.5 active:scale-95 shadow-lg ${
            !isRunning
              ? 'bg-neutral-800 text-white/30 border border-white/5 cursor-not-allowed'
              : 'bg-red-950/60 hover:bg-red-900 border-2 border-red-500/40 text-red-300 hover:text-white cursor-pointer shadow-[0_0_25px_rgba(239,68,68,0.3)]'
          }`}
        >
          <Pause className="w-5 h-5 fill-current" />
          <span>STOP / PAUSE COUNTDOWN</span>
        </button>

        {/* RE-ARM / RESET STAGE BUTTON (Makes main display empty again) */}
        {hasStarted && !isRunning && (
          <button
            type="button"
            onClick={handleRearm}
            disabled={isActionLoading}
            className="w-full py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold tracking-wider uppercase transition-all flex items-center justify-center gap-2 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 text-cyan-300 hover:text-white cursor-pointer active:scale-95 shadow-md"
          >
            <RotateCcw className="w-4 h-4 text-cyan-400" />
            <span>RESET STAGE (MAKE DISPLAY EMPTY)</span>
          </button>
        )}
      </div>

      {/* Footer & Quick Links */}
      <footer className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-white/50">
        <a
          href="/#admin"
          className="hover:text-cyan-400 transition"
        >
          Full Admin Panel →
        </a>

        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('dataxscape_remote_auth');
            setIsUnlocked(false);
          }}
          className="text-white/40 hover:text-red-400 transition"
        >
          Lock Remote
        </button>
      </footer>
    </div>
  );
};
