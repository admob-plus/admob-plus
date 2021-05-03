import assert from 'assert'
import escaladeSync from 'escalade/sync'
import glob from 'fast-glob'
import path from 'path'
import findPkg, { PackageJson } from 'pkg-proxy'

const cwd = process.cwd()
const pkgsDir = escaladeSync(
  cwd,
  (_dir, names) => names.includes('packages') && 'packages',
)
assert(pkgsDir, `can not find "packages" dir from ${cwd}`)

export const pkgsDirJoin = (...args: string[]): string =>
  path.join(pkgsDir, ...args)

export const collectPkgs = async () => {
  const pkgDirs = await glob(pkgsDirJoin('*'), { onlyDirectories: true })
  return Promise.all(
    pkgDirs.map(async (pkgDir) => {
      const pkg = await findPkg({ cwd: pkgDir })
      return { ...pkg, dir: pkgDir } as PackageJson & { dir: string }
    }),
  )
}
