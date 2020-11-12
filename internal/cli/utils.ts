import assert from 'assert'
import escaladeSync from 'escalade/sync'
import path from 'path'

const pkgsDir = escaladeSync(__dirname, (_dir, names) => {
  if (names.includes('packages')) {
    return 'packages'
  }
})
assert(pkgsDir, `can not find "packages" dir from ${__dirname}`)

export const pkgsDirJoin = (...args: string[]): string =>
  path.join(pkgsDir, ...args)
