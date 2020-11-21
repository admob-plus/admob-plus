#!/usr/bin/env node
import assert from 'assert'
import linkDir from '@frat/link-dir'
import del from 'del'
import execa from 'execa'
import path from 'path'
import readPkg from 'read-pkg'
import { replaceInFile } from 'replace-in-file'
import yargs from 'yargs'
import { pkgsDirJoin } from './utils'

const cordovaBin = require.resolve('cordova/bin/cordova')
const watchBin = require.resolve('copy-and-watch/bin/copy-and-watch')

const npmBin = process.env.npm_execpath
assert(npmBin)

const linkPlugin = async (plugin: string, addOpts: string[]) => {
  await execa(cordovaBin, ['plugin', 'rm', plugin, '--nosave'], {
    reject: false,
  })
  await execa(
    cordovaBin,
    [
      'plugin',
      'add',
      '--link',
      '--nosave',
      '--searchpath',
      pkgsDirJoin(),
      plugin,
      ...addOpts,
    ],
    { stdio: 'inherit' },
  )
}

const clean = () => del(['package-lock.json', 'platforms', 'plugins'])

const prepare = async (opts: { pluginDir: string }) => {
  const pkg = await readPkg({ cwd: pkgsDirJoin(opts.pluginDir) })
  await execa(npmBin, ['run', 'prepare'], {
    cwd: pkgsDirJoin(opts.pluginDir),
    stdio: 'inherit',
  })
  await execa(cordovaBin, ['prepare', '--searchpath', pkgsDirJoin()], {
    stdio: 'inherit',
  })

  const pkgExample = await readPkg()
  const pluginVars = pkgExample.cordova.plugins[pkg.name]
  const addOpts = Object.keys(pluginVars)
    .map((k) => ['--variable', `${k}=${pluginVars[k]}`])
    .flat()
  await Promise.all([
    replaceInFile({
      files: path.join(process.cwd(), 'platforms/android/app/build.gradle'),
      from: 'abortOnError false;',
      to: 'abortOnError true;',
    }),
    linkPlugin(pkg.name, addOpts),
  ])
}

const androidRun = async (argv: { clean: boolean; device: boolean }) => {
  if (argv.clean) {
    await clean()
    await execa(npmBin, ['run', 'prepare'], { stdio: 'inherit' })
  }
  await execa(
    cordovaBin,
    ['run', 'android', '--verbose'].concat(argv.device ? ['--device'] : []),
    { stdio: 'inherit' },
  )
}

const androidOpen = async (opts: {
  pluginDir: string
  javaPackagePath: string
}) => {
  const targetDir = path.join(
    'platforms/android/app/src/main/java',
    opts.javaPackagePath,
  )
  await del([targetDir])
  await linkDir(pkgsDirJoin(opts.pluginDir, 'src/android'), targetDir)
  await execa('open -a "Android Studio" platforms/android', {
    shell: true,
    stdio: 'inherit',
  })
}

const iosOpen = async (opts: { pluginDir: string }) => {
  const pkgExample = await readPkg()
  const pkg = await readPkg({ cwd: pkgsDirJoin(opts.pluginDir) })
  const targetDir = path.join('plugins', pkg.name, 'src/ios')
  await execa(
    watchBin,
    [pkgsDirJoin(opts.pluginDir, 'src/ios/**/*'), targetDir],
    { stdio: 'inherit' },
  )
  await execa(`open platforms/ios/${pkgExample.displayName}.xcworkspace`, {
    shell: true,
    stdio: 'inherit',
  })
  await execa(
    watchBin,
    [
      '--watch',
      '--skip-initial-copy',
      `${targetDir}/**/*`,
      pkgsDirJoin(opts.pluginDir, 'src/ios'),
    ],
    { stdio: 'inherit' },
  )
}

const cli = yargs
  .command('clean', '', {}, clean)
  .command(
    'prepare',
    '',
    { dir: { type: 'string', demand: true } },
    (argv) => argv.dir && prepare({ pluginDir: argv.dir }),
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
    (argv) =>
      argv.dir &&
      argv.java &&
      androidOpen({ pluginDir: argv.dir, javaPackagePath: argv.java }),
  )
  .command(
    'open-ios',
    'open Xcode for development',
    {
      dir: { type: 'string', demand: true },
    },
    (argv) => argv.dir && iosOpen({ pluginDir: argv.dir }),
  )
  .help()

if (cli.argv._.length === 0) {
  cli.showHelp()
}
