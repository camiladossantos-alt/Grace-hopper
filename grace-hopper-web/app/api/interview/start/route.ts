import { createServerClient } from "@supabase/ssr";
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

  try {
    const { type, role } = await request.json();
    console.log("DEBUG: Start request received. Type:", type, "Role:", role);

    // 1. Validar autenticação do usuário
    console.log("DEBUG: Checking cookies and initializing Supabase client...");
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

    console.log("DEBUG: Getting user session from Supabase auth...");
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      console.log("DEBUG: User is NOT authenticated! Returning 401.");
      return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
    }

    console.log("DEBUG: User authenticated successfully:", user.email);

    if (!type || !["technical", "behavioral", "situational"].includes(type)) {
      console.log("DEBUG: Invalid interview type:", type);
      return NextResponse.json(
        { error: "Tipo de entrevista inválido." },
        { status: 400 }
      );
    }

    let questionText = "";

    if (isLiteMode) {
      console.log("DEBUG: Lite Mode is active. Selecting mock question...");
      const mockQuestions: Record<string, string[]> = {
        technical: [
          "Como você gerenciaria o estado global de uma aplicação React complexa e quais critérios usaria para escolher entre Context API e Zustand?",
          "Explique o funcionamento e a importância do Virtual DOM no React e como as chaves (keys) ajudam na otimização de renderizações.",
          "Qual é a diferença entre Server Components (RSC) e Client Components no Next.js? Quando usar cada um?",
          "Como você aborda a otimização de performance em uma aplicação web que está lenta no carregamento inicial?"
        ],
        behavioral: [
          "Descreva uma situação em que você teve que aprender uma nova tecnologia muito rapidamente para entregar um projeto. Como foi o processo?",
          "Conte sobre um momento em que você discordou de uma decisão técnica de um colega ou superior. Como você comunicou sua visão e qual foi o resultado?",
          "Fale sobre uma entrega em que você cometeu um erro ou gerou um bug crítico em produção. O que você fez para mitigar e o que aprendeu?",
          "Como você lida com prazos apertados e priorização de tarefas quando tem múltiplos entregáveis concorrentes?"
        ],
        situational: [
          "Se você estivesse prestes a fazer uma entrega crítica na sexta-feira à tarde e percebesse um bug intermitente complexo, você subiria para produção ou adiaria o deploy?",
          "Imagine que um cliente exige uma funcionalidade que você sabe que trará sérios problemas de segurança ou performance. Como você lidaria com a situação?",
          "Se a API principal do sistema ficasse fora do ar e você fosse a única pessoa disponível para suporte no momento, quais seriam seus primeiros passos de depuração?",
          "Se o escopo de uma funcionalidade fosse alterado radicalmente no meio da sprint de desenvolvimento, como você reorganizaria seu trabalho?"
        ]
      };

      const questions = mockQuestions[type];
      const randomIndex = Math.floor(Math.random() * questions.length);
      const baseQuestion = questions[randomIndex];
      questionText = role
        ? baseQuestion.replace("uma aplicação", `uma aplicação como ${role}`).replace("você", `você, atuando como ${role},`)
        : baseQuestion;
      console.log("DEBUG: Selected mock question:", questionText);
    } else {
      // 2. Chamar o Gemini para gerar a pergunta
      console.log("DEBUG: Lite Mode is inactive. Calling Gemini API with model:", process.env.GEMINI_MODEL || "gemini-2.5-flash-lite");
      const genAI = new GoogleGenerativeAI(geminiApiKey!);
      const geminiModel = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite";
      const model = genAI.getGenerativeModel({ model: geminiModel });

      const rolePrompt = role ? ` para o cargo de "${role}"` : "";
      const technicalPrompt = role
        ? `- technical: conceitos de desenvolvimento de software, linguagens, arquitetura ou ferramentas relevantes para o cargo de "${role}".`
        : `- technical: conceitos de desenvolvimento de software, React, JavaScript, TypeScript, bancos de dados ou lógica de sistemas.`;
      const behavioralPrompt = role
        ? `- behavioral: focado em soft skills, resolução de problemas em equipe, adaptabilidade e aprendizado no contexto de "${role}".`
        : `- behavioral: focado em soft skills, resolução de problemas em equipe e aprendizado, ideal para desenvolvedores juniores.`;
      const situationalPrompt = role
        ? `- situational: como o candidato lidaria com um cenário hipotético, problemas em produção ou decisões difíceis no dia a dia do cargo de "${role}".`
        : `- situational: como o candidato lidaria com um problema hipotético em produção ou decisões técnicas difíceis.`;

      const prompt = `Você é um recrutador experiente conduzindo uma simulação de entrevista de emprego${rolePrompt}.
Gere uma única pergunta de entrevista do tipo "${type}".
${technicalPrompt}
${behavioralPrompt}
${situationalPrompt}

Regras cruciais:
1. Retorne apenas e somente o texto da pergunta em português (pt-BR).
2. Não coloque formatação markdown, aspas extras, ou introduções (Ex: NÃO escreva "Pergunta técnica:").
3. Escreva de forma corta, clara e realista.`;

      const result = await model.generateContent(prompt);
      questionText = result.response.text().trim();
      console.log("DEBUG: Gemini API returned question:", questionText);
    }

    if (!questionText) {
      throw new Error("Não foi possível gerar a pergunta da entrevista.");
    }

    // 3. Gravar na tabela interviews do Supabase
    console.log("DEBUG: Inserting record into Supabase interviews table...");
    let insertResult = await supabase
      .from("interviews")
      .insert({
        user_id: user.id,
        type,
        question: questionText,
        ...(role ? { role } : {}),
      })
      .select()
      .single();

    // Se der erro de coluna inexistente (código 42703), tenta gravar sem o campo 'role'
    if (insertResult.error && insertResult.error.code === "42703") {
      console.warn("Aviso: Coluna 'role' não existe na tabela 'interviews'. Executando fallback sem 'role'.");
      console.log("DEBUG: Retrying insertion without role field...");
      insertResult = await supabase
        .from("interviews")
        .insert({
          user_id: user.id,
          type,
          question: questionText,
        })
        .select()
        .single();
    }

    if (insertResult.error) {
      console.error("DEBUG: Supabase insert error:", insertResult.error);
      throw insertResult.error;
    }
    const interview = insertResult.data;
    console.log("DEBUG: Saved interview successfully! ID:", interview.id);

    return NextResponse.json({
      id: interview.id,
      question: interview.question,
      type: interview.type,
      role: interview.role || null,
    });
  } catch (error: any) {
    console.error("DEBUG: Erro ao iniciar simulação de entrevista:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno do servidor." },
      { status: 500 }
    );
  }
}
