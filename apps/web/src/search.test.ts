import { test } from 'node:test';
import assert from 'node:assert/strict';
import { matchesName } from './search.ts';
test('busca ignora acentos, espaços nas pontas e caixa', () => {
  assert.equal(matchesName('João Exemplo', '  JOAO '), true);
  assert.equal(matchesName('João Exemplo', 'Maria'), false);
  assert.equal(matchesName('João Exemplo', ''), true);
});
