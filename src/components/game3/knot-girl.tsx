"use client";

import { cn } from "@/lib/utils";

interface KnotGirlProps {
  knots: number; // 0 (libre) - 5 (muy apretado)
}

export function KnotGirl({ knots }: KnotGirlProps) {
  const level = Math.max(0, Math.min(5, knots));
  const free = 5 - level;
  const labels = [
    "Libre y en paz",
    "Casi suelta",
    "Ahí va",
    "Un poco enredada",
    "Muy enredada",
    "Súper apretada",
  ];

  return (
    <div className="rounded-3xl border border-line/80 bg-white/80 p-4 shadow-soft">
      <div className="flex items-end justify-between gap-4">
        <div className="flex-1">
          <p className="text-[0.7rem] font-extrabold uppercase tracking-[0.12em] text-plum">
            Tus nudos
          </p>
          <p className="mt-1 text-sm font-semibold text-ink">
            {labels[level]}
          </p>
          <p className="mt-1 text-xs font-medium leading-relaxed text-ink-soft">
            Si respondes cuidándote, los nudos se aflojan. Si te enredas en lo que no te hace bien, se aprietan.
          </p>
          <div className="mt-3 flex gap-1.5">
            {Array.from({ length: 5 }).map((_, i) => {
              const tight = i < level;
              return (
                <span
                  key={i}
                  className={cn(
                    "h-2.5 flex-1 rounded-full transition-all duration-500",
                    tight ? "bg-coral" : "bg-teal/50",
                  )}
                />
              );
            })}
          </div>
          <div className="mt-2 flex justify-between text-[0.65rem] font-bold text-ink-faint">
            <span>Suelta ({free})</span>
            <span>Nudos ({level})</span>
          </div>
        </div>

        <div className="relative h-36 w-24 shrink-0" aria-hidden>
          <svg viewBox="0 0 100 150" className="h-full w-full">
            {/* head */}
            <circle cx="50" cy="22" r="14" className="fill-coral-soft stroke-plum" strokeWidth="3" />
            {/* body */}
            <path d="M50 36 C50 36, 38 55, 38 70 L38 95 C38 105, 62 105, 62 95 L62 70 C62 55, 50 36, 50 36Z" className="fill-plum-mist stroke-plum" strokeWidth="3" />
            {/* arms */}
            <path d="M38 55 C28 62, 22 72, 24 82" className="stroke-plum" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M62 55 C72 62, 78 72, 76 82" className="stroke-plum" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* legs */}
            <path d="M43 100 L40 135" className="stroke-plum" strokeWidth="4" fill="none" strokeLinecap="round" />
            <path d="M57 100 L60 135" className="stroke-plum" strokeWidth="4" fill="none" strokeLinecap="round" />
            {/* knots / rope */}
            {level >= 1 && <ellipse cx="50" cy="58" rx="18" ry="6" className="fill-none stroke-coral" strokeWidth={level >= 4 ? 5 : 3} />}
            {level >= 2 && <path d="M32 72 Q50 82 68 72" className="fill-none stroke-coral" strokeWidth={level >= 4 ? 5 : 3} strokeLinecap="round" />}
            {level >= 3 && <ellipse cx="50" cy="86" rx="16" ry="6" className="fill-none stroke-coral" strokeWidth={level >= 5 ? 5 : 3} />}
            {level >= 4 && <path d="M36 64 Q50 56 64 64" className="fill-none stroke-coral-deep" strokeWidth="4" strokeLinecap="round" />}
            {level >= 5 && <path d="M34 96 Q50 104 66 96" className="fill-none stroke-coral-deep" strokeWidth="5" strokeLinecap="round" />}
            {level <= 1 && <path d="M30 78 Q50 70 70 78" className="fill-none stroke-teal" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" opacity="0.7" />}
          </svg>
        </div>
      </div>
    </div>
  );
}
