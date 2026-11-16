/**
 * Sonidos y feedback visual generados sin archivos externos.
 * Respetan la preferencia de movimiento reducido.
 */

type WindowWithAudio = Window & {
  webkitAudioContext?: typeof AudioContext;
};

function createContext(): AudioContext | null {
  if (typeof window === "undefined") return null;

  const AudioContextClass =
    window.AudioContext ?? (window as WindowWithAudio).webkitAudioContext;

  if (!AudioContextClass) return null;

  try {
    return new AudioContextClass();
  } catch {
    return null;
  }
}

function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function closeLater(context: AudioContext, ms = 800) {
  window.setTimeout(() => {
    void context.close().catch(() => undefined);
  }, ms);
}

function tone(
  ctx: AudioContext,
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType,
  gainVal: number,
  opts?: { toFreq?: number; attack?: number },
) {
  const o = ctx.createOscillator();
  const g = ctx.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, start);
  if (opts?.toFreq) o.frequency.exponentialRampToValueAtTime(opts.toFreq, start + dur);
  const atk = opts?.attack ?? 0.015;
  g.gain.setValueAtTime(0.0001, start);
  g.gain.exponentialRampToValueAtTime(gainVal, start + atk);
  g.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  o.connect(g);
  g.connect(ctx.destination);
  o.start(start);
  o.stop(start + dur + 0.02);
}

export type FlashKind = "success" | "error" | "alert";

export function flashScreen(kind: FlashKind) {
  if (typeof document === "undefined") return;
  if (prefersReducedMotion()) return;
  const root = document.documentElement;
  const cls = `screen-flash-${kind}`;
  root.classList.remove("screen-flash-success", "screen-flash-error", "screen-flash-alert");
  // force reflow so repeated flashes retrigger animation
  void root.offsetWidth;
  root.classList.add(cls);
  window.setTimeout(() => root.classList.remove(cls), 700);
}

export function playSuccess() {
  if (prefersReducedMotion()) return;
  const ctx = createContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  // bright ascending chime (C5-E5-G5-C6)
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
    tone(ctx, f, now + i * 0.07, 0.28, "sine", 0.14, { attack: 0.01 });
    tone(ctx, f * 2, now + i * 0.07, 0.18, "triangle", 0.03, { attack: 0.01 }); // shimmer
  });
  closeLater(ctx, 900);
  flashScreen("success");
}

export function playError() {
  if (prefersReducedMotion()) return;
  const ctx = createContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  // low "buzz" drop, two thuds
  tone(ctx, 220, now, 0.22, "sawtooth", 0.16, { toFreq: 110, attack: 0.008 });
  tone(ctx, 180, now + 0.18, 0.22, "square", 0.12, { toFreq: 90, attack: 0.008 });
  tone(ctx, 90, now, 0.35, "sine", 0.18, { toFreq: 60, attack: 0.01 }); // thump
  closeLater(ctx, 700);
  flashScreen("error");
}

export function playAlert() {
  if (prefersReducedMotion()) return;
  const ctx = createContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  // attention beeps (ping-ping)
  [988, 784, 988].forEach((f, i) => {
    tone(ctx, f, now + i * 0.13, 0.16, "square", 0.1, { attack: 0.006 });
    tone(ctx, f, now + i * 0.13, 0.16, "sine", 0.08, { attack: 0.006 });
  });
  closeLater(ctx, 800);
  flashScreen("alert");
}

/** Clic suave para confirmaciones/abrir. */
export function playSoftClick() {
  if (prefersReducedMotion()) return;
  const ctx = createContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  tone(ctx, 700, now, 0.07, "sine", 0.08, { toFreq: 520, attack: 0.005 });
  closeLater(ctx, 300);
}

/** Acorde ascendente suave para momentos de consecuencia. */
export function playConsequenceChime() {
  if (prefersReducedMotion()) return;
  const ctx = createContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  [523.25, 659.25, 783.99].forEach((f, i) => {
    tone(ctx, f, now + i * 0.1, 0.5, "sine", 0.07, { attack: 0.02 });
  });
  closeLater(ctx, 1200);
}
