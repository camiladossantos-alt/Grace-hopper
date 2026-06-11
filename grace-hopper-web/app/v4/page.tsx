"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

export default function HomeV4() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.refresh();
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    if (!user) {
      router.push("/login");
    } else {
      router.push(href);
    }
  };

  return (
    <div className="min-h-screen bg-[#121212] text-[#FCFCFC] flex flex-col relative overflow-hidden" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Load Playfair Display and Inter Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Main Container */}
      <main className="flex-1 flex flex-col z-10">
        {/* Photo Hero Section */}
        <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between border-b border-[#374151]">
          {/* Background image - untouched */}
          <img 
            src="/herosection-photo.jpg" 
            alt="Grace Hopper AI Hero Section" 
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-15 mix-blend-luminosity"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#121212]/80 via-transparent to-[#121212] pointer-events-none" />
          
          {/* Header */}
          <header className="relative z-20 max-w-7xl w-full mx-auto px-6 pt-10 pb-6 md:pt-14 flex justify-between items-center text-white">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-normal text-base hover:text-[#B8B8B8] transition-colors" style={{ fontFamily: "'Playfair Display', serif" }}>
                Grace Hopper AI
              </span>
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs font-medium tracking-wide">
              <a 
                href="/interview"
                onClick={(e) => handleNavClick(e, "/interview")}
                className="text-[#B8B8B8] hover:text-white transition-colors"
              >
                Sala de Entrevista
              </a>
              <a 
                href="/dashboard"
                onClick={(e) => handleNavClick(e, "/dashboard")}
                className="text-[#B8B8B8] hover:text-white transition-colors"
              >
                Feedback
              </a>
              <a 
                href="/dashboard"
                onClick={(e) => handleNavClick(e, "/dashboard")}
                className="text-[#B8B8B8] hover:text-white transition-colors"
              >
                Painel
              </a>
            </nav>

            {/* Auth Controls */}
            <div className="flex items-center gap-4 text-xs">
              {loading && (
                <div className="w-6 h-6 rounded-full border border-white/10 animate-pulse bg-white/5" />
              )}
              {!loading && user && (
                <>
                  <span className="text-[10px] text-[#B8B8B8] lowercase hidden sm:inline font-mono">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="font-medium text-[#FCFCFC] hover:underline cursor-pointer"
                  >
                    Sair
                  </button>
                </>
              )}
              {!loading && !user && (
                <Link 
                  href="/login" 
                  className="font-medium hover:underline"
                >
                  Entrar
                </Link>
              )}
            </div>
          </header>
          
          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-6 pb-24 md:pb-32 flex flex-col justify-end items-center text-center h-full">
            <span className="text-xs uppercase tracking-widest text-[#B8B8B8] mb-6">
              Plataforma de Simulação de Entrevistas
            </span>
            <h1 className="text-4xl md:text-6xl font-normal tracking-tight text-white max-w-4xl leading-tight mb-8" style={{ fontFamily: "'Playfair Display', serif" }}>
              Treine sua fala e avalie suas respostas técnicas com inteligência artificial.
            </h1>
            
            {/* Compact custom buttons */}
            <div className="flex flex-row items-center gap-4 justify-center">
              <button 
                onClick={(e) => handleNavClick(e, "/interview")}
                className="text-center text-xs font-medium text-white bg-transparent border border-[#FCFCFC] hover:bg-[#FFFFFF33] rounded-[3px] px-[15px] py-[4px] h-[30px] min-w-[122px] flex items-center justify-center cursor-pointer transition-colors"
              >
                Praticar por Voz
              </button>
              <a 
                href="#intro"
                className="text-center text-xs text-[#B8B8B8] hover:text-white font-medium transition-colors px-4 py-2"
              >
                Saiba mais
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section id="intro" className="flex flex-col justify-center max-w-4xl mx-auto px-6 py-24 text-center sm:py-32 scroll-mt-20">
          <h2 className="text-3xl font-normal tracking-tight sm:text-4xl text-white mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            Simulações realistas e diretas ao ponto.
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-[#B8B8B8] max-w-2xl mx-auto font-light">
            O Grace Hopper fornece um coach de comunicação instantâneo e gratuito para preparação de processos seletivos. Utilizando recursos nativos do seu navegador, sua resposta é analisada em segundos pela IA do Gemini.
          </p>
        </section>

        {/* Flat dark panels */}
        <section className="max-w-7xl w-full mx-auto px-6 pb-24 sm:pb-36">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-left">
            <div className="p-8 rounded-[8px] border border-[#374151] bg-[#121212] shadow-none">
              <h3 className="font-semibold text-lg text-white mb-3">Voz sem barreiras</h3>
              <p className="text-xs md:text-sm text-[#B8B8B8] leading-relaxed">
                Utilize o microfone para gravar respostas e visualizar a transcrição em tempo real através da Web Speech API.
              </p>
            </div>
            
            <div className="p-8 rounded-[8px] border border-[#374151] bg-[#121212] shadow-none">
              <h3 className="font-semibold text-lg text-white mb-3">Processamento em 3s</h3>
              <p className="text-xs md:text-sm text-[#B8B8B8] leading-relaxed">
                A IA analisa a estrutura de sua fala, vocabulário corporativo e competência técnica para retornar feedback quantitativo.
              </p>
            </div>
            
            <div className="p-8 rounded-[8px] border border-[#374151] bg-[#121212] shadow-none">
              <h3 className="font-semibold text-lg text-white mb-3">Painel histórico</h3>
              <p className="text-xs md:text-sm text-[#B8B8B8] leading-relaxed">
                Acompanhe o seu desenvolvimento com o histórico de simulações e pontuações arquivado em sua conta do Supabase.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#374151] py-10 text-center text-xs text-[#B8B8B8]/40 bg-[#121212]">
        <p>© 2026 Grace Hopper AI. Desenvolvido por Camila dos Santos.</p>
      </footer>
    </div>
  );
}
