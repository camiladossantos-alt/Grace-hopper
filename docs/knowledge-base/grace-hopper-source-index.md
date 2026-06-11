# Grace Hopper — Índice de Documentação Fonte

> KB gerada pelo ciclo @docs (Sync). Mapeia os artefatos legados para consulta rápida. Os arquivos originais **não foram movidos** — permanecem nas pastas de origem.

## Visão Geral

Este índice conecta a metodologia Onion (`docs/business-context-lite.md`, `docs/technical-context-lite.md`) aos documentos detalhados já existentes no repositório Grace Hopper.

## Mapa de Fontes

| Tema | Arquivo | Conteúdo |
|------|---------|----------|
| Visão executiva | `README.md` | Pitch, features, stack, roadmap, métricas |
| Product OS / Portfólio | `grace_hopper_ai_docs (2)/grace_hopper_product_os.md` | MUST/SHOULD/COULD, Miro boards, cronograma 2 semanas |
| Overview | `grace_hopper_ai_docs (2)/product-overview.md` | Visão, problema, solução, audiência |
| Jornada | `grace_hopper_ai_docs (2)/user-journey.md` | Fluxo landing → feedback → progresso |
| Roadmap | `grace_hopper_ai_docs (2)/roadmap.md` | MVP, V2, V3 |
| Arquitetura | `grace_hopper_ai_docs (2)/architecture.md` | Diagrama Mermaid — stack MVP |
| ADRs | `grace_hopper_ai_docs (2)/GRACE_HOPPER_ADR.md` | Decisões técnicas v2.0 (Next.js API Routes) |
| Sistema de IA | `grace_hopper_ai_docs (2)/ai-system.md` | Prompts, estrutura JSON de feedback |
| Design System | `grace_hopper_ai_docs (2)/design-system.md` | Cores, tipografia, direção visual |
| Métricas | `grace_hopper_ai_docs (2)/metrics.md` | KPIs de produto |
| Glossário | `grace_hopper_ai_docs (2)/glossary.md` | Termos do domínio |
| Guia MVP Cursor | `Cursor_docs/GRACE_HOPPER_CURSOR_MVP_GUIDE.md` | **Stack ativa** — Lovable + Next.js API + Supabase + Gemini |
| Board visão | `board-1-vision.html.html` | Product Vision (Miro-style HTML) |
| Board visão alt | `grace_hooper_product_vision` | Versão HTML da visão |
| Portal PRD | `grace_hopper_prd_portal.html` | Portal consolidado de documentação |
| PRD PDF | `Projeto_Grace_Hopper_PRD (2).pdf` | PRD formal |

## Conceitos Chave

- **MVP MUST:** login, perguntas IA, voz, feedback, dashboard simples
- **Stack MVP (única ativa):** Next.js + API Routes + Supabase + Gemini + Web Speech API + Vercel (R$ 0)
- **Entregáveis de portfólio:** produto online, GitHub, Miro, PRD+backlog, post LinkedIn

## Armadilhas (Gotchas)

1. **Progresso no README:** percentuais de frontend/backend são aspiracionais — código da app ainda não existe no repo.
2. **Pasta `grace-hopper-web/`:** planejada mas ainda não criada — export Lovable pendente.
3. **Web Speech API:** precisão varia por browser; Chrome costuma funcionar melhor.
4. **PRD PDF:** pode conter stack antiga — priorizar ADR v2.0 e guia Cursor para implementação.

## Próxima Ação Recomendada

Invocar **@engineer** para planejar F-01 (Landing) após export do template Lovable, seguindo `GRACE_HOPPER_CURSOR_MVP_GUIDE.md`.
