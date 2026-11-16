"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Compass,
  HeartHandshake,
  LifeBuoy,
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
import { KnotGirl } from "@/components/game3/knot-girl";
import { StoryScene } from "@/components/game3/story-scene";
import { GamePageHeader } from "@/components/shared/game-page-header";
import { LoadingScreen } from "@/components/shared/loading-screen";
import { PageShell } from "@/components/shared/page-shell";
import { ProgressRing } from "@/components/shared/progress-ring";
import { UserGate } from "@/components/shared/user-gate";
import {
  INITIAL_STATS,
  START_NODE_ID,
  getStoryNode,
  storyNodes,
} from "@/data/game3-story";
import { playAlert, playError, playSoftClick, playSuccess } from "@/lib/sound";
import { useUserProgress } from "@/lib/use-user-progress";
import { cn, scrollToTop } from "@/lib/utils";
import type { StoryChoice, StoryEnding, StoryStats } from "@/lib/types";

const CHAPTERS = [1, 2, 3, 4, 5];

function clampKnots(n: number) {
  return Math.max(0, Math.min(5, n));
}

function knotsDelta(tone: StoryChoice["tone"]) {
  if (tone === "healthy") return -1;
  if (tone === "risky") return 1;
  return 0;
}

const endingStyles = {
  empowering: { header: "bg-teal-deep", badge: "gold" as const, label: "Final libre", icon: Sparkles },
  hopeful: { header: "bg-plum-deep", badge: "gold" as const, label: "Final en camino", icon: HeartHandshake },
  cautionary: { header: "bg-coral-deep", badge: "gold" as const, label: "Final de cuidado", icon: LifeBuoy },
};

export default function Game3Page() {
  const { progress, isReady, updateGame3, resetGame } = useUserProgress();

  const [hydrated, setHydrated] = useState(false);
  const [nodeId, setNodeId] = useState(START_NODE_ID);
  const [stats, setStats] = useState<StoryStats>(INITIAL_STATS);
  const [decisions, setDecisions] = useState<string[]>([]);
  const [knots, setKnots] = useState(3);
  const [banner, setBanner] = useState<{ impact?: string } | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const [resetOpen, setResetOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(true);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isReady || hydrated) return;
    const savedNode = progress.game3.currentNodeId ? storyNodes[progress.game3.currentNodeId] : undefined;
    const endingNode = Object.values(storyNodes).find((node) => node.ending?.id === progress.game3.endingId);
    const resolvedNode = savedNode ?? (progress.game3.completed ? endingNode : undefined) ?? storyNodes[START_NODE_ID]!;
    setNodeId(resolvedNode.id);
    setStats(progress.game3.stats ?? INITIAL_STATS);
    setDecisions(progress.game3.decisionsHistory);
    // derive knots roughly from decisions not stored; start mid
    setKnots(progress.game3.completed ? (progress.game3.endingId === "libre" ? 1 : progress.game3.endingId === "camino" ? 2 : 4) : 3);
    setHydrated(true);
  }, [hydrated, isReady, progress.game3.completed, progress.game3.currentNodeId, progress.game3.decisionsHistory, progress.game3.endingId, progress.game3.stats]);

  useEffect(() => () => { if (timeoutRef.current) window.clearTimeout(timeoutRef.current); }, []);

  const node = getStoryNode(nodeId);
  const ending = node.ending;

  function handleChoose(choice: StoryChoice) {
    if (transitioning) return;

    const nextNode = storyNodes[choice.next] ?? getStoryNode(START_NODE_ID);
    const delta = knotsDelta(choice.tone);
    const nextKnots = clampKnots(knots + delta);
    const nextDecisions = [...decisions, choice.label];
    const isEnding = Boolean(nextNode.isEnding);

    setKnots(nextKnots);
    setDecisions(nextDecisions);
    setTransitioning(true);
    updateGame3({
      currentNodeId: nextNode.id,
      currentChapter: nextNode.chapter,
      decisionsHistory: nextDecisions,
      stats,
      completed: isEnding,
      endingId: isEnding ? nextNode.ending?.id : undefined,
    });

    if (delta < 0) playSuccess();
    else if (delta > 0) playAlert();
    else playSoftClick();

    if (choice.consequence) {
      setBanner({ impact: choice.impact });
      timeoutRef.current = window.setTimeout(() => {
        setNodeId(nextNode.id);
        setBanner(null);
        setTransitioning(false);
        scrollToTop();
        if (isEnding) playSoftClick();
      }, 1800);
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
    setKnots(3);
    setBanner(null);
    setTransitioning(false);
    setResetOpen(false);
    setIntroOpen(true);
    scrollToTop();
  }

  if (!isReady || !hydrated) {
    return <PageShell><LoadingScreen label="Cargando situaciones..." /></PageShell>;
  }
  if (!progress.userName) {
    return <PageShell><UserGate /></PageShell>;
  }

  return (
    <PageShell wide>
      <GamePageHeader
        icon={Route}
        eyebrow="Juego 03 · Situaciones"
        title="Desenreda la situación"
        description="Vas a leer situaciones reales que le pasan a mucha gente. Elige qué harías: si te cuidas, los nudos se aflojan; si te enredas, se aprietan."
        tone="gold"
      >
        <div className="flex items-center gap-4 rounded-3xl border border-line bg-white/80 p-4 shadow-sm">
          <ProgressRing value={Math.min(node.chapter, 5)} max={5} size={68} stroke={7} strokeClassName="stroke-gold">
            <span className="font-display text-lg font-semibold text-ink">{Math.min(node.chapter, 5)}</span>
          </ProgressRing>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink-faint">Situación</p>
            <p className="text-sm font-bold text-ink">{Math.min(node.chapter, 5)} de 5</p>
            <p className="mt-0.5 text-xs font-medium text-ink-soft">Nudos: {knots}/5</p>
          </div>
        </div>
      </GamePageHeader>

      {ending ? (
        <EndingView ending={ending} knots={knots} decisions={decisions} onReplay={handleReplay} />
      ) : (
        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="space-y-4">
            <div className="flex flex-col gap-3 rounded-2xl border border-line/80 bg-white/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-ink-soft">
                <Compass className="h-4 w-4 text-gold-deep" />
                Situación {node.chapter} de 5
              </div>
              <div className="flex flex-1 items-center gap-1.5 sm:max-w-xs">
                {CHAPTERS.map((chapter) => (
                  <span key={chapter} className={cn("h-1.5 flex-1 rounded-full transition-colors", chapter <= node.chapter ? "bg-gold" : "bg-sand")} />
                ))}
              </div>
            </div>

            <StoryScene node={node} disabled={transitioning} onChoose={handleChoose} />
          </section>

          <aside className="space-y-4 lg:sticky lg:top-24">
            <KnotGirl knots={knots} />
            <Card className="p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="font-display text-lg font-semibold text-ink">Tus decisiones</h2>
                <Badge variant="outline">{decisions.length}</Badge>
              </div>
              {decisions.length === 0 ? (
                <p className="mt-2 text-xs leading-relaxed text-ink-soft">Lo que elijas se va a ir guardando aquí.</p>
              ) : (
                <ol className="mt-3 max-h-48 space-y-2.5 overflow-y-auto pr-1">
                  {[...decisions].reverse().map((decision, index) => (
                    <li key={`${decision}-${index}`} className="flex gap-2 text-[0.75rem] font-medium leading-relaxed text-ink-soft">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sand text-[0.6rem] font-bold text-plum">{decisions.length - index}</span>
                      {decision}
                    </li>
                  ))}
                </ol>
              )}
              <Button variant="outline" onClick={() => setResetOpen(true)} className="mt-4 w-full">
                <RotateCcw className="h-4 w-4" />
                Empezar de nuevo
              </Button>
            </Card>
          </aside>
        </div>
      )}

      <ConsequenceBanner visible={Boolean(banner)} impact={banner?.impact} />

      <Modal open={resetOpen} onClose={() => setResetOpen(false)} className="max-w-md" ariaLabel="Reiniciar">
        <div className="p-7">
          <h2 className="font-display text-2xl font-bold text-ink">¿Empezar de nuevo?</h2>
          <p className="mt-2 text-sm text-ink-soft">Se borran tus decisiones de este juego.</p>
          <div className="mt-5 flex gap-2 justify-end">
            <Button variant="secondary" onClick={() => setResetOpen(false)}>Cancelar</Button>
            <Button variant="coral" onClick={handleReplay}><RotateCcw className="h-4 w-4" />Sí</Button>
          </div>
        </div>
      </Modal>

      <Modal open={introOpen} onClose={() => { setIntroOpen(false); playSoftClick(); }} className="max-w-lg" ariaLabel="Cómo jugar Desenreda la situación">
        <div className="p-6 sm:p-7">
          <Badge variant="gold">Cómo jugar</Badge>
          <h2 className="mt-3 font-display text-3xl font-extrabold text-ink">Desenreda la situación</h2>
          <div className="mt-4 space-y-3 text-sm font-medium leading-relaxed text-ink-soft">
            <p><strong className="text-ink">1.</strong> Vas a leer situaciones que pasan en la vida real, en párrafos.</p>
            <p><strong className="text-ink">2.</strong> En cada una eliges qué harías tú.</p>
            <p><strong className="text-ink">3.</strong> Abajo verás a una chica con nudos: si te cuidas y pones límites, los nudos se aflojan; si te enredas, se aprietan.</p>
            <p><strong className="text-ink">4.</strong> No hay respuestas perfectas, solo formas de ir desenredando lo que sientes.</p>
          </div>
          <Button variant="coral" size="lg" className="mt-6 w-full" onClick={() => { setIntroOpen(false); playSoftClick(); }}>
            Empezar
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Modal>
    </PageShell>
  );
}

function EndingView({ ending, knots, decisions, onReplay }: { ending: StoryEnding; knots: number; decisions: string[]; onReplay: () => void }) {
  const style = endingStyles[ending.kind];
  const Icon = style.icon;
  return (
    <section className="mx-auto mt-8 max-w-4xl">
      <Card className="overflow-hidden">
        <div className={cn("relative overflow-hidden px-7 py-8 text-white sm:px-10 sm:py-10", style.header)}>
          <div className="relative">
            <Badge variant={style.badge}><Icon className="h-3 w-3" />{style.label}</Badge>
            <h2 className="mt-5 font-display text-4xl font-extrabold leading-tight sm:text-5xl">{ending.title}</h2>
            <p className="mt-3 max-w-2xl text-base font-medium text-white/80">{ending.subtitle}</p>
          </div>
        </div>
        <div className="px-7 py-7 sm:px-10 sm:py-9">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <div className="space-y-4">
                {ending.paragraphs.map((p) => <p key={p} className="text-base font-medium leading-[1.8] text-ink-soft">{p}</p>)}
              </div>
              <div className="mt-6 rounded-2xl border border-teal/15 bg-teal-soft/50 p-5">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-teal-deep" /><h3 className="font-display text-lg font-bold text-ink">Lo que te llevas</h3></div>
                <ul className="mt-3 space-y-2">
                  {ending.learnings.map((l) => <li key={l} className="flex gap-2 text-sm font-medium text-ink-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />{l}</li>)}
                </ul>
              </div>
              <div className="mt-4 rounded-2xl border border-gold/20 bg-gold-soft/60 p-5">
                <div className="flex items-center gap-2"><LifeBuoy className="h-4 w-4 text-gold-deep" /><h3 className="font-display text-lg font-bold text-ink">Si necesitas apoyo</h3></div>
                <ul className="mt-3 space-y-2">
                  {ending.support.map((s) => <li key={s} className="flex gap-2 text-sm font-medium text-ink-soft"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-deep" />{s}</li>)}
                </ul>
              </div>
            </div>
            <aside className="space-y-4">
              <KnotGirl knots={knots} />
              <div className="rounded-3xl border border-line/80 bg-white/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-faint">Tus decisiones ({decisions.length})</p>
                <ol className="mt-3 max-h-64 space-y-2.5 overflow-y-auto pr-1">
                  {decisions.map((d, i) => <li key={`${d}-${i}`} className="flex gap-2 text-[0.75rem] font-medium text-ink-soft"><span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-sand text-[0.6rem] font-bold text-plum">{i + 1}</span>{d}</li>)}
                </ol>
              </div>
            </aside>
          </div>
          <div className="mt-7 flex flex-col gap-2 border-t border-line/70 pt-6 sm:flex-row">
            <Button variant="coral" size="lg" onClick={onReplay} className="flex-1"><RotateCcw className="h-4 w-4" />Probar otro camino</Button>
            <Link href="/hub" className={buttonVariants({ variant: "secondary", size: "lg" })}>Volver al hub</Link>
          </div>
        </div>
      </Card>
    </section>
  );
}
