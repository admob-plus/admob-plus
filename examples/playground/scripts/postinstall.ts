import fse from 'fs-extra';

async function main() {
  const pkg = {private: true};
  await Promise.all([
    fse.outputJSON('platforms/package.json', pkg),
    fse.outputJSON('plugins/package.json', pkg),
  ]);
}

main();
