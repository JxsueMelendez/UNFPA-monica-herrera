"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  HeartHandshake,
  LifeBuoy,
  MapPin,
  RotateCcw,
  Route,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { ConsequenceBanner } from "@/components/game3/consequence-banner";
import { StoryScene } from "@/components/game3/story-scene";
import { GamePageHeader } from "@/components/shared/game-page-header";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { PageShell } from "@/components/shared/page-shell";
import { ProgressRing } from "@/components/shared/progress-ring";
import { StatBar } from "@/components/shared/stat-bar";
import { UserGate } from "@/components/shared/user-gate";
import {
  INITIAL_STATS,
  START_NODE_ID,
  STAT_META,
  getStoryNode,
  storyNodes,
} from "@/data/game3-story";
import { playConsequenceChime } from "@/lib/sound";
import { useUserProgress } from "@/lib/use-user-progress";
import { clamp, cn, scrollToTop } from "@/lib/utils";
import type { StoryChoice, StoryEnding, StoryStats } from "@/lib/types";

const STAT_KEYS = ["autonomy", "wellbeing", "goals", "support"] as const;
const CHAPTERS = [1, 2, 3, 4];

const endingStyles = {
  empowering: {
    header: "bg-teal-deep",
    badge: "gold" as const,
    label: "Final empoderador",
    icon: Sparkles,
  },
  hopeful: {
    header: "bg-plum-deep",
    badge: "gold" as const,
    label: "Final esperanzador",
    icon: HeartHandshake,
  },
  cautionary: {
    header: "bg-coral-deep",
    badge: "gold" as const,
    label: "Final de cuidado",
    icon: LifeBuoy,
  },
};

function applyEffects(stats: StoryStats, effects: Partial<StoryStats>): StoryStats {
  const next = { ...stats };
  for (const key of STAT_KEYS) {
    const delta = effects[key] ?? 0;
    next[key] = clamp(stats[key] + delta, 0, 10);
  }
  return next;
}

export default function Game3Page() {
  const { progress, isReady, updateGame3, resetGame } = useUserProgress();

  const [hydrated, setHydrated] = useState(false);
  const [nodeId, setNodeId] = useState(START_NODE_ID);
  const [stats, setStats] = useState<StoryStats>(INITIAL_STATS);
  const [decisions, setDecisions] = useState<string[]>([]);
  const [banner, setBanner] = useState<{ impact?: string } | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isReady || hydrated) return;

    const savedNode = progress.game3.currentNodeId
      ? storyNodes[progress.game3.currentNodeId]
      : undefined;
    const endingNode = Object.values(storyNodes).find(
      (node) => node.ending?.id === progress.game3.endingId,
    );
    const resolvedNode =
      savedNode ??
      (progress.game3.completed ? endingNode : undefined) ??
      storyNodes[START_NODE_ID]!;

    setNodeId(resolvedNode.id);
    setStats(progress.game3.stats ?? INITIAL_STATS);
    setDecisions(progress.game3.decisionsHistory);
    setHydrated(true);
  }, [
    hydrated,
    isReady,
    progress.game3.completed,
    progress.game3.currentNodeId,
    progress.game3.decisionsHistory,
    progress.game3.endingId,
    progress.game3.stats,
  ]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  const node = getStoryNode(nodeId);
  const ending = node.ending;

  function handleChoose(choice: StoryChoice) {
    if (transitioning) return;

    const nextNode = storyNodes[choice.next] ?? getStoryNode(START_NODE_ID);
    const nextStats = applyEffects(stats, choice.effects);
    const nextDecisions = [...decisions, choice.label];
    const isEnding = Boolean(nextNode.isEnding);

    setStats(nextStats);
    setDecisions(nextDecisions);
    setTransitioning(true);
    updateGame3({
      currentNodeId: nextNode.id,
      currentChapter: nextNode.chapter,
      decisionsHistory: nextDecisions,
      stats: nextStats,
      completed: isEnding,
      endingId: isEnding ? nextNode.ending?.id : undefined,
    });

    if (choice.consequence) {
      playConsequenceChime();
      setBanner({ impact: choice.impact });
      timeoutRef.current = window.setTimeout(() => {
        setNodeId(nextNode.id);
        setBanner(null);
        setTransitioning(false);
        scrollToTop();
      }, 2300);
      return;
    }

    setNodeId(nextNode.id);
    setTransitioning(false);
    window.setTimeout(() => scrollToTop(), 60);
  }

  function handleReplay() {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    resetGame("game3");
    setNodeId(START_NODE_ID);
    setStats(INITIAL_STATS);
    setDecisions([]);
    setBanner(null);
    setTransitioning(false);
    setResetOpen(false);
    scrollToTop();
  }

  if (!isReady || !hydrated) {
    return (
      <PageShell>
        <LoadingScreen label="Abriendo tu historia..." />
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
        icon={Route}
        eyebrow="Juego 03 · Historia"
        title="Tú decides el camino"
        description="Acompaña a Sofi en una historia sobre límites, autonomía y redes de apoyo. Cada decisión mueve tus recursos y abre —o cierra— caminos distintos. Hay cuatro finales posibles."
        tone="gold"
      >
        <div className="flex items-center gap-4 rounded-3xl border border-line bg-white/80 p-4 shadow-sm">
          <ProgressRing
            value={node.chapter}
            max={4}
            size={68}
            stroke={7}
            strokeClassName="stroke-gold"
          >
            <span className="font-display text-lg font-semibold text-ink">
              {node.chapter}
            </span>
          </ProgressRing>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
              Capítulo
            </p>
            <p className="text-sm font-bold text-ink">{node.chapter} de 4</p>
            <p className="mt-0.5 text-xs font-medium text-ink-soft">
              {decisions.length} {decisions.length === 1 ? "decisión" : "decisiones"}
            </p>
          </div>
        </div>
      </GamePageHeader>

      {ending ? (
        <EndingView
          ending={ending}
          stats={stats}
          decisions={decisions}
          location={node.location}
          onReplay={handleReplay}
        />
      ) : (
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-line/80 bg-white/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-ink-soft">
                <Compass className="h-4 w-4 text-gold-deep" />
                Capítulo {node.chapter} de 4
              </div>
              <div className="flex flex-1 items-center gap-1.5 sm:max-w-xs">
                {CHAPTERS.map((chapter) => (
                  <span
                    key={chapter}
                    className={cn(
                      "h-1.5 flex-1 rounded-full transition-colors",
                      chapter <= node.chapter ? "bg-gold" : "bg-sand",
                    )}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-ink-faint">
                {decisions.length} decisiones
              </span>
            </div>

            <StoryScene
              node={node}
              disabled={transitioning}
              onChoose={handleChoose}
            />
          </section>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <Card className="p-5">
              <div className="flex items-center gap-2">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-gold-soft text-gold-deep">
                  <Target className="h-4 w-4" />
                </span>
                <h2 className="font-display text-lg font-semibold text-ink">
                  Tus recursos
                </h2>
              </div>
              <p className="mt-2 text-[0.7rem] leading-relaxed text-ink-faint">
                No son una nota sobre ti. Son un mapa de cómo se mueven tu
                autonomía, tu bienestar, tus metas y tu red.
              </p>
              <div className="mt-4 space-y-3">
                {STAT_KEYS.map((key) => (
                  <StatBar
                    key={key}
                    label={STAT_META[key].label}
                    value={stats[key]}
                    colorClassName={STAT_META[key].color}
                    compact
                  />
                ))}
              </div>
            </Card>

            <Card className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-lg font-semibold text-ink">
                  Tus decisiones
                </h2>
                <Badge variant="outline">{decisions.length}</Badge>
              </div>
              {decisions.length === 0 ? (
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">
                  Todavía no has tomado ninguna decisión. Lo que elijas quedará
                  registrado aquí.
                </p>
              ) : (
                <ol className="mt-3 max-h-56 space-y-2.5 overflow-y-auto pr-1">
                  {[...decisions].reverse().map((decision, index) => (
                    <li
                      key={`${decision}-${index}`}
                      className="flex gap-2 text-[0.7rem] leading-relaxed text-ink-soft"
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sand text-[0.6rem] font-bold text-plum">
                        {decisions.length - index}
                      </span>
                      {decision}
                    </li>
                  ))}
                </ol>
              )}
            </Card>

            <Card className="p-5">
              <div className="flex items-start gap-2.5 rounded-2xl bg-plum-mist/60 p-3.5">
                <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
                <p className="text-[0.7rem] leading-relaxed text-ink-soft">
                  Esta historia es ficticia y no busca culparte. Si algo te
                  resuena, hablar con una persona de confianza o con una
                  institución especializada también es una forma de cuidarte.
                </p>
              </div>
              <Button
                variant="outline"
                onClick={() => setResetOpen(true)}
                className="mt-4 w-full"
              >
                <RotateCcw className="h-4 w-4" />
                Reiniciar historia
              </Button>
              <p className="mt-2 text-center text-[0.62rem] text-ink-faint">
                Tu avance se guarda automáticamente en este dispositivo.
              </p>
            </Card>
          </aside>
        </div>
      )}

      <ConsequenceBanner visible={Boolean(banner)} impact={banner?.impact} />

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        className="max-w-md"
        ariaLabel="Confirmar reinicio de la historia"
      >
        <div className="p-7 sm:p-8">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold-soft text-gold-deep">
            <RotateCcw className="h-6 w-6" />
          </span>
          <h2 className="mt-5 font-display text-2xl font-semibold text-ink">
            ¿Volver al capítulo 1?
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-ink-soft">
            Se borrarán las decisiones y los recursos de esta historia. Los otros
            juegos conservarán su progreso.
          </p>
          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={() => setResetOpen(false)}>
              Cancelar
            </Button>
            <Button variant="coral" onClick={handleReplay}>
              <RotateCcw className="h-4 w-4" />
              Sí, reiniciar
            </Button>
          </div>
        </div>
      </Modal>
    </PageShell>
  );
}

function EndingView({
  ending,
  stats,
  decisions,
  location,
  onReplay,
}: {
  ending: StoryEnding;
  stats: StoryStats;
  decisions: string[];
  location: string;
  onReplay: () => void;
}) {
  const style = endingStyles[ending.kind];
  const Icon = style.icon;

  return (
    <section className="mx-auto mt-8 max-w-4xl">
      <Card className="overflow-hidden">
        <div
          className={cn(
            "relative overflow-hidden px-7 py-8 text-white sm:px-10 sm:py-10",
            style.header,
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-gold/20 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-white/10 blur-3xl"
          />
          <div className="relative">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={style.badge}>
                <Trophy className="h-3 w-3" />
                {style.label}
              </Badge>
              <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-white/60">
                <MapPin className="h-3.5 w-3.5" />
                {location}
              </span>
            </div>
            <h2 className="mt-5 text-balance font-display text-4xl font-semibold leading-[1.02] tracking-[-0.03em] sm:text-5xl">
              {ending.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm font-medium text-white/75 sm:text-base">
              {ending.subtitle}
            </p>
          </div>
        </div>

        <div className="px-7 py-7 sm:px-10 sm:py-9">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <div className="space-y-4">
                {ending.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-pretty text-[0.98rem] leading-[1.8] text-ink-soft"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {ending.kind === "cautionary" ? (
                <div className="mt-5 flex items-start gap-3 rounded-2xl border border-coral/20 bg-coral-soft/50 p-4">
                  <LifeBuoy className="mt-0.5 h-5 w-5 shrink-0 text-coral-deep" />
                  <p className="text-sm leading-relaxed text-ink-soft">
                    <strong className="font-semibold text-ink">
                      No es tu culpa.
                    </strong>{" "}
                    Este final no es un castigo ni una sentencia. Quedarse, dudar
                    o volver también son parte de un proceso. La ayuda sigue
                    disponible cuando la necesites.
                  </p>
                </div>
              ) : null}

              <div className="mt-6 rounded-2xl border border-teal/15 bg-teal-soft/50 p-5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-teal-deep" />
                  <h3 className="font-display text-lg font-semibold text-ink">
                    Lo que te llevas
                  </h3>
                </div>
                <ul className="mt-3 space-y-2">
                  {ending.learnings.map((learning) => (
                    <li
                      key={learning}
                      className="flex gap-2 text-sm leading-relaxed text-ink-soft"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />
                      {learning}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 rounded-2xl border border-gold/20 bg-gold-soft/60 p-5">
                <div className="flex items-center gap-2">
                  <LifeBuoy className="h-4 w-4 text-gold-deep" />
                  <h3 className="font-display text-lg font-semibold text-ink">
                    Si necesitas ayuda
                  </h3>
                </div>
                <ul className="mt-3 space-y-2">
                  {ending.support.map((action) => (
                    <li
                      key={action}
                      className="flex gap-2 text-sm leading-relaxed text-ink-soft"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <aside className="space-y-4">
              <div className="rounded-3xl border border-line/80 bg-sand/45 p-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-gold-deep" />
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-faint">
                    Tus recursos al final
                  </p>
                </div>
                <div className="mt-4 space-y-3">
                  {STAT_KEYS.map((key) => (
                    <StatBar
                      key={key}
                      label={STAT_META[key].label}
                      value={stats[key]}
                      colorClassName={STAT_META[key].color}
                      compact
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-line/80 bg-white/70 p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-faint">
                    Tus decisiones
                  </p>
                  <Badge variant="outline">{decisions.length}</Badge>
                </div>
                <ol className="mt-3 max-h-64 space-y-2.5 overflow-y-auto pr-1">
                  {decisions.map((decision, index) => (
                    <li
                      key={`${decision}-${index}`}
                      className="flex gap-2 text-[0.7rem] leading-relaxed text-ink-soft"
                    >
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sand text-[0.6rem] font-bold text-plum">
                        {index + 1}
                      </span>
                      {decision}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-3xl border border-plum/10 bg-plum-mist/60 p-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-plum" />
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-plum">
                    Otros caminos
                  </p>
                </div>
                <p className="mt-2 text-[0.7rem] leading-relaxed text-ink-soft">
                  Hay cuatro finales posibles. Puedes volver a jugar y explorar
                  otras decisiones sin perder lo que aprendiste.
                </p>
              </div>
            </aside>
          </div>

          <div className="mt-7 flex flex-col gap-2 border-t border-line/70 pt-6 sm:flex-row">
            <Button variant="coral" size="lg" onClick={onReplay} className="flex-1">
              <RotateCcw className="h-4 w-4" />
              Explorar otro final
            </Button>
            <Link
              href="/hub"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Volver al hub
            </Link>
            <Link
              href="/juego-1"
              className={buttonVariants({ variant: "ghost", size: "lg" })}
            >
              Repasar el juego 1
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Card>
    </section>
  );
}
