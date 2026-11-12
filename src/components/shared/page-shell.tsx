import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}

export function PageShell({ children, className, wide = false }: PageShellProps) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-warm bg-[size:34px_34px] opacity-70"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-28 top-20 h-72 w-72 rounded-full bg-coral/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 top-1/3 h-80 w-80 rounded-full bg-teal/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-gold/10 blur-3xl"
      />
      <main
        className={cn(
          "relative z-10 mx-auto w-full px-4 pb-20 pt-8 sm:px-6 sm:pt-10",
          wide ? "max-w-7xl" : "max-w-6xl",
          className,
        )}
      >
        {children}
      </main>
    </div>
  );
}
