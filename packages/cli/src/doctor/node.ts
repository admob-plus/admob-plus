import { ListrTask } from 'listr2'
import _ from 'lodash'
import { testAppIds } from './admob'
import { Ctx } from './listr'

export default [
  {
    title: 'package.json',
    async task(ctx, task) {
      const { pkg } = ctx
      if (!pkg) {
        task.skip()
        return
      }

      const appIdKeys = ['APP_ID_ANDROID', 'APP_ID_IOS']
      return task.newListr(
        _.flatMap(appIdKeys, (k) => {
          const configPath = `cordova.plugins.admob-plus-cordova.${k}`
          const appId = _.get(pkg, configPath)
          if (!appId) {
            return []
          }

          return {
            title: configPath,
            async task(_ctx, taskConfig) {
              if (testAppIds.has(appId)) {
                taskConfig.output = `${appId} is a test ID`
                throw new Error(configPath)
              }
            },
            options: { persistentOutput: true },
          }
        }),
        { concurrent: true },
      )
    },
  },
] as ListrTask<Ctx>[]
