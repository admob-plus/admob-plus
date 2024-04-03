import * as fse from "fs-extra";
import plist from "plist";
import { changes } from "./common";
import type Context from "./context";

class Generator {
	constructor(private ctx: Context) {}

	pkgDir(...args: string[]) {
		return this.ctx.rootDirJoin("packages/capacitor", ...args);
	}

	async updateInfoPlist() {
		const filename = this.ctx.rootDirJoin(
			"examples/capacitor/ios/App/App/Info.plist",
		);
		const before = await fse.readFile(filename, "utf8");

		const o = plist.parse(before);
		(o as Record<string, unknown>).SKAdNetworkItems = plist.parse(
			`<plist>${this.ctx.adNetworkItems}</plist>`,
		);
		const after = plist.build(o);

		return { filename, before, after };
	}

	async files() {
		return {
			...changes(await this.updateInfoPlist()),
		};
	}
}

export default Generator;
