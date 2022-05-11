import assert from 'assert';
import got from 'got';
import {Listr, ListrTask} from 'listr2';
import {findPkg} from 'pkg-proxy';

import taskCocoapods from './cocoapods.js';
import tasksCordova, {readAdMobPlusPluginInfo} from './cordova.js';
import {Ctx, options as listrOptions} from './listr.js';
import tasksNode from './node.js';

const taskConnection: ListrTask = {
  async task(_ctx, task) {
    const host = 'googleads.g.doubleclick.net';
    task.title = host;
    try {
      await got(`https://${host}`);
    } catch (err) {
      task.output = `${err}`;
      throw new Error(host);
    }
  },
  options: {persistentOutput: true},
};

export default async () => {
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
    [taskConnection, taskCocoapods, ...tasksNode, ...tasksCordova],
    {
      ...listrOptions,
      ctx,
    }
  );

  try {
    await tasks.run();
  } catch {
    const issueCount = tasks.err.length;
    console.error(`Found ${issueCount} issue${issueCount === 1 ? '' : 's'}.`);
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};
