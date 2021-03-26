import fse from 'fs-extra'
import _ from 'lodash'
import ora from 'ora'
import path from 'path'
import readPkgUp from 'read-pkg-up'
import semver from 'semver'
import { PackageJson } from 'type-fest'

const spinner = ora()

const cwd = process.cwd()
const relativePath = (p: string) => path.relative(cwd, p)

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
  issueCount = 0

  async run() {
    await this.checkPackageJson()
    await this.checkCordovaPluginPackageJson()
    spinner.stop()

    if (this.issueCount > 0) {
      spinner.fail(
        `Found ${this.issueCount} issue${this.issueCount === 1 ? '' : 's'}.`,
      )
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

    this.logPath(pkg.path)
    this.indented(async () => {
      const appIdKeys = ['APP_ID_ANDROID', 'APP_ID_IOS']
      appIdKeys.forEach((k) => {
        const configPath = `cordova.plugins.admob-plus-cordova.${k}`
        const appId = _.get(pkg.packageJson, configPath)
        if (testAppIds.has(appId)) {
          this.logIssue(configPath)
          this.indented(() => {
            spinner.info(`Replace ${appId} with real publisher ID`)
          })
        } else {
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

    this.logPath(filename)
    this.indented(async () => {
      if (semver.lt(pkgCordova.version!, pkgLatest.version!)) {
        this.logIssue(`${pkgCordova.name}: ${pkgCordova.version}`)
        this.indented(() => {
          spinner.info(`Update to latest version: ${pkgLatest.version}`)
        })
      } else {
        spinner.succeed(`${pkgCordova.name}: ${pkgCordova.version}`)
      }
    })
  }

  logPath(p: string) {
    spinner.info(relativePath(p))
  }

  logIssue(text: string) {
    this.issueCount += 1
    spinner.fail(text)
  }

  indented(f: () => any) {
    if (spinner.prefixText) {
      spinner.prefixText += ' '
    } else {
      spinner.prefixText = ' '
    }

    f()

    if (spinner.prefixText) {
      spinner.prefixText = spinner.prefixText.toString().slice(0, -1)
    }
    if (!spinner.prefixText) {
      // @ts-expect-error wrong type
      spinner.prefixText = undefined
    }
  }
}
