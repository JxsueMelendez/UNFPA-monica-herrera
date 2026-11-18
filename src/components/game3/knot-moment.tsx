"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, Minus, Wind, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { KnotVisual } from "@/components/game3/knot-visual";
import { cn } from "@/lib/utils";

export type KnotDirection = "tight" | "loose" | "same";

export interface KnotMomentData {
  id: number;
  from: number;
  to: number;
  direction: KnotDirection;
  impact?: string;
}

interface KnotMomentProps {
  moment: KnotMomentData | null;
}

const COPY: Record<
  KnotDirection,
  {
    eyebrow: string;
    title: string;
    fallback: string;
    icon: LucideIcon;
    accent: string;
    chip: string;
    flash: string;
  }
> = {
  tight: {
    eyebrow: "El nudo se está apretando",
    title: "Se siente más apretado",
    fallback: "Lo que elegiste aprieta un poco más el nudo.",
    icon: AlertTriangle,
    accent: "text-coral",
    chip: "bg-coral text-white",
    flash: "bg-coral",
  },
  loose: {
    eyebrow: "El nudo se está aflojando",
    title: "Se siente más suelto",
    fallback: "Lo que elegiste te da un poco de aire.",
    icon: Wind,
    accent: "text-[#8FD3BC]",
    chip: "bg-teal text-white",
    flash: "bg-teal",
  },
  same: {
    eyebrow: "El nudo se queda quieto",
    title: "Sigue igual",
    fallback: "Tu nudo sigue en el mismo punto.",
    icon: Minus,
    accent: "text-gold",
    chip: "bg-gold text-gold-deep",
    flash: "bg-gold",
  },
};

export function KnotMoment({ moment }: KnotMomentProps) {
  return (
    <AnimatePresence>
      {moment ? <MomentCard key={moment.id} moment={moment} /> : null}
    </AnimatePresence>
  );
}

function MomentCard({ moment }: { moment: KnotMomentData }) {
  const reduced = useReducedMotion();
  const [level, setLevel] = useState(reduced ? moment.to : moment.from);
  const copy = COPY[moment.direction];
  const Icon = copy.icon;

  useEffect(() => {
    if (reduced) {
      setLevel(moment.to);
      return;
    }

    // Dos frames para que el nudo arranque en el nivel anterior y se vea el cambio.
    let second = 0;
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => setLevel(moment.to));
    });
    return () => {
      cancelAnimationFrame(first);
      if (second) cancelAnimationFrame(second);
    };
  }, [moment, reduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] grid place-items-center overflow-hidden p-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      role="status"
      aria-live="assertive"
      aria-label={`${copy.eyebrow}. Tensión ${moment.from} a ${moment.to} de 5.`}
    >
      <div className="absolute inset-0 bg-plum-deep/70 backdrop-blur-[3px]" />

      {/* Flash de color: coral al apretar, verde al aflojar. */}
      <motion.div
        aria-hidden
        className={cn("absolute inset-0", copy.flash)}
        initial={{ opacity: 0 }}
        animate={
          reduced
            ? { opacity: 0.18 }
            : { opacity: [0, 0.85, 0.22, 0.7, 0.16, 0.5, 0] }
        }
        transition={
          reduced
            ? { duration: 0.2 }
            : {
                duration: 1.35,
                ease: "easeOut",
                times: [0, 0.12, 0.28, 0.44, 0.6, 0.76, 1],
              }
        }
      />

      <motion.div
        className="relative w-full max-w-md"
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={
          reduced || moment.direction !== "tight"
            ? { opacity: 1, scale: 1, y: 0, x: 0 }
            : { opacity: 1, scale: 1, y: 0, x: [0, -7, 6, -4, 3, 0] }
        }
        exit={{ opacity: 0, scale: 0.96, y: -10 }}
        transition={
          reduced
            ? { duration: 0 }
            : moment.direction === "tight"
              ? { duration: 0.6, ease: "easeOut" }
              : { type: "spring", stiffness: 260, damping: 24 }
        }
      >
        <div className="relative overflow-hidden rounded-5xl border border-white/15 bg-plum-deep px-6 py-7 text-center text-cream shadow-lift sm:px-8 sm:py-8">
          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute -right-16 -top-20 h-52 w-52 rounded-full blur-3xl",
              moment.direction === "tight"
                ? "bg-coral/35"
                : moment.direction === "loose"
                  ? "bg-teal/45"
                  : "bg-gold/25",
            )}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 h-52 w-52 rounded-full bg-white/5 blur-3xl"
          />

          <div className="relative">
            <span
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.6rem] font-extrabold uppercase tracking-[0.14em]",
                copy.chip,
              )}
            >
              <Icon className="h-3 w-3" />
              {copy.eyebrow}
            </span>

            <div className="relative mt-3 grid place-items-center">
              <motion.span
                aria-hidden
                className={cn(
                  "absolute h-44 w-44 rounded-full border",
                  moment.direction === "tight"
                    ? "border-coral/35"
                    : moment.direction === "loose"
                      ? "border-teal/40"
                      : "border-gold/30",
                )}
                animate={reduced ? undefined : { scale: [0.85, 1.45], opacity: [0.6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
              />
              <motion.span
                aria-hidden
                className={cn(
                  "absolute h-36 w-36 rounded-full border",
                  moment.direction === "tight"
                    ? "border-coral/25"
                    : moment.direction === "loose"
                      ? "border-teal/30"
                      : "border-gold/20",
                )}
                animate={reduced ? undefined : { scale: [0.9, 1.7], opacity: [0.5, 0] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: "easeOut", delay: 0.35 }}
              />
              <KnotVisual level={level} size={224} />
            </div>

            <h2 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">
              {copy.title}
            </h2>
            <p className="mx-auto mt-2 max-w-xs text-sm font-medium leading-relaxed text-cream/75">
              {moment.impact ?? copy.fallback}
            </p>

            <div className="mt-5 flex items-center justify-center gap-2.5 text-xs font-bold">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-cream/80">
                {moment.from}
              </span>
              <ArrowRight className={cn("h-4 w-4", copy.accent)} />
              <span
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full text-sm font-extrabold shadow-soft",
                  copy.chip,
                )}
              >
                {moment.to}
              </span>
              <span className="ml-1 text-[0.6rem] font-extrabold uppercase tracking-[0.14em] text-cream/50">
                tensión
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
