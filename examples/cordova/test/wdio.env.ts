import path from 'path';
import NodeEnvironment from 'jest-environment-node';
import ms from 'ms';
import * as wdio from 'webdriverio';
import type {Browser} from 'webdriverio';
import execa from 'execa';
import * as fse from 'fs-extra';
// @ts-expect-error no-type
import portReady from 'port-ready';
import {killPortProcess} from 'kill-port-process';
import getPort from 'get-port';

declare global {
  var browser: Browser<'async'> | undefined;
}

class WdioEnvironment extends NodeEnvironment {
  declare global: NodeEnvironment['global'] & {
    browser: typeof browser;
    appium?: execa.ExecaChildProcess<string>;
  };

  port = 4723;

  async setup() {
    await super.setup();

    const app = path.join(
      __dirname,
      '../platforms/android/app/build/outputs/apk/debug/app-debug.apk'
    );

    const port = (this.port = await getPort());

    if (!(await fse.pathExists(app))) return;

    const adb = await execa('adb', ['devices', '-l'], {reject: false});
    if (adb.failed) return;
    if (adb.stdout.replace('List of devices attached', '').trim().length === 0)
      return;

    this.global.appium = execa(
      'npx',
      [
        'appium',
        `--port=${port}`,
        '--allow-insecure=chromedriver_autodownload',
        '--pre-launch',
      ],
      {cwd: __dirname, reject: false, stdio: 'inherit'}
    );
    await portReady({host: '127.0.0.1', port, timeout: ms('30s')});

    this.global.browser = await wdio.remote({
      path: '/wd/hub',
      port,
      capabilities: {
        platformName: 'Android',
        app,
        autoWebview: true,
        autoWebviewTimeout: 180_000,
        automationName: 'UiAutomator2',
        newCommandTimeout: 60_000,
        autoDismissAlerts: true,
        // recreateChromeDriverSessions: true,
      },
      connectionRetryTimeout: ms('15m'),
      connectionRetryCount: 3,
    });
  }

  async teardown() {
    const {appium, browser} = this.global;

    await browser?.closeWindow();
    await browser?.closeApp();
    await browser?.deleteSession();

    await Promise.all([
      appium,
      killPortProcess(this.port, {signal: 'SIGTERM'}),
      (async () => {
        appium?.kill('SIGTERM');
      })(),
    ]);

    this.global.browser = undefined;

    await super.teardown();
  }
}

export default WdioEnvironment;
