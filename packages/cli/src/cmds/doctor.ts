import {Listr} from 'listr2';
import assert from 'node:assert';
import {findPkg} from 'pkg-proxy';
import taskCocoapods from '../doctor/cocoapods.js';
import tasksCordova, {readAdMobPlusPluginInfo} from '../doctor/cordova.js';
import {adServerHost, connectAdServer} from '../doctor/connection.js';
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
            throw err;
          }
        },
      },
      taskCocoapods,
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
