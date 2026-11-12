"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ArrowLeft, Compass, Info, Sparkles, Trophy } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useUserProgress } from "@/lib/use-user-progress";
import { getInitials } from "@/lib/utils";
import { GAME1_TOTAL } from "@/data/game1-cards";
import { GAME2_TOTAL_FLAGS } from "@/data/game2-chats";

function sessionCompletion(s: { game1: { completed: boolean; cardsAnswered: number }; game2: { completed: boolean; flagsIdentified: number }; game3: { completed: boolean } }) {
  return [s.game1.completed || s.game1.cardsAnswered >= GAME1_TOTAL, s.game2.completed || s.game2.flagsIdentified >= GAME2_TOTAL_FLAGS, s.game3.completed].filter(Boolean).length;
}

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { progress, completionCount, sessions, activeSessionId, switchSession } = useUserProgress();
  const [open, setOpen] = useState(false);

  const isGame = pathname?.startsWith("/juego") ?? false;
  const isHub = pathname === "/hub";

  return (
    <>
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          href={progress.userName ? "/hub" : "/"}
          className="group flex min-w-0 items-center gap-3 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40"
          aria-label="Ir al inicio"
        >
          <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-plum text-cream shadow-soft transition group-hover:rotate-6">
            <Compass className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-gold ring-2 ring-cream" />
          </span>
          <span className="min-w-0">
            <span className="block font-display text-lg font-semibold leading-none text-ink">
              UNFPA
            </span>
            <span className="mt-1 hidden text-[0.68rem] font-medium uppercase tracking-[0.14em] text-ink-faint sm:block">
              Fondo de Población de las Naciones Unidas
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/sobre-nosotros"
            aria-label="Sobre nosotros"
            className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink-soft transition hover:bg-sand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40"
          >
            <Info className="h-4 w-4 sm:hidden" />
            <span className="hidden sm:inline">Sobre nosotros</span>
          </Link>

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
            <>
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink-soft transition hover:bg-sand hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40"
              >
                Cambiar sesión
              </button>
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
            </>
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

      <Modal open={open} onClose={() => setOpen(false)} className="max-w-lg" ariaLabel="Cambiar sesión">
        <div className="p-6 sm:p-7">
          <h2 className="font-display text-2xl font-semibold text-ink">Sesiones guardadas</h2>
          <p className="mt-1 text-sm text-ink-soft">Elige una sesión para continuar o crea una nueva.</p>
          <div className="mt-5 max-h-[60vh] space-y-3 overflow-y-auto pr-1">
            {sessions.length === 0 ? (
              <p className="text-sm text-ink-faint">No hay sesiones guardadas.</p>
            ) : (
              sessions.map((s) => {
                const done = sessionCompletion(s.progress);
                const pct = Math.round((done / 3) * 100);
                const active = s.id === activeSessionId;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      switchSession(s.id);
                      setOpen(false);
                      router.push("/hub");
                    }}
                    className={`w-full rounded-2xl border p-4 text-left transition ${active ? "border-plum/40 bg-plum-mist/40" : "border-line hover:border-plum/30 hover:bg-sand/40"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-ink">{s.name || s.progress.userName || "Sesión"}</p>
                        <p className="mt-0.5 text-xs text-ink-faint">Juegos completados: {done}/3</p>
                      </div>
                      {active ? <span className="shrink-0 rounded-full bg-plum px-2 py-0.5 text-[0.65rem] font-bold text-cream">Activa</span> : null}
                    </div>
                    <Progress value={pct} className="mt-3 h-1.5" />
                    <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-[0.7rem] text-ink-soft">
                      <span>Juego 1: {s.progress.game1.score}/{GAME1_TOTAL}</span>
                      <span>Juego 2: {s.progress.game2.flagsIdentified}/{GAME2_TOTAL_FLAGS}</span>
                      <span>Juego 3: {s.progress.game3.decisionsHistory.length} decisiones</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => setOpen(false)}>Cerrar</Button>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center justify-center rounded-full bg-ink px-5 text-sm font-semibold text-cream hover:bg-plum-deep"
            >
              Nueva sesión
            </Link>
          </div>
        </div>
      </Modal>
    </>
  );
}
