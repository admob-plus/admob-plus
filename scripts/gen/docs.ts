import {PluginInfo} from 'cordova-common';
import path from 'node:path';
import {replaceInFile} from 'replace-in-file';
import CordovaGen from './cordova';

export default class Generator {
  constructor(
    private rootDir: string,
    private cordovaGen = new CordovaGen(rootDir)
  ) {}

  async files() {
    const cordovaPlugin = new PluginInfo(this.cordovaGen.pkgDir());
    const PLAY_SERVICES_VERSION = cordovaPlugin._et
      .find(
        './platform/[@name="android"]/preference/[@name="PLAY_SERVICES_VERSION"]'
      )
      .get('default');

    await replaceInFile({
      files: path.join(this.rootDir, 'website/docs/cordova/installation.mdx'),
      from: /--PLAY_SERVICES_VERSION=([\d\.]+)/g,
      to: `--PLAY_SERVICES_VERSION=${PLAY_SERVICES_VERSION}`,
    });

    return {} as Record<string, string>;
  }
}
