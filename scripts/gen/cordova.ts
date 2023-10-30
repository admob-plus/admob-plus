import * as fse from 'fs-extra';
import {JSDOM} from 'jsdom';
import path from 'node:path';
import xmlFormat from 'xml-formatter';
import xml2js from 'xml2js';
import {Events} from '../../packages/cordova/src/www/common';
import {getUnionTypeDict, renderKotlinConstants, warnMessage} from './common';
import Context from './context';

async function androidLatestVersion() {
  let res = await fetch(
    'https://dl.google.com/dl/android/maven2/com/google/android/gms/play-services-ads/maven-metadata.xml'
  );
  const data = await res.text();
  const result: {metadata: {versioning: Array<{latest: [string]}>}} =
    await xml2js.parseStringPromise(data);
  return result.metadata.versioning[0].latest[0];
}

async function iosLatestVersion() {
  const res = await fetch(
    'https://trunk.cocoapods.org/api/v1/pods/Google-Mobile-Ads-SDK'
  );
  const data: {
    versions: Array<{name: string; created_at: string}>;
  } = await res.json();
  data.versions.sort(
    (a, b) => Date.parse(b.created_at) - Date.parse(a.created_at)
  );
  return data.versions[0].name;
}

async function fetchSKAdNetworkItems() {
  const dom = await JSDOM.fromURL(
    'https://developers.google.com/admob/ios/quick-start'
  );
  const elm = dom.window.document.querySelector(
    '#complete-snippet + pre.prettyprint[translate="no"][dir="ltr"]'
  );
  return elm?.textContent?.replace(/^[\s\S]+<key>SKAdNetworkItems<\/key>/, '');
}

class Generator {
  constructor(private ctx: Context) {}

  pkgDir(...args: string[]) {
    return this.ctx.rootDirJoin('packages/cordova', ...args);
  }

  get cordovaActions() {
    return getUnionTypeDict(this.pkgDir('src/www/common.ts'), 'CordovaAction');
  }

  buildKotlin() {
    const linesActions = renderKotlinConstants(this.cordovaActions);
    const linesEvents = renderKotlinConstants(Events);

    return `// ${warnMessage}
package admob.plus.cordova

object Actions {
${linesActions}
}

object Events {
${linesEvents}
}
`;
  }

  buildProxyJs() {
    const linesActions = Object.entries(this.cordovaActions)
      .map(([k, v]) => `  ${k}() {},`)
      .sort()
      .join('\n');

    return `// ${warnMessage}
'use strict';

const AdMob = {
${linesActions}
};

// eslint-disable-next-line
require('cordova/exec/proxy').add('AdMob', AdMob);
`;
  }

  async updatePluginXML() {
    const filename = path.join(this.ctx.rootDir, 'packages/cordova/plugin.xml');
    const [latestSKAdNetworkItems, pluginXML] = await Promise.all([
      fetchSKAdNetworkItems(),
      fse.readFile(filename, 'utf8'),
    ]);
    if (!latestSKAdNetworkItems)
      throw new Error('Fail to fetch SKAdNetworkItems');

    const m = pluginXML.match(
      /(PLAY_SERVICES_VERSION" default=")([\d.]+)("[\s\S]*<config-file target="\*-Info.plist" parent="SKAdNetworkItems">\s)([\s\S]+?)(\s+<\/config-file>[\s\S]+Google-Mobile-Ads-SDK" spec="~> )([\d.]+)(")/
    );
    if (!m) throw new Error('Can not parse plugin.xml');
    const [m0, m1, _androidVersion, m3, _items, m5, _iosVersion, m7] = m;
    const latestItems = xmlFormat(latestSKAdNetworkItems, {
      collapseContent: true,
      lineSeparator: '\n',
    }).replace(/^/gm, '            ');

    const s = [
      m1,
      await androidLatestVersion(),
      m3,
      latestItems,
      m5,
      await iosLatestVersion(),
      m7,
    ].join('');

    return {
      filename,
      before: pluginXML,
      after: pluginXML.replace(m0, s),
    };
  }

  async files() {
    const u = await this.updatePluginXML();
    return {
      [this.pkgDir('src/android/cordova/Generated.kt')]: this.buildKotlin(),
      [this.pkgDir('src/browser/AdMobProxy.js')]: this.buildProxyJs(),
      ...(u.before === u.after
        ? {}
        : {
            [u.filename]: u.after,
          }),
    };
  }
}

export default Generator;
