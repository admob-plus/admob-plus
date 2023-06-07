import {findWorkspaceDir} from '@pnpm/find-workspace-dir';
import fs from 'node:fs/promises';
import path from 'node:path';
import genCordova from './cordova';

async function main() {
  const rootDir = await findWorkspaceDir('.');
  if (!rootDir) throw new Error('Can not find root dir');

  for (const [k, v] of Object.entries(await genCordova(rootDir))) {
    console.log(path.relative(rootDir, k));
    await fs.writeFile(k, v);
  }
}

main();
