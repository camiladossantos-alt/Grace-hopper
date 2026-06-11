"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

const categories = [
  {
    id: "technical",
    title: "Técnica",
    description: "Perguntas de código, lógica, arquitetura e conceitos fundamentais de desenvolvimento de software.",
    badge: "Essencial",
  },
  {
    id: "behavioral",
    title: "Comportamental",
    description: "Avalie suas soft skills, resolução de conflitos, trabalho em equipe e situações passadas (técnica STAR).",
    badge: "Diferencial",
  },
  {
    id: "situational",
    title: "Situacional",
    description: "Como você agiria sob pressão ou em cenários hipotéticos difíceis no dia a dia da engenharia.",
    badge: "Foco",
  },
];

export default function InterviewSelectPage() {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [role, setRole] = useState("");
  const [recentRoles, setRecentRoles] = useState<string[]>([]);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const loadUserAndRoles = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && user.email) {
        setUserEmail(user.email);
        const stored = localStorage.getItem(`grace-hopper-roles-${user.email}`);
        if (stored) {
          try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setRecentRoles(parsed);
              setRole(parsed[0]); // Auto-fill with the most recent one
            }
          } catch (e) {
            console.error("Error parsing recent roles:", e);
          }
        }
      }
    };
    loadUserAndRoles();
  }, []);

  const handleStart = async (type: string) => {
    setLoadingId(type);
    const trimmedRole = role.trim();

    // Save to recent roles in localStorage keyed by profile email
    if (trimmedRole && userEmail) {
      const storageKey = `grace-hopper-roles-${userEmail}`;
      const updated = [trimmedRole, ...recentRoles.filter((r) => r !== trimmedRole)].slice(0, 2);
      localStorage.setItem(storageKey, JSON.stringify(updated));
    }

    try {
      const response = await fetch("/api/interview/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, role: trimmedRole || undefined }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 429 || response.status === 503 || (data.error && (data.error.toLowerCase().includes("limit") || data.error.toLowerCase().includes("quota")))) {
          throw new Error("Ihhh, tem muita gente querendo fazer entrevista agora! Espere um minutinho e tente novamente. ⏳");
        }
        throw new Error(data.error || "Erro desconhecido.");
      }
      window.location.href = `/interview/${data.id}`;
    } catch (e: any) {
      console.error(e);
      alert(e.message.startsWith("Ihhh") ? e.message : "Erro ao iniciar a entrevista: " + e.message);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-[#E5E7EB] bg-white">
        <div className="max-w-7xl w-full mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="flex items-center gap-2">
            <span className="font-light tracking-widest text-sm text-[#0A0A41] uppercase">PROJETO GRACE HOPPER</span>
          </Link>
          <Link 
            href="/dashboard" 
            className="text-xs font-medium px-4 py-2 border border-[#E5E7EB] rounded-[6px] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            ← Voltar ao Painel
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-12 flex flex-col justify-center">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h1 className="text-2xl font-bold tracking-tight mb-3 text-[#0A0A41] uppercase">Escolha o Tema da Simulação</h1>
          <p className="text-[#666666] leading-relaxed text-sm">
            Nossa IA gerará uma pergunta sob medida para o tema selecionado. Você responderá por voz e receberá a análise em tempo real.
          </p>
        </div>

        {/* Cargo Input Box */}
        <div className="max-w-2xl w-full mx-auto bg-white border border-[#E5E7EB] p-6 rounded-[8px] shadow-none mb-10 text-left">
          <label htmlFor="role-input" className="text-sm font-semibold text-[#666666] mb-2 block">
            Qual cargo ou tecnologia deseja praticar? (Opcional)
          </label>
          <input
            id="role-input"
            type="text"
            className="w-full rounded-[6px] border border-[#E5E7EB] px-5 py-3 bg-white text-sm focus:outline-none focus:border-[#0A0A41] transition-all duration-200"
            placeholder="Ex: Desenvolvedor React Frontend Junior, Engenheiro de Dados Pleno, QA Analyst..."
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          {recentRoles.length > 0 && (
            <div className="mt-3 flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-[#666666]">Últimos cargos praticados:</span>
              {recentRoles.map((r, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`text-xs px-3 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
                    role === r
                      ? "bg-[#0A0A41] text-white border-[#0A0A41]"
                      : "bg-gray-50 text-[#0A0A41] border-[#E5E7EB] hover:bg-gray-100"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          )}
          <p className="text-[11px] text-[#999999] mt-2.5 leading-relaxed">
            Se preenchido, a Inteligência Artificial personalizará as perguntas técnicas, comportamentais e situacionais especificamente para o cargo indicado.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="bg-white border border-[#E5E7EB] p-6 rounded-[8px] flex flex-col justify-between shadow-none hover:border-[#0A0A41]/50 transition-all duration-200"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold border border-[#E5E7EB] bg-gray-50 text-[#0A0A41] uppercase tracking-wider">
                    {cat.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 text-[#0A0A41]">{cat.title}</h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-8">
                <button
                  disabled={loadingId !== null}
                  onClick={() => handleStart(cat.id)}
                  className="group w-full inline-block text-center rounded-[6px] bg-[#0A0A41] text-white font-semibold py-2.5 border border-[#0A0A41] transition-all duration-300 text-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                >
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">
                    {loadingId === cat.id ? "Carregando..." : "Iniciar Prática"}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] py-6 text-center text-xs text-[#666666] bg-white">
        <p>© 2026 PrepWell. Desenvolvido por Camila dos Santos.</p>
      </footer>
    </div>
  );
}
