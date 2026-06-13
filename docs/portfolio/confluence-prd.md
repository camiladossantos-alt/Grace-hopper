# Product Requirements Document (PRD) — Grace Hopper

| Atributo | Detalhe |
| :--- | :--- |
| **Document Owner** | Camila dos Santos (AI Product Manager) |
| **Status** | `COMPLETED` (Ready for Deploy) |
| **Target Release** | Q2 2026 (MVP) |
| **Stack Principal** | Next.js 14, Supabase Auth/DB, Gemini API, Web Speech API |
| **Objetivo do Case** | Demonstrar competências de PM de IA em priorização, controle de custos (Custo Zero), UX por voz e compliance (LGPD/Segurança). |

---

## 1. Visão Geral do Produto & Contexto

O **Grace Hopper** é uma plataforma *AI-first* de preparação para entrevistas técnicas e comportamentais por voz. Ele ajuda estudantes, desenvolvedores juniores e pessoas em transição de carreira a praticarem respostas para simulações realistas e receberem feedback acionável em **menos de 3 segundos**.

### 1.1. O Problema
No mercado atual de tecnologia, **~60% dos candidatos juniores falham na fase de entrevistas** não por falta de conhecimento técnico bruto, mas por falhas de comunicação, ansiedade e incapacidade de articular seu raciocínio sob pressão. 
*   **Barreira Financeira:** Treinamentos com coaches humanos custam mais de **US$ 200/hora**, sendo inacessíveis para o público-alvo (ICP).
*   **Feedback Ineficiente:** Práticas com amigos ou chats de texto genéricos não fornecem feedbacks realistas de voz e de estrutura de raciocínio.

### 1.2. A Solução (MVP AI-First)
Um **Coach de IA de Voz Gratuito e 24/7** que gera perguntas aleatórias (comportamentais, técnicas ou situacionais), captura as respostas por voz via microfone do navegador, transcreve em tempo real e fornece uma análise diagnóstica com nota, pontos fortes, melhorias e sugestões de frases de impacto.

---

## 2. Personas do Usuário & Jornada (*ICP*)

### Persona Principal: Lucas (Dev Junior / Estudante)
*   **Perfil:** Estudante de engenharia de software de 22 anos, procurando o primeiro estágio/vaga junior.
*   **Foco:** Entrevistas técnicas de React/JavaScript/TypeScript.
*   **Necessidade:** Saber se sua explicação teórica sobre conceitos (ex: Virtual DOM, Server Components) soa profissional e correta.
*   **Dor:** Trava ou fala de forma confusa quando o entrevistador pergunta "como funciona".

### Persona Secundária: Mariana (Transição de Carreira)
*   **Perfil:** Ex-professora de 31 anos em transição para Product Owner / Dev.
*   **Foco:** Entrevistas comportamentais e situacionais (soft skills).
*   **Necessidade:** Aprender a estruturar respostas de forma concisa usando metodologias como o método STAR.
*   **Dor:** Ansiedade extrema ao falar em público e dificuldade em quantificar conquistas passadas.

---

## 3. Priorização de Escopo (Matriz RICE & MoSCoW)

Como AI PM, a tomada de decisão para o escopo do MVP foi estruturada focando no **Custo de Operação R$ 0** e **Menor Latência**, gerando a seguinte priorização:

| ID | Feature | MoSCoW | R (Reach) | I (Impact) | C (Confidence) | E (Effort) | RICE Score | Decisão de Escopo |
| :--- | :--- | :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **F-03** | Simulação de Voz (STT Browser) | **Must** | 500 | 3.0 | 90% | 2.5 | **540** | **Incluído no MVP** |
| **F-05** | Feedback Instantâneo da IA | **Must** | 500 | 3.0 | 90% | 3.0 | **450** | **Incluído no MVP** |
| **F-04** | Geração Dinâmica de Perguntas | **Must** | 500 | 2.0 | 90% | 2.0 | **450** | **Incluído no MVP** |
| **F-02** | Login Simplificado Google OAuth | **Must** | 500 | 2.0 | 100% | 1.5 | **666** | **Incluído no MVP** |
| **F-06** | Dashboard com Histórico e Progresso| **Must** | 400 | 2.0 | 90% | 2.0 | **360** | **Incluído no MVP** |
| **F-12** | Text-to-Speech (IA Falando) | *Should*| 450 | 1.5 | 80% | 4.0 | **135** | Postergado para V2 |
| **F-10** | Gamificação e Badges | *Could* | 300 | 1.0 | 70% | 3.5 | **60** | Postergado para V2 |
| **F-11** | Recrutador IA Customizado | *Would* | 200 | 2.0 | 50% | 5.0 | **40** | Postergado para V3 |

> RICE Score = (Reach * Impact * Confidence) / Effort

---

## 4. Requisitos Funcionais do MVP

### F-02: Autenticação Google OAuth (Supabase)
*   **Fluxo:** O usuário entra em `/`, clica em "Começar entrevista" e faz login de um passo usando a conta Google.
*   **Regra de Negócio:** Sem e-mail/senha ou fluxos longos de confirmação de cadastro no MVP para diminuir a fricção na conversão inicial.

### F-03: Prática por Voz e Transcrição (STT)
*   **Critério de Aceite:** O sistema deve capturar a resposta falada utilizando a **Web Speech API** nativa do browser em português (`pt-BR`).
*   **Fallback de UX:** Caso o usuário negue acesso ao microfone ou use um navegador sem suporte, a interface deve exibir um campo de texto (`textarea`) amigável com a mensagem "Cole ou digite sua resposta" para não bloquear a experiência técnica.

### F-04: Geração de Perguntas Dinâmicas (Gemini API)
*   **Critério de Aceite:** A IA deve gerar uma pergunta baseada na categoria escolhida (Técnica, Comportamental ou Situacional).
*   **Fallback Técnico:** Se a API do Gemini estiver indisponível ou retornar erro, o sistema deve pescar uma pergunta de um repositório local (Mock) para garantir a resiliência operacional de 100%.

### F-05: Feedback Estruturado
*   **Critério de Aceite:** A IA analisa a resposta transcrita e retorna um JSON contendo:
    *   *Score* (Nota de 0 a 100).
    *   *Strengths* (Até 3 pontos fortes).
    *   *Improvements* (Até 2 pontos a melhorar).
    *   *Sugestões de Frases* (Duas sugestões com formulações profissionais/sêniores para o candidato usar).

---

## 5. Arquitetura de IA & Trade-Offs (AI PM Mindset)

Uma das maiores responsabilidades de um PM de IA é equilibrar **custo de tokens**, **precisão do modelo** e **latência**.

```
+------------------+                   +-----------------------+                   +--------------------+
|  Web Speech API  | -- Transcrição -> | Next.js API Routes    | -- Chamada JSON ->| Gemini 2.5 Flash   |
| (Browser - R$ 0) |                   | (CSRF + Validações)   |                   | (Lite - Latência)  |
+------------------+                   +-----------------------+                   +--------------------+
```

### 5.1. Trade-off 1: Transcrição de Voz (STT)
*   **Opção A:** Usar Google Cloud Speech-to-Text API (Custo estimado: US$ 0.024 por minuto + infraestrutura complexa).
*   **Opção B:** Usar a **Web Speech API** no navegador (Custo: **R$ 0**, processamento local no client-side).
*   **Decisão:** **Opção B para o MVP.** Além de custo zero, a latência de transcrição é nula para o servidor, embora a precisão dependa do microfone do usuário e do navegador. Mapeamos a Opção A no roadmap técnico para a V2 caso a precisão seja um impedimento.

### 5.2. Trade-off 2: Modelo de IA
*   **Opção A:** Gemini 1.5 Pro (Extremamente preciso, porém mais lento e caro).
*   **Opção B:** **Gemini 2.5 Flash Lite** (Respostas rápidas de até 1.5s, suporte nativo a JSON estruturado, cota gratuita generosa de 15 RPM).
*   **Decisão:** **Opção B.** Garantir feedback estruturado em menos de 3s é o fator chave de experiência do usuário (*WOW effect*). O Flash Lite atende perfeitamente os critérios de análise textual de respostas de até 1000 palavras.

---

## 6. Métricas de Sucesso (KPIs)

| Categoria | Indicador (KPI) | Meta MVP (1º Mês) | Como Medir |
| :--- | :--- | :---: | :--- |
| **Aquisição** | Novos Cadastros (Signups) | **500+** | Leads criados via Supabase Auth |
| **Ativação** | Conclusão da 1ª Entrevista | **> 60%** | Evento `interview_completed` no banco |
| **Retenção** | Prática Recorrente (7d) | **> 35%** | Usuários com > 1 entrevista na semana |
| **Satisfação** | NPS da Plataforma | **> 40** | Questionário rápido no final do feedback |
| **Performance** | Latência de Feedback da IA | **< 3 segundos**| Métricas de monitoramento de rota da Vercel |

---

## 7. Compliance, Segurança & Acessibilidade

### 7.1. Segurança (Anti-CSRF & Validação)
*   As rotas de API possuem validação estrita de origem (`Origin` vs `Host`) para evitar ataques de *Cross-Site Request Forgery*.
*   Entradas de dados são limitadas a **10.000 caracteres** na transcrição para evitar abusos de token e DoS.

### 7.2. LGPD e Privacidade
*   Nenhum arquivo de áudio bruto é salvo no servidor (apenas a transcrição em formato texto é armazenada no banco PostgreSQL criptografado do Supabase).
*   Implementação de políticas de **Row Level Security (RLS)** no Supabase, garantindo que o usuário tenha acesso apenas aos seus próprios dados de simulação e feedback.

### 7.3. Acessibilidade (Focus Design)
*   A interface é otimizada para navegação via teclado, contendo anéis de foco visíveis em todos os elementos clicáveis (`focus-visible`).
*   Imagens com textos alternativos estruturados e estrutura de cabeçalho sem quebras para leitores de tela.
