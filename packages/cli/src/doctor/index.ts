import got from 'got'
import { Listr, ListrTask } from 'listr2'
import taskCocoapods from './cocoapods'
import tasksCordova from './cordova'
import { Ctx, options as listrOptions } from './listr'
import tasksNode, { readPackageJson } from './node'

const taskConnection: ListrTask = {
  async task(_ctx, task) {
    const host = 'googleads.g.doubleclick.net'
    task.title = host
    try {
      await got(`https://${host}`)
    } catch (err) {
      task.output = `${err}`
      throw new Error(host)
    }
  },
  options: { persistentOutput: true },
}

export default async () => {
  const pkg = await readPackageJson('package.json')
  const ctx: Ctx = { pkg }

  const tasks = new Listr<Ctx>(
    [taskConnection, taskCocoapods, ...tasksNode, ...tasksCordova],
    {
      ...listrOptions,
      ctx,
    },
  )

  try {
    await tasks.run()
  } catch {
    const issueCount = tasks.err.length
    console.error(`Found ${issueCount} issue${issueCount === 1 ? '' : 's'}.`)
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  }
}
