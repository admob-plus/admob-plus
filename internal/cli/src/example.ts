#!/usr/bin/env node
import sane from '@frat/sane'
import assert from 'assert'
import cpy from 'cpy'
import debounce from 'debounce-promise'
import del from 'del'
import execa from 'execa'
import glob from 'fast-glob'
import fsp from 'fs/promises'
import PQueue from 'p-queue'
import path from 'path'
import findPkg, { PackageJson } from 'pkg-proxy'
import { replaceInFile } from 'replace-in-file'
import { parseStringPromise } from 'xml2js'
import yargs from 'yargs'
import { collectPkgs, pkgsDirJoin } from './utils'

const cordovaPath = require.resolve('cordova/bin/cordova')

const nodeBin = (args: string[], opts: execa.Options<string>) =>
  execa('yarn', ['node', ...args], { stdio: 'inherit', ...opts })
const cordovaBin = (args: string[], opts: execa.Options<string>) =>
  nodeBin([cordovaPath, ...args], opts)

const watchCopy = async (sourceDir: string, targetDir: string) => {
  console.log(sourceDir, '->', targetDir)

  const watcher = sane(sourceDir, { glob: ['**/*'], watchman: true })

  return new Promise(() => {
    watcher.on('change', async (filepath: string, root: string) => {
      console.log('file changed', filepath)
      if (
        filepath.startsWith('cordova/native') &&
        targetDir.includes('packages/cordova/')
      ) {
        return
      }

      await cpy(filepath, targetDir, {
        parents: true,
        cwd: root,
      })
    })
  })
}

const linkPlugin = async (
  plugin: string,
  addOpts: string[],
  opts: { cwd: string },
) => {
  const { cwd } = opts
  await cordovaBin(['plugin', 'rm', plugin, '--nosave'], {
    cwd,
    reject: false,
  })
  await cordovaBin(
    [
      'plugin',
      'add',
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
  del(['package-lock.json', 'platforms', 'plugins', 'node_modules'], opts)

const collectPluginPkgs = async (pkg: PackageJson) => {
  const pkgs = await collectPkgs()
  return Object.values(pkgs).filter(
    (x) => ({ ...pkg.dependencies, ...pkg.devDependencies }[x.name]),
  )
}

const prepare = async (opts: { cwd: string }) => {
  const { cwd } = opts

  switch (path.basename(cwd)) {
    case 'capacitor': {
      await execa('yarn', ['webpack', '--mode', 'production'], {
        stdio: 'inherit',
        cwd,
      })
      await execa('yarn', ['cap', 'sync'], {
        stdio: 'inherit',
        cwd,
      })
      return
    }
    case 'react-native': {
      await execa('yarn', ['build'], {
        stdio: 'inherit',
        cwd: pkgsDirJoin('react-native'),
      })
      await execa('yarn', { stdio: 'inherit', cwd })
      await execa('yarn', ['pod-install'], { stdio: 'inherit', cwd })
      return
    }
    default:
  }

  const pkgExample = await findPkg({ cwd })
  assert(pkgExample)
  const pluginPkgs = await collectPluginPkgs(pkgExample)

  const linkTasks = new PQueue({ concurrency: 1, autoStart: false })
  await Promise.all(
    pluginPkgs.map(async (pkg) => {
      await execa('yarn', ['build'], {
        cwd: pkg.dir,
        stdio: 'inherit',
      })

      const pluginVars = pkgExample.cordova.plugins[pkg.name]
      const addOpts = Object.keys(pluginVars)
        .map((k) => ['--variable', `${k}=${pluginVars[k]}`])
        .flat()

      linkTasks.add(() =>
        replaceInFile({
          files: path.join(cwd, 'platforms/android/app/build.gradle'),
          from: 'abortOnError false;',
          to: 'abortOnError true;',
        }),
      )
      linkTasks.add(() => linkPlugin(pkg.name, addOpts, { cwd }))
    }),
  )

  await cordovaBin(['prepare', '--searchpath', pkgsDirJoin(), '--verbose'], {
    cwd,
  })

  linkTasks.start()
  await linkTasks.onIdle()
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
  await cordovaBin(
    ['run', 'android', '--verbose', ...(argv.device ? ['--device'] : [])],
    { cwd },
  )
}

const resolveJavaPackagePath = (pkgName: string) => {
  switch (pkgName) {
    case 'admob-plus-cordova':
      return 'admob/plus'
    case 'cordova-plugin-consent':
      return 'cordova/plugin/consent'
    default:
      return ''
  }
}

const androidOpen = async (opts: { cwd: string }) => {
  const { cwd } = opts
  const pkgExample = await findPkg({ cwd })
  assert(pkgExample)
  const pluginPkgs = await collectPluginPkgs(pkgExample)

  const watchTasks = await Promise.all(
    pluginPkgs.map(async (pkg) => {
      const javaPackagePath = resolveJavaPackagePath(pkg.name)
      const targetDirs = [
        path.join(cwd, 'platforms/android/app/src/main/java', javaPackagePath),
        path.join(cwd, 'plugins', pkg.name, 'src/android'),
      ]

      await Promise.all(
        targetDirs.map((targetDir) =>
          cpy('**/*', targetDir, {
            parents: true,
            cwd: path.join(pkg.dir, 'src/android'),
          }),
        ),
      )

      return () =>
        Promise.all(
          targetDirs.map((targetDir) =>
            watchCopy(targetDir, path.join(pkg.dir, 'src/android')),
          ),
        )
    }),
  )

  await execa('open', ['-a', 'Android Studio', 'platforms/android'], {
    stdio: 'inherit',
    cwd,
  })

  await Promise.all(watchTasks.map((f) => f()))
}

const iosOpen = async (opts: { cwd: string }) => {
  const { cwd } = opts
  const pkgExample = await findPkg({ cwd })
  assert(pkgExample)
  const pluginPkgs = await collectPluginPkgs(pkgExample)

  const configXML = await fsp.readFile(path.join(cwd, 'config.xml'), 'utf-8')
  const config = await parseStringPromise(configXML)
  const name = config.widget.name[0]

  const watchTasks = await Promise.all(
    pluginPkgs.map(async (pkg) => {
      const targetDirs = [
        path.join(cwd, 'platforms/ios', name, 'Plugins', pkg.name),
        path.join(cwd, 'plugins', pkg.name, 'src/ios'),
      ]

      await Promise.all(
        targetDirs.map((targetDir) =>
          cpy('**/*', targetDir, {
            parents: true,
            cwd: path.join(pkg.dir, 'src/ios'),
          }),
        ),
      )

      return () =>
        Promise.all(
          targetDirs.map((targetDir) =>
            watchCopy(targetDir, path.join(pkg.dir, 'src/ios')),
          ),
        )
    }),
  )

  await execa('open', [`platforms/ios/${name}.xcworkspace`], {
    stdio: 'inherit',
    cwd,
  })

  await Promise.all(watchTasks.map((f) => f()))
}

function cordovaDev({
  name,
  cwd,
  platform,
  pkgName = 'admob-plus-cordova',
  pkgDir = 'cordova',
  javaPath = 'admob/plus',
}: {
  name: string
  cwd: string
  platform: string
  pkgName?: string
  pkgDir?: string
  javaPath?: string
}) {
  return {
    syncDirs: [
      {
        src: pkgsDirJoin(pkgDir, 'src/ios'),
        dest: path.join(cwd, 'platforms/ios', name, 'Plugins', pkgName),
      },
      {
        src: pkgsDirJoin(pkgDir, 'src/ios'),
        dest: path.join(cwd, 'plugins', pkgName, 'src/ios'),
      },
      {
        src: pkgsDirJoin(pkgDir, 'src/android'),
        dest: path.join(cwd, 'platforms/android/app/src/main/java', javaPath),
      },
      {
        src: pkgsDirJoin(pkgDir, 'src/android'),
        dest: path.join(cwd, 'plugins', pkgName, 'src/android'),
      },
    ],
    openArgs:
      platform === 'android'
        ? ['-a', 'Android Studio', 'platforms/android']
        : [`platforms/ios/${name}.xcworkspace`],
  }
}

async function startDev(opts: any) {
  const platform = opts.platform ?? 'ios'
  const { cwd } = opts
  const promises: Promise<any>[] = []
  const openArgs = []
  const syncDirs: { src: string; dest: string }[] = []

  switch (path.basename(cwd)) {
    case 'capacitor': {
      const sourceDir = path.join(cwd, 'src')
      const watcher = sane(sourceDir, { glob: ['**/*'], watchman: true })
      promises.push(
        execa('yarn', ['webpack', '--mode', 'production', '--watch'], {
          stdio: 'inherit',
          cwd,
        }),
        new Promise(() => {
          watcher.on(
            'change',
            debounce(async (filepath: string) => {
              console.log('file changed', filepath)
              await execa('yarn', ['cap', 'sync'], { stdio: 'inherit', cwd })
            }, 1000),
          )
        }),
      )

      if (platform === 'android') {
        openArgs.push('-a', 'Android Studio', 'android')
      } else {
        const paths = await glob('ios/App/*.xcworkspace', {
          onlyDirectories: true,
          cwd,
        })
        openArgs.push(paths[0])
      }
      break
    }
    case 'cordova': {
      const name = 'AdmobBasicExample'
      const o = cordovaDev({ name, cwd, platform })
      syncDirs.push(
        ...cordovaDev({
          name,
          cwd,
          platform,
          pkgName: 'admob-plus-cordova-native',
          pkgDir: 'cordova-native',
          javaPath: 'admob/plus/cordova/nativead',
        }).syncDirs,
        ...o.syncDirs,
      )
      openArgs.push(...o.openArgs)
      sane(path.join(cwd, 'www'), { glob: ['**/*'], watchman: true }).on(
        'change',
        debounce(async (filepath: string) => {
          console.log('file changed', filepath)
          await execa('yarn', ['cordova', 'prepare', platform], {
            stdio: 'inherit',
            cwd,
          })
        }, 1000),
      )
      break
    }
    case 'cordova-consent': {
      const name = 'ConsentExample'
      const o = cordovaDev({
        name,
        cwd,
        platform,
        pkgName: 'cordova-plugin-consent',
        pkgDir: 'cordova-consent',
        javaPath: 'cordova/plugin/consent',
      })
      syncDirs.push(
        ...cordovaDev({ name, cwd, platform }).syncDirs,
        ...o.syncDirs,
      )
      openArgs.push(...o.openArgs)
      break
    }
    case 'ionic-angular': {
      const name = 'AdMob Plus Ionic'
      const o = cordovaDev({ name, cwd, platform })
      syncDirs.push(...o.syncDirs)
      openArgs.push(...o.openArgs)
      break
    }
    case 'react-native':
      syncDirs.push({
        src: pkgsDirJoin('react-native'),
        dest: path.join(cwd, 'node_modules/@admob-plus/react-native'),
      })

      promises.push(execa('yarn', ['start'], { stdio: 'inherit', cwd }))

      if (platform === 'android') {
        openArgs.push('-a', 'Android Studio', 'android')
      } else {
        const paths = await glob('ios/*.xcworkspace', {
          onlyDirectories: true,
          cwd,
        })
        openArgs.push(paths[0])
      }
      break
    default:
      openArgs.push('.')
  }

  promises.push(
    execa('open', openArgs, { stdio: 'inherit', cwd }),
    ...syncDirs.map(async (o) => {
      await cpy('**/*', o.dest, { parents: true, cwd: o.src })
      watchCopy(o.dest, o.src)
    }),
  )

  await Promise.all(promises)
}

async function main() {
  const cli = yargs
    .option('cwd', { default: process.cwd(), global: true })
    .command('clean', '', {}, clean as any)
    .command('dev [platform]', '', {}, startDev)
    .command(
      'prepare',
      '',
      {
        clean: {
          default: false,
        },
      },
      async (opts) => {
        if (opts.clean) {
          await clean(opts as any)
        }
        await prepare(opts as any)
      },
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
      {},
      androidOpen as any,
    )
    .command('open-ios', 'open Xcode for development', {}, iosOpen as any)
    .command('cordova', 'run cordova command', {}, async (opts: any) => {
      await cordovaBin(process.argv.slice(3), { cwd: opts.cwd })
    })
    .help()

  const argv = await cli.argv
  if (argv._.length === 0) {
    cli.showHelp()
  }
}

main()
