# Miro Boards Blueprint — Planejamento Visual do Produto (Grace Hopper)

Este documento contém o blueprint textual e a estrutura exata para desenhar os **4 Quadros Públicos no Miro**. 

Usar o Miro demonstra a sua habilidade como **AI Product Manager** de pensar visualmente, mapear jornadas complexas e traduzir necessidades de negócio em fluxos de engenharia.

---

## Dica do Miro: Como criar Post-its em Lote
Para criar os post-its abaixo rapidamente no Miro:
1. Copie as linhas de texto da seção correspondente.
2. No Miro, clique no quadro e aperte `Ctrl + V` (ou selecione a ferramenta Post-it e cole).
3. O Miro criará automaticamente um post-it separado para cada linha de texto!

---

## 🎨 Board 1: Product Vision (Lean Canvas & ICP)
**Objetivo:** Mostrar o alinhamento estratégico do negócio e quem é o cliente do Grace Hopper.
**Visual recomendado:** Um template de Lean Canvas clássico (cores neutras) com duas caixas adicionais para "Inteligência Artificial (AI Core)" e "ICP Persona".

### Sticky Notes para o Lean Canvas:

#### Problema (Post-its Vermelhos/Rosa 🟥)
* Prática de entrevistas com humanos não escala (coaches limitados e caros)
* Ansiedade severa impede candidatos juniores de performarem bem
* Feedbacks de amigos e testes de texto não simulam a pressão da fala real

#### Solução (Post-its Verdes 🟩)
* Simulador de voz 24/7 gratuito e ilimitado
* Transcrição imediata da fala no browser
* Feedback estruturado de IA (nota + pontos fortes + melhorias técnicas/comunicativas) em < 3s

#### Proposta de Valor Única (Post-its Amarelos 🟨)
* Prática realista de entrevistas por voz com feedback instantâneo de IA, no seu ritmo e 100% gratuito.

#### Vantagem Competitiva (Post-its Roxo/Lilás 🟪)
* Arquitetura de Custo Zero (Web Speech API + Gemini Free Tier) que permite escalabilidade infinita sem custos de infraestrutura de voz.

#### Métricas de Sucesso (Post-its Azuis 🟦)
* Ativação: % de novos usuários que concluem a 1ª entrevista (> 60%)
* Retenção de 7d: % de usuários recorrentes (> 35%)
* Satisfação: Net Promoter Score (NPS > 40)
* Performance: Latência de resposta da IA (< 3 segundos)

---

## 🎨 Board 2: User Journey Map (Jornada do Candidato)
**Objetivo:** Mapear a experiência de ponta a ponta do candidato na plataforma.
**Visual recomendado:** Linha do tempo horizontal dividida em fases, mostrando Ações, Pensamentos, Pontos de Dor e Oportunidades.

### Fases da Jornada:

```
[ Fase 1: Descoberta ] -> [ Fase 2: Login ] -> [ Fase 3: Prática (Voz) ] -> [ Fase 4: Feedback ] -> [ Fase 5: Evolução ]
```

#### FASE 1: DESCOBERTA E ATRAÇÃO (Landing Page)
* **Ação do Usuário:** Entra no site, lê a proposta de valor e clica em "Começar entrevista".
* **Pensamentos:** "Será que esse simulador é realmente gratuito? Vai me ajudar com entrevistas de React?"
* **Dor:** Ceticismo com ferramentas de IA e medo de precisar cadastrar cartão de crédito.
* **Oportunidade PM:** CTA limpo, reforçando "100% gratuito" e sem fricção na landing page.

#### FASE 2: ENTRADA SEGURA (Login OAuth)
* **Ação do Usuário:** Clica no botão e conecta usando a conta da Google.
* **Pensamentos:** "Ótimo, não preciso preencher um formulário gigante de cadastro."
* **Dor:** Medo de vazamento de dados de voz ou perfil.
* **Oportunidade PM:** Explicitar compliance com a LGPD (não salvamos arquivos de áudio brutos).

#### FASE 3: A SIMULAÇÃO (Sessão de Voz)
* **Ação do Usuário:** Escolhe a categoria de entrevista, lê a pergunta gerada, ativa o microfone e fala sua resposta.
* **Pensamentos:** "Estou um pouco nervoso... O microfone está funcionando? Onde vejo o que falei?"
* **Dor:** Ansiedade da gravação; erros de transcrição do Speech-to-Text; navegador não compatível.
* **Oportunidade PM (Solução de UX):** Transcrição em tempo real na tela, permitindo que o usuário edite o texto manualmente para corrigir falhas de STT antes de enviar para análise. Fallback de digitação.

#### FASE 4: O RESULTADO (Feedback de IA)
* **Ação do Usuário:** Aguarda o processamento e lê a nota, pontos fortes e sugestões.
* **Pensamentos:** "Uau, carregou muito rápido! As sugestões de frases profissionais fazem muito sentido."
* **Dor:** Frustração se a nota for muito baixa sem justificativa acionável.
* **Oportunidade PM:** Exibir sugestões de frases concretas em caixas azuis suaves com ícone de lâmpada (`💡`) para alta legibilidade.

#### FASE 5: EVOLUÇÃO (Dashboard e Retorno)
* **Ação do Usuário:** Acessa o dashboard, revisa o histórico e inicia uma nova tentativa para melhorar a nota.
* **Pensamentos:** "Minha média está subindo. Vou treinar mais uma comportamental hoje."
* **Dor:** Perda de progresso histórico.
* **Oportunidade PM:** Manter histórico persistido via Supabase e protegido por RLS (Row Level Security).

---

## 🎨 Board 3: MVP Scope Matrix (Matriz Esforço x Valor)
**Objetivo:** Justificar visualmente a priorização das funcionalidades para investidores ou recrutadores.
**Visual recomendado:** Um plano cartesiano onde o eixo Y é **Valor para o Usuário** (High/Low) e o eixo X é **Esforço de Engenharia** (Low/High).

### Posicionamento dos Post-its no Quadro:

#### Quadrante: Alto Valor / Baixo Esforço (Foco do MVP - Post-its Verdes 🟩)
* **Login Google OAuth (Supabase):** Baixo esforço de integração, alto valor de segurança e simplicidade.
* **Web Speech API (STT):** Sem custo de nuvem, transcrição rápida no client-side.
* **Gemini 2.5 Flash Lite:** Excelente velocidade (< 1.5s de resposta), custo zero e alta precisão.
* **Dashboard de Progresso Básico:** Listagem simples de dados salvos no Supabase.

#### Quadrante: Alto Valor / Alto Esforço (Roadmap V2/V3 - Post-its Amarelos 🟨)
* **Text-to-Speech (IA falando a pergunta):** Aumenta o realismo, mas exige biblioteca de síntese de voz e latência de carregamento.
* **AI Recruiter Persona (Avatar Virtual):** Alto esforço de frontend/design de vídeo.
* **Mapeamento de Competências e Análise STAR:** Exige prompts de IA mais densos e cadeias de LLM complexas (LangChain).

#### Quadrante: Baixo Valor / Baixo Esforço (Postergado - Post-its Cinzas ⬜)
* **Seleção de Múltiplos Idiomas de Áudio:** O foco do ICP atual é apenas pt-BR.
* **Dark Mode Customizável:** Design-system padrão já é clean e moderno, sem necessidade de duplicar folha de estilo agora.

#### Quadrante: Baixo Valor / Alto Esforço (Descartado - Post-its Vermelhos 🟥)
* **Upload e Processamento de Áudio Bruto no Servidor:** Custo altíssimo de storage e transferência de dados para um produto gratuito.

---

## 🎨 Board 4: Architecture & Data Flow (Fluxo do Produto IA)
**Objetivo:** Demonstrar o entendimento técnico do fluxo de dados e integrações do PM de IA.
**Visual recomendado:** Fluxograma simples de blocos conectados por setas direcionais, ilustrando o caminho da requisição.

```
                                      [ FLUXO DE DADOS ]
                                      
+--------------------------------------------------------------------------------------------------+
| CLIENT-SIDE (Navegador)                                                                          |
|                                                                                                  |
|   1. Usuário seleciona categoria ----> 2. Dispara POST /api/interview/start                       |
|                                                                                                  |
|   3. Lê Pergunta na Tela ------------> 4. Usuário fala -> Web Speech API (transcreve localmente) |
|                                                                                                  |
|   5. Revisa/Edita texto -------------> 6. Clica "Enviar" -> POST /api/interview/analyze          |
+--------------------------------------------------------------------------------------------------+
                                                 |
                                                 v
+--------------------------------------------------------------------------------------------------+
| SERVER-SIDE (Vercel API Routes)                                                                  |
|                                                                                                  |
|   * Validação CSRF (Origin vs Host)                                                              |
|   * Autenticação Supabase Server-Client (Cookies)                                                |
|   * Limite de Payload (Max 10.000 caracteres)                                                    |
+--------------------------------------------------------------------------------------------------+
                                                 |
                   +-----------------------------+-----------------------------+
                   | (Grava/Lê Dados)                                          | (Chama API JSON)
                   v                                                           v
+-------------------------------------+                     +--------------------------------------+
| DATABASE (Supabase PostgreSQL)      |                     | AI ENGINE (Google Gemini API Studio) |
|                                     |                     |                                      |
| * Tabela "interviews"               |                     | * Prompt estruturado pt-BR           |
| * Tabela "feedback"                 |                     | * Modelo: gemini-2.5-flash-lite      |
| * Row Level Security (RLS ativo)    |                     | * Response MIME: application/json    |
+-------------------------------------+                     +--------------------------------------+
```
