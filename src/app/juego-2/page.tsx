"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Flag,
  Info,
  MessageCircleQuestion,
  MessagesSquare,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChatContainer } from "@/components/game2/chat-container";
import { RedFlagPanel } from "@/components/game2/red-flag-panel";
import { GamePageHeader } from "@/components/shared/game-page-header";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { PageShell } from "@/components/shared/page-shell";
import { ProgressRing } from "@/components/shared/progress-ring";
import { UserGate } from "@/components/shared/user-gate";
import { GAME2_TOTAL_FLAGS, game2Chat } from "@/data/game2-chats";
import { playSoftClick } from "@/lib/sound";
import { useUserProgress } from "@/lib/use-user-progress";
import type { ChatMessage, RedFlag } from "@/lib/types";

export default function Game2Page() {
  const { progress, isReady, updateGame2, resetGame } = useUserProgress();

  const [hydrated, setHydrated] = useState(false);
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hintOpen, setHintOpen] = useState(false);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (!isReady || hydrated) return;
    setFlaggedIds(progress.game2.flaggedIds ?? []);
    setFinished(progress.game2.completed);
    setHydrated(true);
  }, [isReady, hydrated, progress.game2.flaggedIds, progress.game2.completed]);

  const identified = game2Chat.messages.filter(
    (message) => message.redFlag && flaggedIds.includes(message.id),
  ).length;

  const selectedMessage =
    game2Chat.messages.find((message) => message.id === selectedId) ?? null;

  const missedFlags = game2Chat.messages.filter(
    (message): message is ChatMessage & { redFlag: RedFlag } =>
      Boolean(message.redFlag) && !flaggedIds.includes(message.id),
  );

  function handleSelect(message: ChatMessage) {
    setSelectedId(message.id);

    if (message.redFlag && !flaggedIds.includes(message.id)) {
      const nextIds = [...flaggedIds, message.id];
      setFlaggedIds(nextIds);
      updateGame2({
        flaggedIds: nextIds,
        flagsIdentified: nextIds.length,
        score: nextIds.length,
        completed: false,
      });
      playSoftClick();
    }
  }

  function handleFinish() {
    updateGame2({
      completed: true,
      flagsIdentified: identified,
      score: identified,
      flaggedIds,
    });
    setSelectedId(null);
    setFinished(true);
  }

  function handleReplay() {
    resetGame("game2");
    setFlaggedIds([]);
    setSelectedId(null);
    setHintOpen(false);
    setFinished(false);
  }

  if (!isReady || !hydrated) {
    return (
      <PageShell>
        <LoadingScreen label="Abriendo la conversación..." />
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
        icon={MessagesSquare}
        eyebrow="Juego 02 · Chat"
        title="Entre líneas"
        description="Esta conversación parece normal, pero esconde señales de control, manipulación y presión. Toca los mensajes que te hagan ruido y descubre qué hay detrás de cada frase."
        tone="teal"
      >
        <div className="flex items-center gap-4 rounded-3xl border border-line bg-white/80 p-4 shadow-sm">
          <ProgressRing
            value={identified}
            max={GAME2_TOTAL_FLAGS}
            size={68}
            stroke={7}
            strokeClassName="stroke-teal"
          >
            <span className="font-display text-lg font-semibold text-ink">
              {identified}
            </span>
          </ProgressRing>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
              Banderas
            </p>
            <p className="text-sm font-bold text-ink">
              {identified} / {GAME2_TOTAL_FLAGS}
            </p>
            <p className="mt-0.5 text-xs font-medium text-ink-soft">
              {missedFlags.length} por descubrir
            </p>
          </div>
        </div>
      </GamePageHeader>

      {finished ? (
        <section className="mx-auto mt-8 max-w-4xl">
          <Card className="overflow-hidden">
            <div className="relative overflow-hidden bg-teal-deep px-7 py-8 text-white sm:px-10 sm:py-10">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-gold/20 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
              />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2 text-gold-soft">
                    <Trophy className="h-5 w-5" />
                    <span className="text-xs font-bold uppercase tracking-[0.16em]">
                      Revisión terminada
                    </span>
                  </div>
                  <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight sm:text-4xl">
                    {identified === GAME2_TOTAL_FLAGS
                      ? "Viste todas las señales."
                      : identified >= 4
                        ? "Ya reconoces varias señales."
                        : "Empezaste a leer entre líneas."}
                  </h2>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                    {identified === GAME2_TOTAL_FLAGS
                      ? "Identificaste las siete banderas rojas. Eso no significa desconfiar de todo: significa que sabes distinguir el cuidado del control."
                      : "Las señales de manipulación suelen estar mezcladas con afecto y palabras amables. Lo importante no es acertar todas, sino aprender a nombrarlas y saber qué hacer."}
                  </p>
                </div>
                <ProgressRing
                  value={identified}
                  max={GAME2_TOTAL_FLAGS}
                  size={116}
                  stroke={9}
                  strokeClassName="stroke-gold"
                  className="shrink-0"
                >
                  <span className="text-center">
                    <span className="block font-display text-3xl font-semibold leading-none text-white">
                      {identified}
                    </span>
                    <span className="text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white/60">
                      de {GAME2_TOTAL_FLAGS}
                    </span>
                  </span>
                </ProgressRing>
              </div>
            </div>

            <div className="px-7 py-7 sm:px-10 sm:py-8">
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl bg-teal-soft/50 p-4 text-center">
                  <p className="font-display text-2xl font-semibold text-teal-deep">
                    {identified}
                  </p>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-teal-deep/70">
                    Identificadas
                  </p>
                </div>
                <div className="rounded-2xl bg-coral-soft/50 p-4 text-center">
                  <p className="font-display text-2xl font-semibold text-coral-deep">
                    {missedFlags.length}
                  </p>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-coral-deep/70">
                    Pasadas por alto
                  </p>
                </div>
                <div className="rounded-2xl bg-gold-soft/60 p-4 text-center">
                  <p className="font-display text-2xl font-semibold text-gold-deep">
                    {GAME2_TOTAL_FLAGS}
                  </p>
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-gold-deep/70">
                    Señales en el chat
                  </p>
                </div>
              </div>

              {missedFlags.length > 0 ? (
                <div className="mt-6">
                  <div className="flex items-center gap-2">
                    <Flag className="h-4 w-4 fill-current text-coral" />
                    <h3 className="font-display text-xl font-semibold text-ink">
                      Las señales que quedaron
                    </h3>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    No es una lista para sentirte mal, sino para reconocerlas la
                    próxima vez. Léelas con calma.
                  </p>

                  <div className="mt-4 space-y-3">
                    {missedFlags.map((message) => {
                      const redFlag = message.redFlag;
                      return (
                        <div
                          key={message.id}
                          className="rounded-2xl border border-line/80 bg-sand/40 p-4"
                        >
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge
                              variant={
                                redFlag.severity === "alta" ? "coral" : "gold"
                              }
                            >
                              Señal {redFlag.severity}
                            </Badge>
                            <Badge variant="outline">{redFlag.category}</Badge>
                            <span className="text-[0.65rem] font-semibold text-ink-faint">
                              {message.time}
                            </span>
                          </div>
                          <p className="mt-2.5 text-sm italic leading-relaxed text-ink-soft">
                            “{message.text}”
                          </p>
                          <p className="mt-2 text-sm leading-relaxed text-ink">
                            {redFlag.explanation}
                          </p>
                          <p className="mt-2 rounded-xl bg-white/70 px-3 py-2 text-xs leading-relaxed text-ink-soft">
                            <strong className="font-semibold text-teal-deep">
                              Qué hacer:
                            </strong>{" "}
                            {redFlag.advice}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-3xl border border-teal/20 bg-teal-soft/40 p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-teal-deep" />
                    <div>
                      <p className="font-display text-lg font-semibold text-ink">
                        Encontraste las siete banderas
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        Control sutil, infantilización, vigilancia, aislamiento,
                        chantaje emocional, secretos y presión sexual. Reconocerlas
                        te ayuda a nombrar lo que antes parecía “normal”.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-6 flex items-start gap-2.5 rounded-2xl bg-plum-mist/60 p-4">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
                <p className="text-sm leading-relaxed text-ink-soft">
                  <strong className="font-semibold text-ink">Para pensar:</strong>{" "}
                  ¿cuál de estas frases te costó más identificar? ¿Qué harías si
                  alguien te hablara así? ¿A quién podrías acudir?
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                <Link
                  href="/juego-3"
                  className={buttonVariants({
                    variant: "teal",
                    size: "lg",
                    className: "flex-1",
                  })}
                >
                  Ir al juego 3
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
                  Revisar de nuevo
                </Button>
              </div>
            </div>
          </Card>
        </section>
      ) : (
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <section className="space-y-4">
            <div className="flex items-start gap-3 rounded-3xl border border-teal/15 bg-teal-soft/40 p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/80 text-teal-deep">
                <Info className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-deep">
                  Contexto
                </p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                  {game2Chat.context}
                </p>
              </div>
            </div>

            <ChatContainer
              chat={game2Chat}
              flaggedIds={flaggedIds}
              selectedId={selectedId}
              onSelect={handleSelect}
            />

            <div className="flex items-start gap-2.5 rounded-2xl bg-sand/60 p-4">
              <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
              <p className="text-xs leading-relaxed text-ink-soft">
                Esta conversación es ficticia. No todas las señales son obvias y
                no es un examen sobre tu relación. El objetivo es practicar la
                mirada y conocer alternativas de cuidado.
              </p>
            </div>
          </section>

          <RedFlagPanel
            selectedMessage={selectedMessage}
            flagged={Boolean(selectedId && flaggedIds.includes(selectedId))}
            flaggedCount={identified}
            hintOpen={hintOpen}
            onToggleHint={() => setHintOpen((value) => !value)}
            onClearSelection={() => setSelectedId(null)}
            onFinish={handleFinish}
          />
        </div>
      )}
    </PageShell>
  );
}
