import fse from 'fs-extra'
import _ from 'lodash'
import readPkgUp from 'read-pkg-up'
import semver from 'semver'
import { PackageJson } from 'type-fest'
import { collectDependencies } from './android'
import Context, { spinner } from './context'
import { getPodSpec } from './ios'

const ctx = new Context()

const testAppIds = new Set([
  'ca-app-pub-3940256099942544~3347511713',
  'ca-app-pub-3940256099942544~1458002511',
])

const readPackageJson = async (filename: string) => {
  let pkg: PackageJson
  try {
    pkg = await fse.readJson(filename)
  } catch {
    return
  }
  return pkg
}

export default class Doctor {
  async run() {
    await this.checkPackageJson()
    await this.checkCordovaPluginPackageJson()
    await this.checkCordovaAndroidDependencies()
    await this.checkSDKPodSpec()
    ctx.logSummary()

    if (ctx.issueCount > 0) {
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(1)
    }
  }

  async checkPackageJson() {
    spinner.start('Looking for package.json')
    const pkg = await readPkgUp()
    if (!pkg?.path) {
      return
    }

    ctx.logPath(pkg.path)
    ctx.indented(async () => {
      const appIdKeys = ['APP_ID_ANDROID', 'APP_ID_IOS']
      appIdKeys.forEach((k) => {
        const configPath = `cordova.plugins.admob-plus-cordova.${k}`
        const appId = _.get(pkg.packageJson, configPath)
        if (testAppIds.has(appId)) {
          ctx.logIssue(configPath)
          ctx.indented(() => {
            spinner.info(`Replace ${appId} with real publisher ID`)
          })
        } else if (appId) {
          spinner.succeed(configPath)
        }
      })
    })

    return pkg.packageJson
  }

  async checkCordovaPluginPackageJson() {
    const filename = 'plugins/admob-plus-cordova/package.json'
    spinner.start(`Looking for ${filename}`)

    const pkgCordova = await readPackageJson(filename)
    const pkgLatest = require('admob-plus-cordova/package.json') as PackageJson
    if (!pkgCordova || !pkgCordova.version || !pkgLatest.version) {
      return
    }

    ctx.logPath(filename)
    ctx.indented(() => {
      if (semver.lt(pkgCordova.version!, pkgLatest.version!)) {
        ctx.logIssue(`${pkgCordova.name}: ${pkgCordova.version}`)
        ctx.indented(() => {
          spinner.info(`Update to latest version: ${pkgLatest.version}`)
        })
      } else {
        spinner.succeed(`${pkgCordova.name}: ${pkgCordova.version}`)
      }
    })
  }

  async checkCordovaAndroidDependencies() {
    spinner.start('Checking Android dependencies')
    const deps = await collectDependencies({ cwd: 'platforms/android' })
    if (!deps) {
      return
    }

    ctx.logPath('platforms/android')
    ctx.indented(() => {
      const k = 'com.google.android.gms:play-services-ads'
      const versions = deps[k]
      const s = `${k}: ${[...versions].join(', ')}`
      if (versions.has('19.8.0')) {
        spinner.succeed(s)
      } else {
        spinner.fail(s)
      }
    })
  }

  async checkSDKPodSpec() {
    const specName = 'Google-Mobile-Ads-SDK'
    spinner.start(`Checking ${specName}`)
    const spec = await getPodSpec(specName)
    if (!spec) {
      return
    }

    ctx.logTitle(specName)
    ctx.indented(() => {
      const expectedVersion = '8.3.0'
      if (spec.version === expectedVersion) {
        spinner.succeed(spec.version)
      } else {
        spinner.fail(spec.version)
        ctx.indented(() => {
          spinner.info(
            `Update to "${expectedVersion}" with \`pod repo update\``,
          )
        })
      }
    })
  }
}
