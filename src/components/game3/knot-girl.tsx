"use client";

import { KnotVisual } from "@/components/game3/knot-visual";
import { cn } from "@/lib/utils";

interface KnotGirlProps {
  knots: number; // tensión: 0 (suelto) - 5 (bien apretado)
}

const LABELS = [
  "Libre y suelta",
  "Casi suelta",
  "Un poco tensa",
  "Enredada",
  "Bien apretada",
  "Muy apretada",
];

export function KnotGirl({ knots }: KnotGirlProps) {
  const level = Math.max(0, Math.min(5, knots));
  const percent = (level / 5) * 100;
  const tight = level >= 4;
  const loose = level <= 1;

  return (
    <div className="overflow-hidden rounded-3xl border border-line/80 bg-white/80 p-4 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-plum">
            Tu nudo
          </p>
          <p className="mt-1 text-sm font-semibold text-ink">{LABELS[level]}</p>
        </div>
        <span
          className={cn(
            "rounded-full px-2.5 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.1em]",
            tight
              ? "bg-coral-soft text-coral-deep"
              : loose
                ? "bg-teal-soft text-teal-deep"
                : "bg-gold-soft text-gold-deep",
          )}
        >
          {tight ? "Apretado" : loose ? "Suelto" : "A medio"}
        </span>
      </div>

      <div className="relative mt-1 grid place-items-center py-1">
        <KnotVisual level={level} size={172} />
      </div>

      <p className="mt-1 text-center text-xs font-medium leading-relaxed text-ink-soft">
        Si respondés cuidándote, el nudo se afloja. Si te enredás en lo que no te hace bien, se aprieta.
      </p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[0.6rem] font-bold uppercase tracking-[0.1em] text-ink-faint">
          <span>Aflojado</span>
          <span>Apretado</span>
        </div>
        <div className="relative mt-2 h-2.5 rounded-full bg-gradient-to-r from-teal-soft via-gold-soft to-coral-soft">
          <div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-teal via-gold to-coral transition-[width] duration-700 motion-reduce:transition-none"
            style={{ width: `${percent}%` }}
          />
          <span
            className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-ink shadow-soft transition-[left] duration-700 motion-reduce:transition-none"
            style={{ left: `${percent}%` }}
          />
        </div>
        <p className="mt-2 text-center text-[0.65rem] font-semibold text-ink-faint">
          Tensión del nudo: {level} de 5
        </p>
      </div>
    </div>
  );
}
