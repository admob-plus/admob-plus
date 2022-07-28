import {execa} from 'execa';

async function main() {
  const args = process.argv.slice(2);

  if (args[0] !== 'install') {
    await execa('npm', args, {stdio: 'inherit'});
    return;
  }
}

main().catch(console.error);
