import fse from 'fs-extra';

async function main() {
  const pkg = {private: true, type: "commonjs"};
  await Promise.all([
    fse.outputJSON('platforms/package.json', pkg, {spaces: 2}),
    fse.outputJSON('plugins/package.json', pkg, {spaces: 2}),
  ]);
}

main();
