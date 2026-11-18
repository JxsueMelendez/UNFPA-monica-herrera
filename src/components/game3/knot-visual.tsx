"use client";

import { motion, useReducedMotion, type Transition } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Un solo nudo de cuerda dibujado a partir de una curva trefoil.
 * El nivel va de 0 (suelto) a 5 (bien apretado): al subir, el nudo
 * se encoge, gira, engrosa la cuerda y pasa de verde azulado a coral.
 */
const KNOT_PATH = (() => {
  const points: Array<{ x: number; y: number }> = [];
  const STEPS = 240;

  for (let i = 0; i <= STEPS; i += 1) {
    const t = (i / STEPS) * Math.PI * 2;
    points.push({
      x: Math.sin(t) + 2 * Math.sin(2 * t),
      y: Math.cos(t) - 2 * Math.cos(2 * t),
    });
  }

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const span = Math.max(maxX - minX, maxY - minY);
  const padding = 26;
  const scale = (200 - padding * 2) / span;
  const offsetX = (200 - (maxX - minX) * scale) / 2 - minX * scale;
  const offsetY = (200 - (maxY - minY) * scale) / 2 - minY * scale;

  return `M ${points
    .map((p) => `${(p.x * scale + offsetX).toFixed(2)} ${(p.y * scale + offsetY).toFixed(2)}`)
    .join(" L ")}`;
})();

function mixHex(from: string, to: string, amount: number) {
  const t = Math.max(0, Math.min(1, amount));
  const a = Number.parseInt(from.slice(1), 16);
  const b = Number.parseInt(to.slice(1), 16);
  const channels = [16, 8, 0].map((shift) => {
    const start = (a >> shift) & 255;
    const end = (b >> shift) & 255;
    return Math.round(start + (end - start) * t);
  });
  return `#${channels.map((value) => value.toString(16).padStart(2, "0")).join("")}`;
}

const LOOSE_COLOR = "#3E8B74";
const TIGHT_COLOR = "#E04F5F";
const TIGHT_COLOR_DEEP = "#B83242";

interface KnotVisualProps {
  /** 0 = suelto, 5 = bien apretado. */
  level: number;
  size?: number;
  className?: string;
  transition?: Transition;
  showGlow?: boolean;
}

export function KnotVisual({
  level,
  size = 160,
  className,
  transition,
  showGlow = true,
}: KnotVisualProps) {
  const reduced = useReducedMotion();
  const clamped = Math.max(0, Math.min(5, level));
  const t = clamped / 5;

  const ropeColor =
    t < 0.82 ? mixHex(LOOSE_COLOR, TIGHT_COLOR, t / 0.82) : mixHex(TIGHT_COLOR, TIGHT_COLOR_DEEP, (t - 0.82) / 0.18);
  const strokeWidth = 10 + t * 9;
  const scale = 1.06 - t * 0.2;
  const rotate = -10 + t * 24;
  const spring: Transition = reduced
    ? { duration: 0 }
    : (transition ?? { type: "spring", stiffness: 110, damping: 13, mass: 0.9 });

  return (
    <div
      className={cn("relative grid place-items-center", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {showGlow ? (
        <motion.span
          className="pointer-events-none absolute inset-3 rounded-full blur-2xl"
          animate={{ backgroundColor: ropeColor, opacity: 0.2 + t * 0.32 }}
          transition={spring}
        />
      ) : null}

      <motion.div
        className="relative h-full w-full"
        animate={reduced ? { scale: 1, rotate: 0 } : { scale, rotate }}
        transition={spring}
      >
        <svg viewBox="0 0 200 200" className="h-full w-full overflow-visible">
          {/* Sombra de la cuerda para dar volumen. */}
          <path
            d={KNOT_PATH}
            fill="none"
            stroke={mixHex("#0F2B24", "#4A0B14", t)}
            strokeWidth={strokeWidth + 4}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.18}
            style={{ filter: "blur(4px)" }}
          />
          {/* Cuerda principal. */}
          <motion.path
            d={KNOT_PATH}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={false}
            animate={{ stroke: ropeColor, strokeWidth }}
            transition={spring}
          />
          {/* Brillo trenzado para que parezca cuerda. */}
          <motion.path
            d={KNOT_PATH}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="5 10"
            initial={false}
            animate={{
              stroke: "rgba(255, 248, 242, 0.55)",
              strokeWidth: Math.max(2.4, strokeWidth * 0.24),
              opacity: 0.7 - t * 0.15,
            }}
            transition={spring}
          />
        </svg>
      </motion.div>
    </div>
  );
}
