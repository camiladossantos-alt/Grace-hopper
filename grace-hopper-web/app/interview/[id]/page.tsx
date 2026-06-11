"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/app/utils/supabase";

export default function InterviewSessionPage({ params }: { params: any }) {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [questionText, setQuestionText] = useState("Carregando pergunta…");
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [timer, setTimer] = useState(0);
  const [recognition, setRecognition] = useState<any>(null);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 0. Unwrap params safely (handles both Promise and plain object)
  useEffect(() => {
    const resolveParams = async () => {
      const resolved = await params;
      setId(resolved.id);
    };
    resolveParams();
  }, [params]);

  // 1. Carregar a pergunta real do banco de dados
  useEffect(() => {
    if (!id) return;
    const fetchQuestion = async () => {
      try {
        const { data, error } = await supabase
          .from("interviews")
          .select("question")
          .eq("id", id)
          .single();

        if (error) throw error;
        if (data) {
          setQuestionText(data.question);
        }
      } catch (err: any) {
        console.error(err);
        setQuestionText("Erro ao carregar a pergunta. Verifique sua conexão.");
      }
    };
    fetchQuestion();
  }, [id]);

  // 2. Configurar a Web Speech API
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = "pt-BR";

        rec.onresult = (event: any) => {
          let currentTranscript = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              currentTranscript += event.results[i][0].transcript;
            }
          }
          if (currentTranscript) {
            setTranscript((prev) => {
              if (prev === "Ouvindo... Fale agora." || prev.startsWith("Simulando")) {
                return currentTranscript;
              }
              return (prev + " " + currentTranscript).trim();
            });
          }
        };

        rec.onerror = (event: any) => {
          console.error("Erro no reconhecimento de fala:", event.error);
          if (event.error === "not-allowed") {
            setErrorMsg("Acesso ao microfone negado pelo navegador. Por favor, permita o acesso nas configurações de privacidade.");
          } else if (event.error === "audio-capture") {
            setErrorMsg("Falha ao capturar áudio. Verifique se o seu microfone está conectado e se não está em uso por outro aplicativo (como Discord, Teams ou outra aba).");
          } else if (event.error === "no-speech") {
            setErrorMsg("Nenhuma fala detectada. Fale mais próximo ao microfone ou ajuste o volume de entrada.");
          } else {
            setErrorMsg(`Erro na gravação: ${event.error}. Você também pode digitar sua resposta diretamente na caixa abaixo.`);
          }
          setIsRecording(false);
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        setRecognition(rec);
      }
    }
  }, []);

  // 3. Cronômetro da gravação
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      setTimer(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecording = () => {
    setErrorMsg("");
    if (recognition) {
      try {
        setTranscript("Ouvindo... Fale agora.");
        recognition.start();
        setIsRecording(true);
      } catch (e) {
        console.error(e);
      }
    } else {
      setErrorMsg("O reconhecimento de voz não é suportado pelo seu navegador atual. Você pode digitar sua resposta abaixo.");
    }
  };

  const handleStopRecording = () => {
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        console.error(e);
      }
    }
    setIsRecording(false);
  };

  const handleClear = () => {
    setTranscript("");
    setIsRecording(false);
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim() || submitting) return;

    setSubmitting(true);
    setErrorMsg("");

    try {
      const response = await fetch("/api/interview/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interviewId: id,
          transcript,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Erro ao analisar.");
      }

      router.push(`/feedback/${id}`);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "Erro de rede ao enviar resposta.");
      setSubmitting(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-[#E5E7EB] bg-white">
        <div className="max-w-7xl w-full mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="font-light tracking-widest text-sm text-[#0A0A41] uppercase">PROJETO GRACE HOPPER</span>
          </div>
          <Link 
            href="/interview" 
            className="text-xs font-medium px-4 py-2 border border-[#E5E7EB] rounded-[6px] hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 transition-colors cursor-pointer"
          >
            ← Cancelar Simulação
          </Link>
        </div>
      </header>

      {/* Main Experience */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-6 py-12 flex flex-col justify-center gap-8">
        
        {/* Question Panel */}
        <div className="bg-white border border-[#E5E7EB] p-8 rounded-[8px] shadow-none">
          <span className="text-xs uppercase tracking-wider font-semibold text-[#0A0A41] block mb-2">
            Pergunta do Entrevistador
          </span>
          <h2 className="text-2xl font-bold leading-snug text-black">{questionText}</h2>
        </div>

        {/* Recording Flow / Controls */}
        <div className="bg-white border border-[#E5E7EB] p-8 rounded-[8px] shadow-none text-center flex flex-col items-center">
          
          {/* Animated sound wave simulation */}
          {isRecording ? (
            <div className="flex items-center gap-1.5 h-10 mb-4">
              <span className="w-1 bg-[#0A0A41] rounded-full animate-bounce h-8" style={{ animationDelay: "0.1s" }} />
              <span className="w-1 bg-[#0A0A41] rounded-full animate-bounce h-5" style={{ animationDelay: "0.2s" }} />
              <span className="w-1 bg-[#0A0A41] rounded-full animate-bounce h-9" style={{ animationDelay: "0.3s" }} />
              <span className="w-1 bg-[#0A0A41] rounded-full animate-bounce h-6" style={{ animationDelay: "0.4s" }} />
              <span className="w-1 bg-[#0A0A41] rounded-full animate-bounce h-8" style={{ animationDelay: "0.5s" }} />
            </div>
          ) : (
            <div className="h-10 mb-4 flex items-center text-[#666666]/65 text-sm">
              Pronto para gravar sua resposta
            </div>
          )}

          {/* Timer display */}
          <div className="text-2xl font-bold tracking-mono mb-6 text-black">
            {formatTime(timer)}
          </div>

          {/* Interactive Button */}
          <div className="flex gap-4 mb-8">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                disabled={submitting}
                className="group w-16 h-16 rounded-[6px] bg-[#0A0A41] text-white flex items-center justify-center shadow-md border border-[#0A0A41] hover:bg-[#0A0A41]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 transition-all disabled:opacity-50 cursor-pointer"
                title="Gravar"
              >
                <svg className="w-6 h-6 text-white transition-transform duration-300 group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="w-16 h-16 rounded-[6px] bg-[#D83B01] text-white hover:opacity-95 flex items-center justify-center shadow-md border border-[#D83B01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D83B01] focus-visible:ring-offset-2 transition-all cursor-pointer"
                title="Pausar"
              >
                <svg className="w-6 h-6 text-white fill-current" viewBox="0 0 24 24">
                  <rect x="6" y="6" width="12" height="12" rx="1" />
                </svg>
              </button>
            )}
            
            {transcript && (
              <button
                onClick={handleClear}
                disabled={submitting}
                className="w-16 h-16 rounded-[6px] bg-white hover:bg-red-50 hover:border-red-200 flex items-center justify-center border border-[#E5E7EB] text-gray-500 hover:text-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                title="Limpar"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 rounded-[6px] bg-red-100 border border-red-300 text-red-700 text-xs text-left w-full">
              {errorMsg}
            </div>
          )}

          {/* Transcript Box */}
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <div className="w-full text-left">
              <label htmlFor="transcript" className="text-xs font-semibold text-[#666666] mb-1.5 block">
                Transcrição em Tempo Real (você pode editar manualmente se necessário):
              </label>
              <textarea
                id="transcript"
                disabled={submitting}
                className="w-full min-h-[120px] rounded-[6px] border border-[#E5E7EB] p-4 bg-white text-sm leading-relaxed resize-none focus:outline-none focus:border-[#0A0A41] focus-visible:ring-2 focus-visible:ring-[#0A0A41] disabled:opacity-75 text-black"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Clique no microfone para falar ou digite sua resposta diretamente aqui, por exemplo: 'Eu utilizaria o hook useEffect para…'"
              />
            </div>

            {/* Submit Actions */}
            <div className="flex justify-end gap-3">
              <button
                type="submit"
                disabled={!transcript.trim() || submitting}
                className="group rounded-[6px] bg-[#0A0A41] text-white font-semibold px-6 py-2.5 border border-[#0A0A41] hover:bg-[#0A0A41]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0A0A41] focus-visible:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-sm cursor-pointer shadow-sm"
              >
                <span className="inline-block transition-transform duration-300 group-hover:-translate-x-1.5">
                  {submitting ? "Analisando com IA…" : "Enviar Resposta →"}
                </span>
              </button>
            </div>
          </form>
        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] py-6 text-center text-xs text-[#666666] bg-white">
        <p>© 2026 PrepWell. Desenvolvido por Camila dos Santos.</p>
      </footer>
    </div>
  );
}
