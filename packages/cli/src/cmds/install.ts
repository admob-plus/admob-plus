import { prompt } from 'enquirer'
import execa from 'execa'
import findPkg, { PkgProxy } from 'pkg-proxy'

function hasAnyDeps(pkg: PkgProxy, deps: string[]) {
  return deps.some((x) => pkg.depends(x))
}

function isCordovaProject(pkg: PkgProxy) {
  if (pkg.cordova) return true
  return hasAnyDeps(pkg, [
    'cordova',
    'cordova-android',
    'cordova-browser',
    'cordova-ios',
    'cordova-plugin-whitelist',
  ])
}

function isIonicProject(pkg: PkgProxy) {
  return hasAnyDeps(pkg, [
    '@ionic-native/core',
    '@ionic/angular',
    '@ionic/react',
    '@ionic/vue',
  ])
}

async function cordovaIntall(pkg: PkgProxy) {
  const pluginName = 'admob-plus-cordova'

  if (pkg.cordova.plugins[pluginName]) {
    console.log('plugin installed')
    return
  }

  const args = ['cordova', 'plugin', 'add', pluginName, '--save']
  const response = await prompt<{ run: boolean }>([
    {
      type: 'form',
      name: 'vars',
      message: 'Input variables:',
      choices: ['APP_ID_ANDROID', 'APP_ID_IOS'].map((name) => ({
        name,
      })),
      result(value) {
        Object.entries(value).forEach(([k, v]) => {
          v = v.trim()
          if (!v) return
          args.push('--variable', `${k.trim()}=${v}`)
        })
        return value
      },
    },
    {
      type: 'confirm',
      name: 'run',
      initial: true,
      message() {
        return `Run \`${args.join(' ')}\`?`
      },
    },
  ])

  if (response.run) {
    await execa(args[0], args.slice(1), { cwd: pkg.rootDir() })
  }
}

export const command = 'install'

export const desc = 'Install plugin'

export const handler = async () => {
  const pkg = await findPkg({ searchParents: true })
  if (!pkg) {
    console.log('Cannot find package.json')
    return
  }

  if (isIonicProject(pkg)) {
    console.warn('Ionic project is not supported yet')
  } else if (isCordovaProject(pkg)) {
    await cordovaIntall(pkg)
  } else {
    console.warn('Unknown project type')
  }
}
