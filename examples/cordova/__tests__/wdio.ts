import execa from 'execa';
import * as fse from 'fs-extra';
import ms from 'ms';
import path from 'path';
// @ts-expect-error no-type
import portReady from 'port-ready';
import * as wdio from 'webdriverio';

describe('wdio', () => {
  let appium: execa.ExecaChildProcess<string>;
  let browser: Awaited<ReturnType<typeof wdio.remote>>;

  beforeAll(async () => {
    const app = path.join(
      __dirname,
      '../platforms/android/app/build/outputs/apk/debug/app-debug.apk'
    );
    if (!(await fse.pathExists(app))) {
      return;
    }

    const port = 4723;
    appium = execa(
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
    browser = client;
  }, 1000 * 60 * 10);

  afterAll(async () => {
    await browser.deleteSession();

    await Promise.all([
      appium,
      (async () => {
        appium.kill();
      })(),
    ]);
  });

  it('click banner button', async () => {
    const btnShowBanner = await browser.$('#show-banner-btn');
    await btnShowBanner.click();
  });

  it('click interstitial button', async () => {
    const btnShowInterstitial = await browser.$('#show-interstitial-btn');
    await btnShowInterstitial.click();
  });
});
