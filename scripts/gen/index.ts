import {findWorkspaceDir} from '@pnpm/find-workspace-dir';
import fs from 'node:fs/promises';
import path from 'node:path';
import CordovaGen from './cordova';
import DocsGen from './docs';

async function main() {
  const rootDir = await findWorkspaceDir('.');
  if (!rootDir) throw new Error('Can not find root dir');

  for (const g of [new CordovaGen(rootDir), new DocsGen(rootDir)]) {
    for (const [k, v] of Object.entries(await g.files())) {
      console.log(path.relative(rootDir, k));
      await fs.writeFile(k, v);
    }
  }
}

main();
