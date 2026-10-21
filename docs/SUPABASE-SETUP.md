# Supabase — desenvolvimento

Somente dados sintéticos. Não contratar Pro para esta etapa.

## Criar projeto

1. Acessar https://supabase.com/dashboard e entrar/criar conta.
2. Criar organização gratuita, se necessário, e um projeto Free chamado bold-os-dev.
3. Definir senha de banco forte e guardá-la no gerenciador de senhas; não enviar ao chat.
4. Escolher região adequada aos operadores e aguardar provisionamento.
5. Nas configurações de Auth, desabilitar novos cadastros públicos. Criar uma conta
   fictícia de teste em Authentication / Users; não usar dados de assistidos.
6. Informar ao agente apenas a URL do projeto para identificar o ambiente.

## Conectar frontend

Copiar apps/web/.env.example para apps/web/.env.local, preenchendo URL e chave
publishable obtidas no painel do projeto. Esse arquivo é ignorado pelo Git.
Nunca preencher chave secret ou service_role. Reiniciar Vite após a mudança.
A sessão fica somente em memória; recarregar a página exige novo login.

## Aplicar migração

No projeto de desenvolvimento vazio, executar no SQL Editor o conteúdo de
supabase/migrations/202610210001_identity.sql. Executar uma única vez. A migração
é transacional; em caso de erro verificar rollback antes de repetir. Não substituir
a migração por tabelas criadas manualmente com políticas diferentes.

Bootstrap deve ocorrer pelo SQL Editor administrativo, fora do navegador. Exemplo
com valores inteiramente fictícios; substituir USER_UUID pelo UUID da conta de teste
criada em Auth. Não guardar UUIDs reais no repositório.

```sql
begin;
insert into public.organizations(id,name)
values ('10000000-0000-0000-0000-000000000001','Organização de teste');
insert into public.units(id,organization_id,name)
values ('20000000-0000-0000-0000-000000000001',
        '10000000-0000-0000-0000-000000000001','Balcão de teste');
insert into public.unit_memberships(organization_id,unit_id,user_id,role)
values ('10000000-0000-0000-0000-000000000001',
        '20000000-0000-0000-0000-000000000001','USER_UUID','desk_operator');
commit;
```

Não há interface de provisionamento nesta entrega. Papéis são vocabulário inicial
baseado na SPEC; não concedem acesso a dados de domínio ainda inexistentes.

## Verificar remotamente antes do aceite

- Entrar na configuração do BOLD OS com a conta de teste: deve listar só sua unidade.
- Entrar com outra conta sem atribuição: nenhuma unidade, nenhuma permissão automática.
- Tentar pelo REST criar/alterar atribuição, criar unidade e consultar como anon:
  negar acesso; repetir para unidade/organização distinta. Usar JWTs reais de teste.
- Revogar atribuição via SQL administrativo (active=false); nova consulta não vê unidade.
- Sair: remover sessão e resultados locais. Login inválido e indisponibilidade devem
  mostrar mensagem acionável sem payload ou conteúdo sensível.

Esses passos remotos ainda não foram executados. O teste local usa PostgreSQL
WASM (PGlite) com papéis sem privilégios e contrato mínimo de auth.uid(). Não
substitui Supabase Auth, JWT, PostgREST, autorização PRI, auditoria ou backup/restore.
Nenhum dado PRI/estoque foi criado. Nada deve ser usado em produção ainda.

## Reverter em desenvolvimento

Sem dados reais e sem migrações posteriores, remover na ordem unit_memberships,
units e organizations em transação, somente após confirmar que o projeto é de teste.
Não existe rollback destrutivo automático. Para ambientes com dados, usar migração
corretiva e backup verificado; não reaplicar bootstrap.

## Evidência desta fatia

21/10/2026: teste de banco falhou antes da migração por arquivo ausente (RED).
Depois da implementação passou com: aplicação em banco vazio, isolamento entre
organizações/unidades, usuário sem atribuição, revogação, acesso anônimo negado,
escritas administrativas negadas e FK de unidade/organização consistente.
TypeScript, teste de busca e build Vite também passaram. Dependência PGlite somente
de desenvolvimento: permite verificar políticas PostgreSQL sem servidor externo.

Referências:
- https://supabase.com/docs/guides/database/postgres/row-level-security
- https://supabase.com/docs/guides/getting-started/api-keys
