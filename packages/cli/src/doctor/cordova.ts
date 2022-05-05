import cordovaCommon from 'cordova-common';
import elementtree from 'elementtree';
import execa from 'execa';
import glob from 'fast-glob';
import yaml from 'js-yaml';
import {ListrTask} from 'listr2';
import _ from 'lodash';
import path from 'path';
import pkgProxy, {type PackageJson} from 'pkg-proxy';
import semver from 'semver';

import {collectDependencies} from './android.js';
import {Ctx} from './listr';

const {default: findPkg} = pkgProxy as any;
const {ConfigParser, PluginInfo} = cordovaCommon;

export type PackageCordovaConfig = {
  cordova?: {
    plugins?: {[k: string]: any};
    platforms?: string[];
  };
};
type Plugin = {
  name: string;
  spec: string;
  variables: {
    [k: string]: string;
  };
};

// see https://github.com/apache/cordova-common/blob/master/src/ConfigParser/ConfigParser.js
interface AppConfig {
  getPlugin(id: string): Plugin | undefined;
  getPluginIdList(): string[];
  getPlugins(): Plugin[];
  getPreference(name: string, platform: string): string;
}

export const readConfigXml = async (filename: string) => {
  try {
    const appConfig = new ConfigParser(filename);
    return appConfig as AppConfig;
  } catch {
    return null;
  }
};

interface IPluginInfo {
  _et: elementtree.ElementTree;
}

export async function readPluginInfo(pkgName: string) {
  const plugin = new PluginInfo(
    path.dirname(require.resolve(`${pkgName}/plugin.xml`))
  ) as IPluginInfo;
  return plugin;
}

export async function readAdMobPlusPluginInfo() {
  const plugin = await readPluginInfo('admob-plus-cordova');
  const playServicesVersion = plugin._et
    .find(
      './platform/[@name="android"]/preference/[@name="PLAY_SERVICES_VERSION"]'
    )!
    .get('default')!;
  const iosSDKVersion = plugin._et
    .find(
      './platform/[@name="ios"]/podspec/pods/pod/[@name="Google-Mobile-Ads-SDK"]'
    )!
    .get('spec')!
    .replace('~>', '')
    .trim();
  return {
    ...plugin,
    playServicesVersion,
    iosSDKVersion,
  };
}

export default [
  {
    title: 'Cordova Android dependencies',
    async task(ctx, task) {
      const deps = await collectDependencies({cwd: 'platforms/android'});
      if (!deps) {
        task.skip();
        return;
      }

      return task.newListr([
        {
          async task(_ctxAds, taskAds) {
            const k = 'com.google.android.gms:play-services-ads';
            taskAds.title = k;
            const versions = deps[k];
            const s = `${k}: ${[...versions].join(', ')}`;
            if (versions.has(ctx.playServicesVersion)) {
              taskAds.title = s;
            } else {
              throw new Error(s);
            }
          },
        },
      ]);
    },
  },
  {
    title: 'config.xml',
    async task(ctx, task) {
      const {pkg} = ctx;
      const filename = 'config.xml';
      const config = await readConfigXml(filename);
      if (!ctx.pkg || !config) {
        task.skip();
        return;
      }

      const tasksPrefs = _.map(
        {SwiftVersion: ctx.swiftVersion, 'deployment-target': '11.0'},
        (expectedVersion, prefName) => {
          const title = `platform[name="ios"]/preference[name="${prefName}"]`;
          return {
            title,
            async task(_ctx, taskPref) {
              try {
                const version = config.getPreference(prefName, 'ios');
                if (!version) {
                  throw new Error(`${title}: missing / invalid`);
                }
                if (
                  semver.gte(
                    semver.coerce(version)!,
                    semver.coerce(expectedVersion)!
                  )
                ) {
                  taskPref.title = `${title}: ${version}`;
                } else {
                  throw new Error(`${title}: ${version} < ${expectedVersion}`);
                }
              } catch (err) {
                throw new Error(`${title}: ${err}`);
              }
            },
          } as ListrTask;
        }
      );

      const plugins = _.get(pkg, 'cordova.plugins', {});
      const tasksVars = _.flatMap(plugins, (vars, name) => {
        const xmlVars = _.get(config.getPlugin(name), 'variables');
        if (!xmlVars) {
          return [];
        }
        return _.map(
          vars,
          (v, k) =>
            ({
              title: k,
              async task(_ctx, taskVar) {
                if (!xmlVars[k]) {
                  taskVar.skip();
                  return;
                }
                if (v !== xmlVars[k]) {
                  throw new Error(`${k}: ${xmlVars[k]} != ${v}`);
                }
              },
            } as ListrTask)
        );
      });
      return task.newListr([...tasksPrefs, ...tasksVars], {concurrent: true});
    },
  },
  {
    title: 'platforms/ios/*.xcodeproj',
    async task(ctx, task) {
      const [filename] = await glob('platforms/ios/*.xcodeproj', {
        onlyDirectories: true,
      });
      if (!filename) {
        task.skip();
        return;
      }
      task.title = filename;
      const {stdout} = await execa('xcodeproj', [
        'show',
        '--format=tree_hash',
        filename,
      ]);
      const o = yaml.load(stdout);

      const title = 'SWIFT_VERSION';
      return task.newListr([
        {
          title,
          async task(_ctxSwift, taskSwift) {
            const expectedVersion = ctx.swiftVersion;
            const swiftVersion = _.get(
              o,
              'rootObject.buildConfigurationList.buildConfigurations[0].buildSettings.SWIFT_VERSION'
            );
            if (!swiftVersion) {
              throw new Error(`${title}: missing`);
            }
            if (
              semver.gte(
                semver.coerce(swiftVersion)!,
                semver.coerce(expectedVersion)!
              )
            ) {
              taskSwift.title = `${title}: ${swiftVersion}`;
            } else {
              taskSwift.output = `Set \`SwiftVersion\` preference in \`config.xml\` to \`${expectedVersion}\``;
              throw new Error(`${title}: ${swiftVersion} < ${expectedVersion}`);
            }
          },
          options: {persistentOutput: true},
        },
      ]);
    },
  },
  {
    title: 'plugins/admob-plus-cordova/package.json',
    async task(_ctx, task) {
      const pkgCordova = await findPkg({cwd: 'plugins/admob-plus-cordova'});
      const pkgLatest =
        require('admob-plus-cordova/package.json') as PackageJson;
      if (!pkgCordova || !pkgCordova.version || !pkgLatest.version) {
        task.skip();
        return;
      }

      return task.newListr([
        {
          title: `${pkgCordova.name}: ${pkgCordova.version}`,
          async task(_ctxPkg, taskPkg) {
            if (semver.lt(pkgCordova.version!, pkgLatest.version!)) {
              taskPkg.output = `Update to latest version: ${pkgLatest.version}`;
              throw new Error(
                `${pkgCordova.name}: ${pkgCordova.version} < ${pkgLatest.version}`
              );
            }
          },
          options: {persistentOutput: true},
        },
      ]);
    },
  },
] as ListrTask<Ctx>[];
