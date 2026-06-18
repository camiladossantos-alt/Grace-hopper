# Case Study — Construindo o Grace Hopper: Latência, Gestão de Custos (R$ 0) e UX em um Coach de IA por Voz

| Métrica | Resumo do Case |
| :--- | :--- |
| **Papel** | Lead Product Manager de IA (Concepção, Priorização, Validação e Launch) |
| **Duração** | 2 Semanas |
| **Orçamento** | R$ 0,00 (Desafio de Custo Zero de Infraestrutura) |
| **Resultado** | Simulador funcional integrado ao Supabase e Gemini com latência de resposta de IA < 2.5s. |

---

## 1. O Desafio de Mercado

Preparar-se para entrevistas de emprego é um processo solitário e estressante. Estudos de mercado mostram que **mais de 60% dos candidatos falham em entrevistas de tecnologia devido a travas de comunicação** ou incapacidade de estruturar respostas técnicas complexas em tempo real. 

Como Product Manager, meu objetivo era construir uma solução que simulasse um entrevistador real com duas premissas desafiadoras:
1.  **Custo de Operação R$ 0:** O produto precisava ser 100% gratuito e escalável, sem depender de cartões de crédito para manter APIs pagas rodando.
2.  **Efeito WOW Instantâneo:** A análise de voz precisava ser exibida na tela em menos de 3 segundos para manter o engajamento do usuário alto.

---

## 2. Abordagem de Produto (O Processo de Decisão)

### Desafio 1: O Dilema da Transcrição de Áudio (STT)
A funcionalidade de voz é o diferencial competitivo (*WOW factor*) do produto. Para capturar e transcrever a fala do usuário, tínhamos duas abordagens de engenharia e produto:

*   **Abordagem A: APIs de Nuvem Pagas (Google Cloud STT ou OpenAI Whisper API)**
    *   *Prós:* Altíssima precisão de áudio, independente do navegador do usuário.
    *   *Contras:* Custo recorrente por minuto de gravação. Exigia implementação de uploads pesados de arquivos de áudio no servidor, gerando overhead de armazenamento e latência de upload.
*   **Abordagem B: Web Speech API (Nativa do Browser)**
    *   *Prós:* 100% gratuita. Processamento local no navegador, eliminando a necessidade de transferir arquivos de áudio pesados para o servidor. Latência de transcrição imediata.
    *   *Contras:* Incompatibilidade com navegadores legados e precisão menor em ambientes barulhentos.
*   **Decisão do PM:** **Escolhemos a Abordagem B.** Para mitigar os contras, criei um requisito de design de **Fallback de UX**: se o microfone falhar ou o navegador não der suporte, a tela exibe um campo de texto (`textarea`) clássico onde o usuário pode colar/digitar sua resposta. Isso salvaguardou o fluxo de retenção.

### Desafio 2: Minimizando a Latência da IA (Feedback em < 3s)
Receber um feedback detalhado com nota e sugestões estruturadas precisa ser rápido. Se o tempo de carregamento passasse de 5 segundos, a taxa de abandono aumentaria drasticamente.

*   **Mitigação 1 (Modelo de Linguagem):** Escolhemos trabalhar com o modelo **Gemini 2.5 Flash Lite** em vez do Gemini 1.5 Pro. O modelo Lite processa a análise e retorna em formato JSON estruturado na metade do tempo (média de 1.2 segundos).
*   **Mitigação 2 (Serverless Routes):** Mantivemos as APIs integradas dentro das rotas do Next.js (Serverless Routes) rodando na Vercel, eliminando o *cold start* de ter um microsserviço separado em Python (FastAPI).

---

## 3. Priorização Baseada em Dados e Foco no MVP

Com um prazo rígido de 2 semanas de desenvolvimento, decidi focar exclusivamente no núcleo da experiência do usuário (*Core Experience*). 

Mapeei e posterguei recursos comuns, mas de baixo impacto imediato, como **Gamificação (Pontuações/Badges)** e **Recrutador Virtual IA com voz sintetizada (Text-to-Speech)**. Ambas as ideias foram movidas para o backlog de evolução (V2), mantendo o time focado no pipeline básico:
```
Login Google -> Seleção de Pergunta -> Resposta por Voz -> Feedback Instantâneo -> Dashboard
```

---

## 4. Segurança, Compliance e LGPD (Visão PM)

Em produtos de IA que capturam dados biométricos (voz), o PM deve antecipar riscos de privacidade:
1.  **Privacidade de Dados:** Tomamos a decisão de **não armazenar os arquivos de áudio** dos usuários no banco de dados. Apenas o texto transcrito localmente é enviado e persistido. Isso reduziu nosso risco com a LGPD a quase zero e nos poupou custos com storage.
2.  **Segurança RLS (Row Level Security):** Configurei políticas de segurança no banco Supabase para garantir que nenhum usuário pudesse acessar de forma alguma o histórico ou feedback de outro candidato.
3.  **Proteção de API (Anti-CSRF):** Adicionamos verificações estritas na API para garantir que apenas requisições vindas do nosso domínio oficial de produção pudessem acessar o modelo do Gemini, protegendo a nossa chave de API e cota diária gratuita contra roubos ou abusos.

---

## 5. Resultados e Lições Aprendidas

1.  **Velocidade Importa:** Reduzir a latência do feedback da IA para menos de 2.5s foi o principal fator de satisfação nos testes preliminares. Os candidatos relataram sentir que estavam conversando com uma pessoa de verdade em vez de esperar um processamento robótico demorado.
2.  **Design com Foco em Acessibilidade:** Implementar navegação 100% amigável ao teclado e anéis de foco visíveis tornou a plataforma utilizável para pessoas com deficiências motoras temporárias ou permanentes, alinhando o produto às melhores práticas globais de acessibilidade (WCAG).
3.  **Feedback Prático com Sugestão de Frases ("Como dizer isso melhor"):** Percebemos que diagnosticar erros não era suficiente para diminuir a insegurança do candidato. Implementamos a geração de sugestões de frases profissionais personalizadas para as respostas, fornecendo exemplos de formulações sêniores. Isso transformou um feedback passivo em aprendizado imediato e acionável.
4.  **Segurança e Proteção de Custos como Requisito de MVP:** Em um produto gratuito baseado em APIs públicas, a segurança de infraestrutura contra abusos é um requisito de negócio crítico. Implementar validações estritas de Same-Origin (Anti-CSRF) e limites de tamanho de transcrição nos permitiu proteger a integridade do serviço e manter o orçamento em R$ 0.
5.  **A IA como Agente Conversacional Autônomo (Agentic Coach):** Projetamos o MVP para que a IA não fosse um mero analisador de texto estático, mas sim um agente ativo. O modelo assume dinamicamente papéis específicos (como recrutador de soft skills ou sabatinador técnico) e calibra seu feedback de acordo com o contexto do cargo escolhido. Isso provou que a real entrega de valor em produtos de IA generativa está em criar simuladores dinâmicos orientados a papéis (*roleplay agents*).
6.  **Próximos Passos de Produto:** O sucesso do MVP valida a hipótese de que a prática por voz resolve a ansiedade do usuário. Para a V2, o foco será a integração do **Método STAR** de forma explícita na análise da IA, ajudando os candidatos a estruturarem melhor suas histórias profissionais.
