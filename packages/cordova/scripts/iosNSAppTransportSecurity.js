const assert = require('assert')
const fs = require('fs')
const glob = require('glob')
const path = require('path')
const plist = require('plist')

const iosSetNSAppTransportSecurity = (ctx) => {
  const { projectRoot } = ctx.opts

  const plistFile = glob.sync(
    path.join(projectRoot, 'platforms/ios', '*/*-Info.plist'),
  )[0]
  assert(plistFile)

  const plistObj = plist.parse(fs.readFileSync(plistFile, 'utf8'))

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

module.exports = (ctx) => {
  if (ctx.opts.cordova.platforms.includes('ios')) {
    iosSetNSAppTransportSecurity(ctx)
  }
}
