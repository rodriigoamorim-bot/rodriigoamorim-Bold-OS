-- Fundação somente: nenhuma tabela de pessoas, PRI ou estoque nesta migração.
begin;
create table public.organizations (
 id uuid primary key default gen_random_uuid(),
 name text not null check (length(trim(name)) between 1 and 160),
 created_at timestamptz not null default now()
);
create table public.units (
 id uuid primary key default gen_random_uuid(),
 organization_id uuid not null references public.organizations(id),
 name text not null check (length(trim(name)) between 1 and 160),
 created_at timestamptz not null default now(),
 unique (organization_id, id)
);
create table public.unit_memberships (
 organization_id uuid not null,
 unit_id uuid not null,
 user_id uuid not null references auth.users(id),
 role text not null check (role in ('desk_operator','stock_operator','action_lead','case_worker','pastoral','leadership','technical_admin')),
 active boolean not null default true,
 created_at timestamptz not null default now(),
 primary key (unit_id,user_id,role),
 foreign key (organization_id,unit_id) references public.units(organization_id,id)
);
create index unit_memberships_user_scope on public.unit_memberships(user_id, organization_id, unit_id) where active;
alter table public.organizations enable row level security;
alter table public.units enable row level security;
alter table public.unit_memberships enable row level security;
-- Não herdar grants permissivos do ambiente; bootstrap é administrativo.
revoke all on public.organizations, public.units, public.unit_memberships from public, anon, authenticated;
grant usage on schema public to authenticated;
grant select on public.organizations, public.units, public.unit_memberships to authenticated;
create policy memberships_self_read on public.unit_memberships for select to authenticated
 using (user_id = (select auth.uid()) and active);
create policy units_assigned_read on public.units for select to authenticated
 using (exists (select 1 from public.unit_memberships m where m.unit_id=units.id
   and m.organization_id=units.organization_id and m.user_id=(select auth.uid()) and m.active));
create policy organizations_assigned_read on public.organizations for select to authenticated
 using (exists (select 1 from public.unit_memberships m where m.organization_id=organizations.id
   and m.user_id=(select auth.uid()) and m.active));
comment on table public.unit_memberships is 'Atribuições provisionadas administrativamente. Nenhum papel concede PRI sem política própria e atribuição por caso.';
commit;
