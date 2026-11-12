/**
 * Sonidos sutiles generados con Web Audio API.
 * No requieren archivos externos y respetan la preferencia de movimiento reducido.
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
