"use client";

import { motion } from "framer-motion";
import { Clock3, MapPin, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ChoiceButton } from "@/components/game3/choice-button";
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
              <Badge variant="plum">Situación {node.chapter}</Badge>
              <Badge variant="outline" className="bg-white/70">
                {node.chapterTitle}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[0.7rem] font-bold text-ink-faint">
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
          <div className="space-y-4">
            {node.narration.map((paragraph) => (
              <p
                key={paragraph}
                className="text-pretty text-base font-medium leading-[1.85] text-ink-soft sm:text-[1.02rem]"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 border-t border-line/70 pt-6">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-gold-deep" />
              <h2 className="font-display text-2xl font-extrabold text-ink sm:text-3xl">
                {node.prompt ?? "¿Qué harías tú?"}
              </h2>
            </div>
            <p className="mt-1 text-sm font-medium text-ink-faint">
              No hay respuesta perfecta, elige lo que harías y mira cómo se mueven tus nudos.
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
