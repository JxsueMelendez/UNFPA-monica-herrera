import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "coral" | "teal" | "gold" | "plum" | "outline";

const variants: Record<BadgeVariant, string> = {
  neutral: "bg-sand text-ink-soft",
  coral: "bg-coral-soft text-coral-deep",
  teal: "bg-teal-soft text-teal-deep",
  gold: "bg-gold-soft text-gold-deep",
  plum: "bg-plum-mist text-plum",
  outline: "border border-line bg-white/70 text-ink-soft",
};

export function Badge({
  className,
  variant = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em]",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
