"use client";

import { useEffect, useRef, useState } from "react";

// ---------------------------------------------------------------------------
// deterministic 2-octave value noise — house field, no deps
// ---------------------------------------------------------------------------
function hash2(x: number, y: number) {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return n - Math.floor(n);
}
function vnoise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
function noise2(x: number, y: number) {
  return 0.65 * vnoise(x, y) + 0.35 * vnoise(x * 2.1 + 19.7, y * 2.1 + 7.3);
}

// ---------------------------------------------------------------------------
// VaporCountdown — live countdown where every digit change is a phase
// transition: outgoing digits sublimate into grains drifting up on curl-noise
// wind while incoming digits condense from the cloud, grains spring-seeking
// their new glyph homes. Canvas 2D over a real <time> element (screen-reader truth).
// Supports DAYS, HOURS, MINUTES, SECONDS with per-second vapor transitions.
// ---------------------------------------------------------------------------

const FLOATS = 6; // grains: x, y, vx, vy, hx, hy · vapor: x, y, vx, vy, age, life
const MAX_GRAINS = 2800; // per digit
const SAMPLE_STRIDE = 3; // px between alpha samples on the glyph raster
const SPRING_K = 110; // s⁻² — snappy, responsive cosmic gravitation
const ZETA = 0.62; // damping ratio; organic soft overshoot then settles cleanly
const DRAG = 0.92; // per-frame velocity drag
const DT_MAX = 0.032; // s — clamp tab-switch jumps
const FIELD_SCALE = 0.008; // px → noise units for the wind field
const CURL_EPS = 0.75; // noise-space finite-difference step for curl
const PAD_X = 60; // canvas overdraw so vapor is not clipped at digits box
const PAD_TOP = 130;
const PAD_BOTTOM = 40;

const DEFAULT_LABELS_4 = ["DAYS", "HOURS", "MINUTES", "SECONDS"] as const;
const DEFAULT_LABELS_3 = ["HOURS", "MINUTES", "SECONDS"] as const;

type Slot = {
  g: Float32Array; // incoming/settled grains
  v: Float32Array; // sublimating vapor grains
  gc: number;
  vc: number;
  active: boolean;
};

export interface VaporCountdownProps {
  /** countdown target — Date, ISO string, or epoch ms; defaults to 24h from mount */
  targetDate?: Date | string | number;
  /** mono labels under the groups; null hides the row */
  labels?: readonly string[] | null;
  /** whether to include DAYS column (default: true) */
  showDays?: boolean;
  /** whether the countdown is actively ticking or frozen/paused */
  isRunning?: boolean;
  /** whether the countdown is in initial dormant/empty stage before start */
  isDormant?: boolean;
  /** whether to trigger sequential dust particle birth choreography */
  animateBirth?: boolean;
  /** callback fired when the sequential particle birth completes and live clock begins */
  onBirthComplete?: () => void;
  /** exact remaining seconds when paused/stopped */
  remainingSeconds?: number;
  /** authoritative target epoch ms for network-synchronized clocks */
  targetEpoch?: number;
  /** extra classes merged onto the rendered root element */
  className?: string;
}

export function VaporCountdown({
  targetDate,
  labels,
  showDays = true,
  isRunning = true,
  isDormant = false,
  animateBirth = false,
  onBirthComplete,
  remainingSeconds,
  targetEpoch,
  className = "",
}: VaporCountdownProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<HTMLTimeElement>(null);

  const numDigits = showDays ? 8 : 6;
  const numGroups = showDays ? 4 : 3;
  const defaultLabels = showDays ? DEFAULT_LABELS_4 : DEFAULT_LABELS_3;
  const actualLabels = labels !== undefined ? labels : defaultLabels;

  // stable primitive for deps array (Date identity churns per render)
  const targetKey =
    targetDate instanceof Date ? targetDate.getTime() : targetDate;

  // Controller interface to bridge props into persistent rAF loop without destroying canvas state
  const controllerRef = useRef<{
    setDormant: (dormant: boolean) => void;
    triggerBirth: () => void;
    setRunning: (running: boolean) => void;
    syncSeconds: (secs: number, epoch?: number) => void;
  } | null>(null);

  // Keep fresh callback ref
  const onBirthCompleteRef = useRef(onBirthComplete);
  onBirthCompleteRef.current = onBirthComplete;

  // Per-unit visibility state: 0: DAYS, 1: HOURS, 2: MINUTES, 3: SECONDS
  const [groupVisible, setGroupVisible] = useState<Record<number, boolean>>(() => {
    if (isDormant) return { 0: false, 1: false, 2: false, 3: false };
    return { 0: true, 1: true, 2: true, 3: true };
  });

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const timeEl = timeRef.current;
    if (!root || !canvas || !timeEl) return;
    const digitEls = Array.from(
      root.querySelectorAll<HTMLSpanElement>("[data-vc-digit]"),
    );
    if (digitEls.length !== numDigits) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const targetMs =
      targetKey == null
        ? Date.now() + 86_400_000
        : typeof targetKey === "number"
          ? targetKey
          : new Date(targetKey).getTime();

    // Determine initial authoritative seconds
    let currentRemainSecs: number;
    if (isRunning && typeof targetEpoch === "number" && targetEpoch > 0) {
      currentRemainSecs = Math.max(0, Math.ceil((targetEpoch - Date.now()) / 1000));
    } else if (typeof remainingSeconds === "number" && remainingSeconds >= 0) {
      currentRemainSecs = Math.round(remainingSeconds);
    } else {
      const diffSecs = Math.round((targetMs - Date.now()) / 1000);
      currentRemainSecs = diffSecs > 0 ? diffSecs : (41 * 86400 + 21 * 3600 + 20 * 60 + 47);
    }

    let disposed = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let isBirthPlaying = false;
    let localIsDormant = isDormant;
    let localIsRunning = isRunning;
    let localTargetEpoch = targetEpoch;

    const formatDigits = (remSecs: number) => {
      const rem = Math.max(0, Math.round(remSecs));
      if (showDays) {
        const d = Math.min(99, Math.floor(rem / 86400));
        const h = Math.floor((rem % 86400) / 3600);
        const m = Math.floor((rem % 3600) / 60);
        const s = rem % 60;
        return (
          String(d).padStart(2, "0") +
          String(h).padStart(2, "0") +
          String(m).padStart(2, "0") +
          String(s).padStart(2, "0")
        );
      }
      const h = Math.min(99, Math.floor(rem / 3600));
      const m = Math.floor((rem % 3600) / 60);
      const s = rem % 60;
      return (
        String(h).padStart(2, "0") +
        String(m).padStart(2, "0") +
        String(s).padStart(2, "0")
      );
    };

    let digits = formatDigits(currentRemainSecs);
    const applyDateTime = () => {
      if (showDays) {
        timeEl.setAttribute(
          "datetime",
          `P${digits.slice(0, 2)}DT${digits.slice(2, 4)}H${digits.slice(4, 6)}M${digits.slice(6, 8)}S`,
        );
      } else {
        timeEl.setAttribute(
          "datetime",
          `PT${digits.slice(0, 2)}H${digits.slice(2, 4)}M${digits.slice(4)}S`,
        );
      }
    };

    // ---- canvas / particle state -------------------------------------------
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let grainColor = "#00D2FF";
    const updateGrainColor = () => {
      grainColor = getComputedStyle(digitEls[0]).color || grainColor;
    };
    updateGrainColor();

    const slots: Slot[] = Array.from({ length: numDigits }, () => ({
      g: new Float32Array(MAX_GRAINS * FLOATS),
      v: new Float32Array(MAX_GRAINS * FLOATS),
      gc: 0,
      vc: 0,
      active: false,
    }));
    let glyphs: Float32Array[] | null = null;
    let cells: { x: number; y: number }[] = [];
    let cw = 0;
    let ch = 0;
    let lastW = 0;
    let lastH = 0;
    let raf = 0;
    let last = 0;
    const dampC = 2 * ZETA * Math.sqrt(SPRING_K); // s⁻¹

    const loop = (now: number) => {
      if (!ctx || disposed) return;
      const dt = Math.min(Math.max((now - last) / 1000, 0), DT_MAX);
      last = now;
      ctx.clearRect(0, 0, cw, ch);
      ctx.fillStyle = grainColor;
      let anyActive = false;

      for (let s = 0; s < numDigits; s++) {
        const slot = slots[s];
        const g = slot.g;
        const v = slot.v;

        if (!slot.active) {
          // settled grains: solid glowing state
          if (slot.gc > 0) {
            ctx.globalAlpha = 0.94;
            for (let i = 0; i < slot.gc; i++) {
              const o = i * FLOATS;
              ctx.fillRect(g[o] - 1.2, g[o + 1] - 1.2, 2.4, 2.4);
            }
          }
          continue;
        }
        anyActive = true;
        let settled = true;

        // incoming grains: underdamped spring toward glyph homes
        for (let i = 0; i < slot.gc; i++) {
          const o = i * FLOATS;
          let x = g[o];
          let y = g[o + 1];
          let vx = g[o + 2];
          let vy = g[o + 3];
          const hx = g[o + 4];
          const hy = g[o + 5];

          vx = (vx + (SPRING_K * (hx - x) - dampC * vx) * dt) * DRAG;
          vy = (vy + (SPRING_K * (hy - y) - dampC * vy) * dt) * DRAG;
          x += vx * dt;
          y += vy * dt;

          g[o] = x;
          g[o + 1] = y;
          g[o + 2] = vx;
          g[o + 3] = vy;

          if (
            Math.abs(x - hx) > 0.6 ||
            Math.abs(y - hy) > 0.6 ||
            Math.abs(vx) > 3 ||
            Math.abs(vy) > 3
          ) {
            settled = false;
          }

          const speed = Math.hypot(vx, vy);
          ctx.globalAlpha = 0.5 + 0.5 * Math.min(1, speed / 500);
          ctx.fillRect(x - 1.2, y - 1.2, 2.4, 2.4);
        }

        // vapor grains: curl-noise wind, biased upward, alpha fade over life
        let j = 0;
        while (j < slot.vc) {
          const o = j * FLOATS;
          const age = v[o + 4] + dt * 1000;
          const life = v[o + 5];
          if (age >= life) {
            // swap-remove with the last live vapor grain
            const lo = (slot.vc - 1) * FLOATS;
            for (let k = 0; k < FLOATS; k++) v[o + k] = v[lo + k];
            slot.vc--;
            continue;
          }
          v[o + 4] = age;
          let x = v[o];
          let y = v[o + 1];
          let vx = v[o + 2];
          let vy = v[o + 3];

          // wind = curl of the noise field: (∂n/∂y, -∂n/∂x) — divergence-free
          const nx = x * FIELD_SCALE;
          const ny = y * FIELD_SCALE;
          const dndx = noise2(nx + CURL_EPS, ny) - noise2(nx - CURL_EPS, ny);
          const dndy = noise2(nx, ny + CURL_EPS) - noise2(nx, ny - CURL_EPS);
          let wx = dndy;
          let wy = -dndx;
          const cl = Math.hypot(wx, wy) || 1;
          const sp = 45 + 50 * hash2(j * 1.31, s * 7.7); // 45-95 px/s per grain
          wx = (wx / cl) * sp * 0.6;
          wy = (wy / cl) * sp * 0.6 - sp * 0.8; // upward bias
          const mix = Math.min(1, dt * 5);
          vx += (wx - vx) * mix;
          vy += (wy - vy) * mix;
          x += vx * dt;
          y += vy * dt;

          v[o] = x;
          v[o + 1] = y;
          v[o + 2] = vx;
          v[o + 3] = vy;

          const speed = Math.hypot(vx, vy);
          ctx.globalAlpha =
            (1 - age / life) * (0.5 + 0.5 * Math.min(1, speed / 500));
          ctx.fillRect(x - 1.2, y - 1.2, 2.4, 2.4);
          j++;
        }
        if (slot.vc > 0) settled = false;

        if (settled) {
          // snap to homes and let column sleep
          for (let i = 0; i < slot.gc; i++) {
            const o = i * FLOATS;
            g[o] = g[o + 4];
            g[o + 1] = g[o + 5];
            g[o + 2] = 0;
            g[o + 3] = 0;
          }
          slot.active = false;
        }
      }

      ctx.globalAlpha = 1;
      raf = anyActive ? requestAnimationFrame(loop) : 0;
    };

    const wake = () => {
      if (!raf && ctx && !disposed) {
        last = performance.now();
        raf = requestAnimationFrame(loop);
      }
    };

    const transition = (s: number, d: number) => {
      if (!glyphs || !glyphs[d]) return;
      const slot = slots[s];
      if (!slot) return;
      const g = slot.g;
      const v = slot.v;

      // 1. Outgoing digit sublimates: move existing grains to vapor pool without wiping still-floating vapor
      let vc = slot.vc;
      if (vc > MAX_GRAINS - slot.gc) {
        vc = Math.max(0, MAX_GRAINS - slot.gc);
      }
      const outgoingCount = slot.gc;
      for (let i = 0; i < outgoingCount && vc < MAX_GRAINS; i++) {
        const o = i * FLOATS;
        const vo = vc * FLOATS;
        v[vo] = g[o];
        v[vo + 1] = g[o + 1];

        // Cosmic dispersal: outward spray + energetic upward lift on curl wind
        const angle = Math.random() * Math.PI * 2;
        const spreadSpeed = 16 + Math.random() * 32;
        v[vo + 2] = Math.cos(angle) * spreadSpeed;
        v[vo + 3] = -38 - Math.random() * 45; // Energetic upward kick (-38 to -83 px/s)
        v[vo + 4] = 0; // age
        v[vo + 5] = 750 + Math.random() * 350; // lifespan ms
        vc++;
      }
      slot.vc = vc;

      // 2. Incoming digit condenses like cosmic dust coalescing into glyph homes
      const homes = glyphs[d];
      const cell = cells[s];
      if (!cell) return;
      const n = homes.length / 2;
      slot.gc = n;

      for (let i = 0; i < n; i++) {
        const o = i * FLOATS;
        const hx = cell.x + homes[i * 2];
        const hy = cell.y + homes[i * 2 + 1];

        // Cosmic dust cloud spawning in halo around the target digit glyph
        const angle = Math.random() * Math.PI * 2;
        const haloRadius = 22 + Math.random() * 36; // 22-58px swirling halo
        g[o] = hx + Math.cos(angle) * haloRadius;
        g[o + 1] = hy + Math.sin(angle) * haloRadius;

        // Tangential spiral velocity + inward gravitation
        const vTangential = 35 + Math.random() * 25;
        g[o + 2] = -Math.sin(angle) * vTangential + (Math.random() - 0.5) * 20;
        g[o + 3] = Math.cos(angle) * vTangential - 12;
        g[o + 4] = hx;
        g[o + 5] = hy;
      }
      slot.active = true;
    };

    // Sequential Birth Choreography:
    // SECONDS (group 3) -> MINUTES (group 2) -> HOURS (group 1) -> DAYS (group 0)
    const condenseGroup = (groupIdx: number) => {
      if (!glyphs || disposed) return;
      const startSlot = groupIdx * 2;
      const endSlot = startSlot + 2;

      for (let s = startSlot; s < endSlot && s < numDigits; s++) {
        const slot = slots[s];
        const char = digits.charAt(s);
        const digitVal = char ? Number(char) : 0;
        const homes = glyphs[digitVal] || glyphs[0];
        const cell = cells[s];
        if (!cell || !homes) continue;
        const n = homes.length / 2;
        slot.gc = n;

        // Dust particle cloud spawning in radial vortex
        for (let i = 0; i < n; i++) {
          const o = i * FLOATS;
          const hx = cell.x + homes[i * 2];
          const hy = cell.y + homes[i * 2 + 1];

          const angle = Math.random() * Math.PI * 2;
          const dist = 70 + Math.random() * 150;
          const startX = hx + Math.cos(angle) * dist;
          const startY = hy + Math.sin(angle) * dist;

          slot.g[o] = startX;
          slot.g[o + 1] = startY;
          const vTangential = 85 + Math.random() * 45;
          slot.g[o + 2] = -Math.sin(angle) * vTangential + (Math.random() - 0.5) * 35;
          slot.g[o + 3] = Math.cos(angle) * vTangential + (Math.random() - 0.5) * 35;
          slot.g[o + 4] = hx;
          slot.g[o + 5] = hy;
        }

        // Swirling ambient vapor nebula dust
        let vc = 0;
        const maxVapor = Math.min(300, MAX_GRAINS);
        for (let vIdx = 0; vIdx < maxVapor; vIdx++) {
          const vo = vIdx * FLOATS;
          const vAngle = Math.random() * Math.PI * 2;
          const vDist = Math.random() * 120;
          slot.v[vo] = cell.x + Math.cos(vAngle) * vDist;
          slot.v[vo + 1] = cell.y + Math.sin(vAngle) * vDist;
          slot.v[vo + 2] = (Math.random() - 0.5) * 55;
          slot.v[vo + 3] = -20 - Math.random() * 35;
          slot.v[vo + 4] = 0;
          slot.v[vo + 5] = 750 + Math.random() * 450;
          vc++;
        }
        slot.vc = vc;
        slot.active = true;
      }

      // Smoothly illuminate the unit label
      const labelEl = root.querySelector<HTMLSpanElement>(`[data-vc-label="${groupIdx}"]`);
      if (labelEl) {
        labelEl.style.opacity = "1";
        labelEl.style.transform = "scale(1)";
        labelEl.style.transition = "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)";
      }

      wake();
    };

    const triggerBirth = () => {
      if (isBirthPlaying || disposed) return;
      isBirthPlaying = true;
      if (timer) clearTimeout(timer);

      // Ensure glyphs & cells rasterization is ready
      if (!glyphs || glyphs.length === 0 || cells.length === 0) {
        init(true);
      }

      // Clear all slots initially
      for (let s = 0; s < numDigits; s++) {
        slots[s].gc = 0;
        slots[s].vc = 0;
        slots[s].active = false;
      }
      if (ctx) ctx.clearRect(0, 0, cw, ch);

      // Hide all labels initially
      setGroupVisible({ 0: false, 1: false, 2: false, 3: false });
      const labelEls = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-vc-label]"));
      labelEls.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "scale(0.85)";
      });

      // Sequential delay order:
      // Group 3 = SECONDS (0ms) -> Group 2 = MINUTES (700ms) -> Group 1 = HOURS (1400ms) -> Group 0 = DAYS (2100ms)
      const sequence = showDays
        ? [
            { group: 3, delay: 0 },
            { group: 2, delay: 700 },
            { group: 1, delay: 1400 },
            { group: 0, delay: 2100 },
          ]
        : [
            { group: 2, delay: 0 },
            { group: 1, delay: 700 },
            { group: 0, delay: 1400 },
          ];

      sequence.forEach(({ group, delay }) => {
        setTimeout(() => {
          if (disposed) return;
          condenseGroup(group);
          setGroupVisible((prev) => ({ ...prev, [group]: true }));
        }, delay);
      });

      const totalBirthDuration = showDays ? 2800 : 2100;
      setTimeout(() => {
        if (disposed) return;
        isBirthPlaying = false;
        setGroupVisible({ 0: true, 1: true, 2: true, 3: true });
        onBirthCompleteRef.current?.();
        if (currentRemainSecs > 0 && localIsRunning) {
          schedule();
        }
      }, totalBirthDuration);
    };

    const setDormant = (dormant: boolean) => {
      localIsDormant = dormant;
      if (dormant) {
        if (timer) clearTimeout(timer);
        isBirthPlaying = false;
        setGroupVisible({ 0: false, 1: false, 2: false, 3: false });
        for (let s = 0; s < numDigits; s++) {
          slots[s].gc = 0;
          slots[s].vc = 0;
          slots[s].active = false;
        }
        if (ctx) ctx.clearRect(0, 0, cw, ch);
        const labelEls = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-vc-label]"));
        labelEls.forEach((el) => {
          el.style.opacity = "0";
          el.style.transform = "scale(0.85)";
        });
      } else {
        if (!animateBirth) {
          setGroupVisible({ 0: true, 1: true, 2: true, 3: true });
        }
      }
    };

    const setRunning = (running: boolean) => {
      localIsRunning = running;
      if (!running) {
        if (timer) clearTimeout(timer);
      } else {
        if (!localIsDormant && !isBirthPlaying && currentRemainSecs > 0) {
          schedule();
        }
      }
    };

    const syncSeconds = (secs: number, epoch?: number) => {
      if (typeof epoch === "number" && epoch > 0) localTargetEpoch = epoch;
      if (isBirthPlaying) {
        currentRemainSecs = Math.max(0, secs);
        return;
      }

      // If running locally, protect against minor network polling jitter so local transitions are seamless
      if (localIsRunning) {
        if (Math.abs(currentRemainSecs - secs) <= 1) {
          return;
        }
      }

      currentRemainSecs = Math.max(0, secs);
      const next = formatDigits(currentRemainSecs);
      if (next !== digits) {
        for (let s = 0; s < numDigits; s++) {
          if (next.charAt(s) !== digits.charAt(s)) {
            digitEls[s].textContent = next.charAt(s);
            if (!reduced) transition(s, Number(next.charAt(s)));
          }
        }
        digits = next;
        applyDateTime();
        if (!reduced) wake();
      }
    };

    const init = (force = false) => {
      if (!ctx || disposed) return;
      if (isBirthPlaying && !force) return;

      const rootRect = root.getBoundingClientRect();
      const w = Math.round(rootRect.width);
      const h = Math.round(rootRect.height);
      if (w < 2 || h < 2) return;

      // Avoid wiping canvas if layout hasn't changed substantially
      if (!force && glyphs && glyphs.length === 10 && Math.abs(w - lastW) <= 6 && Math.abs(h - lastH) <= 6) {
        return;
      }

      lastW = w;
      lastH = h;
      cw = w + PAD_X * 2;
      ch = h + PAD_TOP + PAD_BOTTOM;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cells = digitEls.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          x: r.left - rootRect.left + PAD_X,
          y: r.top - rootRect.top + PAD_TOP,
        };
      });

      // rasterize glyphs 0-9 once
      const cellRect = digitEls[0].getBoundingClientRect();
      const gw = Math.max(2, Math.ceil(cellRect.width));
      const gh = Math.max(2, Math.ceil(cellRect.height));
      const off = document.createElement("canvas");
      off.width = gw;
      off.height = gh;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      const cs = getComputedStyle(digitEls[0]);
      octx.font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      octx.textAlign = "center";
      octx.textBaseline = "middle";
      octx.fillStyle = "#ffffff";

      glyphs = [];
      for (let d = 0; d < 10; d++) {
        octx.clearRect(0, 0, gw, gh);
        octx.fillText(String(d), gw / 2, gh / 2);
        const alpha = octx.getImageData(0, 0, gw, gh).data;
        const pts: number[] = [];
        for (let y = 1; y < gh; y += SAMPLE_STRIDE) {
          const row = y * gw;
          for (let x = 1; x < gw; x += SAMPLE_STRIDE) {
            if (alpha[(row + x) * 4 + 3] > 128) pts.push(x, y);
          }
        }
        const total = pts.length / 2;
        const keepEvery = Math.max(1, Math.ceil(total / MAX_GRAINS));
        const homes = new Float32Array(Math.ceil(total / keepEvery) * 2);
        let n = 0;
        for (let i = 0; i < total; i += keepEvery) {
          homes[n * 2] = pts[i * 2];
          homes[n * 2 + 1] = pts[i * 2 + 1];
          n++;
        }
        glyphs.push(homes.subarray(0, n * 2));
      }

      if (localIsDormant) {
        setDormant(true);
        return;
      }

      if (animateBirth) {
        triggerBirth();
        return;
      }

      // Normal settled mount (when already started & on reload):
      for (let s = 0; s < numDigits; s++) {
        const slot = slots[s];
        const char = digits.charAt(s);
        const digitVal = char ? Number(char) : 0;
        const homes = glyphs[digitVal] || glyphs[0];
        const cell = cells[s];
        if (!cell || !homes) continue;
        const n = homes.length / 2;
        slot.gc = n;
        slot.vc = 0;
        slot.active = false;
        for (let i = 0; i < n; i++) {
          const o = i * FLOATS;
          const hx = cell.x + homes[i * 2];
          const hy = cell.y + homes[i * 2 + 1];
          slot.g[o] = hx;
          slot.g[o + 1] = hy;
          slot.g[o + 2] = 0;
          slot.g[o + 3] = 0;
          slot.g[o + 4] = hx;
          slot.g[o + 5] = hy;
        }
      }
      const labelEls = Array.from(root.querySelectorAll<HTMLSpanElement>("[data-vc-label]"));
      labelEls.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "scale(1)";
      });
      wake();
    };

    // ---- clock: wall-clock synchronized countdown -------------------------
    const schedule = () => {
      if (!localIsRunning || currentRemainSecs <= 0 || disposed || isBirthPlaying) return;

      let delay = 1000;
      if (typeof localTargetEpoch === "number" && localTargetEpoch > 0) {
        const msRemaining = localTargetEpoch - Date.now();
        const msUntilNextSec = msRemaining > 0 ? msRemaining % 1000 : 0;
        delay = msUntilNextSec > 0 ? msUntilNextSec + 15 : 1000;
        if (delay < 25) delay += 1000;
      } else {
        delay = 1000 - (Date.now() % 1000) + 15;
      }
      timer = setTimeout(tick, delay);
    };

    const tick = () => {
      if (!localIsRunning || currentRemainSecs <= 0 || disposed || isBirthPlaying) return;

      let targetSecs: number;
      if (typeof localTargetEpoch === "number" && localTargetEpoch > 0) {
        targetSecs = Math.max(0, Math.ceil((localTargetEpoch - Date.now()) / 1000));
      } else {
        targetSecs = Math.max(0, currentRemainSecs - 1);
      }

      if (targetSecs === currentRemainSecs && currentRemainSecs > 0) {
        schedule();
        return;
      }

      currentRemainSecs = targetSecs;

      const next = formatDigits(currentRemainSecs);
      if (next !== digits) {
        for (let s = 0; s < numDigits; s++) {
          if (next.charAt(s) !== digits.charAt(s)) {
            digitEls[s].textContent = next.charAt(s);
            if (!reduced) transition(s, Number(next.charAt(s)));
          }
        }
        digits = next;
        applyDateTime();
        if (!reduced) wake();
      }

      if (currentRemainSecs > 0 && localIsRunning && !disposed) {
        schedule();
      }
    };

    // Initialize DOM text content
    for (let s = 0; s < numDigits; s++) {
      digitEls[s].textContent = digits.charAt(s);
    }
    applyDateTime();

    if (!isDormant && !animateBirth && currentRemainSecs > 0 && isRunning) {
      schedule();
    }

    if (reduced || !ctx) {
      return () => {
        disposed = true;
        if (timer) clearTimeout(timer);
      };
    }

    init(true);

    let ro: ResizeObserver | undefined;
    document.fonts.ready.then(() => {
      if (disposed) return;
      init(true);
      ro = new ResizeObserver((entries) => {
        const entry = entries[0];
        if (!entry || isBirthPlaying) return;
        const w = Math.round(entry.contentRect.width);
        const h = Math.round(entry.contentRect.height);
        // Only re-init if size actually changed by more than 8px (e.g. window resize or breakpoint)
        if (Math.abs(w - lastW) > 8 || Math.abs(h - lastH) > 8) {
          init(true);
        }
      });
      ro.observe(root);
    });

    const onThemeChange = () => {
      updateGrainColor();
      wake();
    };
    const mo = new MutationObserver(onThemeChange);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });
    const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
    colorScheme.addEventListener("change", onThemeChange);

    controllerRef.current = {
      setDormant,
      triggerBirth,
      setRunning,
      syncSeconds,
    };

    return () => {
      disposed = true;
      controllerRef.current = null;
      if (timer) clearTimeout(timer);
      cancelAnimationFrame(raf);
      raf = 0;
      ro?.disconnect();
      mo.disconnect();
      colorScheme.removeEventListener("change", onThemeChange);
    };
  }, [targetKey, showDays, numDigits]);

  // Reactive prop bridges
  useEffect(() => {
    controllerRef.current?.setDormant(isDormant);
    if (isDormant) {
      setGroupVisible({ 0: false, 1: false, 2: false, 3: false });
    }
  }, [isDormant]);

  useEffect(() => {
    if (animateBirth) {
      controllerRef.current?.triggerBirth();
    }
  }, [animateBirth]);

  useEffect(() => {
    controllerRef.current?.setRunning(isRunning);
  }, [isRunning]);

  useEffect(() => {
    if (typeof remainingSeconds === "number") {
      controllerRef.current?.syncSeconds(remainingSeconds, targetEpoch);
    }
  }, [remainingSeconds, targetEpoch]);

  return (
    <div
      ref={rootRef}
      className={`relative inline-grid select-none max-w-full ${className}`}
      style={{
        gridTemplateColumns: `repeat(${numGroups}, auto)`,
        columnGap: "clamp(0.4em, 1.8vw, 1.8em)",
        rowGap: "clamp(0.5rem, 1.5vw, 1.25rem)",
        fontSize: "clamp(1.75rem, 6.4vw, 6rem)",
      }}
    >
      {/* Screen-reader truth element: visible static under reduced motion */}
      <time ref={timeRef} aria-live="off" style={{ display: "contents" }}>
        {Array.from({ length: numGroups }).map((_, group) => (
          <span
            key={group}
            className="flex justify-center font-semibold leading-none tracking-tight text-foreground opacity-0 tabular-nums motion-reduce:opacity-100"
          >
            <span data-vc-digit className="inline-block w-[0.62em] text-center">0</span>
            <span data-vc-digit className="inline-block w-[0.62em] text-center">0</span>
          </span>
        ))}
      </time>

      {/* Unit Labels: completely invisible when dormant; reveals on sequential birth */}
      {actualLabels &&
        actualLabels.map((label, groupIdx) => {
          const isVisible = !isDormant && groupVisible[groupIdx];
          return (
            <span
              key={label}
              data-vc-label={groupIdx}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? "scale(1)" : "scale(0.8)",
                pointerEvents: isVisible ? "auto" : "none",
                transition: "opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              className="text-center font-mono text-[9px] sm:text-xs md:text-sm tracking-[0.12em] sm:tracking-[0.25em] text-ns-muted font-extrabold uppercase drop-shadow-[0_0_12px_rgba(0,210,255,0.7)]"
            >
              {label}
            </span>
          );
        })}

      {/* 2D Vapor Particle Canvas with divergence-free curl wind */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute motion-reduce:hidden"
        style={{
          left: -PAD_X,
          top: -PAD_TOP,
          width: `calc(100% + ${PAD_X * 2}px)`,
          height: `calc(100% + ${PAD_TOP + PAD_BOTTOM}px)`,
        }}
      />
    </div>
  );
}

export default VaporCountdown;
