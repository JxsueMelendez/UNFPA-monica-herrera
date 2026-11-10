"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Flag,
  Lightbulb,
  MessageCircleQuestion,
  ShieldCheck,
  ShieldQuestion,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { GAME2_TOTAL_FLAGS, RED_FLAG_HINT_CATEGORIES } from "@/data/game2-chats";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

interface RedFlagPanelProps {
  selectedMessage: ChatMessage | null;
  flagged: boolean;
  flaggedCount: number;
  hintOpen: boolean;
  onToggleHint: () => void;
  onClearSelection: () => void;
  onFinish: () => void;
}

export function RedFlagPanel({
  selectedMessage,
  flagged,
  flaggedCount,
  hintOpen,
  onToggleHint,
  onClearSelection,
  onFinish,
}: RedFlagPanelProps) {
  const missed = Math.max(0, GAME2_TOTAL_FLAGS - flaggedCount);

  if (selectedMessage) {
    const redFlag = selectedMessage.redFlag;

    return (
      <Card className="overflow-hidden lg:sticky lg:top-24">
        <motion.div
          key={selectedMessage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div
            className={cn(
              "px-5 pb-4 pt-5",
              redFlag ? "bg-gold-soft/70" : "bg-teal-soft/60",
            )}
          >
            <div className="flex items-start gap-3">
              <span
                className={cn(
                  "grid h-11 w-11 shrink-0 place-items-center rounded-2xl",
                  redFlag ? "bg-gold text-plum-deep" : "bg-teal text-white",
                )}
              >
                {redFlag ? (
                  <Flag className="h-5 w-5 fill-current" />
                ) : (
                  <ShieldCheck className="h-5 w-5" />
                )}
              </span>
              <div className="min-w-0">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink-faint">
                  {redFlag ? "Análisis del mensaje" : "Lectura del mensaje"}
                </p>
                <h2 className="mt-1 font-display text-xl font-semibold leading-tight text-ink">
                  {redFlag ? "Esto sí es una bandera roja" : "Esto no es una bandera roja"}
                </h2>
                {redFlag ? (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Badge variant={redFlag.severity === "alta" ? "coral" : "gold"}>
                      Señal {redFlag.severity}
                    </Badge>
                    <Badge variant="outline">{redFlag.category}</Badge>
                  </div>
                ) : (
                  <p className="mt-1 text-xs font-medium text-teal-deep">
                    Un mensaje neutro o de cuidado también puede analizarse.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-5">
            <blockquote className="rounded-2xl border-l-4 border-plum/20 bg-sand/60 px-3.5 py-3 text-sm italic leading-relaxed text-ink-soft">
              “{selectedMessage.text}”
            </blockquote>

            {redFlag ? (
              <>
                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-faint">
                    Por qué importa
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                    {redFlag.explanation}
                  </p>
                </div>
                <div className="mt-4 rounded-2xl border border-teal/15 bg-teal-soft/50 p-4">
                  <div className="flex items-start gap-2.5">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-teal-deep" />
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.12em] text-teal-deep">
                        Qué puedes hacer
                      </p>
                      <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                        {redFlag.advice}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="mt-4 rounded-2xl bg-teal-soft/40 p-4">
                <p className="text-sm leading-relaxed text-ink-soft">
                  {selectedMessage.neutralNote ??
                    "Este mensaje no contiene una señal de alerta por sí solo. El contexto y la repetición son importantes para interpretarlo."}
                </p>
              </div>
            )}

            <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-plum-mist/50 p-3.5">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
              <p className="text-xs leading-relaxed text-ink-soft">
                {flagged
                  ? "Ya marcaste este mensaje. Puedes seguir revisando los demás."
                  : "Toca los mensajes que te hagan ruido. No hay penalización por explorar."}
              </p>
            </div>

            <Button
              variant="secondary"
              onClick={onClearSelection}
              className="mt-4 w-full"
            >
              Seguir revisando
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              onClick={onFinish}
              className="mt-2 w-full text-ink-soft"
            >
              <CheckCircle2 className="h-4 w-4" />
              Terminar revisión
            </Button>
          </div>
        </motion.div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden lg:sticky lg:top-24">
      <div className="bg-plum-deep px-5 pb-5 pt-5 text-cream">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-gold">
            <Flag className="h-4 w-4 fill-current" />
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.14em]">
              Tu misión
            </span>
          </div>
          <Badge variant="gold">{flaggedCount}/{GAME2_TOTAL_FLAGS}</Badge>
        </div>
        <h2 className="mt-3 font-display text-2xl font-semibold leading-tight">
          Encuentra lo que se esconde entre líneas.
        </h2>
        <p className="mt-2 text-xs leading-relaxed text-cream/70">
          Toca los mensajes que contengan manipulación, control, chantaje,
          secretos o presión. Los mensajes neutros también se pueden analizar.
        </p>
        <div className="mt-4">
          <div className="flex items-center justify-between text-[0.65rem] font-semibold text-cream/65">
            <span>Banderas encontradas</span>
            <span>{flaggedCount} de {GAME2_TOTAL_FLAGS}</span>
          </div>
          <Progress
            value={flaggedCount}
            max={GAME2_TOTAL_FLAGS}
            className="mt-1.5 h-1.5 bg-white/15"
            indicatorClassName="bg-gradient-to-r from-gold to-coral"
          />
        </div>
      </div>

      <div className="p-5">
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl bg-teal-soft/50 p-3 text-center">
            <p className="font-display text-2xl font-semibold text-teal-deep">
              {flaggedCount}
            </p>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-teal-deep/70">
              Identificadas
            </p>
          </div>
          <div className="rounded-2xl bg-coral-soft/50 p-3 text-center">
            <p className="font-display text-2xl font-semibold text-coral-deep">
              {missed}
            </p>
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.1em] text-coral-deep/70">
              Por descubrir
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-sand/70 p-3.5">
          <MessageCircleQuestion className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
          <p className="text-xs leading-relaxed text-ink-soft">
            No todas las frases son una señal. El cuidado real respeta tu
            autonomía; el control suele venir con culpa, secreto o miedo.
          </p>
        </div>

        <button
          type="button"
          onClick={onToggleHint}
          className="mt-4 inline-flex w-full items-center justify-center gap-1.5 rounded-full border border-line bg-white/70 px-3 py-2 text-xs font-semibold text-plum transition hover:border-plum/20 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40"
        >
          <ShieldQuestion className="h-3.5 w-3.5" />
          {hintOpen ? "Ocultar pistas" : "Ver pistas de categorías"}
        </button>

        {hintOpen ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-3 overflow-hidden"
          >
            <div className="flex flex-wrap gap-1.5 rounded-2xl bg-gold-soft/40 p-3">
              {RED_FLAG_HINT_CATEGORIES.map((category) => (
                <Badge key={category} variant="outline" className="bg-white/70">
                  {category}
                </Badge>
              ))}
            </div>
          </motion.div>
        ) : null}

        <Button variant="coral" onClick={onFinish} className="mt-5 w-full">
          <CheckCircle2 className="h-4 w-4" />
          Terminar revisión
        </Button>
        <p className="mt-2 text-center text-[0.65rem] text-ink-faint">
          Puedes terminar cuando quieras. Luego verás las señales que quedaron.
        </p>
      </div>
    </Card>
  );
}
