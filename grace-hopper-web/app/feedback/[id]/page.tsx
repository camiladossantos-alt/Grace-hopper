"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

export default function FeedbackPage({ params }: { params: any }) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("strengths");
  const [loading, setLoading] = useState(true);
  const [feedbackData, setFeedbackData] = useState<any>(null);

  // 0. Unwrap params safely (handles both Promise and plain object)
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setId(resolved.id);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!id) return;
    const fetchFeedback = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("feedback")
          .select(`
            score,
            strengths,
            improvements,
            communication_feedback,
            technical_feedback,
            interviews (
              question,
              transcript
            )
          `)
          .eq("interview_id", id)
          .single();

        if (error) throw error;

        if (data) {
          const interviewObj = data.interviews as any;
          setFeedbackData({
            score: data.score,
            question: interviewObj?.question || "Não encontrada",
            answer: interviewObj?.transcript || "Sem resposta gravada",
            strengths: Array.isArray(data.strengths) ? data.strengths : [],
            improvements: Array.isArray(data.improvements) ? data.improvements : [],
            communication: data.communication_feedback,
            technical: data.technical_feedback,
          });
        }
      } catch (err) {
        console.error("Erro ao carregar feedback:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, [id, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex justify-center items-center font-sans">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4 mx-auto" />
          <p className="text-sm font-semibold">Carregando análise…</p>
        </div>
      </div>
    );
  }

  if (!feedbackData) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col justify-center items-center font-sans px-6">
        <div className="text-center bg-card border border-border p-8 rounded-2xl max-w-md">
          <h2 className="text-xl font-bold mb-2">Análise não encontrada</h2>
          <p className="text-sm text-foreground/75 mb-6 leading-relaxed">
            Não conseguimos localizar o relatório de feedback correspondente a esta entrevista.
          </p>
          <Link
            href="/dashboard"
            className="inline-block rounded-full bg-primary text-foreground font-semibold px-6 py-2 border border-border hover:opacity-90"
          >
            Voltar ao Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const renderFeedbackText = (text: string) => {
    if (!text) return null;
    const parts = text.split("Sugestões de frases:");
    const mainText = parts[0];
    const suggestions = parts[1];

    return (
      <div className="space-y-4">
        <p className="text-[#666666] whitespace-pre-line leading-relaxed">{mainText.trim()}</p>
        {suggestions && (
          <div className="mt-4 p-4 rounded-[8px] border border-blue-100 bg-[#F4F7FC]">
            <span className="text-xs font-bold block mb-2 text-[#0A0A41] uppercase tracking-wider flex items-center gap-1.5">
              <span>💡</span> Frases Sugeridas (Como dizer isso melhor):
            </span>
            <div className="text-xs sm:text-sm text-[#4A4A6A] whitespace-pre-line leading-relaxed pl-5">
              {suggestions.trim()}
            </div>
          </div>
        )}
      </div>
    );
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
            ← Voltar ao Dashboard
          </Link>
        </div>
      </header>

      {/* Content Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-6 py-12 flex flex-col gap-8">
        
        {/* Top Header Card */}
        <div className="bg-white border border-[#E5E7EB] p-8 rounded-[8px] shadow-none flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <span className="text-xs font-bold text-[#0A0A41] uppercase tracking-wider block mb-1">
              Feedback Concluído
            </span>
            <h1 className="text-2xl font-bold mb-2 text-black">Sua Prática foi Avaliada!</h1>
            <p className="text-sm text-[#666666] leading-relaxed max-w-xl">
              <span className="font-semibold text-black">Pergunta:</span> "{feedbackData.question}"
            </p>
          </div>

          {/* Visual Score Ring */}
          <div className="w-28 h-28 rounded-full border-4 border-[#0A0A41] flex flex-col items-center justify-center bg-white shrink-0 shadow-inner">
            <span className="text-3xl font-extrabold text-[#0A0A41]">{feedbackData.score}</span>
            <span className="text-[10px] text-[#666666] uppercase tracking-widest font-semibold">Score</span>
          </div>
        </div>

        {/* Categories Tab Selector */}
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-6 shadow-none">
          
          {/* Tabs header */}
          <div className="flex border-b border-[#E5E7EB] mb-6 overflow-x-auto gap-2">
            <button
              onClick={() => setActiveTab("strengths")}
              className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors duration-200 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 rounded-[4px] ${
                activeTab === "strengths" ? "border-[#0A0A41] text-black" : "border-transparent text-[#666666] hover:text-black"
              }`}
            >
              Pontos Fortes
            </button>
            <button
              onClick={() => setActiveTab("improvements")}
              className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors duration-200 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 rounded-[4px] ${
                activeTab === "improvements" ? "border-[#0A0A41] text-black" : "border-transparent text-[#666666] hover:text-black"
              }`}
            >
              Melhorias
            </button>
            <button
              onClick={() => setActiveTab("technical")}
              className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors duration-200 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 rounded-[4px] ${
                activeTab === "technical" ? "border-[#0A0A41] text-black" : "border-transparent text-[#666666] hover:text-black"
              }`}
            >
              Precisão Técnica
            </button>
            <button
              onClick={() => setActiveTab("communication")}
              className={`pb-3 px-4 font-semibold text-sm border-b-2 transition-colors duration-200 shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 rounded-[4px] ${
                activeTab === "communication" ? "border-[#0A0A41] text-black" : "border-transparent text-[#666666] hover:text-black"
              }`}
            >
              Comunicação
            </button>
          </div>

          {/* Tab content wrapper */}
          <div className="min-h-[160px] text-sm leading-relaxed">
            
            {activeTab === "strengths" && (
              feedbackData.strengths.length === 0 ? (
                <p className="text-[#666666] italic">Nenhum ponto forte identificado.</p>
              ) : (
                <ul className="list-disc pl-5 flex flex-col gap-3">
                  {feedbackData.strengths.map((str: string, idx: number) => (
                    <li key={idx} className="text-[#666666]">{str}</li>
                  ))}
                </ul>
              )
            )}

            {activeTab === "improvements" && (
              feedbackData.improvements.length === 0 ? (
                <p className="text-[#666666] italic">Nenhuma melhoria sugerida necessária!</p>
              ) : (
                <ul className="list-disc pl-5 flex flex-col gap-3">
                  {feedbackData.improvements.map((imp: string, idx: number) => (
                    <li key={idx} className="text-[#666666]">{imp}</li>
                  ))}
                </ul>
              )
            )}

            {activeTab === "technical" && (
              <div>
                {renderFeedbackText(feedbackData.technical)}
                <div className="mt-4 p-4 rounded-[6px] border border-[#E5E7EB] bg-gray-50">
                  <span className="text-xs font-semibold block text-[#0A0A41] mb-1">Sua resposta enviada:</span>
                  <p className="italic text-xs text-[#666666]">"{feedbackData.answer}"</p>
                </div>
              </div>
            )}

            {activeTab === "communication" && (
              renderFeedbackText(feedbackData.communication)
            )}

          </div>
        </div>

        {/* CTA Footer buttons */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-4">
          <Link
            href="/interview"
            className="group w-full sm:w-auto rounded-[6px] bg-[#0A0A41] text-white font-semibold px-8 py-3.5 border border-[#0A0A41] transition-all hover:bg-[#0A0A41]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 text-center cursor-pointer shadow-sm"
          >
            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">
              Praticar Novamente
            </span>
          </Link>
          <Link
            href="/dashboard"
            className="w-full sm:w-auto rounded-[6px] border border-[#E5E7EB] bg-white text-[#0A0A41] hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 font-semibold px-8 py-3.5 transition-colors duration-200 text-center cursor-pointer"
          >
            Ir ao Dashboard
          </Link>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-foreground/60 bg-card">
        <p>© 2026 PrepWell. Desenvolvido por Camila dos Santos.</p>
      </footer>
    </div>
  );
}
