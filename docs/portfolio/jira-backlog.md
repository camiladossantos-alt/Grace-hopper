# Jira Backlog — Estrutura de Tarefas e Histórias de Usuário (Grace Hopper)

Este documento descreve como o backlog do projeto **Grace Hopper** foi planejado e priorizado sob a perspectiva de um Product Manager ágil. 

Disponibilizamos abaixo o backlog detalhado com **Epics, User Stories, Story Points (Fibonacci) e Critérios de Aceite no formato Gherkin (Dado/Quando/Então)**, além do passo a passo para importar esses itens diretamente no seu Jira usando o arquivo CSV complementar.

---

## 1. Estrutura de Priorização e Dimensionamento (Backlog)

Adotamos a escala de Fibonacci para estimar os Story Points (esforço e complexidade de desenvolvimento) e priorizamos os tickets com base na criticidade para o MVP.

### Epics Mapeados
1.  **EP-01: Autenticação & Segurança (Auth & Security)**
2.  **EP-02: Core UX — Fluxo de Entrevista (Interview Flow)**
3.  **EP-03: Inteligência Artificial (AI Integration)**
4.  **EP-04: Histórico & Progresso (Dashboard)**

---

## 2. Histórias de Usuário (User Stories) em Detalhe

### EP-01: Autenticação & Segurança

#### [US-01] Cadastro e Login Simplificado com Google OAuth
*   **Prioridade:** `High`
*   **Estimativa:** `3 Story Points`
*   **User Story:**
    *   **Como** candidato buscando praticidade,
    *   **Quero** logar na plataforma usando minha conta Google com um clique,
    *   **Para** acessar o simulador e ter meu histórico salvo imediatamente sem preencher formulários longos.
*   **Acceptance Criteria (Gherkin):**
    *   **Dado** que estou na página de login (`/login`),
    *   **Quando** clico no botão "Continuar com Google",
    *   **Então** sou redirecionado ao fluxo oficial de autenticação da Google via Supabase.
    *   **Dado** que a autenticação foi bem-sucedida,
    *   **Quando** o fluxo retorna para a aplicação,
    *   **Então** sou redirecionado para a rota protegida `/dashboard`.

#### [US-02] Proteção de API contra Abuso (CSRF & Payload Limits)
*   **Prioridade:** `High`
*   **Estimativa:** `3 Story Points`
*   **User Story:**
    *   **Como** administrador do sistema,
    *   **Quero** validar a origem das requisições e limitar o tamanho dos textos enviados para a API,
    *   **Para** evitar ataques de CSRF e consumo indevido da minha cota da API do Gemini.
*   **Acceptance Criteria (Gherkin):**
    *   **Dado** uma requisição POST direcionada às rotas `/api/interview/*`,
    *   **Quando** o cabeçalho `Origin` não for idêntico ao `Host` da aplicação,
    *   **Então** a API bloqueia a requisição retornando `Status 403 (Forbidden)`.
    *   **Dado** uma transcrição maior que 10.000 caracteres,
    *   **Quando** enviada para `/api/interview/analyze`,
    *   **Então** a API recusa a requisição com `Status 400 (Bad Request)`.

---

### EP-02: Core UX — Fluxo de Entrevista

#### [US-03] Transcrição de Resposta por Voz em Tempo Real (Speech-to-Text)
*   **Prioridade:** `High`
*   **Estimativa:** `8 Story Points` (Complexidade de integração de API de voz no front)
*   **User Story:**
    *   **Como** candidato respondendo à simulação,
    *   **Quero** falar no microfone do meu navegador e ver a transcrição em texto aparecer em tempo real,
    *   **Para** que eu possa revisar o que falei antes de submeter a resposta para a IA.
*   **Acceptance Criteria (Gherkin):**
    *   **Dado** que iniciei uma gravação de resposta na tela `/interview/[id]`,
    *   **Quando** falo no microfone,
    *   **Então** a Web Speech API transcreve a minha fala em português (`pt-BR`) na caixa de texto.
    *   **Dado** que a transcrição terminou,
    *   **Quando** clico na caixa de texto,
    *   **Então** o sistema permite a edição manual para correções ortográficas rápidas.
    *   **Dado** que as permissões de microfone foram negadas pelo navegador,
    *   **Quando** a página tenta acessar o microfone,
    *   **Então** exibe um fallback permitindo colar ou digitar a resposta manualmente.

#### [US-04] Acessibilidade WCAG e Focus Ring nos Controles
*   **Prioridade:** `Medium`
*   **Estimativa:** `2 Story Points`
*   **User Story:**
    *   **Como** usuário que navega exclusivamente via teclado ou leitor de tela,
    *   **Quero** ter indicadores de foco visuais nítidos em todos os botões de ação e gravação,
    *   **Para** conseguir praticar de forma inclusiva e sem barreiras de acessibilidade.
*   **Acceptance Criteria (Gherkin):**
    *   **Dado** que estou navegando pela plataforma utilizando a tecla `Tab`,
    *   **Quando** foco em botões de gravação, abas ou CTAs,
    *   **Então** o elemento é destacado visualmente com um anel de foco bem delineado (`focus-visible:ring-2`).

---

### EP-03: Inteligência Artificial

#### [US-05] Geração de Perguntas Dinâmicas por Cargo e Tipo (Gemini)
*   **Prioridade:** `High`
*   **Estimativa:** `5 Story Points`
*   **User Story:**
    *   **Como** candidato buscando treinar cenários reais de contratação,
    *   **Quero** que a plataforma gere perguntas sob medida do tipo Técnico, Comportamental ou Situacional,
    *   **Para** simular a imprevisibilidade de uma sabatina de seleção real.
*   **Acceptance Criteria (Gherkin):**
    *   **Dado** que escolhi praticar uma entrevista "Técnica",
    *   **Quando** a página `/interview` inicia,
    *   **Então** a API chama o Gemini para estruturar uma pergunta curta focada na categoria e cargo informados.
    *   **Dado** que a API do Gemini está fora do ar ou lenta,
    *   **Quando** o timeout de 5s expira,
    *   **Então** o sistema carrega uma pergunta Mock padrão local para garantir a continuidade da prática.

#### [US-06] Feedback de IA Estruturado e Sugestão de Frases Profissionais
*   **Prioridade:** `High`
*   **Estimativa:** `5 Story Points`
*   **User Story:**
    *   **Como** candidato ansioso pelo resultado da minha simulação,
    *   **Quero** que a IA retorne uma nota geral de 0 a 100 com pontos fortes e fracos estruturados, e sugestões de "Como dizer isso melhor",
    *   **Para** saber exatamente onde errei e corrigir meu vocabulário.
*   **Acceptance Criteria (Gherkin):**
    *   **Dado** que enviei minha resposta transcrita para análise,
    *   **Quando** a IA processa os dados,
    *   **Então** retorna um JSON estrito contendo nota, lista de pontos fortes, lista de fraquezas e sugestões de frases de impacto.
    *   **Dado** a exibição do feedback na tela,
    *   **Quando** a IA fornece a sugestão,
    *   **Então** o frontend estiliza as sugestões de frases profissionais com caixas destacadas e ícone de lâmpada (`💡`) para alta legibilidade.

---

### EP-04: Histórico & Progresso

#### [US-07] Dashboard com Histórico e Segurança RLS
*   **Prioridade:** `Medium`
*   **Estimativa:** `3 Story Points`
*   **User Story:**
    *   **Como** usuário recorrente da plataforma,
    *   **Quero** ver meu histórico de simulações com as respectivas notas em um dashboard centralizado,
    *   **Para** ver a evolução do meu score ao longo do tempo de maneira segura e privativa.
*   **Acceptance Criteria (Gherkin):**
    *   **Dado** que estou autenticado na rota `/dashboard`,
    *   **Quando** a página é carregada,
    *   **Então** exibe a lista das últimas simulações do meu usuário com a data e nota.
    *   **Dado** a segurança do Supabase PostgreSQL ativa (Row Level Security - RLS),
    *   **Quando** tento acessar dados de entrevista de outros usuários mudando o ID da URL,
    *   **Então** o banco impede o retorno de dados (Status 404/401).

---

## 3. Como Importar este Backlog para o seu Jira em 1 Minuto

Demonstrar a um recrutador que você sabe operar o **Jira** via importação em massa é uma excelente demonstração de competência ágil. Siga este processo simples:

1.  Acesse o seu Jira e abra o seu projeto (quadro Kanban ou Scrum).
2.  No menu superior ou lateral esquerdo, clique em **Search (Pesquisa)** ou acesse a visualização de **Filters (Filtros)**.
3.  Procure pela opção **Import issues from CSV (Importar pendências de CSV)** (geralmente localizada nos três pontinhos no canto superior direito de "All Issues").
4.  Selecione o arquivo [jira-backlog-import.csv](file:///c:/Users/Pulse%20Mais/OneDrive/Project%20Grace%20Hooper/docs/portfolio/jira-backlog-import.csv) criado na pasta deste projeto.
5.  No mapeamento de campos (Field Mapping), certifique-se de associar:
    *   `Issue Type` -> `Issue Type`
    *   `Summary` -> `Summary`
    *   `Description` -> `Description`
    *   `Priority` -> `Priority`
    *   `Story Points` -> `Story Points`
    *   `Epic Name` -> `Epic Name`
6.  Clique em **Begin Import (Iniciar Importação)**. Pronto! Seu backlog de portfólio completo estará montado na tela em segundos.
