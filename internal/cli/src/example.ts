#!/usr/bin/env node
import linkDir from '@frat/link-dir'
import del from 'del'
import execa from 'execa'
import fsp from 'fs/promises'
import path from 'path'
import readPkg from 'read-pkg'
import { replaceInFile } from 'replace-in-file'
import { parseStringPromise } from 'xml2js'
import yargs from 'yargs'
import { pkgsDirJoin } from './utils'

const linkPlugin = async (plugin: string, addOpts: string[]) => {
  await execa('npx', ['cordova', 'plugin', 'rm', plugin, '--nosave'], {
    reject: false,
  })
  await execa(
    'npx',
    [
      'cordova',
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
  await execa('npm', ['run', 'prepare'], {
    cwd: pkgsDirJoin(opts.pluginDir),
    stdio: 'inherit',
  })
  await execa(
    'npx',
    ['cordova', 'prepare', '--searchpath', pkgsDirJoin(), '--verbose'],
    {
      stdio: 'inherit',
    },
  )

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
    await execa('npm', ['run', 'prepare'], { stdio: 'inherit' })
  }
  await execa(
    'npx',
    ['cordova', 'run', 'android', '--verbose'].concat(
      argv.device ? ['--device'] : [],
    ),
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
  const cwd = process.cwd()
  const pkg = await readPkg({ cwd: pkgsDirJoin(opts.pluginDir) })
  const targetDir = path.join('plugins', pkg.name, 'src/ios')
  await execa(
    'npx',
    ['copy-and-watch', pkgsDirJoin(opts.pluginDir, 'src/ios/**/*'), targetDir],
    { stdio: 'inherit', cwd },
  )
  const configXML = await fsp.readFile(path.join(cwd, 'config.xml'), 'utf-8')
  const config = await parseStringPromise(configXML)
  const name = config.widget.name[0]
  await execa('open', [`platforms/ios/${name}.xcworkspace`], {
    stdio: 'inherit',
    cwd,
  })
  await execa(
    'npx',
    [
      'copy-and-watch',
      '--watch',
      '--skip-initial-copy',
      `${targetDir}/**/*`,
      pkgsDirJoin(opts.pluginDir, 'src/ios'),
    ],
    { stdio: 'inherit', cwd },
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
