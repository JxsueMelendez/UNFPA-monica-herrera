"use client";

import {
  ArrowRight,
  CheckCircle2,
  Eye,
  HeartHandshake,
  Lightbulb,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";
import type { Game1Card, SwipeChoice } from "@/lib/types";

interface FeedbackOverlayProps {
  open: boolean;
  card: Game1Card | null;
  choice: SwipeChoice | null;
  correct: boolean;
  isLast: boolean;
  onClose: () => void;
}

export function FeedbackOverlay({
  open,
  card,
  choice,
  correct,
  isLast,
  onClose,
}: FeedbackOverlayProps) {
  if (!card) return null;

  const expected = card.healthy ? "Compartir" : "Cuestionar";

  return (
    <Modal
      open={open}
      onClose={onClose}
      align="bottom"
      showClose={false}
      className="max-w-2xl"
      ariaLabel="Retroalimentación de la tarjeta"
    >
      <div className="max-h-[88vh] overflow-y-auto">
        <div className="flex justify-center pt-3 sm:pt-4" aria-hidden>
          <span className="h-1.5 w-12 rounded-full bg-ink/10" />
        </div>
        <div
          className={cn(
            "relative mt-2 overflow-hidden px-6 pb-6 pt-6 sm:px-8",
            correct ? "bg-teal-soft/70" : "bg-coral-soft/70",
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/50 blur-2xl"
          />
          <div className="relative flex items-start gap-3.5">
            <span
              className={cn(
                "grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-white",
                correct ? "bg-teal" : "bg-coral",
              )}
            >
              {correct ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <ShieldAlert className="h-6 w-6" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={correct ? "teal" : "coral"}>
                  {correct ? "Buena lectura" : "Ojo, red flag"}
                </Badge>
                <Badge variant="outline" className="bg-white/70">{card.feedback.category}</Badge>
              </div>
              <h2 className="mt-2.5 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                {card.feedback.title}
              </h2>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink-soft">
                Tu elección:{" "}
                <strong className="font-semibold text-ink">
                  {choice === "share" ? "Compartir" : "Cuestionar"}
                </strong>{" "}
                · Esperada:{" "}
                <strong className="font-semibold text-ink">{expected}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3 px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex items-start gap-3 rounded-2xl border border-line/70 bg-white/70 p-4">
            <Eye className="mt-0.5 h-5 w-5 shrink-0 text-plum" />
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-faint">
                Lo que hay detrás
              </p>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-ink-soft">
                {card.feedback.explanation}
              </p>
            </div>
          </div>

          <div className={cn(
            "rounded-2xl border p-4",
            correct ? "border-teal/15 bg-teal-soft/50" : "border-coral/20 bg-coral-soft/50",
          )}>
            <div className="flex items-start gap-2.5">
              <HeartHandshake className={cn("mt-0.5 h-4 w-4 shrink-0", correct ? "text-teal-deep" : "text-coral-deep")} />
              <div>
                <p className={cn("text-xs font-extrabold uppercase tracking-[0.12em]", correct ? "text-teal-deep" : "text-coral-deep")}>
                  Para llevarte
                </p>
                <p className="mt-1 text-sm font-semibold leading-relaxed text-ink">
                  {card.feedback.takeaway}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2.5 rounded-2xl bg-sand/70 p-4">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-coral-deep" />
            <p className="text-sm font-medium leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">Para pensar:</strong>{" "}
              {card.feedback.reflection}
            </p>
          </div>

          {!correct ? (
            <div className="flex items-start gap-2.5 rounded-2xl border border-coral/20 bg-coral-soft/40 p-4">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-coral-deep" />
              <p className="text-sm font-medium leading-relaxed text-ink-soft">
                Tranqui, no se trata de acertar perfecto. Estas señales a veces se disfrazan de cuidado.
              </p>
            </div>
          ) : null}

          <Button
            variant={correct ? "teal" : "coral"}
            size="lg"
            onClick={onClose}
            className="mt-2 w-full"
          >
            {isLast ? "Ver mi resultado" : "Siguiente tarjeta"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
