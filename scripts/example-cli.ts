import * as del from 'del'
import * as execa from 'execa'
// @ts-ignore
import linkDir from 'link-dir'
import * as path from 'path'
import * as readPkg from 'read-pkg'
import replaceInFileCJS, * as replaceInFileReal from 'replace-in-file'
import * as yargs from 'yargs'

const replaceInFile = (replaceInFileReal as any) as typeof replaceInFileCJS

const pkgsDirJoin = (...args: string[]) =>
  path.join(__dirname, '../packages', ...args)

const linkPlugin = async (plugin: string) => {
  await execa(`cordova plugin rm ${plugin} --nosave`, {
    shell: true,
    reject: false,
  })
  await execa(
    `cordova plugin add --link --nosave --searchpath ../../packages ${plugin}`,
    { shell: true, stdio: 'inherit' },
  )
}

const clean = () => del(['package-lock.json', 'platforms', 'plugins'])

const prepare = async (opts: { pluginDir: string }) => {
  const pkg = await readPkg({ cwd: pkgsDirJoin(opts.pluginDir) })
  await execa('run-s prepare', {
    cwd: pkgsDirJoin(opts.pluginDir),
    shell: true,
    stdio: 'inherit',
  })
  await execa('cordova prepare --searchpath ../../packages', {
    shell: true,
    stdio: 'inherit',
  })
  await Promise.all([
    replaceInFile({
      files: path.join(process.cwd(), 'platforms/android/app/build.gradle'),
      from: 'abortOnError false;',
      to: 'abortOnError true;',
    }),
    linkPlugin(pkg.name),
  ])
}

const androidRun = async (argv: { clean: boolean; deivce: boolean }) => {
  if (argv.clean) {
    await clean()
    await execa('run-s prepare', { shell: true, stdio: 'inherit' })
  }
  await execa(
    'cordova',
    ['run', 'android', '--verbose'].concat(argv.deivce ? ['--device'] : []),
    { stdio: 'inherit' },
  )
}

const androidOpen = async (opts: {
  pluginDir: string;
  javaPackagePath: string;
}) => {
  const targetDir = path.join(
    'platforms/android/app/src/main/java',
    opts.javaPackagePath,
  )
  await del([targetDir])
  await linkDir(pkgsDirJoin(opts.pluginDir, 'src/android'), targetDir)
  await execa('open -a \'Android Studio\' platforms/android', {
    shell: true,
    stdio: 'inherit',
  })
}

const cli = yargs
  .command('clean', '', {}, clean)
  .command(
    'prepare',
    '',
    { dir: { type: 'string', demand: true } },
    argv => argv.dir && prepare({ pluginDir: argv.dir }),
  )
  .command(
    'android',
    '',
    {
      clean: { type: 'boolean' },
      device: { default: true },
    },
    androidRun as any,
  )
  .command(
    'open-android',
    'open Android Studio for development',
    {
      dir: { type: 'string', demand: true },
      java: { type: 'string', demand: true },
    },
    argv =>
      argv.dir &&
      argv.java &&
      androidOpen({ pluginDir: argv.dir, javaPackagePath: argv.java }),
  )
  .help()

if (cli.argv._.length === 0) {
  cli.showHelp()
}
