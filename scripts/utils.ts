import * as path from 'path'

export const pkgsDirJoin = (...args: string[]) =>
  path.join(__dirname, '../packages', ...args)
