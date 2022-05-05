import { ListrTask } from 'listr2';
import _ from 'lodash';

import { testAppIds } from './admob.js';
import { Ctx } from './listr.js';

export default [
  {
    title: 'package.json',
    async task(ctx, task) {
      const {pkg} = ctx;
      if (!pkg) {
        task.skip();
        return;
      }

      const appIdKeys = ['APP_ID_ANDROID', 'APP_ID_IOS'];
      const tasks: ListrTask<Ctx, any>[] = _.flatMap(appIdKeys, k => {
        const configPath = `cordova.plugins.admob-plus-cordova.${k}`;
        const appId = _.get(pkg, configPath);
        if (!appId) {
          return [];
        }

        return {
          title: configPath,
          async task(_ctx, taskConfig) {
            if (testAppIds.has(appId)) {
              taskConfig.output = `${appId} is a test ID`;
              throw new Error(configPath);
            }
          },
          options: {persistentOutput: true},
        };
      });
      if (pkg.depends('@ionic/angular')) {
        tasks.push({
          title: '@ionic/angular',
          async task(_ctx, taskIonic) {
            if (
              pkg.depends('@capacitor/core') &&
              pkg.dependsAny('admob-plus-cordova', '@admob-plus/ionic')
            ) {
              taskIonic.output = 'Install @admob-plus/capacitor instead';
              throw new Error('Using Cordova packages in Capacitor project');
            }
          },
          options: {persistentOutput: true},
        });
      }
      return task.newListr(tasks, {concurrent: true});
    },
  },
] as ListrTask<Ctx>[];
