"use client";
 
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";
import { Hero } from "@/components/ui/animated-hero";
 
export default function Home() {
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

  useEffect(() => {
    const animateWords = () => {
      const wordElements = document.querySelectorAll('.word-animate');
      wordElements.forEach(word => {
        const htmlWord = word as HTMLElement;
        const delay = parseInt(htmlWord.getAttribute('data-delay') || '0');
        setTimeout(() => {
          if (htmlWord) {
            htmlWord.style.animation = 'word-appear-phrase 0.8s ease-out forwards';
          }
        }, delay);
      });
    };
    const timeoutId = setTimeout(animateWords, 300);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const wordElements = document.querySelectorAll('.word-animate');
    const handleMouseEnter = (e: Event) => {
      if (e.target) {
        const target = e.target as HTMLElement;
        target.style.textShadow = '0 0 15px rgba(255, 255, 255, 0.7)';
        target.style.color = '#ffffff';
        target.style.transform = 'translateY(-2px) scale(1.03)';
      }
    };
    const handleMouseLeave = (e: Event) => {
      if (e.target) {
        const target = e.target as HTMLElement;
        target.style.textShadow = 'none';
        target.style.color = '';
        target.style.transform = '';
      }
    };
    wordElements.forEach(word => {
      word.addEventListener('mouseenter', handleMouseEnter);
      word.addEventListener('mouseleave', handleMouseLeave);
    });
    return () => {
      wordElements.forEach(word => {
        if (word) {
          word.removeEventListener('mouseenter', handleMouseEnter);
          word.removeEventListener('mouseleave', handleMouseLeave);
        }
      });
    };
  }, [loading]);

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
    <div className="min-h-screen bg-white text-black flex flex-col font-sans animate-page-fade">
      <style>{`
        @keyframes page-fade-in {
          0% {
            opacity: 0;
            filter: blur(4px);
            transform: scale(0.995);
          }
          100% {
            opacity: 1;
            filter: blur(0);
            transform: scale(1);
          }
        }
        .animate-page-fade {
          opacity: 0;
          animation: page-fade-in 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes word-appear-phrase {
          0% {
            opacity: 0;
            transform: translateY(20px) scale(0.85);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }
        .word-animate {
          display: inline-block;
          opacity: 0;
          transition: color 0.3s ease, transform 0.3s ease, text-shadow 0.3s ease;
          cursor: default;
        }
      `}</style>
      {/* Main Container */}
      <main className="flex-1 flex flex-col">
        {/* Photo Hero Section (Full Viewport, including transparent Header) */}
        <section className="relative w-full h-screen overflow-hidden bg-black flex flex-col justify-between border-b border-[#E5E7EB]">
          {/* Background image */}
          <Image 
            src="/herosection-photo.jpg" 
            alt="Grace Hopper AI Hero Section" 
            fill
            priority
            sizes="100vw"
            className="object-cover object-center pointer-events-none"
          />
          
          {/* Overlay to improve readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/55 pointer-events-none" />
          
          {/* Header - Overlaid and Transparent */}
          <header className="relative z-20 max-w-7xl w-full mx-auto px-6 pt-10 pb-6 md:pt-14 flex justify-between items-center text-white">
            {/* Left Column - Logo */}
            <div className="flex justify-start">
              <Link href="/" className="flex items-center gap-2 group">
                <span className="font-light tracking-widest text-xs sm:text-sm md:text-base text-white/95 group-hover:text-white transition-colors whitespace-nowrap uppercase">
                  Projeto Grace Hopper
                </span>
              </Link>
            </div>
            
            {/* Center Column - Navigation Links */}
            <nav className="hidden md:flex items-center justify-center gap-4 sm:gap-8 text-[11px] sm:text-xs md:text-sm whitespace-nowrap uppercase tracking-wider font-semibold">
              <a 
                href="/interview"
                onClick={(e) => handleNavClick(e, "/interview")}
                className="text-white/80 hover:text-white transition-colors"
              >
                Sala de Entrevista
              </a>
              <a 
                href="/dashboard"
                onClick={(e) => handleNavClick(e, "/dashboard")}
                className="text-white/80 hover:text-white transition-colors"
              >
                Feedback
              </a>
              <a 
                href="/dashboard"
                onClick={(e) => handleNavClick(e, "/dashboard")}
                className="text-white/80 hover:text-white transition-colors"
              >
                Painel
              </a>
            </nav>
 
            {/* Right Column - Auth Controls */}
            <div className="flex items-center justify-end gap-3 sm:gap-4 whitespace-nowrap">
              {loading && (
                <div className="w-8 h-8 rounded-full border border-white/20 animate-pulse bg-white/10" />
              )}
              {!loading && user && (
                <>
                  <span className="text-[10px] sm:text-xs text-white/70 hidden sm:inline font-light">{user.email}</span>
                  <button
                    onClick={handleLogout}
                    className="text-[10px] sm:text-xs font-semibold hover:bg-white/25 px-3.5 py-1.5 border border-white/25 rounded-[6px] bg-white/15 text-white backdrop-blur-sm cursor-pointer transition-all duration-300 hover:scale-105 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                  >
                    Sair
                  </button>
                </>
              )}
              {!loading && !user && (
                <Link 
                  href="/login" 
                  className="text-[10px] sm:text-xs font-semibold hover:bg-white/25 px-4 py-2 border border-white/25 rounded-[6px] bg-white/15 text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
                >
                  Entrar
                </Link>
              )}
            </div>
          </header>
          
          {/* Content Overlay Container (phrase and buttons stacked on the bottom-left) */}
          <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 w-full max-w-7xl px-6 md:px-12 z-10 flex flex-col justify-end items-start gap-5 sm:gap-6 animate-slide-up-fade">
            
            {/* Small uppercase label above the title */}
            <span className="text-[10px] md:text-xs tracking-[0.2em] text-white/60 uppercase font-semibold">
              Plataforma de Simulação
            </span>

            {/* Phrase Side */}
            <div className="max-w-2xl lg:max-w-3xl">
              <p className="text-white/95 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-tight lg:leading-[1.12] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                <span className="word-animate" data-delay="0">Fale</span>{" "}
                <span className="word-animate" data-delay="150">com</span>{" "}
                <span className="word-animate" data-delay="300">convicção,</span>
                <br className="hidden sm:inline" />{" "}
                <span className="word-animate" data-delay="500">domine</span>{" "}
                <span className="word-animate" data-delay="650">a</span>{" "}
                <span className="word-animate" data-delay="800">entrevista.</span>
              </p>
            </div>

            {/* Buttons Side - Positioned below the phrase */}
            <div className="flex flex-row items-center gap-4 mt-2">
              <button 
                onClick={(e) => handleNavClick(e, "/interview")}
                className="group text-center text-xs sm:text-sm font-semibold text-white bg-[#0A0A41] hover:bg-[#06062d] border border-[#0A0A41] rounded-[6px] px-8 py-3.5 shadow-lg cursor-pointer transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 whitespace-nowrap min-w-[188px] h-[54px] flex items-center justify-center"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">
                  Comece sua entrevista
                </span>
              </button>
              <a 
                href="#intro"
                className="text-center text-xs sm:text-sm text-white/70 hover:text-white font-medium transition-colors px-4 py-2 hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 rounded-[4px] whitespace-nowrap"
              >
                Saiba mais
              </a>
            </div>
          </div>
        </section>
 
        {/* Intro / Animated Hero content */}
        <section id="intro" className="scroll-mt-20 border-t border-[#E5E7EB] bg-white">
          <Hero onNavClick={handleNavClick} />
        </section>
 
        {/* Feature Highlights */}
        <section className="max-w-7xl w-full mx-auto px-6 pb-20 sm:pb-32">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-left">
            <div className="p-6 rounded-[8px] border border-[#E5E7EB] bg-white shadow-none">
              <h3 className="font-semibold text-lg text-black mb-3">Prática por Voz</h3>
              <p className="mt-2 text-sm text-[#666666] leading-relaxed">
                Fale diretamente no microfone. A plataforma transcreve sua voz instantaneamente para simular a dinâmica de uma apresentação ou entrevista real.
              </p>
            </div>
            <div className="p-6 rounded-[8px] border border-[#E5E7EB] bg-white shadow-none">
              <h3 className="font-semibold text-lg text-black mb-3">Avaliações Instantâneas</h3>
              <p className="mt-2 text-sm text-[#666666] leading-relaxed">
                Receba avaliações detalhadas sobre sua clareza, confiança e precisão técnica em menos de 3 segundos com a inteligência do Gemini.
              </p>
            </div>
            <div className="p-6 rounded-[8px] border border-[#E5E7EB] bg-white shadow-none">
              <h3 className="font-semibold text-lg text-black mb-3">Painel de Liderança</h3>
              <p className="mt-2 text-sm text-[#666666] leading-relaxed">
                Monitore seu progresso executivo, reveja feedbacks anteriores e acompanhe seu histórico em uma interface limpa e profissional.
              </p>
            </div>
          </div>
        </section>
      </main>
 
      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] py-8 text-center text-xs text-[#666666] bg-white">
        <p>© 2026 PrepWell. Desenvolvido por Camila dos Santos | Curso Desenvolvimento com IA.</p>
      </footer>
    </div>
  );
}
