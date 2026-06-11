# Business Context — Grace Hopper

> Fonte de verdade para Produto. Sincronizado via @docs em 2026-06-08 a partir de `grace_hopper_ai_docs (2)/`, `README.md`, `grace_hopper_product_os.md` e boards visuais.

## 1. Visão do Produto

**Grace Hopper** é uma plataforma AI-first de preparação para entrevistas por voz. Ajuda estudantes, juniores e pessoas em transição de carreira a praticar entrevistas de forma realista e receber feedback acionável em menos de 3 segundos.

**Público-alvo (ICP):** estudantes, desenvolvedores juniores e career changers.

**Proposta de valor:** coach de IA gratuito, 24/7, com prática ilimitada e feedback personalizado sobre comunicação, clareza, confiança e precisão técnica.

**Objetivo estratégico do projeto:** case de portfólio AI-first forte (produto funcional + documentação visual + deploy), não uma startup enterprise perfeita.

**Filosofia:** *"Making interview preparation accessible, humane, and continuous through AI."*

## 2. Dores do Cliente (Problemas que resolvemos)

- ~60% dos candidatos falham entrevistas por falta de prática realista
- Ansiedade de entrevista impede boa performance
- Feedback de amigos e recursos online não é acionável
- Coaching custa US$ 200+ e é inacessível
- Prática com humanos não escala (coaches limitados)
- Falta de ambiente acessível e realista para treinar entrevistas

## 3. Backlog de Épicos e Features

| ID | Título | Status | Notas |
|---|---|---|---|
| F-01 | Landing Page (branding, visão, CTA) | Feito | MUST — spec @product Jun/2026 |
| F-02 | Autenticação Google OAuth | Feito | MUST — spec @product Jun/2026 |
| F-03 | Sessão de Entrevista por Voz | Feito | MUST — core WOW; Web Speech API no MVP |
| F-04 | Geração de Perguntas por IA | Feito | MUST — Gemini; behavioral/technical/situational |
| F-05 | Feedback Instantâneo por IA | Feito | MUST — score, strengths, improvements |
| F-06 | Dashboard de Progresso | Feito | MUST — histórico, score, evolução |
| F-07 | Histórico de Entrevistas | Feito | SHOULD — revisar tentativas passadas |
| F-08 | Analytics de Performance | Pronto para Dev | README; métricas em `metrics.md` |
| F-09 | Portal PRD / Documentação Visual | Feito | `grace_hopper_prd_portal.html`, boards HTML |
| F-10 | Gamificação (pontos, badges, ranking) | Backlog V2 | Q2 2026 |
| F-11 | Persona AI Recruiter | Backlog V2 | Simulação realista de entrevistador |
| F-12 | Text-to-Speech no Feedback | Backlog V2 | Ouvir análise da IA |
| F-13 | Análise de Inteligência Emocional | Backlog V2 | Feedback comportamental em tempo real |
| F-14 | Apps Nativos iOS/Android | Backlog V3 | Q4 2026+ |
| F-15 | Comunidade e Mentoria | Backlog V3 | Features sociais |
| F-16 | Soluções Enterprise B2B | Backlog V3 | Universidades e empresas |

**Legenda de status:** `Feito` = entregue | `Pronto para Dev` = spec @product completa | `Especificado` = documentado, spec incompleta | `Backlog V2/V3` = roadmap futuro

## 4. Especificações Ativas (Em Detalhe)

### Epic: Landing Page (F-01) — Feito

**História:** Como visitante (estudante, júnior ou em transição de carreira), quero entender em poucos segundos o que é o Grace Hopper e por que vale a pena, para clicar e começar a praticar entrevistas com confiança.

**Rota:** `/` (pública, sem autenticação)

**Conteúdo (MVP):**

| Bloco | Conteúdo |
|-------|----------|
| Hero | Nome **Grace Hopper** + tagline: *"AI coach 24/7 que melhora confiança e comunicação em entrevistas com feedback instantâneo, realista e humano."* |
| Problema | Prática cara, ansiedade, feedback pouco acionável (dores da seção 2) |
| Solução | Prática por voz + feedback de IA em segundos; gratuito no MVP |
| CTA | **"Começar entrevista"** → `/login` |

**Design** (`design-system.md`):

- Primary: `#F4A642` · Background: `#F7F4EE` · Neutral: `#1A1A1A` · Border: `#ECE6DB`
- Estilo: calmo, minimalista, cantos arredondados, muito espaço em branco
- Idioma: **pt-BR**

**Critérios de aceite (MVP):**

- [ ] Rota `/` exibe hero com nome, tagline, problema/solução resumidos e CTA visível acima da dobra (mobile e desktop)
- [ ] CTA **"Começar entrevista"** navega para `/login`
- [ ] Paleta conforme design-system (cores acima)
- [ ] Layout responsivo mobile-first; legível em telas ≥ 320px
- [ ] Visitante anônimo acessa a landing completa sem login

**Regras de negócio (F-01):**

- Landing pública; sem paywall, preço ou formulário no MVP
- Um único CTA principal no hero
- Login não embutido na landing — fluxo: `/` → `/login` → OAuth Google

**Fora do escopo (MVP):** depoimentos, blog, FAQ longo, vídeo hero, A/B de copy

---

### Epic: Autenticação Google OAuth (F-02) — Feito

**História:** Como visitante que clicou em "Começar entrevista", quero entrar com minha conta Google em um passo, para acessar o dashboard e praticar entrevistas com meu histórico salvo.

**Fluxo (MVP):**

```
/ → CTA → /login → Google OAuth (Supabase) → /dashboard
```

**Rotas:**

| Tipo | Rotas |
|------|--------|
| Públicas | `/`, `/login` |
| Protegidas | `/dashboard`, `/interview`, `/interview/[id]`, `/feedback/[id]` |

**Página `/login` (pt-BR):**

- Mensagem curta (ex.: "Entre para praticar entrevistas")
- Botão **"Continuar com Google"**
- Visual alinhado ao design-system (F-01)
- Sem e-mail/senha no MVP

**Critérios de aceite (MVP):**

- [ ] Botão **"Continuar com Google"** inicia OAuth via Supabase Auth
- [ ] Login bem-sucedido redireciona para **`/dashboard`**
- [ ] Rotas protegidas redirecionam para **`/login`** sem sessão
- [ ] Sessão persiste entre recarregamentos (Supabase SSR / refresh token)
- [ ] Usuário **já logado** em `/` ou `/login` é redirecionado para **`/dashboard`**
- [ ] Botão **"Sair"** no header (área autenticada) encerra sessão e volta para `/login` ou `/`
- [ ] Cancelamento ou falha no OAuth exibe mensagem em **pt-BR** na `/login`; usuário permanece na página
- [ ] RLS preparado: usuário só acessa seus próprios dados (base para entrevistas/feedback)

**Regras de negócio (F-02):**

- Único provedor no MVP: Google OAuth (Supabase free tier)
- Login obrigatório para dashboard, entrevista e feedback
- Chaves Supabase apenas em env — nunca no GitHub
- LGPD: sem exposição de dados de terceiros

**Fora do escopo (MVP):** Apple/GitHub login, e-mail/senha, magic link, Auth0, onboarding de perfil, 2FA

**Dependências (@engineer):** projeto Supabase + Google Provider; `@supabase/supabase-js` + `@supabase/ssr`; middleware Next.js

---

### Epic: Sessão de Entrevista por Voz (F-03) — Feito

**História:** Como candidato praticando para processos seletivos, quero responder a perguntas por voz e ver minha resposta transcrita na tela, para que o treino simule uma conversa real e eu possa conferir minha fala antes de enviá-la para análise.

**Rota:** `/interview/[id]` (protegida, exige autenticação)

**Conteúdo (MVP):**
- Card central exibindo a pergunta gerada.
- Indicador visual animado de gravação de áudio.
- Área de texto exibindo a transcrição do reconhecimento de fala.
- Botão "Enviar para Análise" (desabilitado se vazio).

**Design:**
- Foco absoluto na pergunta, livre de distrações visuais.
- Paleta alinhada ao design-system (Primary `#F4A642`, Background `#F7F4EE`).

**Critérios de Aceite (MVP):**
- [ ] Capturar áudio do usuário e transcrever usando Web Speech API (`SpeechRecognition`) em tempo real no browser.
- [ ] Permitir edição manual da transcrição no campo de texto para correções rápidas de voz.
- [ ] Exibir botão para parar/cancelar a gravação e limpar o campo de texto.
- [ ] Botão de envio que despacha a transcrição final para o endpoint `/api/interview/analyze`.
- [ ] Exibir mensagem de erro instrutiva e amigável em português caso o acesso ao microfone seja negado pelo browser.

**Regras de Negócio (F-03):**
- O idioma padrão configurado na Web Speech API deve ser `pt-BR`.
- A resposta transcrita só pode ser submetida para avaliação se possuir conteúdo válido (não nula/vazia).
- O estado da entrevista é salvo no Supabase com a transcrição atrelada.

**Fora do Escopo (MVP):** Upload ou persistência de arquivos pesados de áudio (somente texto transcrito é guardado); suporte a múltiplos idiomas de áudio.

---

### Epic: Geração de Perguntas por IA (F-04) — Feito

**História:** Como candidato se preparando para entrevistas, quero que o sistema gere perguntas dinâmicas e inteligentes baseadas no tipo de entrevista escolhido (Technical, Behavioral, Situational), para treinar com perguntas relevantes e imprevisíveis.

**Rota:** `/interview` (seleção de tipo) e `/interview/[id]` (exibição da pergunta)

**Conteúdo (MVP):**
- Seletor de categorias na rota `/interview` com 3 cards: Técnica, Comportamental e Situacional.
- Botão "Iniciar Entrevista" que redireciona para a página correspondente.

**Critérios de Aceite (MVP):**
- [ ] Chamar endpoint `/api/interview/start` passando o tipo escolhido pelo usuário.
- [ ] Obter uma pergunta gerada sob medida pela API do Gemini com base no tema.
- [ ] Gravar a entrevista no banco Supabase (`interviews` table) associada ao `user_id` correspondente.
- [ ] Redirecionar o usuário para a página de entrevista com o ID gerado `/interview/[id]`.
- [ ] Se a API do Gemini estiver inacessível, utilizar uma pergunta fallback de uma lista pré-cadastrada localmente para não bloquear o fluxo.

**Regras de Negócio (F-04):**
- A pergunta gerada pela IA deve estar em português (`pt-BR`).
- A pergunta deve ser direta e simular o questionamento real de um recrutador.

**Fora do Escopo (MVP):** Edição manual ou digitação de perguntas personalizadas pelo usuário; análise de currículos para geração de perguntas específicas de perfil.

---

### Epic: Feedback Instantâneo por IA (F-05) — Feito

**História:** Como candidato ansioso por autoavaliação, quero que minhas respostas sejam analisadas imediatamente por uma IA sob critérios de clareza, confiança e precisão, fornecendo notas e sugestões de melhoria acionáveis.

**Rota:** `/feedback/[id]` (protegida, exige autenticação)

**Conteúdo (MVP):**
- Placar principal exibindo a nota geral (0 a 10 ou 0 a 100).
- Seção estruturada contendo:
  - Pontos Fortes (Strengths) e Pontos de Melhoria (Improvements).
  - Feedback detalhado de Comunicação e Feedback Técnico.
- Botão CTA "Praticar Novamente" direcionando para o seletor.

**Critérios de Aceite (MVP):**
- [ ] O endpoint `/api/interview/analyze` recebe a transcrição e faz a chamada estruturada ao Gemini.
- [ ] Gravar o JSON de retorno do Gemini na tabela `feedback` do Supabase.
- [ ] Exibir animação ou indicador visual de carregamento ("Analisando com IA...") enquanto o Gemini processa o feedback.
- [ ] Exibir nota e listas estruturadas mapeando fielmente a resposta JSON da IA.
- [ ] O fluxo completo do processamento de feedback deve responder em tempo inferior a 3 segundos (meta).

**Regras de Negócio (F-05):**
- A resposta do Gemini deve retornar no JSON estrito descrito abaixo:
```json
{
  "score": 8,
  "strengths": [],
  "improvements": [],
  "communication_feedback": "",
  "technical_feedback": ""
}
```
- A visualização do feedback deve ser privada e restrita ao usuário que realizou a entrevista.

**Fora do Escopo (MVP):** Análise de expressão facial ou vídeo; feedback auditivo (Text-to-Speech).

---

### Epic: Dashboard de Progresso (F-06) — Feito

**História:** Como usuário recorrente, quero ter uma página centralizada (Dashboard) que mostre meu desempenho médio geral e a evolução dos meus scores, para que eu possa acompanhar visualmente minha evolução.

**Rota:** `/dashboard` (protegida, exige autenticação)

**Conteúdo (MVP):**
- Placar de KPI com pontuação média geral e contagem total de entrevistas executadas.
- Lista rápida com atalhos de clique para as últimas 3 entrevistas concluídas.
- Botão destacado de CTA para iniciar uma nova simulação.

**Critérios de Aceite (MVP):**
- [ ] Carregar dados dinâmicos do banco Supabase atrelados à conta do usuário logado.
- [ ] Calcular a pontuação média com base nas entrevistas cadastradas.
- [ ] Tratar o estado de histórico vazio (sem entrevistas feitas) exibindo uma mensagem de incentivo amigável e um CTA centralizado.
- [ ] Sincronizar o dashboard em tempo real (Supabase Realtime) ou via revalidação de rota quando um feedback novo é inserido.

**Regras de Negócio (F-06):**
- Exige autenticação Google OAuth ativa; redirecionar não autenticados para `/login`.

**Fora do Escopo (MVP):** Gráficos complexos com bibliotecas pesadas de visualização; compartilhamento público de estatísticas.

---

### Epic: Histórico de Entrevistas (F-07) — Feito

**História:** Como usuário focado em melhoria contínua, quero poder acessar todas as minhas tentativas anteriores de entrevistas com seus respectivos feedbacks, para estudar minhas falhas do passado.

**Rota:** `/dashboard` (aba ou seção do histórico) ou `/history`

**Conteúdo (MVP):**
- Lista cronológica decrescente das simulações passadas contendo: data/hora, tipo de entrevista, score obtido e botão "Revisar Feedback".

**Critérios de Aceite (MVP):**
- [ ] Consultar tabelas `interviews` e `feedback` no Supabase filtrando por `user_id`.
- [ ] Clicar no botão "Revisar Feedback" encaminha o usuário diretamente para `/feedback/[id]`.

**Regras de Negócio (F-07):**
- Assegurar via políticas de RLS que nenhum usuário tenha acesso ao histórico de outro.

**Fora do Escopo (MVP):** Filtro avançado de pesquisa textual; exportar histórico para planilha ou PDF.

---

### Epic: Analytics de Performance (F-08) — Pronto para Dev

**História:** Como gestor do produto, quero monitorar a conversão de uso e a aderência à plataforma, para validar se o MVP está atendendo aos objetivos de engajamento do portfólio.

**Rota:** Não exposta visualmente na aplicação (painel administrativo Vercel / Supabase)

**Conteúdo (MVP):**
- Sem tela pública de métricas. Acompanhamento direto via painel da Vercel e queries do Supabase.

**Critérios de Aceite (MVP):**
- [ ] Integrar Vercel Analytics no layout raiz da aplicação para rastreio de performance de carregamento.
- [ ] Gravar eventos de conversão-chave no Supabase (registro, início de entrevista, término da análise) de forma silenciosa.

**Regras de Negócio (F-08):**
- Obedecer à LGPD: não registrar dados identificáveis de voz ou transcrição em plataformas de métricas agregadas.

**Fora do Escopo (MVP):** Integração com Mixpanel ou painéis de BI avançados.

---

### Regras de Negócio do Sistema

- MVP 100% gratuito, sem paywall ou assinatura.
- Login obrigatório para qualquer gravação e histórico.
- Respeito à LGPD: dados pessoais não expostos.
- Simplificação permitida: mock-up de fluxos se Gemini/Supabase estiverem fora do ar para evitar travamentos em demonstrações.

### Métricas de Sucesso (1º mês)

| Métrica | Meta |
|---------|------|
| Signups | 500+ |
| Conclusão da 1ª entrevista | 60%+ |
| Score médio | 65–75 |
| DAU | 50+ |
| NPS | > 40 |
