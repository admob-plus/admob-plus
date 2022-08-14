import execa from 'execa';
import fse from 'fs-extra';
import path from 'node:path';

const rootDir = (...args: Parameters<typeof path.join>) =>
  path.join(__dirname, '..', ...args);

test(
  'android',
  async () => {
    if (!(await fse.pathExists(rootDir('platforms/android')))) return;

    try {
      await execa('adb', ['--version']);
    } catch {
      return;
    }

    await execa('npx', ['cordova', 'build', 'android'], {
      cwd: rootDir(),
      stdio: 'inherit',
    });
  },
  1000 * 60 * 5
);

test(
  'ios',
  async () => {
    if (!(await fse.pathExists(rootDir('platforms/ios')))) return;

    try {
      await execa('swift', ['--version']);
    } catch {
      return;
    }

    await execa('npx', ['cordova', 'build', 'ios'], {
      cwd: rootDir(),
      stdio: 'inherit',
    });
  },
  1000 * 60 * 5
);
