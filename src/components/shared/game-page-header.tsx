import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

interface GamePageHeaderProps {
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
  tone?: "coral" | "teal" | "plum" | "gold";
}

const toneClasses = {
  coral: "bg-coral-soft text-coral-deep",
  teal: "bg-teal-soft text-teal-deep",
  plum: "bg-plum-mist text-plum",
  gold: "bg-gold-soft text-gold-deep",
};

const badgeTone = {
  coral: "coral",
  teal: "teal",
  plum: "plum",
  gold: "gold",
} as const;

export function GamePageHeader({
  icon: Icon,
  eyebrow,
  title,
  description,
  children,
  tone = "coral",
}: GamePageHeaderProps) {
  return (
    <section className="relative overflow-hidden rounded-5xl border border-line/80 bg-white/75 p-6 shadow-soft backdrop-blur-sm sm:p-9">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-coral/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-teal/10 blur-2xl"
      />
      <div className="relative flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`grid h-12 w-12 place-items-center rounded-2xl ${toneClasses[tone]}`}
            >
              <Icon className="h-6 w-6" />
            </span>
            <Badge variant={badgeTone[tone]}>{eyebrow}</Badge>
          </div>
          <h1 className="mt-5 text-balance font-display text-3xl font-semibold leading-[1.05] tracking-[-0.03em] text-ink sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 max-w-xl text-pretty text-[0.95rem] leading-relaxed text-ink-soft">
            {description}
          </p>
        </div>
        {children ? <div className="shrink-0">{children}</div> : null}
      </div>
    </section>
  );
}
