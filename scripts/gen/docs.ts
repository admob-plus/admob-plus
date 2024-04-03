import assert from "node:assert/strict";
import path from "node:path";
/// <reference types="cordova-plus" />
import { PluginInfo } from "cordova-common";
import { replaceInFile } from "replace-in-file";
import type Context from "./context";
import CordovaGen from "./cordova";

export default class Generator {
	constructor(
		private ctx: Context,
		private cordovaGen = new CordovaGen(ctx),
	) {}

	async files() {
		const cordovaPlugin = new PluginInfo(this.cordovaGen.pkgDir());
		const PLAY_SERVICES_VERSION = cordovaPlugin._et
			.find(
				'./platform/[@name="android"]/preference/[@name="PLAY_SERVICES_VERSION"]',
			)
			?.get("default");
		assert(PLAY_SERVICES_VERSION);

		await replaceInFile({
			files: path.join(
				this.ctx.rootDir,
				"website/docs/cordova/installation.mdx",
			),
			from: /--PLAY_SERVICES_VERSION=([\d\.]+)/g,
			to: `--PLAY_SERVICES_VERSION=${PLAY_SERVICES_VERSION}`,
		});

		return {} as Record<string, string>;
	}
}
