"use client";

import { motion } from "framer-motion";
import { Flag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChatMessage } from "@/lib/types";

interface MessageBubbleProps {
  message: ChatMessage;
  flagged: boolean;
  selected: boolean;
  showAvatar: boolean;
  onSelect: (message: ChatMessage) => void;
}

export function MessageBubble({
  message,
  flagged,
  selected,
  showAvatar,
  onSelect,
}: MessageBubbleProps) {
  const isTeen = message.from === "teen";

  return (
    <motion.button
      type="button"
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      onClick={() => onSelect(message)}
      aria-pressed={flagged}
      aria-label={`Mensaje de ${isTeen ? "Sofi" : "Álex"} a las ${message.time}. Toca para analizarlo.`}
      className={cn(
        "group flex w-full gap-2 text-left focus-visible:outline-none",
        isTeen ? "justify-end" : "justify-start",
      )}
    >
      {!isTeen ? (
        showAvatar ? (
          <span className="mt-auto grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-br from-plum to-rose text-[0.6rem] font-bold text-white">
            Á
          </span>
        ) : (
          <span className="w-7 shrink-0" aria-hidden />
        )
      ) : null}

      <div
        className={cn(
          "relative max-w-[84%] rounded-2xl px-3.5 py-2.5 text-[0.95rem] shadow-sm ring-offset-2 ring-offset-[#F0EEF6] transition duration-200 sm:max-w-[76%]",
          isTeen
            ? "rounded-br-md bg-plum text-cream"
            : "rounded-bl-md border border-line/70 bg-white text-ink",
          flagged &&
            "bg-coral-soft/90 text-ink ring-2 ring-coral",
          selected && !flagged && "ring-2 ring-plum/40",
          !selected && "hover:-translate-y-0.5 hover:shadow-md",
          "focus-visible:ring-2 focus-visible:ring-plum",
        )}
      >
        {flagged ? (
          <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-coral text-white shadow-sm">
            <Flag className="h-3 w-3 fill-current" />
          </span>
        ) : null}

        {message.sticker ? (
          <img
            src={message.sticker}
            alt={message.stickerAlt ?? "Sticker"}
            className="mb-1.5 h-24 w-24 rounded-xl object-cover"
            loading="lazy"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
        ) : null}
        <p className="whitespace-pre-wrap text-pretty font-medium leading-relaxed">
          {message.text}
        </p>
        <div
          className={cn(
            "mt-1 flex items-center justify-end gap-1.5 text-[0.62rem] font-semibold",
            isTeen ? "text-cream/60" : "text-ink-faint",
          )}
        >
          <span>{message.time}</span>
          {flagged ? (
            <span className="font-extrabold uppercase tracking-[0.08em] text-coral-deep">
              Red flag
            </span>
          ) : null}
        </div>
      </div>
    </motion.button>
  );
}
