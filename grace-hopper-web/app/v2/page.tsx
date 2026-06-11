"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

export default function HomeV2() {
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
    <div className="min-h-screen bg-[#F1F1F1] text-[#2C2B2B] flex flex-col font-sans relative" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      {/* Load Montserrat Font for display elements */}
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        {/* Photo Hero Section (Full Viewport, including transparent Header) */}
        <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between border-b border-[#E5E7EB]">
          {/* Background image - untouched */}
          <img 
            src="/herosection-photo.jpg" 
            alt="Grace Hopper AI Hero Section" 
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-25 mix-blend-multiply"
          />
          
          {/* Overlay to improve readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#F1F1F1]/70 via-transparent to-[#F1F1F1] pointer-events-none" />
          
          {/* Header - Transparent and Elegant */}
          <header className="relative z-20 max-w-7xl w-full mx-auto px-8 pt-10 pb-6 md:pt-14 flex justify-between items-center text-[#2C2B2B]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-light tracking-[0.25em] text-xs sm:text-sm md:text-base text-[#2C2B2B] hover:text-black transition-colors whitespace-nowrap uppercase" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                Grace Hopper
              </span>
            </Link>
            
            {/* Center Column - Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-[11px] whitespace-nowrap uppercase tracking-[0.28em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              <a 
                href="/interview"
                onClick={(e) => handleNavClick(e, "/interview")}
                className="text-[#2C2B2B]/75 hover:text-black transition-colors font-light"
              >
                Sala de Entrevista
              </a>
              <a 
                href="/dashboard"
                onClick={(e) => handleNavClick(e, "/dashboard")}
                className="text-[#2C2B2B]/75 hover:text-black transition-colors font-light"
              >
                Feedback
              </a>
              <a 
                href="/dashboard"
                onClick={(e) => handleNavClick(e, "/dashboard")}
                className="text-[#2C2B2B]/75 hover:text-black transition-colors font-light"
              >
                Painel
              </a>
            </nav>

            {/* Right Column - Auth Controls */}
            <div className="flex items-center gap-4 text-[11px] whitespace-nowrap uppercase tracking-[0.2em]" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              {loading && (
                <div className="w-5 h-5 rounded-full border border-black/10 animate-pulse" />
              )}
              {!loading && user && (
                <>
                  <span className="text-[10px] text-[#7A7777] lowercase hidden sm:inline font-light">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="font-light text-[#2C2B2B] hover:text-black transition-colors cursor-pointer"
                  >
                    Sair
                  </button>
                </>
              )}
              {!loading && !user && (
                <Link 
                  href="/login" 
                  className="font-light text-[#2C2B2B] hover:text-black transition-colors"
                >
                  Entrar
                </Link>
              )}
            </div>
          </header>
          
          {/* Hero Content */}
          <div className="relative z-10 max-w-7xl w-full mx-auto px-8 pb-24 flex flex-col justify-end items-start h-full">
            <span className="text-[10px] uppercase tracking-[0.28em] text-[#7A7777] mb-4" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Plataforma de Simulação
            </span>
            <h1 className="text-3xl md:text-5xl font-light leading-tight text-[#2C2B2B] max-w-3xl tracking-tight mb-8" style={{ fontFamily: "'Montserrat', sans-serif", letterSpacing: "-0.05em" }}>
              Prepare-se para entrevistas de voz com inteligência artificial.
            </h1>
            
            {/* Action buttons */}
            <div className="flex flex-row items-center gap-6">
              <button 
                onClick={(e) => handleNavClick(e, "/interview")}
                className="text-center text-xs font-light uppercase tracking-wider text-[#F1F1F1] bg-[#2C2B2B] hover:bg-black rounded-[4px] px-6 py-2.5 transition-all duration-200 cursor-pointer h-[40px] flex items-center justify-center"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                Comece sua entrevista
              </button>
              <a 
                href="#intro"
                className="text-center text-xs text-[#7A7777] hover:text-black font-light transition-colors py-2 cursor-pointer"
              >
                Saiba mais
              </a>
            </div>
          </div>
        </section>

        {/* Intro */}
        <section id="intro" className="max-w-5xl mx-auto px-8 py-24 md:py-32 scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 text-[10px] uppercase tracking-[0.28em] text-[#7A7777] pt-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Visão do Projeto
            </div>
            <div className="md:col-span-8 text-left">
              <h2 className="text-2xl md:text-3xl font-light leading-snug text-[#2C2B2B] tracking-tight mb-6" style={{ fontFamily: "'Montserrat', sans-serif', letterSpacing: '-0.02em'" }}>
                Um ambiente de treinamento focado e minimalista, livre de distrações visuais.
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[#7A7777] font-light">
                O Grace Hopper oferece um coach de comunicação inteligente e disponível a qualquer momento. Falando diretamente pelo seu navegador, a inteligência analisa suas respostas conceituais em tempo real, fornecendo feedbacks focados em melhorar seu desempenho.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Cards as Simple Frames */}
        <section className="max-w-7xl w-full mx-auto px-8 pb-24 md:pb-36">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 pt-12 border-t border-[#E5E7EB]">
            <div className="p-6 rounded-[8px] border border-[#E5E7EB] bg-transparent">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7777] mb-4 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>Captação local</span>
              <h3 className="font-medium text-base text-[#2C2B2B] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Microfone e Fala</h3>
              <p className="text-xs md:text-sm text-[#7A7777] leading-relaxed font-light">
                Com a Web Speech API, a gravação e transcrição ocorrem diretamente no navegador de forma limpa e automática.
              </p>
            </div>
            
            <div className="p-6 rounded-[8px] border border-[#E5E7EB] bg-transparent">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7777] mb-4 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>IA integrada</span>
              <h3 className="font-medium text-base text-[#2C2B2B] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Análise do Gemini</h3>
              <p className="text-xs md:text-sm text-[#7A7777] leading-relaxed font-light">
                O modelo de inteligência artificial analisa a exatidão técnica e o vocabulário utilizado em segundos.
              </p>
            </div>
            
            <div className="p-6 rounded-[8px] border border-[#E5E7EB] bg-transparent">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#7A7777] mb-4 block" style={{ fontFamily: "'Montserrat', sans-serif" }}>Histórico</span>
              <h3 className="font-medium text-base text-[#2C2B2B] mb-2" style={{ fontFamily: "'Montserrat', sans-serif" }}>Painel de Evolução</h3>
              <p className="text-xs md:text-sm text-[#7A7777] leading-relaxed font-light">
                Monitore suas pontuações e feedbacks ao longo do tempo através da integração do banco de dados no Supabase.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] py-12 text-center text-xs text-[#7A7777] bg-[#F1F1F1] tracking-widest uppercase">
        <p className="text-[10px]">© 2026 Grace Hopper AI. Desenvolvido por Camila dos Santos.</p>
      </footer>
    </div>
  );
}
