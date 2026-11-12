"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ConsequenceBannerProps {
  visible: boolean;
  impact?: string;
}

export function ConsequenceBanner({ visible, impact }: ConsequenceBannerProps) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          className="pointer-events-none fixed inset-0 z-[70] grid place-items-center bg-plum-deep/35 p-5 backdrop-blur-[3px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="status"
          aria-live="assertive"
        >
          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-5xl border border-white/15 bg-plum-deep px-7 py-8 text-center text-cream shadow-lift sm:px-9 sm:py-10"
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-coral/25 blur-3xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl"
            />
            <motion.span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/20"
              animate={{ scale: [0.8, 1.35], opacity: [0.55, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
            />
            <div className="relative">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-gold text-plum-deep shadow-soft">
                <Sparkles className="h-6 w-6" />
              </span>
              <p className="mt-5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-gold">
                El hilo se mueve
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold leading-tight sm:text-3xl">
                Esta acción tendrá consecuencias…
              </h2>
              {impact ? (
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-cream/75">
                  {impact}
                </p>
              ) : null}
              <div className="mx-auto mt-5 h-1 w-20 rounded-full bg-gold/70" />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
