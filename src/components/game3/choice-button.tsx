"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StoryChoice } from "@/lib/types";

interface ChoiceButtonProps {
  choice: StoryChoice;
  index: number;
  disabled?: boolean;
  onChoose: (choice: StoryChoice) => void;
}

export function ChoiceButton({
  choice,
  index,
  disabled = false,
  onChoose,
}: ChoiceButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={disabled ? undefined : { x: 4 }}
      whileTap={disabled ? undefined : { scale: 0.995 }}
      onClick={() => onChoose(choice)}
      disabled={disabled}
      className={cn(
        "group flex w-full items-center gap-3 rounded-2xl border border-line bg-white/80 p-4 text-left shadow-sm transition duration-200",
        "hover:border-plum/25 hover:bg-white hover:shadow-soft",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40 focus-visible:ring-offset-2 focus-visible:ring-offset-cream",
        disabled && "pointer-events-none opacity-55",
      )}
    >
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sand text-xs font-extrabold text-plum">
        {String.fromCharCode(65 + index)}
      </span>
      <span className="flex-1 text-pretty text-sm font-medium leading-relaxed text-ink">
        {choice.label}
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint transition group-hover:translate-x-0.5 group-hover:text-plum" />
    </motion.button>
  );
}
