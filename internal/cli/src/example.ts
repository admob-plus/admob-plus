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

const linkPlugin = async (
  plugin: string,
  addOpts: string[],
  opts: { cwd: string },
) => {
  const { cwd } = opts
  await execa('npx', ['cordova', 'plugin', 'rm', plugin, '--nosave'], {
    cwd,
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
    { cwd, stdio: 'inherit' },
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

  await execa(
    'npx',
    ['cordova', 'prepare', '--searchpath', pkgsDirJoin(), '--verbose'],
    { cwd, stdio: 'inherit' },
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
  await execa(
    'npx',
    ['cordova', 'run', 'android', '--verbose'].concat(
      argv.device ? ['--device'] : [],
    ),
    { cwd, stdio: 'inherit' },
  )
}

const androidOpen = async (opts: { cwd: string; javaPackagePath: string }) => {
  const { cwd } = opts
  const targetDir = path.join(
    cwd,
    'platforms/android/app/src/main/java',
    opts.javaPackagePath,
  )
  await del([targetDir], { cwd })

  const pkgExample = await readPkg({ cwd })
  const pluginPkgs = await collectPluginPkgs(pkgExample)
  await Promise.all(
    pluginPkgs.map(async (pkg) => {
      await linkDir(pkgsDirJoin(pkg.dir, 'src/android'), targetDir)
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
      await execa(
        'npx',
        ['copy-and-watch', pkgsDirJoin(pkg.dir, 'src/ios/**/*'), targetDir],
        { stdio: 'inherit', cwd },
      )

      return () =>
        execa(
          'npx',
          [
            'copy-and-watch',
            '--watch',
            '--skip-initial-copy',
            `${targetDir}/**/*`,
            pkgsDirJoin(pkg.dir, 'src/ios'),
          ],
          { stdio: 'inherit', cwd },
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
      {
        java: { type: 'string', demand: true },
      },
      (argv: any) =>
        androidOpen({
          ...argv,
          javaPackagePath: argv.java,
        }),
    )
    .command('open-ios', 'open Xcode for development', {}, iosOpen as any)
    .help()

  if (cli.argv._.length === 0) {
    cli.showHelp()
  }
}

main()
