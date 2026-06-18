"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

export default function DashboardPage() {
  const router = useRouter();
  const [interviews, setInterviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadDashboardData = async () => {
      // 1. Verificar autenticação
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;

      if (!user) {
        // Se a URL contiver hashes de token ou parâmetros de OAuth, o Supabase ainda está processando o login.
        // Esperamos um pouco em vez de redirecionar para o login imediatamente.
        const hasOAuthParams = typeof window !== "undefined" && (
          window.location.hash.includes("access_token") || 
          window.location.hash.includes("id_token") ||
          window.location.search.includes("code=")
        );

        if (hasOAuthParams) {
          setTimeout(loadDashboardData, 500);
          return;
        }

        router.push("/login");
        return;
      }

      setUserEmail(user.email || "");

      // 2. Buscar entrevistas e feedbacks do banco
      try {
        let queryResult: any = await supabase
          .from("interviews")
          .select(`
            id,
            type,
            role,
            question,
            created_at,
            feedback (
              score
            )
          `)
          .order("created_at", { ascending: false });

        // Fallback se a coluna 'role' não existir no banco
        if (queryResult.error && queryResult.error.message.includes("column interviews.role does not exist")) {
          console.warn("Aviso: Coluna 'role' inexistente no banco. Executando fallback select sem 'role'.");
          queryResult = await supabase
            .from("interviews")
            .select(`
              id,
              type,
              question,
              created_at,
              feedback (
                score
              )
            `)
            .order("created_at", { ascending: false });
        }

        if (queryResult.error) throw queryResult.error;

        const data = queryResult.data;
        if (data && mounted) {
          const formatted = data.map((item: any) => {
            const feedbackArray = item.feedback as any[];
            const score = feedbackArray && feedbackArray.length > 0 ? feedbackArray[0].score : null;
            
            const displayType =
              item.type === "technical"
                ? "Técnica"
                : item.type === "behavioral"
                ? "Comportamental"
                : "Situacional";
            
            return {
              id: item.id,
              type: displayType,
              role: item.role || "",
              date: new Date(item.created_at).toLocaleDateString("pt-BR"),
              question: item.question,
              score,
            };
          });
          setInterviews(formatted);
        }
      } catch (e) {
        console.error("Erro ao carregar dados do dashboard:", e);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadDashboardData();

    // Ouvir mudanças de autenticação (ex: login bem sucedido)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" && session?.user && mounted) {
        loadDashboardData();
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Cálculos de métricas
  const gradedInterviews = interviews.filter((item) => item.score !== null);
  const averageScore =
    gradedInterviews.length > 0
      ? Math.round(
          gradedInterviews.reduce((acc, curr) => acc + curr.score, 0) /
            gradedInterviews.length
        )
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex justify-center items-center font-sans">
        <div className="text-center">
          <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mb-4 mx-auto" />
          <p className="text-sm font-semibold">Carregando painel…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col font-sans">
      {/* Dashboard Header */}
      <header className="border-b border-[#E5E7EB] bg-white">
        <div className="max-w-7xl w-full mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <span className="font-light tracking-widest text-sm text-[#0A0A41] uppercase cursor-pointer">PROJETO GRACE HOPPER</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-[#666666] hidden sm:inline">{userEmail}</span>
            <button
              onClick={handleLogout}
              className="text-xs font-medium px-4 py-2 border border-[#E5E7EB] rounded-[6px] hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 transition-colors cursor-pointer"
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-10 flex flex-col gap-10">
        
        {/* Upper Grid (Welcome + CTA + KPIs) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Welcome Card & CTA */}
          <div className="md:col-span-2 bg-white border border-[#E5E7EB] p-8 rounded-[8px] flex flex-col justify-between shadow-none">
            <div>
              <h1 className="text-2xl font-bold tracking-tight mb-2 text-[#0A0A41] uppercase">Seu Dashboard</h1>
              <p className="text-sm text-[#666666] leading-relaxed">
                Pratique simulados por voz de temas técnicos e comportamentais. Veja seu desempenho evoluir em tempo real.
              </p>
            </div>
            <div className="mt-6">
              <Link
                href="/interview"
                className="group inline-block rounded-[6px] bg-[#0A0A41] text-white font-semibold px-6 py-3 border border-[#0A0A41] shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-sm"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">
                  + Nova Entrevista
                </span>
              </Link>
            </div>
          </div>

          {/* Stats Box */}
          <div className="bg-white border border-[#E5E7EB] p-8 rounded-[8px] flex flex-col justify-around shadow-none">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <span className="text-sm font-medium text-[#666666]">Média Geral</span>
              <span className="text-2xl font-bold text-[#0A0A41]">{averageScore}/100</span>
            </div>
            <div className="flex items-center justify-between pt-4">
              <span className="text-sm font-medium text-[#666666]">Simulações</span>
              <span className="text-2xl font-bold text-[#0A0A41]">{interviews.length}</span>
            </div>
          </div>
        </div>

        {/* Recruiter / PM Portfolio Hub Card */}
        <div className="bg-white border border-[#E5E7EB] p-6 rounded-[8px] shadow-none flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-block px-2.5 py-0.5 rounded-[4px] text-[10px] font-bold uppercase bg-[#0A0A41]/10 text-[#0A0A41] tracking-wider">
                Modo Recrutador
              </span>
              <span className="text-xs text-[#666666] font-medium">Artefatos de Produto & Planejamento</span>
            </div>
            <h2 className="text-base font-bold text-[#0A0A41] uppercase mb-1">Central de Engenharia & Produto</h2>
            <p className="text-xs text-[#666666] leading-relaxed">
              Acesse a documentação completa do MVP: especificações do Confluence, backlog priorizado no Jira e mapeamento visual no Miro.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3 w-full md:w-auto justify-start md:justify-end">
            <a
              href="https://camiladossantoscontact.atlassian.net/wiki/x/sYB6"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 border border-[#E5E7EB] rounded-[6px] bg-[#F9FAFB] text-[#0A0A41] hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 transition-all cursor-pointer whitespace-nowrap"
            >
              📘 Confluence PRD & Case
            </a>
            <a
              href="https://github.com/camiladossantos-alt/Grace-hopper"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 border border-[#E5E7EB] rounded-[6px] bg-[#F9FAFB] text-[#0A0A41] hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 transition-all cursor-pointer whitespace-nowrap"
            >
              🎫 Jira Backlog (Gherkin)
            </a>
            <a
              href="https://github.com/camiladossantos-alt/Grace-hopper/blob/main/docs/portfolio/miro-boards-blueprint.md"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 text-xs font-semibold px-4 py-2.5 border border-[#E5E7EB] rounded-[6px] bg-[#F9FAFB] text-[#0A0A41] hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 transition-all cursor-pointer whitespace-nowrap"
            >
              🎨 Miro Journey & Canvas
            </a>
          </div>
        </div>

        {/* History List Section */}
        <div className="bg-white border border-[#E5E7EB] rounded-[8px] p-6 shadow-none">
          <h2 className="text-lg font-bold mb-6 text-[#0A0A41] uppercase">Histórico de Práticas</h2>
          
          {interviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#666666] mb-4">Nenhuma entrevista realizada ainda.</p>
              <Link
                href="/interview"
                className="group inline-block rounded-[6px] bg-[#0A0A41] text-white font-semibold px-6 py-2.5 border border-[#0A0A41] transition-all duration-300 text-sm cursor-pointer"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">
                  Iniciar minha primeira prática
                </span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#E5E7EB] text-sm font-semibold text-[#666666]">
                    <th className="py-4">Data</th>
                    <th className="py-4">Categoria</th>
                    <th className="py-4 hidden sm:table-cell">Pergunta</th>
                    <th className="py-4 text-center">Pontuação</th>
                    <th className="py-4 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] text-sm">
                  {interviews.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 font-medium text-black">{item.date}</td>
                       <td className="py-4">
                        <div className="flex flex-col gap-1 items-start">
                          <span className="inline-block px-2.5 py-0.5 rounded-[4px] text-xs font-medium border border-[#E5E7EB] bg-gray-50 text-[#0A0A41]">
                            {item.type}
                          </span>
                          {item.role && (
                            <span className="text-[10px] text-[#666666] font-medium leading-tight block truncate max-w-[120px] sm:max-w-none" title={item.role}>
                              {item.role}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 max-w-xs truncate hidden sm:table-cell text-[#666666]">
                        {item.question}
                      </td>
                      <td className="py-4 text-center font-bold text-[#0A0A41]">
                        {item.score !== null ? item.score : <span className="text-xs font-normal text-[#999999]">Pendente</span>}
                      </td>
                      <td className="py-4 text-right">
                        {item.score !== null ? (
                          <Link
                            href={`/feedback/${item.id}`}
                            className="inline-block text-xs font-semibold px-3.5 py-1.5 border border-[#E5E7EB] rounded-[6px] bg-white text-[#0A0A41] hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 transition-all cursor-pointer"
                          >
                            Ver Análise
                          </Link>
                        ) : (
                          <Link
                            href={`/interview/${item.id}`}
                            className="group inline-block text-xs font-semibold px-3.5 py-1.5 border border-[#0A0A41] rounded-[6px] bg-[#0A0A41] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 transition-all cursor-pointer"
                          >
                            <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">
                              Responder
                            </span>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6 text-center text-xs text-foreground/60 bg-card">
        <p>© 2026 PrepWell. Desenvolvido por Camila dos Santos.</p>
      </footer>
    </div>
  );
}
