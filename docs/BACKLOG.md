# BACKLOG — Execução em vibecoding

> Atualização de 21/10/2026: Supabase gerenciado aprovado; servidor local rejeitado. [ADR 006](adr/006-supabase.md) prevalece sobre a proposta local/offline abaixo. As seções anteriores são histórico pendente de revisão detalhada; não comprovam implementação.

Versão 0.1 · 20/10/2026 · Backlog proposto, sem histórias implementadas. Preparação de B00 iniciada em 21/10/2026; ver DISCOVERY.md e STATUS.md.

## 1. Priorização e capacidade

P0 forma o MVP; P1 amplia gestão e cuidado; P2 expande a rede. Tamanho relativo S/M/L indica incerteza e esforço, não prazo garantido. Dividir itens L em fatias demonstráveis antes de iniciar; não iniciar uma história cujo contrato depende de regra ainda indefinida.

Kanban: descoberta → pronta → teste falhando → implementação → revisão → demonstração → concluída. Limite recomendado: uma história em implementação por pessoa. Revisão pode ser feita pela mesma pessoa em passagem separada, acompanhada pelo responsável operacional na demonstração.

## 2. Ordem de execução

| ID | Prioridade | Entrega | Depende de | Porte |
|---|---|---|---|---|
| B00 | P0 | Descoberta e regras | — | S |
| B01 | P0 | Prova offline e recuperação | B00 | L |
| B02 | P0 | Fundação do repositório | B01 | M |
| B03 | P0 | Identidade e limites de acesso | B02 | L |
| B04 | P0 | Doação e triagem | B03 | M |
| B05 | P0 | Ledger e reservas | B04 | L |
| B06 | P0 | Pessoa e PRI mínimo | B03 | M |
| B07 | P0 | Ação de rua de ponta a ponta | B05, B06 | L |
| B08 | P0 | Sincronização operacional | B03, B07 | L |
| B09 | P0 | Relatórios e alertas básicos | B05, B07, B08 | M |
| B10 | P0 | Backup e operação | B08 | M |
| B11 | P0 | Piloto acompanhado | B09, B10 | L |
| B12 | P1 | PRI completo e rede parceira | B11 | L |
| B13 | P1 | Casa de apoio | B12 | M |
| B14 | P1 | Custos e patrocínios | B13 | M |
| B15 | P1 | Cafés e escala da Palavra | B11 | M |
| B16 | P2 | Campanhas | B11 | M |
| B17 | P2 | RECRIE e Escola de Acolhimento | B12 | M |
| B18 | P2 | Expansão e mobilidade | B11 | L |

B04/B05 e B06 são ramos independentes após identidade; isso permite escolher a próxima entrega sem exigir trabalho simultâneo. B08 incorpora a prova de B01 aos fluxos reais antes do piloto.

## 3. Histórias e prompts

Cada item abaixo é uma entrega de resultado. Antes de código, desdobrar a entrega em histórias no formato “Como [perfil], quero [ação], para [resultado]”, preservando os critérios listados. B00 e B01 são tarefas de descoberta/engenharia e não precisam simular histórias de usuário.

### B00 — Descoberta e regras

- **Status:** em andamento; roteiro em DISCOVERY.md, validação operacional pendente. **Prioridade:** P0. **Dependências:** —. **Porte:** S.
- **Rastreabilidade:** SPEC §9.
- **Resultado:** Mapa do atendimento real, responsáveis, inventário de equipamentos, indicadores e decisões de dados.
- **Aceite:** Validar hipóteses com liderança; registrar decisões pendentes e dono de cada uma.
- **Prompt específico:** “Execute B00: Descoberta e regras. Leia os documentos vinculados e o código existente. Entregue: Mapa do atendimento real, responsáveis, inventário de equipamentos, indicadores e decisões de dados. Demonstre: Validar hipóteses com liderança; registrar decisões pendentes e dono de cada uma. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B01 — Prova offline e recuperação

- **Status:** não iniciado. **Prioridade:** P0. **Dependências:** B00. **Porte:** L.
- **Rastreabilidade:** RF16–17, RF19; T14–17, T19, T25–26.
- **Resultado:** Spike API local/SQLite → outbox → cloud/PostgreSQL, HTTPS local e sessão offline.
- **Aceite:** Demonstrar commit com ack perdido, reinício, grant expirado e restore; atingir G0.
- **Prompt específico:** “Execute B01: Prova offline e recuperação. Leia os documentos vinculados e o código existente. Entregue: Spike API local/SQLite → outbox → cloud/PostgreSQL, HTTPS local e sessão offline. Demonstre: Demonstrar commit com ack perdido, reinício, grant expirado e restore; atingir G0. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B02 — Fundação do repositório

- **Status:** não iniciado. **Prioridade:** P0. **Dependências:** B01. **Porte:** M.
- **Rastreabilidade:** SDD §8; TDD §2.
- **Resultado:** Workspace, contratos, migrações por banco, ambientes, seed sintético e CI.
- **Aceite:** Build reproduzível; migração em banco vazio; testes de domínio nos dois adaptadores.
- **Prompt específico:** “Execute B02: Fundação do repositório. Leia os documentos vinculados e o código existente. Entregue: Workspace, contratos, migrações por banco, ambientes, seed sintético e CI. Demonstre: Build reproduzível; migração em banco vazio; testes de domínio nos dois adaptadores. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B03 — Identidade e limites de acesso

- **Status:** em andamento, escopo adaptado pelo ADR 006. Migração de identidade/RLS testada localmente; validação remota e permissões PRI pendentes. Ver SUPABASE-SETUP.md. **Prioridade:** P0. **Dependências:** B02. **Porte:** L.
- **Rastreabilidade:** RF01; T01, T18–19, T24.
- **Resultado:** Papéis, atribuições, escopo da unidade, provisionamento local e auditoria.
- **Aceite:** Negação por API/busca/exportação; administrador técnico sem leitura automática de PRI.
- **Prompt específico:** “Execute B03: Identidade e limites de acesso. Leia os documentos vinculados e o código existente. Entregue: Papéis, atribuições, escopo da unidade, provisionamento local e auditoria. Demonstre: Negação por API/busca/exportação; administrador técnico sem leitura automática de PRI. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B04 — Doação e triagem

- **Status:** não iniciado. **Prioridade:** P0. **Dependências:** B03. **Porte:** M.
- **Rastreabilidade:** RF03–05; T03–04, T21.
- **Resultado:** Receber itens, cadastrar lotes, categorizar roupas e liberar triagem.
- **Aceite:** Doação anônima aceita; vencido bloqueado; triagem não compõe disponível.
- **Prompt específico:** “Execute B04: Doação e triagem. Leia os documentos vinculados e o código existente. Entregue: Receber itens, cadastrar lotes, categorizar roupas e liberar triagem. Demonstre: Doação anônima aceita; vencido bloqueado; triagem não compõe disponível. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B05 — Ledger e reservas

- **Status:** não iniciado. **Prioridade:** P0. **Dependências:** B04. **Porte:** L.
- **Rastreabilidade:** RF06; T05–06, T21.
- **Resultado:** Movimentos, saldos, FEFO, reserva, estorno e chave idempotente.
- **Aceite:** Disputa concorrente não gera negativo; transferência e estorno reconciliam.
- **Prompt específico:** “Execute B05: Ledger e reservas. Leia os documentos vinculados e o código existente. Entregue: Movimentos, saldos, FEFO, reserva, estorno e chave idempotente. Demonstre: Disputa concorrente não gera negativo; transferência e estorno reconciliam. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B06 — Pessoa e PRI mínimo

- **Status:** não iniciado. **Prioridade:** P0. **Dependências:** B03. **Porte:** M.
- **Rastreabilidade:** RF02, RF08; T02, T08 parcial.
- **Resultado:** Cadastro sem CPF, caso atribuído, fase atual, atendimento, próximo passo e retificação.
- **Aceite:** Acolher por apelido; leitura restrita; suspeita de duplicidade pede revisão.
- **Prompt específico:** “Execute B06: Pessoa e PRI mínimo. Leia os documentos vinculados e o código existente. Entregue: Cadastro sem CPF, caso atribuído, fase atual, atendimento, próximo passo e retificação. Demonstre: Acolher por apelido; leitura restrita; suspeita de duplicidade pede revisão. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B07 — Ação de rua de ponta a ponta

- **Status:** não iniciado. **Prioridade:** P0. **Dependências:** B05, B06. **Porte:** L.
- **Rastreabilidade:** RF07; T07.
- **Resultado:** Rota textual, equipe, fardamento, kits, distribuição, sobras e fechamento.
- **Aceite:** Executar jornada SPEC §8 e demonstrar saldo 55 sem duplicar entrega.
- **Prompt específico:** “Execute B07: Ação de rua de ponta a ponta. Leia os documentos vinculados e o código existente. Entregue: Rota textual, equipe, fardamento, kits, distribuição, sobras e fechamento. Demonstre: Executar jornada SPEC §8 e demonstrar saldo 55 sem duplicar entrega. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B08 — Sincronização operacional

- **Status:** não iniciado. **Prioridade:** P0. **Dependências:** B03, B07. **Porte:** L.
- **Rastreabilidade:** RF16–17; T14–16, T19, T25–26.
- **Resultado:** Promover spike a worker robusto; estados visíveis, quarentena, cursor e epoch.
- **Aceite:** Reenvio, perda de ack, crash e dependências não causam perda ou dupla baixa.
- **Prompt específico:** “Execute B08: Sincronização operacional. Leia os documentos vinculados e o código existente. Entregue: Promover spike a worker robusto; estados visíveis, quarentena, cursor e epoch. Demonstre: Reenvio, perda de ack, crash e dependências não causam perda ou dupla baixa. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B09 — Relatórios e alertas básicos

- **Status:** não iniciado. **Prioridade:** P0. **Dependências:** B05, B07, B08. **Porte:** M.
- **Rastreabilidade:** RF05, RF18; T04, T20.
- **Resultado:** Painéis de saldo, validade, doações, ações e acompanhamentos; exportação restrita.
- **Aceite:** Totais reconciliam com ledger e mostram atualização/pendências; alertas no painel.
- **Prompt específico:** “Execute B09: Relatórios e alertas básicos. Leia os documentos vinculados e o código existente. Entregue: Painéis de saldo, validade, doações, ações e acompanhamentos; exportação restrita. Demonstre: Totais reconciliam com ledger e mostram atualização/pendências; alertas no painel. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B10 — Backup e operação

- **Status:** não iniciado. **Prioridade:** P0. **Dependências:** B08. **Porte:** M.
- **Rastreabilidade:** RF19, NFR05; T17, T24.
- **Resultado:** Backup consistente local/cloud, proteção, restore, telemetria e manual de contingência.
- **Aceite:** Simular perda do serviço e restaurar em até 4 h com RPO proposto de 24 h.
- **Prompt específico:** “Execute B10: Backup e operação. Leia os documentos vinculados e o código existente. Entregue: Backup consistente local/cloud, proteção, restore, telemetria e manual de contingência. Demonstre: Simular perda do serviço e restaurar em até 4 h com RPO proposto de 24 h. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B11 — Piloto acompanhado

- **Status:** não iniciado. **Prioridade:** P0. **Dependências:** B09, B10. **Porte:** L.
- **Rastreabilidade:** G1; NFR01–06.
- **Resultado:** Ensaio de turno, carga sintética, acessibilidade, treinamento e validação institucional.
- **Aceite:** G1 aprovado com evidências; operador reconcilia estoque e explica estados da fila.
- **Prompt específico:** “Execute B11: Piloto acompanhado. Leia os documentos vinculados e o código existente. Entregue: Ensaio de turno, carga sintética, acessibilidade, treinamento e validação institucional. Demonstre: G1 aprovado com evidências; operador reconcilia estoque e explica estados da fila. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B12 — PRI completo e rede parceira

- **Status:** não iniciado. **Prioridade:** P1. **Dependências:** B11. **Porte:** L.
- **Rastreabilidade:** RF09–10; T08–09.
- **Resultado:** Cinco fases, eventos simultâneos, retornos, documentação necessária, parceiros e encaminhamento.
- **Aceite:** Mudança de fase preserva histórico; vaga requer confirmação; acesso por caso.
- **Prompt específico:** “Execute B12: PRI completo e rede parceira. Leia os documentos vinculados e o código existente. Entregue: Cinco fases, eventos simultâneos, retornos, documentação necessária, parceiros e encaminhamento. Demonstre: Mudança de fase preserva histórico; vaga requer confirmação; acesso por caso. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B13 — Casa de apoio

- **Status:** não iniciado. **Prioridade:** P1. **Dependências:** B12. **Porte:** M.
- **Rastreabilidade:** RF11; T10.
- **Resultado:** Camas, capacidade, estadias, entrada/saída, regras e responsáveis.
- **Aceite:** Bloquear sobreposição e excedente de ocupação em transação.
- **Prompt específico:** “Execute B13: Casa de apoio. Leia os documentos vinculados e o código existente. Entregue: Camas, capacidade, estadias, entrada/saída, regras e responsáveis. Demonstre: Bloquear sobreposição e excedente de ocupação em transação. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B14 — Custos e patrocínios

- **Status:** não iniciado. **Prioridade:** P1. **Dependências:** B13. **Porte:** M.
- **Rastreabilidade:** RF12; T11.
- **Resultado:** Despesas fixas/variáveis, cotas, parcelas, pagamento e prestação de contas.
- **Aceite:** Separar previsto/pago e prometido/recebido; somas exatas em centavos.
- **Prompt específico:** “Execute B14: Custos e patrocínios. Leia os documentos vinculados e o código existente. Entregue: Despesas fixas/variáveis, cotas, parcelas, pagamento e prestação de contas. Demonstre: Separar previsto/pago e prometido/recebido; somas exatas em centavos. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B15 — Cafés e escala da Palavra

- **Status:** não iniciado. **Prioridade:** P1. **Dependências:** B11. **Porte:** M.
- **Rastreabilidade:** RF13; T12.
- **Resultado:** Modelos de culto, consumo previsto/real e voluntários/preletores.
- **Aceite:** Confirmar execução baixa uma vez; editar previsão não movimenta estoque.
- **Prompt específico:** “Execute B15: Cafés e escala da Palavra. Leia os documentos vinculados e o código existente. Entregue: Modelos de culto, consumo previsto/real e voluntários/preletores. Demonstre: Confirmar execução baixa uma vez; editar previsão não movimenta estoque. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B16 — Campanhas

- **Status:** não iniciado. **Prioridade:** P2. **Dependências:** B11. **Porte:** M.
- **Rastreabilidade:** RF14; T13.
- **Resultado:** Metas, períodos, contribuição vinculada e painel agregado.
- **Aceite:** Unidades compatíveis e nenhuma contribuição contada duas vezes.
- **Prompt específico:** “Execute B16: Campanhas. Leia os documentos vinculados e o código existente. Entregue: Metas, períodos, contribuição vinculada e painel agregado. Demonstre: Unidades compatíveis e nenhuma contribuição contada duas vezes. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B17 — RECRIE e Escola de Acolhimento

- **Status:** não iniciado. **Prioridade:** P2. **Dependências:** B12. **Porte:** M.
- **Rastreabilidade:** RF15; T22.
- **Resultado:** Oportunidades, encaminhamentos limitados e trilhas de capacitação.
- **Aceite:** Compartilhar apenas dados autorizados; demonstrar conclusão e histórico.
- **Prompt específico:** “Execute B17: RECRIE e Escola de Acolhimento. Leia os documentos vinculados e o código existente. Entregue: Oportunidades, encaminhamentos limitados e trilhas de capacitação. Demonstre: Compartilhar apenas dados autorizados; demonstrar conclusão e histórico. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

### B18 — Expansão e mobilidade

- **Status:** não iniciado. **Prioridade:** P2. **Dependências:** B11. **Porte:** L.
- **Rastreabilidade:** ADR futura; RF16–17.
- **Resultado:** Descoberta de celulares isolados, anexos, multiunidade e integrações externas.
- **Aceite:** Novo ADR, ameaça/conflitos, testes e orçamento aprovados antes de implementar.
- **Prompt específico:** “Execute B18: Expansão e mobilidade. Leia os documentos vinculados e o código existente. Entregue: Descoberta de celulares isolados, anexos, multiunidade e integrações externas. Demonstre: Novo ADR, ameaça/conflitos, testes e orçamento aprovados antes de implementar. Aplique o protocolo de trabalho abaixo e registre evidências sem dados pessoais.”

## 4. Prompt mestre para cada sessão de vibecoding

```text
Você está construindo o BOLD OS. Leia docs/SPEC.md, docs/SDD.md,
docs/TDD.md e a história selecionada em docs/BACKLOG.md.

História: [ID]. Objetivo: [comportamento observável].
1. Inspecione o repositório e as instruções locais. Verifique dependências.
2. Explicite critério de aceite, regras e arquivos previstos. Se faltar regra
   essencial, registre a lacuna; avance apenas no trabalho independente dela.
3. Escreva o teste relevante e confirme que falha pelo motivo esperado.
4. Implemente a menor fatia completa: domínio, persistência, API e interface
   quando necessários ao comportamento, mantendo autorização no servidor.
5. Teste idempotência, transação e offline sempre que a história os afetar.
6. Execute as verificações adequadas, sem afirmar que rodou o que não rodou.
7. Demonstre o resultado com dados fictícios. Registre limitações e evidências.
8. Atualize rastreabilidade e status somente quando o aceite estiver satisfeito.

Restrições: não usar prontuários reais em prompts/fixtures; não expor segredos;
não inventar permissões, regras de internação ou saldos; não esconder conflitos;
não implementar módulos além da história. Dependências novas precisam ter
motivo registrado. Mudanças de arquitetura exigem ADR. Publicação e importação
real dependem da etapa de validação institucional prevista no piloto.

Saída esperada: mudança concreta, resultado dos testes, passos de demonstração,
limitações e próximo item desbloqueado.
```

## 5. Definition of Ready

Requisito identificado; operador e resultado descritos; entrada/saída e critérios claros; dependências concluídas; regra de autorização e comportamento offline definidos; dados sintéticos disponíveis. História precisa caber em uma demonstração curta. Se não couber, dividi-la.

Exemplo de divisão B05: entrada com ledger → saldo consultável → reserva atômica → entrega/estorno. Cada fatia inclui autorização e teste relevante; não deixar integridade para uma história futura.

## 6. Definition of Done

Aceite comprovado; testes relevantes verdes; negativas de acesso verificadas; migração revisada e estratégia de reversão definida; evidência registrada; erros acionáveis; nenhum segredo ou dado real no repositório. Operação que sincroniza precisa resistir a reenvio e restart. Funcionalidade ainda incompleta permanece marcada como incompleta, mesmo com telas prontas.

## 7. Roteiro de ciclos sugerido

| Ciclos indicativos | Foco | Saída |
|---|---|---|
| 1–2 | B00–B02 | Decisões, prova técnica e fundação; gate G0 |
| 3–4 | B03–B06 | Acesso, doação, estoque e cadastro mínimo |
| 5–6 | B07–B08 | Jornada completa e sincronização operacional |
| 7–8 | B09–B10 | Relatórios, contingência e recuperação |
| 9–12, se necessários | B11 e correções | Piloto, evidências e aceite G1 |

Replanejar ao fim de cada ciclo. Estimativas excluem espera por equipamento, contratação, validação institucional e decisões pendentes. B12–B18 terão cronograma próprio após o piloto.

## 8. Registro de evidências por história

```text
História / revisão:
Critérios demonstrados:
Ambiente e versão:
Testes executados e resultado:
Cenário offline/conflito, quando aplicável:
Migração e recuperação:
Responsável operacional que validou:
Limitações / defeitos abertos:
Status e próximo item desbloqueado:
```

## 9. Incremento visual solicitado — UI01

**Status:** não iniciado. **Prioridade:** P0. **Dependências:** B02 para protótipo com fixtures; B03/B05/B06 para integração de permissões, estoque e PRI. **Referência:** [UI-DESIGN.md](UI-DESIGN.md).

**Resultado:** shell administrativo com aparência próxima às capturas Hunter/LeadPulse, listagens de Assistidos e Estoque e detalhe de PRI em painel dividido. Construir componentes reutilizáveis e estados de interface antes de expandir módulos.

**Aceite:** comparação visual desktop com as referências, filtros/paginação/navegação demonstráveis, teclado e 360 px, dados fictícios identificados e estados offline/erro/vazio. Integração usa permissões e contratos existentes; protótipo não conta como gate G1 concluído.

**Ordem:** incorporar o shell após B02; aplicar componentes nas entregas B04–B09. Esta tarefa faz parte dos ciclos do MVP e exige reestimativa, sem promessa adicional de prazo.

**Prompt:** usar o prompt de implementação visual de UI-DESIGN.md e o protocolo mestre deste backlog.
