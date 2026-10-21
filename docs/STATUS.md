# Andamento — BOLD OS

Atualizado em 21/10/2026.

## Estado verificável

- Documentação de produto, arquitetura, testes, backlog e direção visual presente.
- Aplicação, dependências, bancos e testes ainda não implementados.
- B00 em andamento: roteiro preparado, validação operacional pendente.
- B01 e demais histórias não iniciadas; G0 e G1 não atingidos.
- Repositório indicado pelo usuário: rodriigoamorim-Bold/OS.

## Próxima entrega

Concluir as decisões bloqueadoras de B00 em DISCOVERY.md e preparar a primeira
fatia de B01: persistir comando, recibo e outbox atomicamente em SQLite, reiniciar
e verificar persistência com dados sintéticos. Isso será apenas parte de B01;
HTTPS/LAN, identidade offline, PostgreSQL, reenvio e restore seguem necessários.

## Retomada econômica

1. Ler este arquivo e verificar git status/diff.
2. Escolher uma única fatia e ler apenas suas seções em SPEC, SDD, TDD e BACKLOG.
3. Registrar testes realmente executados e limitações; atualizar este estado.
4. Fazer commit pequeno por entrega verificada. Não reler conversas inteiras.

## Decisões preservadas

TypeScript/React/Vite/Fastify e SQLite/PostgreSQL são propostas sujeitas ao spike.
Offline do MVP pressupõe servidor e LAN ativos. Um escritor por unidade.
Sem dados pessoais reais no desenvolvimento. A interface segue UI-DESIGN.md.

## Verificações desta preparação

Inspeção local confirmou somente docs e Git sem commits no início da sessão.
Revisão documental; nenhuma suíte de software disponível para executar.
