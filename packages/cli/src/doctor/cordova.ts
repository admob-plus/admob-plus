import assert from 'assert'
// @ts-expect-error no types
import { ConfigParser } from 'cordova-common'
import { ListrTask } from 'listr2'
import _ from 'lodash'
import semver from 'semver'
import { collectDependencies } from './android'
import { Ctx } from './listr'
import { PackageJson, readPackageJson } from './node'

export type PackageCordovaConfig = {
  cordova?: {
    plugins?: { [k: string]: any }
    platforms?: string[]
  }
}

type Plugin = {
  name: string
  spec: string
  variables: {
    [k: string]: string
  }
}

// see https://github.com/apache/cordova-common/blob/master/src/ConfigParser/ConfigParser.js
interface AppConfig {
  getPlugin(id: string): Plugin | undefined
  getPluginIdList(): string[]
  getPlugins(): Plugin[]
  getPreference(name: string, platform: string): string
}

export const readConfigXml = async (filename: string) => {
  try {
    const appConfig = new ConfigParser(filename)
    return appConfig as AppConfig
  } catch {
    return null
  }
}

export default [
  {
    title: 'Cordova Android dependencies',
    async task(_ctx, task) {
      const deps = await collectDependencies({ cwd: 'platforms/android' })
      if (!deps) {
        task.skip()
        return
      }

      return task.newListr([
        {
          async task(_ctxAds, taskAds) {
            const k = 'com.google.android.gms:play-services-ads'
            taskAds.title = k
            const versions = deps[k]
            const s = `${k}: ${[...versions].join(', ')}`
            if (versions.has('19.8.0')) {
              taskAds.title = s
            } else {
              throw new Error(s)
            }
          },
        },
      ])
    },
  },
  {
    title: 'config.xml',
    async task(ctx, task) {
      const { pkg } = ctx
      const filename = 'config.xml'
      const config = await readConfigXml(filename)
      if (!ctx.pkg || !config) {
        task.skip()
        return
      }

      const tasksPrefs = _.map(
        { SwiftVersion: '5.3', 'deployment-target': '11.0' },
        (v, prefName) => {
          const title = `platform[name="ios"]/preference[name="${prefName}"]`
          const expectedVersion = semver.coerce(v)
          assert(expectedVersion)
          return {
            title,
            async task(_ctx, taskPref) {
              try {
                const version = semver.coerce(
                  config.getPreference(prefName, 'ios'),
                )
                if (!version) {
                  throw new Error(`${title}: missing / invalid`)
                }
                if (semver.gte(version, expectedVersion)) {
                  taskPref.title = `${title}: ${version}`
                } else {
                  throw new Error(`${title}: ${version} < ${expectedVersion}`)
                }
              } catch (err) {
                throw new Error(`${title}: ${err}`)
              }
            },
          } as ListrTask
        },
      )

      const plugins = _.get(pkg, 'cordova.plugins', {})
      const tasksVars = _.flatMap(plugins, (vars, name) => {
        const xmlVars = _.get(config.getPlugin(name), 'variables')
        if (!xmlVars) {
          return []
        }
        return _.map(
          vars,
          (v, k) =>
            ({
              title: k,
              async task(_ctx, taskVar) {
                if (!xmlVars[k]) {
                  taskVar.skip()
                  return
                }
                if (v !== xmlVars[k]) {
                  throw new Error(`${k}: ${xmlVars[k]} != ${v}`)
                }
              },
            } as ListrTask),
        )
      })

      return task.newListr([...tasksPrefs, ...tasksVars], { concurrent: true })
    },
  },
  {
    title: 'plugins/admob-plus-cordova/package.json',
    async task(_ctx, task) {
      const filename = 'plugins/admob-plus-cordova/package.json'

      const pkgCordova = await readPackageJson(filename)
      const pkgLatest = require('admob-plus-cordova/package.json') as PackageJson
      if (!pkgCordova || !pkgCordova.version || !pkgLatest.version) {
        task.skip()
        return
      }

      return task.newListr([
        {
          title: `${pkgCordova.name}: ${pkgCordova.version}`,
          async task(_ctxPkg, taskPkg) {
            if (semver.lt(pkgCordova.version!, pkgLatest.version!)) {
              taskPkg.output = `Update to latest version: ${pkgLatest.version}`
              throw new Error(
                `${pkgCordova.name}: ${pkgCordova.version} < ${pkgLatest.version}`,
              )
            }
          },
          options: { persistentOutput: true },
        },
      ])
    },
  },
] as ListrTask<Ctx>[]
