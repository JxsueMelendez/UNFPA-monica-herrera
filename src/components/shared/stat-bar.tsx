"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StatBarProps {
  label: string;
  value: number;
  max?: number;
  colorClassName?: string;
  compact?: boolean;
}

export function StatBar({
  label,
  value,
  max = 10,
  colorClassName = "bg-plum",
  compact = false,
}: StatBarProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span
          className={cn(
            "font-semibold text-ink-soft",
            compact ? "text-[0.7rem]" : "text-xs",
          )}
        >
          {label}
        </span>
        <span className="text-[0.7rem] font-bold tabular-nums text-ink-faint">
          {value}/{max}
        </span>
      </div>
      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-sand">
        <motion.div
          className={cn("h-full rounded-full", colorClassName)}
          initial={false}
          animate={{ width: `${percentage}%` }}
          transition={{ type: "spring", stiffness: 120, damping: 22 }}
        />
      </div>
    </div>
  );
}
