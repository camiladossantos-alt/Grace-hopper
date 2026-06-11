"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MoveRight, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

interface HeroProps {
  onNavClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => void;
}

function Hero({ onNavClick }: HeroProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    checkUser();
  }, []);

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>, href: string) => {
    if (onNavClick) {
      onNavClick(e, href);
    } else {
      router.push(href);
    }
  };

  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => ["líder", "confiante", "executivo", "preparado", "protagonista"],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="w-full">
      <div className="container mx-auto px-6">
        <div className="flex gap-8 py-20 lg:py-24 items-center justify-center flex-col">
          <div className="flex gap-4 flex-col text-center">
            <h1 className="text-4xl md:text-6xl max-w-4xl tracking-tighter text-center font-regular leading-[1.15] text-black">
              <span>Treine sua comunicação para se tornar</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center h-[55px] md:h-[80px] md:pb-4 md:pt-1 text-[#0A0A41]">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-semibold text-[#0A0A41]"
                    initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -100 }}
                    transition={shouldReduceMotion ? { duration: 0.1 } : { type: "spring", stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: shouldReduceMotion ? 0 : (index === (titleNumber - 1 + titles.length) % titles.length ? -150 : 150),
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h1>

            <p className="text-base md:text-lg leading-relaxed tracking-tight text-[#666666] max-w-2xl text-center mx-auto mt-4">
              Simule entrevistas reais de voz para as vagas mais exigentes do mercado. Treine sua fala, reduza o nervosismo e receba feedbacks estruturados de oratória e precisão técnica em segundos.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full sm:w-auto items-center justify-center px-4">
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto gap-4 text-xs font-semibold px-6 py-3.5 border border-[#E5E7EB] bg-white text-[#0A0A41] hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 cursor-pointer rounded-[6px]"
              onClick={(e) => handleButtonClick(e, "/dashboard")}
            >
              Ver Histórico <History className="w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              className="w-full sm:w-auto gap-4 text-xs font-semibold px-8 py-3.5 bg-[#0A0A41] text-white hover:bg-[#0A0A41]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 cursor-pointer rounded-[6px]"
              onClick={(e) => handleButtonClick(e, "/interview")}
            >
              Iniciar Treino <MoveRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Hero };
