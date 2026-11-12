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
        <div
          className={cn(
            "relative overflow-hidden px-6 pb-5 pt-6 sm:px-8",
            correct ? "bg-teal-soft/80" : "bg-gold-soft/80",
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-16 h-40 w-40 rounded-full bg-white/50 blur-2xl"
          />
          <div className="relative flex items-start gap-3.5">
            <span
              className={cn(
                "grid h-12 w-12 shrink-0 place-items-center rounded-2xl",
                correct
                  ? "bg-teal text-white"
                  : "bg-gold text-plum-deep",
              )}
            >
              {correct ? (
                <CheckCircle2 className="h-6 w-6" />
              ) : (
                <Lightbulb className="h-6 w-6" />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={correct ? "teal" : "gold"}>
                  {correct ? "Buena lectura" : "Otra mirada"}
                </Badge>
                <Badge variant="outline">{card.feedback.category}</Badge>
              </div>
              <h2 className="mt-2.5 font-display text-2xl font-semibold leading-tight text-ink sm:text-3xl">
                {card.feedback.title}
              </h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                Tu elección:{" "}
                <strong className="font-semibold text-ink">
                  {choice === "share" ? "Compartir" : "Cuestionar"}
                </strong>{" "}
                · Respuesta esperada:{" "}
                <strong className="font-semibold text-ink">{expected}</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 sm:px-8 sm:py-6">
          <div className="flex items-start gap-3">
            <Eye className="mt-0.5 h-5 w-5 shrink-0 text-plum" />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink-faint">
                Lo que hay detrás
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
                {card.feedback.explanation}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-plum/10 bg-plum-mist/60 p-4">
            <div className="flex items-start gap-2.5">
              <HeartHandshake className="mt-0.5 h-4 w-4 shrink-0 text-plum" />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.12em] text-plum">
                  Para llevarte
                </p>
                <p className="mt-1 text-sm font-medium leading-relaxed text-ink">
                  {card.feedback.takeaway}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-2.5 rounded-2xl bg-sand/70 p-4">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" />
            <p className="text-sm leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">Para pensar:</strong>{" "}
              {card.feedback.reflection}
            </p>
          </div>

          {!correct ? (
            <div className="mt-4 flex items-start gap-2.5 rounded-2xl border border-coral/15 bg-coral-soft/50 p-4">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-coral-deep" />
              <p className="text-sm leading-relaxed text-ink-soft">
                No se trata de acertar perfecto. Estas señales pueden ser
                difíciles de ver, sobre todo cuando el control se disfraza de
                cuidado.
              </p>
            </div>
          ) : null}

          <Button
            variant={correct ? "teal" : "primary"}
            size="lg"
            onClick={onClose}
            className="mt-5 w-full"
          >
            {isLast ? "Ver mi resultado" : "Siguiente tarjeta"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Modal>
  );
}
