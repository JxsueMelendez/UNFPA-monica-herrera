import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export function UserGate() {
  return (
    <div className="mx-auto max-w-xl py-14">
      <Card className="overflow-hidden p-8 text-center sm:p-12">
        <div className="mx-auto grid h-16 w-16 place-items-center rounded-3xl bg-plum-mist text-plum">
          <Compass className="h-8 w-8" />
        </div>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-[-0.02em] text-ink">
          Primero, cuéntanos tu nombre
        </h1>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-soft">
          Tu progreso se guarda solo en este dispositivo. No necesitas crear una
          cuenta ni dar datos personales reales.
        </p>
        <Link href="/" className={buttonVariants({ variant: "coral", size: "lg", className: "mt-7" })}>
          <Sparkles className="h-4 w-4" />
          Empezar la experiencia
        </Link>
      </Card>
    </div>
  );
}
