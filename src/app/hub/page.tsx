"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  Check,
  HeartHandshake,
  LockKeyhole,
  MessagesSquare,
  Play,
  Route,
  Sparkles,
  Trash2,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Progress } from "@/components/ui/progress";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { PageShell } from "@/components/shared/page-shell";
import { ProgressRing } from "@/components/shared/progress-ring";
import { UserGate } from "@/components/shared/user-gate";
import { GAME1_TOTAL } from "@/data/game1-cards";
import { GAME2_TOTAL_FLAGS } from "@/data/game2-chats";
import { storyNodes } from "@/data/game3-story";
import { useUserProgress } from "@/lib/use-user-progress";
import { cn } from "@/lib/utils";
import type { GameKey } from "@/lib/types";

interface GameHubCard {
  key: GameKey;
  number: string;
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  tag: string;
  tone: string;
  iconTone: string;
  progress: number;
  status: "not-started" | "in-progress" | "completed";
  detail: string;
  score: string;
  action: string;
}

const CHAPTER_TOTAL = 4;

export default function HubPage() {
  const router = useRouter();
  const { progress, isReady, completionCount, resetAll } = useUserProgress();
  const [resetOpen, setResetOpen] = useState(false);

  if (!isReady) {
    return (
      <PageShell>
        <LoadingScreen />
      </PageShell>
    );
  }

  if (!progress.userName) {
    return (
      <PageShell>
        <UserGate />
      </PageShell>
    );
  }

  const { game1, game2, game3 } = progress;

  const game3Ending = Object.values(storyNodes).find(
    (node) => node.ending?.id === game3.endingId,
  )?.ending;

  const game1Status =
    game1.completed || game1.cardsAnswered >= GAME1_TOTAL
      ? "completed"
      : game1.cardsAnswered > 0
        ? "in-progress"
        : "not-started";

  const game2Status =
    game2.completed || game2.flagsIdentified >= GAME2_TOTAL_FLAGS
      ? "completed"
      : game2.flagsIdentified > 0
        ? "in-progress"
        : "not-started";

  const game3Status = game3.completed
    ? "completed"
    : game3.decisionsHistory.length > 0
      ? "in-progress"
      : "not-started";

  const cards: GameHubCard[] = [
    {
      key: "game1",
      number: "01",
      title: "¿Lo compartes o lo cuestionas?",
      description:
        "Desliza publicaciones y distingue entre vínculos que suman y mensajes que normalizan el control.",
      href: "/juego-1",
      icon: ArrowLeftRight,
      tag: "Swipe",
      tone: "from-coral-soft/70 to-cream",
      iconTone: "bg-coral-soft text-coral-deep",
      progress:
        (Math.min(game1.cardsAnswered, GAME1_TOTAL) / GAME1_TOTAL) * 100,
      status: game1Status,
      detail: `${game1.cardsAnswered} de ${GAME1_TOTAL} tarjetas`,
      score: `${game1.score} aciertos`,
      action:
        game1Status === "completed"
          ? "Volver a jugar"
          : game1Status === "in-progress"
            ? "Continuar"
            : "Empezar",
    },
    {
      key: "game2",
      number: "02",
      title: "Entre líneas",
      description:
        "Lee una conversación realista y encuentra las banderas rojas escondidas entre mensajes cotidianos.",
      href: "/juego-2",
      icon: MessagesSquare,
      tag: "Chat",
      tone: "from-teal-soft/70 to-cream",
      iconTone: "bg-teal-soft text-teal-deep",
      progress:
        (Math.min(game2.flagsIdentified, GAME2_TOTAL_FLAGS) /
          GAME2_TOTAL_FLAGS) *
        100,
      status: game2Status,
      detail: `${game2.flagsIdentified} de ${GAME2_TOTAL_FLAGS} banderas`,
      score: `${game2.flagsIdentified} identificadas`,
      action:
        game2Status === "completed"
          ? "Volver a revisar"
          : game2Status === "in-progress"
            ? "Continuar"
            : "Empezar",
    },
    {
      key: "game3",
      number: "03",
      title: "Tú decides el camino",
      description:
        "Una historia con decisiones, consecuencias y varios finales sobre autonomía y redes de apoyo.",
      href: "/juego-3",
      icon: Route,
      tag: "Historia",
      tone: "from-gold-soft/70 to-cream",
      iconTone: "bg-gold-soft text-gold-deep",
      progress: game3.completed
        ? 100
        : game3.decisionsHistory.length > 0
          ? (Math.min(game3.currentChapter, CHAPTER_TOTAL) / CHAPTER_TOTAL) * 100
          : 0,
      status: game3Status,
      detail: game3Ending
        ? game3Ending.title
        : `Capítulo ${Math.min(game3.currentChapter, CHAPTER_TOTAL)} de ${CHAPTER_TOTAL}`,
      score: `${game3.decisionsHistory.length} decisiones`,
      action:
        game3Status === "completed"
          ? "Volver a vivirla"
          : game3Status === "in-progress"
            ? "Continuar"
            : "Empezar",
    },
  ];

  const recommended =
    cards.find((card) => card.status !== "completed") ?? null;

  const overallPercent = Math.round((completionCount / 3) * 100);
  const greeting = progress.userName.split(" ")[0] ?? progress.userName;

  return (
    <PageShell>
      <section className="grid gap-5 lg:grid-cols-[1.25fr_0.75fr]">
        <Card className="relative overflow-hidden border-white/80 bg-white/85 p-7 sm:p-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-coral/10 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-teal/10 blur-2xl"
          />
          <div className="relative">
            <Badge variant="coral">
              <Sparkles className="h-3.5 w-3.5" />
              Tu recorrido
            </Badge>
            <h1 className="mt-4 text-balance font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl">
              Hola, {greeting}.
              <span className="block text-plum">Vamos a tu ritmo.</span>
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-soft sm:text-base">
              {completionCount === 0
                ? "Elige un juego para empezar. No hay una forma correcta de recorrer esta brújula: lo importante es lo que descubras en el camino."
                : completionCount === 3
                  ? "Completaste los tres juegos. Puedes repasar cualquier recorrido, probar otras decisiones o volver cuando lo necesites."
                  : `Ya completaste ${completionCount} de 3 juegos. Puedes seguir con el siguiente o volver a uno anterior.`}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {recommended ? (
                <Link
                  href={recommended.href}
                  className={buttonVariants({ variant: "coral", size: "lg" })}
                >
                  <Play className="h-4 w-4 fill-current" />
                  {recommended.status === "in-progress" ? "Continuar" : "Empezar"}:{" "}
                  {recommended.tag}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href="/juego-3"
                  className={buttonVariants({ variant: "teal", size: "lg" })}
                >
                  <Trophy className="h-4 w-4" />
                  Explorar otros finales
                </Link>
              )}
              <span className="inline-flex items-center gap-2 text-xs font-medium text-ink-faint">
                <LockKeyhole className="h-3.5 w-3.5" />
                Guardado en este dispositivo
              </span>
            </div>
          </div>
        </Card>

        <Card className="relative flex flex-col justify-between overflow-hidden bg-plum-deep p-7 text-cream shadow-lift sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-coral/20 blur-3xl"
          />
          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-cream/60">
                Progreso global
              </p>
              <p className="mt-2 font-display text-2xl font-semibold">
                {completionCount === 3
                  ? "Brújula completa"
                  : completionCount === 0
                    ? "Recién comenzando"
                    : "En movimiento"}
              </p>
            </div>
            <ProgressRing
              value={completionCount}
              max={3}
              size={88}
              stroke={8}
              strokeClassName="stroke-gold"
            >
              <span className="text-center">
                <span className="block font-display text-xl font-semibold leading-none text-cream">
                  {completionCount}
                </span>
                <span className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-cream/60">
                  de 3
                </span>
              </span>
            </ProgressRing>
          </div>

          <div className="relative mt-8">
            <div className="flex items-center justify-between text-xs font-semibold text-cream/70">
              <span>Avance total</span>
              <span>{overallPercent}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full rounded-full bg-gradient-to-r from-coral to-gold transition-[width] duration-700"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2">
              {cards.map((card) => (
                <div
                  key={card.key}
                  className="rounded-2xl bg-white/10 px-2.5 py-2 text-center"
                >
                  <span className="block text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-cream/55">
                    Juego {card.number}
                  </span>
                  <span className="mt-1 block text-xs font-bold text-cream">
                    {card.status === "completed"
                      ? "Listo"
                      : card.status === "in-progress"
                        ? "En curso"
                        : "Pendiente"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-12">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="plum">Hub de juegos</Badge>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-ink">
              Elige tu próxima parada
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setResetOpen(true)}
            className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink-faint transition hover:bg-coral-soft hover:text-coral-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Borrar mi progreso
          </button>
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            const isRecommended = recommended?.key === card.key;

            return (
              <Card
                key={card.key}
                className={cn(
                  "relative flex flex-col overflow-hidden border-line/80 bg-gradient-to-br p-6 transition duration-300 hover:-translate-y-0.5 hover:shadow-lift",
                  card.tone,
                  isRecommended && "ring-2 ring-coral/60",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <span
                    className={cn(
                      "grid h-12 w-12 place-items-center rounded-2xl",
                      card.iconTone,
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <div className="flex flex-col items-end gap-2">
                    <Badge
                      variant={
                        card.status === "completed"
                          ? "teal"
                          : card.status === "in-progress"
                            ? "gold"
                            : "outline"
                      }
                    >
                      {card.status === "completed" ? (
                        <>
                          <Check className="h-3 w-3" />
                          Completado
                        </>
                      ) : card.status === "in-progress" ? (
                        "En curso"
                      ) : (
                        "Sin empezar"
                      )}
                    </Badge>
                    {isRecommended ? (
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.12em] text-coral-deep">
                        Siguiente
                      </span>
                    ) : null}
                  </div>
                </div>

                <p className="mt-5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-faint">
                  Juego {card.number} · {card.tag}
                </p>
                <h3 className="mt-2 font-display text-2xl font-semibold leading-[1.08] tracking-[-0.02em] text-ink">
                  {card.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">
                  {card.description}
                </p>

                <div className="mt-5 rounded-2xl border border-white/70 bg-white/60 p-3.5">
                  <div className="flex items-center justify-between gap-2 text-[0.7rem] font-semibold text-ink-soft">
                    <span className="truncate">{card.detail}</span>
                    <span className="shrink-0 text-ink-faint">{card.score}</span>
                  </div>
                  <Progress
                    value={card.progress}
                    className="mt-2 h-1.5"
                    indicatorClassName={
                      card.status === "completed"
                        ? "bg-gradient-to-r from-teal to-teal-deep"
                        : undefined
                    }
                  />
                </div>

                <Link
                  href={card.href}
                  className={buttonVariants({
                    variant:
                      card.status === "completed"
                        ? "secondary"
                        : card.status === "in-progress"
                          ? "primary"
                          : "outline",
                    size: "md",
                    className: "mt-5 w-full",
                  })}
                >
                  {card.status === "completed" ? (
                    <Trophy className="h-4 w-4 text-gold-deep" />
                  ) : (
                    <Play className="h-4 w-4 fill-current" />
                  )}
                  {card.action}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            );
          })}
        </div>
      </section>

      <section className="mt-12 grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
        <Card className="border-plum/10 bg-plum-mist/60 p-7 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/80 text-plum">
              <HeartHandshake className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">
                Un recordatorio antes de seguir
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Este recorrido no evalúa si eres una buena o mala persona, ni si
                tu relación es “correcta”. Te invita a mirar con más claridad las
                dinámicas de poder, tus límites y las personas que pueden
                acompañarte. Si algo te incomoda, puedes pausar y hablar con
                alguien de confianza.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-7 sm:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-faint">
            Tu progreso
          </p>
          <div className="mt-4 space-y-3">
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-ink-soft">Nombre</span>
              <span className="font-semibold text-ink">{progress.userName}</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-ink-soft">Juegos completados</span>
              <span className="font-semibold text-ink">{completionCount}/3</span>
            </div>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-ink-soft">Decisiones tomadas</span>
              <span className="font-semibold text-ink">
                {game3.decisionsHistory.length}
              </span>
            </div>
            <div className="flex items-center justify-between gap-3 text-sm">
              <span className="text-ink-soft">Banderas identificadas</span>
              <span className="font-semibold text-ink">
                {game2.flagsIdentified}/{GAME2_TOTAL_FLAGS}
              </span>
            </div>
          </div>
        </Card>
      </section>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        className="max-w-md"
        ariaLabel="Confirmar borrado de progreso"
      >
        <div className="p-7 sm:p-8">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-coral-soft text-coral-deep">
            <Trash2 className="h-6 w-6" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-semibold text-ink">
            ¿Borrar todo tu avance?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Se eliminarán tu nombre, las puntuaciones y las decisiones guardadas
            en este dispositivo. Esta acción no se puede deshacer.
          </p>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => setResetOpen(false)}>
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                resetAll();
                setResetOpen(false);
                router.push("/");
              }}
            >
              <Trash2 className="h-4 w-4" />
              Sí, borrar todo
            </Button>
          </div>
        </div>
      </Modal>
    </PageShell>
  );
}
