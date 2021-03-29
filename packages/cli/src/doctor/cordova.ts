// @ts-expect-error no typess
import { ConfigParser } from 'cordova-common'

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
