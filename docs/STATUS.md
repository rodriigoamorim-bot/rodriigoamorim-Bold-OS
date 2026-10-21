# Andamento — BOLD OS

Atualizado em 21/10/2026.

## Decisão vigente

Supabase gerenciado escolhido pelo usuário; Dell apenas como cliente. React,
TypeScript e Vite. ADR 006 prevalece sobre a proposta local-cloud anterior.
Sem projeto Supabase provisionado, contratação, publicação ou dados reais.
Offline definitivo e responsável pelo piloto ainda pendentes.

## Entrega local

Fundação parcial B02/UI01: navegação, lista fictícia de Assistidos, busca e resumo.
B03 parcial: migração PostgreSQL para organizações, unidades e atribuições, RLS
somente de leitura para unidades atribuídas; nenhuma escrita administrativa pelo
cliente. Login/sair e consulta de unidades preparados; sessão só em memória.
Nenhum módulo operacional ou PRI real pronto. G0/G1 pendentes.

## Verificação executada

Teste de busca e teste PostgreSQL PGlite passaram; TypeScript e build passaram.
Teste de banco RED por migração ausente, GREEN após implementação. Verifica escopo,
revogação, FK e negativas de leitura/escrita com papéis não privilegiados.
PGlite é dependência de teste; contrato Auth mínimo não valida JWT/REST Supabase.
Não houve ensaio visual, autenticação remota ou teste no projeto Supabase real.

## Próxima fatia

Usuário informou que ainda não tem projeto Supabase. Criar projeto Free de
DESENVOLVIMENTO na conta dele, aplicar migração e verificar Auth/RLS pelo REST.
Roteiro: SUPABASE-SETUP.md. Não solicitar senha nem chave secreta em chat.
Após aceite de identidade, iniciar doação/triagem com testes transacionais.
Definir comportamento offline antes de fechar B01 revisado. Ver ADR 006.
GitHub autenticado como rodriigoamorim-bot; origin correto:
rodriigoamorim-bot/rodriigoamorim-Bold-OS.

## Retomada econômica

Ler este arquivo, git status/diff e apenas os requisitos da próxima fatia. Uma
entrega por vez; registrar evidências e limitações; commit por entrega verificada.
