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
import { collectPkgs, pkgsDirJoin } from './utils'

const copyAndWatchBin = require.resolve('copy-and-watch/bin/copy-and-watch')
const cordovaBin = require.resolve('cordova/bin/cordova')
const nodeBin = (args: string[], opts: execa.Options<string>) =>
  execa('yarn', ['node', ...args], { stdio: 'inherit', ...opts })

const linkPlugin = async (
  plugin: string,
  addOpts: string[],
  opts: { cwd: string },
) => {
  const { cwd } = opts
  await nodeBin([cordovaBin, 'plugin', 'rm', plugin, '--nosave'], {
    cwd,
    reject: false,
  })
  await nodeBin(
    [
      cordovaBin,
      'plugin',
      'add',
      '--link',
      '--nosave',
      '--searchpath',
      pkgsDirJoin(),
      plugin,
      ...addOpts,
    ],
    { cwd },
  )
}

const clean = (opts: { cwd: string }) =>
  del(['package-lock.json', 'platforms', 'plugins'], opts)

const collectPluginPkgs = async (pkg: readPkg.NormalizedPackageJson) => {
  const pkgs = await collectPkgs()
  return Object.values(pkgs).filter((x) => (pkg.dependencies || {})[x.name])
}

const prepare = async (opts: { cwd: string }) => {
  const { cwd } = opts
  const pkgExample = await readPkg({ cwd })
  const pluginPkgs = await collectPluginPkgs(pkgExample)

  const linkTasks = await Promise.all(
    pluginPkgs.map(async (pkg) => {
      await execa('yarn', ['prepack'], {
        cwd: pkg.dir,
        stdio: 'inherit',
      })

      return async () => {
        const pluginVars = pkgExample.cordova.plugins[pkg.name]
        const addOpts = Object.keys(pluginVars)
          .map((k) => ['--variable', `${k}=${pluginVars[k]}`])
          .flat()
        await Promise.all([
          replaceInFile({
            files: path.join(cwd, 'platforms/android/app/build.gradle'),
            from: 'abortOnError false;',
            to: 'abortOnError true;',
          }),
          linkPlugin(pkg.name, addOpts, { cwd }),
        ])
      }
    }),
  )

  await nodeBin(
    [cordovaBin, 'prepare', '--searchpath', pkgsDirJoin(), '--verbose'],
    { cwd },
  )

  await Promise.all(linkTasks.map((f) => f()))
}

const androidRun = async (argv: {
  clean: boolean
  cwd: string
  device: boolean
}) => {
  const { cwd } = argv
  if (argv.clean) {
    await clean({ cwd })
    await execa('yarn', ['prepare'], { cwd, stdio: 'inherit' })
  }
  await nodeBin(
    [cordovaBin, 'run', 'android', '--verbose'].concat(
      argv.device ? ['--device'] : [],
    ),
    { cwd },
  )
}

const resolveJavaPackagePath = (pkgName: string) => {
  switch (pkgName) {
    case 'cordova-admob-plus':
      return 'admob/plugin'
    case 'cordova-plugin-consent':
      return 'cordova/plugin/consent'
    default:
      return ''
  }
}

const androidOpen = async (opts: { cwd: string }) => {
  const { cwd } = opts
  const pkgExample = await readPkg({ cwd })
  const pluginPkgs = await collectPluginPkgs(pkgExample)
  await Promise.all(
    pluginPkgs.map(async (pkg) => {
      const javaPackagePath = resolveJavaPackagePath(pkg.name)
      const targetDir = path.join(
        cwd,
        'platforms/android/app/src/main/java',
        javaPackagePath,
      )
      await del([targetDir], { cwd })

      await linkDir(path.join(pkg.dir, 'src/android'), targetDir)
    }),
  )

  await execa('open', ['-a', 'Android Studio', 'platforms/android'], {
    stdio: 'inherit',
    cwd,
  })
}

const iosOpen = async (opts: { cwd: string }) => {
  const { cwd } = opts
  const pkgExample = await readPkg({ cwd })
  const pluginPkgs = await collectPluginPkgs(pkgExample)

  const watchTasks = await Promise.all(
    pluginPkgs.map(async (pkg) => {
      const targetDir = path.join(cwd, 'plugins', pkg.name, 'src/ios')
      await nodeBin(
        [copyAndWatchBin, path.join(pkg.dir, 'src/ios/**/*'), targetDir],
        { cwd },
      )

      return () =>
        nodeBin(
          [
            copyAndWatchBin,
            '--watch',
            '--skip-initial-copy',
            `${targetDir}/**/*`,
            path.join(pkg.dir, 'src/ios'),
          ],
          { cwd },
        )
    }),
  )

  const configXML = await fsp.readFile(path.join(cwd, 'config.xml'), 'utf-8')
  const config = await parseStringPromise(configXML)
  const name = config.widget.name[0]
  await execa('open', [`platforms/ios/${name}.xcworkspace`], {
    stdio: 'inherit',
    cwd,
  })

  await Promise.all(watchTasks.map((f) => f()))
}

const main = () => {
  const cli = yargs
    .option('cwd', { default: process.cwd(), global: true })
    .command('clean', '', {}, clean as any)
    .command('prepare', '', {}, prepare as any)
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
      {},
      androidOpen as any,
    )
    .command('open-ios', 'open Xcode for development', {}, iosOpen as any)
    .help()

  if (cli.argv._.length === 0) {
    cli.showHelp()
  }
}

main()
