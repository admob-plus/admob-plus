import assert from 'assert'
import escaladeSync from 'escalade/sync'
import path from 'path'

const cwd = process.cwd()
const pkgsDir = escaladeSync(
  cwd,
  (_dir, names) => names.includes('packages') && 'packages',
)
assert(pkgsDir, `can not find "packages" dir from ${cwd}`)

export const pkgsDirJoin = (...args: string[]): string =>
  path.join(pkgsDir, ...args)
