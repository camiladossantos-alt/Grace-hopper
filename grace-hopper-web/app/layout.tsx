import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { InAppBrowserBanner } from "@/components/ui/in-app-browser-banner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrepWell - Treino de Comunicação com IA",
  description: "Simule entrevistas de voz para cargos seniores. Treine sua oratória e precisão técnica com avaliações instantâneas geradas por Inteligência Artificial.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <InAppBrowserBanner />
        {children}
      </body>
    </html>
  );
}
