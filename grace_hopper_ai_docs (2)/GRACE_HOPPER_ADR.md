# Projeto Grace Hopper - Architecture Decision Record (ADR)

## Overview
Este documento registra as principais decisões arquiteturais do projeto Grace Hopper, as alternativas consideradas e as justificativas técnicas.

**MVP (Jun/2026):** stack full-stack em **Next.js** na Vercel — API Routes no mesmo projeto, **sem FastAPI** e **sem Google Cloud STT**. Alinhado a `Cursor_docs/GRACE_HOPPER_CURSOR_MVP_GUIDE.md`. Custo alvo: **R$ 0** (free tiers).

---

## ADR-001: Framework Frontend

### Contexto
Necessidade de escolher um framework React moderno que suporte SSR, performance otimizada e integração com APIs.

### Decisão
**Usar Next.js 14+ com TypeScript**

### Alternativas Consideradas
1. **React SPA + Vite** 
   - Pros: Mais leve, build mais rápido
   - Cons: Sem SSR, SEO limitado, routing manual

2. **Remix**
   - Pros: Excelente para formulários e data loading
   - Cons: Curva de aprendizado maior, comunidade menor

3. **Next.js** ✅
   - Pros: SSR/SSG, SEO, performance, ecosystem maduro
   - Cons: Overhead maior para SPAs puras

### Justificativa
- **Performance**: Image optimization, Font optimization automáticos
- **SEO**: SSR nativo para melhor indexação
- **Developer Experience**: File-based routing, API routes integradas
- **Deployment**: Vercel integration perfeita
- **Ecosystem**: Suporte a shadcn/ui, TypeScript, Tailwind

### Implementação
```
NextJS 14
├── App Router (não Pages Router)
├── TypeScript strict mode
├── Tailwind CSS
├── shadcn/ui components
└── API Routes para endpoints simples
```

---

## ADR-002: Backend / API (MVP)

### Contexto
Necessidade de endpoints para análise de entrevistas (Gemini), com deploy simples, custo zero e mesmo repositório do frontend.

### Decisão
**Usar Next.js API Routes (App Router) na Vercel — sem serviço Python separado no MVP**

### Alternativas Consideradas
1. **FastAPI no Render**
   - Pros: Performance, async nativo, bom para IA em escala
   - Cons: Segundo deploy, custo potencial, complexidade extra para case de portfólio

2. **Django + DRF / Flask**
   - Pros: Ecossistema Python maduro
   - Cons: Overhead e ops desnecessários para MVP

3. **Next.js API Routes** ✅
   - Pros: Um único projeto, TypeScript end-to-end, deploy único na Vercel, free tier
   - Cons: Menos ideal se o backend crescer muito (aceitável para MVP)

### Justificativa
- **Simplicidade**: Frontend + API no mesmo codebase (`app/api/`)
- **Custo**: R$ 0 — Vercel hobby + Supabase + Gemini free tier
- **DX**: Mesma linguagem (TypeScript), menos contexto para o time de um
- **IA**: Chamadas server-side à Gemini API a partir das Route Handlers
- **Escopo MVP**: Análise de transcrição e persistência no Supabase — suficiente sem microserviço

### Implementação
```
Next.js App Router
├── app/api/analyze/route.ts    # POST transcrição → Gemini → JSON feedback
├── app/api/questions/route.ts  # (opcional) gerar pergunta
├── Validação com Zod (ou similar)
├── Chaves Gemini/Supabase em env (Vercel + .env.local)
└── Sem FastAPI no MVP
```

---

## ADR-003: Database

### Contexto
Necessidade de database confiável, com suporte a real-time e auth integrado.

### Decisão
**Usar Supabase (PostgreSQL + extras) ao invés de Firebase/MongoDB**

### Alternativas Consideradas
1. **Firebase/Firestore**
   - Pros: Serverless, real-time, fácil de setup
   - Cons: Query limitations, vendor lock-in, caro em escala

2. **MongoDB Atlas**
   - Pros: NoSQL, flexible schema
   - Cons: Não ideal para dados estruturados, real-time complexo

3. **Supabase** ✅
   - Pros: PostgreSQL completo, Auth, Real-time, Vector search
   - Cons: Self-hosted pode ser complexo (mas usamos managed)

### Justificativa
- **Dados Estruturados**: PostgreSQL é ideal para usuarios, interviews, feedback
- **Real-time**: Supabase Realtime para atualizar dashboard live
- **Auth Integrado**: Supabase Auth com OAuth Google nativo
- **RLS (Row-Level Security)**: Segurança em nível de database
- **Full-Text Search**: Para buscar interviews/feedback
- **Vector Search**: Futuro para embedding-based search
- **Backup**: Managed backups automáticos

### Schema Design
```sql
-- Normalization: 3NF
-- Tables separadas: users, interviews, feedback, analytics
-- Indices em foreign keys e queries frequentes
-- RLS policies para segurança
-- Audit log via triggers
```

---

## ADR-004: API de IA / LLM

### Contexto
Necessidade de LLM para análise conversacional, feedback estruturado e prompt engineering.

### Decisão
**Usar Google Gemini API ao invés de OpenAI/Anthropic Claude**

### Alternativas Consideradas
1. **OpenAI GPT-4/4o**
   - Pros: SOTA performance, excelente para instruções
   - Cons: Mais caro, rate limits mais apertados

2. **Anthropic Claude**
   - Pros: Excelente em análise estruturada, context window grande
   - Cons: Latência mais alta, menos integrations

3. **Google Gemini** ✅
   - Pros: Latência baixa, boa performance, preço competitive, vision
   - Cons: Menos opiniões online vs OpenAI

### Justificativa
- **Performance**: Latência ~ 200-500ms (melhor que competidores)
- **Custo**: $0.075/M input tokens vs $0.30/M GPT-4o
- **Vision Capability**: Futuro para análise de body language via webcam
- **Integration**: Fácil com Vertex AI (escala enterprise)
- **Structured Output**: Suporta JSON schema para feedback estruturado

### Implementação
```typescript
// Route Handler server-side (app/api/analyze/route.ts)
// Prompt template + structured JSON output (score, strengths, improvements)
// Google AI Studio — chave gratuita no MVP
// Rate limiting básico na API Route se necessário
// Fallback: mensagem amigável se Gemini indisponível
```

---

## ADR-005: Speech-to-Text (MVP)

### Contexto
Necessidade de transcrever a resposta do usuário por voz durante a entrevista, sem custo e sem cartão de crédito no MVP.

### Decisão
**Usar Web Speech API no browser (captura + transcrição no cliente) — sem Google Cloud STT no MVP**

### Alternativas Consideradas
1. **Google Cloud Speech-to-Text**
   - Pros: Alta precisão, punctuation, multilíngue
   - Cons: Exige billing Google Cloud; fora do orçamento R$ 0 do MVP

2. **Whisper (self-hosted / API paga)**
   - Pros: Boa precisão
   - Cons: Custo ou infra extra

3. **Web Speech API** ✅
   - Pros: Grátis, zero backend de áudio, privacidade (áudio não sobe para STT cloud)
   - Cons: Precisão variável por browser; suporte melhor em Chrome

### Justificativa
- **Custo**: R$ 0 — alinhado ao guia Cursor MVP
- **Fluxo**: Usuário fala → browser transcreve → texto enviado à API Route → Gemini analisa
- **MVP**: Aceitável para case de portfólio; precisão enterprise pode vir em V2+
- **Simplicidade**: Sem pipeline de chunks de áudio no servidor

### Implementação
```javascript
// Frontend: Web Speech API (SpeechRecognition) para captura e transcrição
// Exibir transcrição ao usuário antes de enviar
// POST apenas o texto transcrito para app/api/analyze
// Fallback UX: permitir editar texto se transcrição falhar
// Google Cloud STT: considerar apenas em V2+ se precisão for bloqueante
```

---

## ADR-006: Deploy & Hosting (MVP)

### Contexto
Necessidade de deploy rápido, confiável e com custo zero para o case de portfólio.

### Decisão
**Deploy único na Vercel (Next.js frontend + API Routes) + Supabase managed**

### Alternativas Consideradas
1. **Vercel + Render (FastAPI separado)**
   - Pros: Separação clara front/back
   - Cons: Dois serviços, custo potencial no Render — descartado no MVP

2. **AWS EC2 + RDS**
   - Pros: Máximo controle
   - Cons: Ops complexo, fora do escopo MVP

3. **Vercel (monólito Next.js)** ✅
   - Pros: Um deploy, preview por PR, hobby free, API Routes incluídas
   - Cons: Limites do serverless se escala muito (ok para MVP)

### Justificativa
- **Um repositório, um deploy**: `grace-hopper-web` → Vercel
- **API Routes** rodam como serverless functions na mesma plataforma
- **Supabase**: banco + auth fora da Vercel (free tier)
- **Custo MVP**: R$ 0 (Vercel hobby + Supabase + Gemini free)

### Arquitetura
```
┌─────────────────────────────────────┐
│ Client (Browser)                    │
│  Web Speech API → transcrição local │
└────────┬────────────────────────────┘
         │
    ┌────▼────────────────────────────┐
    │ Vercel                          │
    │  Next.js (pages + API Routes)   │
    └────┬──────────────────┬─────────┘
         │                  │
    ┌────▼─────┐      ┌─────▼───────────┐
    │ Gemini   │      │ Supabase        │
    │ API      │      │ PostgreSQL+Auth │
    └──────────┘      └─────────────────┘
```

---

## ADR-007: Real-time Features

### Contexto
Necessidade de atualizar dashboard em tempo real quando novos feedbacks chegam.

### Decisão
**Usar Supabase Realtime (Postgres replication) para MVP**

### Alternativas Consideradas
1. **WebSockets custom**
   - Pros: Total controle
   - Cons: Operacionalmente pesado, escalação difícil

2. **Socket.io**
   - Pros: Fallbacks, excelente DX
   - Cons: Infrastructure pesada, caro escalar

3. **Supabase Realtime** ✅
   - Pros: Usa Postgres nativamente, auto-scaling
   - Cons: Menos flexible que custom

### Justificativa
- **Simplicidade**: Subscribe a tabelas diretamente do frontend
- **Escalabilidade**: Sem servidor separado de WebSocket
- **Custo**: Incluído no plano Supabase
- **MVP**: Suficiente para fase inicial

### Implementação
```typescript
// Frontend
const subscription = supabase
  .from('interviews')
  .on('INSERT', (payload) => {
    updateDashboard(payload.new)
  })
  .subscribe()
```

---

## ADR-008: Autenticação & Segurança

### Contexto
Necessidade de autenticação segura, fácil de usar, com suporte a Google OAuth.

### Decisão
**Usar Supabase Auth com Google OAuth + JWT**

### Alternativas Consideradas
1. **Auth0**
   - Pros: Muito completo, enterprise-ready
   - Cons: Caro ($15+/mês), overkill para MVP

2. **NextAuth.js**
   - Pros: Opensource, flexible
   - Cons: Setup complexo, mais manutenção

3. **Supabase Auth** ✅
   - Pros: Integrado com database, OAuth Google, JWT
   - Cons: Menos features que Auth0

### Justificativa
- **Integração**: Está no mesmo banco de dados
- **Segurança**: JWT com refresh tokens, RLS automático
- **UX**: Google login de 1-click para usuários novos
- **Custo**: Free tier generoso
- **LGPD**: Dados sempre sob controle (self-hosted option se necessário)

### Implementação
```
JWT Token: {userId, email, exp}
Refresh Token: 7 dias
Access Token: 1 hora
HttpOnly Cookies para refresh
CORS configurado corretamente
```

---

## ADR-009: Video/Recording Storage

### Contexto
Necessidade de armazenar áudio das entrevistas para processamento e possível replay.

### Decisão
**Usar Supabase Storage (S3-compatible) com processamento via background jobs**

### Alternativas Consideradas
1. **AWS S3 direto**
   - Pros: Mais flexível, mais features
   - Cons: Setup complexo, mais caro

2. **Google Cloud Storage**
   - Pros: Bem integrado com Google APIs
   - Cons: Custo, vendor lock-in

3. **Supabase Storage** ✅
   - Pros: Integrado, S3 compatible, managed
   - Cons: Menos features que S3 puro

### Justificativa
- **Integração**: Mesmo bucket que Supabase
- **RLS**: Controle de acesso a nível de bucket
- **Cost**: Competitivo com S3
- **Simplicity**: Não precisa AWS console

### Implementação (MVP simplificado)
```
MVP: priorizar texto transcrito (Web Speech API) — sem upload de áudio obrigatório
Opcional V2: áudio → Supabase Storage + metadata em interviews
Processamento IA: síncrono na API Route (sem worker Render)
Cleanup: política de retenção a definir em V2
```

---

## ADR-010: Analytics & Monitoring

### Contexto
Necessidade de entender uso, comportamento de usuários e detectar problemas.

### Decisão
**Vercel Analytics (frontend) + eventos custom no Supabase (MVP mínimo)**

### Alternativas Consideradas
1. **Google Analytics 4**
   - Pros: Muito completo
   - Cons: Privacy concerns, overkill para MVP

2. **Mixpanel/Amplitude**
   - Pros: Excelente para product analytics
   - Cons: Caro ($500+), setup complexo

3. **Custom (Vercel + Supabase)** ✅
   - Pros: Controle total, barato, privacy-first
   - Cons: Menos polished que Enterprise tools

### Justificativa
- **Frontend**: Vercel Analytics para Web Vitals
- **Produto**: Eventos em tabela Supabase (`analytics_events`) se necessário
- **Logs API**: Vercel function logs + console estruturado nas Route Handlers
- **Cost**: R$ 0 no MVP

### Eventos Principais
```
signup_complete
first_interview_started
interview_completed
feedback_viewed
score_improvement
error_occurred
```

---

## ADR-011: Testing Strategy

### Contexto
Necessidade de qualidade de código, confiabilidade e regressão prevention.

### Decisão
**Unit tests + Integration tests + E2E coverage mínima (80% coverage para core)**

### Alternativas Consideradas
1. **Sem testes (YOLO)**
   - Pros: Rápido inicialmente
   - Cons: Bugs em produção, refactoring assustador

2. **Testes completos (100%)**
   - Pros: Máxima confiança
   - Cons: Tempo, manutenção pesada

3. **Balanced approach** ✅
   - Pros: Qualidade + velocidade
   - Cons: Equilibrio complicado

### Justificativa
- **Unit tests (Jest / Vitest)**
  - Funções puras, utils, componentes React
  - Target: cobertura razoável no core (sem obsessão no MVP)

- **Integration tests**
  - API Routes com mock de Gemini e Supabase
  - Auth flows

- **E2E tests (Playwright)**
  - Happy paths principais
  - Signup → Interview → Feedback
  - Desktop + Mobile

---

## ADR-012: CI/CD Pipeline

### Contexto
Necessidade de deploy automático, confiável e com rollback fácil.

### Decisão
**GitHub Actions + Preview Deployments + Staging + Production**

### Estágios
```
1. PR aberta
   ↓ GitHub Actions
   - Lint (ESLint + Prettier)
   - Tests (Jest / Vitest)
   - Build check

2. Preview Deploy (Vercel)
   - Automatic para cada PR
   - Link compartilhável

3. Main branch
   ↓ Merge → Deploy automático
   - Staging (auto-deploy)
   - Manual approval → Production

4. Production
   - Monitoring ativo (24h)
   - Rollback fácil (1-click)
```

---

## ADR-013: Error Handling & Logging

### Contexto
Necessidade de entender o que quebrou em produção e poder debugar.

### Decisão
**Structured logging + Sentry (opcional no MVP) + Vercel function logs**

### Implementação
```
Frontend:
- Sentry for exceptions (opcional MVP)
- Console logs estruturados em dev
- Network errors captured

API Routes (Next.js):
- console/json log nas Route Handlers
- Vercel dashboard para erros de serverless
- Validar entrada antes de chamar Gemini

Database:
- Supabase logs
- Query performance monitoring (quando necessário)
```

---

## Decisões Futuras (V2+)

### Quando considerar mudanças:

1. **Se precisão de voz for bloqueante**
   - Google Cloud Speech-to-Text ou Whisper API
   - Upload de áudio + pipeline assíncrono

2. **Se backend Python fizer sentido**
   - FastAPI no Render/Railway para workloads pesados de IA
   - Separar front (Vercel) e API Python

3. **Se performance degradar**
   - Redis cache, filas (Bull/Inngest), edge onde couber

4. **Se escala ou compliance enterprise**
   - HIPAA/SOC2, self-hosted, AWS/GCP

---

## Trade-offs & Compromissos

| Decisão | Benefício | Custo |
|---------|-----------|-------|
| Next.js (front + API Routes) | Um deploy, TypeScript end-to-end | Overhead vs SPA puro |
| Web Speech API | R$ 0, sem backend de áudio | Precisão variável por browser |
| Supabase | Integrado + Simple | Lock-in |
| Gemini (AI Studio free) | Latência baixa, custo zero MVP | Limites do free tier |
| Vercel único | DX + preview deploys | Limites serverless |
| Real-time via Supabase | Simples | Não pode fazer complex sync |

---

## Review Schedule

- **ADR Review**: Trimestral
- **Technology Review**: Anual
- **Next Review Date**: Q4 2026

---

**Versão:** 2.0 (MVP — sem FastAPI)  
**Atualizado:** Junho 2026  
**Owner:** Tech Lead  
**Referência:** `Cursor_docs/GRACE_HOPPER_CURSOR_MVP_GUIDE.md`
