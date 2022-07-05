import execa from 'execa';
import * as fse from 'fs-extra';
import ms from 'ms';
import path from 'path';
// @ts-expect-error no-type
import portReady from 'port-ready';
import * as wdio from 'webdriverio';

test(
  'wdio',
  async () => {
    const app = path.join(
      __dirname,
      '../platforms/android/app/build/outputs/apk/debug/app-debug.apk'
    );
    if (!(await fse.pathExists(app))) {
      return;
    }

    const port = 4723;
    const appium = execa(
      'appium',
      ['--allow-insecure', 'chromedriver_autodownload'],
      {stdio: 'inherit'}
    );
    await portReady({host: '127.0.0.1', port, timeout: ms('30s')});

    const client = await wdio.remote({
      path: '/wd/hub',
      port,
      capabilities: {
        platformName: 'Android',
        app,
        autoWebview: true,
        automationName: 'UiAutomator2',
      },
      connectionRetryTimeout: ms('15m'),
    });
    const browser = client;

    const btnShowBanner = await browser.$('#show-banner-btn');
    await btnShowBanner.click();

    const btnShowInterstitial = await browser.$('#show-interstitial-btn');
    await btnShowInterstitial.click();

    await client.deleteSession();

    await Promise.all([
      appium,
      (async () => {
        appium.kill();
      })(),
    ]);
  },
  1000 * 60 * 10
);
