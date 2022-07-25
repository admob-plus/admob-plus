import assert from 'node:assert';
import {expect, test} from '@jest/globals';
import findPkg from './src';

test('pkg-proxy', async () => {
  const pkg = await findPkg();
  expect(pkg?.name).toBe('admob-plus-monorepo');
  assert(pkg);

  const json = JSON.stringify(pkg);
  expect(json).toBe(JSON.stringify(pkg.json));

  Object.assign(pkg, {newprop: 'newprop'});
  expect(JSON.stringify(pkg)).not.toBe(json);
});
