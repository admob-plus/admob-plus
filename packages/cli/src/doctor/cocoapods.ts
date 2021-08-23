import { ListrTask } from 'listr2'
import { getPodSpec } from './ios'

export default {
  title: 'CocoaPods',
  enabled: process.platform === 'darwin',
  task: async (ctx, task) =>
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

          const expectedVersion = ctx.iosSDKVersion
          if (spec.version !== expectedVersion) {
            taskSDK.output = hint
            throw new Error(
              `${specName}: ${spec.version} != ${expectedVersion}`,
            )
          }

          taskSDK.title = `${specName} v${spec.version}`
        },
        options: { persistentOutput: true },
      },
    ]),
} as ListrTask
