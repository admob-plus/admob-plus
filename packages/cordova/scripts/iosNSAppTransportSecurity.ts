import assert from 'assert'
import type { Context } from 'cordova-ts-hook'
import fse from 'fs-extra'
import glob from 'fast-glob'
import path from 'path'
import plist, { PlistObject } from 'plist'

async function iosSetNSAppTransportSecurity(ctx: Context) {
  const { projectRoot } = ctx.opts

  const plistFiles = await glob('*/*-Info.plist', {
    cwd: path.join(projectRoot, 'platforms/ios'),
    onlyFiles: true,
    absolute: true,
  })
  const plistFile = plistFiles[0]
  assert(plistFile)

  const content = await fse.readFile(plistFile, 'utf8')
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
  await fse.writeFile(plistFile, plist.build(plistObj))
}

export = async (ctx: Context) => {
  if (ctx.opts.cordova.platforms.includes('ios')) {
    await iosSetNSAppTransportSecurity(ctx)
  }
}
