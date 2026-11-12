import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Facebook,
  Gamepad2,
  Globe,
  HeartHandshake,
  Info,
  Instagram,
  Lightbulb,
  Mail,
  MapPin,
  MessageCircleQuestion,
  Phone,
  Play,
  Sparkles,
  Target,
  Twitter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageShell } from "@/components/shared/page-shell";

export const metadata: Metadata = {
  title: "Sobre nosotros",
  description:
    "Conoce esta plataforma interactiva desarrollada en colaboración con el Fondo de Población de las Naciones Unidas (UNFPA) para la prevención y sensibilización sobre las relaciones impropias entre adolescentes y personas adultas.",
};

const socialLinks = [
  {
    platform: "Facebook",
    name: "Fondo de Población de las Naciones Unidas El Salvador - UNFPA",
    href: "https://www.facebook.com/unfpaSV/",
    icon: Facebook,
  },
  {
    platform: "Instagram",
    name: "UNFPA en El Salvador (@unfpasv)",
    href: "https://www.instagram.com/unfpasv/",
    icon: Instagram,
  },
  {
    platform: "Instagram",
    name: "UNFPA en América Latina y el Caribe (@unfpa_lacro)",
    href: "https://www.instagram.com/unfpa_lacro/",
    icon: Instagram,
  },
  {
    platform: "X / Twitter",
    name: "UNFPA en El Salvador (@UNFPAElSalvador)",
    href: "https://x.com/UNFPAElSalvador",
    icon: Twitter,
  },
];

export default function SobreNosotrosPage() {
  return (
    <PageShell className="pt-6 sm:pt-10">
      <section className="grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="animate-fade-up">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="coral">
              <Info className="h-3.5 w-3.5" />
              Sobre nosotros
            </Badge>
          </div>

          <h1 className="mt-6 text-balance font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.03em] text-ink sm:text-5xl">
            Un espacio para descubrir, cuestionar y aprender
          </h1>

          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-ink-soft sm:text-lg">
            ¿Alguna vez te has preguntado si todo lo que vemos en redes
            sociales sobre el amor refleja lo que realmente significa tener una
            relación saludable?
          </p>

          <p className="mt-4 max-w-xl text-pretty text-base leading-relaxed text-ink-soft">
            Las películas, las canciones, las redes sociales e incluso las
            personas que nos rodean pueden influir en nuestra manera de
            entender el amor. A veces, ciertas conductas como los celos, el
            control, la dependencia emocional o las grandes diferencias de
            edad se presentan como demostraciones de cariño, cuando en realidad
            pueden esconder situaciones de desigualdad y vulnerabilidad.
          </p>
        </div>

        <Card className="relative overflow-hidden bg-plum-deep p-7 text-cream shadow-lift sm:p-9">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-gold/15 blur-2xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-teal/20 blur-2xl"
          />

          <div className="relative">
            <div className="flex items-center justify-between gap-4">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gold text-plum-deep shadow-soft">
                <Globe className="h-6 w-6" />
              </span>
              <Badge variant="gold">Naciones Unidas</Badge>
            </div>

            <h2 className="mt-6 font-display text-2xl font-semibold tracking-[-0.02em] text-cream sm:text-3xl">
              Una iniciativa del UNFPA
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              Por eso nace esta plataforma, una iniciativa digital interactiva
              desarrollada en colaboración con el Fondo de Población de las
              Naciones Unidas (UNFPA), con el propósito de contribuir a la
              prevención y sensibilización sobre las relaciones impropias
              entre adolescentes y personas adultas.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-cream/80">
              El UNFPA es la agencia de las Naciones Unidas dedicada a la
              salud sexual y reproductiva, que trabaja por la igualdad de
              género, la protección de los derechos y el bienestar de las
              mujeres, niñas y adolescentes. En El Salvador, impulsa esfuerzos
              para prevenir la violencia de género, los embarazos adolescentes
              y las uniones tempranas, promoviendo entornos seguros y mayores
              oportunidades para las nuevas generaciones.
            </p>

            <a
              href="https://elsalvador.unfpa.org/es"
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full text-xs font-bold text-gold underline decoration-gold/40 underline-offset-4 transition hover:decoration-gold"
            >
              elsalvador.unfpa.org
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </Card>
      </section>

      <section className="mt-14">
        <Card className="relative overflow-hidden border-line/80 bg-gradient-to-br from-plum-mist/70 to-cream p-7 shadow-soft sm:p-9">
          <div className="flex items-start gap-4">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white/80 text-plum">
              <Sparkles className="h-5 w-5" />
            </span>
            <div className="space-y-3 text-[0.95rem] leading-relaxed text-ink-soft">
              <p>
                Como parte de este compromiso, nuestra plataforma busca
                acercar estos temas a las adolescentes mediante experiencias
                digitales que les permitan explorar, cuestionar y reflexionar
                sobre las ideas que existen alrededor de las relaciones
                amorosas.
              </p>
              <p>
                Queremos que aprender sobre estos temas sea una experiencia
                cercana, dinámica y diferente, donde cada historia, decisión y
                descubrimiento permita mirar las relaciones desde nuevas
                perspectivas.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-10">
        <Card className="border-plum/10 bg-plum-mist/60 p-7 sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/80 text-plum shadow-soft">
              <Target className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <Badge variant="plum">Nuestro propósito</Badge>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                ¿Cuál es nuestro propósito?
              </h2>
              <div className="mt-4 space-y-3.5 text-[0.95rem] leading-relaxed text-ink-soft">
                <p>
                  Nuestro objetivo es fomentar el pensamiento crítico y ayudar
                  a las adolescentes a reconocer las señales de alerta que
                  pueden presentarse en relaciones desiguales.
                </p>
                <p>
                  A través de esta propuesta buscamos contribuir a los
                  esfuerzos de prevención y sensibilización del UNFPA,
                  especialmente en relación con las creencias sociales y
                  culturales que normalizan las relaciones impropias y las
                  uniones tempranas.
                </p>
                <p>
                  En sintonía con iniciativas como Hablemos Claro, buscamos
                  cuestionar aquellas ideas que romantizan las diferencias de
                  edad, el control y las desigualdades de poder, promoviendo
                  una comprensión del amor basada en el respeto, la igualdad,
                  la confianza y la autonomía.
                </p>
                <p>
                  Creemos que tener información, reconocer nuestros derechos y
                  contar con personas de confianza son elementos fundamentales
                  para construir relaciones saludables y proteger nuestro
                  bienestar.
                </p>
              </div>
              <p className="mt-5 rounded-2xl border border-plum/15 bg-white/70 px-4 py-3.5 text-sm font-semibold text-plum">
                Esta plataforma no pretende decirte qué pensar, sino brindarte
                herramientas para hacer preguntas, analizar situaciones y
                desarrollar tu propio criterio.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-10">
        <Card className="border-gold/20 bg-gold-soft/50 p-7 sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/80 text-gold-deep shadow-soft">
              <Gamepad2 className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <Badge variant="gold">Experiencias interactivas</Badge>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                Aprende jugando
              </h2>
              <div className="mt-4 space-y-3.5 text-[0.95rem] leading-relaxed text-ink-soft">
                <p>
                  Sabemos que aprender no tiene por qué limitarse a leer
                  información o escuchar explicaciones. Por eso, transformamos
                  situaciones cotidianas en experiencias interactivas que te
                  permiten participar activamente.
                </p>
                <p>
                  A través de nuestros juegos podrás explorar conversaciones
                  ficticias, analizar publicaciones de redes sociales,
                  descubrir mensajes ocultos y acompañar a personajes que
                  enfrentan diferentes situaciones relacionadas con el amor,
                  el control y las desigualdades de poder.
                </p>
                <p>
                  Cada actividad presenta desafíos que invitan a observar más
                  allá de las apariencias y comprender que no todo lo que se
                  presenta como romántico es necesariamente saludable.
                </p>
                <p>
                  En algunos juegos tendrás que identificar señales de alerta;
                  en otros, tomarás decisiones que modificarán el desarrollo
                  de una historia y descubrirás cómo ciertas circunstancias
                  pueden influir en las oportunidades, la autonomía y el
                  proyecto de vida de una adolescente.
                </p>
                <p>
                  Estas experiencias están diseñadas para promover la reflexión
                  y el aprendizaje de una manera accesible y entretenida,
                  complementando los mensajes de prevención y protección que
                  impulsa el UNFPA.
                </p>
              </div>
              <p className="mt-5 rounded-2xl border border-gold/25 bg-white/70 px-4 py-3.5 text-sm font-semibold text-gold-deep">
                Aquí no se trata de juzgar tus respuestas, sino de aprender a
                reconocer situaciones, hacer preguntas y descubrir nuevas
                perspectivas.
              </p>
              <Link
                href="/hub"
                className={buttonVariants({ variant: "coral", size: "md", className: "mt-6" })}
              >
                <Play className="h-4 w-4 fill-current" />
                Explorar los juegos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-10">
        <Card className="border-coral/15 bg-coral-soft/50 p-7 sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/80 text-coral-deep shadow-soft">
              <Lightbulb className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <Badge variant="coral">Descubrimientos</Badge>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                ¿Qué queremos que descubras?
              </h2>
              <div className="mt-4 space-y-3.5 text-[0.95rem] leading-relaxed text-ink-soft">
                <p>
                  Queremos que al recorrer esta plataforma puedas comprender
                  que el amor no debe confundirse con el control, que los
                  regalos o las promesas no justifican una relación desigual y
                  que las diferencias de edad, experiencia y poder pueden
                  influir en la libertad de una adolescente para tomar
                  decisiones.
                </p>
                <p>
                  También queremos recordarte que tus opiniones, emociones,
                  límites, sueños y metas son importantes. Ninguna relación
                  debería exigir que renuncies a ellos.
                </p>
                <p>
                  A través de cada experiencia buscamos fortalecer el
                  conocimiento sobre los derechos de las adolescentes, promover
                  su autonomía y demostrar la importancia de construir
                  relaciones basadas en el respeto y la igualdad.
                </p>
                <p>
                  Sobre todo, queremos que reconozcas que pedir ayuda,
                  expresar tus dudas y acudir a personas de confianza son
                  acciones valiosas, y que nunca eres responsable de la
                  manipulación o el abuso ejercido por una persona adulta.
                </p>
              </div>
              <p className="mt-5 rounded-2xl border border-coral/15 bg-white/70 px-4 py-3.5 text-sm font-semibold text-coral-deep">
                Porque aprender a reconocer las señales de alerta también es
                una forma de cuidar tu presente y tu futuro.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-10">
        <Card className="border-teal/15 bg-teal-soft/50 p-7 sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-white/80 text-teal-deep shadow-soft">
              <HeartHandshake className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <Badge variant="teal">Nuestro compromiso</Badge>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                Nuestro compromiso con el cambio
              </h2>
              <div className="mt-4 space-y-3.5 text-[0.95rem] leading-relaxed text-ink-soft">
                <p>
                  Esta plataforma representa un esfuerzo conjunto por acercar
                  la prevención de las relaciones impropias a las adolescentes
                  mediante herramientas digitales, educativas e interactivas.
                </p>
                <p>
                  En colaboración con el UNFPA, buscamos aportar una nueva
                  manera de comunicar, sensibilizar y generar conciencia sobre
                  una problemática que muchas veces permanece normalizada
                  dentro de nuestra sociedad.
                </p>
              </div>
              <p className="mt-5 rounded-2xl border border-teal/15 bg-white/70 px-4 py-3.5 text-sm font-semibold text-teal-deep">
                Creemos que cuestionar lo que hemos aprendido es el primer
                paso para transformar lo que consideramos normal.
              </p>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-ink-soft">
                Porque todas las adolescentes merecen crecer en entornos
                seguros, construir relaciones basadas en el respeto y tener
                la libertad de decidir sobre su propio futuro.
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-10">
        <Card className="p-7 sm:p-9">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-plum-mist text-plum">
              <MessageCircleQuestion className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <Badge variant="outline">Ayuda</Badge>
              <h2 className="mt-3 font-display text-2xl font-semibold tracking-[-0.02em] text-ink sm:text-3xl">
                Preguntas frecuentes
              </h2>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">
                Estamos preparando este apartado con las preguntas más
                comunes sobre la plataforma y los temas que aborda. Mientras
                tanto, si tienes una duda, puedes escribirnos a{" "}
                <a
                  href="mailto:recepcion@unfpa.org.sv"
                  className="font-semibold text-plum underline decoration-plum/30 underline-offset-4 transition hover:decoration-plum"
                >
                  recepcion@unfpa.org.sv
                </a>
                .
              </p>
            </div>
          </div>
        </Card>
      </section>

      <section className="mt-12 overflow-hidden rounded-5xl border border-plum/10 bg-plum-deep p-7 text-cream shadow-lift sm:p-10">
        <div className="grid gap-8 md:grid-cols-2 md:items-start">
          <div>
            <div className="flex items-center gap-2 text-gold">
              <Mail className="h-5 w-5" />
              <span className="text-xs font-bold uppercase tracking-[0.16em]">
                Contacto
              </span>
            </div>
            <h2 className="mt-4 font-display text-2xl font-semibold sm:text-3xl">
              UNFPA El Salvador
            </h2>
            <ul className="mt-5 space-y-4 text-sm leading-relaxed text-cream/80">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  Bulevar Orden de Malta Sur, N°. 2-B, Santa Elena, Antiguo
                  Cuscatlán, La Libertad, El Salvador
                </span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href="tel:+50322554500"
                  className="rounded-md underline decoration-gold/30 underline-offset-4 transition hover:decoration-gold"
                >
                  (+503) 22554500
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href="mailto:recepcion@unfpa.org.sv"
                  className="rounded-md underline decoration-gold/30 underline-offset-4 transition hover:decoration-gold"
                >
                  recepcion@unfpa.org.sv
                </a>
              </li>
              <li className="flex gap-3">
                <Globe className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a
                  href="https://elsalvador.unfpa.org/es"
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md underline decoration-gold/30 underline-offset-4 transition hover:decoration-gold"
                >
                  elsalvador.unfpa.org
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-cream/60">
              Síguenos
            </p>
            <div className="mt-4 flex flex-col gap-2.5">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/60"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/15 text-gold">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[0.65rem] font-bold uppercase tracking-[0.12em] text-cream/55">
                        {social.platform}
                      </span>
                      <span className="mt-0.5 block text-[0.82rem] font-medium leading-snug text-cream/90">
                        {social.name}
                      </span>
                    </span>
                    <ArrowUpRight className="ml-auto h-4 w-4 shrink-0 text-cream/40 transition group-hover:text-gold" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
