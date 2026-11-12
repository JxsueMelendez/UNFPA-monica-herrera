"use client";

import { motion } from "framer-motion";
import { Clock3, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChoiceButton } from "@/components/game3/choice-button";
import { cn } from "@/lib/utils";
import type { StoryChoice, StoryNode } from "@/lib/types";

interface StorySceneProps {
  node: StoryNode;
  disabled?: boolean;
  onChoose: (choice: StoryChoice) => void;
}

export function StoryScene({ node, disabled = false, onChoose }: StorySceneProps) {
  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <Card className="overflow-hidden border-white/80 bg-white/90">
        <div className="border-b border-line/70 bg-sand/45 px-5 py-4 sm:px-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="plum">Capítulo {node.chapter}</Badge>
              <Badge variant="outline" className="bg-white/70">
                {node.chapterTitle}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[0.68rem] font-semibold text-ink-faint">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {node.location}
              </span>
              {node.time ? (
                <span className="inline-flex items-center gap-1.5">
                  <Clock3 className="h-3.5 w-3.5" />
                  {node.time}
                </span>
              ) : null}
            </div>
          </div>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <div className="space-y-3">
            {node.narration.map((paragraph) => (
              <p
                key={paragraph}
                className="text-pretty text-[0.98rem] leading-[1.8] text-ink-soft"
              >
                {paragraph}
              </p>
            ))}
          </div>

          {node.dialogues && node.dialogues.length > 0 ? (
            <div className="mt-6 space-y-3">
              {node.dialogues.map((dialogue, index) => {
                const isProtagonist = dialogue.role === "protagonist";
                const isSupport = dialogue.role === "support";

                return (
                  <div
                    key={`${dialogue.speaker}-${index}`}
                    className={cn(
                      "flex gap-2.5",
                      isProtagonist ? "justify-end" : "justify-start",
                    )}
                  >
                    {!isProtagonist ? (
                      <span
                        className={cn(
                          "mt-auto grid h-8 w-8 shrink-0 place-items-center rounded-full text-[0.65rem] font-bold text-white",
                          isSupport
                            ? "bg-teal"
                            : "bg-gradient-to-br from-plum to-rose",
                        )}
                      >
                        {dialogue.speaker.charAt(0)}
                      </span>
                    ) : null}

                    <div
                      className={cn(
                        "max-w-[86%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[78%]",
                        isProtagonist
                          ? "rounded-br-md bg-plum text-cream"
                          : isSupport
                            ? "rounded-bl-md border border-teal/15 bg-teal-soft/70 text-ink"
                            : "rounded-bl-md border border-line/70 bg-white text-ink",
                      )}
                    >
                      <p
                        className={cn(
                          "text-[0.62rem] font-bold uppercase tracking-[0.12em]",
                          isProtagonist ? "text-cream/55" : "text-ink-faint",
                        )}
                      >
                        {dialogue.speaker}
                      </p>
                      <p className="mt-1 text-pretty text-sm leading-relaxed">
                        {dialogue.text}
                      </p>
                    </div>

                    {isProtagonist ? (
                      <span className="mt-auto grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-coral to-gold text-[0.65rem] font-bold text-white">
                        S
                      </span>
                    ) : null}
                  </div>
                );
              })}
            </div>
          ) : null}

          <div className="mt-8 border-t border-line/70 pt-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-gold-deep" />
              <h2 className="font-display text-xl font-semibold text-ink sm:text-2xl">
                {node.prompt ?? "¿Qué decides?"}
              </h2>
            </div>
            <p className="mt-1 text-xs font-medium text-ink-faint">
              No hay respuestas “correctas” para ganar. Elige lo que harías tú y
              observa qué se mueve.
            </p>

            <div className="mt-4 space-y-2.5">
              {node.choices.map((choice, index) => (
                <ChoiceButton
                  key={choice.id}
                  choice={choice}
                  index={index}
                  disabled={disabled}
                  onChoose={onChoose}
                />
              ))}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
