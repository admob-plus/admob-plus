import type { Context } from 'cordova-ts-hook'
import fse from 'fs-extra'
import plist, { PlistObject } from 'plist'
import { enhanceContext, EnhancedContext } from './util'

async function iosSetNSAppTransportSecurity(ctx: EnhancedContext) {
  const { plistPath } = ctx.ios!

  const content = await fse.readFile(plistPath, 'utf8')
  if (content.indexOf('NSAllowsArbitraryLoadsInWebContent') > -1) {
    return
  }

  const plistObj = plist.parse(content) as {
    NSAppTransportSecurity: PlistObject
  }

  Object.assign(plistObj, {
    NSAppTransportSecurity: {
      ...plistObj.NSAppTransportSecurity,
      NSAllowsArbitraryLoads: true,
      NSAllowsArbitraryLoadsForMedia: true,
      NSAllowsArbitraryLoadsInWebContent: true,
    },
  })
  await fse.writeFile(plistPath, plist.build(plistObj))
}

export = async (context: Context) => {
  const ctx = await enhanceContext(context)
  if (ctx.opts.cordova.platforms.includes('ios')) {
    await iosSetNSAppTransportSecurity(ctx)
  }
}
