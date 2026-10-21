# Direção visual — BOLD OS

Versão 0.1 · 20/10/2026. Referência solicitada pelo usuário: duas capturas da plataforma de prospecção Hunter/LeadPulse fornecidas na conversa. As imagens orientam aparência e organização; textos e funções exibidos nelas não são requisitos do BOLD OS.

## 1. Objetivo

O frontend final deve se parecer fortemente com as referências: aplicação administrativa clara, compacta, com navegação lateral persistente, conteúdo em painéis, tabelas densas, bordas discretas e destaque verde-água. Preservar identidade e vocabulário BOLD OS. Evitar transformar a interface em uma landing page ou dashboard de cartões grandes.

Este documento especifica o resultado esperado; não representa frontend implementado. As medidas e cores abaixo são aproximações iniciais das capturas, sujeitas a comparação visual durante implementação.

## 2. Tokens propostos

| Elemento | Valor inicial |
|---|---|
| Fundo da aplicação | #F7FAF9 |
| Superfície de tabelas e painéis | #FFFFFF |
| Verde-água principal | #0D9F91 |
| Estado selecionado | #E7F7F3 |
| Borda | #E3E8E7 |
| Texto principal | #192321 |
| Texto secundário | #77817F |
| Atenção | texto #A36B09 sobre #FFF5D6 |
| Erro | texto #B83B48 sobre #FDEDF0 |
| Tipografia | sans-serif de sistema, 13–14 px no corpo, 20–22 px em títulos |
| Cantos | 6–8 px em controles; 10–12 px em painéis |
| Espaçamento | escala de 4, 8, 12, 16, 24 e 32 px |
| Altura de linha de tabela | 52–60 px; cabeçalho 42–48 px |
| Sidebar desktop | aproximadamente 208 px |

Usar ícones de traço fino e consistentes, sombras mínimas, divisores leves e hierarquia tipográfica. Verificar contraste e foco acessível antes de fechar tokens. Cor nunca comunica estado sozinha.

## 3. Estrutura da aplicação

Sidebar com marca BOLD OS e subtítulo “Bread of Life Desk”; módulos agrupados por operação: Visão geral, Assistidos e PRI, Doações, Estoque, Ações de rua. Nas fases posteriores: Parceiros, Casa de apoio, Custos, Cafés e escalas, Campanhas e Capacitação. Rodapé com ajuda e conta do operador. Não mostrar módulos futuros como se estivessem funcionais.

Item ativo recebe fundo verde muito claro, ícone e texto verdes. Área principal com breadcrumb discreto, título e contador, ações à direita e faixa de filtros abaixo. Estado da conexão e quantidade de pendências ficam visíveis sem ocupar uma seção grande. Respeitar permissões na navegação e também no servidor.

## 4. Padrão de listagem — referência da imagem 1

Aplicar a Assistidos, Doações, Estoque e Ações: título com contador em badge, busca à direita, filtros em abas/chips, tabela de superfície branca com divisores horizontais, seleção opcional, ações em lote autorizadas e rodapé de paginação. Mostrar quantidade filtrada e total sem confundir as duas.

Exemplo de Assistidos: nome social/apelido e identificador; responsável; fase principal; último atendimento; próximo contato; situação do acompanhamento. Dados fictícios no protótipo, sem fotos reais. Usar iniciais como avatar quando apropriado. Nada de ICP score, intent, ranking espiritual ou pontuação de vulnerabilidade herdada da referência comercial.

Exemplo de Estoque: item/categoria; lote; localização; validade; saldo físico; reservado; disponível; situação. Alertas de validade com texto e badge. Seleção não pode oferecer ações que o perfil não possa executar.

Busca, filtros e paginação devem funcionar e manter estados coerentes. Prever carregamento, vazio, nenhum resultado, erro, sem permissão e offline. Exportação respeita o escopo de dados e o estado de sincronização.

## 5. Padrão de detalhe — referência da imagem 2

Depois da sidebar global, usar coluna contextual de aproximadamente 280–320 px com busca e cartões compactos selecionáveis; à direita, painel amplo com cabeçalho do registro e seções de informação. Seleção recebe contorno verde e fundo muito claro.

Aplicar ao PRI: lista de casos atribuídos na coluna contextual; cabeçalho com nome, fase e responsável; abas de resumo, linha do tempo, plano de acompanhamento e registros restritos conforme permissão. Próximo passo com ação clara. Notas pastorais e de saúde não aparecem em prévias da lista nem em cards globais.

Aplicar a Ações: lista de saídas e painel com roteiro, equipe, reservas, entregas e reconciliação. Aplicar a Parceiros após o piloto: entidades e detalhes de requisitos, disponibilidade datada e encaminhamentos.

O pipeline horizontal da imagem 1 pode orientar um indicador de etapas de uma ação: Planejamento → Reserva → Execução → Conciliação. As cinco fases do PRI precisam permitir retornos e atividades simultâneas, sem sugerir promoção automática ou fila comercial.

## 6. Componentes reutilizáveis

AppShell, SidebarNav, PageHeader, ConnectionStatus, FilterBar, SearchInput, DataTable, StatusBadge, Pagination, ContextList, DetailPanel, Timeline, ConfirmDialog e EmptyState. Componentes visuais não contêm regras de autorização como única defesa. Formulários usam labels persistentes, validação junto ao campo e confirmação inequívoca de gravação local.

## 7. Responsividade

Desktop de referência: 1280–1440 px, tabela densa e painel dividido. Em tablet, reduzir colunas secundárias e permitir recolher a lista contextual. Em 360 px, menu em gaveta, lista e detalhe em telas sequenciais, ação principal alcançável e filtros recolhíveis. Rolagem horizontal fica limitada à tabela quando necessária, sem causar overflow global. Informação essencial e ações não dependem de hover.

## 8. Aceite visual e funcional

- Em desktop, reconhecer a mesma hierarquia das referências: sidebar, título/ações, filtros e listagem ou painel dividido.
- Verde-água, espaços compactos, linhas leves e badges discretos predominam; sem gradientes e ilustrações decorativas no fluxo operacional.
- Demonstrar Assistidos e Estoque com dados fictícios, filtros, seleção, paginação e navegação para detalhe.
- Demonstrar estados vazio, carregando, erro e offline, além de teclado e largura de 360 px.
- Comparar capturas lado a lado com as duas referências e registrar diferenças intencionais de domínio e acessibilidade.
- Não confundir semelhança visual com funções prontas: conexão, saldo, contadores e permissões precisam refletir dados reais quando integrados.

## 9. Prompt de implementação visual

“Implemente o frontend do BOLD OS seguindo docs/UI-DESIGN.md e as duas referências visuais fornecidas pelo usuário. Reproduza a composição administrativa compacta, sidebar clara, verde-água, tabelas com filtros e painéis divididos. Use o domínio e os critérios da SPEC. Comece pelo shell, Assistidos/PRI e Estoque; use fixtures sintéticas claramente identificadas até existir integração. Não copie textos comerciais, scores ou dados pessoais das imagens. Demonstre desktop e mobile e registre verificação visual.”
