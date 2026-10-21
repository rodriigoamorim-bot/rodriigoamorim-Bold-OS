# B00 — Descoberta e regras

Preparado em 21/10/2026. Status: em andamento, sem validação institucional.

## Fluxo de referência para validação

Receber doação → registrar itens em triagem → liberar lote → reservar para ação
→ registrar entrega/perda/devolução → conciliar estoque → registrar atendimento
e próximo contato → sincronizar → conferir relatório.

Exemplo sintético: receber 100 águas, reservar 60, entregar 45 e devolver 15;
saldo final 55 e reserva zero. Atendimento sem CPF obrigatório.

## Decisões bloqueadoras da prova técnica

| Questão | Hipótese vigente | Responsável pela resposta | Estado |
|---|---|---|---|
| Servidor e LAN funcionam sem internet? | Sim; celulares isolados fora do MVP | A designar pela liderança | Pendente |
| Qual equipamento, sistema e responsável por manutenção? | PC Dell disponível no balcão; especificações, sistema e manutenção não informados | A designar pela liderança | Parcial: equipamento informado pelo usuário em 21/10/2026 |
| Quem valida a operação e o piloto? | Munir e Tamires são destinatários da proposta; papéis não confirmados | Liderança | Pendente |

A preparação técnica com dados sintéticos pode avançar sem representar essas
hipóteses como aprovadas. Medições e aceite no equipamento dependem das respostas.

## Roteiro da conversa operacional

- Observar um recebimento, uma saída e um atendimento; registrar exceções sem nomes.
- Identificar quem recebe, tria, conta, reserva, entrega, acompanha e reconcilia.
- Inventariar computadores, sistemas, rede, energia, navegadores e backup disponível.
- Confirmar contagem por unidade, validade e eventual venda de bazar.
- Definir indicadores de base: tempo de atendimento, divergências, perdas por
  validade, próximo contato e pendências de sincronização; valores ainda não medidos.
- Identificar quem decide acessos, retenção, compartilhamento e tratamento de menores
  antes de qualquer uso real. Não inferir aprovação jurídica ou institucional.

## Registro de decisões

| Decisão | Resposta/evidência | Dono | Data |
|---|---|---|---|
| Equipamento disponível | Usuário informou PC Dell no balcão da igreja; especificações desconhecidas | Usuário (informação); manutenção a designar | 21/10/2026 |
| Acesso em diferentes dispositivos | Usuário requer software em qualquer dispositivo; proposta de atendimento: web responsiva em navegadores compatíveis, com matriz de compatibilidade a verificar | Técnico; validação operacional pendente | 21/10/2026 |

## Critério de conclusão

Fluxo real revisado, responsáveis e equipamentos identificados; hipóteses validadas
ou explicitamente pendentes com dono. Registrar aprovação operacional e suas
limitações antes de marcar B00 concluída. As perguntas completas estão em SPEC §9.

## Compatibilidade e conectividade

Requisito do usuário: software deve rodar em qualquer dispositivo. Implementação
proposta: acesso web responsivo em computadores, tablets e celulares com navegador
compatível, sem instalação do servidor em cada cliente. Não significa garantia
para todo hardware ou navegador existente; verificar matriz e equipamento no spike.
O Dell é candidato a servidor local; capacidade e sistema ainda precisam ser
inspecionados. Acesso remoto e gravação em celular isolado sem internet/LAN são
questões distintas; esta resposta não confirma necessidade de escrita isolada.
Responsável pela validação do piloto ainda não foi indicado.

## Correção posterior do usuário — 21/10/2026

O Dell não será servidor. Todos os dispositivos acessam pelo navegador. Avaliar
hospedagem em nuvem com economia de custo total. A hipótese de servidor local
acima foi rejeitada; definição de operação sem internet permanece pendente.
