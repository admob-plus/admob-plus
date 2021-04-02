import { Listr } from 'listr2'
import taskCocoapods from './cocoapods'
import tasksCordova from './cordova'
import { Ctx, options as listrOptions } from './listr'
import tasksNode, { readPackageJson } from './node'

export default async () => {
  const pkg = await readPackageJson('package.json')
  const ctx: Ctx = { pkg }

  const tasks = new Listr<Ctx>([taskCocoapods, ...tasksNode, ...tasksCordova], {
    ...listrOptions,
    ctx,
  })

  try {
    await tasks.run()
  } catch {
    const issueCount = tasks.err.length
    console.error(`Found ${issueCount} issue${issueCount === 1 ? '' : 's'}.`)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }
}
