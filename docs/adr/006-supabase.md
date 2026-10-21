# ADR 006 — Supabase gerenciado e clientes web

Data: 21/10/2026. Decisão de produto autorizada pelo usuário.

## Decisão

Adotar Supabase (PostgreSQL e Auth) e frontend React/TypeScript/Vite.
Dell e demais computadores, tablets e celulares são clientes via navegador.
Desenvolvimento inicial local, com dados sintéticos, sem contratação ou publicação.
Projeto Supabase ainda não provisionado; hospedagem do frontend ainda não escolhida.

Substitui as propostas ADR 002–004 do SDD para o MVP. Não haverá servidor SQLite
na igreja, API local ou sincronização local-cloud nessa fundação. Fastify não é
necessário inicialmente. Reservas, entregas e demais comandos críticos deverão
ser transações no PostgreSQL, via funções RPC/migrações versionadas; nunca apenas
cálculos ou validação na interface. Reenvios continuam exigindo idempotência.

## Acesso

Supabase Auth identifica o usuário; grants, RLS por unidade/atribuição e funções
restritas devem proteger os dados no servidor. Papel técnico não recebe leitura
universal de PRI. Chave publishable pode estar no cliente; chaves secretas e
service_role não podem. Não criar tabelas de PRI acessíveis antes dos testes
negativos de acesso. Cadastro público não será disponibilizado nesta fatia.

## Offline e recuperação

Operação nesta fundação exige internet. Nenhuma escrita offline, cache PRI ou
fila de reenvio foi implementada. Requisito definitivo offline segue pendente:
não tratar essa hipótese como aprovação de remoção de RF16 pelo usuário.
Backup/restore continua obrigatório; evidências precisam ser replanejadas para
PostgreSQL/Supabase. Sem garantia de recuperação baseada apenas no nome do plano.

## Plano revisado e precedência

Este ADR prevalece sobre trechos de SQLite, LAN, grants offline e outbox do
planejamento de 20/10. Requisitos de cuidado, estoque, auditoria e acesso permanecem.

- B00: parcialmente levantado; responsável e conectividade pendentes.
- B01: substituir prova local-cloud por Auth, RLS, comando transacional idempotente
  e recuperação PostgreSQL. Definir critérios finais após requisito offline.
- B02/UI01: fundação e demonstração local podem avançar independentemente disso.
- B03: permissões no PostgreSQL/RLS e autenticação Supabase, sem grant local.
- B04–B07: preservar as jornadas, usando contratos transacionais PostgreSQL.
- B08: suspenso; replanejar apenas se houver necessidade de escrita desconectada.
- B09–B11: adaptar atualização, recuperação e gates; não liberar piloto sem novas
  evidências. T14–T19/T25–T26 exigem revisão de aplicabilidade; não foram aprovados
  nem dispensados. T01–T07 e testes de autorização continuam necessários.

## Primeira fatia entregue

Shell demonstrativo, busca sem distinção de acentos, resumo sintético e cliente
Supabase opcional com teste de login por senha. Não implementa estoque, PRI real,
autorização de domínio ou banco. Protótipo não satisfaz UI01 completo nem G0/G1.

Referências: https://supabase.com/docs/guides/auth/quickstarts/react e
https://supabase.com/docs/guides/getting-started/api-keys
