import { ListrBaseClassOptions } from 'listr2'
import { PackageJson } from 'type-fest'

export interface Ctx {
  pkg?: PackageJson
}

export const options: ListrBaseClassOptions<any, any, 'verbose'> = {
  concurrent: true,
  exitOnError: false,
  rendererOptions: { collapse: false, persistentOutput: true },
}
