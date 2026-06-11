# ADR-001: Implementar Validação de Origem (CSRF) e Formatação de Sugestões de Feedback sem Alterar Schema

- **Data**: 2026-06-11
- **Status**: Aceito
- **Decidido por**: @Antigravity, Camila dos Santos
- **Tags**: segurança, arquitetura, banco de dados, frontend

## Contexto e Definição do Problema
O Simulador de Entrevistas Grace Hopper utiliza o Supabase SSR para gerenciar sessões autenticadas por cookies no navegador. No entanto:
1. Os Route Handlers `/api/interview/start` e `/api/interview/analyze` realizavam operações de escrita (mutação de dados) sem proteção contra ataques de falsificação de requisição cross-site (CSRF).
2. Precisávamos incluir sugestões de pequenas frases que poderiam ser ditas no feedback dos candidatos, porém o banco de dados tem um schema fixo em produção, impossibilitando a criação imediata de novas colunas sem risco de quebra de compatibilidade.

---

## Direcionadores da Decisão
* **Segurança**: Proteger dados de usuários logados contra requisições fraudulentas externas.
* **Compatibilidade e Estabilidade**: Evitar migrações de banco de dados que exijam paradas ou possam corromper os ambientes locais dos desenvolvedores.
* **Complexidade Mínima**: Utilizar recursos nativos do ecossistema Next.js sem pacotes pesados ou stateful extras.

---

## Opções Consideradas

### Opção A: Validação Same-Origin no Backend e Delimitadores Customizados em Texto (Escolha Atual)
* **Segurança**: Valida se o cabeçalho `Origin` corresponde exatamente ao cabeçalho `Host` do servidor.
* **Banco de Dados**: Armazena as frases sugeridas nos campos de texto existentes (`technical_feedback` e `communication_feedback`) anexadas ao final da análise descritiva, separadas por um delimitador claro (`Sugestões de frases:`). O frontend divide a string no delimitador para renderizar o card destacado.

### Opção B: Tokens CSRF com Assinatura Criptográfica e Migração de Tabelas no Banco
* **Segurança**: Gera tokens CSRF exclusivos criptografados por sessão.
* **Banco de Dados**: Cria novas colunas de chaves estrangeiras e tabelas associadas para as frases sugeridas.

---

## Relação de Prós e Contras

### Opção A ✅ Escolhida
* **Prós**:
  * ✅ Implementação limpa e rápida sem dependências de pacotes.
  * ✅ Proteção CSRF robusta e segura para serviços que rodam em domínio único.
  * ✅ Zero alterações de schema ou migrações de banco necessárias.
* **Contras**:
  * ❌ Caso o frontend seja futuramente migrado para um subdomínio completamente separado, o Same-Origin check precisará ser flexibilizado ou reestruturado para CORS controlado.

### Opção B
* **Prós**:
  * ✅ Permite chamadas seguras cross-site intencionais.
* **Contras**:
  * ❌ Complexidade de gerenciamento de estado de tokens em serverless.
  * ❌ Alto risco de conflitos de banco de dados nos ambientes locais dos desenvolvedores devido a migrações de schema.

---

## Resultado da Decisão
Decidimos seguir com a **Opção A**. A validação baseada em `Origin` vs `Host` provê uma barreira de proteção sólida contra ataques de falsificação de requisição utilizando cookies ativos. A adoção de delimitadores de texto permitiu que a funcionalidade de frases sugeridas fosse implementada em produção com impacto zero no schema do Supabase.
