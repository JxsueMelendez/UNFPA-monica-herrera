import Link from "next/link";
import {
  Compass,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";

const socialLinks = [
  {
    label: "Facebook · UNFPA El Salvador",
    href: "https://www.facebook.com/unfpaSV/",
    icon: Facebook,
  },
  {
    label: "Instagram · @unfpasv",
    href: "https://www.instagram.com/unfpasv/",
    icon: Instagram,
  },
  {
    label: "Instagram · @unfpa_lacro",
    href: "https://www.instagram.com/unfpa_lacro/",
    icon: Instagram,
  },
  {
    label: "X (Twitter) · @UNFPAElSalvador",
    href: "https://x.com/UNFPAElSalvador",
    icon: Twitter,
  },
];

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
            <span className="font-display text-lg font-semibold text-ink">UNFPA</span>
          </Link>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-soft">
            Una iniciativa digital interactiva para explorar, cuestionar y
            reflexionar sobre las ideas que existen alrededor de las relaciones
            amorosas.
          </p>
          <Link
            href="/sobre-nosotros"
            className="mt-3 inline-flex items-center gap-1.5 rounded-full text-xs font-bold text-plum underline decoration-plum/30 underline-offset-4 transition hover:decoration-plum"
          >
            Sobre nosotros
          </Link>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">UNFPA El Salvador</p>
          <ul className="mt-3 space-y-2.5">
            <li className="flex gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <span className="text-xs leading-relaxed text-ink-soft">
                Bulevar Orden de Malta Sur, N°. 2-B, Santa Elena, Antiguo
                Cuscatlán, La Libertad, El Salvador
              </span>
            </li>
            <li className="flex gap-2.5">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <a
                href="tel:+50322554500"
                className="text-xs leading-relaxed text-ink-soft transition hover:text-ink"
              >
                (+503) 22554500
              </a>
            </li>
            <li className="flex gap-2.5">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <a
                href="mailto:recepcion@unfpa.org.sv"
                className="text-xs leading-relaxed text-ink-soft transition hover:text-ink"
              >
                recepcion@unfpa.org.sv
              </a>
            </li>
            <li className="flex gap-2.5">
              <Globe className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
              <a
                href="https://elsalvador.unfpa.org/es"
                target="_blank"
                rel="noreferrer"
                className="text-xs leading-relaxed text-ink-soft transition hover:text-ink"
              >
                elsalvador.unfpa.org
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink">Síguenos</p>
          <ul className="mt-3 space-y-2.5">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 text-xs leading-relaxed text-ink-soft transition hover:text-ink"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl border border-line bg-white/70 text-plum transition group-hover:border-plum/30 group-hover:bg-plum-mist">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="underline decoration-transparent underline-offset-4 transition group-hover:decoration-plum/40">
                      {social.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="border-t border-line/60">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 text-[0.7rem] text-ink-faint sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>Los personajes y conversaciones de los juegos son ficticios, con fines educativos.</p>
          <p>Tu avance se guarda únicamente en este dispositivo.</p>
        </div>
      </div>
    </footer>
  );
}
