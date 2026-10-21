# BOLD OS — Plano de construção

> Atualização de 21/10/2026: Supabase gerenciado aprovado; servidor local rejeitado. [ADR 006](adr/006-supabase.md) prevalece sobre a proposta local/offline abaixo. As seções anteriores são histórico pendente de revisão detalhada; não comprovam implementação.

Versão 0.1 · 20/10/2026 · Status: proposta para validação de Munir e Tamires.

Fonte: proposta “BOLD OS — Bread of Life Desk” fornecida nesta conversa. Estes documentos traduzem a proposta em trabalho executável; decisões técnicas e metas novas são propostas, não requisitos já aprovados.

## Documentos

| Documento | Finalidade |
|---|---|
| [SPEC](SPEC.md) | Produto, escopo, regras e critérios de aceite |
| [TDD](TDD.md) | Desenvolvimento orientado a testes e estratégia de verificação |
| [SDD](SDD.md) | System Design Document: arquitetura, dados, contratos e decisões |
| [Direção visual](UI-DESIGN.md) | Frontend inspirado nas referências Hunter/LeadPulse fornecidas |
| [BACKLOG](BACKLOG.md) | Entregas ordenadas e prompts para vibecoding |

TDD significa Test-Driven Development neste pacote. O design técnico está no SDD. SDD também orienta o ciclo de Spec-Driven Development: especificar → testar → implementar → demonstrar → revisar a especificação.

## Plano de entregas

1. **Descoberta e fundação:** validar processo real, definir responsáveis, provar operação local e sincronização com dados fictícios.
2. **MVP operacional:** roupas, alimentos, doações, estoque, ações de rua e PRI mínimo. Entrega vertical: receber doação → reservar → entregar → registrar atendimento → sincronizar → conferir relatório.
3. **Continuidade do cuidado:** cinco fases do PRI, encaminhamentos e vagas em parceiros.
4. **Gestão ampliada:** casa de apoio, custos, cafés e escalas.
5. **Rede e expansão:** RECRIE, formação de voluntários, campanhas e eventual expansão para novas unidades.

Estimativa inicial de planejamento: 8–12 ciclos de uma semana para fundação e MVP, com uma pessoa técnica e participação semanal de operadores. Não é compromisso de prazo: recalibrar após prova offline e primeira entrega vertical. Fases posteriores devem ser estimadas após o piloto. Não há orçamento aprovado; levantar equipamento local, hospedagem, armazenamento, backups, domínio, suporte e manutenção.

## Como executar com IA

Trabalhar em uma história por vez. Entregar primeiro um fluxo completo pequeno, com dados fictícios e critérios verificáveis. O backlog fornece o prompt reutilizável e a ordem de dependências. Nenhum documento implica autorização para publicar, importar prontuários reais ou contratar serviços.

Primeiro passo: executar B00 e B01. Primeiro piloto: B00–B11 completos e gate G1 aprovado. A ampliação depende de evidência do piloto, não apenas de telas prontas.

## Retomada do trabalho

Consultar [STATUS.md](STATUS.md) para o estado atual e [DISCOVERY.md](DISCOVERY.md) para a descoberta B00.
