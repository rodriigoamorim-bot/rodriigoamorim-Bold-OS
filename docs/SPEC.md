# SPEC — Especificação do produto

Versão 0.1 · 20/10/2026 · Produto: BOLD OS / Bread of Life Desk.

## 1. Resultado esperado

Centralizar a operação do Balcão de Assistência Social e Ministério Pão da Vida, conectando suprimentos, ações e acompanhamento humanizado. O sistema apoia decisões da equipe; não faz diagnósticos, não decide internações nem classifica a dignidade ou o valor de uma pessoa.

Resultados a medir no piloto: tempo de atendimento, divergência de estoque, perdas por validade, atendimentos com próximo acompanhamento definido e pendências de sincronização. Medir a linha de base antes de fixar metas de melhoria. Evolução espiritual não é pontuação nem condição para receber ajuda.

## 2. Pessoas e acesso proposto

| Perfil | Pode acessar | Limites |
|---|---|---|
| Operador do balcão | Cadastro mínimo, atendimento, entrega | Sem notas pastorais ou detalhes de saúde |
| Estoquista | Doações, lotes, roupas e movimentações | Sem conteúdo do PRI |
| Líder de ação | Rotas, equipe, reservas, resumo operacional | Apenas pessoas e dados necessários à ação |
| Responsável pelo caso | PRI e acompanhamentos atribuídos | Acesso por atribuição e categoria de dado |
| Pastoral | Notas pastorais de casos atribuídos | Sem acesso universal por cargo |
| Casa de apoio/financeiro | Ocupação ou despesas conforme atribuição | Funções distintas; despesas não liberam PRI |
| Liderança | Indicadores agregados | Detalhe nominal exige permissão específica |
| Administrador técnico | Contas, dispositivos, configuração | Sem leitura automática do conteúdo sensível |

Permissões devem ser verificadas no servidor e no dispositivo local, inclusive em buscas, anexos, exportações e relatórios. Perfil de doador externo fica fora do MVP.

## 3. Escopo por entrega

**MVP:** uma unidade, um servidor local, identidade e permissões, cadastro mínimo, doações, roupas, lotes alimentares, estoque por movimentos, planejamento e fechamento de ações, atendimento/linha do tempo do PRI, backup, auditoria e sincronização. Registrar fase atual no PRI mínimo sem automatizar passagem entre fases.

**Após piloto:** acompanhamento completo das cinco fases, parceiros e encaminhamentos, casa de apoio, custos/cotas, cafés e escala da Palavra, campanhas, RECRIE e Escola de Acolhimento.

**Fora do escopo inicial:** prontuário clínico, prescrição, reconhecimento facial, busca automática de familiares, portal público de assistidos, integração bancária, contabilidade fiscal, marketplace, roteirização automática, IA que decida elegibilidade e escrita concorrente offline em celulares isolados. Integrações externas serão inicialmente registros manuais rastreáveis.

## 4. Requisitos e critérios de aceite

| ID | Requisito | Critério verificável |
|---|---|---|
| RF01 | Identidade e permissões | Estoquista recebe negação ao consultar PRI por tela, API, busca ou exportação |
| RF02 | Cadastro mínimo do assistido | Nome social/apelido e identificador interno bastam; CPF e telefone não são obrigatórios; possíveis duplicatas exigem revisão |
| RF03 | Doações | Registrar origem opcional/anônima, data, itens e quantidades; separar recebimento de triagem e disponibilidade |
| RF04 | Roupas e triagem | Registrar categoria, tamanho, conservação e destino: bazar, kit, descarte ou triagem; transferência não duplica saldo |
| RF05 | Alimentos por lote | Entrada exige lote interno, unidade e validade quando aplicável; vencido/bloqueado não pode ser reservado nem entregue |
| RF06 | Estoque | Toda entrada, saída, perda, transferência e ajuste gera movimento; correção usa estorno; saldo disponível nunca negativo |
| RF07 | Ação de rua | Planejar pontos, rota textual, equipe, fardamentos, água, marmitas e roupas; reservar, entregar e devolver sobras com reconciliação |
| RF08 | PRI mínimo | Registrar atendimento, responsável, data, apoio entregue, fase e próximo passo; não exigir documento para acolhimento |
| RF09 | PRI completo | Preservar histórico das cinco fases, retornos, pausas e reabertura; mudança exige responsável e justificativa, sem progressão automática |
| RF10 | Encaminhamento | Registrar parceiro, requisitos, disponibilidade com data de confirmação, transporte e aceite; vaga informada não significa vaga garantida |
| RF11 | Casa de apoio | Impedir duas ocupações da mesma cama no mesmo período e ocupação além da capacidade; registrar entrada e saída |
| RF12 | Despesas e cotas | Distinguir previsto, compromisso e pago; cotas prometidas não entram como recebimento; relatórios por período |
| RF13 | Cafés e escala | Modelos para domingo manhã/noite e quinta noite; consumo só baixa ao confirmar execução; repetição não duplica baixa |
| RF14 | Campanhas | Meta por unidade compatível, período e realizado derivado de entradas vinculadas; impedir soma entre kg e peças |
| RF15 | RECRIE e formação | Registrar oportunidades e encaminhamentos autorizados; trilha de capacitação com conclusão e histórico; sem compartilhar PRI integral |
| RF16 | Operação offline | Com internet desligada e LAN ativa, atender, movimentar e fechar ação no servidor local; fila persiste após reinício |
| RF17 | Sincronização | Reenvio não duplica efeitos; conflito permanece visível até resolução; mostrar pendente, sincronizado, conflito e falha |
| RF18 | Relatórios | Doações, perdas, saldos, ações e acompanhamento por período; exibir data da última atualização e limitar exportação por permissão |
| RF19 | Auditoria e recuperação | Registrar autor, dispositivo, operação e horário; restaurar backup de ensaio e reconciliar fila sem duplicação |

## 5. Regras do domínio

- RN01: quantidade positiva nos comandos, unidade explícita e conversão cadastrada; dinheiro em centavos. Proibir float para saldos financeiros.
- RN02: disponível = entradas − saídas − perdas ± ajustes − reservas ativas; entrega converte reserva em saída na mesma transação.
- RN03: sugerir FEFO para alimentos: primeiro a vencer, primeiro a sair. Expiração usa data local da unidade e regra explícita de validade inclusiva até o fim do dia, pendente de validação operacional.
- RN04: rascunho → planejada → reservada → em execução → concluída/cancelada; conclusão exige conciliar entregue, perdido e devolvido. Cancelamento libera reservas.
- RN05: fases PRI: acolhimento; diagnóstico/encaminhamento; discipulado; capacitação/alojamento; autonomia/apoio familiar. Histórico comporta retornos e etapas simultâneas; fase principal não apaga outras atividades.
- RN06: registrar acompanhamento espiritual separadamente do apoio material. Recusa de oração ou discipulado não bloqueia atendimento.
- RN07: não consolidar automaticamente pessoas por nome ou documento. Revisão de duplicidade preserva referências e trilha de auditoria.
- RN08: compartilhamento com parceiros limita campos, destinatário, finalidade e autorização aplicável; encaminhamento não torna o parceiro usuário de todos os registros.

## 6. Requisitos não funcionais propostos

| ID | Meta inicial e condição |
|---|---|
| NFR01 | Piloto com 5 operadores simultâneos, 10 mil pessoas e 100 mil movimentos sintéticos |
| NFR02 | p95 de leitura/gravação local abaixo de 2 s na LAN do piloto, excluindo anexos; medir no equipamento escolhido |
| NFR03 | Após conexão estável, 95% de uma fila de mil eventos sem anexos em até 5 min; nenhum evento perdido |
| NFR04 | Ensaio offline por 8 h com reinício do serviço; funções RF16 permanecem utilizáveis; falta de energia/LAN exige contingência manual |
| NFR05 | RPO de desastre do equipamento de até 24 h e RTO de até 4 h para o piloto; falha do processo não perde transações confirmadas |
| NFR06 | Interface pt-BR, teclado, foco visível, rótulos legíveis, erros acionáveis e estado offline persistente; verificar fluxos em largura de 360 px |
| NFR07 | Segredos fora do repositório; dados fictícios em desenvolvimento; proteção de backups, acesso mínimo e trilha de acesso sensível |

Metas são critérios de engenharia a validar, não garantias já entregues. RPO inclui eventos ainda não sincronizados: backup somente da nuvem não atende ao requisito.

## 7. Dados pessoais e operação

A proposta menciona LGPD. Antes de dados reais, o responsável institucional deve validar finalidades, fundamento do tratamento por categoria, retenção, compartilhamento, responsáveis e atendimento de solicitações. Este pacote não certifica conformidade jurídica. Não usar consentimento genérico como solução universal.

Coletar apenas o necessário. Detalhes de saúde, dependência e religião ficam em áreas restritas. Logs e telemetria não recebem conteúdo do PRI. Retenção e descarte devem abranger réplicas, anexos, exportações e backups, com política validada. Exclusões de conteúdo preservam apenas a evidência mínima de auditoria permitida pela política. Dados de menores exigem fluxo específico validado antes de habilitar o atendimento digital desse público.

## 8. Jornada demonstrável do MVP

Receber 100 garrafas de água → aprovar triagem → reservar 60 para uma ação → atender pessoa sem CPF → entregar 45 → devolver 15 → registrar próximo contato → reiniciar servidor sem internet → verificar saldo 55 e eventos pendentes → reconectar → reprocessar lote duas vezes → verificar saldo e atendimento únicos na nuvem. Conferir que estoquista não vê notas do caso.

## 9. Questões para liderança

1. Qual o gargalo prioritário e quem é responsável por cada operação e pela aprovação do piloto?
2. Quantos operadores, dispositivos e locais? Existe LAN durante falhas de internet? Quem mantém o equipamento?
3. Há necessidade de celular registrar sozinho na rua sem acesso à igreja? Isso muda o MVP offline.
4. Como são contados roupas e alimentos? Há bazar com venda, caixa, preço e prestação de contas? Vendas ficam pendentes de escopo.
5. Quais casas parceiras, requisitos, processo de aceite e frequência de confirmação de vagas?
6. Qual a capacidade da casa de apoio e quem controla admissões e custos?
7. Quais relatórios mensais Munir e Tamires precisam e quem acessa conteúdo nominal?
8. Quem define tratamento, retenção e acesso aos registros? Haverá menores e documentos digitalizados?

Até respostas: adotar as hipóteses da seção 3; impedir ativação de funcionalidades cuja regra esteja indefinida.

## 10. Direção de interface solicitada

O frontend deve seguir a composição e linguagem visual das duas capturas Hunter/LeadPulse fornecidas pelo usuário. [UI-DESIGN.md](UI-DESIGN.md) define tokens, sidebar, listagens, filtros, painéis de detalhe, responsividade e aceite visual. Aplicar ao domínio BOLD OS sem importar scores ou funções de prospecção comercial.
