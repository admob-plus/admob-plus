import assert from 'assert'
import fs from 'fs'
import glob from 'glob'
import path from 'path'
import plist, { PlistObject } from 'plist'

const iosSetNSAppTransportSecurity = (ctx: any) => {
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

export = (ctx: any) => {
  if (ctx.opts.cordova.platforms.includes('ios')) {
    iosSetNSAppTransportSecurity(ctx)
  }
}
