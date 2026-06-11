"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

export default function HomeV3() {
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
    <div className="min-h-screen bg-[#F7F9FB] text-[#3B3B3B] flex flex-col relative" style={{ fontFamily: "'Noto Sans', sans-serif" }}>
      {/* Load Lora and Noto Sans Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;1,400&family=Noto+Sans:wght@300;400;700;800&display=swap" rel="stylesheet" />

      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        {/* Photo Hero Section */}
        <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between border-b border-[#E5E7EB] bg-[#F7F9FB]">
          {/* Background image - untouched */}
          <img 
            src="/herosection-photo.jpg" 
            alt="Grace Hopper AI Hero Section" 
            className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-20 sepia-[10%] contrast-[95%]"
          />
          
          <div className="absolute inset-0 bg-gradient-to-b from-[#F7F9FB]/40 via-transparent to-[#F7F9FB] pointer-events-none" />
          
          {/* Header - Transparent and spacious */}
          <header className="relative z-20 max-w-6xl w-full mx-auto px-8 pt-12 pb-6 flex justify-between items-center text-[#3B3B3B] border-b border-[#E5E7EB]">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <span className="font-bold tracking-tight text-lg text-[#2F5F95] hover:text-[#1560A5] transition-colors whitespace-nowrap">
                Grace Hopper
              </span>
            </Link>
            
            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-wider">
              <a 
                href="/interview"
                onClick={(e) => handleNavClick(e, "/interview")}
                className="text-[#3B3B3B] hover:text-[#2F5F95] transition-colors font-bold"
              >
                Sala de Entrevista
              </a>
              <a 
                href="/dashboard"
                onClick={(e) => handleNavClick(e, "/dashboard")}
                className="text-[#3B3B3B] hover:text-[#2F5F95] transition-colors font-bold"
              >
                Avaliações
              </a>
              <a 
                href="/dashboard"
                onClick={(e) => handleNavClick(e, "/dashboard")}
                className="text-[#3B3B3B] hover:text-[#2F5F95] transition-colors font-bold"
              >
                Painel
              </a>
            </nav>

            {/* Auth Controls */}
            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider">
              {loading && (
                <div className="w-6 h-6 rounded-full border border-black/10 animate-pulse" />
              )}
              {!loading && user && (
                <>
                  <span className="text-[10px] text-[#5E84B0] lowercase hidden sm:inline font-mono">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="hover:text-[#2F5F95] font-bold transition-colors cursor-pointer"
                  >
                    Sair
                  </button>
                </>
              )}
              {!loading && !user && (
                <Link 
                  href="/login" 
                  className="font-bold hover:text-[#2F5F95] transition-colors"
                >
                  Entrar
                </Link>
              )}
            </div>
          </header>
          
          {/* Content Overlay */}
          <div className="relative z-10 max-w-6xl w-full mx-auto px-8 pb-24 md:pb-36 flex flex-col justify-end items-start h-full">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5E84B0] mb-4">
              Treinamento de Liderança e Comunicação
            </span>
            <h1 className="text-4xl md:text-5xl font-normal leading-tight text-[#3B3B3B] max-w-4xl tracking-tight mb-8" style={{ fontFamily: "'Lora', serif" }}>
              Melhore seu desempenho em entrevistas através da prática falada com Inteligência Artificial.
            </h1>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6 mt-4">
              <button 
                onClick={(e) => handleNavClick(e, "/interview")}
                className="text-center text-xs font-extrabold tracking-widest uppercase text-[#2F5F95] bg-white border-2 border-[#2F5F95] hover:bg-[#F7F9FB] rounded-[10px] px-[30px] py-[22px] shadow-sm transition-all duration-300 min-w-[200px] h-[68px] flex items-center justify-center cursor-pointer"
              >
                Iniciar Simulação
              </button>
              <a 
                href="#intro"
                className="text-center text-xs font-bold tracking-widest uppercase text-[#5E84B0] hover:text-[#2F5F95] transition-colors py-2 cursor-pointer"
              >
                Conhecer a Metodologia
              </a>
            </div>
          </div>
        </section>

        {/* Philosophy Intro */}
        <section id="intro" className="max-w-5xl mx-auto px-8 py-28 md:py-36 scroll-mt-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4 text-xs font-bold uppercase tracking-[0.2em] text-[#5E84B0] pt-2">
              Metodologia de Liderança
            </div>
            <div className="md:col-span-8 text-left">
              <h2 className="text-2xl md:text-3xl font-normal leading-snug text-[#3B3B3B] tracking-tight mb-6" style={{ fontFamily: "'Lora', serif" }}>
                Desenvolva a clareza técnica e a oratória sob pressão.
              </h2>
              <p className="text-sm md:text-base leading-relaxed text-[#3B3B3B]/80 font-light">
                O Grace Hopper foi criado para guiar profissionais de tecnologia no desenvolvimento de suas soft skills. Ao usar o microfone local e prompts refinados no Gemini, o sistema avalia suas respostas de forma pedagógica, destacando pontos fortes e recomendando melhorias de forma construtiva.
              </p>
            </div>
          </div>
        </section>

        {/* Fine bordered cards */}
        <section className="max-w-6xl w-full mx-auto px-8 pb-32">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3 border-t border-[#E5E7EB] pt-16">
            <div className="flex flex-col">
              <span className="text-xs text-[#5E84B0] mb-4 font-bold uppercase tracking-wider">01 / Prática falada</span>
              <h3 className="font-normal text-xl text-[#3B3B3B] mb-3" style={{ fontFamily: "'Lora', serif" }}>Microfone Integrado</h3>
              <p className="text-xs md:text-sm text-[#3B3B3B]/80 leading-relaxed font-light">
                Com o uso da Web Speech API diretamente no seu navegador, a fala é transcrita em tempo real para permitir avaliações fluidas.
              </p>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-[#5E84B0] mb-4 font-bold uppercase tracking-wider">02 / Avaliação pedagógica</span>
              <h3 className="font-normal text-xl text-[#3B3B3B] mb-3" style={{ fontFamily: "'Lora', serif" }}>Feedback com Gemini</h3>
              <p className="text-xs md:text-sm text-[#3B3B3B]/80 leading-relaxed font-light">
                O modelo de inteligência artificial analisa a coerência conceitual e o tom de sua comunicação, pontuando seu progresso.
              </p>
            </div>
            
            <div className="flex flex-col">
              <span className="text-xs text-[#5E84B0] mb-4 font-bold uppercase tracking-wider">03 / Registro Histórico</span>
              <h3 className="font-normal text-xl text-[#3B3B3B] mb-3" style={{ fontFamily: "'Lora', serif" }}>Painel de Evolução</h3>
              <p className="text-xs md:text-sm text-[#3B3B3B]/80 leading-relaxed font-light">
                Todo o seu histórico e notas de desempenho são salvos de forma segura no Supabase para guiar seu progresso pessoal.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] py-12 text-center text-xs tracking-wider text-[#5E84B0] bg-[#FAFBFD] uppercase">
        <p className="text-[10px]">© 2026 Grace Hopper AI. Desenvolvido por Camila dos Santos.</p>
      </footer>
    </div>
  );
}
