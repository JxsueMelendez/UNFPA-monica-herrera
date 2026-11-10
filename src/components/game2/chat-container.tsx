"use client";

import {
  ChevronLeft,
  Info,
  LockKeyhole,
  MoreVertical,
  Phone,
  ShieldCheck,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MessageBubble } from "@/components/game2/message-bubble";
import type { ChatMessage, Game2Chat } from "@/lib/types";

interface ChatContainerProps {
  chat: Game2Chat;
  flaggedIds: string[];
  selectedId: string | null;
  onSelect: (message: ChatMessage) => void;
}

export function ChatContainer({
  chat,
  flaggedIds,
  selectedId,
  onSelect,
}: ChatContainerProps) {
  return (
    <Card className="overflow-hidden border-line/80 bg-white/90 p-0">
      <div className="flex items-center gap-3 border-b border-line/70 bg-white px-4 py-3.5">
        <button
          type="button"
          tabIndex={-1}
          aria-hidden
          className="grid h-8 w-8 place-items-center rounded-full text-ink-soft"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-plum to-rose text-sm font-bold text-white">
          Á
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-teal ring-2 ring-white" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-bold text-ink">
            {chat.adultName}{" "}
            <span className="font-medium text-ink-faint">· {chat.adultAge}</span>
          </p>
          <p className="text-[0.65rem] font-medium text-teal-deep">en línea</p>
        </div>
        <div className="flex items-center gap-1 text-ink-soft">
          <span className="grid h-8 w-8 place-items-center rounded-full">
            <Phone className="h-4 w-4" />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full">
            <Video className="h-4 w-4" />
          </span>
          <span className="grid h-8 w-8 place-items-center rounded-full">
            <MoreVertical className="h-4 w-4" />
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-b border-line/60 bg-sand/50 px-4 py-2">
        <Badge variant="outline" className="bg-white/70">
          <LockKeyhole className="h-3 w-3" />
          Conversación ficticia
        </Badge>
        <span className="truncate text-[0.65rem] font-medium text-ink-faint">
          Instagram DM
        </span>
      </div>

      <div className="max-h-[610px] space-y-2.5 overflow-y-auto bg-[#F6EFE8] px-3 py-4 sm:px-5">
        <div className="mx-auto w-fit rounded-full bg-white/70 px-3 py-1 text-[0.6rem] font-semibold text-ink-faint">
          Hoy · 21:08
        </div>

        {chat.messages.map((message, index) => {
          const previous = chat.messages[index - 1];
          const showAvatar = !previous || previous.from !== message.from;

          return (
            <MessageBubble
              key={message.id}
              message={message}
              flagged={flaggedIds.includes(message.id)}
              selected={selectedId === message.id}
              showAvatar={showAvatar}
              onSelect={onSelect}
            />
          );
        })}

        <div className="flex items-start gap-2 rounded-2xl border border-dashed border-line bg-white/50 p-3 text-[0.65rem] leading-relaxed text-ink-faint">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          Toca cualquier mensaje para analizarlo. Algunos son señales de alerta;
          otros son mensajes neutros o de cuidado.
        </div>
      </div>

      <div className="flex items-center gap-2 border-t border-line/70 bg-white px-4 py-3">
        <div className="flex flex-1 items-center gap-2 rounded-full bg-sand px-3.5 py-2 text-xs text-ink-faint">
          <LockKeyhole className="h-3.5 w-3.5" />
          Chat simulado: no puedes escribir aquí
        </div>
        <span className="grid h-8 w-8 place-items-center rounded-full bg-plum-mist text-plum">
          <ShieldCheck className="h-4 w-4" />
        </span>
      </div>
    </Card>
  );
}
