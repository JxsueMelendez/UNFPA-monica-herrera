"use client";

import { animate, motion, useMotionValue, useTransform, type PanInfo } from "framer-motion";
import { useEffect } from "react";
import {
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Send,
  Share2,
  ShieldQuestion,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { Game1Card, SwipeChoice } from "@/lib/types";

interface SwipeCardProps {
  card: Game1Card;
  onSwipe: (choice: SwipeChoice) => void;
  disabled?: boolean;
  exiting?: SwipeChoice | null;
}

function formatCount(value: number) {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(value);
}

export function SwipeCard({
  card,
  onSwipe,
  disabled = false,
  exiting = null,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-320, 320], [-14, 14]);
  const shareOpacity = useTransform(x, [18, 110], [0, 1]);
  const questionOpacity = useTransform(x, [-110, -18], [1, 0]);

  useEffect(() => {
    if (!exiting) return;
    const target = exiting === "share" ? 640 : -640;
    const controls = animate(x, target, { duration: 0.24, ease: "easeIn" });
    return () => controls.stop();
  }, [exiting, x]);

  function handleDragEnd(_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) {
    if (disabled || exiting) return;

    const shouldShare = info.offset.x > 100 || info.velocity.x > 520;
    const shouldQuestion = info.offset.x < -100 || info.velocity.x < -520;

    if (shouldShare) {
      onSwipe("share");
      return;
    }

    if (shouldQuestion) {
      onSwipe("question");
      return;
    }

    animate(x, 0, { type: "spring", stiffness: 320, damping: 26 });
  }

  return (
    <motion.article
      drag={disabled || exiting ? false : "x"}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.65}
      onDragEnd={handleDragEnd}
      style={{ x, rotate }}
      whileTap={disabled ? undefined : { cursor: "grabbing" }}
      className={cn(
        "relative w-full select-none overflow-hidden rounded-[2rem] border border-line/80 bg-white shadow-lift",
        disabled || exiting ? "cursor-default" : "cursor-grab touch-pan-y",
      )}
      aria-label={`Publicación de ${card.author.name}: ${card.caption}`}
    >
      <motion.span
        style={{ opacity: shareOpacity }}
        className="pointer-events-none absolute left-5 top-5 z-20 -rotate-6 rounded-xl border-2 border-teal bg-teal-soft/95 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-teal-deep shadow-sm"
      >
        Compartir
      </motion.span>
      <motion.span
        style={{ opacity: questionOpacity }}
        className="pointer-events-none absolute right-5 top-5 z-20 rotate-6 rounded-xl border-2 border-coral bg-coral-soft/95 px-3 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-coral-deep shadow-sm"
      >
        Cuestionar
      </motion.span>

      <div className="flex items-center gap-3 px-5 pb-3 pt-5">
        <span
          className={cn(
            "grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white shadow-sm",
            card.author.avatarColor,
          )}
        >
          {card.author.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-ink">{card.author.name}</p>
          <p className="truncate text-xs text-ink-faint">
            {card.author.handle} · {card.time}
          </p>
        </div>
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          className="grid h-8 w-8 place-items-center rounded-full text-ink-faint"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </div>

      <div className="px-3">
        <div
          className={cn(
            "relative flex aspect-[5/4] flex-col items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br",
            card.visual.gradient,
          )}
        >
          <div aria-hidden className="absolute inset-0 bg-dots-warm bg-[size:18px_18px] opacity-40" />
          <div
            aria-hidden
            className="absolute -right-8 -top-10 h-32 w-32 rounded-full border border-white/50 bg-white/20 blur-sm"
          />
          <div
            aria-hidden
            className="absolute -bottom-10 -left-8 h-36 w-36 rounded-full border border-white/40 bg-white/15 blur-sm"
          />
          <span className="relative text-7xl drop-shadow-sm sm:text-8xl" aria-hidden>
            {card.visual.emoji}
          </span>
          {card.visual.label ? (
            <span className="relative mt-4 rounded-full border border-white/60 bg-white/60 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink-soft backdrop-blur-sm">
              {card.visual.label}
            </span>
          ) : null}
          <span className="absolute bottom-3 right-4 font-display text-4xl leading-none text-ink/10">
            ”
          </span>
        </div>
      </div>

      <div className="px-5 pb-5 pt-4">
        <p className="text-pretty text-[0.94rem] leading-relaxed text-ink">
          {card.caption}
        </p>

        <div className="mt-4 flex items-center justify-between border-t border-line/70 pt-3">
          <div className="flex items-center gap-4 text-ink-soft">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
              <Heart className="h-4 w-4 text-coral" />
              {formatCount(card.likes)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
              <MessageCircle className="h-4 w-4" />
              {formatCount(card.comments)}
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
              <Share2 className="h-4 w-4" />
              {formatCount(card.shares)}
            </span>
          </div>
          <div className="flex items-center gap-3 text-ink-faint">
            <Send className="h-4 w-4" />
            <Bookmark className="h-4 w-4" />
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2 rounded-2xl bg-sand/70 px-3 py-2 text-[0.68rem] font-medium leading-snug text-ink-soft">
          <ShieldQuestion className="h-3.5 w-3.5 shrink-0 text-plum" />
          Pregúntate: ¿este mensaje cuida tu autonomía o normaliza el control?
        </div>
      </div>
    </motion.article>
  );
}
