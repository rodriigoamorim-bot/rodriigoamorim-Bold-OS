# TDD — Desenvolvimento orientado a testes

Versão 0.1 · 20/10/2026. Este documento é o plano de verificação; nenhum teste foi implementado ou executado ainda.

## 1. Ciclo por história

1. Ler SPEC, regra de negócio e contrato SDD vinculados à história.
2. Escrever exemplo de aceite com dados fictícios e resultado esperado.
3. Criar teste que falha pelo comportamento ausente (RED), confirmar motivo da falha.
4. Implementar o mínimo necessário (GREEN), sem antecipar módulos futuros.
5. Refatorar mantendo contratos e testes (REFACTOR).
6. Demonstrar o fluxo, registrar evidência e atualizar documentos quando a regra mudar.

Não usar apenas snapshots de tela ou mocks como prova de integridade. Regras de estoque, autorização e sincronização precisam atingir os bancos reais de teste.

## 2. Camadas e ferramentas propostas

- Unitários: Vitest para regras puras, transições, cálculo e validação; relógio injetável.
- Integração: SQLite em arquivo temporário e PostgreSQL isolado de teste. Rodar o mesmo contrato de domínio nos dois adaptadores; incluir constraints e rollback.
- Contratos: validação de schemas HTTP, envelope de sync e compatibilidade de versões.
- E2E: Playwright em navegadores-alvo a validar com operadores; fluxos reais pela API.
- Resiliência: cortar apenas conexão local-cloud, matar/reiniciar processo, repetir e reordenar entregas; navegador deve continuar alcançando LAN.
- Segurança: matriz de autorização por papel, atribuição, unidade e organização em cada superfície. Testes negativos são obrigatórios.

## 3. Matriz rastreável

| Teste | SPEC | Cenário e resultado |
|---|---|---|
| T01 | RF01 | Estoquista consulta PRI por API, busca e exportação: 403, sem payload sensível |
| T02 | RF02/RF08 | Cadastrar pessoa sem CPF; atendimento persiste com id interno e responsável |
| T03 | RF03/RF04 | Doação em triagem não aumenta saldo disponível; aprovação aumenta uma vez |
| T04 | RF05/RN03 | Lote vencido/bloqueado rejeitado; FEFO considera data local e empate determinístico |
| T05 | RF06/RN02 | Duas reservas simultâneas de 7 sobre saldo 10: apenas uma aceita; disponível 3 |
| T06 | RF06/RF17 | Repetir comando com mesma chave não duplica; payload diferente retorna 409 |
| T07 | RF07 | Reservar 60, entregar 45, devolver 15 sobre entrada 100: saldo final 55 e reserva zero |
| T08 | RF08/RF09 | Retorno da fase 4 para 2 preserva histórico; edição obsoleta exige revisão |
| T09 | RF10 | Vaga antiga mostra data e exige confirmação antes de encaminhamento aceito |
| T10 | RF11 | Admissões concorrentes na mesma cama/período: somente uma confirmada |
| T11 | RF12 | Cota prometida não aumenta recebido; parcelas pagas somam em centavos |
| T12 | RF13 | Confirmar café duas vezes baixa insumos uma vez; cancelar planejado não baixa |
| T13 | RF14 | Campanha não soma peças com kg; contribuição repetida não duplica meta realizada |
| T14 | RF16/NFR04 | Desligar internet por 8 h, operar na LAN e reiniciar serviço: dados/fila preservados |
| T15 | RF17 | Cloud confirma e ack se perde; reenvio mantém um movimento e um recibo |
| T16 | RF17 | Lote com conflito parcial: agregados independentes continuam; dependências aguardam |
| T17 | RF19/NFR05 | Restaurar backup local e reenviar outbox: dados recuperados e nenhum efeito duplicado |
| T18 | RF01 | Organização/unidade diferente, id adivinhado, acesso a anexo: negados |
| T19 | RF01/RF16 | Offline grant expirado impede nova escrita; reconexão aplica revogação antes de push |
| T20 | RF18 | Relatório confere com ledger e explicita última sincronização/pendências |
| T21 | RN01 | Unidade incompatível, quantidade negativa e arredondamento financeiro inválido: rejeitados |
| T22 | RF15 | Compartilhar oportunidade usa campos autorizados, sem notas PRI; formação registra conclusão |
| T23 | NFR06 | Fluxo principal por teclado e em 360 px, com erros legíveis e estado offline visível |
| T24 | RF19 | Logs, erros e telemetria não contêm texto do caso nem documento pessoal |
| T25 | RF17 | Cursor só avança após commit; crash entre recebimento e commit causa repetição segura |
| T26 | RF17 | Eventos com epoch antigo ou schema incompatível são retidos com motivo, sem aplicação silenciosa |

## 4. Exemplos de aceite

```gherkin
Funcionalidade: fechar ação e conciliar estoque
  Cenário: entrega parcial com devolução
    Dado um lote liberado de 100 garrafas de água
    E uma ação com reserva de 60 garrafas
    Quando o operador confirma entrega de 45 e devolução de 15
    Então o saldo físico é 55
    E a reserva ativa é zero
    E a entrega possui vínculo com a ação e autor
    Quando a mesma confirmação é reenviada
    Então o saldo físico continua 55

Funcionalidade: atendimento durante queda de internet
  Cenário: acolhimento sem documento
    Dado o servidor local provisionado e uma sessão offline válida
    E que a internet está indisponível, mas a LAN está ativa
    Quando registro uma pessoa por apelido e um atendimento
    Então o sistema confirma persistência local e mostra pendente
    Quando reinicio o serviço e restabeleço a internet
    Então existe um único atendimento local e remoto
```

## 5. Dados e execução

Fixtures: pessoas inteiramente fictícias, doação anônima, lotes vencido/hoje/futuro, roupa em triagem, duas unidades, dois perfis com mesmo nome, dois dispositivos, caso restrito e fila com dependência. Não copiar prontuários reais para testes ou prompts. Usar seeds determinísticos e relógio controlado, incluindo virada de dia no fuso local.

Carga NFR01–03 deve rodar no equipamento escolhido e registrar versão, volume, latência p95, falhas e idade da fila. Teste de carga não substitui ensaio de turno com operadores.

CI proposta: lint → typecheck → unitários → contratos/integração → E2E crítico. Comandos ainda serão definidos em B02; não apresentar scripts inexistentes como execução concluída.

## 6. Gates de entrega

**G0 — fundação:** prova offline/restart/restore com dados fictícios; HTTPS local e modelo de identidade demonstrados; decisões documentadas.

**G1 — piloto MVP:** T01–T07, T14–T21 e T23–T26 aprovados; T08 apenas no escopo PRI mínimo aplicável; teste de restauração cronometrado, reconciliação física, autorização institucional para dados reais e treinamento dos operadores. T09–T13 e T22 obrigatórios nas respectivas fases posteriores.

**G2 — ampliação:** cenários do módulo entregues, nenhum defeito crítico aberto, rollback demonstrável e validação do responsável da área.

Evidência por história: requisito/teste, comando executado, ambiente, resultado, artefato ou log sem dados pessoais e limitações conhecidas. Mudança só documental pede revisão de coerência e links; não exige suíte de software inexistente.
