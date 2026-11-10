import { LoaderCircle } from "lucide-react";

export function LoadingScreen({ label = "Cargando tu brújula..." }: { label?: string }) {
  return (
    <div className="grid min-h-[50vh] place-items-center">
      <div className="flex flex-col items-center gap-3 text-ink-soft">
        <LoaderCircle className="h-7 w-7 animate-spin text-coral" />
        <p className="text-sm font-medium">{label}</p>
      </div>
    </div>
  );
}
