import assert from 'node:assert';
import {createRequire} from 'node:module';
import {execa} from 'execa';
import fse from 'fs-extra';
import handlebars from 'handlebars';
import markdownMagic from 'markdown-magic';
import {pkgsDirJoin} from '../utils.js';

const require = createRequire(import.meta.url);

const updateCliReadme = async () => {
  const markdownPath = pkgsDirJoin('cli/README.md');
  const templatePath = require.resolve('../../templates/cli-readme.md.hbs');
  const template = handlebars.compile(await fse.readFile(templatePath, 'utf8'));

  const [usage, ...commands] = await Promise.all<any>([
    execa('yarn', ['admob-plus', '--help']).then(o => o.stdout),
    ...['doctor', 'info'].map(async x => {
      const {stdout} = await execa('yarn', ['admob-plus', x, '--help']);
      const m = stdout.match(/^([^\n]+)\s+([^\n]+)([\S\s]+)$/);
      assert(m);
      return {
        cmd: m[1],
        desc: m[2].trim(),
        help: m[3].trim(),
      };
    }),
  ]);

  await new Promise(resolve => {
    markdownMagic(
      markdownPath,
      {
        transforms: {
          CLI() {
            return template({usage, commands}).trim();
          },
        },
      },
      resolve
    );
  });
};

export default updateCliReadme;
