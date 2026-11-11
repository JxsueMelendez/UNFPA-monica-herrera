"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  ArrowLeftRight,
  CheckCircle2,
  Clock3,
  Compass,
  HeartHandshake,
  LockKeyhole,
  MessagesSquare,
  Route,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";
import { useUserProgress } from "@/lib/use-user-progress";

interface GamePreview {
  number: string;
  title: string;
  description: string;
  href: string;
  tag: string;
  icon: LucideIcon;
  tone: string;
  iconTone: string;
}

const gamePreviews: GamePreview[] = [
  {
    number: "01",
    title: "¿Lo compartes o lo cuestionas?",
    description:
      "Desliza publicaciones y decide qué mensajes amplificarías y cuáles merecen una segunda mirada.",
    href: "/juego-1",
    tag: "Swipe",
    icon: ArrowLeftRight,
    tone: "from-coral-soft/80 to-cream",
    iconTone: "bg-coral-soft text-coral-deep",
  },
  {
    number: "02",
    title: "Entre líneas",
    description:
      "Inspecciona una conversación y encuentra las banderas rojas escondidas entre mensajes que parecen normales.",
    href: "/juego-2",
    tag: "Chat",
    icon: MessagesSquare,
    tone: "from-teal-soft/80 to-cream",
    iconTone: "bg-teal-soft text-teal-deep",
  },
  {
    number: "03",
    title: "Tú decides el camino",
    description:
      "Toma decisiones, observa sus consecuencias y descubre cómo cuidar tus metas y tu red de apoyo.",
    href: "/juego-3",
    tag: "Historia",
    icon: Route,
    tone: "from-gold-soft/80 to-cream",
    iconTone: "bg-gold-soft text-gold-deep",
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { progress, isReady, setUserName } = useUserProgress();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    if (!isReady || prefilled) return;
    if (progress.userName) setName(progress.userName);
    setPrefilled(true);
  }, [isReady, prefilled, progress.userName]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const cleanName = name.trim();

    if (cleanName.length < 2) {
      setError("Escribe al menos 2 caracteres. Puede ser un nombre o un pseudónimo.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    setUserName(cleanName);
    router.push("/hub");
  }

  return (
    <PageShell className="pt-6 sm:pt-10">
      <section className="grid items-center gap-10 lg:grid-cols-[1.06fr_0.94fr] lg:gap-14">
        <div className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="coral">
              <Sparkles className="h-3.5 w-3.5" />
              Experiencia interactiva
            </Badge>
            <Badge variant="outline">
              <Clock3 className="h-3.5 w-3.5" />
              15–20 minutos
            </Badge>
          </div>

          <h1 className="mt-6 text-balance font-display text-[2.65rem] font-semibold leading-[0.98] tracking-[-0.04em] text-ink sm:text-6xl">
            ¿Alguna vez te has preguntado si todo lo que vemos en redes
            sociales sobre el amor
            <span className="relative mt-2 block text-coral">
              es realmente como parece?
              <svg
                aria-hidden
                viewBox="0 0 300 18"
                className="absolute -bottom-3 left-0 h-4 w-[78%] text-gold"
                fill="none"
              >
                <path
                  d="M3 12C60 4 138 3 296 9"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            En este espacio podrás explorar diferentes historias, situaciones y
            mensajes que te invitarán a cuestionar lo que muchas veces
            consideramos normal en una relación.
          </p>

          <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-ink-soft">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal" />
              Sin registro ni datos personales
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-plum" />
              Tu avance queda en este dispositivo
            </span>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#empezar" className={buttonVariants({ variant: "coral", size: "lg" })}>
              Quiero empezar
              <ArrowRight className="h-4 w-4" />
            </a>
            {progress.userName ? (
              <Link href="/hub" className={buttonVariants({ variant: "secondary", size: "lg" })}>
                Continuar como {progress.userName}
              </Link>
            ) : (
              <span className="text-sm text-ink-faint">
                Tú decides hasta dónde llegar.
              </span>
            )}
          </div>
        </div>

        <Card
          id="empezar"
          className="relative overflow-hidden border-white/80 bg-white/90 p-6 shadow-lift sm:p-8"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-coral/15 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-teal/10 blur-2xl"
          />

          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-plum text-cream shadow-soft">
                <Compass className="h-6 w-6" />
              </span>
              <Badge variant="plum">Paso 1 de 4</Badge>
            </div>

            <h2 className="mt-6 font-display text-3xl font-semibold tracking-[-0.02em] text-ink">
              ¿Cómo te llamas?
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Usaremos tu nombre para acompañarte durante la experiencia. Puede
              ser un pseudónimo: no necesitas dar tus datos reales.
            </p>

            {progress.userName ? (
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-teal/20 bg-teal-soft/60 px-4 py-3">
                <p className="text-xs font-semibold text-teal-deep">
                  Ya hay un recorrido guardado como {progress.userName}.
                </p>
                <Link
                  href="/hub"
                  className="inline-flex min-h-6 items-center rounded-md text-xs font-bold text-teal-deep underline decoration-teal/30 underline-offset-4 hover:decoration-teal"
                >
                  Ir al inicio
                </Link>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="mt-6" noValidate>
              <label
                htmlFor="userName"
                className="text-xs font-bold uppercase tracking-[0.12em] text-ink-faint"
              >
                Tu nombre o pseudónimo
              </label>
              <div className="relative mt-2">
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  autoComplete="nickname"
                  maxLength={32}
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (error) setError("");
                  }}
                  placeholder="Ej. Sofi, Luna, Vero..."
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? "name-error" : "name-help"}
                  className="h-14 w-full rounded-2xl border border-line bg-cream/70 px-4 pr-12 text-base font-medium text-ink placeholder:text-ink-faint/70 focus:border-plum/40 focus:bg-white focus:outline-none focus:ring-4 focus:ring-plum/10"
                />
                <Sparkles className="pointer-events-none absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gold" />
              </div>
              <p id="name-help" className="mt-2 text-xs leading-relaxed text-ink-faint">
                Máximo 32 caracteres. Puedes cambiarlo cuando quieras volviendo
                a esta pantalla.
              </p>
              {error ? (
                <p
                  id="name-error"
                  role="alert"
                  className="mt-3 flex items-start gap-2 rounded-xl bg-coral-soft px-3 py-2 text-xs font-semibold text-coral-deep"
                >
                  <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  {error}
                </p>
              ) : null}

              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="mt-5 w-full"
                disabled={!isReady || isSubmitting}
              >
                {isSubmitting
                  ? "Preparando tu experiencia..."
                  : progress.userName
                    ? "Guardar y continuar"
                    : "Empezar mi recorrido"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-sand/70 p-3.5">
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-plum-soft" />
              <p className="text-[0.72rem] leading-relaxed text-ink-soft">
                <strong className="font-semibold text-ink">Privacidad:</strong>{" "}
                todo se guarda en el almacenamiento local de tu navegador. No hay
                servidores, cuentas ni seguimiento.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-20 sm:mt-24">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Badge variant="gold">Tres formas de mirar</Badge>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-ink sm:text-4xl">
              ¿Para qué sirven nuestros juegos?
            </h2>
          </div>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">
            A través de experiencias interactivas podrás tomar decisiones,
            descubrir mensajes ocultos, identificar señales de alerta y
            diferenciar el amor del control.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {gamePreviews.map((game) => {
            const Icon = game.icon;
            return (
              <Link
                key={game.number}
                href="/hub"
                className={`group relative overflow-hidden rounded-4xl border border-line/80 bg-gradient-to-br ${game.tone} p-6 shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-plum/40`}
              >
                <div className="flex items-center justify-between">
                  <span className={`grid h-11 w-11 place-items-center rounded-2xl ${game.iconTone}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="font-display text-3xl font-semibold text-ink/15">
                    {game.number}
                  </span>
                </div>
                <Badge variant="outline" className="mt-5">
                  {game.tag}
                </Badge>
                <h3 className="mt-3 font-display text-xl font-semibold leading-tight text-ink">
                  {game.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                  {game.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-plum">
                  Ver juego
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-16 overflow-hidden rounded-5xl border border-plum/10 bg-plum-deep p-7 text-cream shadow-lift sm:p-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <div className="flex items-center gap-2 text-gold">
              <HeartHandshake className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.16em]">
                Una iniciativa del UNFPA
              </span>
            </div>
            <h2 className="mt-4 max-w-2xl font-display text-2xl font-semibold leading-tight sm:text-3xl">
              ¡Explora, juega y descubre nuevas formas de ver las relaciones!
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-cream/75">
              Cada juego está diseñado para ayudarte a reflexionar sobre las
              relaciones, reconocer situaciones de desigualdad y comprender la
              importancia de tu autonomía, tus límites y tu proyecto de vida.
            </p>
          </div>
          <div className="flex flex-col gap-2 text-sm text-cream/80">
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-soft" />
              No revictimizamos ni culpamos
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-soft" />
              No hay respuestas que te expongan
            </span>
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-teal-soft" />
              Puedes pausar y volver después
            </span>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
