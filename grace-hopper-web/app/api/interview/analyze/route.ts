import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const geminiApiKey = process.env.GEMINI_API_KEY;
  const isLiteMode = process.env.NEXT_PUBLIC_LITE_MODE === "true";

  if (!supabaseUrl || !supabaseAnonKey || (!isLiteMode && !geminiApiKey)) {
    return NextResponse.json(
      { error: "Credenciais de API não configuradas no servidor." },
      { status: 500 }
    );
  }

  // CSRF Protection: Validate request origin matches host domain
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host) {
    try {
      const originUrl = new URL(origin);
      if (originUrl.host !== host) {
        return NextResponse.json(
          { error: "Requisição negada por política de segurança (CSRF)." },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json({ error: "Origem inválida." }, { status: 400 });
    }
  }

  // 1. Validar autenticação do usuário
  const cookieStore = await cookies();
  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  try {
    const { interviewId, transcript } = await request.json();

    if (!interviewId || !transcript) {
      return NextResponse.json(
        { error: "Parâmetros obrigatórios ausentes." },
        { status: 400 }
      );
    }

    // Input Validation: Check UUID format of interviewId and enforce transcript length limit
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(interviewId)) {
      return NextResponse.json(
        { error: "Identificador de entrevista inválido." },
        { status: 400 }
      );
    }

    if (transcript.length > 10000) {
      return NextResponse.json(
        { error: "A transcrição excede o tamanho máximo permitido." },
        { status: 400 }
      );
    }

    // 2. Buscar a entrevista para garantir que pertence ao usuário
    const { data: interview, error: fetchError } = await supabase
      .from("interviews")
      .select("*")
      .eq("id", interviewId)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !interview) {
      return NextResponse.json(
        { error: "Simulação de entrevista não encontrada." },
        { status: 404 }
      );
    }

    let feedbackJson: any;

    if (isLiteMode) {
      // Calcular score dinâmico baseado no tamanho da resposta para parecer real, ou simplesmente entre 75 e 92
      const wordCount = transcript.trim().split(/\s+/).length;
      const baseScore = wordCount < 10 ? 65 : wordCount < 30 ? 82 : 91;
      const randomOffset = Math.floor(Math.random() * 8) - 3; // -3 a +4
      const score = Math.max(50, Math.min(100, baseScore + randomOffset));

      let strengths: string[] = [];
      let improvements: string[] = [];
      let communication_feedback = "";
      let technical_feedback = "";

      if (interview.type === "technical") {
        strengths = [
          "Demonstrou bom vocabulário técnico e clareza na explicação dos conceitos.",
          "Abordagem focada em performance e organização do código.",
          "Boa citação de ferramentas e padrões modernos da indústria."
        ];
        improvements = [
          "Poderia detalhar melhor a diferença prática no uso diário dessas tecnologias.",
          "Sentimos falta de mencionar exemplos específicos de projetos anteriores."
        ];
        communication_feedback = "Excelente clareza na fala e uso preciso do vocabulário técnico. A articulação das ideias foi fluida e seguiu um raciocínio lógico bem estruturado.\n\nSugestões de frases:\n- \"Para estruturar meu raciocínio, dividirei a solução em três pilares fundamentais...\"\n- \"Gostaria de destacar que a escolha deste padrão visa facilitar a manutenção do código por outros desenvolvedores.\"";
        technical_feedback = "Boa base conceitual sobre o assunto. Demonstrou conhecimento das vantagens e desvantagens de cada opção de arquitetura discutida.\n\nSugestões de frases:\n- \"Utilizar essa tecnologia reduz o overhead de renderização no client-side, otimizando o First Contentful Paint.\"\n- \"A principal desvantagem dessa abordagem é a consistência eventual, que podemos mitigar usando filas de mensageria.\"";
      } else if (interview.type === "behavioral") {
        strengths = [
          "Ótima capacidade de autoanálise e transparência ao relatar erros e aprendizados.",
          "Foco na colaboração e respeito mútuo com colegas de equipe.",
          "Demonstração clara de inteligência emocional e resiliência."
        ];
        improvements = [
          "Poderia usar o método STAR (Situação, Tarefa, Ação, Resultado) de forma mais estruturada.",
          "Tente focar mais no seu papel específico na resolução do problema."
        ];
        communication_feedback = "Tom de voz calmo e profissional. A comunicação foi objetiva e demonstrou excelente inteligência emocional ao abordar tópicos sensíveis.\n\nSugestões de frases:\n- \"Compreendo o ponto de vista do meu colega e procurei focar no impacto que a solução traria para o cliente final.\"\n- \"Minha intenção ao propor esse feedback foi estabelecer um canal aberto e transparente para melhoria mútua.\"";
        technical_feedback = "Embora a pergunta seja comportamental, o alinhamento com as práticas ágeis e cultura de engenharia de software foi evidente e adequado.\n\nSugestões de frases:\n- \"Adotamos reuniões de alinhamento diárias para garantir que nenhum impedimento técnico ficasse sem resolução por mais de 24 horas.\"\n- \"Mensurei o sucesso do projeto através de métricas de entrega como lead time e taxa de bugs em produção.\"";
      } else {
        // situational
        strengths = [
          "Foco rápido na mitigação de riscos e comunicação clara com stakeholders.",
          "Atitude pragmática e calma diante de cenários de alta pressão.",
          "Priorização correta do cliente e da estabilidade do sistema."
        ];
        improvements = [
          "Poderia descrever com mais detalhes o plano de rollback ou contingência de segurança.",
          "Tente incluir o alinhamento com outros membros do time de infraestrutura."
        ];
        communication_feedback = "Narrativa clara e objetiva. A estrutura da resposta transmitiu segurança e foco em soluções eficientes de comunicação.\n\nSugestões de frases:\n- \"Minha primeira ação foi comunicar todos os stakeholders sobre o incidente e o tempo estimado de resolução.\"\n- \"Mantenho um tom calmo e transparente para assegurar ao time que estamos seguindo o plano de contingência.\"";
        technical_feedback = "A abordagem para restaurar o serviço foi tecnicamente correta, focando primeiro no restabelecimento da aplicação e depois na análise de causa raiz.\n\nSugestões de frases:\n- \"Iniciamos o rollback imediato da última versão enquanto coletamos os logs do container afetado para análise pós-incidente.\"\n- \"A causa raiz foi identificada na conexão com o banco de dados, então implementamos um mecanismo de retry com exponential backoff.\"";
      }

      feedbackJson = {
        score,
        strengths,
        improvements,
        communication_feedback,
        technical_feedback
      };
    } else {
      // 3. Chamar o Gemini para analisar a resposta (forçando saída JSON)
      const genAI = new GoogleGenerativeAI(geminiApiKey!);
      const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
      const model = genAI.getGenerativeModel({
        model: geminiModel,
        generationConfig: {
          responseMimeType: "application/json",
        },
      });

      const prompt = `Você é um avaliador técnico e de comunicação de TI de alto nível.
Analise a resposta do candidato para a pergunta fornecida abaixo.

Pergunta de Entrevista (Tipo: ${interview.type}):
"${interview.question}"

Resposta Falada/Transcrita do Candidato:
"${transcript}"

Analise o desempenho e retorne um feedback detalhado estritamente no formato JSON abaixo:
{
  "score": 80, // nota numérica de 0 a 100 baseada na qualidade e clareza da resposta
  "strengths": ["ponto forte 1", "ponto forte 2", "ponto forte 3"], // lista de até 3 pontos fortes
  "improvements": ["ponto de melhoria 1", "ponto de melhoria 2"], // lista de até 2 pontos a melhorar
  "communication_feedback": "Análise da comunicação. No final do texto, adicione exatamente duas quebras de linha (\\n\\n) seguidas da palavra 'Sugestões de frases:' e uma lista com exatamente 2 pequenas frases profissionais exemplares (entre aspas e iniciadas por hífen) que o candidato poderia falar.",
  "technical_feedback": "Análise técnica. No final do texto, adicione exatamente duas quebras de linha (\\n\\n) seguidas da palavra 'Sugestões de frases:' e uma lista com exatamente 2 pequenas frases técnicas exemplares (entre aspas e iniciadas por hífen) que o candidato poderia falar."
}

Exemplo de formato para o final dos campos de feedback:
"Texto da análise...\\n\\nSugestões de frases:\\n- \\"Frase sugerida 1\\"\\n- \\"Frase sugerida 2\\""

Responda tudo em português (pt-BR).`;

      const result = await model.generateContent(prompt);
      const feedbackText = result.response.text().trim();
      feedbackJson = JSON.parse(feedbackText);
    }

    // Usar o service_role para contornar possíveis restrições de RLS de UPDATE/INSERT
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const adminSupabase = serviceRoleKey
      ? createClient(supabaseUrl, serviceRoleKey)
      : supabase;

    // 4. Salvar a transcrição no registro de entrevistas
    const { error: updateError } = await adminSupabase
      .from("interviews")
      .update({ transcript })
      .eq("id", interviewId);

    if (updateError) throw updateError;

    // 5. Salvar o feedback no banco de dados
    const { data: feedback, error: insertError } = await adminSupabase
      .from("feedback")
      .insert({
        interview_id: interviewId,
        score: feedbackJson.score,
        strengths: feedbackJson.strengths,
        improvements: feedbackJson.improvements,
        communication_feedback: feedbackJson.communication_feedback,
        technical_feedback: feedbackJson.technical_feedback,
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return NextResponse.json({
      interviewId,
      feedbackId: feedback.id,
      score: feedback.score,
      strengths: feedback.strengths,
      improvements: feedback.improvements,
      communication_feedback: feedback.communication_feedback,
      technical_feedback: feedback.technical_feedback,
    });
  } catch (error: any) {
    console.error("Erro ao analisar resposta com IA:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno do servidor ao processar análise." },
      { status: 500 }
    );
  }
}
