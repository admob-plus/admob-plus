import {Listr} from 'listr2';
import assert from 'node:assert';
import {findPkg} from 'pkg-proxy';
import {adServerHost, connectAdServer} from '../doctor/connection.js';
import tasksCordova, {readAdMobPlusPluginInfo} from '../doctor/cordova.js';
import * as ios from '../doctor/ios.js';
import {Ctx, options as listrOptions} from '../doctor/listr.js';
import tasksNode from '../doctor/node.js';

export const command = 'doctor';

export const desc = 'Check your project setup for potential problems';

export async function handler() {
  const pkg = await findPkg();
  assert(pkg);

  const pluginInfo = await readAdMobPlusPluginInfo();
  const ctx: Ctx = {
    pkg,
    swiftVersion: '5.3',
    playServicesVersion: pluginInfo.playServicesVersion,
    iosSDKVersion: pluginInfo.iosSDKVersion,
  };

  const tasks = new Listr<Ctx>(
    [
      {
        title: adServerHost,
        async task(_, task) {
          try {
            await connectAdServer();
          } catch (err) {
            task.output = `${err}`;
            throw new Error(adServerHost);
          }
        },
        options: {persistentOutput: true},
      },
      {
        title: 'CocoaPods',
        enabled: process.platform === 'darwin',
        async task(_, task) {
          return task.newListr([
            {
              async task(_, task) {
                const sdk = await ios.checkSDK();
                task.title = sdk.name;

                const expectedVersion = ctx.iosSDKVersion;
                if (sdk.version !== expectedVersion) {
                  task.output = 'Run `pod repo update`';
                  throw new Error(
                    `${sdk.name}: ${sdk.version} != ${expectedVersion}`
                  );
                }

                task.title = `${sdk.name}} v${sdk.version}`;
              },
              options: {persistentOutput: true},
            },
          ]);
        },
      },
      ...tasksNode,
      ...tasksCordova,
    ],
    {
      ...listrOptions,
      ctx,
    }
  );

  try {
    await tasks.run();
  } catch {
    const issueCount = tasks.errors.length;
    console.error(`Found ${issueCount} issue${issueCount === 1 ? '' : 's'}.`);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
}
