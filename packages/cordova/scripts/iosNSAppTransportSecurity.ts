import assert from 'assert'
import type { Context } from 'cordova-ts-hook'
import fs from 'fs'
import glob from 'glob'
import path from 'path'
import plist, { PlistObject } from 'plist'

const iosSetNSAppTransportSecurity = (ctx: Context) => {
  const { projectRoot } = ctx.opts

  const plistFile = glob.sync(
    path.join(projectRoot, 'platforms/ios', '*/*-Info.plist'),
  )[0]
  assert(plistFile)

  const plistObj = plist.parse(fs.readFileSync(plistFile, 'utf8')) as {
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
  fs.writeFileSync(plistFile, plist.build(plistObj))
}

export = (ctx: Context) => {
  if (ctx.opts.cordova.platforms.includes('ios')) {
    iosSetNSAppTransportSecurity(ctx)
  }
}
