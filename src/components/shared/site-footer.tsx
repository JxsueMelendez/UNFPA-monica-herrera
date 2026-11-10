import Link from "next/link";
import { Compass, HeartHandshake, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line/70 bg-cream/85">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-plum text-cream">
              <Compass className="h-4 w-4" />
            </span>
            <span className="font-display text-lg font-semibold text-ink">Brújula</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            Una experiencia educativa e interactiva para reconocer relaciones
            desiguales, poner límites y cuidar tu proyecto de vida.
          </p>
        </div>

        <div className="flex gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-teal" />
          <div>
            <p className="text-sm font-semibold text-ink">Contenido ficticio</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Personajes, chats y publicaciones son inventados con fines
              educativos. No sustituyen la orientación psicológica, legal o médica.
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <HeartHandshake className="mt-0.5 h-5 w-5 shrink-0 text-coral" />
          <div>
            <p className="text-sm font-semibold text-ink">Si necesitas ayuda</p>
            <p className="mt-1 text-xs leading-relaxed text-ink-soft">
              Habla con una persona adulta de confianza o con los servicios de
              emergencia y protección de tu país. No tienes que enfrentarlo sola.
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-[0.7rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Tu avance se guarda únicamente en este dispositivo.</p>
          <p>Hecho con cuidado para hablar de autonomía y redes de apoyo.</p>
        </div>
      </div>
    </footer>
  );
}
