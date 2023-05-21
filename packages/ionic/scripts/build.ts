import del from 'del';
import execa from 'execa';
import * as fse from 'fs-extra';

const main = async () => {
  await del(['build', 'lib', 'ngx', '*.tsbuildinfo']);

  const s = await fse.readFile('./src/ngx/index.ts', 'utf8');
  await fse.outputFile(
    './src/lib/index.ts',
    s
      .replace("import { Injectable } from '@angular/core'\n", '')
      .replace('@Injectable()\n', '')
  );

  await Promise.all([
    execa('tsc', {stdio: 'inherit'}),
    execa('tsc', ['--outDir', 'build/cjs', '-m', 'commonjs'], {
      stdio: 'inherit',
    }),
  ]);
  await Promise.all([
    fse.copy('./build/lib', './lib', {overwrite: true}),
    fse.copy('./build/ngx', './ngx', {overwrite: true}),
  ]);
  await Promise.all([
    fse.copy('./build/cjs/lib', './lib/cjs', {overwrite: true}),
    fse.copy('./build/cjs/ngx', './ngx/cjs', {overwrite: true}),
    fse.outputJSON('./ngx/package.json', {
      ...require('../package.json'),
      types: 'index.d.ts',
      main: './cjs/index.js',
      module: 'index.js',
    })
  ]);

  await del(['build']);
};

main();
