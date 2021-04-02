import execa from 'execa'
import { ListrTask } from 'listr2'

const getPodSpec = async (name: string) => {
  const p = await execa('pod', ['spec', 'cat', name], {
    reject: false,
  })
  if (p.failed) {
    return null
  }
  try {
    return JSON.parse(p.stdout) as { version: string }
  } catch {}
  return null
}

export default {
  title: 'CocoaPods',
  enabled: process.platform === 'darwin',
  task: async (_ctx, task) =>
    task.newListr([
      {
        task: async (_ctxSDK, taskSDK) => {
          const specName = 'Google-Mobile-Ads-SDK'
          taskSDK.title = specName

          const spec = await getPodSpec(specName)
          const hint = 'Run `pod repo update`'
          if (!spec) {
            taskSDK.output = hint
            throw new Error(`${specName} not found`)
          }

          const expectedVersion = '8.3.0'
          if (spec.version !== expectedVersion) {
            taskSDK.output = hint
            throw new Error(
              `${specName}: ${spec.version} != ${expectedVersion}`,
            )
          }

          taskSDK.title = `${specName} v${spec.version}`
        },
      },
    ]),
} as ListrTask
