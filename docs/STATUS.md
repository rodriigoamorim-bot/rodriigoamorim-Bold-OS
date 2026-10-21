# Andamento — BOLD OS

Atualizado em 21/10/2026.

## Decisão vigente

Supabase gerenciado escolhido pelo usuário; Dell apenas como cliente. React,
TypeScript e Vite. ADR 006 prevalece sobre a proposta local-cloud anterior.
Sem projeto Supabase provisionado, contratação, publicação ou dados reais.
Offline definitivo e responsável pelo piloto ainda pendentes.

## Entrega local

Fundação parcial B02/UI01: navegação, lista fictícia de Assistidos, busca e resumo;
cliente Supabase opcional e formulário de teste de autenticação. Não há persistência
de domínio, tabelas ou RLS. Nenhum módulo operacional está pronto. G0/G1 pendentes.

## Verificação executada

Teste de busca falhou antes da implementação (módulo ausente) e passou depois.
TypeScript sem erros; build Vite concluído. Dependências e pnpm-lock.yaml gerados.
Instalador reportou script esbuild ignorado; build direto passou sem habilitá-lo.
Não houve ensaio visual, autenticação remota, banco ou teste de autorização real.

## Próxima fatia

Conectar projeto Supabase de desenvolvimento, criar migração de identidade e
atribuições com RLS, verificar acesso negado por padrão e por unidade. Definir
comportamento offline antes de fechar B01 revisado. Ver ADR 006 e DISCOVERY.md.
GitHub origin configurado; acesso remoto/push ainda bloqueado por autenticação.

## Retomada econômica

Ler este arquivo, git status/diff e apenas os requisitos da próxima fatia. Uma
entrega por vez; registrar evidências e limitações; commit por entrega verificada.
