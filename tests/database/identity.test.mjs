import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { PGlite } from '@electric-sql/pglite';

const ids = { user: '00000000-0000-0000-0000-000000000001', other: '00000000-0000-0000-0000-000000000002', outsider: '00000000-0000-0000-0000-000000000003', org: '10000000-0000-0000-0000-000000000001', org2: '10000000-0000-0000-0000-000000000002', unit: '20000000-0000-0000-0000-000000000001', sibling: '20000000-0000-0000-0000-000000000002', foreign: '20000000-0000-0000-0000-000000000003' };

test('identidade: migração, RLS, isolamento, revogação e bloqueio de escalação', async () => {
 const db = new PGlite();
 try {
  // Apenas no teste: contrato mínimo de Auth; não simula login/JWT/HTTP Supabase.
  await db.exec(`create role anon nologin; create role authenticated nologin;
    create schema auth; create table auth.users(id uuid primary key);
    create function auth.uid() returns uuid language sql stable as $$
      select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
    $$; grant usage on schema auth to authenticated, anon;
    grant execute on function auth.uid() to authenticated, anon;`);
  const migration = await readFile(new URL('../../supabase/migrations/202610210001_identity.sql', import.meta.url), 'utf8');
  await db.exec(migration);
  await db.query('insert into auth.users values ($1), ($2), ($3)', [ids.user, ids.other, ids.outsider]);
  await db.query('insert into public.organizations(id,name) values ($1,$2),($3,$4)', [ids.org,'Igreja fictícia',ids.org2,'Outra organização fictícia']);
  await db.query('insert into public.units(id,organization_id,name) values ($1,$2,$3),($4,$2,$5),($6,$7,$8)', [ids.unit,ids.org,'Balcão fictício',ids.sibling,'Unidade irmã',ids.foreign,ids.org2,'Unidade externa']);
  await db.query('insert into public.unit_memberships(organization_id,unit_id,user_id,role) values ($1,$2,$3,$4),($5,$6,$7,$8)', [ids.org,ids.unit,ids.user,'technical_admin',ids.org2,ids.foreign,ids.other,'stock_operator']);
  // Constraint também precisa impedir associação que mistura organização e unidade.
  await assert.rejects(db.query('insert into public.unit_memberships(organization_id,unit_id,user_id,role) values ($1,$2,$3,$4)', [ids.org,ids.foreign,ids.outsider,'case_worker']), /foreign key/i);
  await db.exec('set role authenticated');
  await db.query("select set_config('request.jwt.claim.sub', $1, false)", [ids.user]);
  assert.deepEqual((await db.query('select id from public.units')).rows, [{ id: ids.unit }]);
  assert.deepEqual((await db.query('select id from public.organizations')).rows, [{ id: ids.org }]);
  assert.equal((await db.query('select * from public.unit_memberships')).rows.length, 1);
  await assert.rejects(db.query('update public.unit_memberships set role = $1', ['case_worker']), /permission denied/i);
  await assert.rejects(db.query('insert into public.unit_memberships(organization_id,unit_id,user_id,role) values ($1,$2,$3,$4)', [ids.org,ids.sibling,ids.user,'case_worker']), /permission denied/i);
  await assert.rejects(db.query('delete from public.unit_memberships'), /permission denied/i);
  await assert.rejects(db.query('insert into public.units(organization_id,name) values ($1,$2)', [ids.org,'Forjada']), /permission denied/i);
  await db.query("select set_config('request.jwt.claim.sub', $1, false)", [ids.outsider]);
  for (const table of ['organizations','units','unit_memberships']) assert.equal((await db.query(`select * from public.${table}`)).rows.length, 0);
  await db.exec('reset role');
  await db.query('update public.unit_memberships set active=false where user_id=$1', [ids.user]);
  await db.exec('set role authenticated');
  await db.query("select set_config('request.jwt.claim.sub', $1, false)", [ids.user]);
  for (const table of ['organizations','units','unit_memberships']) assert.equal((await db.query(`select * from public.${table}`)).rows.length, 0);
  await db.exec('reset role; set role anon');
  for (const table of ['organizations','units','unit_memberships']) await assert.rejects(db.query(`select * from public.${table}`), /permission denied/i);
 } finally { await db.close(); }
});
