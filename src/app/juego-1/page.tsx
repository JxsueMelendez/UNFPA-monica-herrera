"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  BookOpen,
  HeartHandshake,
  Info,
  RotateCcw,
  ShieldAlert,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeedbackOverlay } from "@/components/game1/feedback-overlay";
import { SwipeCard } from "@/components/game1/swipe-card";
import { GamePageHeader } from "@/components/shared/game-page-header";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { PageShell } from "@/components/shared/page-shell";
import { ProgressRing } from "@/components/shared/progress-ring";
import { UserGate } from "@/components/shared/user-gate";
import { GAME1_TOTAL, game1Cards } from "@/data/game1-cards";
import { useUserProgress } from "@/lib/use-user-progress";
import type { Game1Card, SwipeChoice } from "@/lib/types";

interface FeedbackState {
  card: Game1Card;
  choice: SwipeChoice;
  correct: boolean;
}

export default function Game1Page() {
  const { progress, isReady, updateGame1, resetGame } = useUserProgress();

  const [hydrated, setHydrated] = useState(false);
  const [answeredIds, setAnsweredIds] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [exiting, setExiting] = useState<SwipeChoice | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isReady || hydrated) return;

    const savedAnswered = progress.game1.answeredIds ?? [];
    setAnsweredIds(
      savedAnswered.length > 0
        ? savedAnswered
        : progress.game1.completed
          ? game1Cards.map((card) => card.id)
          : [],
    );
    setScore(progress.game1.score);
    setHydrated(true);
  }, [isReady, hydrated, progress.game1.answeredIds, progress.game1.completed, progress.game1.score]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const remaining = game1Cards.filter((card) => !answeredIds.includes(card.id));
  const currentCard = remaining[0];
  const isComplete = progress.game1.completed || answeredIds.length >= GAME1_TOTAL;
  const answeredCount = Math.min(answeredIds.length, GAME1_TOTAL);

  const handleDecision = useCallback(
    (choice: SwipeChoice) => {
      if (!currentCard || feedback || exiting) return;

      const correct = (choice === "share") === currentCard.healthy;
      setExiting(choice);

      timeoutRef.current = window.setTimeout(() => {
        const nextAnswered = [...answeredIds, currentCard.id];
        const nextScore = score + (correct ? 1 : 0);

        setAnsweredIds(nextAnswered);
        setScore(nextScore);
        updateGame1({
          answeredIds: nextAnswered,
          cardsAnswered: nextAnswered.length,
          score: nextScore,
          completed: nextAnswered.length >= GAME1_TOTAL,
        });
        setFeedback({ card: currentCard, choice, correct });
        setExiting(null);
      }, 250);
    },
    [
      answeredIds,
      currentCard,
      exiting,
      feedback,
      score,
      updateGame1,
    ],
  );

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (feedback || !currentCard) return;
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        handleDecision("question");
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        handleDecision("share");
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentCard, feedback, handleDecision]);

  function handleReplay() {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    resetGame("game1");
    setAnsweredIds([]);
    setScore(0);
    setFeedback(null);
    setExiting(null);
  }

  if (!isReady || !hydrated) {
    return (
      <PageShell>
        <LoadingScreen label="Preparando las tarjetas..." />
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

  return (
    <PageShell wide>
      <GamePageHeader
        icon={ArrowLeftRight}
        eyebrow="Juego 01 · Swipe"
        title="¿Lo compartes o lo cuestionas?"
        description="Desliza cada publicación hacia la derecha si transmite una idea saludable, o hacia la izquierda si normaliza control, celos o desigualdad. No hay prisa: mira la frase completa."
        tone="coral"
      >
        <div className="flex items-center gap-4 rounded-3xl border border-line bg-white/80 p-4 shadow-sm">
          <ProgressRing
            value={answeredCount}
            max={GAME1_TOTAL}
            size={68}
            stroke={7}
            strokeClassName="stroke-coral"
          >
            <span className="font-display text-lg font-semibold text-ink">
              {answeredCount}
            </span>
          </ProgressRing>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
              Tarjetas
            </p>
            <p className="text-sm font-bold text-ink">
              {answeredCount} / {GAME1_TOTAL}
            </p>
            <p className="mt-0.5 text-xs font-medium text-ink-soft">
              {score} {score === 1 ? "acierto" : "aciertos"}
            </p>
          </div>
        </div>
      </GamePageHeader>

      {isComplete ? (
        <section className="mx-auto mt-8 max-w-3xl">
          <Card className="overflow-hidden">
            <div className="relative overflow-hidden bg-plum-deep px-7 py-8 text-cream sm:px-10 sm:py-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-coral/25 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-gold/15 blur-3xl"
              />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gold">
                    <Trophy className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-[0.16em]">
                      Juego completado
                    </span>
                  </div>
                  <h2 className="mt-4 max-w-lg font-display text-3xl font-semibold leading-tight sm:text-4xl">
                    {score >= 8
                      ? "Tu mirada está bien afinada."
                      : score >= 5
                        ? "Ya distingues las señales."
                        : "Empezaste a mirar distinto."}
                  </h2>
                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-cream/75">
                    {score >= 8
                      ? "Reconociste la mayoría de los mensajes que cuidaban tu autonomía y los que la ponían en riesgo. Ese ojo crítico también se entrena fuera de la pantalla."
                      : score >= 5
                        ? "Identificaste varias señales. Las dinámicas de control suelen esconderse en frases amables; seguir practicando te ayuda a nombrarlas antes."
                        : "Las señales de control pueden ser difíciles de ver, sobre todo cuando vienen mezcladas con afecto. No es un examen sobre ti: es una invitación a seguir mirando."}
                  </p>
                </div>
                <ProgressRing
                  value={score}
                  max={GAME1_TOTAL}
                  size={116}
                  stroke={9}
                  strokeClassName="stroke-gold"
                  className="shrink-0"
                >
                  <span className="text-center">
                    <span className="block font-display text-3xl font-semibold leading-none text-cream">
                      {score}
                    </span>
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-cream/60">
                      de {GAME1_TOTAL}
                    </span>
                  </span>
                </ProgressRing>
              </div>
            </div>

            <div className="px-7 py-7 sm:px-10 sm:py-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-line bg-sand/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-faint">
                    Lo que entrenaste
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    A distinguir cuidado de control, apoyo de aislamiento y
                    límites de obediencia.
                  </p>
                </div>
                <div className="rounded-2xl border border-line bg-sand/50 p-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-faint">
                    Para pensar
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    ¿Qué frase te costó más identificar? ¿La habías escuchado
                    antes en una serie, en un chat o en una canción?
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-plum-mist/60 p-4">
                <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
                <p className="text-sm leading-relaxed text-ink-soft">
                  Si alguna publicación te hizo pensar en una situación propia o
                  de alguien cercano, no tienes que resolverlo sola. Una persona
                  adulta de confianza o una institución especializada puede
                  ayudarte a mirar con más claridad.
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/juego-2"
                  className={buttonVariants({
                    variant: "coral",
                    size: "lg",
                    className: "flex-1",
                  })}
                >
                  Ir al juego 2
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/hub"
                  className={buttonVariants({ variant: "secondary", size: "lg" })}
                >
                  Volver al hub
                </Link>
                <Button variant="ghost" size="lg" onClick={handleReplay}>
                  <RotateCcw className="h-4 w-4" />
                  Repetir
                </Button>
              </div>
            </div>
          </Card>
        </section>
      ) : (
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section>
            <div className="mx-auto mb-3 flex max-w-lg items-center justify-between gap-3 text-xs font-semibold text-ink-soft">
              <span className="inline-flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-gold-deep" />
                Tarjeta {answeredCount + 1} de {GAME1_TOTAL}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/70 px-2.5 py-1">
                <Trophy className="h-3.5 w-3.5 text-gold-deep" />
                {score} aciertos
              </span>
            </div>

            <div className="relative mx-auto max-w-lg pb-2 pt-3">
              <div
                aria-hidden
                className="absolute inset-x-5 top-7 h-full rounded-[2rem] border border-line/70 bg-white/50 shadow-sm"
              />
              <div
                aria-hidden
                className="absolute inset-x-9 top-10 h-full rounded-[2rem] border border-line/50 bg-white/35"
              />
              {currentCard ? (
                <SwipeCard
                  key={currentCard.id}
                  card={currentCard}
                  onSwipe={handleDecision}
                  disabled={Boolean(feedback || exiting)}
                  exiting={exiting}
                />
              ) : (
                <Card className="grid min-h-80 place-items-center p-8 text-center">
                  <div>
                    <Sparkles className="mx-auto h-8 w-8 text-gold" />
                    <p className="mt-3 font-display text-xl font-semibold text-ink">
                      No quedan tarjetas
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                      Revisa tu resultado o vuelve a intentarlo.
                    </p>
                  </div>
                </Card>
              )}
            </div>

            <div className="mx-auto mt-5 grid max-w-lg grid-cols-2 gap-3">
              <Button
                variant="danger"
                size="lg"
                onClick={() => handleDecision("question")}
                disabled={!currentCard || Boolean(feedback || exiting)}
                aria-label="Cuestionar esta publicación"
              >
                <ShieldAlert className="h-4 w-4" />
                Cuestionar
              </Button>
              <Button
                variant="teal"
                size="lg"
                onClick={() => handleDecision("share")}
                disabled={!currentCard || Boolean(feedback || exiting)}
                aria-label="Compartir esta publicación"
              >
                <HeartHandshake className="h-4 w-4" />
                Compartir
              </Button>
            </div>
            <p className="mx-auto mt-3 max-w-lg text-center text-[0.7rem] font-medium text-ink-faint">
              Arrastra la tarjeta o usa los botones. También puedes presionar ← y →.
            </p>
          </section>

          <aside className="space-y-4">
            <Card className="p-5">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-plum-mist text-plum">
                  <BookOpen className="h-4 w-4" />
                </span>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Cómo se juega
                </h2>
              </div>
              <ol className="mt-4 space-y-3">
                {[
                  "Lee la publicación completa, no solo el emoji.",
                  "Pregúntate qué idea se está normalizando.",
                  "Desliza a la derecha para compartir o a la izquierda para cuestionar.",
                  "Revisa la explicación y sigue con la próxima.",
                ].map((step, index) => (
                  <li key={step} className="flex gap-3 text-sm leading-relaxed text-ink-soft">
                    <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-sand text-[0.68rem] font-bold text-plum">
                      {index + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </Card>

            <Card className="p-5">
              <h2 className="font-display text-lg font-semibold text-ink">
                Dos direcciones
              </h2>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-coral/15 bg-coral-soft/50 p-3.5">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-coral-deep">
                    <ShieldAlert className="h-3.5 w-3.5" />
                    Cuestionar
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                    El mensaje normaliza celos, aislamiento, secretos, control o
                    desigualdad de poder.
                  </p>
                </div>
                <div className="rounded-2xl border border-teal/15 bg-teal-soft/50 p-3.5">
                  <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-teal-deep">
                    <HeartHandshake className="h-3.5 w-3.5" />
                    Compartir
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
                    El mensaje reconoce límites, respeto, autonomía, apoyo real o
                    una red de cuidado.
                  </p>
                </div>
              </div>
            </Card>

            <div className="flex items-start gap-2.5 rounded-3xl border border-gold/20 bg-gold-soft/60 p-4">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
              <p className="text-xs leading-relaxed text-ink-soft">
                No estás compartiendo la publicación de verdad: estás eligiendo
                qué idea amplificarías. El objetivo no es juzgar a quien la
                escribió, sino reconocer el mensaje.
              </p>
            </div>
          </aside>
        </div>
      )}

      <FeedbackOverlay
        open={Boolean(feedback)}
        card={feedback?.card ?? null}
        choice={feedback?.choice ?? null}
        correct={feedback?.correct ?? false}
        isLast={answeredIds.length >= GAME1_TOTAL}
        onClose={() => setFeedback(null)}
      />
    </PageShell>
  );
}
