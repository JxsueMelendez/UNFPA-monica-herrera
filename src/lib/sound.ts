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
  const context = createContext();
  if (!context) return;
  const now = context.currentTime;
  const master = context.createGain();
  master.gain.value = 0.07;
  master.connect(context.destination);
  [523.25, 659.25, 783.99].forEach((f, i) => {
    const o = context.createOscillator();
    const g = context.createGain();
    const t = now + i * 0.08;
    o.type = "sine";
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.8, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 0.25);
  });
  closeLater(context, 700);
  flashScreen("success");
}

export function playError() {
  if (prefersReducedMotion()) return;
  const context = createContext();
  if (!context) return;
  const now = context.currentTime;
  const o = context.createOscillator();
  const g = context.createGain();
  o.type = "sawtooth";
  o.frequency.setValueAtTime(220, now);
  o.frequency.exponentialRampToValueAtTime(120, now + 0.25);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(0.12, now + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
  o.connect(g);
  g.connect(context.destination);
  o.start(now);
  o.stop(now + 0.32);
  closeLater(context, 600);
  flashScreen("error");
}

export function playAlert() {
  if (prefersReducedMotion()) return;
  const context = createContext();
  if (!context) return;
  const now = context.currentTime;
  const master = context.createGain();
  master.gain.value = 0.08;
  master.connect(context.destination);
  [880, 660].forEach((f, i) => {
    const o = context.createOscillator();
    const g = context.createGain();
    const t = now + i * 0.16;
    o.type = "triangle";
    o.frequency.value = f;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.9, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 0.2);
  });
  closeLater(context, 700);
  flashScreen("alert");
}

/** Acorde ascendente muy suave para los momentos de consecuencia. */
export function playConsequenceChime() {
  if (prefersReducedMotion()) return;

  const context = createContext();
  if (!context) return;

  const frequencies = [523.25, 659.25, 783.99];
  const master = context.createGain();
  master.gain.value = 0.055;
  master.connect(context.destination);

  frequencies.forEach((frequency, index) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const start = context.currentTime + index * 0.11;

    oscillator.type = "sine";
    oscillator.frequency.value = frequency;

    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.7, start + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.9);

    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(start);
    oscillator.stop(start + 0.95);
  });

  window.setTimeout(() => {
    void context.close().catch(() => undefined);
  }, 1400);
}

/** Pequeño clic tonal para confirmaciones. */
export function playSoftClick() {
  if (prefersReducedMotion()) return;

  const context = createContext();
  if (!context) return;

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  const start = context.currentTime;

  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(620, start);
  oscillator.frequency.exponentialRampToValueAtTime(440, start + 0.09);

  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(0.12, start + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.16);

  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start(start);
  oscillator.stop(start + 0.18);

  window.setTimeout(() => {
    void context.close().catch(() => undefined);
  }, 400);
}
