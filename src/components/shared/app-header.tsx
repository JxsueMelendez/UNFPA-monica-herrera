"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, Compass, Sparkles, Trophy } from "lucide-react";
import { useUserProgress } from "@/lib/use-user-progress";
import { getInitials } from "@/lib/utils";

export function AppHeader() {
  const pathname = usePathname();
  const { progress, completionCount } = useUserProgress();

  const isGame = pathname?.startsWith("/juego") ?? false;
  const isHub = pathname === "/hub";

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href={progress.userName ? "/hub" : "/"}
          className="group flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40"
          aria-label="Ir al inicio de Brújula"
        >
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-plum text-cream shadow-soft transition group-hover:rotate-6">
            <Compass className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-cream" />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-lg font-semibold leading-none text-ink">
              Brújula
            </span>
            <span className="mt-1 hidden text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink-faint sm:block">
              Relaciones, límites y proyecto de vida
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          {isHub ? (
            <span className="hidden items-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-1.5 text-xs font-semibold text-ink-soft sm:inline-flex">
              <Trophy className="h-3.5 w-3.5 text-gold-deep" />
              {completionCount}/3 juegos
            </span>
          ) : null}

          {isGame ? (
            <Link
              href="/hub"
              className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink-soft transition hover:bg-sand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Volver al inicio</span>
            </Link>
          ) : null}

          {progress.userName ? (
            <Link
              href="/hub"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-white/80 pl-1 pr-3 shadow-sm transition hover:border-plum/20 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40"
              aria-label={`Perfil de ${progress.userName}`}
            >
              <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-coral to-gold text-xs font-bold text-white">
                {getInitials(progress.userName)}
              </span>
              <span className="max-w-[8rem] truncate text-sm font-semibold text-ink">
                {progress.userName}
              </span>
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-ink px-4 text-sm font-semibold text-cream shadow-soft transition hover:bg-plum-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Empezar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
