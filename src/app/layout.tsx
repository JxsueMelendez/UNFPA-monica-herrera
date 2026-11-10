import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "@fontsource-variable/outfit";
import "@fontsource-variable/fraunces";
import "./globals.css";
import { AppHeader } from "@/components/shared/app-header";
import { SiteFooter } from "@/components/shared/site-footer";
import { ProgressProvider } from "@/lib/use-user-progress";

export const metadata: Metadata = {
  title: {
    default: "Brújula · Relaciones, límites y proyecto de vida",
    template: "%s · Brújula",
  },
  description:
    "Experiencia educativa interactiva para adolescentes: identifica dinámicas de control y manipulación, pon límites y cuida tu proyecto de vida.",
  applicationName: "Brújula",
  keywords: [
    "adolescentes",
    "relaciones saludables",
    "límites",
    "autonomía",
    "proyecto de vida",
    "educación",
  ],
  authors: [{ name: "Proyecto Brújula" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FFF8F2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body className="font-sans">
        <ProgressProvider>
          <div className="flex min-h-screen flex-col">
            <AppHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
          </div>
        </ProgressProvider>
      </body>
    </html>
  );
}
