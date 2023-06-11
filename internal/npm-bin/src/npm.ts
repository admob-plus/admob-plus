import {execa} from 'execa';
import findCacheDir from 'find-cache-dir';
import path from 'node:path';
import {exit} from 'node:process';
import pino from 'pino';
import which from 'which';

async function main() {
  const cacheDir = findCacheDir({name: 'npm-bin', create: true}) ?? '/tmp';

  const transport = pino.transport({
    targets: [
      {
        level: 'info',
        target: 'pino-pretty',
        options: {destination: 2},
      },
      {
        level: 'trace',
        target: 'pino/file',
        options: {destination: path.join(cacheDir, 'run.log')},
      },
    ],
  });
  const logger = pino(transport);

  const args = process.argv.slice(2);

  logger.child(process.argv).info('argv');

  if (args.includes('install')) return;
  if (args.indexOf('--no-save') > -1) {
    args.splice(args.indexOf('--no-save'), 1);
  }

  if (process.env.NPM_WRAPPER) {
    const npmSelf = await which('npm');
    const npm = await which('npm', {
      path: process.env.PATH?.split(path.delimiter)
        .filter(s => s !== path.dirname(npmSelf))
        .join(path.delimiter),
    });
    await execa(npm, args, {stdio: 'inherit'});
    return;
  }

  await execa('pnpm', args, {env: {NPM_WRAPPER: '1'}, stdio: 'inherit'});
}

main().catch(err => {
  console.error(err);
  exit(1);
});
